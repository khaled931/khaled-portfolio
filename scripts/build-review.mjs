// A portable, private review artifact. This command does not deploy or push.
import { build } from "vite";
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { resolve, dirname, relative } from "node:path";

const root = resolve(import.meta.dirname, "..");
const buildDirectory = resolve(root, ".house-review");
const destination = resolve(
  process.argv[2] ||
    resolve(root, "../artifacts/jakob-portfolio-house-preview.html"),
);

await build({
  root,
  base: "./",
  build: {
    outDir: buildDirectory,
    assetsInlineLimit: 2_000_000,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true, format: "iife" } },
  },
});

const assetMap = {};
async function addImages(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, item.name);
    if (item.isDirectory()) await addImages(path);
    else if (
      item.name.endsWith("-900.webp") ||
      (path.includes("photography") && item.name.endsWith(".webp"))
    ) {
      const key =
        "/" + relative(resolve(root, "public"), path).replaceAll("\\", "/");
      assetMap[key] =
        "data:image/webp;base64," + (await readFile(path)).toString("base64");
    }
  }
}
await addImages(resolve(root, "public/media"));

let html = await readFile(resolve(buildDirectory, "index.html"), "utf8");
const scriptTag = html.match(
  /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/,
);
const styleTag = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (!scriptTag || !styleTag)
  throw new Error("Vite output is missing its entry script or stylesheet.");
const script = await readFile(resolve(buildDirectory, scriptTag[1]), "utf8");
const css = await readFile(resolve(buildDirectory, styleTag[1]), "utf8");
const imageLoader = `
  (() => {
    const images = ${JSON.stringify(assetMap)};
    const resolveImage = value => images[String(value)] || value;
    const src = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    const srcset = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'srcset');
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      ...src, set(value) { src.set.call(this, resolveImage(value)); }
    });
    Object.defineProperty(HTMLImageElement.prototype, 'srcset', {
      ...srcset, set() { srcset.set.call(this, ''); }
    });
    const setAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value) {
      if (this.tagName === 'IMG') {
        if (String(name).toLowerCase() === 'srcset') return;
        if (String(name).toLowerCase() === 'src') value = resolveImage(value);
      }
      return setAttribute.call(this, name, value);
    };
  })();
`;
const deferredEntry = `
  (() => {
    const start = () => { ${imageLoader}\n${script} };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true });
    } else start();
  })();
`;
html = html.replace(
  scriptTag[0],
  () =>
    `<script>${deferredEntry.replaceAll("</script", "<\\/script")}</script>`,
);
html = html.replace(styleTag[0], () => `<style>${css}</style>`);
const favicon = (await readFile(resolve(root, "public/favicon.svg"))).toString(
  "base64",
);
html = html.replace(
  /<link rel="icon"[^>]*>/,
  `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${favicon}">`,
);
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, html);
console.log(`Private review artifact: ${destination}`);
console.log(
  `Embedded ${Object.keys(assetMap).length} images, script and locally hosted fonts.`,
);
