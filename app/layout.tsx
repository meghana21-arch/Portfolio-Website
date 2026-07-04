import type { Metadata } from "next";
import "./globals.css";
import CatFollower from "@/components/CatFollower";
import SocialDock from "@/components/SocialDock";
import DinoEasterEgg from "@/components/DinoEasterEgg";

export const metadata: Metadata = {
  title: "Sai Meghana Barla — Software Engineer",
  description:
    "Software engineer and MS CS student at University of Florida building production-grade backend systems, AI developer tools, and distributed workflow platforms.",
  keywords: [
    "AI agents",
    "backend engineer",
    "distributed systems",
    "TrueCaptcha",
    "AgentOps",
    "software engineer",
    "University of Florida",
  ],
  authors: [{ name: "Sai Meghana Barla" }],
  openGraph: {
    title: "Sai Meghana Barla — Software Engineer",
    description: "Building production-grade backend systems, AI developer tools, and distributed workflow platforms.",
    url: "https://saimeghana.dev",
    siteName: "Sai Meghana Barla",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Meghana Barla — Software Engineer",
    description: "Building production-grade backend systems, AI developer tools, and distributed workflow platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="pb-24">
        <CatFollower />
        <SocialDock />
        <DinoEasterEgg />
        {children}
      </body>
    </html>
  );
}
