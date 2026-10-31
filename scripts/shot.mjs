// scripts/shot.mjs
// Full-page automated visual screenshot utility using Playwright

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('screenshots');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const PORT = process.env.PORT || 3001;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'test', path: '/test' },
  { name: 'result', path: '/result' },
  { name: 'path', path: '/path' },
  { name: 'lesson', path: '/lesson/meet-the-moon' },
  { name: 'check', path: '/check/level-1' },
  { name: 'profile', path: '/profile' },
  { name: 'tutor', path: '/tutor' },
];

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '390', width: 390, height: 844 },
];

async function main() {
  const filter = process.argv[2]; // optional filter like 'home', 'test', etc.
  const targetRoutes = filter
    ? ROUTES.filter((r) => r.name.includes(filter) || r.path.includes(filter))
    : ROUTES;

  console.log(`🚀 Starting screenshot run on ${BASE_URL}...`);
  console.log(`Routes to capture: ${targetRoutes.map((r) => r.name).join(', ')}`);

  const browser = await chromium.launch({
    headless: true,
  });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2, // High-DPI crisp capture
    });
    const page = await context.newPage();

    for (const route of targetRoutes) {
      const fullUrl = `${BASE_URL}${route.path}`;
      const filename = `${route.name}-${vp.name}.png`;
      const outPath = path.join(OUT_DIR, filename);

      try {
        console.log(`📸 Capturing ${route.name} at ${vp.width}px -> ${filename}`);
        await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 15000 });
        // Small pause for animations / images to settle
        await page.waitForTimeout(600);

        await page.screenshot({
          path: outPath,
          fullPage: true,
        });
        console.log(`   Saved: ${outPath}`);
      } catch (err) {
        console.error(`   ❌ Failed to capture ${route.name} at ${vp.width}px:`, err.message);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('✨ All screenshots captured into /screenshots');
}

main().catch((err) => {
  console.error('Fatal error running shot.mjs:', err);
  process.exit(1);
});

