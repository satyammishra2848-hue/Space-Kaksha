export interface ChatItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface AskTutorParams {
  messages: Array<{ role?: string; sender?: string; content?: string; text?: string }>;
  lessonId?: string;
  level?: string | number;
  language?: 'en' | 'hi';
  mode?: 'explain' | 'quiz' | 'hint';
}

export interface TutorResponse {
  text: string;
  offline: boolean;
}

export async function askTutor(params: AskTutorParams): Promise<TutorResponse> {
  try {
    const res = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        text: data.text || 'The AI Space Tutor is resting in orbit. Exploring the cosmos continues!',
        offline: true,
      };
    }

    const data = await res.json();
    return {
      text: data.text || 'Message received from deep space.',
      offline: Boolean(data.offline),
    };
  } catch {
    return {
      text: 'Deep space signal lost. Using offline mission telemetry!',
      offline: true,
    };
  }
}

