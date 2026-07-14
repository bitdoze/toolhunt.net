#!/usr/bin/env node
/**
 * Compress oversized raster screenshots/logos in public/images.
 * Safe defaults: skip GIF/SVG/ICO/AVIF, only rewrite when savings > 8%.
 *
 * Usage:
 *   npm run images:optimize
 *   npm run images:optimize -- --dry-run
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imagesRoot = path.join(root, 'public', 'images');
const dryRun = process.argv.includes('--dry-run');
const MIN_BYTES = 250_000;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('sharp is required. Install with: npm i -D sharp');
  process.exit(1);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const targets = walk(imagesRoot).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) return false;
  return fs.statSync(file).size >= MIN_BYTES;
});

if (targets.length === 0) {
  console.log('No oversized raster images found to optimize.');
  process.exit(0);
}

let saved = 0;
let changed = 0;

for (const file of targets) {
  const before = fs.statSync(file).size;
  const ext = path.extname(file).toLowerCase();
  const image = sharp(file, { failOn: 'none' }).rotate();
  const meta = await image.metadata();

  let pipeline = image;
  if ((meta.width || 0) > 1800) {
    pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true });
  }

  let output;
  if (ext === '.png') {
    output = await pipeline.png({ compressionLevel: 9, palette: true, quality: 80 }).toBuffer();
  } else if (ext === '.webp') {
    output = await pipeline.webp({ quality: 78 }).toBuffer();
  } else {
    output = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  }

  const after = output.length;
  const ratio = (before - after) / before;
  const rel = path.relative(root, file);

  if (ratio < 0.08) {
    console.log(`skip  ${rel} (${Math.round(before / 1024)}KB, savings ${Math.round(ratio * 100)}%)`);
    continue;
  }

  if (!dryRun) fs.writeFileSync(file, output);
  saved += before - after;
  changed += 1;
  console.log(
    `${dryRun ? 'would optimize' : 'optimized'} ${rel}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`
  );
}

console.log(
  `${dryRun ? 'Dry run complete' : 'Done'}: ${changed} file(s), saved ~${Math.round(saved / 1024)}KB`
);
