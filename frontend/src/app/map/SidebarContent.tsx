import DataArtist from "@/utils/dataArtist";
import { GeoJson, arcJsonToGeoJson } from "@/utils/dataImport";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Timeline from "./Timeline";
import axios from "axios";

const DATA_API_URL = process.env.NEXT_PUBLIC_DATA_API_URL;
if (!DATA_API_URL) console.error("DATA_API_URL not set");

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

interface GeoJsonEntry {
  id: number;
  date: string;
  data: GeoJson;
}

export default function SidebarContent({ dataArtist }: SidebarContentProps) {
  const [data, setData] = useState<GeoJsonMap>(new GeoJsonMap());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    drawGeoJsonByDates([currentDate]);
  }, [currentDate, dataArtist]);

  function drawGeoJsonByDates(dates: Date[]) {
    if (!dataArtist) return;
    // get data of this date from backend
    const datesString = dates
      .map((date) => date.toISOString().split("T")[0])
      .join(",");
    axios
      .get(DATA_API_URL!, {
        params: {
          dates: datesString,
        },
      })
      .then((response) => {
        const geoJsonMap = new GeoJsonMap();
        for (const entry of response.data as GeoJsonEntry[]) {
          const date = new Date(entry.date);
          const data = entry.data;
          geoJsonMap.set(new Date(date), data);
        }
        setData(geoJsonMap);

        // draw data on map
        if (geoJsonMap.size === 0) {
          dataArtist.clear();
        } else {
          dataArtist.clear();
          geoJsonMap.forEach((geoJson, date) => {
            dataArtist.draw(date, geoJson);
          });
        }
      })
      .catch((error) => {
        console.error("Error getting data from backend:", error.response);
      });
  }

  function drawAllData(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    // get all available dates from backend
    axios.get(DATA_API_URL!).then((response) => {
      const dates = response.data as string[];
      drawGeoJsonByDates(dates.map((date) => new Date(date)));
    });
  }

  function processImportFiles(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    // Loop over selected files, convert to geojson, and import
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      // file is named like 2023-07-05.json
      const date = file.name.split(".")[0];

      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target || !e.target.result) return;
        const fileContents = e.target.result as string;
        // convert to geojson
        const data = arcJsonToGeoJson(fileContents);
        // send to backend
        axios
          .post(DATA_API_URL!, {
            date,
            data,
          })
          .then((response) => {
            console.debug("Uploaded data to backend.", response);
          })
          .catch((error) => {
            const status = error.response?.status;
            if (status === 409) {
              console.error("Data already exists:", date);
            } else {
              console.error("Error uploading data to backend:", error.response);
            }
          });
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
      <form className="mt-2">
        <input
          title="Load from File"
          type="file"
          accept=".json"
          multiple
          onChange={(e) => processImportFiles(e)}
          className="ml-4"
        />
      </form>

      <button type="button" className="border m-2" onClick={drawAllData}>
        Draw all data
      </button>

      <hr className="my-2" />

      {/* Date picker */}
      <div className="flex full items-center mx-2">
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

      <hr className="my-2" />

      <div className="h-full overflow-y-auto">
        <Timeline geoJson={data.get(currentDate)} />
      </div>
    </div>
  );
}
