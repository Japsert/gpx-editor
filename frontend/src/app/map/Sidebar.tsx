import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarContent from "./SidebarContent";
import { GeoJson } from "./dataImportUtils";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  drawSampleData: () => void;
  importGeoJson: (geoJson: GeoJson) => void;
}

export default function Sidebar({
  sidebarOpen,
  toggleSidebar,
  drawSampleData,
  importGeoJson,
}: SidebarProps) {
  return (
    <div id="sidebar" className={`w-full h-1/2 md:w-96 md:h-full`}>
      <SidebarContent
        drawSampleData={drawSampleData}
        importGeoJson={importGeoJson}
      />

      {/* Collapse sidebar button */}
      <button
        id="collapse-sidebar-button"
        className="relative w-12 h-12 -left-12 bottom-20 bg-white z-20 rounded-s-lg hidden md:block"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`${
            sidebarOpen ? "" : "rotate-180"
          } transition-transform duration-500`}
        />
      </button>
    </div>
  );
}
