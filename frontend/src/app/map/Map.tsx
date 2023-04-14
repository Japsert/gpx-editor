"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

let accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("No access token for Mapbox");
}
mapboxgl.accessToken = accessToken;

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null as Map | null);
  const [lng, setLng] = useState(6.57);
  const [lat, setLat] = useState(53.21);
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

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(parseFloat(map.current!.getCenter().lng.toFixed(2)));
      setLat(parseFloat(map.current!.getCenter().lat.toFixed(2)));
      setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
    });
  });

  return (
    <>
      <div className="absolute z-10 top-0 left-0 m-3 rounded-md font-mono text-base bg-sky-950 bg-opacity-75 text-white px-3 py-1">
        <Link href="/" className="link">&lt; Back to home</Link> | Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="absolute top-0 left-0 w-full h-full" />
    </>
  );
}
