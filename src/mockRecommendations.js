// Curated cultural library — 10 picks per mood, 5 served each visit
// Each mood has a pool; the app randomly selects 5 ensuring format variety

export const MOODS = [
  { id: 'anxious', label: 'Anxious', color: '#3D8B6E' },    // Forest green
  { id: 'sad', label: 'Sad', color: '#5B7DB8' },            // Ocean blue
  { id: 'angry', label: 'Angry', color: '#C43C4C' },        // Crimson red
  { id: 'lost', label: 'Lost', color: '#8B6BB5' },          // Amethyst purple
  { id: 'restless', label: 'Restless', color: '#E8962B' },  // Electric yellow-orange
  { id: 'stuck', label: 'Stuck', color: '#6E7B8B' },        // Steel slate
  { id: 'lonely', label: 'Lonely', color: '#A78BBE' },      // Pale violet
  { id: 'curious', label: 'Curious', color: '#2DB3A6' },    // Bright teal
  { id: 'cozy', label: 'Cozy', color: '#B87333' },          // Copper/burnt orange
  { id: 'hopeful', label: 'Hopeful', color: '#E6C84D' },    // Sunflower yellow
  { id: 'bored', label: 'Bored', color: '#B5838D' },        // Dusty rose
];

// Full library — 10 recommendations per mood (100 total)
// Curation principles:
// - Cross-format range (never 5 of the same)
// - Timeless + timely mix
// - At least one reframe
// - Emotional resonance over keyword matching
// - Depth over popularity

