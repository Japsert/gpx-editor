import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SidebarContent from "./SidebarContent";

export default function Sidebar({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  function loadFromFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target?.result;
      console.log(contents);
    };
    reader.readAsText(file);
  }

  return (
    <div id="sidebar" className={`w-96 h-full`}>
      <SidebarContent />

      {/* Collapse sidebar button */}
      <button
        id="collapse-sidebar-button"
        className="relative w-12 h-12 -left-12 bottom-20 bg-white z-20 rounded-s-lg"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`${sidebarOpen ? "" : "rotate-180"} transition-transform duration-500`}
        />
      </button>
    </div>
  );
}
