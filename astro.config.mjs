import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://toolhunt.net",
  trailingSlash: "always",
  // Fully static catalog; filtering/search runs client-side
  output: "static",
  adapter: cloudflare({
    // Prerender static pages in Node (workerd lacks node:module used by Rolldown runtime)
    prerenderEnvironment: "node",
    // compile image service can break `astro dev` under workerd; use passthrough in DEV
    imageService: import.meta.env.DEV ? "passthrough" : "compile",
  }),
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        // Prefer stable trailing-slash URLs in sitemap
        if (!item.url.endsWith("/")) {
          item.url = `${item.url}/`;
        }
        return item;
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
