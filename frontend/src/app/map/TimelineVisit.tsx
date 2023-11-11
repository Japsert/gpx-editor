import { Visit } from "@/utils/dataImport";
import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TimelineVisitProps {
  visit: Visit;
}

export default function TimelineVisit({ visit }: TimelineVisitProps) {
  // Format time
  const time = new Date(visit.properties.startDate);
  const timeStringHours = time.getHours().toString().padStart(2, "0");
  const timeStringMinutes = time.getMinutes().toString().padStart(2, "0");
  const timeString = `${timeStringHours}:${timeStringMinutes}`;

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

  function determineIcon() {
    if (visit.properties.place?.isHome) return faHouse;
    // other icons...
    return faLocationDot;
  }

  function determineName() {
    if (visit.properties.place?.isHome) return "Home";
    if (visit.properties.place?.name) return visit.properties.place.name;
    if (visit.properties.streetAddress) return visit.properties.streetAddress;
    // other names...
    return "Unnamed place";
  }

  return (
    <tr key={visit.properties.itemId} className="flex items-center my-1">
      {/* TODO: The w-16 here is hardcoded */}
      <td className="flex flex-col w-16">
        <span className="w-12">{timeString}</span>
        <span className="text-sm">{durationString}</span>
      </td>

      <td className="w-16 text-center">
        <FontAwesomeIcon icon={determineIcon()} size="lg" />
      </td>

      <td>
        <span className="font-medium">{determineName()}</span>
      </td>
    </tr>
  );
}
