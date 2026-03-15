import styles from "../PortfolioSection.module.css";

interface LocationMapProps {
  lat: number;
  lng: number;
  label: string;
  zoom: number;
}

const toFixedCoordinate = (value: number) => value.toFixed(6);

function getBoundingBox(lat: number, lng: number, zoom: number) {
  const delta = Math.max(0.01, 0.3 / zoom);

  return {
    left: lng - delta,
    right: lng + delta,
    top: lat + delta,
    bottom: lat - delta,
  };
}

export function LocationMap({
  lat,
  lng,
  label,
  zoom,
}: LocationMapProps) {
  const bounds = getBoundingBox(lat, lng, zoom);
  const src =
    "https://www.openstreetmap.org/export/embed.html" +
    `?bbox=${toFixedCoordinate(bounds.left)}%2C${toFixedCoordinate(bounds.bottom)}` +
    `%2C${toFixedCoordinate(bounds.right)}%2C${toFixedCoordinate(bounds.top)}` +
    `&layer=mapnik&marker=${toFixedCoordinate(lat)}%2C${toFixedCoordinate(lng)}`;

  return (
    <iframe
      className={styles.locationMapFrame}
      src={src}
      title={`Map showing ${label}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
