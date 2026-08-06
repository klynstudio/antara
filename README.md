# Antara

A concept site for a fictional architecture and interiors practice, built by
[Klyn](https://github.com/klynstudio) to show how we design and build for
architects.

**The practice is not real.** Antara does not exist, the five houses were never
built, and every photograph is generated. The site says so in its own footer,
and it ships with `noindex` — a fictional practice ranking in search results
for a real city would be misleading, whatever the disclaimer says.

## What it is

Five pages of markup, one stylesheet, and about forty lines of JavaScript.

- **No framework.** Astro, static output, no client-side library.
- **No CMS.** The five projects are one TypeScript file.
- **No motion library.** One `IntersectionObserver`: text rises, images wipe,
  the nav bar hides going down. That is the entire motion budget, and the
  restraint is the point — the references this is drawn from carry everything
  on the photography.

Roughly 8 kB of CSS and JS over the wire, plus the images.

```
src/pages/
  index.astro  work.astro  work/[slug].astro  studio.astro
  _components/   Base.astro  Figure.astro
  _data/         projects.ts  site.ts  assets.ts
  _styles/       antara.css
```

Astro ignores anything under `src/pages/` beginning with `_`, which is why the
components, data and styles can live beside the routes without becoming pages.

## The images

Generated, then processed. `SHOTS.md` holds the brief: one locked style
paragraph — 35mm, f/8, daylight only, straight verticals, a fixed material
palette, no people — with a single subject line changed per shot. That lockup is
the only thing making twenty-two separate generations look like one commission
rather than twenty-two photographers.

Drop the raw files into `raw-images/` under the filenames in `SHOTS.md`, then:

```bash
npm run images     # crop, grade, WebP → public/images/
```

The script also trims the right-hand edge of every frame, which is where the
generator burns its watermark.

Missing shots cost nothing. `_data/assets.ts` checks the disk at build time, so
a slot with no file is simply dropped — no placeholder, no gap — and appears on
its own once the file lands.

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
```

Deploys to Vercel as-is: static output, no adapter, no environment variables,
no build configuration.
