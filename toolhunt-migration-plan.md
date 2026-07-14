# ToolHunt Migration Plan: Astro 5 → 7 + Modernization

**Date:** 2026-07-14  
**Project:** toolhunt.net  
**Status:** Core migration + Phase 4/5 enhancements completed (2026-07-14)  
**Previous stack:** Astro `5.17.3`, Cloudflare adapter `12.6.12`, Tailwind CSS `4.2.1`, Content Collections (legacy v2 API)  
**Current stack:** Astro `7.0.9`, Cloudflare adapter `14.1.3`, Tailwind CSS `4.3.2`, Content Layer API (`src/content.config.ts`), static catalog + client filters/search

---

## 1. Current state snapshot

| Area | Today | Notes |
|------|--------|--------|
| Framework | Astro 5.17.3 | Latest is **7.0.9** (two major versions behind) |
| Deploy | `@astrojs/cloudflare` 12.x | Latest **14.x** (required for Astro 7) |
| Content | `src/content/config.ts` + `type: 'content'` | **Legacy** Content Collections API |
| Rendering content | `entry.render()`, `entry.slug` | Removed / legacy in Astro 6+ |
| MDX | `@astrojs/mdx` 4.x | Used for blog + alternatives |
| Markdoc | `@astrojs/markdoc` installed | **No Markdoc files found** — likely dead dependency |
| CSS | Tailwind 4 via `@tailwindcss/vite` | Already modern; minor patch upgrade only |
| Images | Plain `<img src={logo}>` from `/public` | No `astro:assets` optimization |
| SSR | Index/list pages: `prerender = false` | Filters need runtime; Cloudflare Workers |
| Search | Client-side Fuse.js | Fine for current catalog size |
| Node | Local Node 24 | Meets Astro 6+ requirement (≥ 22.12) |

### Content volume (approx.)

- Self-hosted (`sh`): ~37 entries  
- Mac apps (`mac`): ~39  
- Online tools (`tools`): ~9  
- Blog: ~5 MDX  
- Alternatives: ~2  
- Images under `public/images/`: ~191 files  

### Highest-risk code paths for the upgrade

1. **`src/content/config.ts`** — must become Content Layer (`glob` loader, `src/content.config.ts`).
2. **All `[...slug].astro` pages** — `entry.slug` + `entry.render()` → `entry.id` / `render(entry)`.
3. **`ToolCard.astro`, `ContentLayout.astro`, list pages** — any `entry.slug` URL building.
4. **`@astrojs/cloudflare` major jumps** (12 → 13/14) — adapter config, image service, Workers runtime.
5. **Astro 7 Rust compiler** — stricter HTML (unclosed tags, invalid nesting, whitespace).

---

## 2. Goals

1. Upgrade to **Astro 7** and latest official integrations safely.
2. Migrate content to the **Content Layer API** (required for Astro 6+; temporary legacy flag is not a long-term option).
3. Keep Cloudflare deploy working with no SEO regression (routes, sitemap, canonicals).
4. Adopt high-value Astro features that fit ToolHunt (assets, view transitions optional, caching).
5. Clean dead deps, harden tooling (check, lint, CI), improve performance and maintainability.

---

## 3. Recommended strategy: staged upgrades

Do **not** jump 5 → 7 in one untested commit. Use two upgrade waves with a green build after each.

```text
Phase 0  Prep + baseline
Phase 1  Content Layer migration (while still on Astro 5)
Phase 2  Astro 5 → 6 + Cloudflare adapter + Zod 4
Phase 3  Astro 6 → 7 + Sätteri / Rust compiler fixes
Phase 4  Feature enhancements (assets, perf, DX, optional product)
Phase 5  Cleanup, docs, CI, deploy verification
```

Migrating content **before** Astro 6 reduces upgrade pain: Astro 6 removes automatic legacy collections support.

---

## 4. Phase 0 — Prep and baseline

**Time estimate:** 0.5 day

1. Create branch: `chore/astro-7-migration`.
2. Record baseline:
   - `npm run build` (must pass).
   - Note build time and `dist` size.
   - Smoke-test key URLs: `/`, `/sh/`, `/sh/n8n/`, `/mac/`, `/tools/`, `/blog/`, `/alternatives/`.
3. Pin Node for the project:
   - Add `.nvmrc` / `.node-version` with `22.12.0` or `24` (local is fine; CI/Cloudflare build image must match).
