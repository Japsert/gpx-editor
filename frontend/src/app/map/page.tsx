"use client";
import DataArtist from "@/utils/dataArtist";
import { useState } from "react";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  // The data artist is created by the MapComponent and passed to the Sidebar so
  // that we can draw data on the map from the sidebar.
  const [dataArtist, setDataArtist] = useState<DataArtist | undefined>(
    undefined
  );

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <main
      className={`${
        sidebarOpen ? "w-full" : "w-[calc(100%+24rem)]"
      } transition-all duration-500 h-full min-h-0`}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="grow">
          <MapComponent setMap={setMap} setDataArtist={setDataArtist} />
        </div>
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          dataArtist={dataArtist}
        />
      </div>
    </main>
  );
}
