# Teyvat — Genshin Impact landing page

A React + Vite + Tailwind single-page site with GSAP/ScrollTrigger animations.

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Media

The background clips live in `public/videos/`. Each one ships as a **720p30 VP9
WebM** with the original **1080p60 MP4 kept as a fallback** for Safari and older
iOS; `src/components/Video.jsx` renders both as `<source>` tags and the browser
picks whichever it can play.

The WebM encode uses VP9 *constrained quality* (a CRF paired with an explicit
`-b:v` ceiling). A bare CRF does not bound this footage — dense particle effects
and constant motion keep it near 5-6 Mbps even at crf 34 — so the bitrate cap is
what actually makes the files small.

To regenerate the WebM files after adding or replacing an MP4:

```bash
bash scripts/convert-videos.sh
```

The script needs `ffmpeg` on your `PATH` (or set `FFMPEG=/path/to/ffmpeg.exe`).
It skips any clip whose WebM is already newer than its MP4.

Because `<source>` children do not reload when React swaps the URL, any video
whose clip changes at runtime — the hero carousel — must be given a `key` so it
remounts. See `Hero.jsx`.

## Notes

- Clips only play while on screen (`IntersectionObserver` in `Features.jsx`), so
  the bento grid does not decode six videos at once.
- The site honours `prefers-reduced-motion`: transitions are collapsed and the
  scroll-in headings render at full opacity instead of animating.
