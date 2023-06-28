import * as xml2js from "xml2js";

interface ArcJsonTimelineItemBase {
  nextItemId?: string; // Not present in last item
  floorsAscended: number;
  previousItemId: string;
  samples: {
    zAcceleration: number;
    recordingState: string;
    secondsFromGMT: number;
    courseVariance: number;
    sampleId: string;
    location: {
      verticalAccuracy: number;
      speed: number;
      longitude: number;
      horizontalAccuracy: number;
      course: number;
      latitude: number;
      timestamp: number;
      altitude: number;
    };
    stepHz: number;
    date: string;
    movingState: string;
    timelineItemId: string;
    xyAcceleration: number;
    classifiedType: string;
    lastSaved: string;
  }[];
  isVisit: boolean;
  floorsDescended: number;
  endDate: string;
  startDate: string;
  altitude: number;
  stepCount: number;
  lastSaved: string;
  itemId: string;
}

interface ArcJsonVisit extends ArcJsonTimelineItemBase {
  radius: {
    mean: number;
    sd: number;
  };
  center: {
    longitude: number;
    latitude: number;
  };
}

interface ArcJsonPlace extends ArcJsonTimelineItemBase {
  placeId: string;
  place: {
    placeId: string;
    radius: {
      mean: number;
      sd: number;
    };
    isHome: boolean;
    lastSaved: string;
    name: string;
    center: {
      longitude: number;
      latitude: number;
    };
  };
  radius: {
    mean: number;
    sd: number;
  };
  manualPlace: boolean;
  center: {
    longitude: number;
    latitude: number;
  };
}

interface ArcJsonActivity extends ArcJsonTimelineItemBase {
  uncertainActivityType?: string;
  manualActivityType?: boolean;
  activityTypeConfidenceScore?: number;
  activityType?: string;
}

type ArcJsonTimelineItem = ArcJsonVisit | ArcJsonPlace | ArcJsonActivity;

type ArcJson = {
  timelineItems: ArcJsonTimelineItem[];
};

interface ArcGpxJsonWpt {
  lat: string;
  lon: string;
  ele: string;
  time: string;
}

interface ArcGpxJsonTrk {
  type: string;
  trkseg: {
    trkpt: {
      lat: string;
      lon: string;
      ele: string;
      time: string;
    }[];
  };
}

interface ArcGpxJson {
  gpx: {
    creator: string;
    version: number;
    xmlns: string;
    "xmlns:xsi": string;
    wpt: ArcGpxJsonWpt | ArcGpxJsonWpt[];
    trk: ArcGpxJsonTrk | ArcGpxJsonTrk[];
  };
}

export class GeoJson implements GeoJSON.FeatureCollection {
  type: "FeatureCollection";
  features: GeoJSON.Feature[];

  constructor() {
    this.type = "FeatureCollection";
    this.features = [];
  }

  addFeature(timelineItem: ArcJsonTimelineItem) {
    const coordinates: [number, number][] = [];
    for (const sample of timelineItem.samples) {
      coordinates.push([sample.location.longitude, sample.location.latitude]);
    }
    this.features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
      properties: {
        timestamp: new Date(timelineItem.startDate).getTime(),
      },
    });
  }
}

function arcJsonToGeoJson(arcJsonString: string): GeoJson {
  const arcJson: ArcJson = JSON.parse(arcJsonString);

  const geoJson: GeoJson = new GeoJson();

  // Add timeline items to GeoJson
  for (const timelineItem of arcJson.timelineItems) {
    if (timelineItem.isVisit) {
      // Either a visit or a place
      if (Object.hasOwn(timelineItem, "placeId")) {
        // A place
        geoJson.addFeature(timelineItem as ArcJsonPlace);
      } else {
        // A visit
        geoJson.addFeature(timelineItem as ArcJsonVisit);
      }
    } else {
      // An activity
      geoJson.addFeature(timelineItem as ArcJsonActivity);
    }
  }

  return geoJson;
}

function addWpt(geoJson: GeoJson, wpt: ArcGpxJsonWpt) {
  geoJson.features.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [parseFloat(wpt.lon), parseFloat(wpt.lat)],
    },
    properties: {
      timestamp: new Date(wpt.time).getTime(),
    },
  });
}

function addTrk(geoJson: GeoJson, trk: ArcGpxJsonTrk) {
  for (const trkpt of trk.trkseg.trkpt) {
    geoJson.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [parseFloat(trkpt.lon), parseFloat(trkpt.lat)],
      },
      properties: {
        timestamp: new Date(trkpt.time).getTime(),
      },
    });
  }
}

async function arcGpxToGeoJson(arcGpx: string): Promise<GeoJson | void> {
  // Convert GPX string to ArcGpxJson
  let arcGpxJson: ArcGpxJson;
  try {
    const options = {
      mergeAttrs: true,
      explicitArray: false,
    };
    arcGpxJson = await xml2js.parseStringPromise(arcGpx, options);
  } catch (err) {
    console.error("Failed to convert XML file: " + err);
    return;
  }

  // Convert ArcGpxJson to GeoJson
  const geoJson: GeoJson = new GeoJson();

  // Add waypoints and tracks
  if (arcGpxJson.gpx.wpt) {
    if (Array.isArray(arcGpxJson.gpx.wpt)) {
      for (const wpt of arcGpxJson.gpx.wpt) {
        addWpt(geoJson, wpt);
      }
    } else {
      addWpt(geoJson, arcGpxJson.gpx.wpt);
    }
  }
  if (arcGpxJson.gpx.trk) {
    if (Array.isArray(arcGpxJson.gpx.trk)) {
      for (const trk of arcGpxJson.gpx.trk) {
        addTrk(geoJson, trk);
      }
    } else {
      addTrk(geoJson, arcGpxJson.gpx.trk);
    }
  }

  return geoJson;
}

/**
 * Converts a string following the Arc app format into a JSON object following the GeoJSON format.
 * The following properties are kept:
 * - location data (latitude, longitude)
 * - timestamp
 * @param data String following the format of the Arc app
 * @param fileType Type of the input file
 * @returns JSON object following the GeoJSON format, containing a subset of the properties of the input string
 */
export async function toGeoJson(
  data: string,
  fileType: string
): Promise<GeoJson | void> {
  switch (fileType) {
    case "gpx":
      return await arcGpxToGeoJson(data);
    case "json":
      return Promise.resolve(arcJsonToGeoJson(data));
    default:
      throw new Error("Unsupported file type");
  }
}
