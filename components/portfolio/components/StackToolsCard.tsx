import type { StackToolsSection } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";
import { ToolsIconList } from "./ToolsIconList";

interface StackToolsCardProps {
  stackTools: StackToolsSection;
}

export function StackToolsCard({ stackTools }: StackToolsCardProps) {
  const groups = [
    {
      id: "frontend",
      label: "Frontend tools",
      items: stackTools.frontend ?? stackTools.developer ?? [],
    },
    {
      id: "backend",
      label: "Backend tools",
      items: stackTools.backend ?? [],
    },
    {
      id: "designer",
      label: "Design tools",
      items: stackTools.designer ?? [],
    },
  ].filter((group) => group.items.length > 0);

  return (
    <section className={`${styles.surfaceCard} ${styles.stackToolsCard}`}>
      <h2 className={styles.cardTitle}>{stackTools.title}</h2>

      <div className={styles.stackToolsGroups}>
        {groups.map((group) => (
          <section
            key={group.id}
            className={styles.stackToolsGroup}
            aria-labelledby={`stack-tools-${group.id}`}
          >
            <h3 id={`stack-tools-${group.id}`} className={styles.srOnly}>
              {group.label}
            </h3>
            <ToolsIconList items={group.items} />
          </section>
        ))}
      </div>
    </section>
  );
}
