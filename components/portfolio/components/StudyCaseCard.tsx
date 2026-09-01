import Image from "next/image";
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
      className={`${styles.surfaceCard} ${styles.studyCaseCard} ${styles.studyCaseCardFeatured}`}
      href={project.href}
      target={isExternalLink(project.href) ? "_blank" : undefined}
      rel={isExternalLink(project.href) ? "noreferrer" : undefined}
      aria-label={`${openProjectLabel}: ${project.title}`}
    >
      <Image
        src="/images/gallery/alexandria-beta-landing.png"
        alt="Alexandria landing page interface."
        width={2000}
        height={1233}
        className={styles.studyCaseBackgroundImage}
      />

      <div className={styles.studyCaseHeader}>
        <span className={styles.studyCaseAction} aria-hidden="true">
          <ExternalLink size={18} strokeWidth={1.9} />
        </span>
      </div>

      <div className={styles.studyCaseFooter}>
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
