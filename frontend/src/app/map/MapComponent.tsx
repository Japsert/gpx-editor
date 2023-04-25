"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

let accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("No access token for Mapbox");
}
mapboxgl.accessToken = accessToken;

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
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

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  });
  
  //useEffect(() => {
  //  function handleResize() {
  //    console.log("resizing map!");
  //    if (!map.current) return;
  //    map.current.resize();
  //  }
    
  //  console.log("adding resize listener");
  //  window.addEventListener("resize", handleResize);
    
  //  return () => {
  //    console.log("removing resize listener");
  //    window.removeEventListener("resize", handleResize);
  //  };
  //}, []);
  
  return <div ref={mapContainer} className="h-full" />;
}
