import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const funnelSans = Funnel_Sans({ variable: "--font-funnel-sans", subsets: ["latin"] });
const funnelDisplay = Funnel_Display({ variable: "--font-funnel-display", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Redaction is not on Google Fonts; Instrument Serif stands in for the
// editorial role until Redaction is self-hosted (see DESIGN.md, DELTAS.md).
const serifEditorial = Instrument_Serif({
  variable: "--font-serif-editorial",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Signal / Swap'n'Serve",
    template: "%s / Signal",
  },
  description:
    "A Cala-powered research tool for European nonprofits. Enter your profile, read back cited funding, regulation, partners and impact. Shown on Swap'n'Serve, Limerick.",
  metadataBase: new URL("https://swapnserve-signal.vercel.app"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IE"
      className={`${funnelSans.variable} ${funnelDisplay.variable} ${geistMono.variable} ${serifEditorial.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNav />
        <main className="mx-auto w-full max-w-[1120px] flex-1 px-6 py-12 sm:py-16">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
