import "@/components/globals.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import TopHeader from "@/modules/layouts/TopHeader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next.js Elca boilerplate",
  description: "By WebCC",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TopHeader />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