export const mockRecommendations = {
  anxious: [
    {
      format: 'Essay',
      title: 'The Case for Doing Nothing',
      source: 'Jenny Odell, The New York Times',
      whyThisWhyNow: 'Your mind is racing ahead. This pulls you back into the present moment without asking you to fix anything.',
    },
    {
      format: 'Poem',
      title: 'The Peace of Wild Things',
      source: 'Wendell Berry',
      whyThisWhyNow: 'When despair for the world grows in you—Berry wrote this for exactly that feeling. It\'s only 10 lines but they work.',
    },
    {
      format: 'Podcast',
      title: 'The Space Between',
      source: 'On Being with Krista Tippett',
      whyThisWhyNow: 'Slow, spacious conversation that models the pace your nervous system needs right now.',
    },
    {
      format: 'Film',
      title: 'Paterson',
      source: 'Jim Jarmusch, 2016',
      whyThisWhyNow: 'A bus driver writes poetry. Nothing dramatic happens. That\'s the whole point—and it\'s quietly radical.',
    },
    {
      format: 'Book chapter',
      title: 'Letting Go of Thoughts',
      source: 'Pema Chödrön, When Things Fall Apart',
      whyThisWhyNow: 'Not about stopping anxiety, but changing your relationship to it. She\'s been there.',
    },
    {
      format: 'Song',
      title: 'Weightless',
      source: 'Marconi Union',
      whyThisWhyNow: 'Neuroscientists called it the most relaxing song ever recorded. Eight minutes of your heart rate slowing down.',
    },
    {
      format: 'Short story',
      title: 'The Paper Menagerie',
      source: 'Ken Liu',
      whyThisWhyNow: 'A story about love folded into small things. It\'ll make you cry, but the good kind—the kind that releases pressure.',
    },
    {
      format: 'Myth',
      title: 'The Buddha and the Mustard Seed',
      source: 'Buddhist parable',
      whyThisWhyNow: 'A grieving woman searches for a house untouched by loss. She never finds one—and that\'s what heals her.',
    },
    {
      format: 'Substack',
      title: 'How to Ground Yourself',
      source: 'Emily Nagoski, The Sauce',
      whyThisWhyNow: 'The science of completing the stress cycle. Not about calming down—about letting the feeling move through.',
    },
    {
      format: 'Documentary',
      title: 'My Octopus Teacher',
      source: 'Pippa Ehrlich & James Reed, 2020',
      whyThisWhyNow: 'A man finds stillness by visiting the same octopus every day. Meditative, strange, and deeply calming.',
    },
  ],

  sad: [
    {
      format: 'Poem',
      title: 'The Conditional',
      source: 'Ada Limón',
      whyThisWhyNow: 'It sits with ambiguity instead of resolving it. Sometimes that\'s what sadness needs—company, not solutions.',
    },
    {
      format: 'Substack',
      title: 'The Leaving',
      source: 'Heather Havrilesky, Ask Polly',
      whyThisWhyNow: 'She writes about grief that doesn\'t have a clear cause—the kind that just shows up. You\'ll feel less alone.',
    },
    {
      format: 'Film',
      title: 'Aftersun',
      source: 'Charlotte Wells, 2022',
      whyThisWhyNow: 'Memory, loss, and the things we couldn\'t see at the time. It doesn\'t explain—it just holds the feeling.',
    },
    {
      format: 'Myth',
      title: 'Orpheus and Eurydice',
      source: 'Greek mythology',
      whyThisWhyNow: 'Sometimes you have to let someone go even when you don\'t want to. The looking back is the loss.',
    },
    {
      format: 'Song',
      title: 'Re: Stacks',
      source: 'Bon Iver',
      whyThisWhyNow: 'Built from the wreckage of something that ended. But there\'s quiet hope in there if you listen.',
    },
    {
      format: 'Essay',
      title: 'Notes on Grief',
      source: 'Chimamanda Ngozi Adichie',
      whyThisWhyNow: 'Written in the raw aftermath of losing her father. No wisdom, no arc—just the truth of it. That honesty is a gift.',
    },
    {
      format: 'Podcast',
      title: 'The Grief Episode',
      source: 'Unlocking Us with Brené Brown',
      whyThisWhyNow: 'She names the things about grief no one talks about—the anger, the bargaining, the weird guilt. Validating.',
    },
    {
      format: 'Book',
      title: 'The Year of Magical Thinking',
      source: 'Joan Didion',
      whyThisWhyNow: 'Didion\'s mind trying to think its way through loss. You\'ll recognize the loops. She makes them beautiful.',
    },
    {
      format: 'Short story',
      title: 'The Tenth of December',
      source: 'George Saunders',
      whyThisWhyNow: 'About two people saving each other without knowing it. Devastating and tender in equal measure.',
    },
    {
      format: 'Speech',
      title: 'The Long Goodbye',
      source: 'Nora Ephron',
      whyThisWhyNow: 'Funny, warm, and honest about what we lose and what we keep. She makes you laugh when you need it most.',
    },
  ],

  angry: [
    {
      format: 'Essay',
      title: 'A Letter to My Nephew',
      source: 'James Baldwin, The Fire Next Time',
      whyThisWhyNow: 'Righteous anger that doesn\'t burn out—it builds. Baldwin channels fury into something you can use.',
    },
    {
      format: 'Podcast',
      title: 'The Fury',
      source: 'Radiolab',
      whyThisWhyNow: 'The science and philosophy of anger—why we feel it, what it\'s for, and what to do with it.',
    },
    {
      format: 'Film',
      title: 'Network',
      source: 'Sidney Lumet, 1976',
      whyThisWhyNow: '"I\'m mad as hell and I\'m not going to take it anymore." Sometimes you need your anger reflected back, amplified.',
    },
    {
      format: 'Book',
      title: 'The Body Keeps the Score',
      source: 'Bessel van der Kolk',
      whyThisWhyNow: 'Anger lives in the body. This helps you understand where it\'s coming from—and that it\'s trying to protect you.',
    },
    {
      format: 'Poem',
      title: 'A Litany for Survival',
      source: 'Audre Lorde',
      whyThisWhyNow: 'For when you were never meant to survive—and you\'re still here. Defiant, clear, and exactly what you need.',
    },
    {
      format: 'Song',
      title: 'Alright',
      source: 'Kendrick Lamar',
      whyThisWhyNow: 'Rage that becomes a rallying cry. The anger doesn\'t disappear—it transforms into something collective.',
    },
    {
      format: 'Myth',
      title: 'Kali the Destroyer',
      source: 'Hindu mythology',
      whyThisWhyNow: 'The goddess who destroys to protect. Sometimes rage is sacred—it clears what needs clearing.',
    },
    {
      format: 'Substack',
      title: 'The Uses of Anger',
      source: 'Roxane Gay, The Audacity',
      whyThisWhyNow: 'She refuses to make her anger palatable. That refusal is permission for yours.',
    },
    {
      format: 'Documentary',
      title: '13th',
      source: 'Ava DuVernay, 2016',
      whyThisWhyNow: 'When anger has a systemic cause, understanding the system makes the anger sharper and more useful.',
    },
    {
      format: 'Short story',
      title: 'The Ones Who Walk Away from Omelas',
      source: 'Ursula K. Le Guin',
      whyThisWhyNow: 'A perfect city built on one child\'s suffering. The moral clarity of this story will focus your anger like a lens.',
    },
  ],

  lost: [
    {
      format: 'Book',
      title: 'When Things Fall Apart',
      source: 'Pema Chödrön',
      whyThisWhyNow: 'Not about finding your way—about learning to be okay with not knowing. That\'s where you start.',
    },
    {
      format: 'Film',
      title: 'Nomadland',
      source: 'Chloé Zhao, 2020',
      whyThisWhyNow: 'Being unmoored can also be freedom. This makes space for both the grief and the possibility.',
    },
    {
      format: 'Podcast',
      title: 'The Long Game',
      source: 'Hidden Brain',
      whyThisWhyNow: 'About people who found their path late, sideways, or by accident. The map gets drawn as you walk.',
    },
    {
      format: 'Myth',
      title: 'The Labyrinth of Crete',
      source: 'Greek mythology',
      whyThisWhyNow: 'Theseus needed a thread to find his way out. Sometimes the thread is just taking the next step.',
    },
    {
      format: 'Essay',
      title: 'How to Do Nothing',
      source: 'Jenny Odell',
      whyThisWhyNow: 'What if being lost is the point? This reframes aimlessness as attention—and that changes everything.',
    },
    {
      format: 'Poem',
      title: 'Lost',
      source: 'David Wagoner',
      whyThisWhyNow: '"Stand still. The trees ahead and bushes beside you are not lost." The forest knows where you are even if you don\'t.',
    },
    {
      format: 'Song',
      title: 'Holocene',
      source: 'Bon Iver',
      whyThisWhyNow: '"And at once I knew I was not magnificent." There\'s strange comfort in smallness when everything feels too big.',
    },
    {
      format: 'Substack',
      title: 'The Art of Being Lost',
      source: 'Rebecca Solnit, adapted from A Field Guide to Getting Lost',
      whyThisWhyNow: 'She argues that getting lost is how you find what you weren\'t looking for. A love letter to disorientation.',
    },
    {
      format: 'Short story',
      title: 'The Garden of Forking Paths',
      source: 'Jorge Luis Borges',
      whyThisWhyNow: 'Every path is the right path—because every path leads somewhere. Borges makes being lost feel infinite, not empty.',
    },
    {
      format: 'Documentary',
      title: 'Jiro Dreams of Sushi',
      source: 'David Gelb, 2011',
      whyThisWhyNow: 'A man who found his one thing and gave it a lifetime. Sometimes seeing someone else\'s clarity helps you find yours.',
    },
  ],

  restless: [
    {
      format: 'Essay',
      title: 'The Crossroads of Should and Must',
      source: 'Elle Luna',
      whyThisWhyNow: 'Restlessness is often the gap between what you\'re doing and what you need to be doing. This names it.',
    },
    {
      format: 'Film',
      title: 'Frances Ha',
      source: 'Noah Baumbach, 2012',
      whyThisWhyNow: 'About being in motion without knowing where you\'re going—and finding joy in the chaos anyway.',
    },
    {
      format: 'Podcast',
      title: 'The Leap',
      source: 'How I Built This',
      whyThisWhyNow: 'Stories of people who couldn\'t sit still and did something about it. Fuel for whatever\'s brewing in you.',
    },
    {
      format: 'Poem',
      title: 'The Journey',
      source: 'Mary Oliver',
      whyThisWhyNow: '"One day you finally knew what you had to do, and began." Maybe that day is today.',
    },
    {
      format: 'Book',
      title: 'Big Magic',
      source: 'Elizabeth Gilbert',
      whyThisWhyNow: 'For when creative energy is building up with nowhere to go. She gives you permission to let it out.',
    },
    {
      format: 'Song',
      title: 'Boredom',
      source: 'Tyler, the Creator',
      whyThisWhyNow: 'Restlessness disguised as boredom—he captures the itch to become something else. The beat doesn\'t sit still either.',
    },
    {
      format: 'Myth',
      title: 'Icarus',
      source: 'Greek mythology',
      whyThisWhyNow: 'Everyone remembers the fall. But Icarus flew. Restlessness is the wax—it can burn you or lift you.',
    },
    {
      format: 'Documentary',
      title: 'Free Solo',
      source: 'Jimmy Chin & Elizabeth Chai Vasarhelyi, 2018',
      whyThisWhyNow: 'What happens when someone channels their restless energy into one impossible thing. Your palms will sweat.',
    },
    {
      format: 'Substack',
      title: 'Against Productivity',
      source: 'Mandy Brown, A Working Library',
      whyThisWhyNow: 'What if restlessness isn\'t a problem to solve? Maybe the system demanding your stillness is the problem.',
    },
    {
      format: 'Short story',
      title: 'On the Road (opening pages)',
      source: 'Jack Kerouac',
      whyThisWhyNow: '"The only people for me are the mad ones." Just the first few pages—pure restless energy before it burns out.',
    },
  ],

  stuck: [
    {
      format: 'Essay',
      title: 'The War of Art',
      source: 'Steven Pressfield',
      whyThisWhyNow: 'He names the Resistance—the thing keeping you stuck—and that alone starts to break its power.',
    },
    {
      format: 'Podcast',
      title: 'Creative Pep Talk',
      source: 'Andy J. Pizza',
      whyThisWhyNow: 'Short, punchy, designed to unstick you. Pick any episode—they all work.',
    },
    {
      format: 'Film',
      title: 'Groundhog Day',
      source: 'Harold Ramis, 1993',
      whyThisWhyNow: 'The ultimate stuck loop—and how tiny changes compound into transformation. Funnier than it sounds.',
    },
    {
      format: 'Book chapter',
      title: 'Start Where You Are',
      source: 'Pema Chödrön',
      whyThisWhyNow: 'Stuck often comes from waiting for conditions to be right. This says: they already are.',
    },
    {
      format: 'Myth',
      title: 'Sisyphus',
      source: 'Greek mythology (via Camus)',
      whyThisWhyNow: '"One must imagine Sisyphus happy." What if the boulder isn\'t punishment but practice?',
    },
    {
      format: 'Poem',
      title: 'Gate A-4',
      source: 'Naomi Shihab Nye',
      whyThisWhyNow: 'Stuck in an airport. Then a stranger shares food and everything shifts. The smallest gesture can break the loop.',
    },
    {
      format: 'Song',
      title: 'Everything In Its Right Place',
      source: 'Radiohead',
      whyThisWhyNow: 'It sounds like being stuck feels—looping, distorted—but then it finds its own strange beauty inside the loop.',
    },
    {
      format: 'Substack',
      title: 'The Gap',
      source: 'Ira Glass (via Austin Kleon)',
      whyThisWhyNow: 'Your taste exceeds your ability. That\'s why you\'re stuck. But the gap means you know what good looks like.',
    },
    {
      format: 'Short story',
      title: 'A Clean, Well-Lighted Place',
      source: 'Ernest Hemingway',
      whyThisWhyNow: 'Sometimes you just need one clear, safe place to think. Hemingway built one in under 1,500 words.',
    },
    {
      format: 'Documentary',
      title: 'Abstract: Olafur Eliasson',
      source: 'Netflix, 2019',
      whyThisWhyNow: 'Watch someone whose creative process is about getting stuck on purpose—and building art from it.',
    },
  ],

  lonely: [
    {
      format: 'Essay',
      title: 'The Lonely City',
      source: 'Olivia Laing',
      whyThisWhyNow: 'About artists who made loneliness into something beautiful. You\'re not alone in being alone.',
    },
    {
      format: 'Podcast',
      title: 'The Heart',
      source: 'Radiotopia',
      whyThisWhyNow: 'Intimate audio about love, connection, and the spaces between people. Like a friend in your ear.',
    },
    {
      format: 'Film',
      title: 'Her',
      source: 'Spike Jonze, 2013',
      whyThisWhyNow: 'About loneliness in an age of connection—and finding intimacy in unexpected places.',
    },
    {
      format: 'Poem',
      title: 'Wild Geese',
      source: 'Mary Oliver',
      whyThisWhyNow: '"You do not have to be good." Just these words might be what you need to hear right now.',
    },
    {
      format: 'Book',
      title: 'A Little Life',
      source: 'Hanya Yanagihara',
      whyThisWhyNow: 'Heavy, but about the fierce love between chosen family. Sometimes you need to feel deeply to feel less alone.',
    },
    {
      format: 'Song',
      title: 'Liability',
      source: 'Lorde',
      whyThisWhyNow: 'For when you feel like too much for other people. She turns that isolation into something proud and aching.',
    },
    {
      format: 'Myth',
      title: 'Philemon and Baucis',
      source: 'Ovid, Metamorphoses',
      whyThisWhyNow: 'An old couple opens their door to strangers. Connection doesn\'t require crowds—just one open door.',
    },
    {
      format: 'Substack',
      title: 'The Art of Showing Up',
      source: 'Rachel Wilkerson Miller',
      whyThisWhyNow: 'About building connection when it doesn\'t come naturally. Practical, warm, no toxic positivity.',
    },
    {
      format: 'Short story',
      title: 'Cathedral',
      source: 'Raymond Carver',
      whyThisWhyNow: 'Two people connect through drawing together in the dark. The most unexpected intimacy you\'ll find in fiction.',
    },
    {
      format: 'Documentary',
      title: 'Won\'t You Be My Neighbor?',
      source: 'Morgan Neville, 2018',
      whyThisWhyNow: 'Mister Rogers believed you were enough, exactly as you are. Sometimes you need to hear that from someone who means it.',
    },
  ],

  curious: [
    {
      format: 'Podcast',
      title: 'Radiolab: Words',
      source: 'WNYC',
      whyThisWhyNow: 'How language shapes thought. The kind of rabbit hole your curious mind is hungry for.',
    },
    {
      format: 'Essay',
      title: 'Consider the Lobster',
      source: 'David Foster Wallace',
      whyThisWhyNow: 'Starts with a food festival, ends up questioning everything. This is what good curiosity does.',
    },
    {
      format: 'Film',
      title: 'Arrival',
      source: 'Denis Villeneuve, 2016',
      whyThisWhyNow: 'About language, time, and what we miss when we\'re not paying attention. Beautiful and mind-bending.',
    },
    {
      format: 'Book',
      title: 'Gödel, Escher, Bach',
      source: 'Douglas Hofstadter',
      whyThisWhyNow: 'Math, art, music, consciousness—all woven together. Dense but endlessly rewarding.',
    },
    {
      format: 'Substack',
      title: 'The Ruffian',
      source: 'Ian Leslie',
      whyThisWhyNow: 'Essays on curiosity, disagreement, and thinking better. Made for minds like yours.',
    },
    {
      format: 'Poem',
      title: 'When I Heard the Learn\'d Astronomer',
      source: 'Walt Whitman',
      whyThisWhyNow: 'Sometimes the best answer to curiosity isn\'t more data—it\'s going outside and looking up. Whitman knew.',
    },
    {
      format: 'Song',
      title: 'Midnight City',
      source: 'M83',
      whyThisWhyNow: 'Pure synth wonder. It sounds like the feeling of driving toward something you haven\'t discovered yet.',
    },
    {
      format: 'Myth',
      title: 'Prometheus',
      source: 'Greek mythology',
      whyThisWhyNow: 'He stole fire for humans and paid for it forever. The original story of curiosity\'s cost—and why it\'s worth it.',
    },
    {
      format: 'Documentary',
      title: 'Particle Fever',
      source: 'Mark Levinson, 2013',
      whyThisWhyNow: 'Physicists searching for the Higgs boson. The thrill of not knowing—and the joy when the universe answers.',
    },
    {
      format: 'Short story',
      title: 'The Library of Babel',
      source: 'Jorge Luis Borges',
      whyThisWhyNow: 'A universe that IS a library. Every possible book exists. What would you search for? Borges makes you wonder.',
    },
  ],

  cozy: [
    {
      format: 'Film',
      title: 'The Holiday',
      source: 'Nancy Meyers, 2006',
      whyThisWhyNow: 'Comfort food cinema. Beautiful kitchens, soft lighting, everything works out. No shame in it.',
    },
    {
      format: 'Book',
      title: 'A Year in Provence',
      source: 'Peter Mayle',
      whyThisWhyNow: 'Slow, warm, full of food and small pleasures. Like a blanket in book form.',
    },
    {
      format: 'Podcast',
      title: 'Nothing Much Happens',
      source: 'Kathryn Nicolai',
      whyThisWhyNow: 'Bedtime stories for adults. Designed to be boring in the best way.',
    },
    {
      format: 'Essay',
      title: 'In Praise of Shadows',
      source: 'Jun\'ichirō Tanizaki',
      whyThisWhyNow: 'About finding beauty in dimness, patina, and quiet. Cozy as an aesthetic philosophy.',
    },
    {
      format: 'Song',
      title: 'Clair de Lune',
      source: 'Debussy',
      whyThisWhyNow: 'No words, just gentle piano. Let it wash over you.',
    },
    {
      format: 'Poem',
      title: 'Aimless Love',
      source: 'Billy Collins',
      whyThisWhyNow: 'He falls in love with a wren, a mouse, a bar of soap. Small, warm, and exactly the right speed.',
    },
    {
      format: 'Myth',
      title: 'Hygge and the Danish Hearth',
      source: 'Scandinavian folk tradition',
      whyThisWhyNow: 'Before hygge was a trend, it was a practice—light a candle, share bread, be present. The oldest cozy hack.',
    },
    {
      format: 'Substack',
      title: 'Things That Are Good',
      source: 'Anne Helen Petersen, Culture Study',
      whyThisWhyNow: 'A list of small, unambitious pleasures. No productivity. No growth mindset. Just good things.',
    },
    {
      format: 'Short story',
      title: 'The Secret Life of Walter Mitty',
      source: 'James Thurber',
      whyThisWhyNow: 'Daydreaming as art form. You can go on an adventure without leaving the couch.',
    },
    {
      format: 'Documentary',
      title: 'Chef\'s Table: Jeong Kwan',
      source: 'Netflix, 2017',
      whyThisWhyNow: 'A Buddhist nun who cooks temple food. No rush, no competition—just ingredients, attention, and time.',
    },
  ],

  hopeful: [
    {
      format: 'Speech',
      title: 'This Is Water',
      source: 'David Foster Wallace',
      whyThisWhyNow: 'About choosing what to pay attention to. Hope as a daily practice, not a feeling.',
    },
    {
      format: 'Film',
      title: 'WALL-E',
      source: 'Pixar, 2008',
      whyThisWhyNow: 'About love and renewal after everything falls apart. Surprisingly profound for a robot movie.',
    },
    {
      format: 'Podcast',
      title: 'The Moth: Notes on Hope',
      source: 'The Moth',
      whyThisWhyNow: 'True stories of people who found their way through. Proof that it happens.',
    },
    {
      format: 'Poem',
      title: 'Good Bones',
      source: 'Maggie Smith',
      whyThisWhyNow: '"Life is short, though I keep this from my children." Hope without illusion. That\'s the real thing.',
    },
    {
      format: 'Book',
      title: 'Braiding Sweetgrass',
      source: 'Robin Wall Kimmerer',
      whyThisWhyNow: 'Indigenous wisdom meets ecology. A reminder that reciprocity and regeneration are possible.',
    },
    {
      format: 'Essay',
      title: 'A Letter from Birmingham Jail',
      source: 'Martin Luther King Jr.',
      whyThisWhyNow: 'Written in the margins. Hope forged under pressure—not naive, not easy, but unbreakable.',
    },
    {
      format: 'Song',
      title: 'Three Little Birds',
      source: 'Bob Marley',
      whyThisWhyNow: 'You know this one. But have you really listened lately? Sometimes the simplest message is the one you need.',
    },
    {
      format: 'Myth',
      title: 'Pandora\'s Box',
      source: 'Greek mythology',
      whyThisWhyNow: 'Everything terrible escaped. But hope stayed at the bottom. The Greeks knew—hope is what survives the worst.',
    },
    {
      format: 'Substack',
      title: 'Small Things',
      source: 'Maria Popova, The Marginalian',
      whyThisWhyNow: 'She finds wonder in science, poetry, and the overlooked. A weekly reminder that the world is worth paying attention to.',
    },
    {
      format: 'Documentary',
      title: 'Apollo 11',
      source: 'Todd Douglas Miller, 2019',
      whyThisWhyNow: 'No narration, just footage. Humans went to the moon. We actually did that. Let it hit you fresh.',
    },
  ],
  bored: [
    {
      format: 'Essay',
      title: 'In Praise of Boredom',
      source: 'Joseph Brodsky, 1995 Dartmouth commencement',
      whyThisWhyNow: 'A Nobel laureate argues boredom is your window to infinity. The emptiness you\'re feeling? It\'s actually spacious.',
    },
    {
      format: 'Film',
      title: 'Stalker',
      source: 'Andrei Tarkovsky, 1979',
      whyThisWhyNow: 'Slow enough to bore you, deep enough to change you. The Zone gives back exactly what you bring to it.',
    },
    {
      format: 'Podcast',
      title: 'Bored and Brilliant',
      source: 'Note to Self, WNYC',
      whyThisWhyNow: 'What if boredom is where your best ideas are hiding? This makes the case that your restless mind needs the empty space.',
    },
    {
      format: 'Book',
      title: 'The Pleasures and Sorrows of Work',
      source: 'Alain de Botton',
      whyThisWhyNow: 'He visits biscuit factories and rocket launches with the same curiosity. Makes the mundane feel secretly fascinating.',
    },
    {
      format: 'Poem',
      title: 'Leisure',
      source: 'W.H. Davies',
      whyThisWhyNow: '"What is this life if, full of care, we have no time to stand and stare?" Boredom might just be unused attention.',
    },
    {
      format: 'Song',
      title: 'Bored in the USA',
      source: 'Father John Misty',
      whyThisWhyNow: 'A lullaby for late capitalism ennui. He\'s laughing and crying at the same time. You might too.',
    },
    {
      format: 'Myth',
      title: 'The Fisher King',
      source: 'Arthurian legend',
      whyThisWhyNow: 'A wounded king sits in a wasteland waiting for someone to ask the right question. Boredom as a wound that wants curiosity.',
    },
    {
      format: 'Documentary',
      title: 'Koyaanisqatsi',
      source: 'Godfrey Reggio, 1982',
      whyThisWhyNow: 'No plot, no dialogue. Just images and Philip Glass. It turns the ordinary world into something you\'ve never seen before.',
    },
    {
      format: 'Substack',
      title: 'Against Busyness',
      source: 'Oliver Burkeman, The Imperfectionist',
      whyThisWhyNow: 'What if boredom isn\'t a problem but a signal that you\'ve stopped performing productivity? That might be progress.',
    },
    {
      format: 'Short story',
      title: 'Bartleby, the Scrivener',
      source: 'Herman Melville',
      whyThisWhyNow: '"I would prefer not to." The patron saint of refusal. Sometimes boredom is quiet rebellion against doing things that don\'t matter.',
    },
  ],
};

