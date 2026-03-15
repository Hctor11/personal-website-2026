import { hasMappedSocialIcon, socialIconMap } from "@/components/portfolio/socialIconMap";
import type { SocialLinkItem } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";

interface SocialLinksProps {
  links: SocialLinkItem[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul className={styles.socialLinks} aria-label="Social links">
      {links.map((link) => {
        const iconKey = hasMappedSocialIcon(link.icon) ? link.icon : null;
        const Icon = iconKey ? socialIconMap[iconKey] : null;

        return (
          <li key={`${link.platform}-${link.url}`} className={styles.socialLinksItem}>
            <a
              className={iconKey ? styles.socialLink : `${styles.socialLink} ${styles.socialLinkFallback}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.ariaLabel}
              title={link.platform}
            >
              {Icon ? (
                <Icon className={styles.socialLinkIcon} size={18} aria-hidden="true" />
              ) : (
                <span>{link.platform}</span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
