# ArcJson Types

## `TimelineItem`

- `nextItemId` (except last item)
- `floorsAscended`
- `radius`
- `previousItemId` (including first item)
- `samples`:
  - `zAcceleration`
  - `recordingState`
  - `secondsFromGMT`
  - `courseVariance`
  - `sampleId`
  - `location`
    - `verticalAccuracy`
    - `speed`
    - `longitude`
    - `horizontalAccuracy`
    - `course`
    - `latitude`
    - `timestamp`
    - `altitude`
  - `stepHz`
  - `date`
  - `movingState`
  - `timelineItemId`
  - `xyAcceleration`
  - `classifiedType`
  - `lastSaved`
- `isVisit`
- `floorsDescended`
- `endDate`
- `center`
- `startDate`
- `altitude`
- `stepCount`
- `lastSaved`
- `itemId`

## `Visit` (extends `TimelineItem`)

- `radius`
- `center`

## `Place` (extends `TimelineItem`)

- `placeId`
- `place`
  - `placeId`
  - `radius`
  - `isHome`
  - `lastSaved`
  - `name`
  - `center`
- `radius`
- `manualPlace`
- `center`

## `Activity` (extends `TimelineItem`)

- `uncertainActivityType`
- `manualActivityType`
- `activityTypeConfidenceScore`
- `activityType`
