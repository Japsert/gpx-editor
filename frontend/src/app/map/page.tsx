"use client";
import { useState } from "react";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }
  
  return (
    <main
      className={`${
        sidebarOpen ? "w-full" : "w-[calc(100%+24rem)]"
      } transition-all duration-500 h-full min-h-0`}
    >
      <div className="flex h-full">
        <div className="grow">
          <MapComponent />
        </div>
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </main>
  );
}
