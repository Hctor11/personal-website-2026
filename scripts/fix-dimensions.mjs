import { readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import sharp from "sharp";

const DATA_PATH = join(process.cwd(), "data", "portfolioData.json");
const PUBLIC_DIR = join(process.cwd(), "public");

async function main() {
  const raw = await readFile(DATA_PATH, "utf8");
  const trailingNewline = raw.endsWith("\n") ? "\n" : "";
  const data = JSON.parse(raw);

  let changed = 0;

  for (const item of data.designGallery.items) {
    if (extname(item.image).toLowerCase() === ".svg") {
      console.log(`skipped (svg, no intrinsic raster dimensions): ${item.id}`);
      continue;
    }

    const filePath = join(PUBLIC_DIR, item.image);
    const metadata = await sharp(filePath).metadata();
    const { width, height } = metadata;

    if (item.width !== width || item.height !== height) {
      console.log(
        `${item.id}: ${item.width}x${item.height} -> ${width}x${height}`
      );
      item.width = width;
      item.height = height;
      changed += 1;
    }
  }

  const output = JSON.stringify(data, null, 2) + trailingNewline;
  await writeFile(DATA_PATH, output, "utf8");

  console.log("---");
  console.log(`Entries changed: ${changed}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
