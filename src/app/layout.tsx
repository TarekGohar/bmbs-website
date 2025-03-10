import "./globals.css";
import React from "react";
import LenisProvider from "@/components/common/LenisProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-black overscroll-none tracking-wider">
      <meta name="apple-mobile-web-app-title" content="BMBS" />
      <meta name="theme-color" content="#000000" />
      <head>
        <link rel="preload" href="/images/maxim-1.webp" />
      </head>
      <body className="font-carving">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
