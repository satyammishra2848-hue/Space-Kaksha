// scripts/contrast.mjs
// WCAG AA Contrast Checker for Kaksha Design Tokens

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const num = parseInt(clean, 16);
  if (clean.length === 3) {
    const r = (num >> 8) & 0xf;
    const g = (num >> 4) & 0xf;
    const b = num & 0xf;
    return [(r << 4) | r, (g << 4) | g, (b << 4) | b];
  }
  return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
}

function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Token values defined in tokens.css and night theme scope
const tokens = {
  // Light Canvas
  paper: '#F7F4ED',
  paperWarm: '#F0EBE1',
  surface: '#FFFEFA',
  surfaceMuted: '#EDE8DE',

  // Ink Typography
  ink: '#171715',
  inkSoft: '#35342F',
  inkMuted: '#5C5850', // Adjusted to guarantee 4.5:1 on paper/surface
  inkFaint: '#787368', // For large text / captions

  // Accents
  orange: '#C86800', // Accessible orange for text on light paper
  orangeBg: '#F2A23A', // Orange for buttons/chips
  yellow: '#F3C95E',
  mint: '#2E7D47', // Text-safe mint/green
  success: '#2E693F',

  // Night Canvas Scope
  night: '#171B25',
  nightSoft: '#232936',
  nightLine: '#454A55',

  // On-Night Typography (Bug 1 Scope)
  onNightText: '#F7F4ED',
  onNightTextSoft: '#E6E1D5',
  onNightTextMuted: '#B8B2A6',
  onNightOrange: '#F9B24E',
  onNightYellow: '#F3C95E',
};

// Defined token pairs across UI
const pairs = [
  // --- PAPER / SURFACE CANVAS ---
  { name: 'Body Ink on Paper', fg: tokens.ink, bg: tokens.paper, minRatio: 4.5, type: 'body' },
  { name: 'Soft Ink on Paper', fg: tokens.inkSoft, bg: tokens.paper, minRatio: 4.5, type: 'body' },
  { name: 'Muted Ink on Paper', fg: tokens.inkMuted, bg: tokens.paper, minRatio: 4.5, type: 'body' },
  { name: 'Body Ink on Surface', fg: tokens.ink, bg: tokens.surface, minRatio: 4.5, type: 'body' },
  { name: 'Soft Ink on Surface', fg: tokens.inkSoft, bg: tokens.surface, minRatio: 4.5, type: 'body' },
  { name: 'Muted Ink on Surface', fg: tokens.inkMuted, bg: tokens.surface, minRatio: 4.5, type: 'body' },
  { name: 'Body Ink on Paper-Warm', fg: tokens.ink, bg: tokens.paperWarm, minRatio: 4.5, type: 'body' },
  { name: 'Text Orange on Paper (Large)', fg: tokens.orange, bg: tokens.paper, minRatio: 3.0, type: 'large' },
  { name: 'Text Mint on Paper', fg: tokens.mint, bg: tokens.paper, minRatio: 4.5, type: 'body' },
  { name: 'Primary Button Text (Paper on Ink)', fg: tokens.paper, bg: tokens.ink, minRatio: 4.5, type: 'body' },
  { name: 'Orange Button Text (Ink on OrangeBg)', fg: tokens.ink, bg: tokens.orangeBg, minRatio: 4.5, type: 'body' },

  // --- NIGHT CANVAS SCOPE (Bug 1 validation) ---
  { name: 'Heading Text on Night', fg: tokens.onNightText, bg: tokens.night, minRatio: 3.0, type: 'large' },
  { name: 'Body Text on Night', fg: tokens.onNightText, bg: tokens.night, minRatio: 4.5, type: 'body' },
  { name: 'Soft Text on Night', fg: tokens.onNightTextSoft, bg: tokens.night, minRatio: 4.5, type: 'body' },
  { name: 'Muted Text on Night', fg: tokens.onNightTextMuted, bg: tokens.night, minRatio: 4.5, type: 'body' },
  { name: 'Orange Accent on Night (Large)', fg: tokens.onNightOrange, bg: tokens.night, minRatio: 3.0, type: 'large' },
  { name: 'Yellow Star on Night', fg: tokens.onNightYellow, bg: tokens.night, minRatio: 3.0, type: 'large' },
  { name: 'Heading Text on Night-Soft', fg: tokens.onNightText, bg: tokens.nightSoft, minRatio: 3.0, type: 'large' },
  { name: 'Body Text on Night-Soft', fg: tokens.onNightText, bg: tokens.nightSoft, minRatio: 4.5, type: 'body' },
  { name: 'Muted Text on Night-Soft', fg: tokens.onNightTextMuted, bg: tokens.nightSoft, minRatio: 4.5, type: 'body' },
  { name: 'Night Card Orange Accent', fg: tokens.onNightOrange, bg: tokens.nightSoft, minRatio: 3.0, type: 'large' },
];

console.log('='.repeat(70));
console.log(' KAKSHA WCAG AA CONTRAST AUDIT (scripts/contrast.mjs)');
console.log('='.repeat(70));

let failures = 0;

for (const pair of pairs) {
  const ratio = contrastRatio(pair.fg, pair.bg);
  const passed = ratio >= pair.minRatio;
  const status = passed ? 'PASS' : 'FAIL';
  const prefix = passed ? '✓' : '✗';

  console.log(
    `${prefix} [${status}] ${pair.name.padEnd(36)} ` +
    `Ratio: ${ratio.toFixed(2).padStart(5)}:1 (Min: ${pair.minRatio}:1 [${pair.type}]) ` +
    `fg:${pair.fg} bg:${pair.bg}`
  );

  if (!passed) failures++;
}

console.log('='.repeat(70));
if (failures > 0) {
  console.error(`❌ WCAG AA Audit Failed with ${failures} contrast violation(s).`);
  process.exit(1);
} else {
  console.log(`✅ All ${pairs.length} token contrast pairs PASSED WCAG AA standards!`);
  process.exit(0);
}

