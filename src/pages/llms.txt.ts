import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  alternativeToUrl,
  blogUrl,
  getAiTools,
  getAllTools,
  getAlternativeTo,
  getCheckItUrl,
  getPricing,
  sortByDateDesc,
  toolUrl,
  type ToolEntry,
} from '../lib/content';

const COLLECTION_LABELS: Record<ToolEntry['collection'], string> = {
  sh: 'Self-hosted apps',
  tools: 'Online tools',
  mac: 'Mac apps',
  alternatives: 'Alternatives',
};

const COLLECTION_ORDER: ToolEntry['collection'][] = ['sh', 'tools', 'mac', 'alternatives'];

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function listItem(title: string, url: string, description: string): string {
  return `- [${title}](${url}): ${cleanText(description)}`;
}

function toolDescription(tool: ToolEntry): string {
  const parts = [cleanText(tool.data.description)];
  const features = tool.data.keyFeatures?.slice(0, 4).join(', ');
  if (features) parts.push(`Features: ${features}.`);

  const meta: string[] = [`Category: ${tool.data.category}`];
  const pricing = getPricing(tool);
  if (pricing) meta.push(`Pricing: ${pricing}`);
  const alternativeTo = getAlternativeTo(tool);
  if (alternativeTo) meta.push(`Alternative to: ${alternativeTo}`);
  const checkItUrl = getCheckItUrl(tool);
  if (checkItUrl) meta.push(`Website: ${checkItUrl}`);
  parts.push(meta.join('. ') + '.');

  return parts.join(' ');
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') || 'https://toolhunt.net';
  const [allTools, blogPosts, aiTools] = await Promise.all([
    getAllTools(),
    getCollection('blog'),
    getAiTools(),
  ]);

  const toolsByCollection = Object.fromEntries(
    COLLECTION_ORDER.map((collection) => [
      collection,
      sortByDateDesc(allTools.filter((tool) => tool.collection === collection)),
    ])
  ) as Record<ToolEntry['collection'], ToolEntry[]>;

  const alternativeMap = new Map<string, ToolEntry[]>();
  for (const tool of allTools) {
    const name = getAlternativeTo(tool);
    if (!name) continue;
    const list = alternativeMap.get(name) || [];
    list.push(tool);
    alternativeMap.set(name, list);
  }

  const alternativePages = [...alternativeMap.entries()]
    .map(([name, tools]) => ({
      name,
      count: tools.length,
      href: `${siteUrl}${alternativeToUrl(name)}`,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const posts = sortByDateDesc(blogPosts);

  const collectionSections = COLLECTION_ORDER.map((collection) => {
    const tools = toolsByCollection[collection];
    if (tools.length === 0) return '';
    const items = tools
      .map((tool) =>
        listItem(tool.data.title, `${siteUrl}${toolUrl(tool)}`, toolDescription(tool))
      )
      .join('\n');
    return `## ${COLLECTION_LABELS[collection]}\n\n${items}`;
  }).filter(Boolean);

  const alternativesSection =
    alternativePages.length > 0
      ? `## Alternatives to\n\n${alternativePages
          .map((item) =>
            listItem(
              item.name,
              item.href,
              `${item.count} curated alternative${item.count === 1 ? '' : 's'} listed on ToolHunt.`
            )
          )
          .join('\n')}`
      : '';

  const blogSection =
    posts.length > 0
      ? `## Blog\n\n${posts
          .map((post) =>
            listItem(post.data.title, `${siteUrl}${blogUrl(post)}`, post.data.description)
          )
          .join('\n')}`
      : '';

  const body = [
    '# ToolHunt',
    '',
    '> Discover and compare self-hosted apps, online tools, Mac software, and alternatives.',
    '',
    'ToolHunt is a curated catalog of developer and productivity tools. Use it to find self-hosted apps, online tools, Mac apps, and alternatives to popular products, with short descriptions, categories, and links to official sites.',
    '',
    '## Catalog overview',
    '',
    `- Total tools: ${allTools.length}`,
    `- AI tools (cross-catalog): ${aiTools.length}`,
    ...COLLECTION_ORDER.map(
      (collection) =>
        `- ${COLLECTION_LABELS[collection]}: ${toolsByCollection[collection].length}`
    ),
    `- Blog posts: ${posts.length}`,
    `- Alternatives-to pages: ${alternativePages.length}`,
    '',
    '## Sections',
    '',
    listItem('Home', `${siteUrl}/`, 'Search and browse the full ToolHunt catalog.'),
    listItem(
      'Self-hosted apps',
      `${siteUrl}/sh/`,
      'Open-source and self-hosted applications you can run yourself.'
    ),
    listItem(
      'AI tools',
      `${siteUrl}/ai/`,
      'AI apps and infrastructure across Mac, self-hosted, and online catalogs.'
    ),
    listItem('Online tools', `${siteUrl}/tools/`, 'Browser-based tools for everyday workflows.'),
    listItem('Mac apps', `${siteUrl}/mac/`, 'Free and freemium Mac software recommendations.'),
    listItem(
      'Alternatives',
      `${siteUrl}/alternatives/`,
      'Alternatives to popular commercial and cloud products.'
    ),
    listItem('Blog', `${siteUrl}/blog/`, 'Guides and roundups from ToolHunt.'),
    listItem('Submit a tool', `${siteUrl}/submit/`, 'Suggest a new tool for the catalog.'),
    '',
    aiTools.length > 0
      ? `## AI tools\n\n${aiTools
          .map((tool) =>
            listItem(tool.data.title, `${siteUrl}${toolUrl(tool)}`, toolDescription(tool))
          )
          .join('\n')}`
      : '',
    ...collectionSections,
    alternativesSection,
    blogSection,
    '## Resources',
    '',
    listItem('RSS Feed', `${siteUrl}/rss.xml`, 'Blog RSS feed for ToolHunt articles.'),
    listItem('Sitemap', `${siteUrl}/sitemap-index.xml`, 'XML sitemap index for all pages.'),
    listItem('llms.txt', `${siteUrl}/llms.txt`, 'Machine-readable catalog summary for LLMs.'),
    listItem('About', `${siteUrl}/about/`, 'About ToolHunt.'),
    listItem('Contact', `${siteUrl}/contact/`, 'Contact the ToolHunt team.'),
    listItem('Privacy', `${siteUrl}/privacy/`, 'Privacy policy.'),
  ]
    .filter((line) => line != null)
    .join('\n');

  return new Response(`${body}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
