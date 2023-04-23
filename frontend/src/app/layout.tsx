import "../styles/global.css";
import SiteHeader from "./SiteHeader";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <div className="content">{children}</div>
      </body>
    </html>
  );
}
