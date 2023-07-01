import { GeoJson, arcJsonToGeoJson } from "@/utils/dataImport";
import { useState } from "react";

interface SidebarContentProps {
  drawSampleData: () => void;
  importGeoJson: (geoJson: GeoJson) => void;
}

export default function SidebarContent({
  drawSampleData,
  importGeoJson,
}: SidebarContentProps) {
  // TODO move state to page.tsx?
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const processImportFiles = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFiles) return;
    // Loop over selected files, convert to geojson, and import
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target) return;
        if (!e.target.result) return;
        const contents = e.target.result as string;
        const geoJson = arcJsonToGeoJson(contents);
        if (!geoJson) return;
        importGeoJson(geoJson);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div id="sidebar-content" className="p-4 overflow-y-auto h-full z-10">
      {/* Button to import data from file */}
      <h2 className="sidebar-header mt-0">Load from file</h2>
      <form onSubmit={processImportFiles}>
        <input
          title="Load from File"
          type="file"
          accept=".json,.gpx"
          multiple
          onChange={(e) => setSelectedFiles(e.target.files)}
        />
        <button
          type="submit"
          disabled={!selectedFiles || selectedFiles.length == 0}
        >
          Load
        </button>
      </form>

      {/* Button to draw geojson data on the map */}
      <h2 className="sidebar-header">Draw sample data</h2>
      <button onClick={drawSampleData} className="btn-primary">
        Draw sample data
      </button>
    </div>
  );
}
