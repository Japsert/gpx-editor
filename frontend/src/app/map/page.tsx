import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";

export default function MapPage() {
  return (
    <div className="map-content flex grow min-h-0">
      {/* Map component */}
      <div className="mapboxgl-map">
      </div>

      {/* Sidebar */}
      <div className="w-96 m-4 overflow-y-scroll">
        <Sidebar />
      </div>
    </div>
  );
}
