import SiteHeader from "../SiteHeader";

export default function CssTestLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  )
}
