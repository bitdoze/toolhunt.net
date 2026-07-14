# ToolHunt Content Agent Notes

How to add and maintain content entries so updates stay consistent.

## Stack quick facts

- Astro 7 + Content Layer (`src/content.config.ts`)
- Static site; catalog filtering/search is client-side
- Shared helpers: `src/lib/content.ts`
- Category taxonomy: `src/data/categories.ts` (schemas enforce allowed values)
- Image component: `src/components/ToolImage.astro`
- Detail pages use `entry.id` and `render(entry)`
- Dynamic OG cards: `/og/{collection}/{id}.svg`
- Blog RSS: `/rss.xml`
- Alternatives SEO pages: `/alternatives/to/{slug}/`

## Collections and paths

| Collection | Content | Assets | URL |
| --- | --- | --- | --- |
| `sh` | `src/content/sh/*.md` | `public/images/sh/*` | `/sh/{id}/` |
| `tools` | `src/content/tools/*.md` | `public/images/tools/*` | `/tools/{id}/` |
| `mac` | `src/content/mac/*.md` | `public/images/mac/*` | `/mac/{id}/` |
| `alternatives` | `src/content/alternatives/*.md` | `public/images/alternatives/*` | `/alternatives/{id}/` |
| `blog` | `src/content/blog/*.{md,mdx}` | `public/images/blog/*` | `/blog/{id}/` |

## Scaffold a new entry

```bash
npm run new:sh -- my-tool --title "My Tool" --category "Automation"
npm run new:mac -- my-app --title "My App" --category "Utilities"
npm run new:tools -- my-online-tool
npm run new:entry -- alternatives my-alt --category "No-Code"
npm run new:entry -- blog my-post
```

This creates the content file and placeholder logo/UI images (except blog).

## Required frontmatter

### Self-hosted (`sh`)

- `title`, `publishedDate`, `logo`, `uiImage`, `description`, `keyFeatures`, `category`, `alternativeTo`, `checkItUrl`
- Optional: `youtubeId`
- `category` must be one of `SH_CATEGORIES` in `src/data/categories.ts`
- Body should include `## Full Setup Guide` with a `bitdoze.com` link

### Online tools (`tools`)

- Same base fields as `sh` without `alternativeTo`
- `category` from `TOOL_CATEGORIES`

### Mac apps (`mac`)

- Base fields + `pricing` (`Free` | `Paid` | `Freemium`) + `checkItUrl`
- Optional: `alternativeTo`
- `category` from `MAC_CATEGORIES`

### Alternatives (`alternatives`)

- Base fields + optional `alternativeTo`
- `category` from `ALTERNATIVES_CATEGORIES`

### Blog (`blog`)

- `title`, `publishedDate`, `description`, `author`, `tags`
- Optional: `image`

## Adding a new category

1. Add it to the correct array in `src/data/categories.ts`
2. Use the exact same string in frontmatter
3. Run `npm run content:check` and `npm run check`

Do not invent free-form category strings.

## Writing style

- Keep description natural and specific.
- Mention what the tool is best for.
- Use clear feature bullets.
- For `sh`, include a Full Setup Guide section with BitDoze tutorial link.

## URL and asset guidance

- `checkItUrl` must be a valid `http(s)` URL (official site/repo).
- Image paths start with `/images/...` and must exist under `public/`.
- Prefer PNG/WebP; keep names `{slug}-logo.*` and `{slug}-ui.*`.
- Keep UI screenshots reasonably sized. Run `npm run images:optimize` after adding large rasters.

## Search, filters, and SEO pages

- Homepage Fuse search supports keyboard navigation (arrows/enter/esc).
- Section pages filter by `q`, `category`, `alternativeTo`, pricing.
- Homepage category chips deep-link to section filters.
- Tools with `alternativeTo` automatically contribute to `/alternatives/to/{slug}/`.
- Detail pages show same-alternative related tools first, then same-category tools.
- OG image for tool pages is generated at `/og/{collection}/{id}.svg`.

## Scripts and verification

```bash
npm run content:check          # frontmatter, assets, categories, URL format, sh guide warnings
npm run content:check:remote   # also HEAD/GET checkItUrl (optional, network)
npm run images:optimize        # compress oversized public/images rasters
npm run check                  # astro check
npm run build                  # production build
npm run ci                     # content:check + check + build
```

CI (`.github/workflows/ci.yml`) runs the same gate on PRs and `main`.

Checklist for every content PR:

1. Slug/content file exists in the right collection
2. Logo/UI assets exist and are non-empty
3. Category is from the taxonomy
4. `checkItUrl` is a valid URL
5. For `sh`, Full Setup Guide + bitdoze link present when possible
6. `npm run ci` passes

## Code conventions for agents

- Reuse `src/lib/content.ts` helpers; do not re-query collections ad hoc in many files.
- Use `ToolImage` for logos/UI previews.
- Keep catalog pages static (no SSR list pages).
- Theme/nav/search scripts rebind on `astro:page-load` (View Transitions).
- Keep Plausible only (no Litlyx). Analytics loads after interaction/idle.
- When adding categories or required fields, update both schema and `scripts/content-check.mjs` expectations.

## Optional future improvements

- Move hot images into `src/assets` and use `astro:assets` transforms where formats allow
- Promote Full Setup Guide checks from warnings to hard errors after content cleanup
- Auto-generate category taxonomy from content in a strict mode for drift reports only
