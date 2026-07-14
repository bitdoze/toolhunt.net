import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { ToolCollection } from '../../../lib/content';
import { collectionLabel, isToolCollection } from '../../../lib/content';

export async function getStaticPaths() {
  const collections: ToolCollection[] = ['sh', 'tools', 'mac', 'alternatives'];
  const paths = [];

  for (const collection of collections) {
    const entries = await getCollection(collection);
    for (const entry of entries) {
      paths.push({
        params: { collection, id: entry.id },
        props: { entry },
      });
    }
  }

  return paths;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = next;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s+\S*$/, '')}…`;
  }
  return lines;
}

export const GET: APIRoute = async ({ props, params }) => {
  const collection = params.collection || '';
  if (!isToolCollection(collection)) {
    return new Response('Not found', { status: 404 });
  }

  const entry = props.entry;
  if (!entry) {
    return new Response('Not found', { status: 404 });
  }

  const titleLines = wrapText(entry.data.title, 28, 3);
  const category = entry.data.category;
  const label = collectionLabel(collection);
  const alt =
    'alternativeTo' in entry.data && entry.data.alternativeTo
      ? `Alt to ${entry.data.alternativeTo}`
      : '';

  const titleSvg = titleLines
    .map(
      (line, index) =>
        `<text x="80" y="${280 + index * 58}" fill="#0f172a" font-size="48" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="700">${escapeXml(line)}</text>`
    )
    .join('');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eff6ff"/>
      <stop offset="55%" stop-color="#f5f3ff"/>
      <stop offset="100%" stop-color="#ecfeff"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#9333ea"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="12" fill="url(#bar)"/>
  <circle cx="1080" cy="90" r="120" fill="#2563eb" opacity="0.08"/>
  <circle cx="980" cy="520" r="160" fill="#9333ea" opacity="0.08"/>
  <text x="80" y="110" fill="#2563eb" font-size="28" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="700">ToolHunt</text>
  <rect x="80" y="150" rx="999" ry="999" width="${Math.max(140, label.length * 12 + 40)}" height="42" fill="#dbeafe"/>
  <text x="100" y="178" fill="#1e40af" font-size="20" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="600">${escapeXml(label)}</text>
  ${titleSvg}
  <text x="80" y="480" fill="#334155" font-size="28" font-family="Inter,Segoe UI,Arial,sans-serif">${escapeXml(category)}</text>
  ${
    alt
      ? `<text x="80" y="525" fill="#6b21a8" font-size="24" font-family="Inter,Segoe UI,Arial,sans-serif">${escapeXml(alt)}</text>`
      : ''
  }
  <text x="80" y="580" fill="#64748b" font-size="22" font-family="Inter,Segoe UI,Arial,sans-serif">toolhunt.net</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
