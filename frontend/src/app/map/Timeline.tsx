import { Activity, GeoJson, Visit } from "@/utils/dataImport";
import TimelineVisit from "./TimelineVisit";
import TimelineActivity from "./TimelineActivity";

interface TimelineProps {
  geoJson?: GeoJson;
}

export default function Timeline({ geoJson }: TimelineProps) {
  if (!geoJson) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-gray-500 italic">No data for this day</p>
      </div>
    );
  }
  return (
    <table className="h-full ml-4">
      <tbody>
        {geoJson.features
          .slice() // Create a copy of the array
          .reverse() // Reverse the copy in place
          .map((feature) => {
            if (feature.properties?.isVisit) {
              return <TimelineVisit visit={feature as Visit} />;
            } else {
              return <TimelineActivity activity={feature as Activity} />;
            }
          })}
      </tbody>
    </table>
  );
}
