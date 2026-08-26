import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.grid} aria-hidden="true" />
      <section className={styles.card}>
        <div className={styles.code}>404 / ROUTE_NOT_FOUND</div>
        <p className={styles.kicker}>PORTFOLIO NAVIGATION</p>
        <h1>This route isn&apos;t part of the system.</h1>
        <p className={styles.copy}>
          The page may have moved, the link may be stale, or you may have reached an unfinished route. The main portfolio and project case studies are still available.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/">Return home →</Link>
          <Link className={styles.secondary} href="/#work">Selected work</Link>
        </div>
        <div className={styles.status}>
          <span><b /> SYSTEM ONLINE</span>
          <span>Abdulrahman Hajar · Engineering Portfolio</span>
        </div>
      </section>
    </main>
  );
}
