import type { Metadata, Viewport } from "next";
import {
  PORTFOLIO_UPDATED_AT,
  PROFILE_LINKS,
  PROJECT_LIST,
  SITE_URL,
  THEME_COLOR,
} from "./portfolio-data";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: THEME_COLOR,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Abdulrahman Hajar — Software Engineering Portfolio",
  title: "Abdulrahman Hajar — Software Engineer | Full-Stack Developer | AI & Interactive Systems",
  description:
    "Software engineering portfolio of Abdulrahman Hajar: full-stack products, backend systems, APIs, databases, asynchronous workflows, testing, security, reliability, deployment, AI integrations, and interactive systems.",
  authors: [{ name: "Abdulrahman Hajar", url: SITE_URL }],
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
    "Full-Stack Engineer",
    "Backend Systems Engineer",
    "Backend Engineering",
    "Interactive Systems",
    "Computer Engineering",
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "REST APIs",
    "GraphQL",
    "WebSockets",
    "gRPC",
    "OpenAPI",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Redis",
    "Zod",
    "Docker",
    "CI/CD",
    "GitHub Actions",
    "Software Architecture",
    "Reliability Engineering",
    "AI Integration",
    "LLM",
    "MCP",
    "FastAPI",
    "Flutter",
    "Istanbul Software Engineer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Abdulrahman Hajar — Software Engineer | Full-Stack Developer | AI & Interactive Systems",
    description:
      "Production-minded full-stack software, backend systems, AI integrations, and interactive engineering across TypeScript, React/Next.js, Node.js, APIs, databases, reliability, and delivery.",
    type: "website",
    url: "/",
    siteName: "Abdulrahman Hajar — Software Engineering Portfolio",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abdulrahman Hajar — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajar — Software Engineer | Full-Stack Developer | AI & Interactive Systems",
    description:
      "Full-stack products, backend systems, APIs, data, AI integrations, interactive systems, reliability, CI/CD, and production delivery.",
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
  "@id": `${SITE_URL}/#person`,
  name: "Abdulrahman Hajar",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Software Engineer · Full-Stack Developer · AI & Interactive Systems",
  description:
    "Software Engineer and Computer Engineering student building full-stack products, backend systems, APIs, data systems, AI integrations, interactive systems, and production delivery.",
  sameAs: [
    PROFILE_LINKS.github,
    PROFILE_LINKS.linkedin,
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
    "Full-Stack Engineering",
    "Backend Systems",
    "Backend Engineering",
    "Interactive Systems",
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "REST APIs",
    "GraphQL",
    "WebSockets",
    "gRPC",
    "OpenAPI",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Zod",
    "Docker",
    "Asynchronous Systems",
    "Testing",
    "CI/CD",
    "Reliability",
    "AI Integration",
    "LLM",
    "MCP",
    "FastAPI",
    "Flutter",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Abdulrahman Hajar — Software Engineering Portfolio",
  description: "Selected software engineering work, case studies, technical capabilities, and résumé for Abdulrahman Hajar.",
  author: { "@id": `${SITE_URL}/#person` },
  dateModified: PORTFOLIO_UPDATED_AT,
  inLanguage: "en",
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile-page`,
  url: SITE_URL,
  name: "Abdulrahman Hajar — Software Engineering Portfolio",
  mainEntity: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  dateModified: PORTFOLIO_UPDATED_AT,
  inLanguage: "en",
};

const selectedWorkJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#selected-work`,
  name: "Selected software engineering projects",
  itemListElement: PROJECT_LIST.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareSourceCode",
      name: project.name,
      description: project.summary,
      codeRepository: project.source,
      programmingLanguage: project.languages,
      url: `${SITE_URL}/work/${project.slug}/`,
    },
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
