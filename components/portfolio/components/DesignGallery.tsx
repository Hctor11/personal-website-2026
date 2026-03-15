"use client";

import { useState } from "react";

import type { DesignGallerySection } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";
import { GalleryCard } from "./GalleryCard";
import { GalleryLightbox } from "./GalleryLightbox";

interface DesignGalleryProps {
  gallery: DesignGallerySection;
}

export function DesignGallery({ gallery }: DesignGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <section className={styles.gallerySection} aria-labelledby="design-gallery-heading">
        <div className={styles.galleryIntro}>
          <h2 id="design-gallery-heading" className={styles.cardTitle}>
            {gallery.title}
          </h2>
          <p className={styles.gallerySubtitle}>{gallery.subtitle}</p>
        </div>

        <ul className={styles.galleryGrid}>
          {gallery.items.map((item, index) => (
            <li key={item.id} className={styles.galleryItem}>
              <GalleryCard
                item={item}
                index={index}
                onOpen={() => setSelectedIndex(index)}
              />
            </li>
          ))}
        </ul>
      </section>

      <GalleryLightbox
        items={gallery.items}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelect={setSelectedIndex}
      />
    </>
  );
}
