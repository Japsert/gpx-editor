import Link from "next/link";
import MapComponent from "./Map";

export default function MapPage() {
  return (
    <>
      <p><Link href="/"><button>back to main page</button></Link></p>
      <h1>Map</h1>
      <MapComponent />
    </>
  );
}
