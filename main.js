/* ==========================================================================
   VISHNU M C NAIR — CINEMATIC SCRIPTWRITER & AUTHOR PORTAL
   Creative Technologist & Interactive Logic Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticleCanvas();
  initCustomCursor();
  initMagneticElements();
  init3DParallaxTilt();
  initWebAudioDrone();
  initNavigationScroll();
  initLiveClocks();
  initMetricsCounter();
  initLoreTabs();
  initReaderModal();
  initClipboardAndForms();
  initReadMoreToggle();
  initHeroVideoBanner();
});

/* --------------------------------------------------------------------------
   1. Dynamic Background Particle Canvas (Electric Embers & Solar Dust)
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleColors = [
    { r: 255, g: 75, b: 38 },   // Electric Ember
    { r: 255, g: 183, b: 3 },   // Solar Gold
    { r: 0, g: 242, b: 254 },   // Cosmic Cyan
    { r: 180, g: 90, b: 240 },  // Mythic Violet
    { r: 0, g: 245, b: 160 }    // Jade Teal
  ];

  const particles = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    const col = particleColors[Math.floor(Math.random() * particleColors.length)];
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.5 + 0.12),
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.7 + 0.25,
      pulseSpeed: Math.random() * 0.025 + 0.008,
      color: col
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const dxNorm = (mouseX - width / 2) * 0.00012;
    const dyNorm = (mouseY - height / 2) * 0.00012;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY + dyNorm * 7;
      p.x += p.speedX + dxNorm * 7;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.007;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      const alpha = isLight
        ? Math.max(0.3, Math.min(0.85, p.opacity * 0.8))
        : Math.max(0.18, Math.min(0.95, p.opacity));

      // Draw particle circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
      ctx.shadowBlur = isLight ? 6 : 14;
      ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.9})`;
      ctx.fill();

      // Subtle connection lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 65) {
          const lineAlpha = (1 - dist / 65) * (isLight ? 0.12 : 0.22);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Custom Interactive Cursor (Smooth Trailing Ring)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  const interactiveElements = document.querySelectorAll(
    'a, button, input, select, textarea, .saga-book-card, .identity-card, .lore-tab-btn'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* --------------------------------------------------------------------------
   3. Magnetic Buttons (Tactile Anti-Gravity Physics)
   -------------------------------------------------------------------------- */
function initMagneticElements() {
  const magneticEls = document.querySelectorAll('.btn-magnetic');

  magneticEls.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   4. Minimal Parallax Tilt with Soft Micro-Glare
   -------------------------------------------------------------------------- */
function init3DParallaxTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach((card) => {
    const glare = card.querySelector('.card-glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Minimal tilt angle (max 2deg) for clean, subtle interaction
      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;

      if (glare) {
        glare.style.opacity = '0.35';
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Procedural Cinematic Ambient Audio Drone (Blade Runner / Dune Style)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let isAudioPlaying = false;
let masterGain = null;
let oscNodes = [];

function initWebAudioDrone() {
  const audioBtn = document.getElementById('audio-synth-toggle');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    if (!audioCtx) {
      setupSynthesizer();
    }

    if (isAudioPlaying) {
      masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.6);
      audioBtn.classList.remove('active');
      audioBtn.querySelector('.audio-label-text').textContent = 'AMBIENT SOUND';
      isAudioPlaying = false;
    } else {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      masterGain.gain.setTargetAtTime(0.09, audioCtx.currentTime, 0.8);
      audioBtn.classList.add('active');
      audioBtn.querySelector('.audio-label-text').textContent = 'SOUND ACTIVE';
      isAudioPlaying = true;
    }
  });
}

function setupSynthesizer() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);

  // Cinematic lowpass filter
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(240, audioCtx.currentTime);

  // Harmonic chord pad (D2, A2, D3, F#3)
  const frequencies = [73.42, 110.0, 146.83, 185.0];
  const types = ['sine', 'triangle', 'sine', 'sine'];

  frequencies.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    osc.type = types[idx];
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Micro detune LFO for atmospheric analog drift
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.12 + idx * 0.05, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(2.5, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.detune);
    lfo.start();

    osc.connect(filter);
    osc.start();
    oscNodes.push(osc);
  });

  filter.connect(masterGain);
  masterGain.connect(audioCtx.destination);
}

/* --------------------------------------------------------------------------
   6. Navigation Scroll & Mobile Toggle
   -------------------------------------------------------------------------- */
