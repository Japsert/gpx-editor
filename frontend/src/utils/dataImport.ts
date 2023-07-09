import { ArcJson, ArcJsonActivity, ArcJsonVisit } from "./types";

interface FeatureProperties {
  itemId: string;
  nextItemId?: string;
  previousItemId: string;
  isVisit: boolean;
  altitude: number;
  samples: {
    date: string;
    classifiedType: string;
    location: {
      speed: number;
      latitude: number;
      longitude: number;
      timestamp: string;
      altitude: number;
    };
  }[];
  startDate: string;
  endDate: string;
}

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
  radius: {
    mean: number;
    sd: number;
  };
  center: {
    longitude: number;
    latitude: number;
  };
  streetAddress?: string;
  place?: {
    placeId: string;
    isHome?: true;
    name: string;
    center: {
      longitude: number;
      latitude: number;
    };
    radius: {
      mean: number;
      sd: number;
    };
    foursquareVenueId?: string;
    foursquareCategoryId?: string;
  };
  manualPlace?: boolean;
  placeId?: string;
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

interface ActivityProperties extends FeatureProperties {
  uncertainActivityType: boolean;
  manualActivityType: boolean;
  activityType: string;
  activityTypeConfidenceScore: number;
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

  addVisit(timelineItem: ArcJsonVisit) {
    const coordinates: [number, number, number] = [
      timelineItem.center.longitude,
      timelineItem.center.latitude,
      timelineItem.altitude,
    ];
    const props: VisitProperties = {
      // Common props
      itemId: timelineItem.itemId,
      nextItemId: timelineItem.nextItemId,
      previousItemId: timelineItem.previousItemId,
      isVisit: timelineItem.isVisit,
      altitude: timelineItem.altitude,
      samples: timelineItem.samples.map((sample) => {
        return {
          date: sample.date,
          classifiedType: sample.classifiedType,
          location: {
            speed: sample.location.speed,
            latitude: sample.location.latitude,
            longitude: sample.location.longitude,
            timestamp: sample.location.timestamp,
            altitude: sample.location.altitude,
          },
          startDate: timelineItem.startDate,
          endDate: timelineItem.endDate,
        };
      }),
      startDate: timelineItem.startDate,
      endDate: timelineItem.endDate,
      // Visit props
      radius: timelineItem.radius,
      center: timelineItem.center,
      streetAddress: timelineItem.streetAddress,
      place: timelineItem.place,
      manualPlace: timelineItem.manualPlace,
      placeId: timelineItem.placeId,
    };
    this.features.push(new Visit(coordinates, props));
  }

  addActivity(timelineItem: ArcJsonActivity) {
    const coordinates: [number, number, number][] = [];
    timelineItem.samples.forEach((sample) => {
      coordinates.push([
        sample.location.longitude,
        sample.location.latitude,
        sample.location.altitude,
      ]);
    });
    const props: ActivityProperties = {
      // Common props
      itemId: timelineItem.itemId,
      nextItemId: timelineItem.nextItemId,
      previousItemId: timelineItem.previousItemId,
      isVisit: timelineItem.isVisit,
      altitude: timelineItem.altitude,
      samples: timelineItem.samples.map((sample) => {
        return {
          date: sample.date,
          classifiedType: sample.classifiedType,
          location: {
            speed: sample.location.speed,
            latitude: sample.location.latitude,
            longitude: sample.location.longitude,
            timestamp: sample.location.timestamp,
            altitude: sample.location.altitude,
          },
          startDate: timelineItem.startDate,
          endDate: timelineItem.endDate,
        };
      }),
      startDate: timelineItem.startDate,
      endDate: timelineItem.endDate,
      // Activity props
      uncertainActivityType: timelineItem.uncertainActivityType,
      manualActivityType: timelineItem.manualActivityType,
      activityType: timelineItem.activityType,
      activityTypeConfidenceScore: timelineItem.activityTypeConfidenceScore,
    };
    this.features.push(new Activity(coordinates, props));
  }
}

/**
 * Converts a JSON string following the Arc app format into a JSON object following the GeoJSON format.
 * @param data String following the format of the Arc app
 * @returns JSON object following the GeoJSON format, containing a subset of the properties of the input string
 */
export function arcJsonToGeoJson(arcJsonString: string): GeoJson {
  const arcJson: ArcJson = JSON.parse(arcJsonString);

  const geoJson: GeoJson = new GeoJson();

  arcJson.timelineItems.forEach((timelineItem) => {
    if (timelineItem.isVisit) {
      geoJson.addVisit(timelineItem as ArcJsonVisit);
    } else {
      geoJson.addActivity(timelineItem as ArcJsonActivity);
    }
  });

  return geoJson;
}
