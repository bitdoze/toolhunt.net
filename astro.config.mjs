import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://toolhunt.net",
  trailingSlash: "always",
  // Fully static catalog for Cloudflare Pages (output: dist/)
  output: "static",
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
