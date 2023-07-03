# types

## place

- floorsDescended
- place
- hkStepCount
- radius
- itemId
- activeEnergyBurned
- lastSaved
- nextItemId
- stepCount
- endDate
- manualPlace
- altitude
- previousItemId
- placeId
- maxHeartRate?
- samples
- averageHeartRate?
- startDate
- center
- isVisit
- floorsAscended
- streetAddress

## visit

- floorsDescended
- hkStepCount
- radius
- itemId
- activeEnergyBurned
- lastSaved
- nextItemId
- stepCount
- endDate
- altitude
- previousItemId
- maxHeartRate?
- samples
- averageHeartRate?
- startDate
- center
- isVisit
- floorsAscended
- streetAddress

## activity

- uncertainActivityType
- nextItemId
- previousItemId
- floorsAscended
- manualActivityType
- samples
- isVisit
- activityTypeConfidenceScore
- floorsDescended
- activityType
- itemId
- lastSaved
- stepCount
- endDate
- altitude
- startDate

0. place
1. activity
2. place
3. activity
4. visit
5. activity
6. visit (no hr)
7. activity
8. place (no hr)
9. activity
10. place (no hr)
11. activity
12. place
13. activity
14. place
15. activity
16. place
17. activity
18. place (no hr)
19. activity
20. activity
21. visit (no hr)
22. activity
23. place
24. activity
25. place

## notes

- place = visit + placeId + place + manualPlace
