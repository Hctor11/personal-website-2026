import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TODO: confirm domain
  metadataBase: new URL("https://hectorrivera.dev"),
  title: "Héctor Rivera — Frontend Developer",
  description:
    "Frontend developer building production React and Next.js applications — microfrontend architecture, design systems, and CI/CD delivery.",
  openGraph: {
    title: "Héctor Rivera — Frontend Developer",
    description: "React & TypeScript. Microfrontends, design systems, CI/CD.",
    url: "/",
    siteName: "Héctor Rivera",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
