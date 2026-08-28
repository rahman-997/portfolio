import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Abdulrahman Hajar",
  description: "The requested portfolio route could not be found. Return to Abdulrahman Hajar's software engineering portfolio or selected work.",
  alternates: { canonical: "/404/" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <section className={styles.card}>
        <div className={styles.code}>404 / ROUTE_NOT_FOUND</div>
        <p className={styles.kicker}>PORTFOLIO NAVIGATION</p>
        <h1>This route isn&apos;t part of the system.</h1>
        <p className={styles.copy}>
          The page may have moved or the address may be incorrect. Return to the portfolio or jump directly to the selected engineering work.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/">Return home →</Link>
          <Link className={styles.secondary} href="/#work">Selected work</Link>
        </div>
        <div className={styles.status}>
          <span><b /> SYSTEM ONLINE</span>
          <span>Abdulrahman Hajar · Software Engineering Portfolio</span>
        </div>
      </section>
    </main>
  );
}
