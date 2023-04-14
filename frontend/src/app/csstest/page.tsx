import Link from "next/link";
import "./csstest.css";
import styles from "./csstest.module.css";

export default function CssTestPage() {
  return (
    <>
      <Link href="/" className="link text-gray-700">
        &lt; Home
      </Link>
      
      <h1>CSS test</h1>
      
      <p>All the below text is styled with the global css file.</p>

      <p className="normal-css">This text is styled using normal CSS.</p>

      <p className={styles["modular-css"]}>
        This text is styled using modular CSS.
      </p>

      <p style={{ color: "red" }}>
        This text is styled using inline styling.{" "}
        <span style={{ color: "gray", fontStyle: "italic" }}>
          (does not work correctly with dark reader extension)
        </span>
      </p>

      <p className="text-blue-700">
        This text is styled using Tailwind.{" "}
        <span className="text-gray-400 italic">(preferred method)</span>
      </p>
    </>
  );
}
