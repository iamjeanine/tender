# Tender — Product Requirements Document

## Overview

**Name:** Tender

**One-liner:** Culture, curated for how you feel.

**Type:** Vision prototype / portfolio piece

**Goal:** Demonstrate a new paradigm for content recommendation — emotional, cross-format, timeless + timely. Someone sees it and thinks, "I wish this existed. And I want to work with the person who made it."

---

## The Problem

Decision fatigue across formats. Too much content, no filter for emotional state. Podcasts have declined in quality. People want high-taste recommendations that meet them where they are — not algorithms, not genres, not trending lists.

**The user:** A culturally curious person who's overwhelmed by choice and wants someone to just tell them what's worth their time right now.

---

## Curation Principles

These are the soul of the product. They guide the AI's recommendations.

1. **Emotional resonance over relevance.** Don't match keywords. Match feelings.

2. **Timeless and timely.** Mix something from this week with something from 2,000 years ago.

3. **Surprise that feels inevitable.** The user should think, "I wouldn't have found this, but it's exactly right."

4. **Cross-format range.** Never five of the same format. Always a mix — essay, film, book, poem, podcast, myth, article.

5. **At least one reframe.** Don't just validate the feeling. Offer one thing that shifts perspective.

6. **Depth over popularity.** Trending is a signal, not a goal.

7. **Emotional connection is the point.** This isn't about being smart. It's about being helpful.

---

## Content Formats

The AI can recommend from any of these:

- Podcast episode
- Substack essay
- Book (or a specific chapter)
- Poem
- Film or documentary
- Myth, fable, or ancient text
- Long-read article
- Short story
- Song
- Speech or lecture

---

## Mood System

10 moods, each with a distinct color:

| Mood | Color Direction |
|------|-----------------|
| Anxious | Green |
| Sad | Soft blue |
| Angry | Deep red |
| Lost | Muted purple |
| Restless | Electric yellow/orange |
| Stuck | Gray or slate |
| Lonely | Pale violet |
| Curious | Teal |
| Cozy | Warm amber |
| Hopeful | Soft gold or peach |

---

## Interaction Flow

### Screen 1: Mood Selection

- User swipes or taps through moods
- Each mood fills the screen with its color (backlit glow effect)
- One word, centered, large, elegant serif typography
- User taps to select

### Screen 2: Go Deeper (Optional but Encouraged)

- Prompt: "What brought you here?"
- Subtext: "The details help."
- Voice input (primary) — mic button
- Text input (fallback) — "Or type instead"
- Skip option (de-emphasized, small, bottom corner)
- Shows transcription back to user so they feel heard

### Screen 3: Your Five

- Clean, calm background (mostly black and white, subtle mood color accent)
- 5 recommendations displayed vertically
- Each recommendation shows:
  - Format (essay, podcast, film, book, poem, myth, etc.)
  - Title
  - Source (author, publication, podcast name, etc.)
  - "Why this, why now" — one sentence connecting it to what they shared

---

## Design System

### Overall Vibe

- **Intimate** — like a quiet conversation, not an app
- **Confident** — it knows what it's doing
- **Warm** — not clinical, not techy
- **Editorial** — taste-driven, curated
- **Restrained** — white space, nothing competing

**Reference:** The Paris Review meets a mindful app. Emotionally soft, intellectually sharp.

### Base

- Black and white editorial foundation
- High contrast, clean, literary

### Typography

- **Mood words / headlines:** Elegant serif (confident, literary)
- **Body / details:** Clean sans-serif
- Large, confident type for mood words

### Color

- Mood colors appear as **backlit glow** — bleeding through from behind, like light through frosted paper
- Color pulses gently, slowly — breathing, alive
- On recommendations screen: color is a subtle accent only (thin line, whisper at edges)

### Texture

- Subtle **risograph grain** on recommendations screen
- Imperfect in a beautiful way
- Feels handmade, editorial

### Motion

- Slow, breathing pulse on the color
- Nothing bouncy or animated
- Deliberate, calm transitions

### UI Elements

- Minimal chrome — no heavy buttons, no borders
- Format labels as text, not icons
- Generous white space
- Strong vertical hierarchy

---

## Technical Approach

### Method: Claude + Web Search

- Claude receives the mood + user context + curation principles
- Claude searches the web in real-time for current content (Substacks, podcasts, articles)
- Claude draws from training knowledge for timeless content (books, myths, poems, philosophy)
- Blends them into 5 recommendations

### Voice Input

