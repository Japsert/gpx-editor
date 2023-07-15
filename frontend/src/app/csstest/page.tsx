import "./csstest.css";
import styles from "./csstest.module.css";

export default function CssTestPage() {
  return (
    <main className="text-content">
      <h1 className="text-2xl font-semibold mt-8 mb-2">CSS test</h1>

      <p>All the below text is styled with the global css file.</p>

      <p className="normal-css">This text is styled using normal CSS.</p>

      <p className={styles["modular-css"]}>
        This text is styled using modular CSS.
      </p>

      <p style={{ color: "red" }}>
        This text is styled using inline styling.{" "}
        <span style={{ color: `rgb(156, 163, 175)`, fontStyle: "italic" }}>
          (does not work correctly with dark reader extension)
        </span>
      </p>

      <p className="text-blue-700">
        This text is styled using Tailwind.{" "}
        <span className="text-gray-400 italic">(used in this project)</span>
      </p>
    </main>
  );
}
