# ToolHunt Content Agent Notes

This file documents how to add and maintain content entries so future updates stay consistent.

## Collections and Paths

- Self-hosted tools content: `src/content/sh/*.md`
- Self-hosted tool assets: `public/images/sh/*`

## Required Frontmatter for `sh` entries

Every file in `src/content/sh` must include:

- `title`
- `publishedDate`
- `logo` (absolute path from `/public`, example: `/images/sh/mytool-logo.png`)
- `uiImage` (absolute path from `/public`, example: `/images/sh/mytool-ui.png`)
- `description`
- `keyFeatures` (array)
- `category`
- `alternativeTo`
- `checkItUrl`

Optional:

- `youtubeId`

## What each new self-hosted tool should have

1. Content file in `src/content/sh/{slug}.md`
2. Logo image in `public/images/sh/{slug}-logo.png`
3. UI image in `public/images/sh/{slug}-ui.png`
4. A "Full Setup Guide" section in the markdown body linking to the BitDoze article for that tool.

## Writing style guidance

- Keep description natural and specific, not generic.
- Mention what the tool is best for.
- Use clear, concrete feature bullets.
- Include one short intro paragraph and one "Full Setup Guide" section.

## URL guidance

- `checkItUrl` should point to the tool official site/repo.
- BitDoze tutorial links belong in the body under `## Full Setup Guide`.

## Asset guidance

- Prefer PNG or WebP.
- Keep predictable naming: `{slug}-logo.png`, `{slug}-ui.png`.
- Ensure assets are non-empty and render correctly before commit.

## Verification checklist

Run after changes:

1. `npm run build`
2. Confirm each new slug appears in `src/content/sh`
3. Confirm logo/UI files exist in `public/images/sh`
4. Open one or more tool pages and verify image rendering + guide link
