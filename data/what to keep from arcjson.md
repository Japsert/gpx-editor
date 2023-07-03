# what to keep from arcjson

## common

- itemId
- nextItemId
- previousItemId
- isVisit
- altitude
- floorsAscended
- floorsDescended
- stepCount
- samples
  - sampleId
  - timelineItemId
  - date
  - secondsFromGMT: 7200
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
  - xyAcceleration
  - zAcceleration
  - courseVariance
  - stepHz
  - lastSaved
- startDate
- endDate
- lastSaved

## visit extends common

- hkStepCount
- radius
  - mean
  - sd
- activeEnergyBurned
- maxHeartRate?
- averageHeartRate?
- center
  - longitude
  - latitude
- streetAddress

## place extends visit

- place
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
- manualPlace
- placeId

## activity extends common

- uncertainActivityType
- manualActivityType
- activityType
- activityTypeConfidenceScore
