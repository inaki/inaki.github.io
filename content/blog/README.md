# Blog posts

Add a Markdown file per post:

```text
YYYY-MM-DD-kebab-slug.md
```

## Frontmatter (required)

```yaml
---
title: Your title
description: One or two sentences for SEO and cards.
date: 2026-07-20
tags: design-systems, craft
draft: false
---
```

### Rules

| Field | Notes |
|-------|--------|
| `title`, `description`, `date` | Required. Date is `YYYY-MM-DD`. |
| `tags` | Optional. **Comma-separated** (not YAML arrays): `a, b, c` |
| `draft` | `true` or `false`. Omitted = published. Drafts are excluded from `/blog`, RSS, sitemap, and the terminal card. |
| `slug` | Optional override. Default = filename stem without the date prefix. |
| `updated` | Optional `YYYY-MM-DD`. |
| `ogImage` | Optional path under `static/` or absolute URL. |

Body is GitHub-flavored Markdown. Prefer images in `static/blog/` and link as `/blog/your-image.png`.

First-party content only — raw HTML in Markdown is trusted from repo collaborators.
