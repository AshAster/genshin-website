# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A single-page Genshin Impact fan landing site. React 18 + Vite 6 + Tailwind 3,
with GSAP/ScrollTrigger driving every animation. No backend, no router, no
tests, no state library — one page of sections rendered by `src/App.jsx`.

## Commands

```bash
npm run dev       # dev server on :5173
npm run build     # production build -> dist/
npm run preview   # serve the built output
npm run lint      # eslint, must stay clean
npm run deploy    # build with the Pages base, publish dist/ via gh-pages
```

There are no tests. After a change, verify with `npm run lint` **and**
`npm run build`, and load the page when the change is visual — a broken GSAP
selector or a dropped Tailwind class fails silently in both lint and build.

## Layout

```
src/
  App.jsx           section order; each section owns its own id
  config.js         env-backed config + the asset() path helper
  index.css         @font-face, Tailwind @layer utilities, keyframes
  components/
    Video.jsx       <video> with WebM source + MP4 fallback
    AnimatedTitle.jsx  splits a title string into per-word spans
    Button.jsx      renders <a> when given href, else <button>
public/
  videos/           *.mp4 sources + generated *.webm
  img/ fonts/ audio/
scripts/
  convert-videos.sh regenerates the WebM files
```

## Conventions

**Never hardcode a path to `public/`.** Go through `asset()` from
`src/config.js`. Vite rewrites asset URLs in `index.html` and in CSS `url()`,
but a `"/img/logo.png"` string inside a component is just a string — it stays
root-absolute and 404s when the site is served from a subpath, which is exactly
what the GitHub Pages deploy does.

```jsx
import { asset } from "../config";
<img src={asset("img/logo.png")} />
```

**Outbound URLs, the contact email and social links come from `src/config.js`,**
which reads `VITE_*` vars with fallbacks to the previous hardcoded literals. The
fallbacks matter: `.env` is gitignored, so a fresh clone has none.

**Section ids are the nav contract.** `navItems` in `Navbar.jsx` links to
`#hero`, `#about`, `#features`, `#story`, `#contact`. Renaming or removing a
section id silently breaks a nav link — nothing errors.

**Tailwind first.** Custom classes live in `@layer utilities` in `index.css`.
Note the theme overrides Tailwind's `blue-*` and adds `violet-300`,
`yellow-100/300`; `extend` deep-merges, so the default shades still exist.

## Things that will bite you

**GSAP selectors are global unless scoped.** `useGSAP(fn)` with no `scope`
resolves selector strings against the whole document. `About.jsx` animates
`.mask-clip-path`, and the Hero used to carry that same class — the About
scroll animation was reaching into the Hero and blowing its preview up to
`100vw`. Always pass `{ scope: containerRef }`, and prefer a class that belongs
to one section (the Hero's is `.hero-mini-frame`).

**A `<video>` with `<source>` children does not reload when the URL changes.**
Setting a new `src` on the sources is inert without a `.load()` call. The Hero
carousel swaps clips, so each `<Video>` there takes a `key` tied to the clip
name to force a remount. Drop the key and the hero stops changing.

**Every video needs `playsInline`** or iOS Safari refuses to autoplay inline.
`Video.jsx` sets it; don't hand-roll a bare `<video>`.

**Bento videos are `preload="none"` and play only while on screen** via an
IntersectionObserver in `Features.jsx`. Six autoplaying 720p streams decoding at
once is enough to stall scrolling. Keep new background video on that path.

**Respect `prefers-reduced-motion`.** `index.css` collapses animations, and
`AnimatedTitle` renders words at full opacity instead of animating them in.
Anything that animates *from* `opacity: 0` must have a reduced-motion path, or
it stays invisible for those users.

## Video pipeline

Clips ship as **720p30 VP9 WebM** with the original **1080p60 MP4 as a Safari
fallback**; `Video.jsx` emits both as `<source>` tags. Pass `src` without an
extension (`asset("videos/captain")`).

Regenerate after adding or replacing an MP4:

```bash
bash scripts/convert-videos.sh          # needs ffmpeg on PATH
FFMPEG=/path/to/ffmpeg.exe bash scripts/convert-videos.sh
```

The encode uses VP9 **constrained quality** — a CRF paired with an explicit
`-b:v` ceiling. A bare CRF does not bound this footage: dense particle effects
and constant motion keep it near 5-6 Mbps even at `-crf 34 -b:v 0`, which is how
a 77 MB source once "compressed" to 67 MB. The bitrate cap is what does the work.
Current total: ~35 MB of WebM against ~277 MB of MP4.

## Environment & deploy

`.env` is gitignored; `.env.example` is the tracked template — **keep them in
sync when adding a var.** Only `VITE_`-prefixed vars reach the client, and Vite
inlines them into the bundle, so nothing in `.env` may be secret. This site has
no secrets; don't add a var that would be one.

`VITE_BASE_PATH` sets Vite's `base`. Local dev and root-domain hosts use `/`;
the GitHub Pages project site needs `/genshin-website/`, which lives in the
tracked `.env.github` and is selected by `npm run deploy` via
`vite build --mode github`.

That is a **mode file rather than a `--base=/genshin-website/` CLI flag on
purpose.** Git Bash on Windows applies MSYS path conversion to arguments shaped
like POSIX paths and silently rewrote that flag into
`/Program Files/Git/genshin-website/`, producing a build that looked fine and
404'd everywhere. A `--mode` value is not path-shaped, so it survives.

To verify a subpath build end to end:

```bash
npx vite build --mode github
npx vite preview --port 4173     # then hit http://localhost:4173/genshin-website/
```
