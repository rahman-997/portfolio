import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulrahman-hajjar-dev.netlify.app"),
  title: "Abdulrahman Hajar — Software Engineer & Full-Stack Developer",
  description:
    "Software Engineer and Full-Stack Developer in Istanbul building production-ready web, backend, AI-assisted, mobile, and interactive systems with TypeScript, React/Next.js, Node.js, Python/FastAPI, and modern infrastructure.",
  authors: [{ name: "Abdulrahman Hajar", url: "https://github.com/rahman-997" }],
  creator: "Abdulrahman Hajar",
  keywords: [
    "Abdulrahman Hajar",
    "Software Engineer",
    "Full-Stack Developer",
    "Computer Engineering",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Express",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Flutter",
    "AI Integration",
    "System Architecture",
    "Istanbul Software Engineer",
    "Web Developer Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdulrahman Hajar — Software Engineer & Full-Stack Developer",
    description:
      "Full-stack product engineering across React/Next.js, TypeScript, Node.js, APIs, data systems, AI-assisted workflows, testing, and production delivery.",
    type: "website",
    url: "/",
    siteName: "Abdulrahman Hajar — Engineering Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Hajar — Software Engineer and Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajar — Software Engineer & Full-Stack Developer",
    description:
      "Production-ready full-stack engineering with TypeScript, React/Next.js, Node.js, data systems, AI integrations, and modern deployment.",
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