4. Commit lockfile and current working tree so upgrades are easy to diff.
5. Optional: export a short list of production URLs for post-upgrade visual QA.

**Exit criteria:** clean build on mainline branch; baseline notes written.

---

## 5. Phase 1 — Content Layer API (critical path)

**Time estimate:** 0.5–1 day  
**Why first:** Required for Astro 6; unblocks the rest of the migration.

### 5.1 Move config file

| Old | New |
|-----|-----|
| `src/content/config.ts` | `src/content.config.ts` (project root of content config per Astro 5+ docs) |

Astro expects the modern file at **`src/content.config.ts`** (not under `src/content/`).

### 5.2 Rewrite collections with loaders

Replace `type: 'content'` with `glob` loaders:

```ts
// src/content.config.ts (target shape)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishedDate: z.coerce.date(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

const sh = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sh' }),
  schema: /* selfHostedSchema */,
});

// tools, alternatives, mac — same pattern

export const collections = { blog, sh, tools, alternatives, mac };
```

Notes:

- Prefer `z.coerce.date()` so YAML dates remain flexible.
- Keep schemas aligned with `AGENTS.md` required frontmatter for `sh`.
- After Zod 4 (Phase 2), import `z` from `astro/zod` (not `astro:content`).

### 5.3 Update page rendering API

**Before (legacy):**

```ts
export async function getStaticPaths() {
  const entries = await getCollection('sh');
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
const { Content } = await entry.render();
```

**After (Content Layer):**

```ts
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getCollection('sh');
  return entries.map((entry) => ({
    params: { slug: entry.id }, // id is typically the filename slug
    props: { entry },
  }));
}
const { Content } = await render(entry);
```

Files to update (at minimum):

- `src/pages/sh/[...slug].astro`
- `src/pages/mac/[...slug].astro`
- `src/pages/tools/[...slug].astro`
- `src/pages/alternatives/[...slug].astro`
- `src/pages/blog/[...slug].astro`
- `src/components/ToolCard.astro` (`entry.slug` → `entry.id`)
- `src/layouts/ContentLayout.astro` (if it links by slug)
- Any search/index JSON that embeds slugs

### 5.4 ID vs slug caveats

- With `glob`, `entry.id` is usually the path relative to the collection base (e.g. `n8n` or nested paths).
- If any content lives in subfolders, confirm URL structure still matches SEO expectations.
- For `[...slug]` catch-all routes, `params.slug` may need `entry.id` as a string path; verify nested entries if any appear later.

### 5.5 Temporary escape hatch (only if blocked)

Astro 6 allows:

```js
legacy: { collectionsBackwardsCompat: true }
```

Use only as a short bridge. Do not ship this long-term.

**Exit criteria:** Content Layer live on Astro 5; all detail pages render; search links work; `npm run build` green.

---

## 6. Phase 2 — Upgrade to Astro 6

