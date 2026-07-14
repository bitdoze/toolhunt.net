import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './slugify';

export type ToolCollection = 'sh' | 'tools' | 'alternatives' | 'mac';
export type ToolEntry =
  | CollectionEntry<'sh'>
  | CollectionEntry<'tools'>
  | CollectionEntry<'alternatives'>
  | CollectionEntry<'mac'>;

export type SearchIndexItem = {
  id: string;
  collection: ToolCollection;
  title: string;
  description: string;
  category: string;
  logo: string;
  alternativeTo?: string;
  keyFeatures?: string[];
  pricing?: string;
};

const TOOL_COLLECTIONS: ToolCollection[] = ['sh', 'tools', 'alternatives', 'mac'];

export function isToolCollection(value: string): value is ToolCollection {
  return TOOL_COLLECTIONS.includes(value as ToolCollection);
}

export function toolUrl(entry: Pick<ToolEntry, 'collection' | 'id'>): string {
  return `/${entry.collection}/${entry.id}/`;
}

export function blogUrl(entry: Pick<CollectionEntry<'blog'>, 'id'>): string {
  return `/blog/${entry.id}/`;
}

export function alternativeToUrl(name: string): string {
  return `/alternatives/to/${slugify(name)}/`;
}

export function ogImageUrl(entry: Pick<ToolEntry, 'collection' | 'id'>): string {
  return `/og/${entry.collection}/${entry.id}.svg`;
}

export function sortByDateDesc<T extends { data: { publishedDate: Date } }>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime()
  );
}

export function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function getAlternativeTo(entry: ToolEntry): string | undefined {
  return 'alternativeTo' in entry.data ? entry.data.alternativeTo : undefined;
}

export function getCheckItUrl(entry: ToolEntry): string | undefined {
  return 'checkItUrl' in entry.data ? entry.data.checkItUrl : undefined;
}

export function getPricing(entry: ToolEntry): string | undefined {
  return 'pricing' in entry.data ? entry.data.pricing : undefined;
}

export function toSearchIndexItem(entry: ToolEntry): SearchIndexItem {
  return {
    id: entry.id,
    collection: entry.collection,
    title: entry.data.title,
    description: entry.data.description,
    category: entry.data.category,
    logo: entry.data.logo,
    alternativeTo: getAlternativeTo(entry),
    keyFeatures: entry.data.keyFeatures,
    pricing: getPricing(entry),
  };
}

export async function getCollectionTools(collection: ToolCollection): Promise<ToolEntry[]> {
  return getCollection(collection) as Promise<ToolEntry[]>;
}

export async function getAllTools(): Promise<ToolEntry[]> {
  const [sh, tools, alternatives, mac] = await Promise.all([
    getCollection('sh'),
    getCollection('tools'),
    getCollection('alternatives'),
    getCollection('mac'),
  ]);
  return [...sh, ...tools, ...alternatives, ...mac];
}

/** Categories treated as AI tools for the aggregate /ai/ section. */
export function isAiCategory(category: string): boolean {
  return category === 'AI' || category.startsWith('AI ');
}

export function isAiTool(entry: ToolEntry): boolean {
  return isAiCategory(entry.data.category);
}

export async function getAiTools(): Promise<ToolEntry[]> {
  const tools = await getAllTools();
  return sortByDateDesc(tools.filter(isAiTool));
}

export async function getToolsByCategory(
  collection: ToolCollection,
  category: string
): Promise<ToolEntry[]> {
  const tools = await getCollectionTools(collection);
  return tools.filter((tool) => tool.data.category === category);
}

export function getRelatedTools(
  entry: ToolEntry,
  pool: ToolEntry[],
  limit = 3,
  allTools: ToolEntry[] = pool
): ToolEntry[] {
  const currentAlt = getAlternativeTo(entry);
  const used = new Set<string>([`${entry.collection}:${entry.id}`]);
  const result: ToolEntry[] = [];

  const pushUnique = (items: ToolEntry[]) => {
    for (const tool of items) {
      const key = `${tool.collection}:${tool.id}`;
      if (used.has(key)) continue;
      used.add(key);
      result.push(tool);
      if (result.length >= limit) return true;
    }
    return false;
  };

  if (currentAlt) {
    const sameAlternative = allTools.filter(
      (tool) =>
        `${tool.collection}:${tool.id}` !== `${entry.collection}:${entry.id}` &&
        getAlternativeTo(tool) === currentAlt
    );
    if (pushUnique(shuffleArray(sameAlternative))) return result;
  }

  const sameCategory = pool.filter(
    (tool) => tool.id !== entry.id && tool.data.category === entry.data.category
  );
  if (pushUnique(shuffleArray(sameCategory))) return result;

  const otherSameCollection = pool.filter(
    (tool) =>
      tool.id !== entry.id &&
      tool.collection === entry.collection &&
      tool.data.category !== entry.data.category
  );
  pushUnique(shuffleArray(otherSameCollection));

  return result;
}

export function uniqueSorted(values: Array<string | undefined | null>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function collectionLabel(collection: ToolCollection): string {
  switch (collection) {
    case 'sh':
      return 'Self-hosted';
    case 'tools':
      return 'Online Tool';
    case 'mac':
      return 'Mac App';
    case 'alternatives':
      return 'Alternative';
  }
}

export type AlternativeGroup = {
  name: string;
  slug: string;
  tools: ToolEntry[];
};

export async function getAlternativeGroups(): Promise<AlternativeGroup[]> {
  const tools = await getAllTools();
  const map = new Map<string, ToolEntry[]>();

  for (const tool of tools) {
    const name = getAlternativeTo(tool);
    if (!name) continue;
    const list = map.get(name) || [];
    list.push(tool);
    map.set(name, list);
  }

  return [...map.entries()]
    .map(([name, groupTools]) => ({
      name,
      slug: slugify(name),
      tools: sortByDateDesc(groupTools),
    }))
    .filter((group) => group.tools.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function buildSoftwareApplicationJsonLd(
  entry: ToolEntry,
  site = 'https://toolhunt.net'
): Record<string, unknown> {
  const url = new URL(toolUrl(entry), site).toString();
  const logo = new URL(entry.data.logo, site).toString();
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: entry.data.title,
    description: entry.data.description,
    applicationCategory: entry.data.category,
    url,
    image: logo,
    operatingSystem:
      entry.collection === 'mac'
        ? 'macOS'
        : entry.collection === 'sh'
          ? 'Self-hosted / Docker'
          : 'Web',
  };

  const pricing = getPricing(entry);
  if (pricing) {
    jsonLd.offers = {
      '@type': 'Offer',
      price: pricing === 'Free' ? '0' : undefined,
      priceCurrency: 'USD',
      description: pricing,
      availability: 'https://schema.org/InStock',
    };
  }

  const checkItUrl = getCheckItUrl(entry);
  if (checkItUrl) {
    jsonLd.sameAs = [checkItUrl];
  }

  return jsonLd;
}

export function buildBlogPostingJsonLd(
  post: CollectionEntry<'blog'>,
  site = 'https://toolhunt.net'
): Record<string, unknown> {
  const url = new URL(blogUrl(post), site).toString();
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.publishedDate.toISOString(),
    author: {
      '@type': 'Person',
      name: post.data.author,
    },
    image: post.data.image ? new URL(post.data.image, site).toString() : undefined,
    mainEntityOfPage: url,
    url,
    keywords: post.data.tags.join(', '),
  };
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
