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
  { term: 'סבבה', trans: 'Sababa', meaning: 'Cool / OK / Great', example: '"The plan? Sababa." — Everything is fine.' },
  { term: 'יאללה', trans: "Yalla", meaning: "Let's go / Come on", example: '"Yalla, we are going to be late!"' },
  { term: 'אחלה', trans: 'Achla', meaning: 'Awesome / Excellent', example: '"That falafel was achla."' },
  { term: 'ואחד', trans: "V'ekhad", meaning: 'And one — emphasis of something being top notch', example: '"That was a meal v\'ekhad."' },
  { term: 'חאבר', trans: 'Khaver', meaning: 'Friend / Buddy', example: '"Hey khaver, what are you up to tonight?"' },
  { term: 'בלגן', trans: 'Balagan', meaning: 'Chaos / Mess', example: '"The traffic downtown is a total balagan."' },
  { term: 'פרייאר', trans: 'Frayer', meaning: 'A sucker / someone who gets taken advantage of', example: '"Do not be a frayer — negotiate the price."' },
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
    // Easy
    q: '😎 Level 1 — Your new Israeli friend texts back "סבבה" (Sababa). What do they mean?',
    options: ['I\'m busy, can\'t make it', 'Sounds great, I\'m in!', 'Where are you?', 'Call me later'],
    correct: 1,
    explanation: 'Sababa = "cool" / "all good." It\'s the most common positive word in Israeli slang — you\'ll hear it dozens of times a day.'
  },
  {
    // Easy
    q: '🏃 Level 2 — Your roommate shouts "יאללה!" (Yalla) while you\'re still getting ready. What do they want?',
    options: ['Sit down and relax', 'Hurry up, let\'s go!', 'Be quiet please', 'Come eat dinner'],
    correct: 1,
    explanation: 'Yalla (from Arabic يلا) means "let\'s go" or "come on." It\'s the Israeli way of saying "move it!" — used dozens of times a day, often doubled: "Yalla yalla!"'
  },
  {
    // Medium
    q: '🛒 Level 3 — You paid full price for a watermelon at the shuk without haggling. Your friend shakes their head and calls you a "פרייאר" (Frayer). What did you just do wrong?',
    options: ['You bought a bad watermelon', 'You forgot to say thank you', 'You let yourself get ripped off', 'You cut the line'],
    correct: 2,
    explanation: 'A frayer is a sucker — someone who gets taken advantage of. In Israeli culture, not haggling is basically an invitation to be overcharged. Never be a frayer at the shuk!'
  },
  {
    // Medium
    q: '💬 Level 4 — An Israeli colleague says they\'ll give you feedback "דוגרי" (Dugri). Should you brace yourself?',
    options: ['No — it means they\'ll be gentle and diplomatic', 'Yes — it means they\'ll be brutally honest and direct', 'It means they\'ll send it in writing', 'It means they\'ll ask someone else to tell you'],
    correct: 1,
    explanation: 'Dugri means straight-talking, no sugar-coating. Israelis wear it as a badge of honor. It can feel blunt to newcomers, but it\'s meant as respect — they\'re not wasting your time.'
  },
  {
    // Medium
    q: '🌀 Level 5 — You walk into an Israeli office on a Monday morning: phones ringing, three conversations happening at once, someone\'s dog is there, and no one knows where the meeting is. One word sums this up perfectly:',
    options: ['Sababa', 'Magniv', 'Balagan', 'Achi'],
    correct: 2,
    explanation: 'Balagan (בלגן) = total chaos / glorious mess, originally from Russian. It\'s not always negative — many Israelis thrive in the balagan. "Ze balagan gadol" = "this is a huge mess."'
  },
  {
    // Hard
    q: '🧠 Level 6 — Match the slang to the situation: someone is being overly generous, optimistic, and a little naive about a business deal. Israelis would most likely say they are being…',
    options: ['Dugri', 'A Frayer', 'Achla', 'Chutzpan'],
    correct: 1,
    explanation: 'Being a frayer isn\'t just about money — it applies to any situation where you\'re seen as too trusting or letting others take advantage. Israeli street-smartness is all about NOT being the frayer in the room.'
  },
  {
    // Hard
    q: '🏆 Level 7 — Which of these phrases is NOT real Israeli slang?',
    options: ['"Yalla bye" — ending a phone call', '"Sababa magniv" — double compliment meaning super cool', '"Frayer balagan" — a chaotic sucker', '"Walla" — expressing genuine surprise or emphasis'],
    correct: 2,
    explanation: '"Frayer balagan" is not a real phrase — you wouldn\'t combine them like that. But the others are all real: "Yalla bye" ends calls, "Sababa magniv" is a real double compliment, and "Walla" (from Arabic والله) is used constantly to mean "wow" or "seriously?"'
  },
];

