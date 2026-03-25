import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '.env');
const result = dotenv.config({ path: envPath, override: true });
const apiKey = process.env.ANTHROPIC_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

// ─── Rate limiting (in-memory, per-IP, 20 req/min) ───

const rateMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (rateMap.size > 500) {
    for (const [key, val] of rateMap) {
      if (now - val.start > 60_000) rateMap.delete(key);
    }
  }

  if (!entry || now - entry.start > 60_000) {
    rateMap.set(ip, { count: 1, start: now });
    return true;
  }

  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

const MAX_MOOD_LENGTH = 50;
const MAX_CONTEXT_LENGTH = 2_000;

app.use('/api', (req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded (20 requests/min)' });
  }
  next();
});

const anthropic = new Anthropic({
  apiKey,
});

const SYSTEM_PROMPT = `You are Tender, a cultural curator who recommends content based on emotional state. You have exquisite taste and deep knowledge across all forms of culture—ancient and contemporary, popular and obscure, highbrow and accessible.

Your job is to recommend exactly 5 pieces of culture that will meet someone where they are emotionally. Not what's "relevant" by keyword—what actually resonates.

## Curation Principles

1. **Emotional resonance over relevance** — Don't match keywords. Match feelings. If someone is anxious about work, don't recommend productivity content. Recommend something that meets the underlying emotion.

2. **Timeless and timely** — Mix current work (last 2-3 years) with older or ancient pieces. A 2024 podcast episode alongside a Greek myth. A new Substack alongside a 1970s film.

3. **Surprise that feels inevitable** — The best recommendation makes someone say "I never would have found this, but it's exactly right." Avoid obvious choices.

4. **Cross-format range** — Never recommend 5 of the same format. Use variety from: podcast episode, Substack/newsletter essay, book (or specific chapter), poem, film or documentary, myth/fable/ancient text, long-read article, short story, song, speech or lecture.

5. **At least one reframe** — Don't just validate the mood. Include at least one piece that offers a different perspective or gentle challenge. If someone is angry, maybe one recommendation helps them understand their anger differently.

6. **Depth over popularity** — Skip the obvious bestsellers unless they're genuinely perfect. A lesser-known essay that's exactly right beats a famous book that's merely good.

7. **The "why this, why now" is the soul of each recommendation.** This is where you show the person you actually heard them. Write it like a caring friend with great taste — someone who listened closely to what they said and thought hard about what might help. Use "you" language. Speak directly to the details they shared. Never be generic or clinical. Reference their specific situation, their words, their feelings. 2-3 sentences. Make them feel seen.

## Format Requirements

For each recommendation, provide:
- **format**: The content type (Podcast, Essay, Book, Poem, Film, Myth, Article, Short story, Song, Speech, etc.)
- **title**: The specific title
- **source**: Author, publication, director, or platform with year if relevant
- **whyThisWhyNow**: 2-3 sentences written directly to this person. Reference what they told you. Use "you" — as in "You mentioned feeling trapped..." or "That thing you said about..." Make it feel like someone really listened. This is the most important part of each recommendation.

## Response Format

Respond ONLY with valid JSON in this exact structure:
{
  "recommendations": [
    {
      "format": "...",
      "title": "...",
      "source": "...",
      "whyThisWhyNow": "..."
    }
  ]
}

No markdown, no explanation outside the JSON. Just the JSON object.`;

