import { toGeoJson } from "@/app/map/dataImportUtils";
import { sampleArcJson, expectedGeoJson } from "./sampleArcJson";

test("arcJsonToGeoJson", async () => {
  const result = await toGeoJson(sampleArcJson, "json");
  expect(result).toEqual(expectedGeoJson);
});
