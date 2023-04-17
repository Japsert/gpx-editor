import MapHeader from "./MapHeader";

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <MapHeader />
      
      <main>{children}</main>
    </section>
  )
}
