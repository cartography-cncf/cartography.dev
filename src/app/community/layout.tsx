import type { Metadata } from "next";

const description =
  "Join the Cartography community, learn how to contribute, and find commercial support for the open source project.";

export const metadata: Metadata = {
  title: "Community | Cartography",
  description,
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "Cartography Community",
    description,
    url: "/community",
    siteName: "Cartography",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartography Community",
    description,
  },
};

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
