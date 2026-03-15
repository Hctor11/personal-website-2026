import Image from "next/image";

import { hasMappedIcon, iconMap, isImageIconSource } from "@/components/portfolio/iconMap";
import type { StackToolItem } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";

interface ToolsIconListProps {
  items: StackToolItem[];
}

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

function ToolIconContent({ item }: { item: StackToolItem }) {
  if (hasMappedIcon(item.icon)) {
    const Icon = iconMap[item.icon];

    return (
      <Icon
        className={styles.toolIconGlyph}
        size={20}
        strokeWidth={1.85}
        aria-hidden="true"
      />
    );
  }

  if (isImageIconSource(item.icon)) {
    return (
      <Image
        src={item.icon}
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        className={styles.toolIconImage}
      />
    );
  }

  return <span className={styles.toolIconFallback}>{item.name}</span>;
}

export function ToolsIconList({ items }: ToolsIconListProps) {
  return (
    <ul className={styles.toolsIconList}>
      {items.map((item, index) => {
        const hasIcon = hasMappedIcon(item.icon) || isImageIconSource(item.icon);
        const chipClassName = hasIcon
          ? styles.toolIconChip
          : `${styles.toolIconChip} ${styles.toolIconChipFallback}`;
        const tooltipId = hasIcon
          ? `tool-icon-tooltip-${item.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")}-${index}`
          : undefined;

        return (
          <li key={`${item.name}-${item.icon}`} className={styles.toolIconItem}>
            {item.href ? (
              <>
                <a
                  className={chipClassName}
                  href={item.href}
                  target={isExternalLink(item.href) ? "_blank" : undefined}
                  rel={isExternalLink(item.href) ? "noreferrer" : undefined}
                  aria-label={item.ariaLabel}
                  aria-describedby={tooltipId}
                >
                  <ToolIconContent item={item} />
                </a>
                {tooltipId ? (
                  <span
                    id={tooltipId}
                    role="tooltip"
                    className={styles.toolIconTooltip}
                  >
                    {item.name}
                  </span>
                ) : null}
              </>
            ) : (
              <>
                <div
                  className={chipClassName}
                  role={hasIcon ? "img" : undefined}
                  aria-label={hasIcon ? item.ariaLabel : undefined}
                  aria-describedby={tooltipId}
                  tabIndex={hasIcon ? 0 : undefined}
                >
                  <ToolIconContent item={item} />
                </div>
                {tooltipId ? (
                  <span
                    id={tooltipId}
                    role="tooltip"
                    className={styles.toolIconTooltip}
                  >
                    {item.name}
                  </span>
                ) : null}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
