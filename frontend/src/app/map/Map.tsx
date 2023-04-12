"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Map } from "mapbox-gl";
//import "mapbox-gl/dist/mapbox-gl.css"; // for some reason the map won't display with this
import "./Map.module.css";

let accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("No access token for Mapbox");
}
mapboxgl.accessToken = accessToken;

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null as Map | null);
  const [lat, setLat] = useState(53.21);
  const [lng, setLng] = useState(6.57);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return; // typescript
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}
