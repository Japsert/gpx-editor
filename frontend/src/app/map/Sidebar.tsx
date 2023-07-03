import DataArtist from "@/utils/dataArtist";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  dataArtist?: DataArtist;
}

export default function Sidebar({
  sidebarOpen,
  toggleSidebar,
  dataArtist,
}: SidebarProps) {
  return (
    <div id="sidebar" className={`w-full h-1/2 md:w-96 md:h-full`}>
      <SidebarContent dataArtist={dataArtist} />

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
