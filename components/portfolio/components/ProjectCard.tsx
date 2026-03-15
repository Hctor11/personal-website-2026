import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { ProjectItem } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";

interface ProjectCardProps {
  project: ProjectItem;
  openProjectLabel: string;
  variant: "compact" | "tile";
}

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

export function ProjectCard({
  project,
  openProjectLabel,
  variant,
}: ProjectCardProps) {
  const variantClassName =
    variant === "tile" ? styles.projectCardTile : styles.projectCardCompact;

  return (
    <a
      className={`${styles.projectCard} ${variantClassName}`}
      href={project.href}
      target={isExternalLink(project.href) ? "_blank" : undefined}
      rel={isExternalLink(project.href) ? "noreferrer" : undefined}
      aria-label={`${openProjectLabel}: ${project.title}`}
    >
      <div className={styles.projectMedia}>
        <Image
          src={project.icon}
          alt={project.imageAlt}
          width={56}
          height={56}
          className={styles.projectImage}
        />
      </div>

      <div className={styles.projectBody}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectMeta}>
          <span>{project.year}</span>
          <span>{project.category}</span>
        </p>
      </div>

      <span className={styles.projectAction} aria-hidden="true">
        <ExternalLink size={18} strokeWidth={1.9} />
      </span>
    </a>
  );
}
