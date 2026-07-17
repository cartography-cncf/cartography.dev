import "./globals.css";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const description =
  "Cartography is an open source tool that maps your infrastructure, helping you visualize relationships between services, resources, and infrastructure components.";

export const metadata: Metadata = {
  title: "Cartography - Open Source Infrastructure Mapping Tool",
  description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cartography - Open Source Infrastructure Mapping Tool",
    description,
    url: "/",
    siteName: "Cartography",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartography - Open Source Infrastructure Mapping Tool",
    description,
  },
  icons: {
    icon: [
      {
        url: "/images/cartography-black-icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "32x32",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
