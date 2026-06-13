# inakito • terminal

A fast, retro, fully-interactive personal/professional website powered by a real xterm.js terminal emulator.

Built with the lightweight recommended stack:
- SvelteKit (runes + Svelte 5)
- TypeScript
- Tailwind CSS v4
- @xterm/xterm + @xterm/addon-fit + @xterm/addon-web-links
- @battlefieldduck/xterm-svelte wrapper
- Pure CSS CRT effects (scanlines, phosphor glow, vignette, flicker)
- Cloudflare Pages (via adapter)

## Local development

```bash
npm run dev
```

Open the terminal and try:
- `help`
- `about`
- `projects`
- `project 1`
- `skills`
- `contact`
- `theme amber`
- `clear`, arrow history, tab completion, ctrl+c, ctrl+l

## Build & deploy

```bash
npm run build          # typechecks + Cloudflare build
npm run preview        # local Cloudflare Pages preview
```

Deploy to Cloudflare Pages (free + fast):
- Connect the repo in the Cloudflare dashboard, or use Wrangler.
- The `wrangler.jsonc` and adapter are already configured.
- Run `npm run gen` after changing wrangler config.

## Project structure

```
src/
├── lib/
│   ├── components/
│   │   └── Terminal.svelte          # xterm wrapper + full shell handling
│   ├── terminal/
│   │   ├── commands.ts              # all command definitions + content
│   │   └── types.ts
│   └── ...
├── routes/
│   ├── +page.svelte                 # the CRT monitor + terminal
│   ├── +layout.svelte
│   └── layout.css                   # heavy CRT + phosphor styles
└── app.html
```

## Content

All personal content lives in `src/lib/terminal/commands.ts` (ABOUT_TEXT, PROJECTS, SKILLS, CONTACT, etc.).

**Design handout coming soon** — placeholders will be replaced with real bio, projects, links, and visual direction.

## Easter eggs & polish

- Multiple phosphor themes (`theme green|amber|cyan`)
- Clickable links (web-links addon)
- Boot sequence with ASCII art
- History + basic tab completion
- Toasts for key actions (svelte-sonner)

## Stack notes

See original planning notes for full library rationale. Kept deliberately minimal for speed and fun.

---

Created for Inaki / inakito — 2026.
