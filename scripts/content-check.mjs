#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const contentDir = path.join(root, 'src', 'content');

const TOOL_COLLECTIONS = ['sh', 'tools', 'mac', 'alternatives', 'blog'];
const REQUIRED_BY_COLLECTION = {
  sh: [
    'title',
    'publishedDate',
    'logo',
    'uiImage',
    'description',
    'keyFeatures',
    'category',
    'alternativeTo',
    'checkItUrl',
  ],
  tools: [
    'title',
    'publishedDate',
    'logo',
    'uiImage',
    'description',
    'keyFeatures',
    'category',
    'checkItUrl',
  ],
  mac: [
    'title',
    'publishedDate',
    'logo',
    'uiImage',
    'description',
    'keyFeatures',
    'category',
    'pricing',
    'checkItUrl',
  ],
  alternatives: [
    'title',
    'publishedDate',
    'logo',
    'uiImage',
    'description',
    'keyFeatures',
    'category',
  ],
  blog: ['title', 'publishedDate', 'description', 'author', 'tags'],
};

const URL_FIELDS = ['checkItUrl'];
const CHECK_REMOTE = process.env.CONTENT_CHECK_REMOTE === '1';
const errors = [];
const warnings = [];

const categoriesModule = await import(
  pathToFileURL(path.join(root, 'src/data/categories.ts')).href
).catch(async () => {
  // Fallback when TS import is unavailable under plain node; parse exported arrays
  const raw = fs.readFileSync(path.join(root, 'src/data/categories.ts'), 'utf8');
  const pick = (name) => {
    const match = raw.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const`));
    if (!match) return [];
    return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  };
  return {
    SH_CATEGORIES: pick('SH_CATEGORIES'),
    TOOL_CATEGORIES: pick('TOOL_CATEGORIES'),
    MAC_CATEGORIES: pick('MAC_CATEGORIES'),
    ALTERNATIVES_CATEGORIES: pick('ALTERNATIVES_CATEGORIES'),
  };
});

const CATEGORIES = {
  sh: categoriesModule.SH_CATEGORIES,
  tools: categoriesModule.TOOL_CATEGORIES,
  mac: categoriesModule.MAC_CATEGORIES,
  alternatives: categoriesModule.ALTERNATIVES_CATEGORIES,
};

function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, '').trimStart();
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;
  const block = text.slice(4, end).trim();
  const data = {};
  let currentKey = null;
  let inArray = false;
  let arrayValues = [];

  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (inArray) {
      if (trimmed === ']') {
        data[currentKey] = arrayValues;
        inArray = false;
        currentKey = null;
        arrayValues = [];
        continue;
      }
      const item = trimmed
        .replace(/^-\s*/, '')
        .replace(/^["']|["']$/g, '')
        .replace(/,$/, '');
      if (item) arrayValues.push(item);
      continue;
    }

    const match = trimmed.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, valueRaw] = match;
    const value = valueRaw.trim();

    if (value === '[' || value.startsWith('[')) {
      currentKey = key;
      if (value === '[') {
        inArray = true;
        arrayValues = [];
      } else {
        const inner = value.replace(/^\[/, '').replace(/\]$/, '');
        data[key] = inner
          .split(',')
          .map((part) => part.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
      continue;
    }

    data[key] = value.replace(/^["']|["']$/g, '');
  }

  return data;
}

function publicPathExists(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') return false;
  if (!assetPath.startsWith('/')) return false;
  const full = path.join(publicDir, assetPath.replace(/^\//, ''));
  return fs.existsSync(full) && fs.statSync(full).size > 0;
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function remoteLooksAlive(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'ToolHuntContentCheck/1.0' },
    });
    if (res.status === 405 || res.status === 403 || res.status === 401) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'ToolHuntContentCheck/1.0' },
      });
    }
    return res.status > 0 && res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function bodyAfterFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, '').trimStart();
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text;
  return text.slice(end + 4);
}

function hasBitdozeGuide(body) {
  const hasHeading = /##\s+Full Setup Guide/i.test(body);
  const hasBitdozeLink = /https?:\/\/(?:www\.)?bitdoze\.com\//i.test(body);
  return { hasHeading, hasBitdozeLink };
}

async function checkCollection(collection) {
  const dir = path.join(contentDir, collection);
  if (!fs.existsSync(dir)) {
    errors.push(`Missing content directory: src/content/${collection}`);
    return;
  }

  const files = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .sort();

  if (files.length === 0) {
    warnings.push(`No content files found in src/content/${collection}`);
    return;
  }

  for (const file of files) {
    const rel = `src/content/${collection}/${file}`;
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const data = parseFrontmatter(raw);
    if (!data) {
      errors.push(`${rel}: missing or invalid frontmatter`);
      continue;
    }

    for (const field of REQUIRED_BY_COLLECTION[collection]) {
      const value = data[field];
      if (value === undefined || value === null || value === '') {
        errors.push(`${rel}: missing required field "${field}"`);
      }
    }

    if (CATEGORIES[collection] && data.category) {
      if (!CATEGORIES[collection].includes(data.category)) {
        errors.push(
          `${rel}: unknown category "${data.category}". Allowed: ${CATEGORIES[collection].join(', ')}`
        );
      }
    }

    for (const assetField of ['logo', 'uiImage', 'image']) {
      const asset = data[assetField];
      if (!asset) continue;
      if (!publicPathExists(asset)) {
        errors.push(`${rel}: ${assetField} asset not found or empty: ${asset}`);
      } else {
        const full = path.join(publicDir, asset.replace(/^\//, ''));
        const size = fs.statSync(full).size;
        if (size > 900_000) {
          warnings.push(
            `${rel}: large ${assetField} (${Math.round(size / 1024)}KB): ${asset}`
          );
        }
      }
    }

    for (const field of URL_FIELDS) {
      const value = data[field];
      if (!value) continue;
      if (!isValidHttpUrl(value)) {
        errors.push(`${rel}: ${field} is not a valid http(s) URL: ${value}`);
        continue;
      }
      if (CHECK_REMOTE) {
        const ok = await remoteLooksAlive(value);
        if (!ok) warnings.push(`${rel}: ${field} did not respond successfully: ${value}`);
      }
    }

    if (collection === 'sh') {
      const body = bodyAfterFrontmatter(raw);
      const { hasHeading, hasBitdozeLink } = hasBitdozeGuide(body);
      // Prefer warnings so legacy entries do not block CI; scaffolded entries include both.
      if (!hasHeading) {
        warnings.push(`${rel}: missing "## Full Setup Guide" section`);
      }
      if (!hasBitdozeLink) {
        warnings.push(`${rel}: Full Setup Guide should include a bitdoze.com link`);
      }
      if (hasHeading && !hasBitdozeLink) {
        // Stronger signal when the section exists but link is missing
        warnings.push(`${rel}: Full Setup Guide section exists without bitdoze.com URL`);
      }
    }
  }
}

for (const collection of TOOL_COLLECTIONS) {
  await checkCollection(collection);
}

if (warnings.length) {
  console.log('Content check warnings:');
  for (const warning of warnings) console.log(`  - ${warning}`);
}

if (errors.length) {
  console.error(`Content check failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `Content check passed: frontmatter, assets, categories, and URLs look good${
    CHECK_REMOTE ? ' (remote checked)' : ''
  }.`
);
