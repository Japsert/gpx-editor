import DataArtist from "@/utils/dataArtist";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

let accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("No access token for Mapbox");
}
mapboxgl.accessToken = accessToken;

interface MapComponentProps {
  setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | undefined>>;
  setDataArtist: React.Dispatch<React.SetStateAction<DataArtist | undefined>>;
}

export default function MapComponent({ setMap, setDataArtist }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(6.57);
  const [lat, setLat] = useState(53.21);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    // Initialize map

    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    setMap(map.current);
    setDataArtist(new DataArtist(map.current));

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // Create ResizeObserver and observe the map container
    const observer = new ResizeObserver(() => {
      if (map.current) {
        setTimeout(() => map.current!.resize(), 0); // setTimeout fixes flickering
      }
    });
    observer.observe(mapContainer.current);

    // Clean up the observer when the component unmounts
    return () => {
      //console.log("unmounting map");
      //observer.unobserve(mapContainer.current); // immediately gets run for some reason
    };
  });

  return <div ref={mapContainer} className="h-full" />;
}
