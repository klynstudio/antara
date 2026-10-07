/*
  The motion system.

  One requestAnimationFrame loop, driven by Lenis, does everything that is tied
  to scroll position — parallax, the pinned project track, the hero drift, the
  marquee. Everything that only needs to happen once (text rising, images
  opening) is an IntersectionObserver adding `.in`, with CSS doing the work.

  Under prefers-reduced-motion none of this runs: every element is marked `.in`
  immediately and the project track falls back to a native horizontal scroller.
*/
import Lenis from 'lenis';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const vh = () => window.innerHeight;
const vw = () => window.innerWidth;

/* ---- Split text into masked lines -------------------------- */
/*
  Words are measured where the browser actually breaks them, then regrouped
  into one masked span per line. Re-run when the width changes, because a line
  break at 1440px is not a line break at 900px.
*/
function split(el: HTMLElement) {
  const text = el.dataset.text ?? el.textContent!.trim().replace(/\s+/g, ' ');
  el.dataset.text = text;
  el.setAttribute('aria-label', text);

  el.innerHTML = text
    .split(' ')
    .map((w) => `<span class="w" aria-hidden="true">${w}</span>`)
    .join(' ');

  const lines: string[][] = [];
  let top: number | null = null;
  el.querySelectorAll<HTMLElement>('.w').forEach((w) => {
    if (w.offsetTop !== top) {
      lines.push([]);
      top = w.offsetTop;
    }
    lines[lines.length - 1].push(w.textContent!);
  });

  el.innerHTML = lines
    .map(
      (l, i) =>
        `<span class="ln" aria-hidden="true"><span style="--i:${i}">${l.join(' ')}</span></span>`
    )
    .join('');
  el.classList.add('is-split');
}

const splits = [...document.querySelectorAll<HTMLElement>('[data-split]')];

/* ---- Reduced motion: show everything, stop here ------------ */
if (reduce) {
  root.classList.add('is-loaded');
  document.getElementById('loader')?.remove();
  document.querySelectorAll('[data-reveal], [data-fig], [data-split], [data-hero]').forEach((el) =>
    el.classList.add('in')
  );
  document.querySelectorAll('[data-hscroll]').forEach((el) => el.classList.add('hs--native'));
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => (el.textContent = el.dataset.count!));
} else {
  run();
}

