import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import portfolioData from "@/data/portfolioData.json";
import type { PortfolioData } from "@/components/portfolio/types";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const portfolioContent: PortfolioData = portfolioData;

export const metadata: Metadata = {
  title: portfolioContent.profile.name,
  description: portfolioContent.profile.description,
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