let triviaIndex = 0;
let answered = false;
let triviaScore = 0;

function initTrivia() {
  if (!document.getElementById('trivia-question')) return;
  renderTrivia();
}

function renderTrivia() {
  const total = TRIVIA.length;
  const q = TRIVIA[triviaIndex];
  answered = false;

  document.getElementById('trivia-question').textContent = q.q;
  document.getElementById('trivia-counter').textContent = `Question ${triviaIndex + 1} of ${total}`;
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
  const q = TRIVIA[triviaIndex];
  const correct = chosen === q.correct;
  if (correct) triviaScore++;

  document.querySelectorAll('.trivia-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  });
  document.getElementById('trivia-explanation').textContent = q.explanation;
  document.getElementById('trivia-explanation').style.display = 'block';

  const isLast = triviaIndex === TRIVIA.length - 1;
  const nextBtn = document.getElementById('trivia-next');
  nextBtn.textContent = isLast ? 'See My Results 🎯' : 'Next Question →';
  nextBtn.style.display = 'inline-flex';
}

function nextTrivia() {
  if (triviaIndex === TRIVIA.length - 1) {
    showResults();
    return;
  }
  triviaIndex++;
  const pct = ((triviaIndex) / TRIVIA.length) * 100;
  document.getElementById('trivia-bar').style.width = pct + '%';
  renderTrivia();
}

function showResults() {
  const total = TRIVIA.length;
  const pct = Math.round((triviaScore / total) * 100);

  document.getElementById('trivia-bar').style.width = '100%';

  // Hide quiz, show results
  document.getElementById('trivia-question').style.display = 'none';
  document.getElementById('trivia-options').style.display = 'none';
  document.getElementById('trivia-explanation').style.display = 'none';
  document.getElementById('trivia-next').style.display = 'none';
  document.getElementById('trivia-counter').style.display = 'none';
  document.querySelector('.trivia-meta').style.display = 'none';

  document.getElementById('result-correct').textContent = triviaScore;
  document.getElementById('result-wrong').textContent = total - triviaScore;
  document.getElementById('result-pct').textContent = pct + '%';
  document.getElementById('result-score').textContent = `${triviaScore}/${total}`;

  let emoji, label, msg;
  if (pct === 100) {
    emoji = '🏆'; label = 'Perfect Score! Sababa!';
    msg = 'You nailed every question — you are basically an honorary Israeli. Next step: argue about hummus recipes and say "Yalla bye" on every phone call.';
  } else if (pct >= 71) {
    emoji = '🎉'; label = 'Great job — almost a Tzabar!';
    msg = 'You clearly paid attention. A few more shuk visits and some late-night falafel runs and you will fit right in.';
  } else if (pct >= 43) {
    emoji = '📖'; label = 'Not bad — keep learning!';
    msg = 'You know the basics but there is more slang to absorb. Spend some time in the dictionary and give it another shot.';
  } else {
    emoji = '🌱'; label = 'Just getting started!';
    msg = 'No worries — everyone starts somewhere. Browse the slang dictionary, then come back and crush this quiz.';
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-label').textContent = label;
  document.getElementById('result-msg').textContent = msg;
  document.getElementById('trivia-results').style.display = 'block';
}

function restartTrivia() {
  triviaIndex = 0;
  triviaScore = 0;

  document.getElementById('trivia-results').style.display = 'none';
  document.getElementById('trivia-question').style.display = '';
  document.getElementById('trivia-options').style.display = '';
  document.getElementById('trivia-counter').style.display = '';
  document.querySelector('.trivia-meta').style.display = '';
  document.getElementById('trivia-bar').style.width = (1 / TRIVIA.length * 100) + '%';

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
