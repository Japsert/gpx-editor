export interface ArcJsonTimelineItemBase {
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
      timestamp: string;
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
        type:
    });
  }
}

/**
 * Converts a JSON string following the Arc app format into a JSON object following the GeoJSON format.
 * The following properties are kept:
 * - location data (latitude, longitude)
 * - timestamp
 * @param data String following the format of the Arc app
 * @returns JSON object following the GeoJSON format, containing a subset of the properties of the input string
 */
export function arcJsonToGeoJson(arcJsonString: string): GeoJson {
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
