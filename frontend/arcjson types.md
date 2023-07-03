# ArcJson Types

## TimelineItem

- itemId
- nextItemId
- previousItemId
- floorsAscended
- floorsDescended
- radius
- samples:
  - zAcceleration
  - recordingState
  - secondsFromGMT
  - courseVariance
  - sampleId
  - location
    - verticalAccuracy
    - speed
    - longitude
    - horizontalAccuracy
    - course
    - latitude
    - timestamp
    - altitude
  - stepHz
  - date
  - movingState
  - timelineItemId
  - xyAcceleration
  - classifiedType
  - lastSaved
- isVisit
- endDate
- center
- startDate
- altitude
- stepCount
- lastSaved

## Visit (extends TimelineItem)

- radius
- center

## Place (extends TimelineItem)

- placeId
- place
  - placeId
  - radius
  - isHome
  - lastSaved
  - name
  - center
- radius
- manualPlace
- center

## Activity (extends TimelineItem)

- uncertainActivityType
- manualActivityType
- activityTypeConfidenceScore
- activityType