function run() {
  const fontsReady = document.fonts.ready.then(() => splits.forEach(split));

  let lastWidth = vw();
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (vw() !== lastWidth) {
        lastWidth = vw();
        splits.forEach(split);
      }
      measureTracks();
    }, 150);
  });

  /* ---- Smooth scroll ---------------------------------------- */
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 });
    });
  });

  /* ---- One-shot reveals ------------------------------------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
        const count = (e.target as HTMLElement).querySelector<HTMLElement>('[data-count]');
        if (count) countUp(count);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
  );

  document
    .querySelectorAll('[data-reveal], [data-fig], [data-split]:not([data-hero] *), .item, .stat')
    .forEach((el) => io.observe(el));

  /* ---- Count up --------------------------------------------- */
  function countUp(el: HTMLElement) {
    const to = Number(el.dataset.count);
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = clamp((t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = String(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---- Parallax --------------------------------------------- */
  /*
    Only frames currently on screen are measured each frame. The image is held
    16% taller than its frame (see .fig-in) and drifts through that margin.
  */
  const visible = new Set<HTMLElement>();
  const pio = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        e.isIntersecting ? visible.add(el) : visible.delete(el);
      }),
    { rootMargin: '10% 0px' }
  );
  document
    .querySelectorAll<HTMLElement>('[data-parallax]:not(.hero .fig)')
    .forEach((el) => pio.observe(el));

  function parallax() {
    const h = vh();
    visible.forEach((fig) => {
      const r = fig.getBoundingClientRect();
      const p = clamp((r.top + r.height) / (h + r.height)) - 0.5; // -0.5 … 0.5
      const inner = fig.firstElementChild as HTMLElement | null;
      if (inner) inner.style.transform = `translate3d(0, ${(p * 14).toFixed(2)}%, 0)`;
    });
  }

  /* ---- Hero: intro, drift, slideshow ------------------------ */
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const heroMedia = hero?.querySelector<HTMLElement>('.hero-media');
  const heroCopy = hero?.querySelector<HTMLElement>('.hero-copy');

  intro();
  if (hero) slideshow(hero);

  /*
    The opening. Waits for the typeface and the first frame (or video) — never
    longer than ~3s — while a counter runs on paper, then lifts the paper away
    with the hero already settling underneath, and brings the headline, meta and
    nav in on one timeline. Later pages in the visit skip straight to the hero.
  */
  function intro() {
    const loader = document.getElementById('loader');
    const nEl = document.getElementById('loader-n');
    const barEl = document.getElementById('loader-bar');
    const skip = root.classList.contains('no-loader') || !loader;

    const media = hero?.querySelector<HTMLImageElement | HTMLVideoElement>('video, img');
    const mediaReady = new Promise<void>((res) => {
      if (!media) return res();
      if (media instanceof HTMLVideoElement) {
        if (media.readyState >= 3) return res();
        media.addEventListener('canplay', () => res(), { once: true });
      } else {
        if (media.complete) return media.decode().then(res, res);
        media.addEventListener('load', () => media.decode().then(res, res), { once: true });
        media.addEventListener('error', () => res(), { once: true });
      }
    });

    let target = 0.15;
    let shown = 0;
    let done = false;
    fontsReady.then(() => (target = Math.max(target, 0.55)));
    mediaReady.then(() => (target = Math.max(target, 0.9)));

    const ready = Promise.race([
      Promise.all([fontsReady, mediaReady]),
      new Promise((r) => setTimeout(r, 3200)),
    ]);
    const minimum = new Promise((r) => setTimeout(r, skip ? 0 : 1100));

    /* The counter eases toward real progress rather than faking a fixed run */
    if (!skip) {
      lenis.scrollTo(0, { immediate: true, force: true });
      const tick = () => {
        shown += ((done ? 1 : target) - shown) * 0.08;
        if (nEl) nEl.textContent = String(Math.round(shown * 100)).padStart(2, '0');
        if (barEl) barEl.style.transform = `scaleX(${shown.toFixed(3)})`;
        if (shown < 0.995) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    Promise.all([ready, minimum]).then(() => {
      done = true;
      setTimeout(
        () => {
          try {
            sessionStorage.setItem('antara-seen', '1');
          } catch {}
          root.classList.add('is-loaded');
          hero?.classList.add('in');
          if (loader) setTimeout(() => loader.remove(), 1600);
        },
        skip ? 0 : 420
      );
    });
  }

  function heroDrift(y: number) {
    if (!hero || !heroMedia || !heroCopy) return;
    const h = hero.offsetHeight;
    if (y > h) return;
    const p = y / h;
    heroMedia.style.transform = `translate3d(0, ${(p * 32).toFixed(2)}%, 0)`;
    heroCopy.style.transform = `translate3d(0, ${(p * -14).toFixed(2)}vh, 0)`;
    heroCopy.style.opacity = String(clamp(1 - p * 1.6));
  }

  function slideshow(hero: HTMLElement) {
    const slides = [...hero.querySelectorAll<HTMLElement>('.hero-slide')];
    if (slides.length < 2) return;

    const n = hero.querySelector<HTMLElement>('[data-slide-n]');
    const cap = hero.querySelector<HTMLAnchorElement>('[data-slide-cap]');
    const bar = hero.querySelector<HTMLElement>('.hero-bar');
    const DELAY = 3800;
    hero.style.setProperty('--slide', `${DELAY}ms`);
    let i = 0;
    let timer = 0;
    let onScreen = true;

    const show = (next: number) => {
      slides[i].classList.remove('is-on');
      slides[i].classList.add('is-off');
      const prev = slides[i];
      setTimeout(() => prev.classList.remove('is-off'), 1200);

      i = next;
      slides[i].classList.add('is-on');

      if (n) n.textContent = String(i + 1).padStart(2, '0');
      if (cap) {
        cap.classList.add('is-swap');
        setTimeout(() => {
          cap.textContent = slides[i].dataset.caption ?? '';
          cap.href = slides[i].dataset.href ?? '#';
          cap.classList.remove('is-swap');
        }, 380);
      }
      if (bar) {
        bar.classList.remove('is-run');
        void bar.offsetWidth; // restart the fill
        bar.classList.add('is-run');
      }
      schedule();
    };

    const schedule = () => {
      clearTimeout(timer);
      if (onScreen && !document.hidden) timer = window.setTimeout(() => show((i + 1) % slides.length), DELAY);
    };

    /* No point turning pages nobody can see */
    new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      hero.classList.toggle('is-paused', !onScreen);
      schedule();
    }).observe(hero);
    document.addEventListener('visibilitychange', schedule);

    bar?.classList.add('is-run');
    schedule();
  }

  /* ---- Pinned horizontal track ------------------------------ */
  /*
    The section is made as tall as the track is wide; a sticky child holds the
    viewport while vertical scroll is translated into horizontal travel. Below
    900px that is more fight than it is worth, so it becomes a plain swipe.
  */
  type Track = {
    sec: HTMLElement;
    track: HTMLElement;
    bar: HTMLElement | null;
    n: HTMLElement | null;
    cards: HTMLElement[];
    travel: number;
    native: boolean;
  };

  const tracks: Track[] = [...document.querySelectorAll<HTMLElement>('[data-hscroll]')].map((sec) => ({
    sec,
    track: sec.querySelector<HTMLElement>('.hs-track')!,
    bar: sec.querySelector<HTMLElement>('.hs-bar span'),
    n: sec.querySelector<HTMLElement>('[data-hs-n]'),
    cards: [...sec.querySelectorAll<HTMLElement>('.hs-card')],
    travel: 0,
    native: false,
  }));

  function measureTracks() {
    tracks.forEach((t) => {
      t.native = vw() < 900;
      t.sec.classList.toggle('hs--native', t.native);
      if (t.native) {
        t.sec.style.height = '';
        t.track.style.transform = '';
        return;
      }
      t.travel = Math.max(0, t.track.scrollWidth - vw());
      t.sec.style.height = `${t.travel + vh()}px`;
    });
  }
  measureTracks();
  window.addEventListener('load', measureTracks);

  function hscroll() {
    tracks.forEach((t) => {
      if (t.native) return;
      const r = t.sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh()) return;
      const p = clamp(-r.top / (r.height - vh()));
      const x = p * t.travel;
      t.track.style.transform = `translate3d(${-x}px, 0, 0)`;
      if (t.bar) t.bar.style.transform = `scaleX(${p})`;
      if (t.n) t.n.textContent = String(Math.round(p * (t.cards.length - 1)) + 1).padStart(2, '0');

      /* Each photograph slides a little against its frame as it crosses */
      const w = vw();
      t.cards.forEach((c) => {
        const cx = c.offsetLeft - x + c.offsetWidth / 2;
        const d = clamp(cx / w, -0.5, 1.5) - 0.5;
        const inner = c.querySelector<HTMLElement>('.fig-in');
        if (inner) inner.style.transform = `translate3d(${(d * -10).toFixed(2)}%, 0, 0)`;
      });
    });
  }

  /* ---- Marquee ---------------------------------------------- */
  /*
    Drifts on its own and is pushed along by scroll speed, in whichever
    direction you are scrolling — then eases back to its resting pace.
  */
  const marquees = [...document.querySelectorAll<HTMLElement>('[data-marquee]')].map((el) => ({
    el,
    track: el.querySelector<HTMLElement>('.mq-track')!,
    x: 0,
    dir: 1,
    on: true,
  }));
  marquees.forEach((m) =>
    new IntersectionObserver(([e]) => (m.on = e.isIntersecting)).observe(m.el)
  );

  let velocity = 0;
  function marquee(dt: number) {
    marquees.forEach((m) => {
      if (!m.on) return;
      if (Math.abs(velocity) > 0.3) m.dir = Math.sign(velocity);
      const speed = 34 + Math.min(Math.abs(velocity) * 22, 520);
      const half = m.track.scrollWidth / 2;
      m.x -= speed * m.dir * dt;
      if (m.x <= -half) m.x += half;
      if (m.x > 0) m.x -= half;
      m.track.style.transform = `translate3d(${m.x.toFixed(2)}px, 0, 0)`;
    });
  }

  /* ---- Nav -------------------------------------------------- */
  const nav = document.getElementById('nav');
  let last = 0;
  function navState(y: number) {
    if (!nav) return;
    if (y > 120 && y > last + 4) nav.classList.add('is-up');
    else if (y < last - 4 || y < 120) nav.classList.remove('is-up');
    last = y;
  }

  /* ---- Loop ------------------------------------------------- */
  lenis.on('scroll', (l: Lenis) => {
    velocity = l.velocity;
  });

  let prev = performance.now();
  const frame = (t: number) => {
    const dt = Math.min((t - prev) / 1000, 0.05);
    prev = t;
    lenis.raf(t);
    velocity *= 0.92;

    const y = lenis.scroll;
    heroDrift(y);
    parallax();
    hscroll();
    marquee(dt);
    navState(y);

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  root.classList.add('is-ready');
}
