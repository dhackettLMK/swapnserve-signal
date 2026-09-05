import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Signal — Swap'n'Serve intelligence layer",
    template: "%s · Signal",
  },
  description:
    "A Cala-powered research and intelligence layer for Swap'n'Serve, a Limerick clothing-reuse initiative. Every fact carries its source.",
  metadataBase: new URL("https://swapnserve-signal.vercel.app"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
