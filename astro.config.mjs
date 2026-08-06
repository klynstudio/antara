// @ts-check
import { defineConfig } from 'astro/config';

/*
  Static, and deliberately nothing else.

  There is no CMS, no API route and no client framework here — the whole site
  is five pages of markup, one stylesheet and about forty lines of script. That
  makes it a pure static build, which Vercel detects and deploys without an
  adapter or any configuration.
*/
export default defineConfig({
  site: 'https://antara.vercel.app',
  output: 'static',
});
