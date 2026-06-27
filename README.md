# inaki.to • terminal portfolio

Interactive professional site for [Iñaki Aranzadi](https://inaki.to) — a SvelteKit terminal with résumé, projects, contact form, and arcade games. Deployed on **Cloudflare Pages** (not GitHub Pages).

## Stack

- SvelteKit 2 + Svelte 5 (runes)
- TypeScript, Tailwind CSS v4
- Cloudflare Pages adapter (`@sveltejs/adapter-cloudflare`)
- Contact form via Resend API (`/api/contact`)
- Client résumé export (`/resume`)

## Local development

```bash
npm install
cp .env.example .env   # add RESEND_API_KEY for /contact
npm run dev
```

Try `/help`, `/whoami`, `/resume`, `/github`, `/contact`, `/game`.

## Build

```bash
npm run build
npm run preview        # Cloudflare Pages local preview
```

## Publish to inaki.to

This project **replaces** the old static site at `inaki/inaki.github.io`. The custom domain `inaki.to` must point to **Cloudflare Pages**, not GitHub Pages (SvelteKit needs Workers for SSR + the contact API).

### 1. Push source to GitHub

Recommended: use this repo as the new contents of `inaki/inaki.github.io` (source code, not a built `dist/`).

```bash
git remote add origin git@github.com:inaki/inaki.github.io.git
git branch -M main
git push -u origin main
```

Or use a new repo `inaki/inakito` and connect that in Cloudflare instead.

### 2. Cloudflare Pages project

In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create**:

| Setting | Value |
|---------|-------|
| Project name | `inakito` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `.svelte-kit/cloudflare` |
| Node version | `22` |

**Environment variables** (Production):

| Variable | Example |
|----------|---------|
| `RESEND_API_KEY` | `re_…` (secret) |
| `CONTACT_TO_EMAIL` | `hello@inakito.com` |
| `CONTACT_FROM_EMAIL` | `contact@inaki.to` (after Resend domain verify) |

Or set secrets via CLI:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name=inakito
```

### 3. Custom domain `inaki.to`

1. In the Pages project → **Custom domains** → add `inaki.to` and `www.inaki.to`
2. If `inaki.to` DNS is already on Cloudflare, records are added automatically
3. **Remove** the old GitHub Pages setup:
   - Delete `CNAME` file / disable GitHub Pages on `inaki.github.io`
   - Remove `inaki.to` → `inaki.github.io` DNS if it still exists

### 4. GitHub Actions deploy (optional)

Workflow: `.github/workflows/deploy.yml`

Add repository secrets:

- `CLOUDFLARE_API_TOKEN` — Pages Edit permission
- `CLOUDFLARE_ACCOUNT_ID`

Pushes to `main` deploy automatically.

### 5. Email (Resend)

1. Add domain `inaki.to` in [Resend](https://resend.com) and verify DNS (SPF/DKIM)
2. Set `CONTACT_FROM_EMAIL` to a verified address on that domain
3. Until verified, dev can use `onboarding@resend.dev` (delivers only to your Resend account email)

### 6. Post-launch checklist

- [ ] `https://inaki.to` loads the terminal
- [ ] `https://inaki.to/resume` exports PDF
- [ ] `/contact` sends email in production
- [ ] Google Search Console still verifies (`/googled3bec9530c674470.html` copied from old site)
- [ ] Old `inaki.github.io` GitHub Pages disabled or repo archived
- [ ] LinkedIn / GitHub profile links point to `https://inaki.to`

## Project structure

```
src/
├── lib/
│   ├── content.ts          # résumé, projects, commands copy
│   ├── site.ts             # inaki.to URL + SEO
│   └── components/         # TerminalShell, ResumeDocument, games…
├── routes/
│   ├── +page.svelte        # main terminal UI
│   ├── resume/             # print/PDF résumé page
│   └── api/contact/        # Resend handler
static/                     # favicon, google verification
wrangler.jsonc              # Cloudflare Pages config
```

---

Built by Iñaki — 2026.