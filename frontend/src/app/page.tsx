import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="text-content">
      <h1 className="text-2xl font-semibold mt-6 mb-2">Index</h1>

      <p>Choose one of the following pages:</p>
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
        <li>
          <Link href="/account/login" className="link">
            /account/login
          </Link>
        </li>
        <li>
          <Link href="/account/register" className="link">
            /account/register
          </Link>
        </li>
      </ul>
    </div>
  );
}