app.post('/api/recommendations', async (req, res) => {
  try {
    const { mood, context } = req.body;

    if (!mood || typeof mood !== 'string' || mood.length > MAX_MOOD_LENGTH) {
      return res.status(400).json({ error: `Mood is required and must be under ${MAX_MOOD_LENGTH} characters` });
    }
    if (context && (typeof context !== 'string' || context.length > MAX_CONTEXT_LENGTH)) {
      return res.status(400).json({ error: `Context must be under ${MAX_CONTEXT_LENGTH} characters` });
    }

    const userMessage = context
      ? `I'm feeling ${mood}. Here's what's going on: ${context}`
      : `I'm feeling ${mood}. I don't have more context to share right now.`;

    console.log('[Tender API] Mood:', mood);
    console.log('[Tender API] Context:', context || '(none)');
    console.log('[Tender API] Full message to Claude:', userMessage);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    let content = response.content[0].text;

    // Strip markdown code fences if present
    content = content.replace(/^```json\s*\n?/, '').replace(/\n?```\s*$/, '');

    console.log('Claude response:', content.substring(0, 200) + '...');

    // Parse the JSON response
    const parsed = JSON.parse(content);

    // Replace em dashes with commas
    parsed.recommendations.forEach((rec) => {
      rec.whyThisWhyNow = rec.whyThisWhyNow.replace(/\s*—\s*/g, ', ');
      rec.source = rec.source.replace(/\s*—\s*/g, ', ');
    });

    console.log('Parsed recommendations:', parsed.recommendations.length, 'items');

    res.json(parsed);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Streaming endpoint — sends each recommendation as an SSE event
app.post('/api/recommendations/stream', async (req, res) => {
  const { mood, context } = req.body;

  if (!mood || typeof mood !== 'string' || mood.length > MAX_MOOD_LENGTH) {
    return res.status(400).json({ error: `Mood is required and must be under ${MAX_MOOD_LENGTH} characters` });
  }
  if (context && (typeof context !== 'string' || context.length > MAX_CONTEXT_LENGTH)) {
    return res.status(400).json({ error: `Context must be under ${MAX_CONTEXT_LENGTH} characters` });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {

    const userMessage = context
      ? `I'm feeling ${mood}. Here's what's going on: ${context}`
      : `I'm feeling ${mood}. I don't have more context to share right now.`;

    console.log('[Tender API Stream] Mood:', mood, '| Context:', context || '(none)');

    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    let buffer = '';
    let sentCount = 0;

    stream.on('text', (text) => {
      buffer += text;

      // Try to extract complete recommendation objects from the buffer
      // Look for complete {...} objects within the recommendations array
      while (true) {
        // Find a complete recommendation object
        const objStart = buffer.indexOf('{', buffer.indexOf('"format"') - 5);
        if (objStart === -1) break;

        // Count braces to find the matching closing brace
        let depth = 0;
        let objEnd = -1;
        for (let i = objStart; i < buffer.length; i++) {
          if (buffer[i] === '{') depth++;
          if (buffer[i] === '}') depth--;
          if (depth === 0) {
            objEnd = i;
            break;
          }
        }

        if (objEnd === -1) break; // Incomplete object, wait for more data

        const objStr = buffer.substring(objStart, objEnd + 1);

        try {
          const rec = JSON.parse(objStr);
          if (rec.format && rec.title && rec.source && rec.whyThisWhyNow) {
            rec.whyThisWhyNow = rec.whyThisWhyNow.replace(/\s*—\s*/g, ', ');
            rec.source = rec.source.replace(/\s*—\s*/g, ', ');
            sentCount++;
            console.log(`[Tender API Stream] Sending rec ${sentCount}: ${rec.title}`);
            res.write(`data: ${JSON.stringify(rec)}\n\n`);
          }
        } catch (e) {
          // Not valid JSON yet, skip
        }

        buffer = buffer.substring(objEnd + 1);
      }
    });

    stream.on('end', () => {
      console.log(`[Tender API Stream] Done. Sent ${sentCount} recommendations.`);
      res.write('data: [DONE]\n\n');
      res.end();
    });

    stream.on('error', (error) => {
      console.error('[Tender API Stream] Error:', error.message);
      res.write(`data: [ERROR]\n\n`);
      res.end();
    });

    // Wait for stream to complete
    await stream.finalMessage();
  } catch (error) {
    console.error('[Tender API Stream] Error:', error.message);
    res.write(`data: [ERROR]\n\n`);
    res.end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Tender API server running on http://localhost:${PORT}`);
});
