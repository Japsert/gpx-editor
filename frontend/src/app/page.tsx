import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <div className={inter.className}>
      <h1>GPX Editor 🤠</h1>

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
