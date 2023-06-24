interface SidebarContentProps {
  drawSampleData: () => void;
}

export default function SidebarContent({
  drawSampleData,
}: SidebarContentProps) {
  return (
    <div id="sidebar-content" className="p-4 overflow-y-auto h-full z-10">
      <h2 className="sidebar-header">Load from file</h2>
      {/*<input title="Load from File" type="file" accept=".gpx" />*/}

      {/* Button to draw geojson data on the map */}
      <button onClick={drawSampleData}>Draw sample data</button>
    </div>
  );
}
