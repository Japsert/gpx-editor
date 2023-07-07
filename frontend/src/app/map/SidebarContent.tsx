import DataArtist from "@/utils/dataArtist";
import { GeoJson, arcJsonToGeoJson } from "@/utils/dataImport";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface SidebarContentProps {
  dataArtist?: DataArtist;
}

/** Returns true if the two dates are the same day. */
function isSameDay(date1: Date, date2: Date) {
  return date1.toDateString() === date2.toDateString();
}

class GeoJsonMap extends Map<Date, GeoJson> {
  get(key: Date): GeoJson | undefined {
    for (const [date, geoJson] of this.entries()) {
      if (isSameDay(date, key)) return geoJson;
    }
  }
}

export default function SidebarContent({ dataArtist }: SidebarContentProps) {
  // TODO move state to page.tsx?
  const [data, setData] = useState<GeoJsonMap>(new GeoJsonMap());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (!dataArtist) return;
    const geoJson = data.get(currentDate);
    if (!geoJson) {
      dataArtist.clear();
    } else {
      dataArtist.clear();
      dataArtist.draw(currentDate, geoJson);
    }
  }, [currentDate, data, dataArtist]);

  function processImportFiles(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    // Loop over selected files, convert to geojson, and import
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      // file is named like 2023-07-05.json
      const date = new Date(file.name.split(".")[0]);

      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target) return;
        if (!e.target.result) return;
        const contents = e.target.result as string;
        const geoJson = arcJsonToGeoJson(contents);
        if (!geoJson) return;
        setData((prev) => prev.set(date, geoJson));
      };
      reader.readAsText(file);
    }
  }

  /** Sets the current date to the day before it. */
  function prevDay() {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    setCurrentDate(date);
  }

  /** Sets the current date to the day after it, unless the date is today. */
  function nextDay() {
    if (isSameDay(currentDate, new Date())) return;
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    setCurrentDate(date);
  }

  /**
   * Returns a string representation of the current date.
   * If the date is today, returns "Today", if yesterday, returns "Yesterday".
   * Otherwise, returns a string like "Wednesday, 5 July 2023".
   */
  function currentDateToString() {
    if (isSameDay(currentDate, new Date())) return "Today";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (isSameDay(currentDate, yesterday)) return "Yesterday";

    const dayOfWeek = currentDate.toLocaleDateString("en", { weekday: "long" });
    const day = currentDate.toLocaleDateString("en", { day: "numeric" });
    const month = currentDate.toLocaleDateString("en", { month: "long" });
    const year = currentDate.toLocaleDateString("en", { year: "numeric" });
    const dateString = `${dayOfWeek}, ${day} ${month} ${year}`;
    return dateString;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Button to import data from file */}
      <h2 className="sidebar-header mt-0">Load from file</h2>
      <form className="mb-2">
        <input
          title="Load from File"
          type="file"
          accept=".json"
          multiple
          onChange={(e) => processImportFiles(e)}
        />
      </form>

      <hr className="-ml-4 -mr-4" />

      <div className="flex full items-center mt-2 mb-2">
        <button onClick={prevDay} className="p-2">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <h2 className="text-lg grow text-center">{currentDateToString()}</h2>
        <button
          onClick={nextDay}
          className="p-2"
          disabled={isSameDay(currentDate, new Date())}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="lg"
            className={
              isSameDay(currentDate, new Date()) ? "text-gray-400" : ""
            }
          />
        </button>
      </div>

      <hr className="-ml-4 -mr-4" />

      {data.get(currentDate) && (
        <pre className="overflow-y-scroll">
          {JSON.stringify(data.get(currentDate), null, 2)}
        </pre>
      )}

      {!data.get(currentDate) && (
        <div className="grow flex justify-center items-center">
          <p className="text-gray-500 italic">No data for this day</p>
        </div>
      )}
    </div>
  );
}
