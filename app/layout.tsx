import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulrahman-hajjar-dev.netlify.app"),
  title: "Abdulrahman Hajar — Software Engineer | Full-Stack & Backend Systems",
  description:
    "Engineering portfolio of Abdulrahman Hajar, a Software Engineer and Computer Engineering student in Istanbul building full-stack products, backend APIs, data systems, production infrastructure, and AI-assisted experiences.",
  authors: [{ name: "Abdulrahman Hajar", url: "https://github.com/rahman-997" }],
  creator: "Abdulrahman Hajar",
  keywords: [
    "Abdulrahman Hajar",
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Engineer",
    "Computer Engineering",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "REST API",
    "GraphQL",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Redis",
    "Docker",
    "CI/CD",
    "System Architecture",
    "AI Integration",
    "Istanbul Software Engineer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Abdulrahman Hajar — Software Engineer",
    description:
      "Full-stack and backend engineering across TypeScript, React/Next.js, Node.js, APIs, data, asynchronous systems, testing, security, and production delivery.",
    type: "website",
    url: "/",
    siteName: "Abdulrahman Hajar — Software Engineering Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Hajar — Software Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajar — Software Engineer",
    description:
      "Full-stack products, backend systems, APIs, data infrastructure, AI integrations, testing, and production delivery.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
