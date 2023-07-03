import { ArcJson, ArcJsonActivity, ArcJsonPlace, ArcJsonVisit } from "./types";

class Feature implements GeoJSON.Feature {
  type = "Feature" as const;
  geometry: GeoJSON.Point | GeoJSON.LineString;
  properties: GeoJSON.GeoJsonProperties;

  constructor(
    geometry: GeoJSON.Point | GeoJSON.LineString,
    properties: GeoJSON.GeoJsonProperties
  ) {
    this.geometry = geometry;
    this.properties = properties;
  }
}

class Visit extends Feature {
  constructor(
    streetAddress: string,
    time: string,
    coordinates: [number, number, number]
  ) {
    const geometry = {
      type: "Point" as const,
      coordinates: coordinates,
    };
    const properties = {
      type: "visit",
      streetAddress: streetAddress,
      time: time,
    };
    super(geometry, properties);
  }
}

class Place extends Feature {
  constructor(
    name: string,
    time: string,
    coordinates: [number, number, number]
  ) {
    const geometry = {
      type: "Point" as const,
      coordinates: coordinates,
    };
    const properties = {
      type: "place",
      name: name,
      time: time,
    };
    super(geometry, properties);
  }
}

class Activity extends Feature {
  constructor(
    activityType: string,
    time: string,
    timestamps: string[],
    coordinates: [number, number, number][]
  ) {
    const geometry = {
      type: "LineString" as const,
      coordinates: coordinates,
    };
    const properties = {
      type: "activity",
      activityType: activityType,
      time: time,
      timestamps: timestamps,
    };
    super(geometry, properties);
  }
}

export class GeoJson implements GeoJSON.FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
  date: string;

  constructor() {
    this.type = "FeatureCollection";
    this.features = [];
    this.date = "";
  }

  addFeature(feature: Feature) {
    this.features.push(feature);
    if (this.date === "" && feature.properties) {
      this.date = feature.properties.time.split("T")[0];
    }
  }

  addPlace(timelineItem: ArcJsonPlace) {
    const name = timelineItem.place.name;
    const time = timelineItem.startDate;
    const coordinates: [number, number, number] = [
      timelineItem.place.center.longitude,
      timelineItem.place.center.latitude,
      timelineItem.altitude,
    ];
    this.addFeature(new Place(name, time, coordinates));
  }

  addVisit(timelineItem: ArcJsonVisit) {
    const streetAddress = timelineItem.streetAddress;
    const time = timelineItem.startDate;
    const coordinates: [number, number, number] = [
      timelineItem.center.longitude,
      timelineItem.center.latitude,
      timelineItem.altitude,
    ];
    this.addFeature(new Visit(streetAddress, time, coordinates));
  }

  addActivity(timelineItem: ArcJsonActivity) {
    const type = timelineItem.activityType;
    const time = timelineItem.startDate;
    const timestamps: string[] = [];
    const coordinates: [number, number, number][] = [];
    timelineItem.samples.forEach((sample) => {
      timestamps.push(sample.location.timestamp);
      coordinates.push([
        sample.location.longitude,
        sample.location.latitude,
        sample.location.altitude,
      ]);
    });
    this.addFeature(new Activity(type, time, timestamps, coordinates));
  }
}

/**
 * Converts a JSON string following the Arc app format into a JSON object following the GeoJSON format.
 * The following properties are kept:
 * - location data (latitude, longitude, altitude)
 * - timestamp
 * @param data String following the format of the Arc app
 * @returns JSON object following the GeoJSON format, containing a subset of the properties of the input string
 */
export function arcJsonToGeoJson(arcJsonString: string): GeoJson {
  const arcJson: ArcJson = JSON.parse(arcJsonString);

  const geoJson: GeoJson = new GeoJson();

  // Add timeline items to GeoJson
  arcJson.timelineItems.forEach((timelineItem) => {
    if (timelineItem.isVisit) {
      // Either a visit or a place
      if (Object.hasOwn(timelineItem, "placeId")) {
        geoJson.addPlace(timelineItem as ArcJsonPlace);
      } else {
        geoJson.addVisit(timelineItem as ArcJsonVisit);
      }
    } else {
      geoJson.addActivity(timelineItem as ArcJsonActivity);
    }
  });

  return geoJson;
}
