import { ArcJson, ArcJsonActivity, ArcJsonPlace, ArcJsonVisit } from "./types";

type FeatureProperties = {
  type: string;
  itemId: string;
  time: string;
} & GeoJSON.GeoJsonProperties;

class Feature implements GeoJSON.Feature {
  type = "Feature" as const;
  geometry: GeoJSON.Geometry;
  properties: FeatureProperties;

  constructor(geometry: GeoJSON.Geometry, properties: FeatureProperties) {
    this.geometry = geometry;
    this.properties = properties;
  }
}

interface VisitProperties extends FeatureProperties {
  streetAddress: string;
  radius: {
    mean: number;
    sd: number;
  };
}

export class Visit extends Feature {
  properties: VisitProperties;

  constructor(
    coordinates: [number, number, number],
    properties: VisitProperties
  ) {
    const geometry = {
      type: "Point" as const,
      coordinates: coordinates,
    };
    super(geometry, properties);
    this.properties = properties;
  }
}

interface PlaceProperties extends FeatureProperties {
  name: string;
  radius: {
    mean: number;
    sd: number;
  };
}

export class Place extends Feature {
  properties: PlaceProperties;

  constructor(
    coordinates: [number, number, number],
    properties: PlaceProperties
  ) {
    const geometry = {
      type: "Point" as const,
      coordinates: coordinates,
    };
    super(geometry, properties);
    this.properties = properties;
  }
}

interface ActivityProperties extends FeatureProperties {
  activityType: string;
  timestamps: string[];
}

export class Activity extends Feature {
  properties: ActivityProperties;

  constructor(
    coordinates: [number, number, number][],
    properties: ActivityProperties
  ) {
    const geometry = {
      type: "LineString" as const,
      coordinates: coordinates,
    };
    super(geometry, properties);
    this.properties = properties;
  }
}

export class GeoJson implements GeoJSON.FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];

  constructor() {
    this.type = "FeatureCollection";
    this.features = [];
  }

  addFeature(feature: Feature) {
    this.features.push(feature);
  }

  addPlace(timelineItem: ArcJsonPlace) {
    const coordinates: [number, number, number] = [
      timelineItem.place.center.longitude,
      timelineItem.place.center.latitude,
      timelineItem.altitude,
    ];
    const itemId = timelineItem.itemId;
    const time = timelineItem.startDate;
    const name = timelineItem.place.name;
    const radius = timelineItem.place.radius;
    const props: PlaceProperties = {
      type: "place",
      itemId,
      time,
      name,
      radius,
    };
    this.features.push(new Place(coordinates, props));
  }

  addVisit(timelineItem: ArcJsonVisit) {
    const coordinates: [number, number, number] = [
      timelineItem.center.longitude,
      timelineItem.center.latitude,
      timelineItem.altitude,
    ];
    const itemId = timelineItem.itemId;
    const time = timelineItem.startDate;
    const streetAddress = timelineItem.streetAddress;
    const radius = timelineItem.radius;
    const props: VisitProperties = {
      type: "visit",
      itemId,
      time,
      streetAddress,
      radius,
    };
    this.features.push(new Visit(coordinates, props));
  }

  addActivity(timelineItem: ArcJsonActivity) {
    const coordinates: [number, number, number][] = [];
    const itemId = timelineItem.itemId;
    const time = timelineItem.startDate;
    const activityType = timelineItem.activityType;
    const timestamps: string[] = [];
    timelineItem.samples.forEach((sample) => {
      coordinates.push([
        sample.location.longitude,
        sample.location.latitude,
        sample.location.altitude,
      ]);
      timestamps.push(sample.location.timestamp);
    });
    const props: ActivityProperties = {
      type: "activity",
      itemId,
      time,
      activityType: activityType,
      timestamps,
    };
    this.features.push(new Activity(coordinates, props));
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
