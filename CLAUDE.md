# Tender

Culture, curated for how you feel.

## Overview

Tender is a vision prototype demonstrating a new paradigm for content recommendation—emotional, cross-format, timeless + timely. The app recommends 5 pieces of culture based on how someone is feeling, not what genre they want.

## Tech Stack

- Frontend: TBD (likely React/Next.js)
- AI: Claude API with web search capabilities
- Voice: Browser Web Speech API

## Project Structure

```
/tender-prd.md       # Product requirements document
/src/                # Application source (to be created)
```

## Curation Principles

1. Emotional resonance over relevance
2. Timeless and timely (mix current with ancient)
3. Surprise that feels inevitable
4. Cross-format range (never 5 of the same format)
5. At least one reframe (don't just validate)
6. Depth over popularity
7. Emotional connection is the point

## Content Formats

- Podcast episode
- Substack essay
- Book (or specific chapter)
- Poem
- Film or documentary
- Myth, fable, or ancient text
- Long-read article
- Short story
- Song
- Speech or lecture

## Mood System

| Mood | Color |
|------|-------|
| Anxious | Green |
| Sad | Soft blue |
| Angry | Deep red |
| Lost | Muted purple |
| Restless | Electric yellow/orange |
| Stuck | Gray/slate |
| Lonely | Pale violet |
| Curious | Teal |
| Cozy | Warm amber |
| Hopeful | Soft gold/peach |

## Build Phases

1. **Recommendations Engine** ← Current focus
2. Mood Selection Screen
3. Go Deeper Screen (text input)
4. Recommendations Display
5. Voice Input
6. Design Polish

## Development Notes

- Test recommendations with the "yeah, that would actually help" standard
- Each recommendation needs: format, title, source, "why this, why now"
- Web search for timely content, training knowledge for timeless
