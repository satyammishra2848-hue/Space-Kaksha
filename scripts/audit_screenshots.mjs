// scripts/audit_screenshots.mjs
// Captures full-page screenshots of all redesigned sections and open modals

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.resolve('screenshots/audit');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Running visual screenshot audit on', BASE_URL);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // 1. New 2-column Lesson Page Layout
  console.log('📸 1. Capturing new spacious lesson page layout...');
  await page.goto(`${BASE_URL}/lesson/meet-the-moon`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, '1-lesson-spacious-layout.png'), fullPage: true });

  // 2. Click AI Space Tutor to open ChatGPT-style modal & type "hi"
  console.log('📸 2. Capturing AI Space Tutor ChatGPT modal with "hi" conversation...');
  const tutorBtn = page.locator('button:has-text("AI Space Tutor")').first();
  await tutorBtn.click();
  await page.waitForTimeout(500);

  // Type "hi" in the open chat
  const input = page.locator('input[aria-label="Type your space question"]');
  await input.fill('hi');
  const sendBtn = page.locator('button:has-text("Send")');
  await sendBtn.click();
  // Wait for word-by-word reveal to complete
  await page.waitForTimeout(1600);
  await page.screenshot({ path: path.join(OUT_DIR, '2-tutor-chatgpt-modal.png') });

  // Close modal
  const closeTutor = page.locator('button[aria-label="Close tutor dialog"]');
  await closeTutor.click();
  await page.waitForTimeout(400);

  // 3. Click Quick Quiz to open Quiz Modal
  console.log('📸 3. Capturing Quick Quiz Modal...');
  const quizBtn = page.locator('button:has-text("Quick Quiz")').first();
  await quizBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, '3-quick-quiz-modal.png') });

  // Close quiz modal
  const closeQuiz = page.locator('button[aria-label="Close quiz dialog"]');
  await closeQuiz.click();
  await page.waitForTimeout(400);

  // 4. Capture Level Check Question 3 with the clean scientific diagram
  console.log('📸 4. Capturing Level Check Question 3 with clean scientific diagram...');
  await page.goto(`${BASE_URL}/check/level-1`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Navigate to Question 3 (index 2)
  const q3Dot = page.locator('button[title="Go to Question 3"]');
  if (await q3Dot.isVisible()) {
    await q3Dot.click();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: path.join(OUT_DIR, '4-level-check-question3-clean.png'), fullPage: true });

  // 5. Trigger Lesson Complete modal by clicking Complete Lesson
  console.log('📸 5. Capturing Lesson Complete Modal with clean celebration artwork...');
  await page.goto(`${BASE_URL}/lesson/meet-the-moon`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const completeBtn = page.locator('button:has-text("Complete Lesson")').first();
  await completeBtn.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, '5-lesson-complete-modal-clean.png') });

  await browser.close();
  console.log('✨ All 5 audit screenshots captured into screenshots/audit/');
}

run().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});

