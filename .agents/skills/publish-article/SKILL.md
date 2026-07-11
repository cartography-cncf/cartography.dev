---
name: publish-article
description: Publish a blog post to the cartography.dev site. Use when the user asks to publish an article, add a blog post, or add a "re-link" post pointing to an existing external article/talk. Covers converting a drafted markdown file into the site's frontmatter schema, placing images, and choosing the slug.
---

# Publish an article to cartography.dev

This site is a Next.js blog. Every `.md` file in `content/blog/` is automatically a
post: no routing, index, or config changes are ever needed. The filename (minus
`.md`) becomes the URL slug at `/blog/<slug>`, and posts are listed newest-first by
`date`.

There are two kinds of post: a **full article** (the markdown body renders as the
post) and a **re-link post** (a short stub whose body just links out to an article
or talk hosted elsewhere). Pick the right one, then follow that section.

## How the site reads a post

Source of truth: `lib/blog.ts` and `src/app/blog/[slug]/page.tsx`.

Only these frontmatter fields are read; everything else (`lang`, `url`, `tags`,
`repo`, etc.) is silently ignored:

| Field       | Required | Notes |
|-------------|----------|-------|
| `title`     | yes      | Quoted string. |
| `date`      | yes      | **Must be a quoted string** `"YYYY-MM-DD"`. The code does `new Date(date + "T00:00:00")`; an unquoted date parses as a YAML Date object and breaks formatting/sorting. |
| `summary`   | yes      | One or two sentences. Shown on the `/blog` index and used as the meta/OpenGraph description. A post with no summary renders a blank card. |
| `author`    | yes      | Display name for the byline. |
| `authorUrl` | optional | Makes the byline a link. **Default to the author's LinkedIn** (`https://www.linkedin.com/in/<handle>/`) unless the user says otherwise. Always confirm the exact URL with the user; do not guess the handle. |

Markdown is rendered remark → rehype with `rehype-pretty-code` (theme
`github-light`) for fenced code blocks, so ` ```cypher `, ` ```yaml `, etc. get
syntax highlighting for free.

## Publishing a full article

1. **Slug / filename.** Choose a descriptive, kebab-case slug; this is the public
   URL. Do not keep working-draft names like `cartography-v1`. Create the file at
   `content/blog/<slug>.md`.

2. **Frontmatter.** Replace whatever the draft has with the schema above. Example:

   ```yaml
   ---
   title: "Full-Chain Vulnerability Management in Cartography, in 2026"
   date: "2026-07-03"
   summary: "One or two sentences describing the post for the index and social cards."
   author: "Jeremy Chapeau"
   authorUrl: "https://www.linkedin.com/in/jchapeau/"
   ---
   ```

   If `summary` or `author` is missing from the draft, ask the user (or draft a
   summary and confirm it). Confirm the `authorUrl` (LinkedIn by default).

3. **Body.** Copy the draft body verbatim below the frontmatter. Keep fenced code
   blocks with a language tag so they highlight.

4. **Images.** Relative paths like `./foo.png` will **not** resolve. Every image
   must be a file under `public/` referenced by an absolute path:
   - Put the asset at `public/images/<post-folder>/<file>.png` (one folder per
     post, e.g. `public/images/aibom/`, `public/images/lfx-daksh-blog/`).
   - Reference it as `![alt text](/images/<post-folder>/<file>.png)`.
   - If the draft references an image you were not given, ask the user for the file
     before publishing; do not invent or substitute one.

## Publishing a re-link post

Use this when the "article" actually lives on Medium, Lyft Engineering, a personal
blog, or is a conference talk, and cartography.dev should just carry a stub that
links to it. The body is two lines: an italic note about where it was originally
published, then a single link. Match the existing stubs
(`vulnerability-management-at-lyft.md`, `mapping-moving-clouds.md`,
`cartography-joins-the-cncf.md`):

```markdown
---
title: "IAM Whatever You Say IAM"
date: "2019-10-15"
summary: "Using Cartography to see who has access to what."
author: "Alex Chantavy"
authorUrl: "https://www.linkedin.com/in/alexchantavy"
---

*This post was originally published on the Lyft Engineering blog.*

[Read the full post on Medium →](https://eng.lyft.com/iam-whatever-you-say-iam-febce59d1e3b)
```

Notes:
- Adjust the italic line to the real source ("on Marco Lancini's blog", "on the
  Lyft Engineering blog", etc.). Omit it if there is no meaningful origin.
- The link text convention is `Read the full post →` (or `Read the full post on
  Medium →`). For talks, `Watch the talk →` reads fine.
- `date` should be the original publication/talk date so it sorts correctly.
- Still fill `summary`, `author`, and (LinkedIn) `authorUrl`.

## Verify before finishing

1. Run the dev server (`npm run dev`) and open:
   - `http://localhost:3000/blog` — the new post shows at the correct date position
     with title, byline, and summary.
   - `http://localhost:3000/blog/<slug>` — full body renders, images load, code
     blocks are highlighted, links work.
2. `npm run build` to confirm static generation has no errors.
3. Per the repo/user workflow: pushing a branch is fine, but **do not open a PR
   without explicit per-PR authorization**.
