/*
  Which photographs actually exist.

  Shared by Figure.astro and the project template. The template uses it to drop
  slots that have not been generated yet, so a missing frame leaves no gap and
  no placeholder — the page simply shows what there is, and grows a plate the
  moment the file lands.

  Runs at build time only; nothing here reaches the browser.
*/

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'images';
const ROOT = path.join(process.cwd(), 'public', DIR);

/* Processed WebP first, then the raw drop — so the site quietly gets faster
   once the processing script has run, without any markup knowing. */
const EXTENSIONS = ['webp', 'jpg', 'png'];

const cache = new Map<string, string | null>();

export function assetFor(file: string): string | null {
  if (cache.has(file)) return cache.get(file)!;

  let found: string | null = null;
  for (const ext of EXTENSIONS) {
    const name = `${file}.${ext}`;
    try {
      if (fs.existsSync(path.join(ROOT, name))) {
        found = `/${DIR}/${name}`;
        break;
      }
    } catch {
      /* unreadable public/ — treat as missing */
    }
  }

  cache.set(file, found);
  return found;
}

export const hasAsset = (file: string): boolean => assetFor(file) !== null;
