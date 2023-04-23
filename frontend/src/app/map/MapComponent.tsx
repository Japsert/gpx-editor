"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
  //  if (!map.current) return; // wait for map to initialize
  //  map.current.on("move", () => {
  //    setLng(parseFloat(map.current!.getCenter().lng.toFixed(2)));
  //    setLat(parseFloat(map.current!.getCenter().lat.toFixed(2)));
  //    setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
  //  });
  //});

  return (
      <div ref={mapContainer} className="h-full" />
  );
}
