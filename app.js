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
    q: 'You text your Israeli friend about weekend plans and they reply "סבבה" (Sababa). What do they mean?',
    options: ['They\'re busy and can\'t make it', 'Sounds good, they\'re in', 'They need more details', 'They\'re running late'],
    correct: 1,
    explanation: 'Sababa means "cool" or "all good" — your friend is on board! It\'s one of the most used words in Israeli daily conversation.'
  },
  {
    q: 'Your coworker says you\'re a "פרייאר" (Frayer) for paying full price at the shuk. What are they calling you?',
    options: ['A generous tipper', 'A smart shopper', 'A sucker who got ripped off', 'A loyal customer'],
    correct: 2,
    explanation: 'A frayer is someone who gets taken advantage of. In Israeli culture, haggling is expected — paying full price at the market without negotiating is the classic frayer move.'
  },
  {
    q: 'A colleague ends every phone call with "יאללה ביי" (Yalla bye). What does this phrase come from?',
    options: ['Two Hebrew words', 'Arabic + English', 'Russian + Hebrew', 'Yiddish + English'],
    correct: 1,
    explanation: '"Yalla" comes from Arabic (يلا) meaning "let\'s go," and "bye" is English. This mix perfectly reflects Israeli street language — casual, fast, and multicultural.'
  },
  {
    q: 'Your neighbor invites you in and keeps refilling your plate even after you said you\'re full. This is an example of:',
    options: ['Bad manners in Israeli culture', 'A classic expression of Israeli hospitality', 'A hint that you should leave', 'A religious custom'],
    correct: 1,
    explanation: 'In Israeli culture, insisting guests eat more is a deep expression of hospitality and warmth. Saying "lo toda" (no thank you) several times is totally normal — your host expects it!'
  },
  {
    q: 'Which iconic song, written by Naomi Shemer in 1967, became an unofficial anthem of Jerusalem?',
    options: ['Eretz Eretz Eretz', 'Erev Shel Shoshanim', 'Yerushalayim Shel Zahav', 'Layla Layla'],
    correct: 2,
    explanation: '"Jerusalem of Gold" (ירושלים של זהב) was written just before the Six-Day War and became one of the most beloved Israeli songs ever. Every Israeli knows every word.'
  },
  {
    q: 'Someone describes their friend as talking "דוגרי" (Dugri). What does this say about how they communicate?',
    options: ['They speak very quietly', 'They are very funny', 'They are blunt and direct', 'They speak too fast'],
    correct: 2,
    explanation: 'Dugri means straight-talking, no beating around the bush. Israelis are famously dugri — they\'ll tell you exactly what they think. It\'s considered a virtue, not rudeness.'
  },
  {
    q: 'You join a WhatsApp group of Israeli colleagues. Within minutes it\'s full of voice messages, memes, and 47 unread texts. This chaos is best described as:',
    options: ['Balagan', 'Dugri', 'Sababa', 'Frayer'],
    correct: 0,
    explanation: 'Balagan (בלגן) means total chaos or mess — originally from Russian. An Israeli WhatsApp group is the ultimate balagan, and locals wouldn\'t have it any other way.'
  },
  {
    q: 'What does "אחלה" (Achla) mean when an Israeli says it after tasting your cooking?',
    options: ['It needs more salt', 'It\'s just okay', 'It\'s amazing / excellent', 'I\'m still hungry'],
    correct: 2,
    explanation: 'Achla (from Arabic أحلى) means awesome or excellent. If an Israeli says "achla ochel!" about your food, you nailed it — that\'s the highest compliment at the table.'
  },
  {
    q: 'The word "חוצפה" (Chutzpah) is used worldwide. What does it actually mean in Israeli culture?',
    options: ['Extreme shyness', 'Audacity / boldness verging on impudence', 'Great cooking', 'Deep wisdom'],
    correct: 1,
    explanation: 'Chutzpah means audacity or nerve — doing something bold without shame. In Yiddish and Hebrew it\'s often negative, but in modern usage it can mean admirable guts too.'
  },
  {
    q: 'It\'s Friday afternoon in Israel. Shops close early, traffic is crazy, and everyone\'s rushing home. What are they preparing for?',
    options: ['A football match', 'Shabbat (the Jewish Sabbath)', 'A national holiday', 'The weekly market'],
    correct: 1,
    explanation: 'Shabbat starts Friday at sundown and ends Saturday night. It\'s the heartbeat of Israeli weekly life — even secular Israelis gather for family dinners. "Shabbat Shalom!" is the greeting you\'ll hear all day Friday.'
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