**Time estimate:** 0.5–1 day  
**Docs:** [Upgrade to Astro v6](https://docs.astro.build/en/guides/upgrade-to/v6/)

### 6.1 Dependency upgrade

```bash
npx @astrojs/upgrade
# or manually align majors for astro, @astrojs/cloudflare, @astrojs/mdx, @astrojs/sitemap, @astrojs/markdoc
```

Expected major moves from current package.json:

| Package | Current | Target (with Astro 6 wave) |
|---------|---------|----------------------------|
| `astro` | 5.17.x | 6.x latest |
| `@astrojs/cloudflare` | 12.x | 13.x (per Cloudflare + Astro 6 guide) |
| `@astrojs/mdx` | 4.x | 6.x matching Astro 6 |
| `@astrojs/sitemap` | 3.7.0 | latest patch/minor |
| `tailwindcss` / `@tailwindcss/vite` | 4.2.1 | 4.3.x |
| `fuse.js` | 7.1.0 | 7.5.x |

### 6.2 Breaking changes that affect ToolHunt

1. **Node ≥ 22.12** — already OK locally; confirm Cloudflare build image / CI.
2. **Vite 7** — Tailwind Vite plugin should work; retest dark mode + `@theme`.
3. **Zod 4** — update content schemas:
   - Prefer `import { z } from 'astro/zod'`.
   - Stop importing `z` from `astro:content`.
   - Review deprecated `z.string().email()` / `.url()` if added later.
4. **Cloudflare adapter** — follow [Cloudflare adapter upgrade notes](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) (v13 + Astro 6). Expect config/API changes around Workers, image service, and platform proxy.
5. **`getStaticPaths` params** — must be strings (already are if using slugs/ids).
6. Deprecations to avoid introducing:
   - `Astro` inside `getStaticPaths`
   - `z` from `astro:content`

### 6.3 Markdoc decision

`@astrojs/markdoc` is installed but unused. **Recommendation:** remove it in this phase unless you plan Markdoc content soon. Fewer integrations = faster builds and less upgrade surface.

### 6.4 Verification

```bash
rm -rf dist .astro
npm run build
npm run preview   # or wrangler pages/workers preview if you use that today
```

**Exit criteria:** Astro 6 build + preview OK on Cloudflare adapter; content pages and SSR list pages work.

---

## 7. Phase 3 — Upgrade to Astro 7

**Time estimate:** 0.5–1 day  
**Docs:** [Upgrade to Astro v7](https://docs.astro.build/en/guides/upgrade-to/v7/) · [Astro 7 blog](https://astro.build/blog/astro-7/)

### 7.1 Dependency upgrade

```bash
npx @astrojs/upgrade
```

Align to latest:

- `astro@^7`
- `@astrojs/cloudflare@^14` (current latest line per npm outdated)
- `@astrojs/mdx@^7`
- sitemap / tailwind patches as needed

### 7.2 Astro 7 features you get “for free”

| Feature | Impact on ToolHunt |
|---------|-------------------|
| **Rust `.astro` compiler** | Faster builds; stricter HTML |
| **Sätteri Markdown/MDX (default)** | Faster content builds for ~90 MD/MDX files |
| **Queued rendering (default)** | Faster HTML generation |
| **Vite 8 + Rolldown** | Faster bundling |
| **Route caching (stable)** | Useful if you keep SSR list pages |
| **`astro dev --background` + agent JSON logs** | Better AI-assisted content work |

### 7.3 Breaking / behavior changes to handle

1. **Stricter templates**
   - Fix unclosed tags and invalid nesting (`div` inside `p`, etc.).
   - Run build and fix compiler errors first; then visual QA.

2. **Whitespace (`compressHTML: 'jsx'` default)**
   - Spaces between inline elements may disappear.
   - If badges/nav look glued together, use explicit `{' '}` or set temporarily:
     ```js
     compressHTML: true // old HTML-aware behavior
     ```

3. **Markdown processor = Sätteri**
   - You are not using custom remark/rehype plugins today → **stay on default Sätteri**.
   - Only install `@astrojs/markdown-remark` + `processor: unified()` if a plugin is required later.

4. **Reserved `src/fetch.ts`**
   - ToolHunt has no `src/fetch.ts` today — no action.
   - Do not add a random `src/fetch.ts` for utilities; use another name or set `fetchFile`.

5. **Cloudflare adapter 14**
   - Re-read adapter changelog; retest SSR (`prerender = false`) pages and static detail pages.
   - Confirm image/static asset paths still resolve on Workers/Pages.

### 7.4 Optional Astro 7 product features (pick later)

- **Route caching** for SSR catalog pages (filters/search indexes):
  ```js
  import cloudflare from '@astrojs/cloudflare';
  // experimental CDN provider may be:
  // import { cacheCloudflare } from '@astrojs/cloudflare/cache';
  ```
  Good fit for `/`, `/sh/`, `/mac/` if they stay SSR.
- **Advanced Routing (`src/fetch.ts`)** — only if you need custom middleware order, auth, or edge API composition. Not required for a content catalog.

**Exit criteria:** Astro 7 green build; visual QA on list + detail + dark mode; deploy preview OK.

---

## 8. Phase 4 — Enhancements (recommended beyond “just upgrade”)

Prioritized for ToolHunt specifically. Implement after majors are stable.

### 8.1 High value / medium effort

#### A. Image pipeline with `astro:assets`

Today logos/UI screenshots are plain public URLs → no resize, no modern formats, no width/height discipline.

Plan:

1. Prefer moving tool images into `src/assets/images/sh|mac|tools|...` **or** keep public paths but wrap with a small component that sets dimensions + `loading="lazy"`.
2. For content-layer schemas, consider `image()` schema helper where images live in the repo.
3. Add a shared `<ToolImage />` component used by `ToolCard` and `ContentLayout`.
4. On Cloudflare, enable the adapter’s image service (or use Astro’s default where compatible).

**SEO/perf win:** LCP on catalog grids, correct aspect ratios, fewer layout shifts.

#### B. Prebuild search index instead of shipping full collections to the client

`SearchBar` + Fuse currently imply shipping a large JSON of tools. With ~90 tools this is OK, but will degrade as you add self-hosted entries.

Plan:

1. Build-time script or endpoint that emits a slim index: `{ title, description, category, url, collection }[]`.
2. Lazy-load Fuse + index on first focus of the search box.
3. Keep SSR/filter pages for category UX; search can stay client-side.

#### C. Type-safe content helpers

Add `src/lib/content.ts`:

- `getAllTools()`, `getToolsByCategory()`, `getRelatedTools(entry)`
- Centralize shuffle/related logic currently inlined in `ContentLayout`
- Unit-test pure helpers (optional Vitest)

#### D. Scripts and quality gates

```json
{
  "scripts": {
    "dev": "astro dev --host",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "astro check"
  }
}
```

Add `astro check` to CI. Optionally add Biome or ESLint flat config for `.astro` + TS.

#### E. Replace starter README

Root `README.md` is still the Astro minimal starter. Rewrite for ToolHunt: structure, content workflow (`AGENTS.md`), deploy, scripts.

### 8.2 Medium value / lower effort

| Enhancement | Why |
|-------------|-----|
| **View Transitions (`ClientRouter`)** | Snappier multi-page catalog feel; re-run theme + analytics carefully on `astro:page-load` |
| **JSON-LD components per type** | SoftwareApplication / BlogPosting schemas beyond generic WebSite |
| **Canonical trailing-slash policy** | Lock one style in `astro.config` + Cloudflare redirects |
| **OG image defaults per collection** | Better social previews for sh/mac/tools |
| **Remove dead Markdoc** | Smaller install, simpler upgrades |
| **Pin engines in package.json** | `"engines": { "node": ">=22.12.0" }` |
| **`.env.example`** | If any public site URL overrides appear later |

### 8.3 Product / architecture enhancements (optional roadmap)

These are not required for the framework upgrade but fit ToolHunt growth:

1. **Content authoring DX**
   - Validate frontmatter with a small `npm run content:check` that fails on missing logo/uiImage files (enforce `AGENTS.md` checklist in CI).
   - Optional: generate entry scaffold script (`npm run new:sh -- slug`).

2. **SSR vs SSG rebalance**
   - Today list pages are SSR (`prerender = false`) likely for filters.
   - Alternative: fully static pages + client-side filtering only (simpler Cloudflare static deploy, cheaper, faster TTFB).
   - Or keep SSR and add **route caching** (Astro 7) so edge serves warm HTML.

3. **Pagination / virtualized grids**
   - Once self-hosted catalog grows past ~100–150 cards, paginate or virtualize.

4. **Tag/category taxonomy file**
   - Single source of truth for categories (avoid free-string drift in frontmatter).

5. **i18n** only if you plan non-English content; otherwise skip.

6. **Analytics hygiene**
   - BaseLayout loads Plausible + Litlyx. Confirm both are still wanted; load after consent if you expand EU traffic.

7. **Security headers**
   - Cloudflare `_headers` or adapter headers: CSP (Astro 6+ has CSP helpers), `Referrer-Policy`, `X-Content-Type-Options`.

8. **Sitemap enhancements**
   - Ensure all collections included; set `lastmod` from `publishedDate` where useful.

### 8.4 Nice-to-have Astro 7-only ideas

- Background `astro dev` for agent-driven content batching.
- Structured JSON logs in production Workers for easier debugging.
- Experimental `cacheCloudflare()` if list pages remain dynamic.

---

## 9. Phase 5 — Cleanup, verification, deploy

### 9.1 Cleanup checklist

- [ ] Delete unused `@astrojs/markdoc` (if confirmed unused)
- [ ] Remove `src/content/config.ts` after `src/content.config.ts` is live
- [ ] Remove temporary `legacy.collectionsBackwardsCompat` if used
- [ ] Update `AGENTS.md` with Content Layer notes + any new scaffold scripts
- [ ] Update README for real project ops
- [ ] Align package versions; commit lockfile

### 9.2 Verification matrix

| Check | Command / action |
|-------|------------------|
| Types | `npx astro check` |
| Build | `npm run build` |
| Preview | `npm run preview` or Cloudflare preview |
| Home + filters | SSR pages still filter correctly |
| Detail pages | One entry per collection renders MD body + images |
| Search | Fuse results link to correct URLs |
| Theme | Dark/light flash-free (inline script still first) |
| Sitemap | `/sitemap-index.xml` lists new routes |
| SEO | Canonical, OG tags on sample pages |
| Mobile | Nav + search + cards |
| Deploy | Production or preview on Cloudflare |

### 9.3 Rollback plan

1. Keep `main` deployable until preview is green.
2. Prefer one PR per phase (Content Layer → Astro 6 → Astro 7 → enhancements).
3. If Cloudflare adapter breaks production, pin last known good adapter + Astro pair on a hotfix branch.

---

## 10. Suggested PR breakdown

| PR | Title | Scope |
|----|-------|--------|
| 1 | `refactor: migrate to Content Layer API` | config move, loaders, `render()`, slug→id |
| 2 | `chore: upgrade to Astro 6 + Cloudflare 13` | deps, Zod 4 imports, adapter fixes |
| 3 | `chore: upgrade to Astro 7 + Cloudflare 14` | deps, HTML/whitespace fixes, Sätteri default |
| 4 | `feat: image component + search index slim-down` | assets, perf |
| 5 | `chore: tooling, README, content validation` | check script, CI, docs |

---

## 11. Effort estimate

| Phase | Effort | Risk |
|-------|--------|------|
| 0 Prep | 0.5 d | Low |
| 1 Content Layer | 0.5–1 d | Medium (URL/id regressions) |
| 2 Astro 6 | 0.5–1 d | Medium (Cloudflare adapter) |
| 3 Astro 7 | 0.5–1 d | Medium (compiler strictness, whitespace) |
| 4 Enhancements | 1–3 d | Low–medium (scoped by choice) |
| 5 Cleanup/deploy | 0.5 d | Low |

**Core upgrade (0–3 + 5):** ~3–5 focused days  
**With enhancements (images, search, validation):** ~1–1.5 weeks calendar time

---

## 12. Explicit non-goals (for this migration)

- Rewriting the entire UI/design system  
- Moving off Cloudflare  
- Introducing a full CMS (unless you later want live content collections)  
- Forced SPA conversion (Astro multi-page is correct for SEO catalog sites)

---

## 13. Decision log (fill in as you execute)

| Decision | Choice | Date |
|----------|--------|------|
| Keep Markdoc? | Removed (unused) | 2026-07-14 |
| List pages SSR vs static + client filter? | Fully static + client filters/search | 2026-07-14 |
| Move images into `src/assets`? | Keep `/public` paths + `ToolImage` wrapper for now | 2026-07-14 |
| Enable View Transitions? | Yes (`ClientRouter`) | 2026-07-14 |
| Enable Cloudflare route cache provider? | Not needed (static output) | 2026-07-14 |
| Target Node version in CI | `>=22.12.0` (`.nvmrc` 22.12.0) | 2026-07-14 |

---

## 14. Quick-start commands (when ready to implement)

```bash
# 0) baseline
npm run build

# 1) after Content Layer rewrite
rm -rf .astro dist && npm run build

# 2) Astro 6
npx @astrojs/upgrade
# fix Zod imports, adapter, rebuild

# 3) Astro 7
npx @astrojs/upgrade
# fix compiler/whitespace issues, rebuild

# always
npx astro check
npm run build
```

---

## 15. Summary

ToolHunt is a content-heavy Astro 5 site still on the **legacy content collections API**, two majors behind current Astro. The critical path is:

1. **Content Layer migration** (`config.ts` → `content.config.ts`, loaders, `render()`, `entry.id`)  
2. **Astro 6** (Zod 4, Vite 7, Cloudflare adapter major)  
3. **Astro 7** (Rust compiler, Sätteri, Vite 8/Rolldown, optional edge caching)

Highest ROI enhancements after stability: **optimized images**, **slimmer search payload**, **`astro check` + content asset validation**, and a **SSR/static decision** for catalog index pages.

This plan is intentionally implementation-ready; execute phase-by-phase with a green build after each PR.
