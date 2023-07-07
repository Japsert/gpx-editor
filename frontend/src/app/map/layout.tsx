import SiteHeader from "../SiteHeader";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <SiteHeader />
      {children}
    </div>
  );
}
