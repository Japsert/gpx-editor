export interface ArcJsonTimelineItem {
  itemId: string;
  nextItemId?: string;
  previousItemId: string;
  isVisit: boolean;
  altitude: number;
  floorsAscended: number;
  floorsDescended: number;
  stepCount: number;
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
    xyAcceleration: number;
    zAcceleration: number;
    courseVariance: number;
    stepHz: number;
    lastSaved: string;
  }[];
  startDate: string;
  endDate: string;
  lastSaved: string;
}

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
}

export interface ArcJsonPlace extends ArcJsonVisit {
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

export interface ArcJsonActivity extends ArcJsonTimelineItem {
  uncertainActivityType: string;
  manualActivityType: boolean;
  activityType: string;
  activityTypeConfidenceScore: number;
}

export type ArcJson = {
  timelineItems: (ArcJsonVisit | ArcJsonPlace | ArcJsonActivity)[];
};
