import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ff0099",
};
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://numonics.com"),
  title: "Numonics | Producer. Composer. Creator.",
  description:
    "Numonics is a multi-platinum hip-hop producer, composer, and creative based in Dallas, TX. Beats, licensing, and custom production for artists and sync. Credits include Marlon Craft, Mo3, ¡Mayday!, Black Rob, A24, HBO, NBC, TNT, and The Olympics.",
  keywords: [
    "Numonics",
    "hip-hop producer",
    "music producer",
    "beat maker",
    "beats for sale",
    "custom production",
    "beat licensing",
    "sync licensing",
    "Dallas producer",
    "South Florida producer",
    "Marlon Craft producer",
    "Mo3 producer",
  ],
  authors: [{ name: "Numonics" }],
  creator: "Numonics",
  openGraph: {
    title: "Numonics | Producer. Composer. Creator.",
    description:
      "Multi-platinum hip-hop producer based in Dallas, TX. Beats, licensing, and custom production for artists worldwide.",
    siteName: "Numonics",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Numonics | Producer. Composer. Creator.",
    description:
      "Multi-platinum hip-hop producer based in Dallas, TX. Beats, licensing, and custom production.",
    creator: "@numonics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface selection:bg-primary selection:text-on-primary">
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  );
}
