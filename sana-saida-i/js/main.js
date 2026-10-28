/**
 * موقع عيد ميلاد إيمان - السكربت البرمجي الرئيسي (Vanilla JavaScript)
 * متوافق بالكامل مع GitHub Pages بدون أي متطلبات خادم
 */

// إعدادات وبيانات الموقع الافتراضية
const DEFAULT_CONFIG = {
  girlName: "إيمان",
  nickName: "حبيبة القلب ونور العين",
  birthdayDate: "2025-05-20T20:00",
  heroTitle: "عيد ميلاد سعيد يا أغلى إيمان ❤️",
  heroMessage: "في مثل هذا اليوم السعيد، وُلدت أجمل زهرة في بستان الحياة لتملأ الدنيا عطراً وضياءً. كل عام وأنتِ روحي ونبض فؤادي، كل عام وابتسامتكِ تضيء كوني.",
  loveLetterTitle: "رسالة من أعماق القلب إلى إيمان",
  loveLetterContent: `إلى أميرتي إيمان الغالية،\n\nلا تسع الكلمات ما يكنّه قلبي لكِ في هذا اليوم المبارك، فاليوم ليس مجرد تاريخ في التقويم، بل هو اليوم الذي أضاء الله به عالمي بولادتكِ.\n\nمنذ أن عرفتكِ، أدركتُ أن السعادة ليست صدفة، بل هي ابتسامة ترسمينها على وجهي كل صباح، ودفء تودعينه في روحي بحديثكِ الرقيق. أنتِ الهدوء في وسط العاصفة، والجمال في أبسط التفاصيل.\n\nأعدكِ في عامكِ الجديد بأن أكون لكِ السند الذي لا يميل، والحب الذي لا ينطفئ، وأن أصون عينيكِ من كل حزن. دمتِ لي عمراً جميلاً، وروحاً لا استغني عنها ما حييت.\n\nكل عام وأنتِ الخير لكل عام، وعيد ميلاد سعيد يا كل دنيتي.`,
  loveLetterSignature: "مع كل نبضة حب وشوق، المخلص لكِ دائمًا ❤️",
  surpriseTitle: "مفاجأة خاصة لصاحبة أجمل قلب 🎁",
  surpriseMessage: "مفاجأتي لكِ يا إيمان ليست شيئاً يمكن لفه في علبة هدايا، بل هي وعد أبدي من أعماق الروح بأن أبقى بجانبكِ، أرعاكِ وأحبكِ أكثر في كل يوم يمر. أنتِ أعظم نعمة منحني إياها القدر!",
  surprisePoem: `كأنَّكِ البدرُ في ليلِ الهوى سطعَ\nوكأنَّ حُسنَكِ في أرجائهِ لمعَ\nيا زهرةَ العمرِ يا أحلى الأماني ويا\nسرورَ قلبٍ بروحِ الودِّ قد سَطَعَ`,
  musicUrl: "",
  musicTitle: "لحن البيانو الرومانسي الهادئ",
  galleryImages: [
    { url: "assets/images/romantic_cake.jpg", title: "كعكة عيد ميلادك الساحرة", caption: "أشعلنا الشموع وصنعنا أمنية لقلبكِ الطاهر" },
    { url: "assets/images/romantic_roses.jpg", title: "باقة ورد تليق بجمالك", caption: "كل وردة فيها تنطق بحرف من حروف اسمكِ الرقيق" },
    { url: "assets/images/gift_box.jpg", title: "هدية معطرة بالحب", caption: "أجمل الهدايا هي وجودكِ في هذه الدنيا" },
    { url: "assets/images/starlit_night.jpg", title: "ليلة احتفال تحت النجوم", caption: "السماء كلها تحتفل بميلاد قمرها المشرق" },
    { url: "assets/images/love_envelope.jpg", title: "رسائل الغرام الصادقة", caption: "حروف كُتبت بمداد الروح ومختومة بالوفاء" }
  ]
};

// استرجاع الإعدادات من التخزين المحلي
function getAppConfig() {
  try {
    const saved = localStorage.getItem("sana_saida_iman_config_v1");
    if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  } catch (e) {
    console.warn("Storage read error", e);
  }
  return DEFAULT_CONFIG;
}

const config = getAppConfig();

// ==========================================
// 1. نظام الصوت الرومانسي المدمج (Web Audio API)
// ==========================================
class SimpleAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.audioElement = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, dur, delay = 0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + delay + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + dur + 0.1);
  }

  startMelody() {
    this.init();
    this.isPlaying = true;
    const chords = [
      [349.23, 440, 523.25, 698.46],
      [261.63, 329.63, 392, 523.25],
      [293.66, 349.23, 440, 587.33],
      [233.08, 293.66, 349.23, 466.16]
    ];
    let idx = 0;
    const step = () => {
      if (!this.isPlaying) return;
      const c = chords[idx % chords.length];
      idx++;
      c.forEach((n, i) => this.playNote(n, 1.8, i * 0.4));
      this.timer = setTimeout(step, 2000);
    };
    step();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.audioElement) this.audioElement.pause();
  }

  playCandleBlow() {
    this.init();
    if (!this.ctx) return;
    try {
      const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.4, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) * 0.2;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.connect(this.ctx.destination);
      src.start();
    } catch (e) {}
  }

  playChime() {
    this.init();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.playNote(f, 1, i * 0.1));
  }
}

