// scripts/verify_tutor_ui.mjs
// Verifies UI interactions with SpaceTutorPanel on /lesson/meet-the-moon and /tutor

import { chromium } from 'playwright';

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function run() {
  console.log('🤖 --- VERIFYING TUTOR UI INTERACTIONS ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Test on /lesson/meet-the-moon
  console.log('Testing SpaceTutorPanel on /lesson/meet-the-moon...');
  await page.goto(`${BASE_URL}/lesson/meet-the-moon`, { waitUntil: 'networkidle' });

  // Click suggested chip
  const chip = page.locator('button:has-text("Why does the Moon shine?")').first();
  await chip.click();
  console.log('  Clicked suggested chip "Why does the Moon shine?"');

  // Wait for response bubble to appear
  await page.waitForSelector('text=AI SPACE TUTOR', { timeout: 8000 });
  await page.waitForTimeout(1000); // allow word-by-word reveal

  const replyText = await page.locator('p:has-text("reflection")').or(page.locator('p:has-text("light")')).first().textContent();
  console.log(`  Received answer in UI: "${replyText.slice(0, 70)}..."`);

  // Check offline badge visibility if offline
  const offlineBadge = page.locator('text=Offline answer');
  const isBadgeVisible = await offlineBadge.isVisible();
  console.log(`  Offline badge visible: ${isBadgeVisible}`);

  // Test typing input and send button
  console.log('Testing manual input typing and Send button...');
  const input = page.locator('input[placeholder*="Ask space tutor"]');
  await input.fill('How do rockets work?');
  const sendBtn = page.locator('button:has-text("Send")');
  await sendBtn.click();
  console.log('  Sent "How do rockets work?"');

  await page.waitForTimeout(1500); // allow response to reveal
  const rocketReply = await page.locator('p:has-text("reaction")').or(page.locator('p:has-text("exhaust")')).or(page.locator('p:has-text("rocket")')).first().textContent();
  console.log(`  Received answer in UI: "${rocketReply.slice(0, 70)}..."`);

  // 2. Test full /tutor page
  console.log('\nTesting /tutor page...');
  await page.goto(`${BASE_URL}/tutor`, { waitUntil: 'networkidle' });
  const tutorInput = page.locator('input[placeholder*="Ask anything about space"]');
  await tutorInput.fill('What is a black hole?');
  await page.keyboard.press('Enter');
  console.log('  Pressed Enter on /tutor for "What is a black hole?"');

  await page.waitForTimeout(1500);
  const blackHoleReply = await page.locator('p:has-text("gravity")').or(page.locator('p:has-text("escape")')).first().textContent();
  console.log(`  Received answer on /tutor: "${blackHoleReply.slice(0, 70)}..."`);

  await browser.close();
  console.log('\n✅ All Tutor UI interactive tests passed successfully!');
}

run().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});

