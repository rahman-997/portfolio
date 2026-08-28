import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://abdulrahman-hajar-dev.netlify.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07100f",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Abdulrahman Hajar — Software Engineering Portfolio",
  title: "Abdulrahman Hajar — Software Engineer | Full-Stack Developer",
  description:
    "Software engineering portfolio of Abdulrahman Hajar: full-stack products, backend APIs, data systems, asynchronous workflows, testing, security, deployment, AI integrations, and interactive systems.",
  authors: [{ name: "Abdulrahman Hajar", url: "https://github.com/rahman-997" }],
  creator: "Abdulrahman Hajar",
  publisher: "Abdulrahman Hajar",
  category: "technology",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  keywords: [
    "Abdulrahman Hajar",
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Engineering",
    "Computer Engineering",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "REST API",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Redis",
    "BullMQ",
    "PWA",
    "CI/CD",
    "Software Architecture",
    "AI Integration",
    "Istanbul Software Engineer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Abdulrahman Hajar — Software Engineer",
    description:
      "Full-stack products and backend systems across TypeScript, React/Next.js, Node.js, APIs, data, asynchronous work, testing, security, and production delivery.",
    type: "website",
    url: "/",
    siteName: "Abdulrahman Hajar — Software Engineering Portfolio",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abdulrahman Hajar — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajar — Software Engineer",
    description:
      "Full-stack products, backend systems, APIs, data, asynchronous workflows, testing, security, and production delivery.",
    images: ["/twitter-image"],
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
    "Software Engineer and Computer Engineering student focused on full-stack products, backend systems, data, reliability, AI integrations, and interactive systems.",
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
    addressCountry: "TR",
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
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Asynchronous Systems",
    "Testing",
    "CI/CD",
    "AI Integration",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Abdulrahman Hajar — Software Engineering Portfolio",
  description: "Selected software engineering work, case studies, technical capabilities, and résumé for Abdulrahman Hajar.",
  author: { "@id": `${siteUrl}/#person` },
  inLanguage: "en",
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile-page`,
  url: siteUrl,
  name: "Abdulrahman Hajar — Software Engineering Portfolio",
  mainEntity: { "@id": `${siteUrl}/#person` },
  isPartOf: { "@id": `${siteUrl}/#website` },
  inLanguage: "en",
};

const selectedWorkJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#selected-work`,
  name: "Selected software engineering projects",
  itemListElement: [
    ["Eventify", "/work/eventify/"],
    ["BookHaven", "/work/bookhaven/"],
    ["FitFlow", "/work/fitflow/"],
    ["Venues API", "/work/venues-api/"],
  ].map(([name, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    url: `${siteUrl}${path}`,
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {[personJsonLd, websiteJsonLd, profilePageJsonLd, selectedWorkJsonLd].map((data, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
        {children}
      </body>
    </html>
  );
}
