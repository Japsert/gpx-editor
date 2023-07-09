import { Activity, GeoJson, Visit } from "@/utils/dataImport";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TimelineProps {
  geoJson?: GeoJson;
}

export default function Timeline({ geoJson }: TimelineProps) {
  function createVisitHtml(visit: Visit) {
    // Format time
    const time = new Date(visit.properties.time);
    const timeString = `${time.getHours()}:${time.getMinutes()}`; // TODO: use Luxon to format time

    const durationSeconds = 3661; // TODO: get duration from nextItem.time - time
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const durationComponents: string[] = [];
    if (hours > 0) {
      durationComponents.push(`${hours}h`);
      if (minutes > 0) {
        durationComponents.push(`${minutes}m`);
      }
    } else if (minutes > 0) {
      durationComponents.push(`${minutes}m`);
      if (minutes < 3) {
        durationComponents.push(`${seconds}s`);
      }
    } else {
      durationComponents.push(`${seconds}s`);
    }
    const durationString = durationComponents.join(" ");

    return (
      <tr key={visit.properties.itemId} className="flex items-center my-1">
        <td className="flex flex-col w-12">
          <span className="w-12">{timeString}</span>
          <span className="text-sm">{durationString}</span>
        </td>

        <td className="w-16 text-center">
          <FontAwesomeIcon icon={faLocationDot} size="lg" />
        </td>

        <td>
          <span className="font-medium">{visit.properties.streetAddress}</span>
        </td>
      </tr>
    );
  }

  function createActivityHtml(activity: Activity) {
    const activityType = activity.properties.activityType;
    let colorClass = "";
    switch (activityType) {
      case "walking":
        colorClass = "bg-green-500";
        break;
      case "running":
        colorClass = "bg-orange-500";
        break;
      case "cycling":
        colorClass = "bg-sky-500";
        break;
      default:
        colorClass = "bg-red-500";
        break;
    }

    // Format activity type
    const firstLetterUppercase = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const activityTypeString = firstLetterUppercase(activityType);

    // Format duration
    const timestamps = activity.properties.timestamps;
    const startDate = new Date(timestamps[0]);
    const endDate = new Date(timestamps[timestamps.length - 1]);
    const activityDurationSeconds =
      (endDate.getTime() - startDate.getTime()) / 1000;
    const hours = Math.floor(activityDurationSeconds / 3600);
    const minutes = Math.floor((activityDurationSeconds % 3600) / 60);
    const seconds = Math.floor(activityDurationSeconds % 60);
    const durationComponents: string[] = [];
    if (hours > 0) {
      durationComponents.push(`${hours} hour${hours > 1 ? "s" : ""}`);
      if (minutes > 0) {
        durationComponents.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      }
    } else if (minutes > 0) {
      durationComponents.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      if (minutes < 3) {
        durationComponents.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
      }
    } else {
      durationComponents.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
    }
    const durationString = durationComponents.join(", ");

    return (
      <tr key={activity.properties.itemId} className="flex items-center my-1">
        <td className="w-12"></td>

        <td className="w-16 text-center">
          <span
            // inline-block is the only way I can find to display and center the span
            className={`inline-block h-16 w-1 ${colorClass} rounded-full`}
          />
        </td>

        <td className="flex flex-col">
          <span className="font-medium text-sm leading-[1.2]">
            {activityTypeString}
          </span>
          <span className="text-sm">{durationString}</span>
        </td>
      </tr>
    );
  }

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
        {geoJson.features.map((feature) => {
          const type = feature.properties?.type;
          if (!type) return;
          if (type === "visit") {
            return createVisitHtml(feature as Visit);
          } else {
            return createActivityHtml(feature as Activity);
          }
        })}
      </tbody>
    </table>
  );
}
