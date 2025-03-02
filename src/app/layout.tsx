import "./globals.css";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <meta name="apple-mobile-web-app-title" content="BMBS" />
      <head>
        <link rel="preload" href="/images/maxim-1.webp" />
      </head>
      <body className="font-carving">{children}</body>
    </html>
  );
}
