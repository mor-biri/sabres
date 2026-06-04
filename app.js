/* ── Toast ─────────────────────────────────────────────────── */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Mobile nav ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (hamburger && links) {
    hamburger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
});

/* ── Dictionary ────────────────────────────────────────────── */
const SLANG = [
  { term: 'סבבה', trans: 'Sababa', meaning: 'Cool / OK / Great', example: '"The plan? Sababa." — Everything's fine.' },
  { term: 'יאללה', trans: "Yalla", meaning: "Let's go / Come on", example: '"Yalla, we're going to be late!"' },
  { term: 'אחלה', trans: 'Achla', meaning: 'Awesome / Excellent', example: '"That falafel was achla."' },
  { term: 'ואחד', trans: "V'ekhad", meaning: 'And one — emphasis of something being top notch', example: '"That was a meal v\'ekhad."' },
  { term: 'חאבר', trans: 'Khaver', meaning: 'Friend / Buddy', example: '"Hey khaver, what are you up to tonight?"' },
  { term: 'בלגן', trans: 'Balagan', meaning: 'Chaos / Mess', example: '"The traffic downtown is a total balagan."' },
  { term: 'פרייאר', trans: 'Frayer', meaning: 'A sucker / someone who gets taken advantage of', example: '"Don't be a frayer — negotiate the price."' },
  { term: 'דוגרי', trans: 'Dugri', meaning: 'Straight talk / being blunt', example: '"Tell me dugri — do you like it or not?"' },
  { term: 'נודניק', trans: 'Nudnik', meaning: 'An annoying, pestering person', example: '"That nudnik called me five times today."' },
  { term: 'ביגוד', trans: 'Bigod', meaning: 'Wow / No way (mild oath)', example: '"Bigod, you actually finished the whole pizza?"' },
  { term: 'ווי', trans: 'Wai', meaning: 'Oh my / Oh no (exclamation)', example: '"Wai, I totally forgot my keys."' },
  { term: 'מגניב', trans: 'Magniv', meaning: 'Cool / Awesome', example: '"That concert was magniv."' },
];

function initDictionary() {
  const grid = document.getElementById('dict-grid');
  const search = document.getElementById('dict-search');
  if (!grid) return;

  function render(list) {
    grid.innerHTML = list.length ? list.map(s => `
      <article class="card dict-card">
        <div class="dict-hebrew">${s.term}</div>
        <div class="dict-trans">${s.trans}</div>
        <div class="dict-meaning">${s.meaning}</div>
        <div class="dict-example">${s.example}</div>
      </article>`).join('') :
      '<p class="no-results">No slang found. Try a different search.</p>';
  }

  render(SLANG);
  search.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim();
    render(q ? SLANG.filter(s =>
      s.trans.toLowerCase().includes(q) ||
      s.meaning.toLowerCase().includes(q) ||
      s.term.includes(q)
    ) : SLANG);
  });
}

/* ── Trivia ────────────────────────────────────────────────── */
const TRIVIA = [
  {
    q: 'What does "Sababa" (סבבה) mean?',
    options: ['Danger', 'Cool / OK', 'Hungry', 'Tired'],
    correct: 1,
    explanation: 'Sababa is one of the most common Israeli slang words, meaning everything is great or fine.'
  },
  {
    q: 'Which Hebrew letter comes first in the alphabet?',
    options: ['Bet', 'Alef', 'Gimel', 'Dalet'],
    correct: 1,
    explanation: 'Alef (א) is the first letter of the Hebrew alphabet.'
  },
  {
    q: '"Balagan" (בלגן) originally comes from which language?',
    options: ['Arabic', 'Yiddish', 'Russian', 'Turkish'],
    correct: 2,
    explanation: 'Balagan comes from Russian (балаган), meaning a fair stall or farce, and entered Hebrew meaning chaos.'
  },
  {
    q: 'What does "Yalla" (יאללה) mean in everyday Israeli speech?',
    options: ["Let's go / Come on", 'Goodbye', 'Welcome', 'Help!'],
    correct: 0,
    explanation: 'Yalla, borrowed from Arabic, is used to urge someone to hurry up or to say "let\'s go."'
  },
  {
    q: 'What is a "Frayer" (פרייאר)?',
    options: ['A street food vendor', 'Someone who gets taken advantage of', 'A type of bread', 'A close friend'],
    correct: 1,
    explanation: 'In Israeli culture, being a frayer (a sucker) is something to avoid at all costs — people are very conscious of not being seen as one.'
  },
  {
    q: 'How do you say "thank you" in Hebrew?',
    options: ['Shalom', 'Bevakasha', 'Toda', 'Lehitraot'],
    correct: 2,
    explanation: '"Toda" (תודה) means thank you. "Toda raba" means thank you very much.'
  },
  {
    q: 'What does "Dugri" (דוגרי) mean?',
    options: ['A type of food', 'Speaking straight / being blunt', 'A neighborhood in Tel Aviv', 'Very hot weather'],
    correct: 1,
    explanation: 'Dugri means speaking directly and honestly — Israelis are known for their dugri communication style.'
  },
];

let triviaIndex = 0;
let answered = false;

function initTrivia() {
  if (!document.getElementById('trivia-question')) return;
  shuffleTrivia();
  renderTrivia();
}

function shuffleTrivia() {
  for (let i = TRIVIA.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [TRIVIA[i], TRIVIA[j]] = [TRIVIA[j], TRIVIA[i]];
  }
}

function renderTrivia() {
  const q = TRIVIA[triviaIndex % TRIVIA.length];
  answered = false;

  document.getElementById('trivia-question').textContent = q.q;
  document.getElementById('trivia-counter').textContent = `Question ${(triviaIndex % TRIVIA.length) + 1} of ${TRIVIA.length}`;
  document.getElementById('trivia-explanation').style.display = 'none';
  document.getElementById('trivia-next').style.display = 'none';

  const opts = document.getElementById('trivia-options');
  opts.innerHTML = q.options.map((o, i) => `
    <button class="trivia-option" data-idx="${i}" onclick="answerTrivia(${i})">${o}</button>
  `).join('');
}

function answerTrivia(chosen) {
  if (answered) return;
  answered = true;
  const q = TRIVIA[triviaIndex % TRIVIA.length];
  document.querySelectorAll('.trivia-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  });
  document.getElementById('trivia-explanation').textContent = q.explanation;
  document.getElementById('trivia-explanation').style.display = 'block';
  document.getElementById('trivia-next').style.display = 'inline-flex';
}

function nextTrivia() {
  triviaIndex++;
  renderTrivia();
}

/* ── Community modal ───────────────────────────────────────── */
function openAskModal() {
  document.getElementById('ask-modal').classList.add('open');
}
function closeAskModal() {
  document.getElementById('ask-modal').classList.remove('open');
}
function submitQuestion(e) {
  e.preventDefault();
  closeAskModal();
  e.target.reset();
  showToast('✅ Your question was posted!');
}

/* ── Upvote ────────────────────────────────────────────────── */
function upvote(btn) {
  const count = btn.querySelector('.vote-count');
  const current = parseInt(count.textContent);
  if (btn.classList.toggle('voted')) {
    count.textContent = current + 1;
    btn.setAttribute('aria-pressed', 'true');
  } else {
    count.textContent = current - 1;
    btn.setAttribute('aria-pressed', 'false');
  }
}

/* ── Playlist export ───────────────────────────────────────── */
function exportPlaylist(platform) {
  const query = encodeURIComponent('Israeli classic songs');
  const urls = {
    spotify: `https://open.spotify.com/search/${query}`,
    apple:   `https://music.apple.com/search?term=${query}`,
  };
  window.open(urls[platform], '_blank', 'noopener');
  showToast(platform === 'spotify' ? '🎵 Opening in Spotify…' : '🎵 Opening in Apple Music…');
}

/* ── Init ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initDictionary();
  initTrivia();
});
