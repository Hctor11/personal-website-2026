import { readdir, rename, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import sharp from "sharp";

const GALLERY_DIR = join(process.cwd(), "public", "images", "gallery");
const MAX_EDGE = 2000;
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function optimizeImage(filePath) {
  const before = (await stat(filePath)).size;
  const tempPath = `${filePath}.tmp`;

  await sharp(filePath)
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 9, palette: true })
    .toFile(tempPath);

  await rename(tempPath, filePath);

  const after = (await stat(filePath)).size;
  return { before, after };
}

async function main() {
  const entries = await readdir(GALLERY_DIR);
  const targets = entries
    .filter((name) => RASTER_EXTENSIONS.has(extname(name).toLowerCase()))
    .sort();

  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of targets) {
    const filePath = join(GALLERY_DIR, name);
    const { before, after } = await optimizeImage(filePath);
    totalBefore += before;
    totalAfter += after;

    const beforeKb = (before / 1024).toFixed(1);
    const afterKb = (after / 1024).toFixed(1);
    console.log(`${name}: ${beforeKb} KB -> ${afterKb} KB`);
  }

  console.log("---");
  console.log(`Files processed: ${targets.length}`);
  console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
