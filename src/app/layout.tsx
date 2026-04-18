import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Numonics | Architect of Sound",
  description: "Breaking digital boundaries through raw frequencies and unpolished structuralism.",
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
