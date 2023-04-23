import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Index</h1>
      
      <p>Choose one of the following subpages:</p>

      <ul>
        <li>
            <Link href="/map" className="link">
              /map
            </Link>
        </li>
        <li>
            <Link href="/apitest" className="link">
              /apitest
            </Link>
        </li>
        <li>
            <Link href="/csstest" className="link">
              /csstest
            </Link>
        </li>
      </ul>
    </div>
  );
}
