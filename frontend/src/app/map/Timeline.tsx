import { Activity, GeoJson, Place, Visit } from "@/utils/dataImport";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TimelineProps {
  geoJson?: GeoJson;
}

export default function Timeline({ geoJson }: TimelineProps) {
  function createPlaceHtml(place: Place) {
    // Format time
    const time = new Date(place.properties.time);
    const timeString = `${time.getHours()}:${time.getMinutes()}`; // TODO: use Luxon to format time

    // Format duration
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
      <tr key={place.properties.itemId} className="flex my-1">
        <td className="flex flex-col">
          <span className="">{timeString}</span>
          <span className="text-sm">{durationString}</span>
        </td>
        <td className="w-8 text-center">
          <FontAwesomeIcon icon={faLocationDot} size="lg" />
        </td>
        <td>
          <span className="font-medium">{place.properties.name}</span>
        </td>
      </tr>
    );
  }

  function createVisitHtml(visit: Visit) {
    return (
      <div key={visit.properties.itemId}>
        visit: {visit.properties.streetAddress}
      </div>
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
      <div key={activity.properties.itemId} className="flex my-1">
        <span className={`ml-16 w-1 ${colorClass} rounded-full`} />
        <div className="flex flex-col my-1 ml-4">
          <span className="font-medium text-sm leading-[1.2]">
            {activityTypeString}
          </span>
          <span className="text-sm">{durationString}</span>
        </div>
      </div>
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
    <table className="h-full mx-2">
      {geoJson.features.map((feature) => {
        const type = feature.properties?.type;
        if (!type) return;
        switch (type) {
          case "place":
            return createPlaceHtml(feature as Place);

          case "visit":
            return createVisitHtml(feature as Visit);

          case "activity":
            return createActivityHtml(feature as Activity);
        }
      })}
    </table>
  );
}
