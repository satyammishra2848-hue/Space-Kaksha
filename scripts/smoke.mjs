// scripts/smoke.mjs
// Playwright smoke test checking core routes for HTTP 200 and zero console errors

import { chromium } from 'playwright';

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = [
  '/',
  '/test',
  '/result',
  '/path',
  '/lesson/meet-the-moon',
  '/check/level-1',
  '/profile',
  '/tutor',
];

async function runSmokeTests() {
  console.log(`🔍 Starting Playwright smoke tests against ${BASE_URL}...\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  let totalErrors = 0;

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    const pageErrors = [];

    // Capture console errors
    const onConsole = (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore expected favicon or hydration suppressions if any
        if (!text.includes('favicon.ico')) {
          pageErrors.push(text);
        }
      }
    };

    // Capture unhandled page exceptions
    const onPageError = (err) => {
      pageErrors.push(err.message || String(err));
    };

    page.on('console', onConsole);
    page.on('pageerror', onPageError);

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      const status = response ? response.status() : 0;

      // Allow 500ms for client hydration and effects
      await page.waitForTimeout(500);

      if (status !== 200) {
        console.error(`❌ ${route} -> Returned HTTP ${status} (expected 200)`);
        totalErrors++;
      } else if (pageErrors.length > 0) {
        console.error(`❌ ${route} -> HTTP 200 but encountered ${pageErrors.length} console error(s):`);
        pageErrors.forEach((err) => console.error(`    ↳ ${err}`));
        totalErrors++;
      } else {
        console.log(`✅ ${route} -> HTTP 200 OK (0 console errors)`);
      }
    } catch (err) {
      console.error(`❌ ${route} -> Failed navigation:`, err.message);
      totalErrors++;
    } finally {
      page.off('console', onConsole);
      page.off('pageerror', onPageError);
    }
  }

  // Also verify locked lesson routing for /lesson/discover-planets
  console.log(`\n🔒 Checking locked lesson behavior for /lesson/discover-planets...`);
  try {
    const res = await page.goto(`${BASE_URL}/lesson/discover-planets`, { waitUntil: 'networkidle' });
    const isLockedVisible = await page.getByText(/Locked/i).first().isVisible();
    const hasBackLink = await page.getByRole('link', { name: /Back to My Path/i }).first().isVisible();

    if (res?.status() === 200 && isLockedVisible && hasBackLink) {
      console.log(`✅ /lesson/discover-planets -> HTTP 200 and locked state verified!`);
    } else {
      console.error(`❌ /lesson/discover-planets -> Locked screen or back link not visible.`);
      totalErrors++;
    }
  } catch (err) {
    console.error(`❌ /lesson/discover-planets check failed:`, err.message);
    totalErrors++;
  }

  await browser.close();

  console.log('\n----------------------------------------');
  if (totalErrors === 0) {
    console.log('🎉 ALL SMOKE TESTS PASSED CLEANLY (HTTP 200, ZERO CONSOLE ERRORS)!');
    process.exit(0);
  } else {
    console.error(`💥 SMOKE TESTS FAILED WITH ${totalErrors} ERROR(S).`);
    process.exit(1);
  }
}

runSmokeTests().catch((err) => {
  console.error('Fatal test runner failure:', err);
  process.exit(1);
});

