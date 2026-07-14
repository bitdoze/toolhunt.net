import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogUrl, escapeXml, sortByDateDesc } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') || 'https://toolhunt.net';
  const posts = sortByDateDesc(await getCollection('blog'));

  const items = posts
    .map((post) => {
      const link = `${siteUrl}${blogUrl(post)}`;
      const pubDate = post.data.publishedDate.toUTCString();
      return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.data.description)}</description>
      ${post.data.image ? `<enclosure url="${siteUrl}${post.data.image}" type="image/webp" />` : ''}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ToolHunt Blog</title>
    <link>${siteUrl}/blog/</link>
    <description>Guides and updates from ToolHunt about self-hosted apps, online tools, and Mac apps.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
};
