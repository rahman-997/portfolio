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
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Abdulrahman Hajar — Software Engineering Portfolio",
  title: "Abdulrahman Hajar — Frontend Engineer | UI/UX Designer | Full-Stack Developer",
  description:
    "Frontend engineering and UI/UX portfolio of Abdulrahman Hajar: responsive React and Next.js products, accessible interfaces, design systems, multilingual RTL applications, PWA experiences, and full-stack architecture.",
  authors: [{ name: "Abdulrahman Hajar", url: SITE_URL }],
  creator: "Abdulrahman Hajar",
  publisher: "Abdulrahman Hajar",
  category: "technology",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  keywords: [
    "Abdulrahman Hajar",
    "Frontend Engineer",
    "Frontend Developer",
    "UI/UX Designer",
    "Responsive Web Design",
    "Web Accessibility",
    "RTL",
    "i18n",
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
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar/", tr: "/tr/" } },
  openGraph: {
    title: "Abdulrahman Hajar — Frontend Engineer | UI/UX Designer | Full-Stack Developer",
    description:
      "Frontend-first React and Next.js products, multilingual RTL interfaces, accessible UI/UX, PWAs, and full-stack engineering.",
    type: "website",
    url: "/",
    siteName: "Abdulrahman Hajar — Software Engineering Portfolio",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abdulrahman Hajar — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Hajar — Frontend Engineer | UI/UX Designer | Full-Stack Developer",
    description:
      "React and Next.js interfaces, UI/UX, accessibility, multilingual RTL products, and full-stack engineering.",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Abdulrahman Hajar",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Frontend Engineer · UI/UX Designer · Full-Stack Developer",
  description:
    "Frontend-focused software engineer and Computer Engineering student creating responsive React and Next.js products, accessible UI/UX, multilingual RTL interfaces, and reliable full-stack experiences.",
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

const deployCommit = process.env.RENDER_GIT_COMMIT ?? process.env.GITHUB_SHA ?? "local";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body data-deploy-commit={deployCommit}>
        {[personJsonLd, websiteJsonLd, profilePageJsonLd, selectedWorkJsonLd].map((data, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
        {children}
      </body>
    </html>
  );
}