// Pick 5 random recommendations ensuring format variety
function pickFive(pool) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  const picked = [];
  const usedFormats = new Set();

  // First pass: pick one of each format
  for (const rec of shuffled) {
    if (picked.length >= 5) break;
    if (!usedFormats.has(rec.format)) {
      picked.push(rec);
      usedFormats.add(rec.format);
    }
  }

  // If we still need more (unlikely with 10 diverse recs), fill from remaining
  if (picked.length < 5) {
    for (const rec of shuffled) {
      if (picked.length >= 5) break;
      if (!picked.includes(rec)) {
        picked.push(rec);
      }
    }
  }

  // Shuffle the final 5 so featured card varies
  return picked.sort(() => Math.random() - 0.5);
}

// Streaming function — calls SSE endpoint, fires callback per recommendation
export async function getRecommendationsStream(mood, context = '', onRecommendation) {
  console.log('[Tender] Starting stream:', { mood, context: context.substring(0, 100) });
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    const response = await fetch('/api/recommendations/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, context }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Stream request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Parse SSE events from buffer
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep incomplete line in buffer

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();

        if (data === '[DONE]') {
          console.log('[Tender] Stream complete');
          return;
        }
        if (data === '[ERROR]') {
          throw new Error('Stream error from server');
        }

        try {
          const rec = JSON.parse(data);
          console.log('[Tender] Streamed rec:', rec.title);
          onRecommendation(rec);
        } catch (e) {
          // Not valid JSON, skip
        }
      }
    }
  } catch (error) {
    console.error('[Tender] Stream ERROR — falling back to batch:', error.message);
    // Fall back to batch API, then deliver all at once
    const pool = mockRecommendations[mood] || mockRecommendations.curious;
    const recs = pickFive(pool);
    for (const rec of recs) {
      onRecommendation(rec);
    }
  }
}

// Function to get recommendations from the API
export async function getRecommendations(mood, context = '') {
  console.log('[Tender] Sending to API:', { mood, context: context.substring(0, 100) + (context.length > 100 ? '...' : '') });
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood, context }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    console.log('[Tender] API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('[Tender] Got recommendations from API:', data.recommendations?.map(r => r.title));
    return data.recommendations;
  } catch (error) {
    console.error('[Tender] API ERROR — falling back to curated library:', error.message);
    // Fall back to curated library
    const pool = mockRecommendations[mood] || mockRecommendations.curious;
    return pickFive(pool);
  }
}
