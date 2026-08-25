import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulrahman-hajjar-dev.netlify.app"),
  title: "Abdulrahman Hajjar — Frontend Engineer",
  description: "Frontend engineer in Istanbul building polished, accessible, production-ready products with React, Next.js, and TypeScript.",
  authors: [{ name: "Abdulrahman Hajjar", url: "https://github.com/rahman-997" }],
  openGraph: {
    title: "Abdulrahman Hajjar — Frontend Engineer",
    description: "Polished, accessible, production-ready products built with React, Next.js, and TypeScript.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Abdulrahman Hajjar — Frontend Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajjar — Frontend Engineer",
    description: "Polished, accessible, production-ready products built with React, Next.js, and TypeScript.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
