import { Activity } from "@/utils/dataImport";

interface TimelineActivityProps {
  activity: Activity;
}

export default function TimelineActivity({ activity }: TimelineActivityProps) {
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
          className={`inline-block h-16 w-1 ${determineActivityColor()} rounded-full`}
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
