"use client";
import { useState } from "react";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";
import { GeoJson } from "./dataImportUtils";

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function drawSampleData() {
    if (!map) {
      console.error("Map not initialized");
      return;
    }

    // Add a data source containing sample GeoJSON data
    map.addSource("sample", {
      type: "geojson",
      data: "/sample.geojson",
    });

    // Add a layer that draws the data source.
    map.addLayer({
      id: "sample",
      type: "line",
      source: "sample",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#5abeff",
        "line-width": 4,
      },
    });
  }

  function importGeoJson(geoJson: GeoJson) {
    if (!map) {
      console.error("Map not initialized");
      return;
    }
    
    console.debug("importing geojson", geoJson);

    // Add a data source containing sample GeoJSON data
    map.addSource("imported", {
      type: "geojson",
      data: geoJson,
    });

    // Add a layer that draws the data source.
    map.addLayer({
      id: "imported",
      type: "line",
      source: "imported",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#5abeff",
        "line-width": 4,
      },
    });
  }

  return (
    <main
      className={`${
        sidebarOpen ? "w-full" : "w-[calc(100%+24rem)]"
      } transition-all duration-500 h-full min-h-0`}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="grow">
          <MapComponent setMap={setMap} />
        </div>
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          drawSampleData={drawSampleData}
          importGeoJson={importGeoJson}
        />
      </div>
    </main>
  );
}
