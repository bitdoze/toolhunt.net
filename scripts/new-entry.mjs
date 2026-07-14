#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const [, , collectionArg, slugArg, ...rest] = process.argv;
const collection = collectionArg || 'sh';
const slug = slugArg;

const supported = new Set(['sh', 'tools', 'mac', 'alternatives', 'blog']);

function usage() {
  console.log(`Usage:
  npm run new:entry -- <collection> <slug> [--title "Title"] [--category "Category"]

Collections: sh | tools | mac | alternatives | blog

Examples:
  npm run new:sh -- my-tool
  npm run new:entry -- mac my-app --title "My App" --category "Utilities"
`);
}

function getFlag(name) {
  const idx = rest.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return rest[idx + 1];
}

if (!slug || !supported.has(collection)) {
  usage();
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Slug must be lowercase kebab-case (a-z, 0-9, hyphens).');
  process.exit(1);
}

const title = getFlag('title') || slug
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(' ');
const defaultCategory = {
  sh: 'Automation',
  tools: 'Utilities',
  mac: 'Utilities',
  alternatives: 'No-Code',
  blog: 'tools',
};
const category = getFlag('category') || defaultCategory[collection] || 'Utilities';
const today = new Date().toISOString().slice(0, 10);

const contentDir = path.join(root, 'src', 'content', collection);
const imageDir = path.join(root, 'public', 'images', collection);
fs.mkdirSync(contentDir, { recursive: true });
if (collection !== 'blog') fs.mkdirSync(imageDir, { recursive: true });

const contentPath = path.join(contentDir, collection === 'blog' ? `${slug}.mdx` : `${slug}.md`);
if (fs.existsSync(contentPath)) {
  console.error(`Already exists: ${path.relative(root, contentPath)}`);
  process.exit(1);
}

let body = '';
if (collection === 'blog') {
  body = `---
title: "${title}"
publishedDate: ${today}
description: "TODO: write a short summary."
author: "ToolHunt"
tags: ["tools"]
image: "/images/blog/${slug}.webp"
---

Write your article here.
`;
} else if (collection === 'sh') {
  body = `---
title: "${title}"
publishedDate: ${today}
logo: "/images/sh/${slug}-logo.png"
uiImage: "/images/sh/${slug}-ui.png"
description: "TODO: describe what this tool does and who it is for."
keyFeatures:
  - "Feature one"
  - "Feature two"
  - "Feature three"
category: "${category}"
alternativeTo: "TODO"
checkItUrl: "https://example.com"
---

${title} is a self-hosted tool for...

## Key Features

- Feature one
- Feature two

## Full Setup Guide

Read the full setup guide on BitDoze: [Install ${title}](https://www.bitdoze.com/)
`;
} else if (collection === 'mac') {
  body = `---
title: "${title}"
publishedDate: ${today}
logo: "/images/mac/${slug}-logo.png"
uiImage: "/images/mac/${slug}-ui.png"
description: "TODO: describe what this Mac app does."
keyFeatures:
  - "Feature one"
  - "Feature two"
category: "${category}"
pricing: "Free"
checkItUrl: "https://example.com"
---

${title} is a Mac app for...
`;
} else if (collection === 'tools') {
  body = `---
title: "${title}"
publishedDate: ${today}
logo: "/images/tools/${slug}-logo.png"
uiImage: "/images/tools/${slug}-ui.png"
description: "TODO: describe this online tool."
keyFeatures:
  - "Feature one"
  - "Feature two"
category: "${category}"
checkItUrl: "https://example.com"
---

${title} is an online tool for...
`;
} else {
  body = `---
title: "${title}"
publishedDate: ${today}
logo: "/images/alternatives/${slug}-logo.png"
uiImage: "/images/alternatives/${slug}-ui.png"
description: "TODO: describe this alternative."
keyFeatures:
  - "Feature one"
  - "Feature two"
category: "${category}"
alternativeTo: "TODO"
---

${title} is an alternative for...
`;
}

fs.writeFileSync(contentPath, body, 'utf8');

const created = [path.relative(root, contentPath)];
if (collection !== 'blog') {
  const logoPath = path.join(imageDir, `${slug}-logo.png`);
  const uiPath = path.join(imageDir, `${slug}-ui.png`);
  if (!fs.existsSync(logoPath)) {
    fs.writeFileSync(logoPath, '');
    created.push(path.relative(root, logoPath) + ' (placeholder, replace me)');
  }
  if (!fs.existsSync(uiPath)) {
    fs.writeFileSync(uiPath, '');
    created.push(path.relative(root, uiPath) + ' (placeholder, replace me)');
  }
}

console.log('Created:');
for (const file of created) console.log(`  - ${file}`);
console.log('\nNext steps:');
console.log('  1. Fill frontmatter and body content');
console.log('  2. Replace placeholder images with real assets');
console.log('  3. Run: npm run content:check && npm run build');
