import type { Metadata } from "next";
import { headers } from "next/headers";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Tracy Smog Center | STAR Smog Checks in Tracy, CA";
  const description =
    "STAR-certified, test-only smog inspections for all cars, including diesel vehicles. Walk in or call ahead and ask about the $10-off website coupon.";

  return {
    metadataBase: new URL(origin),
    title,
    description,
    icons: {
      icon: "/tracy-smog-center-logo.png",
      shortcut: "/tracy-smog-center-logo.png",
      apple: "/tracy-smog-center-logo.png",
    },
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: origin,
      siteName: "Tracy Smog Center",
      title,
      description,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Tracy Smog Center service information" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${workSans.variable}`}>{children}</body>
    </html>
  );
}
