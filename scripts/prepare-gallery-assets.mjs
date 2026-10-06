import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

const input = process.argv[2];
if (!input)
  throw new Error(
    "Usage: node scripts/prepare-gallery-assets.mjs <source-directory>",
  );
const destination = resolve("public/media/gallery");
await mkdir(destination, { recursive: true });
const manifest = {
  generatedFrom: "User-approved Experience Gallery reference",
  assets: {},
};
for (const name of [
  "overview",
  "experience",
  "projects",
  "volunteering",
  "education",
]) {
  const source = await readFile(resolve(input, `${name}.png`));
  const metadata = await sharp(source).metadata();
  const variants = [];
  for (const width of [480, 900, 1440]) {
    const filename = `${name}-${width}.webp`;
    const output = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width === 1440 ? 88 : 84, effort: 6 })
      .toBuffer();
    await writeFile(resolve(destination, filename), output);
    variants.push({ filename, width, bytes: output.byteLength });
  }
  manifest.assets[name] = {
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    sourceSha256: createHash("sha256").update(source).digest("hex"),
    variants,
  };
}
await writeFile(
  resolve(destination, "assets.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  Object.entries(manifest.assets)
    .map(
      ([name, item]) =>
        `${name}: ${item.variants.map((variant) => `${variant.width}px ${Math.round(variant.bytes / 1024)}KB`).join(", ")}`,
    )
    .join("\n"),
);
