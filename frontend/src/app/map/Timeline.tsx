import { Activity, GeoJson, Visit } from "@/utils/dataImport";
import {
  IconDefinition,
  faHouse,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TimelineProps {
  geoJson?: GeoJson;
}

export default function Timeline({ geoJson }: TimelineProps) {
  function createVisitHtml(visit: Visit) {
    // Format time
    const time = new Date(visit.properties.startDate);
    const timeString = `${time.getHours()}:${time.getMinutes()}`;

    // Format duration
    const startDate = new Date(visit.properties.startDate);
    const endDate = new Date(visit.properties.endDate);
    const durationSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    const days = Math.floor(durationSeconds / 86400);
    const hours = Math.floor((durationSeconds % 86400) / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const durationComponents: string[] = [];
    if (days > 0) {
      durationComponents.push(`${days}d`);
      if (hours > 0) {
        durationComponents.push(`${hours}h`);
      }
    } else if (hours > 0) {
      durationComponents.push(`${hours}h`);
      if (minutes > 0) {
        durationComponents.push(`${minutes}m`);
      }
    } else if (minutes > 0) {
      durationComponents.push(`${minutes}m`);
      if (minutes < 3 && seconds > 0) {
        durationComponents.push(`${seconds}s`);
      }
    } else {
      durationComponents.push(`${seconds}s`);
    }
    const durationString = durationComponents.join(" ");

    // Determine icon
    function determineIcon() {
      if (visit.properties.place?.isHome) return faHouse;
      // other icons...
      return faLocationDot;
    }
    const icon: IconDefinition = determineIcon();

    // Determine name
    function determineName() {
      if (visit.properties.place?.isHome) return "Home";
      if (visit.properties.place?.name) return visit.properties.place.name;
      if (visit.properties.streetAddress) return visit.properties.streetAddress;
      // other names...
      return "Unnamed place";
    }
    const name: string = determineName();

    return (
      <tr key={visit.properties.itemId} className="flex items-center my-1">
        {/* TODO: The w-16 here is hardcoded */}
        <td className="flex flex-col w-16">
          <span className="w-12">{timeString}</span>
          <span className="text-sm">{durationString}</span>
        </td>

        <td className="w-16 text-center">
          <FontAwesomeIcon icon={icon} size="lg" />
        </td>

        <td>
          <span className="font-medium">{name}</span>
        </td>
      </tr>
    );
  }

  function createActivityHtml(activity: Activity) {
    const activityType = activity.properties.activityType;
    // Determine class associated with activity type
    function determineActivityColor() {
      switch (activityType) {
        case "walking":
          return "bg-green-500";
        case "running":
          return "bg-orange-500";
        case "cycling":
          return "bg-sky-500";
        default:
          return "bg-gray-500";
      }
    }
    const colorClass = determineActivityColor();

    // Format activity type
    const firstLetterUppercase = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const activityTypeString = firstLetterUppercase(activityType);

    // Format duration
    const startDate = new Date(activity.properties.startDate);
    const endDate = new Date(activity.properties.endDate);
    const durationSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const durationComponents: string[] = [];
    if (hours > 0) {
      durationComponents.push(`${hours} hour${hours > 1 ? "s" : ""}`);
      if (minutes > 0) {
        durationComponents.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      }
    } else if (minutes > 0) {
      durationComponents.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      if (minutes < 3 && seconds > 0) {
        durationComponents.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
      }
    } else {
      durationComponents.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
    }
    const durationString = durationComponents.join(", ");

    return (
      <tr key={activity.properties.itemId} className="flex items-center my-1">
        {/* TODO: The w-16 here is hardcoded */}
        <td className="w-16"></td>

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
        {geoJson.features
          .slice() // Create a copy of the array
          .reverse() // Reverse the copy in place
          .map((feature) => {
            if (feature.properties?.isVisit) {
              return createVisitHtml(feature as Visit);
            } else {
              return createActivityHtml(feature as Activity);
            }
          })}
      </tbody>
    </table>
  );
}
