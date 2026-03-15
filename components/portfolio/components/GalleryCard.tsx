import Image from "next/image";

import type { DesignGalleryItem } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";

interface GalleryCardProps {
  item: DesignGalleryItem;
  onOpen: () => void;
  index: number;
}

export function GalleryCard({ item, onOpen, index }: GalleryCardProps) {
  const cardClassName = item.featured
    ? `${styles.galleryCard} ${styles.galleryCardFeatured}`
    : styles.galleryCard;
  const infoContent = (
    <>
      <p className={styles.galleryCardCategory}>{item.category}</p>
      <h3 className={styles.galleryCardTitle}>{item.title}</h3>
    </>
  );

  const mediaContent = (
    <>
      <div className={styles.galleryMedia}>
        <Image
          src={item.image}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading="lazy"
          sizes="(max-width: 539px) 100vw, (max-width: 767px) 50vw, (max-width: 1080px) 33vw, 25vw"
          className={styles.galleryImage}
        />
      </div>
      <div className={styles.galleryCardInfo}>{infoContent}</div>
    </>
  );

  return (
    <button
      type="button"
      className={cardClassName}
      aria-label={`Open image viewer for ${item.title}`}
      aria-haspopup="dialog"
      aria-controls="gallery-lightbox-title"
      onClick={onOpen}
    >
      {mediaContent}
      <span className={styles.srOnly} id={`gallery-${item.id}`}>
        {item.title}
      </span>
      <span className={styles.srOnly}>Image {index + 1}</span>
    </button>
  );
}
