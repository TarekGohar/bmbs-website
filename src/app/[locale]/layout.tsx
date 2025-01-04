import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import Footer from "@/components/footer";

export default async function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-carving">
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
