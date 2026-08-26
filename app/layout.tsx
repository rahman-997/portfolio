import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulrahman-hajjar-dev.netlify.app"),
  title: "Abdulrahman Hajjar — Frontend Engineer & Full-Stack TypeScript Developer",
  description:
    "Frontend Engineer in Istanbul building polished, accessible React and Next.js products with full-stack TypeScript depth across APIs, databases, testing, security, and production delivery.",
  authors: [{ name: "Abdulrahman Hajjar", url: "https://github.com/rahman-997" }],
  creator: "Abdulrahman Hajjar",
  keywords: [
    "Abdulrahman Hajjar",
    "Frontend Engineer",
    "Full-Stack TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Istanbul Software Engineer",
    "Web Developer Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdulrahman Hajjar — Frontend Engineer & Full-Stack TypeScript Developer",
    description:
      "Polished React and Next.js product engineering backed by typed APIs, reliable data systems, testing, security, and production delivery.",
    type: "website",
    url: "/",
    siteName: "Abdulrahman Hajjar — Engineering Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Hajjar — Frontend Engineer and Full-Stack TypeScript Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajjar — Frontend Engineer & Full-Stack TypeScript Developer",
    description:
      "React and Next.js product engineering with full-stack TypeScript depth and production-ready delivery.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
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
