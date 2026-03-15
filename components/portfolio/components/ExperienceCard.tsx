import type { ExperienceEntry } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";

interface ExperienceCardProps {
  title: string;
  entries: ExperienceEntry[];
}

export function ExperienceCard({
  title,
  entries,
}: ExperienceCardProps) {
  return (
    <section className={`${styles.surfaceCard} ${styles.experienceCard}`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <ol className={styles.timelineList}>
        {entries.map((entry) => (
          <li
            key={`${entry.company}-${entry.role}-${entry.startDate}`}
            className={styles.timelineItem}
          >
            <p className={styles.timelineDate}>
              <span>{entry.startDate}</span>
              <span>{entry.endDate}</span>
            </p>

            <div className={styles.timelineContent}>
              <h3 className={styles.timelineRole}>{entry.role}</h3>
              <p className={styles.timelineCompany}>{entry.company}</p>
              {entry.description ? (
                <p className={styles.timelineDescription}>
                  {entry.description}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
