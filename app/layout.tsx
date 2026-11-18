import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "Plain-language legal orientation notes with visible scope and next questions.";

export const metadata: Metadata = {
  metadataBase: new URL("https://legal.bookchaowalit.com"),
  title: "Legal Knowledge Base — Orientation notes",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Legal Knowledge Base", title: "Legal Knowledge Base — Orientation notes", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
