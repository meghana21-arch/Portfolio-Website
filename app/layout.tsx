import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sai Meghana Barla — AI Systems Engineer",
  description:
    "MS Computer Science student at University of Florida. Software engineer focused on AI agents, backend systems, distributed systems, and LLM evaluation platforms.",
  keywords: [
    "AI agents",
    "backend engineer",
    "distributed systems",
    "LLM evals",
    "software engineer",
    "University of Florida",
  ],
  authors: [{ name: "Sai Meghana Barla" }],
  openGraph: {
    title: "Sai Meghana Barla — AI Systems Engineer",
    description: "Building reliable AI systems for the agentic era.",
    url: "https://saimeghana.dev",
    siteName: "Sai Meghana Barla",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Meghana Barla — AI Systems Engineer",
    description: "Building reliable AI systems for the agentic era.",
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
      <body>{children}</body>
    </html>
  );
}
