import mapboxgl from "mapbox-gl";
import { GeoJson } from "./dataImport";

/**
 * Class for drawing GeoJson data on a map.
 */
export default class DataArtist {
  map: mapboxgl.Map;

  /**
   * Create a new DataArtist. Called by the MapComponent after the map is initialized.
   * @param map Mapbox map object to draw on
   */
  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  /**
   * Draw a GeoJson object on the map.
   * Has to be an arrow function to keep the correct context (otherwise, `this` would be undefined)
   * @param geoJson GeoJson object to draw on the map
   */
  draw = (geoJson: GeoJson) => {
    if (!this.map) {
      console.error("Map not initialized");
      return;
    }

    // TEMP: Remove old source, its layers and its images
    if (this.map.getLayer(geoJson.date + "-lines"))
      this.map.removeLayer(geoJson.date + "-lines");
    if (this.map.getLayer(geoJson.date + "-points"))
      this.map.removeLayer(geoJson.date + "-points");
    if (this.map.getSource(geoJson.date)) this.map.removeSource(geoJson.date);
    if (this.map.hasImage("circle-icon")) this.map.removeImage("circle-icon");

    // Add the GeoJSON source
    this.map.addSource(geoJson.date, {
      type: "geojson",
      data: geoJson,
    });

    // Lines layers
    console.log(geoJson);
    this.map.addLayer({
      id: geoJson.date + "-lines",
      type: "line",
      source: geoJson.date,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": [
          "match",
          ["get", "activityType"],
          "walking",
          "#129f51", // green
          "cycling",
          "#04a0d3", // blue
          "black", // default
        ],
        "line-width": 4,
      },
    });

    // Points layer
    this.map.loadImage("/point.png", (error, image) => {
      if (error) throw error;
      if (!image) throw new Error("Image not loaded");
      this.map.addImage("circle-icon", image);
      this.map.addLayer({
        id: geoJson.date + "-points",
        type: "symbol",
        source: geoJson.date,
        filter: ["==", "$type", "Point"],
        layout: {
          "icon-image": "circle-icon",
          "icon-size": 0.15,
          "icon-allow-overlap": true,
        },
        paint: {},
      });
    });
  };

  /**
   * Draws a sample GeoJson object on the map.
   * Has to be an arrow function to keep the correct context (otherwise, `this` would be undefined)
   */
  drawSample = () => {
    if (!this.map) {
      console.error("Map not initialized");
      return;
    }

    this.map.addSource("sample", {
      type: "geojson",
      data: "/sample.geojson",
    });

    this.map.addLayer({
      id: "sample",
      type: "line",
      source: "sample",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#5abeff",
        "line-width": 4,
      },
    });
  };
}