function initNavigationScroll() {
  const nav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu trigger
  const toggleBtn = document.getElementById('mobile-nav-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = isLight ? 'rgba(244, 246, 249, 0.98)' : 'rgba(8, 8, 12, 0.98)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '2rem';
        navMenu.style.borderBottom = '1px solid var(--border-subtle)';
      }
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1180) {
          navMenu.style.display = 'none';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   7. Live Real-Time Clocks (IST and UTC HUD)
   -------------------------------------------------------------------------- */
function initLiveClocks() {
  const istEl = document.getElementById('live-ist-time');
  const utcEl = document.getElementById('live-utc-time');

  function update() {
    const now = new Date();

    // UTC
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    if (utcEl) utcEl.textContent = `UTC ${utcHours}:${utcMinutes}:${utcSeconds}`;

    // IST (+5:30)
    const istTime = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
    const istHours = String(istTime.getHours()).padStart(2, '0');
    const istMinutes = String(istTime.getMinutes()).padStart(2, '0');
    const istSeconds = String(istTime.getSeconds()).padStart(2, '0');
    if (istEl) istEl.textContent = `IST ${istHours}:${istMinutes}:${istSeconds}`;
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   8. HUD Metrics Counter (Animated on Intersection)
   -------------------------------------------------------------------------- */
function initMetricsCounter() {
  const statValues = document.querySelectorAll('.stat-count-target');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';

          animateCounter(el, target, decimals, suffix);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statValues.forEach((el) => observer.observe(el));
}

function animateCounter(element, target, decimals, suffix) {
  let start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
    const currentVal = start + (target - start) * easeProgress;

    element.textContent = currentVal.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

/* --------------------------------------------------------------------------
   9. Interactive Lore Nexus Tabs
   -------------------------------------------------------------------------- */
function initLoreTabs() {
  const tabs = document.querySelectorAll('.lore-tab-btn');
  const panels = document.querySelectorAll('.lore-panel-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-lore-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Interactive Sample Chapter Reader Modal (Bilingual & Font Size)
   -------------------------------------------------------------------------- */
const bookExcerpts = {
  akhinathante: {
    title: 'Akhinathante Nidhi (Part I)',
    chapter: 'Kanthamala Saga – Akhinathen’s Treasure (അഖിനാഥന്റെ നിധി)',
    currentLang: 'en',
    en: `
      <p>In the mystical land of India, there stood a temple known as Kanthamala, revered as much as the Vaikunda of Maha Vishnu and the Kailash of Lord Shiva. This sacred site was one of the five Shasta temples consecrated by the legendary Parashurama. It all started when Mithun crossed paths with Krishnan Nair for his documentary based on Kanthamala and its hidden secrets.</p>
      <p>Mithun, realizing the gravity of the situation after witnessing Nair’s agitation and excuses, sought the assistance of Sujeesh, a prominent Malayaraya activist. Mithun’s quest for truth posed a significant threat to Nair and his gang, who had previously targeted Kanthamala. In a desperate attempt to silence Mithun, they plotted against him. Sujeesh, aware of the danger, temporarily relocated Mithun to Vaidyar Palli.</p>
      <p>Vaidyar Baba, a descendant of the revered Vavar, was renowned throughout Arolakkad and the neighboring villages for his unparalleled healing abilities. No ailment was beyond his cure. Meanwhile, Sreejith, Nair’s nephew, arrived in Arolakkadu despite the forest guards’ warnings. The forest was a place of mystery and danger, where outsiders were forbidden entry.</p>
      <p>This journey led him back in time to Egypt, during the year B.C. 1334. A grand spring festival was underway in Thebes, the capital, where emperors and businessmen from across the globe gathered to celebrate. Yet, Amenhotep IV, the youngest of Amenhotep III’s five children, was conspicuously absent. This exclusion began when the high priest Thamos branded him ‘Abominated by the god Amun’, citing his lack of royal status and deformity from birth. The saga of blood-soaked conflicts against entrenched priesthoods, juxtaposed with riveting sci-fi elements like time travel and the fusion of Indian and Egyptian mythology, delivers an electrifying reading odyssey.</p>
    `,
    ml: `
      <p class="malayalam-text">ബാവ കൈമാറിയ ആ പഴയ തോൽക്കെട്ടു പുസ്തകം മിഥുന്റെ കൈകളിൽ കനത്തു തൂങ്ങി. പശ്ചിമഘട്ടത്തിന്റെ തണുത്ത മഞ്ഞുതുള്ളികൾ അതിനുമേൽ മുത്തമിട്ടു നിൽക്കുന്നുണ്ടായിരുന്നു.</p>
      <p class="malayalam-text">"ഈ താളുകളിൽ അക്ഷരങ്ങളില്ല മിഥുൻ," ബാവയുടെ ശബ്ദം ഒരു മന്ത്രണം പോലെ കേട്ടു. "കാന്തമലയുടെ ചരിത്രം കഴിഞ്ഞുപോയ ഒന്നല്ല... അത് വരാനിരിക്കുന്ന വിധിയോട് പ്രതികരിക്കുന്ന ഒന്നാണ്."</p>
      <p class="malayalam-text">മിഥുൻ പുസ്തകം തുറന്നു. ആദ്യമത് വെറും ശൂന്യമായ താളുകളായിരുന്നു. എന്നാൽ ശബരീമലയുടെ വിദൂരമായ സന്ധ്യാദീപ നാളം ആ താളുകളിൽ പതിഞ്ഞപ്പോൾ, ചുവന്ന ലിപികൾ തെളിഞ്ഞുവരാൻ തുടങ്ങി. അത് കേവലം പ്രാചീന മലയാളമോ സംസ്കൃതമോ ആയിരുന്നില്ല; ഈജിപ്തിലെ അഖിനാതൻ ഫറവോയുടെ സൂര്യമുദ്രകൾ കാന്തമലയിലെ രഹസ്യ ക്ഷേത്രത്തിന്റെ രേഖകളുമായി ഇടകലർന്നു കിടക്കുകയായിരുന്നു!</p>
    `,
  },
  arolakkadinte: {
    title: 'Arolakkadinte Rahasyam (Part II)',
    chapter: 'Kanthamala Saga – The Mystery of Arolakkadu (അറോലക്കാടിന്റെ രഹസ്യം)',
    currentLang: 'en',
    en: `
      <p>In ancient Egypt, though pharaohs held the title of rulers, it was the priests who wielded true power. The high priest of the temple of Amun-Ra in Thebes, Thamos, was the voice they all followed. Meanwhile, the common people faced the harsh realities of racism and poverty. In the village of Khasut, the villagers struggled to make ends meet.</p>
      <p>B.C. 1352, Sreejith arrived in Amarna, Egypt, inside a temple in the desert mirroring the one in Arolakkadu, through the gateway of the Arola Temple. It was Sreejith who resurrected the dead Amenhotep IV, who then ruled Egypt as Akhinathen for sixteen years with the aid of the Stone of Life and the Medjei troop. This Medjei troop evolved into the present-day International Secret Society, led by Adam Sabra.</p>
      <p>In Tamil Nadu, under Pandya rule, the Arayas, descendants of the Ay dynasty who worshipped Lord Shiva, were deemed inferior by the Pandyas, who followed the path of Lord Vishnu. Despite their significant contributions to the treasury through fishing and pearling, the Arayas were barred from the palace and capital.</p>
      <p>Ayyappan always wore the Stone of Life, which held a crucial part in his birth, around his neck, which is how it got its name Ayyanar Mani. Ayyappan harbored a deep grudge against the Udayanan’s Marava army that had killed his father, and enslaved the entire Malayalanadu.</p>
    `,
    ml: `
      <p class="malayalam-text">അറോലക്കാടിന്റെ വനാന്തരങ്ങൾ സാധാരണ ഭൗതിക നിയമങ്ങളെ വെല്ലുവിളിക്കുന്നവയായിരുന്നു. നൂറ്റാണ്ടുകൾ പഴക്കമുള്ള കൂറ്റൻ മരങ്ങൾക്കിടയിൽ പച്ച വെളിച്ചം ചിന്തുന്ന ജൈവപ്രഭ തെളിഞ്ഞുനിന്നു.</p>
      <p class="malayalam-text">ചേര സാമ്രാജ്യത്തിന്റെ കാലഘട്ടത്തിലെ പ്രാചീന ശിലാസ്തംഭങ്ങൾ മരപ്പൊത്തുകളിൽ മറഞ്ഞിരിക്കുന്നു. മിഥുനും സംഘവും കാടിന്റെ ഉള്ളിലേക്ക് നീങ്ങുന്തോറും ദിശാസൂചികൾ ഭ്രാന്തമായി കറങ്ങാൻ തുടങ്ങി. സമയം അവിടെ തലകീഴായി മറിയുകയായിരുന്നു!</p>
    `,
  },
  yuddhakandam: {
    title: 'Yuddhakandam (Part III - Climax)',
    chapter: 'Kanthamala Saga – The War (യുദ്ധകാണ്ഡം)',
    currentLang: 'en',
    en: `
      <p>In the year AD 1142, the Kurinjimala forest echoed with the sounds of a hunting party led by Prince Rajarajan, the son of the Chola emperor Kulothungan, who ruled over southern India. The prince and his companions were in pursuit of tigers when they were ambushed by Udayanan and Chinna, the forest’s inhabitants.</p>
      <p>As Udayanan focused on administrative matters, his sister Chinna emerged as the formidable Chinnathai, the living fighting goddess of the Marava army. To liberate their country from the Marava’s rule, Ayyappan and his friend Kochukadutha rallied the princely states of Panthalam, Poonjar, Kayamkulam, and Mavelikkara, forming a formidable army. They received crucial support from Poonkodi of the Cheerappanchira Kalari and Veluthachan, the vicar of the Arthungal Church. Babar, a skilled warrior and pioneer in Unani medicine from Turkistan, joined their alliance, who would later be known as the legend Vavar Swami.</p>
      <p>Finally, Panchami and Mithun recovered the Ayyanarmani during a brief 180-second moment when the moon turned red on the supermoon day that occurred every 27 years. Within days, they restored the universe’s balance by returning it to the Kanthamala temple in the Arolakkadu.</p>
    `,
    ml: `
      <p class="malayalam-text">പതിനെട്ടു മലനിരകളെയും നടുക്കിക്കൊണ്ട് അന്തിമ യുദ്ധത്തിന്റെ ഇടിമുഴക്കങ്ങൾ മുഴങ്ങി. കാന്തമലയുടെ മഞ്ഞുമൂടിയ കൊടുമുടിക്ക് മുകളിൽ സ്വാമി ശാസ്താവിന്റെ ധനുസ്സിന്റെ ദിവ്യശക്തിയും ഈജിപ്ഷ്യൻ ഫറവോയുടെ പ്രാചീന ശാപജ്വാലകളും ഏറ്റുമുട്ടി!</p>
      <p class="malayalam-text">കാലത്തിന്റെ ആവർത്തനച്ചുഴിയിൽ നിൽക്കുമ്പോൾ മിഥുൻ തിരിച്ചറിഞ്ഞു—കാന്തമലയുടെ രഹസ്യം കേവലം സ്വർണ്ണനിധിയല്ല, അത് മനുഷ്യവംശത്തിന്റെ വിധിയെ സംരക്ഷിക്കുന്ന ദിവ്യജ്വാലയാണ്!</p>
    `,
  },
};

let activeBookKey = 'akhinathante';
let readerFontSize = 1.05;

function initReaderModal() {
  const modal = document.getElementById('chapter-reader-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const langToggleBtn = document.getElementById('reader-lang-toggle');
  const fontDecBtn = document.getElementById('font-decrease-btn');
  const fontIncBtn = document.getElementById('font-increase-btn');

  if (!modal) return;

  // Open modal triggers
  document.querySelectorAll('[data-read-book]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeBookKey = btn.getAttribute('data-read-book');
      renderModalExcerpt();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const book = bookExcerpts[activeBookKey];
      book.currentLang = book.currentLang === 'en' ? 'ml' : 'en';
      renderModalExcerpt();
    });
  }

  if (fontDecBtn) {
    fontDecBtn.addEventListener('click', () => {
      readerFontSize = Math.max(0.85, readerFontSize - 0.1);
      updateFontSize();
    });
  }

  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', () => {
      readerFontSize = Math.min(1.4, readerFontSize + 0.1);
      updateFontSize();
    });
  }
}

function renderModalExcerpt() {
  const book = bookExcerpts[activeBookKey];
  const titleEl = document.getElementById('modal-book-title');
  const chapterEl = document.getElementById('modal-chapter-tag');
  const bodyEl = document.getElementById('modal-reader-body');
  const langLabel = document.getElementById('reader-lang-label');

  if (titleEl) titleEl.textContent = book.title;
  if (chapterEl) chapterEl.textContent = book.chapter;
  if (bodyEl) {
    bodyEl.innerHTML = book.currentLang === 'en' ? book.en : book.ml;
    bodyEl.style.fontSize = `${readerFontSize}rem`;
  }
  if (langLabel) {
    langLabel.textContent =
      book.currentLang === 'en' ? 'Original Malayalam' : 'English Translation';
  }
}

function updateFontSize() {
  const bodyEl = document.getElementById('modal-reader-body');
  if (bodyEl) {
    bodyEl.style.fontSize = `${readerFontSize}rem`;
  }
}

/* --------------------------------------------------------------------------
   11. Clipboard Copy & Cinematic Inquiries Form
   -------------------------------------------------------------------------- */
function initClipboardAndForms() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('hud-toast');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      const email = 'vishnumcnair@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied: vishnumcnair@gmail.com');
      });
    });
  }

  const form = document.getElementById('cinematic-inquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inq-name').value;
      const category = document.getElementById('inq-category').value;
      showToast(`Message sent: [${category}] - Thank you, ${name}!`);
      form.reset();
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('hud-toast');
  const toastText = document.getElementById('hud-toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}

/* --------------------------------------------------------------------------
   12. HUD Theme Mode Toggle Controller (Bright Mode / Dark Obsidian)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label-text');

  function applyTheme(theme, showNotification = false) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('vishnu_theme', theme);
    } catch (e) { }

    if (theme === 'light') {
      if (themeIcon) themeIcon.textContent = '☾';
      if (themeLabel) themeLabel.textContent = 'DARK';
      if (toggleBtn) {
        toggleBtn.setAttribute('title', 'Switch to Dark Obsidian Mode');
        toggleBtn.setAttribute('aria-label', 'Switch to Dark Obsidian Mode');
      }
      if (showNotification) showToast('BRIGHT MODE ACTIVATED');
    } else {
      if (themeIcon) themeIcon.textContent = '☀';
      if (themeLabel) themeLabel.textContent = 'BRIGHT';
      if (toggleBtn) {
        toggleBtn.setAttribute('title', 'Switch to Bright Mode');
        toggleBtn.setAttribute('aria-label', 'Switch to Bright Mode');
      }
      if (showNotification) showToast('DARK OBSIDIAN MODE ACTIVATED');
    }
  }

  // Determine current active theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(currentTheme, false);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const targetTheme = active === 'light' ? 'dark' : 'light';
      applyTheme(targetTheme, true);
    });
  }
}

/* --------------------------------------------------------------------------
   13. Trilogy Overview Read More Toggle Controller
   -------------------------------------------------------------------------- */
function initReadMoreToggle() {
  const btn = document.getElementById('trilogy-read-more-btn');
  const content = document.getElementById('trilogy-full-overview');
  if (!btn || !content) return;

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      content.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      const textSpan = btn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Read More';
    } else {
      content.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
      const textSpan = btn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = 'Read Less';
    }
  });
}

