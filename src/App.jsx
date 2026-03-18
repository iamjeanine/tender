import React, { useState, useRef } from 'react';
import { MOODS, getRecommendations, getRecommendationsStream } from './mockRecommendations';
import './App.css';

// Landing Screen — video background with ink-in-water footage
function Landing({ onBegin }) {
  return (
    <div className="screen landing-screen">
      <video
        className="landing-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/ink-video.mp4" type="video/mp4" />
      </video>

      <div className="landing-bottom">
        <h1 className="landing-title">Tender</h1>
        <p className="landing-tagline">Feel something. Find something.</p>
        <button className="begin-button" onClick={onBegin}>
          Begin
        </button>
      </div>
    </div>
  );
}

// Screen 1: Mood Selection
function MoodSelection({ onSelect, onHome }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);
  const currentMood = MOODS[selectedIndex];

  const goToMood = (newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Fade out old label first, then swap text and fade in
    setTimeout(() => {
      setSelectedIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex = selectedIndex === 0 ? MOODS.length - 1 : selectedIndex - 1;
    goToMood(newIndex);
  };

  const handleNext = () => {
    const newIndex = selectedIndex === MOODS.length - 1 ? 0 : selectedIndex + 1;
    goToMood(newIndex);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Mouse drag for desktop
  const mouseStartX = useRef(null);

  const handleMouseDown = (e) => {
    // Ignore if clicking a button
    if (e.target.closest('button')) return;
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    mouseStartX.current = null;
  };

  return (
    <div
      className="screen mood-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <button className="home-link" onClick={onHome}>Tender</button>

      {/* Layered glow effect */}
      <div className="mood-glow-container">
        <div
          className="mood-glow glow-outer"
          style={{ backgroundColor: currentMood.color }}
        />
        <div
          className="mood-glow glow-inner"
          style={{ backgroundColor: currentMood.color }}
        />
      </div>

      <button className="nav-hint nav-prev" onClick={handlePrev} aria-label="Previous mood">
        ‹
      </button>

      <div className="mood-content" onClick={() => onSelect(currentMood)} style={{ cursor: 'pointer' }}>
        <h1 className={`mood-label ${isTransitioning ? 'transitioning' : ''}`}>
          {currentMood.label}
        </h1>
      </div>

      <button className="nav-hint nav-next" onClick={handleNext} aria-label="Next mood">
        ›
      </button>

      <div className="mood-bottom">
        <div className="mood-dots">
          {MOODS.map((mood, i) => (
            <span
              key={mood.id}
              className={`dot ${i === selectedIndex ? 'active' : ''}`}
              style={i === selectedIndex ? { backgroundColor: currentMood.color } : {}}
              onClick={() => goToMood(i)}
            />
          ))}
        </div>

        <button
          className="select-button"
          onClick={() => onSelect(currentMood)}
        >
          Go deeper
        </button>
      </div>
    </div>
  );
}

// Auto-punctuate raw speech transcript
function addPunctuation(text) {
  if (!text) return text;

  // Trim and collapse whitespace
  let result = text.replace(/\s+/g, ' ').trim();

  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);

  // Split into sentences at natural pause boundaries
  // The Web Speech API often delivers phrases that correspond to
  // clauses or sentences — capitalize after obvious sentence breaks.
  // We add a period before conjunctions that start new thoughts when
  // preceded by a long-enough clause, and after trailing text.

  // Capitalize after existing punctuation (. ! ?)
  result = result.replace(/([.!?])\s+([a-z])/g, (_, p, c) => `${p} ${c.toUpperCase()}`);

  // Add a period at the end if there isn't one
  if (!/[.!?]$/.test(result)) {
    result += '.';
  }

  return result;
}

// Screen 2: Go Deeper — voice-first input
function GoDeeper({ mood, onSubmit, onSkip, onBack, onHome }) {
  const [context, setContext] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const recognitionRef = useRef(null);
  const wantListeningRef = useRef(false);

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      wantListeningRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
        recognitionRef.current = null;
      }
    };
  }, []);

  const stopMic = () => {
    wantListeningRef.current = false;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setContext((prev) => prev ? addPunctuation(prev) : prev);
  };

  const handleMicTap = () => {
    if (isListening) {
      stopMic();
      return;
    }

    // Start — everything inline for user gesture context
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setShowTextInput(true);
      return;
    }

    // Kill any stale instance
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) { /* ignore */ }
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript) {
        setContext(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.log('[Tender] Speech error:', event.error);
      if (event.error === 'not-allowed') {
        wantListeningRef.current = false;
        setShowTextInput(true);
        setIsListening(false);
        recognitionRef.current = null;
      }
      // 'no-speech' is handled by onend — it will auto-restart
    };

    recognition.onend = () => {
      // If we still want to be listening, restart
      if (wantListeningRef.current) {
        try {
          recognition.start();
          return;
        } catch (e) {
          console.log('[Tender] Restart failed:', e.message);
        }
      }
      // Only update state if we haven't already cleaned up
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
        setIsListening(false);
        setContext((prev) => prev ? addPunctuation(prev) : prev);
      }
    };

    recognitionRef.current = recognition;
    wantListeningRef.current = true;
    recognition.start();
    setIsListening(true);
  };

  return (
    <div
      className="screen deeper-screen"
      style={{ '--mood-color': mood.color }}
    >
      <div className="deeper-glow-container">
        <div className="deeper-glow" style={{ backgroundColor: mood.color }} />
      </div>

      <button className="home-link" onClick={onHome}>Tender</button>
      <button className="back-link" onClick={onBack}>
        ← Back
      </button>

      <div className="deeper-content">
        <h2 className="deeper-prompt">What brought you here?</h2>
        <p className="deeper-subtext">The details help.</p>

        {/* Transcription display — voice mode only */}
        {!showTextInput && context && (
          <div className="voice-transcript">
            <p className="transcript-text">{context}</p>
          </div>
        )}

        {/* Mic button — primary input */}
        {!showTextInput && (
          <button
            className={`mic-button ${isListening ? 'listening' : ''}`}
            onClick={handleMicTap}
            style={{
              '--pulse-color': mood.color,
            }}
          >
            <svg className="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        )}

        {!showTextInput && !isListening && !context && (
          <p className="mic-hint">Tap to speak</p>
        )}

        {isListening && (
          <p className="mic-hint listening-hint">Listening...</p>
        )}

        {/* Show submit as soon as any words appear — voice mode only */}
        {!showTextInput && context.replace(/[.\s]/g, '').length > 0 && (
          <button
            className="submit-button"
            onClick={() => {
              stopMic();
              onSubmit(addPunctuation(context));
            }}
          >
            I'm ready
          </button>
        )}

        {/* Secondary text option */}
        {!showTextInput ? (
          <button
            className="type-instead-button"
            onClick={() => {
              stopMic();
              setShowTextInput(true);
            }}
          >
            Or type instead
          </button>
        ) : (
          <>
            <textarea
              className="context-input"
              placeholder="Say what's on your mind..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={4}
              autoFocus
            />
            <button
              className="submit-button"
              onClick={() => onSubmit(context)}
              disabled={!context.trim()}
            >
              I'm ready
            </button>
            <button
              className="type-instead-button"
              onClick={() => setShowTextInput(false)}
            >
              Use voice instead
            </button>
          </>
        )}

        <button
          className="skip-button"
          onClick={() => onSkip()}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

// Format-to-color mapping for editorial color accents
const FORMAT_COLORS = {
  poem: '#9b8ec4',
  essay: '#8a8580',
  substack: '#8a8580',
  article: '#8a8580',
  film: '#3d5a80',
  documentary: '#3d5a80',
  book: '#c4953a',
  podcast: '#4a9b8e',
  myth: '#b8a44c',
  fable: '#b8a44c',
  song: '#c45b5b',
  youtube: '#c45b5b',
  speech: '#6b7b8d',
  lecture: '#6b7b8d',
  'short story': '#7a6e5d',
};

function getFormatColor(format) {
  const key = format.toLowerCase();
  return FORMAT_COLORS[key] || '#8a8580';
}

function getSearchUrl(rec) {
  const format = rec.format.toLowerCase();
  // Extract just the creator name (before first comma) and any year
  const sourceParts = rec.source.split(',').map(s => s.trim());
  const creator = sourceParts[0]; // e.g. "Jim Jarmusch" or "Charlotte Wells"
  const yearMatch = rec.source.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : '';

  if (format.includes('book') || format.includes('chapter') || format.includes('short story')) {
    return `https://bookshop.org/search?keywords=${encodeURIComponent(`${rec.title} ${creator}`)}`;
  }
  if (format.includes('film') || format.includes('documentary')) {
    // JustWatch shows where to stream it
    const q = year ? `${rec.title}` : rec.title;
    return `https://www.justwatch.com/us/search?q=${encodeURIComponent(q)}`;
  }
  if (format.includes('song')) {
    return `https://open.spotify.com/search/${encodeURIComponent(`${rec.title} ${creator}`)}`;
  }
  if (format.includes('podcast')) {
    // Google is most reliable for finding specific podcast episodes
    return `https://www.google.com/search?q=${encodeURIComponent(`${creator} "${rec.title}" podcast episode`)}`;
  }
  if (format.includes('poem')) {
    return `https://www.google.com/search?q=${encodeURIComponent(`${rec.title} ${creator} poem full text`)}`;
  }
  if (format.includes('myth') || format.includes('fable')) {
    return `https://www.google.com/search?q=${encodeURIComponent(`${rec.title} myth story`)}`;
  }
  if (format.includes('substack') || format.includes('essay') || format.includes('article')) {
    return `https://www.google.com/search?q=${encodeURIComponent(`${rec.title} ${creator}`)}`;
  }
  // Everything else — clean Google search
  return `https://www.google.com/search?q=${encodeURIComponent(`${rec.title} ${creator}`)}`;
}

function getSearchLabel(format) {
  const f = format.toLowerCase();
  if (f.includes('book') || f.includes('chapter') || f.includes('short story')) return 'Find on Bookshop';
  if (f.includes('film') || f.includes('documentary')) return 'Where to watch';
  if (f.includes('song')) return 'Listen on Spotify';
  if (f.includes('podcast')) return 'Find this episode';
  if (f.includes('poem')) return 'Read this poem';
  return 'Find this';
}

// Staggered card entrance
function StaggeredCard({ children, index, style, className = '' }) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150 + index * 120);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <div
      className={`recommendation-card ${className} ${visible ? 'card-visible' : 'card-hidden'}`}
      style={style}
    >
      {children}
    </div>
  );
}

