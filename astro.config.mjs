import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://toolhunt.net",
  adapter: cloudflare(),
  integrations: [icon(), markdoc(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
