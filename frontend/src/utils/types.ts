/**
 * Base type for all timeline items.
 * - If either `activeEnergyBurned` or `hkStepCount` is present, both will be present.
 * - Sometimes, a sample will have no `zAcceleration`, `xyAcceleration`, `courseVariance`, or `stepHz`, the location
 * will be `null`, and the recordingState will be `"off"`. This is probably a bug in the app, and the sample should be
 * ignored.
 */
export interface ArcJsonTimelineItem {
  itemId: string;
  nextItemId?: string;
  previousItemId: string;
  isVisit: boolean;
  altitude: number;
  floorsAscended: number;
  floorsDescended: number;
  stepCount: number;
  hkStepCount?: number;
  samples: {
    sampleId: string;
    timelineItemId: string;
    date: string;
    secondsFromGMT: number;
    recordingState: string;
    movingState: string;
    classifiedType: string;
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
    xyAcceleration?: number;
    zAcceleration?: number;
    courseVariance?: number;
    stepHz?: number;
    lastSaved: string;
  }[];
  startDate: string;
  endDate: string;
  lastSaved: string;
}

/**
 * A visit. Includes all base timeline item properties.
 * - If one of `place`, `manualPlace`, or `placeId` is present, all three will be present.
 * - If either `averageHeartRate` or `maxHeartRate` is present, both will be present.
 * - If `isHome` is present, it will be `true`.
 * - If either `fourSquareVenueId` or `fourSquareCategoryId` is present, both will be present.
 */
export interface ArcJsonVisit extends ArcJsonTimelineItem {
  hkStepCount: number;
  radius: {
    mean: number;
    sd: number;
  };
  activeEnergyBurned: number;
  maxHeartRate?: number;
  averageHeartRate?: number;
  center: {
    longitude: number;
    latitude: number;
  };
  streetAddress: string;
  placeId: string;
  place: {
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
    lastSaved: string;
  };
  manualPlace: boolean;
}

/**
 * An activity. Includes all base timeline item properties.
 */
export interface ArcJsonActivity extends ArcJsonTimelineItem {
  uncertainActivityType: boolean;
  manualActivityType: boolean;
  activityType: string;
  activityTypeConfidenceScore: number;
}

/** The JSON format of files exported from Arc. */
export interface ArcJson {
  timelineItems: (ArcJsonVisit | ArcJsonActivity)[];
}
