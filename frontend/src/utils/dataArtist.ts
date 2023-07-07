import circle from "@turf/circle";
import { Point } from "@turf/helpers";
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
  };

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

    // We might call this function twice
    if (this.map.getStyle().sources[CUSTOM_PREFIX + dateString]) return;

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

    // Radii
    const circles: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: [],
    }; // Not using GeoJson class because we don't have the required properties (itemId, etc.)
    geoJson.features
      .filter((feature) => feature.geometry.type === "Point")
      .forEach((feature) => {
        const center = feature.geometry as Point;
        const radius = feature.properties?.radius.mean;
        const circleFeature = circle(center, radius, { units: "meters" });
        circles.features.push(circleFeature);
      });
    this.map.addSource(CUSTOM_PREFIX + dateString + "-radii", {
      type: "geojson",
      data: circles,
    });
    this.map.addLayer({
      id: CUSTOM_PREFIX + dateString + "-radii",
      type: "fill",
      source: CUSTOM_PREFIX + dateString + "-radii",
      paint: {
        "fill-color": "#b76eff", // purple
        "fill-opacity": 0.4,
      },
    });

    this.map.loadImage("/point.png", (error, image) => {
      if (error) throw error;
      if (!image) throw new Error("Image not loaded");
      this.map.addImage(CUSTOM_PREFIX + "circle-icon", image);
    });

    // Center
    this.map.addLayer({
      id: CUSTOM_PREFIX + dateString + "-points",
      type: "symbol",
      source: CUSTOM_PREFIX + dateString,
      filter: ["==", "$type", "Point"],
      layout: {
        "icon-image": CUSTOM_PREFIX + "circle-icon",
        "icon-size": 0.15,
        "icon-allow-overlap": true,
      },
    });
  };
}