// Compact card for recommendations 2-5 — truncated "why" that expands on tap
function CompactCard({ rec, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <StaggeredCard
      index={index + 1}
      style={{ '--format-color': getFormatColor(rec.format) }}
    >
      <span className="card-number">{String(index + 2).padStart(2, '0')}</span>
      <span className="rec-format">{rec.format}</span>
      <h3 className="rec-title">{rec.title}</h3>
      <p className="rec-source">{rec.source}</p>
      <p
        className={`rec-why rec-why-compact ${expanded ? 'rec-why-expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        {rec.whyThisWhyNow}
      </p>
      {!expanded && (
        <button className="expand-why" onClick={() => setExpanded(true)}>
          Why this? &#8594;
        </button>
      )}
      <a href={getSearchUrl(rec)} target="_blank" rel="noopener noreferrer" className="find-link">
        {getSearchLabel(rec.format)} &#8594;
      </a>
    </StaggeredCard>
  );
}

// Screen 3: Recommendations
function Recommendations({ mood, recommendations, onBack, onHome, streaming }) {
  const featured = recommendations[0];
  const rest = recommendations.slice(1);

  return (
    <div
      className="screen recommendations-screen"
      style={{ '--mood-color': mood.color }}
    >
      <div className="recommendations-header">
        <button className="home-link-inline" onClick={onHome}>Tender</button>
        <span className="mood-tag">{mood.label}</span>
      </div>

      <h2 className="recommendations-title">Your Five</h2>

      {featured && (
        <StaggeredCard
          index={0}
          className="featured-card"
          style={{ '--format-color': getFormatColor(featured.format) }}
        >
          <span className="card-number">01</span>
          <span className="rec-format">{featured.format}</span>
          <h3 className="rec-title">{featured.title}</h3>
          <p className="rec-source">{featured.source}</p>
          <p className="rec-why">{featured.whyThisWhyNow}</p>
          <a href={getSearchUrl(featured)} target="_blank" rel="noopener noreferrer" className="find-link">
            {getSearchLabel(featured.format)} &#8594;
          </a>
        </StaggeredCard>
      )}

      <div className="recommendations-list">
        {rest.map((rec, index) => (
          <CompactCard key={index} rec={rec} index={index} />
        ))}
      </div>

      <button className="try-another-button" onClick={onBack}>
        Try another mood
      </button>
    </div>
  );
}

// Loading words — tone-matched to mood
const HEAVY_MOODS = ['sad', 'angry', 'anxious', 'lost', 'lonely', 'stuck'];

const GENTLE_WORDS = [
  'Gathering', 'Searching', 'Finding', 'Considering', 'Reflecting',
  'Listening', 'Understanding', 'Thinking', 'Sitting with this', 'Taking this in',
  'Looking', 'Sorting', 'Sifting', 'Remembering', 'Reaching',
  'Pulling threads', 'Making sense', 'Putting it together', 'Working on it',
  'Almost there', 'Getting close', 'Digging', 'Browsing', 'Mulling',
  'Combing through', 'Piecing together', 'Turning it over', 'Following a thread',
  'Looking deeper', 'Connecting dots', 'Weighing', 'Holding this',
  'Seeing what fits', 'Tracking something down', 'Letting it land',
  'Circling back', 'Tracing', 'Untangling', 'Reading between',
  'Going further', 'Taking my time', 'Still looking', 'Onto something',
  'One more moment', 'Bear with me', 'Not rushing this',
  'Scanning', 'Surveying', 'Wading through', 'Poring over', 'Examining',
  'Exploring', 'Uncovering', 'Discovering', 'Delving', 'Mining',
  'Excavating', 'Investigating', 'Probing', 'Checking', 'Reviewing',
  'Assessing', 'Evaluating', 'Processing', 'Absorbing', 'Digesting',
  'Synthesizing', 'Compiling', 'Curating', 'Assembling', 'Building',
  'Shaping', 'Forming', 'Drafting', 'Refining', 'Polishing',
  'Narrowing down', 'Zeroing in', 'Honing in', 'Landing on something',
  'Finding the thread', 'Chasing a lead', 'Following the trail',
  'On the scent', 'Getting warmer', 'In the weeds', 'Down the rabbit hole',
  'Rounding a corner', 'Seeing something', 'Catching a glimpse',
  'Almost landed', 'Just about there', 'Moment longer', 'Few more seconds',
  'Worth the wait', 'Good things coming', 'Trust the process',
  'Patience paying off', "Something's forming", 'Taking shape',
  'Coming into focus', 'Crystallizing', 'Emerging', 'Surfacing',
  'Rising up', 'Arriving'
];

const PLAYFUL_WORDS = [
  'Noodling', 'Moseying', 'Tenderizing', 'Percolating', 'Rummaging',
  'Frolicking', 'Meandering', 'Pondering', 'Simmering', 'Wandering',
  'Fluffing', 'Smooshing', 'Schlepping', 'Brewing', 'Concocting',
  'Pontificating', 'Puzzling', 'Crafting', 'Incubating', 'Honking',
  'Wrangling', 'Lollygagging', 'Mustering', 'Having a geez', 'Herding',
  'Philosophizing', 'Getting a wriggle on', 'Scheming'
];

function Loading({ mood }) {
  const words = HEAVY_MOODS.includes(mood.label.toLowerCase()) ? GENTLE_WORDS : PLAYFUL_WORDS;
  const [wordIndex, setWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * words.length);
        } while (newIndex === wordIndex && words.length > 1);
        setWordIndex(newIndex);
        setIsTransitioning(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [wordIndex, words]);

  return (
    <div
      className="screen loading-screen"
      style={{ '--mood-color': mood.color }}
    >
      <div className="loading-glow-container">
        <div className="loading-glow" style={{ backgroundColor: mood.color }} />
      </div>
      <p className={`loading-text ${isTransitioning ? 'fading' : ''}`}>
        {words[wordIndex]}
        <span className="loading-dot" style={{ backgroundColor: mood.color }} />
      </p>
    </div>
  );
}

// Fade wrapper for screen transitions
function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={`fade-in ${visible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}

// Main App
export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' | 'mood' | 'deeper' | 'loading' | 'results'
  const [selectedMood, setSelectedMood] = useState(null);
  const [context, setContext] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [transitioning, setTransitioning] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const transitionTo = (nextScreen) => {
    return new Promise((resolve) => {
      setTransitioning(true);
      setTimeout(() => {
        setScreen(nextScreen);
        setTransitioning(false);
        resolve();
      }, 300);
    });
  };

  const handleBegin = () => {
    transitionTo('mood');
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    transitionTo('deeper');
  };

  const handleContextSubmit = async (userContext) => {
    setContext(userContext);
    setRecommendations([]);
    await transitionTo('loading');

    const [recs] = await Promise.all([
      getRecommendations(selectedMood.id, userContext),
      new Promise(r => setTimeout(r, 2400)),
    ]);
    setRecommendations(recs);
    transitionTo('results');
  };

  const handleSkip = async () => {
    setRecommendations([]);
    await transitionTo('loading');

    const [recs] = await Promise.all([
      getRecommendations(selectedMood.id, ''),
      new Promise(r => setTimeout(r, 2400)),
    ]);
    setRecommendations(recs);
    transitionTo('results');
  };

  const handleBackToMood = () => {
    transitionTo('mood');
  };

  const handleHome = () => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen('landing');
      setSelectedMood(null);
      setContext('');
      setRecommendations([]);
      setTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen('mood');
      setSelectedMood(null);
      setContext('');
      setRecommendations([]);
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className={`app ${transitioning ? 'screen-exit' : 'screen-enter'}`}>
      {screen === 'landing' && (
        <FadeIn>
          <Landing onBegin={handleBegin} />
        </FadeIn>
      )}

      {screen === 'mood' && (
        <FadeIn>
          <MoodSelection onSelect={handleMoodSelect} onHome={handleHome} />
        </FadeIn>
      )}

      {screen === 'deeper' && selectedMood && (
        <FadeIn>
          <GoDeeper
            mood={selectedMood}
            onSubmit={handleContextSubmit}
            onSkip={handleSkip}
            onBack={handleBackToMood}
            onHome={handleHome}
          />
        </FadeIn>
      )}

      {screen === 'loading' && selectedMood && (
        <FadeIn>
          <Loading mood={selectedMood} />
        </FadeIn>
      )}

      {screen === 'results' && selectedMood && (
        <FadeIn>
          <Recommendations
            mood={selectedMood}
            recommendations={recommendations}
            onBack={handleBack}
            onHome={handleHome}
            streaming={streaming}
          />
        </FadeIn>
      )}
    </div>
  );
}
