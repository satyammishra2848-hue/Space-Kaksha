import { NextRequest, NextResponse } from 'next/server';
import { LEVEL_1_LESSONS, LEVEL_2_LESSONS } from '@/content/levels';
import { getFallbackReply } from '@/lib/tutorFallback';

// In-memory rate limiting: 12 requests per minute per IP
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return false;
  }
  if (record.count >= 12) {
    return true;
  }
  record.count += 1;
  return false;
}

// Clean up old rate limit records periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 120000);
}

export async function POST(req: NextRequest) {
  let lastUserText = '';
  let safeLanguage: 'en' | 'hi' = 'en';

  try {
    // 1. Origin / Host check (allow matching host, localhost, or 127.0.0.1)
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Invalid origin' }, { status: 400 });
      }
    }

    // 2. Parse body
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ text: getFallbackReply('', 'en'), offline: true });
    }

    const { messages, lessonId, level, language } = body;
    safeLanguage = language === 'hi' ? 'hi' : 'en';

    // 3. Extract last user text for fallback
    if (Array.isArray(messages) && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      lastUserText = typeof lastMsg?.content === 'string'
        ? lastMsg.content
        : typeof lastMsg?.text === 'string'
        ? lastMsg.text
        : '';
    }

    // 4. Rate limiting per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json({
        text: safeLanguage === 'hi'
          ? 'आप बहुत तेज़ी से प्रश्न पूछ रहे हैं! कृपया कुछ सेकंड प्रतीक्षा करें।'
          : 'You are asking questions quickly! Please take a breath and try again in a moment.',
        offline: true,
      });
    }

    // 5. Check API Key (with fallback to .env.local if runtime dev server booted earlier)
    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
          const raw = fs.readFileSync(envPath, 'utf8');
          const m = raw.match(/GEMINI_API_KEY=([^\r\n]+)/);
          if (m && m[1]) {
            apiKey = m[1].trim();
            process.env.GEMINI_API_KEY = apiKey;
          }
        }
      } catch {
        // Safe fail
      }
    }

    if (!apiKey || apiKey === 'your_key_here') {
      console.log('[Tutor API Debug] apiKey missing or placeholder');
      return NextResponse.json({
        text: getFallbackReply(lastUserText, safeLanguage),
        offline: true,
      });
    }

    // 6. Normalize up to 6 messages
    const trimmed = (Array.isArray(messages) ? messages : []).slice(-6);
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    for (const m of trimmed) {
      const role = m.role === 'assistant' || m.sender === 'tutor' ? 'model' : 'user';
      const text = typeof m.content === 'string' ? m.content : typeof m.text === 'string' ? m.text : '';
      if (text.trim()) {
        contents.push({
          role,
          parts: [{ text: text.slice(0, 500) }],
        });
      }
    }

    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: 'Hello space tutor!' }] });
    } else if (contents[0].role !== 'user') {
      contents.unshift({ role: 'user', parts: [{ text: 'Hello space tutor!' }] });
    }

    // 7. Context lookup
    let lessonContext = 'General Space Science and Solar System';
    if (typeof lessonId === 'string' && lessonId.length <= 64) {
      const allLessons = [...LEVEL_1_LESSONS, ...LEVEL_2_LESSONS];
      const match = allLessons.find((l) => l.id === lessonId);
      if (match) {
        lessonContext = `Lesson: "${match.title}". Topic: ${match.subtitle}. Key Facts: ${match.keyFacts.join('; ')}`;
      }
    }

    const safeLevel = level ? `Level ${level}` : 'Level 1 Explorer';

    // 8. System prompt per specification
    const systemPrompt = `You are the AI Space Tutor for Kaksha, a warm, encouraging, scientifically accurate guide for children aged 8 to 14. Keep answers short (2 to 4 sentences unless asked for more), vivid, and easy to grasp. Relate concepts to everyday things. Never patronise. Match the user's language (${safeLanguage === 'hi' ? 'Hindi in Devanagari script' : 'English'}). If context for a lesson is provided, ground your answer in that lesson. Never invent facts.
Student Level: ${safeLevel}
Lesson Context: ${lessonContext}`;

    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // 9. Fetch with 12s AbortController timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const geminiRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents,
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
      }),
    });

    clearTimeout(timeout);

    if (!geminiRes.ok) {
      console.log('[Tutor API Debug] Gemini returned status:', geminiRes.status);
      return NextResponse.json({
        text: getFallbackReply(lastUserText, safeLanguage),
        offline: true,
      });
    }

    const data = await geminiRes.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!replyText) {
      return NextResponse.json({
        text: getFallbackReply(lastUserText, safeLanguage),
        offline: true,
      });
    }

    return NextResponse.json({
      text: replyText,
      offline: false,
    });
  } catch (err) {
    console.log('[Tutor API Debug] Exception:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({
      text: getFallbackReply(lastUserText, safeLanguage),
      offline: true,
    });
  }
}
