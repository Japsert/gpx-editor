import { GeoJson } from "@/app/map/dataImportUtils";

export const sampleArcJson = `
{
  "timelineItems" : [
    {
      "nextItemId" : "494EC1DA-F3D5-4187-BC82-32DA4CAAB91B",
      "floorsAscended" : 0,
      "radius" : {
        "mean" : 2.1836622389556708,
        "sd" : 1.4351084311795657
      },
      "previousItemId" : "EFABAB99-7CC4-4FCE-BAFC-76B8A558D810",
      "samples" : [
        {
          "zAcceleration" : 0.055506371233949359,
          "recordingState" : "wakeup",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "F4C60C10-D21A-476F-9D36-DDD407532CAF",
          "location" : {
            "verticalAccuracy" : 21.344419479370117,
            "speed" : 0.16852088200848819,
            "longitude" : 6.579954964766773,
            "horizontalAccuracy" : 40,
            "course" : 281.71869937196414,
            "latitude" : 53.217746119394477,
            "timestamp" : "2023-06-23T17:44:13Z",
            "altitude" : 8.6905397776779978
          },
          "stepHz" : 0,
          "date" : "2023-06-23T17:44:13Z",
          "movingState" : "stationary",
          "timelineItemId" : "3CA195C2-12C0-4005-A8F2-7A78DF707896",
          "xyAcceleration" : 0.1247690499089964,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T17:44:33Z"
        },
        {
          "zAcceleration" : 0.055506371233949359,
          "recordingState" : "wakeup",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "B29ECF76-3F02-431D-9081-25E0CB8DF653",
          "location" : {
            "verticalAccuracy" : 21.344419479370117,
            "speed" : 0.12505977125480219,
            "longitude" : 6.5799313128961545,
            "horizontalAccuracy" : 40,
            "course" : 289.85951427997202,
            "latitude" : 53.217743680959089,
            "timestamp" : "2023-06-23T17:44:33Z",
            "altitude" : 8.949902048749296
          },
          "stepHz" : 0,
          "date" : "2023-06-23T17:44:33Z",
          "movingState" : "stationary",
          "timelineItemId" : "3CA195C2-12C0-4005-A8F2-7A78DF707896",
          "xyAcceleration" : 0.1247690499089964,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T17:44:53Z"
        },
        {
          "zAcceleration" : 0.055506371233949359,
          "recordingState" : "wakeup",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "8579DB9E-BD37-4643-B157-0A2F60555284",
          "location" : {
            "verticalAccuracy" : 21.344419479370117,
            "speed" : 0.11772129815944539,
            "longitude" : 6.5799086719827198,
            "horizontalAccuracy" : 40,
            "course" : 290.26710012514673,
            "latitude" : 53.217739746467799,
            "timestamp" : "2023-06-23T17:44:53Z",
            "altitude" : 9.0901354876519918
          },
          "stepHz" : 0,
          "date" : "2023-06-23T17:44:53Z",
          "movingState" : "stationary",
          "timelineItemId" : "3CA195C2-12C0-4005-A8F2-7A78DF707896",
          "xyAcceleration" : 0.1247690499089964,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T17:45:14Z"
        }
      ],
      "isVisit" : true,
      "floorsDescended" : 0,
      "endDate" : "2023-06-23T22:06:11Z",
      "center" : {
        "longitude" : 6.5799023235056975,
        "latitude" : 53.217735370565698
      },
      "startDate" : "2023-06-23T17:44:13Z",
      "altitude" : 5.4842666532176141,
      "stepCount" : 261,
      "lastSaved" : "2023-06-23T22:28:53Z",
      "itemId" : "3CA195C2-12C0-4005-A8F2-7A78DF707896"
    },
    {
      "uncertainActivityType" : true,
      "nextItemId" : "68DE3DFB-423D-4FB5-A41F-55F7A195709B",
      "floorsAscended" : 1,
      "previousItemId" : "3CA195C2-12C0-4005-A8F2-7A78DF707896",
      "manualActivityType" : false,
      "samples" : [
        {
          "zAcceleration" : 0.055506371233949359,
          "recordingState" : "wakeup",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "1D45C19F-99B0-4DF7-88A5-C705462AEC57",
          "location" : {
            "verticalAccuracy" : 16.145178476969402,
            "speed" : 0.34496509057129077,
            "longitude" : 6.5798655417418166,
            "horizontalAccuracy" : 36.666666666666664,
            "course" : 251.1347023677294,
            "latitude" : 53.217714601753897,
            "timestamp" : "2023-06-23T22:06:11Z",
            "altitude" : 4.4723995035127064
          },
          "stepHz" : 0,
          "date" : "2023-06-23T22:06:11Z",
          "movingState" : "stationary",
          "timelineItemId" : "494EC1DA-F3D5-4187-BC82-32DA4CAAB91B",
          "xyAcceleration" : 0.1247690499089964,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T22:28:53Z"
        },
        {
          "zAcceleration" : 0.44265712578035493,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "9CB3F23B-D4EA-44C5-B918-6EF6D598FDA8",
          "location" : {
            "verticalAccuracy" : 17.030311346169359,
            "speed" : 1.3387482229613483,
            "longitude" : 6.5793535882731069,
            "horizontalAccuracy" : 35.758005636217469,
            "course" : 318.35307902110975,
            "latitude" : 53.218000767632425,
            "timestamp" : "2023-06-23T22:06:48Z",
            "altitude" : 5.0459889355194596
          },
          "stepHz" : 0,
          "date" : "2023-06-23T22:06:48Z",
          "movingState" : "moving",
          "timelineItemId" : "494EC1DA-F3D5-4187-BC82-32DA4CAAB91B",
          "xyAcceleration" : 0.58998284777324306,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T22:28:53Z"
        },
        {
          "zAcceleration" : 0.33979246480604858,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 0.011444988822414959,
          "sampleId" : "6D1B2CF4-81B0-4995-8586-CE4E6EBC8822",
          "location" : {
            "verticalAccuracy" : 12.449500386946797,
            "speed" : 2.4522895812988281,
            "longitude" : 6.5790718279532747,
            "horizontalAccuracy" : 28.990273707218424,
            "course" : 324.43457754312732,
            "latitude" : 53.218219905004709,
            "timestamp" : "2023-06-23T22:06:59Z",
            "altitude" : 3.7696309529034355
          },
          "stepHz" : 0,
          "date" : "2023-06-23T22:06:59Z",
          "movingState" : "moving",
          "timelineItemId" : "494EC1DA-F3D5-4187-BC82-32DA4CAAB91B",
          "xyAcceleration" : 0.52400167196707503,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T22:28:53Z"
        }
      ],
      "isVisit" : false,
      "activityTypeConfidenceScore" : 0,
      "floorsDescended" : 0,
      "activityType" : "cycling",
      "endDate" : "2023-06-23T22:27:47Z",
      "startDate" : "2023-06-23T22:06:11Z",
      "altitude" : 4.0352161828882736,
      "lastSaved" : "2023-06-24T01:29:55Z",
      "stepCount" : 1664,
      "itemId" : "494EC1DA-F3D5-4187-BC82-32DA4CAAB91B"
    },
    {
      "nextItemId" : "3E25EF12-010F-4395-A94A-D9A5E53DED66",
      "placeId" : "424B43C9-A0AE-4600-9FBE-C0FAD8696185",
      "place" : {
        "placeId" : "424B43C9-A0AE-4600-9FBE-C0FAD8696185",
        "radius" : {
          "mean" : 21.73600023933264,
          "sd" : 217.08963097317471
        },
        "isHome" : true,
        "lastSaved" : "2023-06-24T12:26:27Z",
        "name" : "Thuis",
        "center" : {
          "longitude" : 6.6099070082092144,
          "latitude" : 53.178111769653377
        }
      },
      "radius" : {
        "mean" : 4.2605155487350039,
        "sd" : 4.8352227134234971
      },
      "previousItemId" : "494EC1DA-F3D5-4187-BC82-32DA4CAAB91B",
      "floorsAscended" : 5,
      "manualPlace" : false,
      "isVisit" : true,
      "floorsDescended" : 5,
      "samples" : [
        {
          "zAcceleration" : 0.18686362821866823,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 0.090864828819989363,
          "sampleId" : "BD70D214-472D-4A05-9A6D-A8EE85469BFF",
          "location" : {
            "verticalAccuracy" : 3.0154446046451788,
            "speed" : 0.035251245594193126,
            "longitude" : 6.6101078406470206,
            "horizontalAccuracy" : 13.38574175339061,
            "course" : 316.31633484945638,
            "latitude" : 53.178044673398347,
            "timestamp" : "2023-06-23T22:27:47Z",
            "altitude" : 3.5200213663232813
          },
          "stepHz" : 0,
          "date" : "2023-06-23T22:27:47Z",
          "movingState" : "stationary",
          "timelineItemId" : "68DE3DFB-423D-4FB5-A41F-55F7A195709B",
          "xyAcceleration" : 0.36326326602284448,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T22:27:57Z"
        },
        {
          "zAcceleration" : 0.31240055137087053,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 0.30205695582875491,
          "sampleId" : "181BD3A2-61EA-477D-80E8-4F2E4C133E3E",
          "location" : {
            "verticalAccuracy" : 2.5605539097772234,
            "speed" : 0.091856924577442323,
            "longitude" : 6.6101050933679089,
            "horizontalAccuracy" : 15.0298017989961,
            "course" : 324.45581166692483,
            "latitude" : 53.178046130700331,
            "timestamp" : "2023-06-23T22:27:48Z",
            "altitude" : 3.4849244476336927
          },
          "stepHz" : 0,
          "date" : "2023-06-23T22:27:48Z",
          "movingState" : "stationary",
          "timelineItemId" : "68DE3DFB-423D-4FB5-A41F-55F7A195709B",
          "xyAcceleration" : 0.60666142147665836,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T22:28:01Z"
        },
        {
          "zAcceleration" : 0.34881293604607316,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 0.3062818598334871,
          "sampleId" : "B1D95C07-1817-472F-89DE-1AA117A8EF97",
          "location" : {
            "verticalAccuracy" : 2.268771814863332,
            "speed" : 0.16534076371587342,
            "longitude" : 6.6100848944447756,
            "horizontalAccuracy" : 16.188643532373931,
            "course" : 325.96480495744919,
            "latitude" : 53.178055653283096,
            "timestamp" : "2023-06-23T22:27:52Z",
            "altitude" : 3.4467114126261316
          },
          "stepHz" : 0,
          "date" : "2023-06-23T22:27:52Z",
          "movingState" : "stationary",
          "timelineItemId" : "68DE3DFB-423D-4FB5-A41F-55F7A195709B",
          "xyAcceleration" : 0.75128162960062084,
          "classifiedType" : "cycling",
          "lastSaved" : "2023-06-23T22:28:04Z"
        }
      ],
      "endDate" : "2023-06-24T11:38:42Z",
      "center" : {
        "longitude" : 6.6099816467122903,
        "latitude" : 53.178041484922133
      },
      "startDate" : "2023-06-23T22:27:47Z",
      "altitude" : 4.4741241808950898,
      "stepCount" : 470,
      "lastSaved" : "2023-06-24T12:25:18Z",
      "itemId" : "68DE3DFB-423D-4FB5-A41F-55F7A195709B"
    },
    {
      "uncertainActivityType" : true,
      "nextItemId" : "EF9C9423-D424-4183-BAF5-24E751E29B70",
      "floorsAscended" : 0,
      "previousItemId" : "68DE3DFB-423D-4FB5-A41F-55F7A195709B",
      "manualActivityType" : false,
      "samples" : [
        {
          "zAcceleration" : 0.003256594153732484,
          "recordingState" : "wakeup",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "EFE65AD2-77E5-4000-A6E4-5A7B00F8808A",
          "location" : {
            "verticalAccuracy" : 19.591020398450432,
            "speed" : 2.1139075308119744e-10,
            "longitude" : 6.6099737664450098,
            "horizontalAccuracy" : 21.53766890015563,
            "course" : 230.34791087112833,
            "latitude" : 53.178038126332247,
            "timestamp" : "2023-06-24T11:37:46Z",
            "altitude" : 4.2488348482041767
          },
          "stepHz" : 0,
          "date" : "2023-06-24T11:37:46Z",
          "movingState" : "stationary",
          "timelineItemId" : "3E25EF12-010F-4395-A94A-D9A5E53DED66",
          "xyAcceleration" : 0.0034131815417053476,
          "classifiedType" : "walking",
          "lastSaved" : "2023-06-24T12:25:18Z"
        },
        {
          "zAcceleration" : 0.003256594153732484,
          "recordingState" : "wakeup",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "D6DBCBE1-A43F-42F5-A123-D91F39157E5F",
          "location" : {
            "verticalAccuracy" : 20.15104866027832,
            "speed" : 0.24948631209955335,
            "longitude" : 6.609768194980723,
            "horizontalAccuracy" : 35,
            "course" : 234.61401968267552,
            "latitude" : 53.177943093663195,
            "timestamp" : "2023-06-24T11:38:42Z",
            "altitude" : 4.5040842306165585
          },
          "stepHz" : 0,
          "date" : "2023-06-24T11:38:42Z",
          "movingState" : "stationary",
          "timelineItemId" : "3E25EF12-010F-4395-A94A-D9A5E53DED66",
          "xyAcceleration" : 0.0034131815417053476,
          "classifiedType" : "walking",
          "lastSaved" : "2023-06-24T12:25:18Z"
        },
        {
          "zAcceleration" : 1.2712131034920024,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 1,
          "sampleId" : "24F19605-FBCF-4AF1-BD4C-69AFD145333D",
          "location" : {
            "verticalAccuracy" : 13.867245469953152,
            "speed" : 1.6225662231445312,
            "longitude" : 6.6091055433999193,
            "horizontalAccuracy" : 28.828532166690199,
            "course" : 285.73925743559874,
            "latitude" : 53.177990701909167,
            "timestamp" : "2023-06-24T11:39:40Z",
            "altitude" : 4.6311297387951091
          },
          "stepHz" : 0,
          "date" : "2023-06-24T11:39:40Z",
          "movingState" : "moving",
          "timelineItemId" : "3E25EF12-010F-4395-A94A-D9A5E53DED66",
          "xyAcceleration" : 1.4016557815809478,
          "classifiedType" : "walking",
          "lastSaved" : "2023-06-24T12:25:18Z"
        }
      ],
      "isVisit" : false,
      "activityTypeConfidenceScore" : 0,
      "floorsDescended" : 0,
      "activityType" : "walking",
      "endDate" : "2023-06-24T12:21:10Z",
      "startDate" : "2023-06-24T11:37:46Z",
      "altitude" : 4.3818836548751676,
      "lastSaved" : "2023-06-24T12:25:24Z",
      "stepCount" : 3237,
      "itemId" : "3E25EF12-010F-4395-A94A-D9A5E53DED66"
    },
    {
      "floorsAscended" : 1,
      "placeId" : "424B43C9-A0AE-4600-9FBE-C0FAD8696185",
      "place" : {
        "placeId" : "424B43C9-A0AE-4600-9FBE-C0FAD8696185",
        "radius" : {
          "mean" : 21.73600023933264,
          "sd" : 217.08963097317471
        },
        "isHome" : true,
        "lastSaved" : "2023-06-24T12:26:27Z",
        "name" : "Thuis",
        "center" : {
          "longitude" : 6.6099070082092144,
          "latitude" : 53.178111769653377
        }
      },
      "radius" : {
        "mean" : 4.4544774400202467,
        "sd" : 2.9218160209457213
      },
      "previousItemId" : "3E25EF12-010F-4395-A94A-D9A5E53DED66",
      "samples" : [
        {
          "zAcceleration" : 0.96632437746261013,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 0.14897186534094597,
          "sampleId" : "82D15CAB-2A8B-4458-A15E-AE9EF078BA8E",
          "location" : {
            "verticalAccuracy" : 6.2268647331962379,
            "speed" : 0.53897824836565267,
            "longitude" : 6.6101917472607408,
            "horizontalAccuracy" : 9.8267542258415475,
            "course" : 322.18914243854692,
            "latitude" : 53.177966670280988,
            "timestamp" : "2023-06-24T12:21:10Z",
            "altitude" : 3.6492996808676197
          },
          "stepHz" : 0,
          "date" : "2023-06-24T12:21:10Z",
          "movingState" : "moving",
          "timelineItemId" : "EF9C9423-D424-4183-BAF5-24E751E29B70",
          "xyAcceleration" : 2.140145583701345,
          "classifiedType" : "walking",
          "lastSaved" : "2023-06-24T12:25:24Z"
        },
        {
          "zAcceleration" : 0.91995175075813662,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 0.31362964905637747,
          "sampleId" : "24977AD3-C964-4209-A572-B9330394F0F3",
          "location" : {
            "verticalAccuracy" : 6.4102576366479678,
            "speed" : 0.35140430023575953,
            "longitude" : 6.61017876742814,
            "horizontalAccuracy" : 9.6812047749987435,
            "course" : 347.43869457377161,
            "latitude" : 53.177976324291194,
            "timestamp" : "2023-06-24T12:21:13Z",
            "altitude" : 3.8098091863765058
          },
          "stepHz" : 0,
          "date" : "2023-06-24T12:21:13Z",
          "movingState" : "stationary",
          "timelineItemId" : "EF9C9423-D424-4183-BAF5-24E751E29B70",
          "xyAcceleration" : 1.9711409766888197,
          "classifiedType" : "walking",
          "lastSaved" : "2023-06-24T12:25:24Z"
        },
        {
          "zAcceleration" : 0.92487629266894933,
          "recordingState" : "recording",
          "secondsFromGMT" : 7200,
          "courseVariance" : 0.57428016809688376,
          "sampleId" : "0A00AA1E-3D0A-413A-BD00-865AE0C59732",
          "location" : {
            "verticalAccuracy" : 7.4160113633734852,
            "speed" : 0.44391080858740251,
            "longitude" : 6.6101768904711351,
            "horizontalAccuracy" : 10.625601844704647,
            "course" : 326.99226819307427,
            "latitude" : 53.177977307338125,
            "timestamp" : "2023-06-24T12:21:14Z",
            "altitude" : 3.8233152578017604
          },
          "stepHz" : 1.6572965383529663,
          "date" : "2023-06-24T12:21:14Z",
          "movingState" : "stationary",
          "timelineItemId" : "EF9C9423-D424-4183-BAF5-24E751E29B70",
          "xyAcceleration" : 1.2546452540813879,
          "classifiedType" : "walking",
          "lastSaved" : "2023-06-24T12:25:24Z"
        }
      ],
      "manualPlace" : false,
      "isVisit" : true,
      "floorsDescended" : 0,
      "endDate" : "2023-06-24T12:46:43Z",
      "center" : {
        "longitude" : 6.6100210723594346,
        "latitude" : 53.178033471158443
      },
      "startDate" : "2023-06-24T12:21:10Z",
      "altitude" : 3.9378605455727729,
      "stepCount" : 108,
      "lastSaved" : "2023-06-24T12:47:12Z",
      "itemId" : "EF9C9423-D424-4183-BAF5-24E751E29B70"
    }
  ]
}
`;

export const expectedGeoJson: GeoJSON.GeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [6.579954964766773, 53.21774611939448],
          [6.5799313128961545, 53.21774368095909],
          [6.57990867198272, 53.2177397464678],
        ],
      },
      properties: { timestamp: 1687542253000 },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [6.579865541741817, 53.2177146017539],
          [6.579353588273107, 53.218000767632425],
          [6.579071827953275, 53.21821990500471],
        ],
      },
      properties: { timestamp: 1687557971000 },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [6.610107840647021, 53.17804467339835],
          [6.610105093367909, 53.17804613070033],
          [6.610084894444776, 53.178055653283096],
        ],
      },
      properties: { timestamp: 1687559267000 },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [6.60997376644501, 53.17803812633225],
          [6.609768194980723, 53.177943093663195],
          [6.609105543399919, 53.17799070190917],
        ],
      },
      properties: { timestamp: 1687606666000 },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [6.610191747260741, 53.17796667028099],
          [6.61017876742814, 53.177976324291194],
          [6.610176890471135, 53.177977307338125],
        ],
      },
      properties: { timestamp: 1687609270000 },
    },
  ],
};
