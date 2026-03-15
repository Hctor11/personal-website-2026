import { DesignGallery } from "@/components/portfolio/components/DesignGallery";
import { ExperienceCard } from "@/components/portfolio/components/ExperienceCard";
import { LocationCard } from "@/components/portfolio/components/LocationCard";
import { ProjectCard } from "@/components/portfolio/components/ProjectCard";
import { SocialLinks } from "@/components/portfolio/components/SocialLinks";
import { StackToolsCard } from "@/components/portfolio/components/StackToolsCard";
import { StudyCaseCard } from "@/components/portfolio/components/StudyCaseCard";
import type { PortfolioData } from "@/components/portfolio/types";
import styles from "./PortfolioSection.module.css";

interface PortfolioSectionProps {
  data: PortfolioData;
}

export default function PortfolioSection({
  data,
}: PortfolioSectionProps) {
  const {
    profile,
    socialLinks,
    sections,
    experience,
    location,
    stackTools,
    featuredStudyCase,
    featuredProjects,
    secondaryProjects,
    designGallery,
  } = data;

  return (
    <section className={styles.section} aria-labelledby="portfolio-heading">
      <div className={styles.hero}>
        <div className={styles.heroHeader}>
          <h1 id="portfolio-heading" className={styles.heroTitle}>
            {profile.name}
          </h1>
          <SocialLinks links={socialLinks} />
        </div>
        <p className={styles.heroDescription}>{profile.description}</p>
      </div>

      <div className={styles.layout}>
        <div className={`${styles.column} ${styles.columnPrimary}`}>
          <ExperienceCard
            title={sections.experienceTitle}
            entries={experience}
          />
        </div>

        <div className={`${styles.column} ${styles.columnMiddle}`}>
          <LocationCard location={location} />
          <StackToolsCard stackTools={stackTools} />

          <section
            className={styles.projectStack}
            aria-labelledby="featured-projects-heading"
          >
            <h2 id="featured-projects-heading" className={styles.srOnly}>
              {sections.featuredProjectsTitle}
            </h2>
            <ul className={styles.projectList}>
              {featuredProjects.map((project) => (
                <li key={`${project.title}-${project.year}`}>
                  <ProjectCard
                    project={project}
                    openProjectLabel={sections.openProjectLabel}
                    variant="compact"
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={`${styles.column} ${styles.columnRight}`}>
          <StudyCaseCard
            project={featuredStudyCase}
            openProjectLabel={sections.openProjectLabel}
          />

          <section
            className={styles.secondarySection}
            aria-labelledby="secondary-projects-heading"
          >
            <h2 id="secondary-projects-heading" className={styles.srOnly}>
              {sections.secondaryProjectsTitle}
            </h2>
            <ul className={styles.secondaryGrid}>
              {secondaryProjects.map((project) => (
                <li key={`${project.title}-${project.year}`}>
                  <ProjectCard
                    project={project}
                    openProjectLabel={sections.openProjectLabel}
                    variant="tile"
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <DesignGallery gallery={designGallery} />
    </section>
  );
}
