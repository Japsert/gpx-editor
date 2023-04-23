import SiteHeader from "../SiteHeader";

export default function ApiTestLayout({
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