/* --------------------------------------------------------------------------
   14. Hero Video Banner Interactive Engine
   -------------------------------------------------------------------------- */
function initHeroVideoBanner() {
  const video = document.getElementById('hero-banner-video');
  const soundBtn = document.getElementById('hero-video-sound-btn');
  const playBtn = document.getElementById('hero-video-play-btn');

  if (!video) return;

  // Auto-play recovery ensuring seamless playback across browser autoplay restrictions
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }

  // Audio mute/unmute toggle (Hero.mp4 contains an audio track)
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        video.volume = 1;
        soundBtn.classList.add('active');
        const label = document.getElementById('sound-ctrl-label');
        if (label) label.textContent = 'MUTE AUDIO';
        const iconMuted = soundBtn.querySelector('.icon-muted');
        const iconUnmuted = soundBtn.querySelector('.icon-unmuted');
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconUnmuted) iconUnmuted.style.display = 'inline-block';

        showToast('VIDEO AUDIO ACTIVATED');
      } else {
        video.muted = true;
        soundBtn.classList.remove('active');
        const label = document.getElementById('sound-ctrl-label');
        if (label) label.textContent = 'UNMUTE AUDIO';
        const iconMuted = soundBtn.querySelector('.icon-muted');
        const iconUnmuted = soundBtn.querySelector('.icon-unmuted');
        if (iconMuted) iconMuted.style.display = 'inline-block';
        if (iconUnmuted) iconUnmuted.style.display = 'none';

        showToast('VIDEO AUDIO MUTED');
      }
    });
  }

  // Video play/pause toggle
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.classList.remove('active');
        const label = document.getElementById('play-ctrl-label');
        if (label) label.textContent = 'PAUSE';
        const iconPause = playBtn.querySelector('.icon-pause');
        const iconPlay = playBtn.querySelector('.icon-play');
        if (iconPause) iconPause.style.display = 'inline-block';
        if (iconPlay) iconPlay.style.display = 'none';

        showToast('VIDEO PLAYBACK RESUMED');
      } else {
        video.pause();
        playBtn.classList.add('active');
        const label = document.getElementById('play-ctrl-label');
        if (label) label.textContent = 'PLAY';
        const iconPause = playBtn.querySelector('.icon-pause');
        const iconPlay = playBtn.querySelector('.icon-play');
        if (iconPause) iconPause.style.display = 'none';
        if (iconPlay) iconPlay.style.display = 'inline-block';

        showToast('VIDEO PLAYBACK PAUSED');
      }
    });
  }
}




