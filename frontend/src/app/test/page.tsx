"use client";
import { useState } from "react";

export default function TestPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div
      className={`${
        sidebarOpen ? "w-3/4" : "w-[calc(3/4+24rem)]"
      } transition-all h-full bg-blue-100 overflow-hidden`}
    >
      <button type="button" onClick={toggleSidebar}>
        toggle
      </button>
      <div className="flex h-full">
        <div className="grow bg-green-200"></div>
        <div className="w-96 bg-red-100 p-4">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
}
