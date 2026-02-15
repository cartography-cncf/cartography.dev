import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Cartography - Open Source Infrastructure Mapping Tool",
  description: "Cartography is an open source tool that maps your infrastructure, helping you visualize relationships between services, resources, and infrastructure components.",
  metadataBase: new URL('https://cartography.dev'),
  alternates: {
    canonical: '/',
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

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'system';
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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

      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
