import {
  GeoJson,
  arcJsonToGeoJson,
} from "@/utils/dataImport";
import { ArcJsonTimelineItem } from "@/utils/types";

describe("dataImportUtils", () => {
  test.skip("addFeature converts ArcJsonTimelineItemBase to GeoJson Feature and adds it to the GeoJson object", () => {
    const geoJson = new GeoJson();
    const date = new Date();
    const timestampISO = date.toISOString();
    const expectedTimestamp = date.getTime();
    const timelineItem: ArcJsonTimelineItem = {
      nextItemId: "nextItemId",
      floorsAscended: 1,
      previousItemId: "previousItemId",
      samples: [
        {
          zAcceleration: 1,
          recordingState: "recordingState",
          secondsFromGMT: 1,
          courseVariance: 1,
          sampleId: "sampleId",
          location: {
            verticalAccuracy: 1,
            speed: 1,
            longitude: 1,
            horizontalAccuracy: 1,
            course: 1,
            latitude: 1,
            timestamp: timestampISO,
            altitude: 1,
          },
          stepHz: 1,
          date: "date",
          movingState: "movingState",
          timelineItemId: "timelineItemId",
          xyAcceleration: 1,
          classifiedType: "classifiedType",
          lastSaved: "lastSaved",
        },
      ],
      isVisit: true,
      floorsDescended: 1,
      endDate: "endDate",
      startDate: "startDate",
      altitude: 1,
      stepCount: 1,
      lastSaved: "lastSaved",
      itemId: "itemId",
    };
    const expectedFeature = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [
            timelineItem.samples[0].location.longitude,
            timelineItem.samples[0].location.latitude,
          ],
        ],
      },
      properties: {
        timestamp: expectedTimestamp,
      },
    };

    geoJson.addPlace(timelineItem);

    expect(geoJson.features[0]).toEqual(expectedFeature);
  });

  test("arcJsonToGeoJson returns GeoJson object", () => {
    const arcJson = `{
      "timelineItems" : []
    }`;

    const geoJson = arcJsonToGeoJson(arcJson);

    expect(geoJson).toBeInstanceOf(GeoJson);
    expect(geoJson.type).toBe("FeatureCollection");
    expect(geoJson.features).toEqual([]);
  });

  test.skip("arcJsonToGeoJson converts ArcJson to GeoJson", () => {
    const date = new Date();
    const timestampISO = date.toISOString();
    const expectedTimestamp = date.getTime();
    const arcJson = `{
      "timelineItems" : [
        {
          "nextItemId" : "nextItemId",
          "floorsAscended" : 1,
          "previousItemId" : "previousItemId",
          "samples" : [
            {
              "zAcceleration" : 1,
              "recordingState" : "recordingState",
              "secondsFromGMT" : 1,
              "courseVariance" : 1,
              "sampleId" : "sampleId",
              "location" : {
                "verticalAccuracy" : 1,
                "speed" : 1,
                "longitude" : 1,
                "horizontalAccuracy" : 1,
                "course" : 1,
                "latitude" : 1,
                "timestamp" : "${timestampISO}",
                "altitude" : 1
              },
              "stepHz" : 1,
              "date" : "date",
              "movingState" : "movingState",
              "timelineItemId" : "timelineItemId",
              "xyAcceleration" : 1,
              "classifiedType" : "classifiedType",
              "lastSaved" : "lastSaved"
            }
          ],
          "isVisit" : true,
          "floorsDescended" : 1,
          "endDate" : "endDate",
          "startDate" : "startDate",
          "altitude" : 1,
          "stepCount" : 1,
          "lastSaved" : "lastSaved",
          "itemId" : "itemId"
        }
      ]
    }`;
    const expectedGeoJson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [[1, 1]],
          },
          properties: {
            timestamp: expectedTimestamp,
          },
        },
      ],
    };

    const geoJson = arcJsonToGeoJson(arcJson);

    expect(geoJson).toEqual(expectedGeoJson);
  });

  test("output of arcJsonToGeoJson", () => {
    // first, read json from data/2023-06-29.json
    const filePath = "@/../../data/2023-06-29.json";
    const fs = require("fs");
    const arcJson = fs.readFileSync(filePath, "utf8");
    const geoJson = arcJsonToGeoJson(arcJson);
    // write to data/2023-06-29.geojson
    const geoJsonFilePath = "@/../../data/2023-06-29.geojson";
    fs.writeFileSync(geoJsonFilePath, JSON.stringify(geoJson));
  });
});