const audio = new SimpleAudioEngine();

// ==========================================
// 2. جسيمات الخلفية (القلوب والورود والنجوم)
// ==========================================
function initParticleCanvas() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particles = [];
  const total = w > 768 ? 35 : 18;
  const colors = ["rgba(244,114,182,0.6)", "rgba(251,113,133,0.6)", "rgba(192,132,252,0.5)", "rgba(251,191,36,0.6)"];

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 8 + Math.random() * 10,
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: -0.4 - Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 6.28,
      angleSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.angleSpeed;
      if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      // Draw heart
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(p.size / 15, p.size / 15);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -6, -12, -2, -12, 6);
      ctx.bezierCurveTo(-12, 14, -2, 18, 0, 23);
      ctx.bezierCurveTo(2, 18, 12, 14, 12, 6);
      ctx.bezierCurveTo(12, -2, 5, -6, 0, 0);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(loop);
  }
  loop();
}

// ==========================================
// 3. الكعكة التفاعلية والشموع
// ==========================================
let candlesState = [true, true, true];

function setupCake() {
  const candles = document.querySelectorAll(".candle-unit");
  const blowAllBtn = document.getElementById("blow-all-candles");
  const relightBtn = document.getElementById("relight-candles");
  const celebrationMsg = document.getElementById("cake-celebration-msg");

  const checkAllExtinguished = () => {
    if (candlesState.every((s) => !s)) {
      audio.playChime();
      triggerConfetti();
      if (celebrationMsg) celebrationMsg.style.display = "block";
      if (blowAllBtn) blowAllBtn.style.display = "none";
      if (relightBtn) relightBtn.style.display = "inline-flex";
    }
  };

  candles.forEach((c, idx) => {
    c.addEventListener("click", () => {
      if (!candlesState[idx]) return;
      candlesState[idx] = false;
      audio.playCandleBlow();
      const flame = c.querySelector(".flame");
      if (flame) {
        flame.className = "smoke";
      }
      checkAllExtinguished();
    });
  });

  if (blowAllBtn) {
    blowAllBtn.addEventListener("click", () => {
      audio.playCandleBlow();
      candlesState = [false, false, false];
      candles.forEach((c) => {
        const flame = c.querySelector(".flame");
        if (flame) flame.className = "smoke";
      });
      setTimeout(checkAllExtinguished, 200);
    });
  }

  if (relightBtn) {
    relightBtn.addEventListener("click", () => {
      candlesState = [true, true, true];
      candles.forEach((c) => {
        const smoke = c.querySelector(".smoke");
        if (smoke) smoke.className = "flame";
      });
      if (celebrationMsg) celebrationMsg.style.display = "none";
      if (relightBtn) relightBtn.style.display = "none";
      if (blowAllBtn) blowAllBtn.style.display = "inline-flex";
    });
  }
}

// البهرجة والقصاصات الملونة البسيطة
function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettis = [];
  const colors = ["#ec4899", "#f43f5e", "#fbbf24", "#a855f7", "#ffffff"];
  for (let i = 0; i < 120; i++) {
    confettis.push({
      x: canvas.width / 2,
      y: canvas.height * 0.6,
      vx: (Math.random() - 0.5) * 16,
      vy: -12 - Math.random() * 12,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: 0.35,
      alpha: 1
    });
  }

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.008;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillRect(p.x, p.y, p.size, p.size * 1.5);
    });
    frames++;
    if (frames < 140) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  animate();
}

