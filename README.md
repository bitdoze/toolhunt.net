# ToolHunt

Catalog of self-hosted apps, online tools, Mac apps, and alternatives.

Site: [https://toolhunt.net](https://toolhunt.net)

## Stack

- Astro 7 (static output)
- Tailwind CSS 4
- Content Layer collections (`src/content.config.ts`)
- Cloudflare Pages (static assets)
- Client-side search (Fuse.js) and catalog filters

## Project structure

```text
src/
  components/       UI components (cards, filters, search)
  content/          Markdown/MDX entries by collection
  content.config.ts Content Layer schemas + loaders
  layouts/          Base, section, and detail layouts
  lib/content.ts    Shared content helpers
  pages/            Routes
  scripts/          Theme + navigation client scripts
public/
  images/           Logos and UI screenshots
  _headers          Cloudflare security/cache headers
scripts/
  content-check.mjs Validate frontmatter + asset paths
  new-entry.mjs     Scaffold a new content entry
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run check` | Astro type/content checks |
| `npm run content:check` | Validate frontmatter, assets, categories, URLs |
| `npm run content:check:remote` | Same + live `checkItUrl` reachability |
| `npm run images:optimize` | Compress oversized screenshots/logos |
| `npm run ci` | content:check + astro check + build |
| `npm run new:sh -- <slug>` | Scaffold a self-hosted entry |
| `npm run new:mac -- <slug>` | Scaffold a Mac app entry |
| `npm run new:tools -- <slug>` | Scaffold an online tool entry |
| `npm run new:entry -- <collection> <slug>` | Scaffold any collection |

Node requirement: `>=22.12.0` (see `.nvmrc`).

## Content workflow

1. Scaffold:
   ```bash
   npm run new:sh -- my-tool --title "My Tool" --category "Automation"
   ```
2. Replace placeholder images in `public/images/<collection>/`.
3. Fill frontmatter and body (see `AGENTS.md`).
4. Validate and build:
   ```bash
   npm run content:check
   npm run check
   npm run build
   ```

## Collections

| Collection | Path | URL prefix |
| --- | --- | --- |
| Self-hosted | `src/content/sh` | `/sh/` |
| Online tools | `src/content/tools` | `/tools/` |
| Mac apps | `src/content/mac` | `/mac/` |
| Alternatives | `src/content/alternatives` | `/alternatives/` |
| Blog | `src/content/blog` | `/blog/` |

## SEO / product routes

- Tool OG cards: `/og/{collection}/{id}.svg`
- Blog RSS: `/rss.xml`
- Alternatives hubs: `/alternatives/to/{slug}/`

## Deploy

Static site for Cloudflare Pages (no Workers/wrangler required).

```bash
npm run build
```

Pages settings:
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22` (see `.nvmrc`)

Trailing slashes are always enabled. Validate locally with `npm run content:check && npm run check && npm run build`.

## Docs for agents/contributors

Content authoring rules live in [`AGENTS.md`](./AGENTS.md).
Category taxonomy lives in [`src/data/categories.ts`](./src/data/categories.ts).
