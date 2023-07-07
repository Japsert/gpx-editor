import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CollapseSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function CollapseSidebarButton({
  sidebarOpen,
  toggleSidebar,
}: CollapseSidebarProps) {
  return (
    <button
      className="relative w-12 h-12 -left-12 bottom-20 bg-white rounded-s-lg hidden md:block"
      onClick={toggleSidebar}
    >
      <FontAwesomeIcon
        icon={faChevronRight}
        className={`${
          sidebarOpen ? "" : "rotate-180"
        } transition-transform duration-500`}
      />
    </button>
  );
}
