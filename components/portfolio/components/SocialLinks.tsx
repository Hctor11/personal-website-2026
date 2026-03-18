import Image from "next/image";

import { isImageIconSource } from "@/components/portfolio/iconMap";
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
        const hasImageIcon = isImageIconSource(link.icon);

        return (
          <li key={`${link.platform}-${link.url}`} className={styles.socialLinksItem}>
            <a
              className={hasImageIcon ? styles.socialLink : `${styles.socialLink} ${styles.socialLinkFallback}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.ariaLabel}
              title={link.platform}
            >
              {hasImageIcon ? (
                <Image
                  src={link.icon}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className={styles.socialLinkIcon}
                />
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
