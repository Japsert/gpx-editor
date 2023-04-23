import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";

export default function MapPage() {
  return (
    <>
      {/* Map component */}
      <div id="map-container" className="w-full h-full flex-grow">
        <MapComponent />
      </div>

      {/* Sidebar */}
      <div id="sidebar-container" className="w-96 p-4 overflow-y-auto">
        <Sidebar />
      </div>
    </>
  );
}
