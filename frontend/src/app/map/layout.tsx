import SiteHeader from "../SiteHeader";

export default function MapLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="content" className="w-full h-full flex flex-col overflow-hidden">
      <SiteHeader />
      <main id="main-content" className="flex flex-grow min-h-0">{children}</main>
    </div>
  )
}
