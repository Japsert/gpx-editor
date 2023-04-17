import "../styles/global.css";
import MapHeader from "./map/MapHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MapHeader />
        {children}
      </body>
    </html>
  );
}
