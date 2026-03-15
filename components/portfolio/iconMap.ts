import type { LucideIcon } from "lucide-react";
import {
  Atom,
  CodeXml,
  Figma,
  PanelsTopLeft,
  PenTool,
  Spline,
  Wind,
} from "lucide-react";

export const iconMap = {
  react: Atom,
  typescript: CodeXml,
  nextjs: PanelsTopLeft,
  tailwindcss: Wind,
  figma: Figma,
  illustrator: PenTool,
  framer: Spline,
} satisfies Record<string, LucideIcon>;

export type IconMapKey = keyof typeof iconMap;

export function hasMappedIcon(icon: string): icon is IconMapKey {
  return icon in iconMap;
}

export function isImageIconSource(icon: string): boolean {
  return (
    /^(\/|\.\/|\.\.\/|https?:\/\/|data:image\/)/.test(icon) ||
    /\.(svg|png|jpe?g|webp|gif|avif)$/i.test(icon)
  );
}
