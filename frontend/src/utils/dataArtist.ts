import mapboxgl from "mapbox-gl";
import { GeoJson } from "./dataImport";

const CUSTOM_PREFIX = "data-";

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
   * Clear all GeoJson data from the map.
   */
  clear = () => {
    if (!this.map) {
      console.error("Map not initialized");
      return;
    }
    if (!this.map.loaded()) return;

    // Remove all data layers, sources and images
    this.map.getStyle().layers.forEach((layer) => {
      if (layer.id.startsWith(CUSTOM_PREFIX)) this.map.removeLayer(layer.id);
    });
    for (const source in this.map.getStyle().sources) {
      if (source.startsWith(CUSTOM_PREFIX)) this.map.removeSource(source);
    }
    this.map.listImages().forEach((image) => {
      if (image.startsWith(CUSTOM_PREFIX)) this.map.removeImage(image);
    });
  };

  dateToString = (date: Date) => {
    return [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      ("0" + date.getDate()).slice(-2),
    ].join("-");
  }

  /**
   * Draw a GeoJson object on the map.
   * Has to be an arrow function to keep the correct context (otherwise, `this` would be undefined)
   * @param date Date of the GeoJson object
   * @param geoJson GeoJson object to draw on the map
   */
  draw = (date: Date, geoJson: GeoJson) => {
    if (!this.map) {
      console.error("Map not initialized");
      return;
    }

    const dateString = this.dateToString(date);

    // Add the GeoJSON source
    this.map.addSource(CUSTOM_PREFIX + dateString, {
      type: "geojson",
      data: geoJson,
    });

    // Lines layers
    this.map.addLayer({
      id: CUSTOM_PREFIX + dateString + "-lines",
      type: "line",
      source: CUSTOM_PREFIX + dateString,
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
      console.debug(
        "adding image to map, source: " + CUSTOM_PREFIX + dateString
      );
      console.debug(
        "source: " +
          JSON.stringify(this.map.getSource(CUSTOM_PREFIX + dateString))
      );
      this.map.addImage("data-circle-icon", image);
      this.map.addLayer({
        id: CUSTOM_PREFIX + dateString + "-points",
        type: "symbol",
        source: CUSTOM_PREFIX + dateString,
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
}
