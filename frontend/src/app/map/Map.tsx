"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Map } from "mapbox-gl";

const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("No access token for Mapbox");
}
mapboxgl.accessToken = accessToken;

export default function MapComponent() {
  const mapContainer = useRef(null as unknown as HTMLDivElement);
  const map = useRef(null as unknown as Map);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  
  useEffect(() => {
    console.log(mapboxgl.accessToken);
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}
