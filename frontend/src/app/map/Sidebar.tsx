import DataArtist from "@/utils/dataArtist";
import SidebarContent from "./SidebarContent";
import CollapseSidebarComponent from "./CollapseSidebarComponent";

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
      
      <CollapseSidebarComponent sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}
