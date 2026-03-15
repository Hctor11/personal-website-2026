import { ExternalLink } from "lucide-react";

import type { FeaturedStudyCase } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";

interface StudyCaseCardProps {
  project: FeaturedStudyCase;
  openProjectLabel: string;
}

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

export function StudyCaseCard({
  project,
  openProjectLabel,
}: StudyCaseCardProps) {
  return (
    <a
      className={`${styles.surfaceCard} ${styles.studyCaseCard}`}
      href={project.href}
      target={isExternalLink(project.href) ? "_blank" : undefined}
      rel={isExternalLink(project.href) ? "noreferrer" : undefined}
      aria-label={`${openProjectLabel}: ${project.title}`}
    >
      <div className={styles.studyCaseHeader}>
        <h2 className={styles.cardTitle}>{project.label}</h2>
        <span className={styles.studyCaseAction} aria-hidden="true">
          <ExternalLink size={18} strokeWidth={1.9} />
        </span>
      </div>

      <div className={styles.studyCaseFooter}>
        {/* <div className={styles.studyCaseMedia}>
          <Image
            src={project.icon}
            alt={project.imageAlt}
            width={72}
            height={72}
            className={styles.projectImage}
          />
        </div> */}

        <div className={styles.studyCaseContent}>
          <h3 className={styles.studyCaseTitle}>{project.title}</h3>
          <p className={styles.studyCaseMeta}>
            <span>{project.year}</span>
            <span>{project.category}</span>
          </p>
          {project.description ? (
            <p className={styles.studyCaseDescription}>
              {project.description}
            </p>
          ) : null}
        </div>
      </div>
    </a>
  );
}
