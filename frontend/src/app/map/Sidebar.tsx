import DataArtist from "@/utils/dataArtist";
import CollapseSidebarButton from "./CollapseSidebarButton";
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

      <CollapseSidebarButton
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
}
