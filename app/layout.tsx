import type { Metadata } from "next";
import CommandPalette from "./components/CommandPalette";
import "./globals.css";

const siteUrl = "https://abdulrahman-hajar-dev.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Abdulrahman Hajar — Engineering Portfolio",
  title: {
    default: "Abdulrahman Hajar — Software Engineer | Full-Stack & Backend Systems",
    template: "%s | Abdulrahman Hajar",
  },
  description:
    "Engineering portfolio of Abdulrahman Hajar, a Software Engineer and Computer Engineering student in Istanbul building full-stack products, backend APIs, data systems, production infrastructure, and AI-assisted experiences.",
  authors: [{ name: "Abdulrahman Hajar", url: "https://github.com/rahman-997" }],
  creator: "Abdulrahman Hajar",
  publisher: "Abdulrahman Hajar",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajar — Software Engineer",
    description:
      "Full-stack products, backend systems, APIs, data infrastructure, AI integrations, testing, and production delivery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Abdulrahman Hajar",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  jobTitle: "Software Engineer",
  description:
    "Software Engineer and Computer Engineering student focused on full-stack products, backend systems, data, reliability, and AI-assisted experiences.",
  sameAs: [
    "https://github.com/rahman-997",
    "https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/",
  ],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Nişantaşı University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Istanbul",
    addressCountry: "Türkiye",
  },
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Development",
    "Backend Engineering",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "REST APIs",
    "GraphQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "System Architecture",
    "AI Integration",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Abdulrahman Hajar — Engineering Portfolio",
  description:
    "Selected software engineering work, technical capabilities, case studies, and résumé for Abdulrahman Hajar.",
  author: { "@id": `${siteUrl}/#person` },
  inLanguage: "en",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