// ==========================================
// 4. العداد التنازلي لعيد الميلاد
// ==========================================
function setupCountdown() {
  const targetTime = new Date(config.birthdayDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (diff <= 0) {
      if (daysEl) daysEl.innerText = "00";
      if (hoursEl) hoursEl.innerText = "00";
      if (minutesEl) minutesEl.innerText = "00";
      if (secondsEl) secondsEl.innerText = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.innerText = String(d).padStart(2, "0");
    if (hoursEl) hoursEl.innerText = String(h).padStart(2, "0");
    if (minutesEl) minutesEl.innerText = String(m).padStart(2, "0");
    if (secondsEl) secondsEl.innerText = String(s).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 5. المودالات والنوافذ المنبثقة
// ==========================================
function setupModals() {
  // Love letter
  const letterModal = document.getElementById("love-letter-modal");
  const openLetterBtns = document.querySelectorAll(".btn-open-letter");
  const closeLetterBtn = document.getElementById("close-letter-modal");
  const envelopeElem = document.getElementById("letter-envelope");
  const letterBodyElem = document.getElementById("unfolded-letter");

  openLetterBtns.forEach((b) => {
    b.addEventListener("click", () => {
      if (letterModal) letterModal.classList.add("active");
    });
  });

  if (envelopeElem) {
    envelopeElem.addEventListener("click", () => {
      audio.playChime();
      envelopeElem.style.display = "none";
      if (letterBodyElem) letterBodyElem.style.display = "block";
    });
  }

  if (closeLetterBtn && letterModal) {
    closeLetterBtn.addEventListener("click", () => {
      letterModal.classList.remove("active");
    });
  }

  // Surprise modal
  const surpriseModal = document.getElementById("surprise-modal");
  const openSurpriseBtns = document.querySelectorAll(".btn-open-surprise");
  const closeSurpriseBtn = document.getElementById("close-surprise-modal");
  const giftBoxElem = document.getElementById("gift-box-wrapper");
  const surpriseContentElem = document.getElementById("surprise-inner-content");

  openSurpriseBtns.forEach((b) => {
    b.addEventListener("click", () => {
      if (surpriseModal) surpriseModal.classList.add("active");
    });
  });

  if (giftBoxElem) {
    giftBoxElem.addEventListener("click", () => {
      audio.playChime();
      triggerConfetti();
      giftBoxElem.style.display = "none";
      if (surpriseContentElem) surpriseContentElem.style.display = "block";
    });
  }

  if (closeSurpriseBtn && surpriseModal) {
    closeSurpriseBtn.addEventListener("click", () => {
      surpriseModal.classList.remove("active");
    });
  }

  // Lightbox for Gallery
  const lightboxModal = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightboxBtn = document.getElementById("close-lightbox");

  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h4");
      if (img && lightboxImg && lightboxModal) {
        lightboxImg.src = img.src;
        if (lightboxCaption && title) lightboxCaption.innerText = title.innerText;
        lightboxModal.classList.add("active");
      }
    });
  });

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener("click", () => {
      lightboxModal.classList.remove("active");
    });
  }
}

// ==========================================
// 6. مشغل الموسيقى
// ==========================================
function setupMusicPlayer() {
  const toggleBtn = document.getElementById("music-toggle-btn");
  const titleSpan = document.getElementById("music-player-title");
  let isPlaying = false;

  if (titleSpan) titleSpan.innerText = config.musicTitle || "لحن عيد الميلاد";

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (!isPlaying) {
        if (config.musicUrl && config.musicUrl.trim() !== "") {
          const el = new Audio(config.musicUrl);
          el.play().catch(() => audio.startMelody());
          audio.audioElement = el;
        } else {
          audio.startMelody();
        }
        isPlaying = true;
        toggleBtn.innerText = "⏸️";
      } else {
        audio.stopMelody();
        isPlaying = false;
        toggleBtn.innerText = "▶️";
      }
    });
  }
}

// ==========================================
// 7. صندوق الأمنيات التفاعلي
// ==========================================
function setupWishJar() {
  const wishes = [
    "أتمنى لكِ عاماً مليئاً بالضحكات الصادقة والنجاحات الباهرة.",
    "أن يحفظ الله نقاء قلبكِ ويديم عليكِ بهجة الروح.",
    "أن تظل ابتسامتكِ مصدر النور والدفء لكل من حولكِ.",
    "أن تحققي كل حلم خبأته في صدركِ وأن يهديكِ القدر أجمل الأيام."
  ];

  const drawBtn = document.getElementById("draw-wish-btn");
  const display = document.getElementById("wish-display-text");

  if (drawBtn && display) {
    drawBtn.addEventListener("click", () => {
      audio.playChime();
      const random = wishes[Math.floor(Math.random() * wishes.length)];
      display.innerText = `"${random}"`;
    });
  }
}

// تطبيق إعدادات النصوص المخصصة على الصفحة
function applyDynamicConfig() {
  document.querySelectorAll(".var-girl-name").forEach((el) => (el.innerText = config.girlName));
  const heroTitle = document.getElementById("hero-title-text");
  if (heroTitle) heroTitle.innerText = config.heroTitle;
  const heroNick = document.getElementById("hero-nickname-text");
  if (heroNick) heroNick.innerText = `«${config.nickName}»`;
  const heroMsg = document.getElementById("hero-message-text");
  if (heroMsg) heroMsg.innerText = config.heroMessage;

  const letterTitle = document.getElementById("letter-title-text");
  if (letterTitle) letterTitle.innerText = config.loveLetterTitle;
  const letterBody = document.getElementById("letter-body-text");
  if (letterBody) letterBody.innerText = config.loveLetterContent;
  const letterSign = document.getElementById("letter-signature-text");
  if (letterSign) letterSign.innerText = config.loveLetterSignature;

  const surpriseTitle = document.getElementById("surprise-title-text");
  if (surpriseTitle) surpriseTitle.innerText = config.surpriseTitle;
  const surpriseMsg = document.getElementById("surprise-message-text");
  if (surpriseMsg) surpriseMsg.innerText = config.surpriseMessage;
  const surprisePoem = document.getElementById("surprise-poem-text");
  if (surprisePoem) surprisePoem.innerText = config.surprisePoem;
}

// تشغيل عند تحميل المستند
document.addEventListener("DOMContentLoaded", () => {
  applyDynamicConfig();
  initParticleCanvas();
  setupCake();
  setupCountdown();
  setupModals();
  setupMusicPlayer();
  setupWishJar();
});