- Browser Web Speech API for transcription
- User speaks → text appears → recommendations generate
- No AI voice response (avoids bad voice breaking the spell)

---

## Prompt Structure

### System Prompt

```
You are a culture curator with impeccable taste. Your job is to recommend 5 things to someone based on how they're feeling — not what genre they want, but what they actually need right now.

CURATION PRINCIPLES:
1. Emotional resonance over relevance. Don't match keywords. Match feelings.
2. Timeless and timely. Mix something from this week with something from 2,000 years ago.
3. Surprise that feels inevitable. They should think, "I wouldn't have found this, but it's exactly right."
4. Cross-format range. Never five of the same format. Mix it up — essay, film, book, poem, podcast, myth, article.
5. At least one reframe. Don't just validate the feeling. Offer one thing that shifts perspective.
6. Depth over popularity. Trending is a signal, not a goal.
7. Emotional connection is the point. Be helpful, not clever.

FORMATS YOU CAN RECOMMEND:
- Podcast episode
- Substack essay
- Book (or a specific chapter)
- Poem
- Film or documentary
- Myth, fable, or ancient text
- Long-read article
- Short story
- Song
- Speech or lecture

FOR EACH RECOMMENDATION, PROVIDE:
- Format
- Title
- Source (author, publication, podcast name, etc.)
- Why this, why now (one sentence that connects it to what they shared — be specific, be human)

Use web search to find current/recent content (Substacks, podcasts, articles). Draw from your knowledge for timeless content (books, poems, myths, films).

Be specific. "Heartbreak" is not enough — understand the *kind* of heartbreak they're describing and match to that.
```

### User Prompt

```
Mood: [mood word]

What they shared: [transcribed voice input or typed text, if provided]

Give them 5 recommendations.
```

---

## Example Output

**Mood:** Sad

**What they shared:** "I just ended a relationship. I knew it wasn't right but I still feel guilty. Like I gave up on something."

**Recommendations:**

1. **Poem** — "The Conditional" by Ada Limón
   *Why this, why now:* It's about loving someone without knowing if you can stay. It sits with the ambiguity instead of resolving it.

2. **Substack essay** — "The Leaving" by Heather Havrilesky (Ask Polly)
   *Why this, why now:* She writes about the guilt of being the one who left, and why that's its own kind of grief.

3. **Film** — *Marriage Story* (2019)
   *Why this, why now:* It's not about villains. It's about two people who loved each other and couldn't make it work. You'll feel seen.

4. **Myth** — Orpheus and Eurydice
   *Why this, why now:* Sometimes you have to let someone go, even when you don't want to. The looking back is the loss.

5. **Podcast episode** — "The Heart" — "How to Let Go"
   *Why this, why now:* Real people talking about endings they chose. Messy, honest, no neat conclusions.

---

## Build Order

Build and test each feature one at a time before moving to the next.

### Phase 1: Recommendations Engine (Core)
- Just the prompt + Claude + web search
- Test in isolation: give it a mood + context, see what comes back
- Iterate on the prompt until recommendations feel right
- **This is the heart of the product. Get this working first.**
- **Test:** Do the recommendations pass the "yeah, that would actually help" test?

### Phase 2: Mood Selection Screen
- Basic UI: display the 10 moods with colors
- Tap to select
- No animation yet, just functional
- **Test:** Does it capture the mood correctly and pass it forward?

### Phase 3: Go Deeper Screen
- Text input first (simpler)
- Connect it to the recommendations engine
- **Test:** Does adding context improve the recommendations?

### Phase 4: Recommendations Display Screen
- Show the 5 results
- Basic layout: format, title, source, "why this, why now"
- **Test:** Is the information displaying correctly?

### Phase 5: Voice Input
- Add Web Speech API to "Go Deeper" screen
- Transcription appears as text
- **Test:** Does it capture speech accurately?

### Phase 6: Design Polish
- Add the backlit color glow effect
- Add the breathing/pulsing animation
- Typography refinement (serif headlines, clean sans body)
- Risograph texture on recommendations screen
- Transitions between screens
- **Test:** Does it feel like the vision? Is it scroll-stopping?

---

## Not in V1 (Future)

- Save/bookmark recommendations
- Taste profile over time
- Share a recommendation
- "I liked this / not for me" feedback loop
- User accounts

---

## Success Criteria

Someone sees this and thinks:

1. "I wish this existed."
2. "I want to work with the person who made it."
3. "That recommendation is exactly right — how did it know?"
