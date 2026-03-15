import type { PortfolioLocation } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";
import { LocationMap } from "./LocationMap";

interface LocationCardProps {
  location: PortfolioLocation;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <section className={`${styles.surfaceCard} ${styles.locationCard}`}>
      <div className={styles.locationContent}>
        <h2 className={styles.cardTitle}>{location.label}</h2>
        <p className={styles.locationText}>
          <span>{location.city}</span>
          <span>{location.country}</span>
        </p>
      </div>

      <figure className={styles.locationMap}>
        <LocationMap
          lat={location.coordinates.lat}
          lng={location.coordinates.lng}
          zoom={location.zoom}
          label={`${location.city}, ${location.country}`}
        />
      </figure>
    </section>
  );
}
