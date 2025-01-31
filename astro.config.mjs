import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://toolhunt.net',
  adapter: cloudflare(),
  integrations: [
    tailwind(),
    markdoc(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Customize priority for different types of pages
      customPages: [
        {
          url: '/',
          changefreq: 'daily',
          priority: 1.0
        },
        {
          url: '/sh',
          changefreq: 'daily',
          priority: 0.9
        },
        {
          url: '/tools',
          changefreq: 'daily',
          priority: 0.9
        },
        {
          url: '/alternatives',
          changefreq: 'daily',
          priority: 0.9
        }
      ]
    })
  ]
});