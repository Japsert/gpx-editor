# arcjson types

### common

Notes:

- if either activeEnergyBurned or hkStepCount is present, both will be present
- sometimes, a sample will have no zAcceleration, xyAcceleration, courseVariance, or stepHz, the location will be null, and the recordingState will be "off". This is probably a bug in the app, and the sample should be ignored.

- itemId
- nextItemId?
- previousItemId
- isVisit (true if visit, false if activity)
- altitude
- floorsAscended
- floorsDescended
- stepCount
- hkStepCount?
- activeEnergyBurned?
- samples
  - sampleId
  - timelineItemId
  - date
  - secondsFromGMT
  - recordingState
  - movingState
  - classifiedType
  - location
    - verticalAccuracy
    - speed
    - longitude
    - horizontalAccuracy
    - course
    - latitude
    - timestamp
    - altitude
  - xyAcceleration?
  - zAcceleration?
  - courseVariance?
  - stepHz?
  - lastSaved
- startDate
- endDate
- lastSaved

### visit extends common

Notes:

- if one of place, manualPlace, or placeId is present, all three will be present
- if either averageHeartRate or maxHeartRate is present, both will be present
- if isHome is present, it will be true
- if either foursquareVenueId or foursquareCategoryId is present, both will be present

- radius
  - mean
  - sd
- maxHeartRate?
- averageHeartRate?
- center
  - longitude
  - latitude
- streetAddress?
- place?
  - placeId
  - isHome?: true
  - name
  - center
    - longitude
    - latitude
  - radius
    - mean
    - sd
  - foursquareVenueId?
  - foursquareCategoryId?
  - lastSaved
- manualPlace?
- placeId?

### activity extends common

- uncertainActivityType
- manualActivityType
- activityType
- activityTypeConfidenceScore

## what to keep

### common

- itemId
- nextItemId?
- previousItemId
- isVisit
- altitude
- samples
  - date
  - classifiedType
  - location
    - speed
    - longitude
    - latitude
    - timestamp
    - altitude
- startDate
- endDate

### visit

- radius
  - mean
  - sd
- center
  - longitude
  - latitude
- streetAddress?
- place?
  - placeId
  - isHome?: true
  - name
  - center
    - longitude
    - latitude
  - radius
    - mean
    - sd
  - foursquareVenueId?
  - foursquareCategoryId?
- manualPlace?
- placeId?

### activity

- uncertainActivityType
- manualActivityType
- activityType
- activityTypeConfidenceScore
