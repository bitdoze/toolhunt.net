import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://toolhunt.net",
  adapter: cloudflare(),
  integrations: [tailwind(), icon(), markdoc(), sitemap()],
});
