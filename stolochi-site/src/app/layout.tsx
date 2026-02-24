import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stolochi Makeup & Hair | Bridal Beauty — Durham, NC",
    template: "%s | Stolochi Makeup & Hair",
  },
  description:
    "Professional bridal makeup and hair services in Durham, NC. Specializing in weddings, special occasions, and editorial looks. Contact us to book your consultation.",
  keywords: [
    "bridal makeup Durham NC",
    "wedding hair Durham",
    "makeup artist Durham",
    "hair stylist Durham NC",
    "bridal beauty North Carolina",
    "Stolochi Makeup",
  ],
  authors: [{ name: "Stolochi Makeup & Hair" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stolochimakeuphair.com",
    siteName: "Stolochi Makeup & Hair",
    title: "Stolochi Makeup & Hair | Bridal Beauty — Durham, NC",
    description:
      "Professional bridal makeup and hair services in Durham, NC. Specializing in weddings and special occasions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stolochi Makeup & Hair | Bridal Beauty — Durham, NC",
    description:
      "Professional bridal makeup and hair services in Durham, NC.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-cream text-charcoal font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
