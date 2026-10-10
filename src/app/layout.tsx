import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HackYoung — Ethical Hacking for Youngsters",
  description: "Learn ethical hacking step by step. 24 hands-on cybersecurity lessons for teenagers. No experience needed. Stay legal.",
  openGraph: {
    title: "Ethical Hacking for Youngsters",
    description: "24 hands-on ethical hacking lessons for teenagers. Learn to hack. Learn to defend. Stay legal.",
    type: "website",
    url: "https://hack4teens.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-outfit), 'Outfit', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
