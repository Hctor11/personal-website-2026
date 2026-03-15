"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";

import type { DesignGalleryItem } from "@/components/portfolio/types";
import styles from "../PortfolioSection.module.css";

interface GalleryLightboxProps {
  items: DesignGalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    )
  );
}

export function GalleryLightbox({
  items,
  selectedIndex,
  onClose,
  onSelect,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const selectedItem = selectedIndex === null ? null : items[selectedIndex];
  const previousIndex = useMemo(() => {
    if (selectedIndex === null) {
      return null;
    }

    return (selectedIndex - 1 + items.length) % items.length;
  }, [items.length, selectedIndex]);
  const nextIndex = useMemo(() => {
    if (selectedIndex === null) {
      return null;
    }

    return (selectedIndex + 1) % items.length;
  }, [items.length, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && previousIndex !== null) {
        event.preventDefault();
        onSelect(previousIndex);
        return;
      }

      if (event.key === "ArrowRight" && nextIndex !== null) {
        event.preventDefault();
        onSelect(nextIndex);
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = getFocusableElements(dialogRef.current);

        if (focusableElements.length === 0) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextIndex, onClose, onSelect, previousIndex, selectedIndex]);

  if (selectedItem === null || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={styles.lightboxOverlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={styles.lightboxDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-lightbox-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={`${styles.lightboxControl} ${styles.lightboxClose}`}
          onClick={onClose}
          aria-label="Close gallery viewer"
        >
          <X size={18} strokeWidth={1.9} />
        </button>

        <figure className={styles.lightboxFigure}>
          <div className={styles.lightboxMedia}>
            {previousIndex !== null ? (
              <button
                type="button"
                className={`${styles.lightboxControl} ${styles.lightboxPrev}`}
                onClick={() => onSelect(previousIndex)}
                aria-label="Show previous image"
              >
                <ChevronLeft size={20} strokeWidth={1.9} />
              </button>
            ) : null}

            <Image
              src={selectedItem.image}
              alt={selectedItem.alt}
              width={selectedItem.width}
              height={selectedItem.height}
              sizes="(max-width: 767px) 92vw, (max-width: 1080px) 84vw, 72vw"
              className={styles.lightboxImage}
              priority
            />

            {nextIndex !== null ? (
              <button
                type="button"
                className={`${styles.lightboxControl} ${styles.lightboxNext}`}
                onClick={() => onSelect(nextIndex)}
                aria-label="Show next image"
              >
                <ChevronRight size={20} strokeWidth={1.9} />
              </button>
            ) : null}
          </div>

          <figcaption className={styles.lightboxCaption}>
            <p className={styles.lightboxMeta}>{selectedItem.category}</p>
            <div className={styles.lightboxCaptionRow}>
              <h3 id="gallery-lightbox-title" className={styles.lightboxTitle}>
                {selectedItem.title}
              </h3>
              {selectedItem.href ? (
                <a
                  className={styles.lightboxLink}
                  href={selectedItem.href}
                  target={isExternalLink(selectedItem.href) ? "_blank" : undefined}
                  rel={isExternalLink(selectedItem.href) ? "noreferrer" : undefined}
                >
                  <span>Open project</span>
                  <ExternalLink size={14} strokeWidth={1.9} />
                </a>
              ) : null}
            </div>
          </figcaption>
        </figure>
      </div>
    </div>,
    document.body
  );
}
