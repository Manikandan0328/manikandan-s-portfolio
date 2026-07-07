/* ====================================================
   MANIKANDAN PORTFOLIO – script.js
   Includes: theme, navbar, typing, skills, counters,
             contact form, back-to-top, AI bot
   ==================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
  initNavbar();
  initTyping();
  initSkillTabs();
  initCounters();
  initContactForm();
  initBackToTop();
  initBot();          // ← AI assistant
});

/* ─────────────────── THEME ─────────────────── */
function initTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('themeBtn') || document.getElementById('themeToggle');
  const ico  = document.getElementById('themeIco')  || document.getElementById('themeIcon');
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  apply(saved);
  btn?.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('portfolio-theme', next);
  });
  function apply(t) {
    html.dataset.theme = t;
    if (ico) ico.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* ─────────────────── PARTICLES ─────────────────── */
function initParticles() {
  const canvas = document.getElementById('bgCanvas') || document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(79,70,229,','rgba(6,182,212,','rgba(139,92,246,'];

  class P {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.6 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -(Math.random() * 0.45 + 0.15);
      this.a  = Math.random() * 0.45 + 0.1;
      this.c  = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() { this.x += this.vx; this.y += this.vy; if (this.y < -10) this.reset(); }
    draw()   {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `${this.c}${this.a})`;
      ctx.fill();
    }
  }

  const COUNT = Math.min(100, Math.floor(window.innerWidth / 14));
  for (let i = 0; i < COUNT; i++) particles.push(new P());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++)
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79,70,229,${0.07*(1-d/90)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    requestAnimationFrame(loop);
  })();
}

/* ─────────────────── NAVBAR ─────────────────── */
function initNavbar() {
  const nav     = document.getElementById('siteNav') || document.getElementById('mainNav');
  const menuBtn = document.getElementById('menuBtn');
  const drawer  = document.getElementById('navDrawer');
  const links   = document.querySelectorAll('.drawer-link, .nav-link');
  const sections = document.querySelectorAll('section[id]');

  menuBtn?.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    menuBtn.classList.toggle('active', !open);
    drawer?.classList.toggle('open', !open);
  });

  links.forEach(a => {
    a.addEventListener('click', () => {
      menuBtn?.setAttribute('aria-expanded', 'false');
      menuBtn?.classList.remove('active');
      drawer?.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${cur}`));
  }, { passive: true });
}

/* ─────────────────── TYPING ─────────────────── */
function initTyping() {
  const el = document.getElementById('typedRole') || document.getElementById('typedText');
  if (!el) return;
  const phrases = ['Software Engineer','ASP.NET Developer','Full Stack Developer','Problem Solver','UI/UX Enthusiast'];
  let pi = 0, ci = 0, del = false, paused = false;
  function tick() {
    const p = phrases[pi];
    if (!del) { ci++; el.textContent = p.slice(0, ci); if (ci === p.length) { paused = true; setTimeout(() => { paused = false; del = true; }, 2000); } }
    else        { ci--; el.textContent = p.slice(0, ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; } }
    if (!paused) setTimeout(tick, del ? 45 : 85);
    else         setTimeout(tick, 100);
  }
  tick();
}

/* ─────────────────── SKILL TABS ─────────────────── */
function initSkillTabs() {
  const btns   = document.querySelectorAll('.stab, .skills-tab-btn');
  const panels = document.querySelectorAll('.skill-panel, .skills-tab-content');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`sp-${tab}`) || document.getElementById(`tab-${tab}`);
      if (panel) { panel.classList.add('active'); animateBars(panel); }
    });
  });

  // Animate bars on scroll into view
  const skillSec = document.getElementById('skills');
  if (skillSec) {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) { const active = document.querySelector('.skill-panel.active, .skills-tab-content.active'); animateBars(active); } }, { threshold: 0.2 }).observe(skillSec);
  }
}

function animateBars(container) {
  if (!container) return;
  container.querySelectorAll('.sk-fill, .skill-fill').forEach(bar => {
    const w = bar.style.getPropertyValue('--w') || '0%';
    bar.style.width = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = w; }));
  });
}

/* ─────────────────── COUNTERS ─────────────────── */
function initCounters() {
  const els = document.querySelectorAll('[data-to], [data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.to || el.dataset.count, 10);
      const dur = 1400;
      const t0  = performance.now();
      obs.unobserve(el);
      (function update(now) {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * end);
        if (p < 1) requestAnimationFrame(update); else el.textContent = end;
      })(t0);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

/* ─────────────────── CONTACT FORM ─────────────────── */
function initContactForm() {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast') || document.getElementById('successToast');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('[required]');
    let ok = true;
    inputs.forEach(i => { i.classList.remove('error'); if (!i.value.trim()) { i.classList.add('error'); ok = false; } });
    if (!ok) return;
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig; btn.disabled = false; form.reset();
      if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }
    }, 1500);
  });
  form.querySelectorAll('[required]').forEach(i => i.addEventListener('input', () => i.classList.remove('error')));
}

/* ─────────────────── BACK TO TOP ─────────────────── */
function initBackToTop() {
  const btn = document.getElementById('btnTop') || document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ═══════════════════════════════════════════════════════
   SMART LOCAL PORTFOLIO BOT
   No API key needed — keyword + intent matching engine
   with rich, natural responses about Manikandan.
═══════════════════════════════════════════════════════ */
function initBot() {
  const fab      = document.getElementById('botFab');
  const win      = document.getElementById('botWindow');
  const closeBtn = document.getElementById('botClose');
  const msgArea  = document.getElementById('botMessages');
  const input    = document.getElementById('botInput');
  const sendBtn  = document.getElementById('botSend');
  const chips    = document.getElementById('botChips');
  const notif    = document.getElementById('botNotif');

  if (!fab || !win) return;

  let isOpen  = false;
  let busy    = false;
  let lastTopic = null;

  /* ── KNOWLEDGE BASE ── */
  const KB = {

    greeting: {
      keys: ['hi','hello','hey','good morning','good evening','good afternoon','howdy','sup','what\'s up','whats up','hii','helo','hai'],
      replies: [
        "👋 Hey there! I'm Mani's Portfolio Assistant. I know everything about Manikandan — his skills, projects, experience, and more. What would you like to know?",
        "Hello! 😊 Great to meet you! I'm here to tell you all about Manikandan — a Software Engineer based in Chennai. What can I help you with?",
        "Hi! Welcome to Manikandan's portfolio. I'm his AI assistant — ask me anything about his skills, projects, education, or how to reach him!"
      ]
    },

    whoami: {
      keys: ['who are you','what are you','introduce yourself','your name','who is this','what is this bot','are you a bot','are you ai','are you human'],
      replies: [
        "I'm Mani's Portfolio Assistant 🤖 — a smart chatbot built into Manikandan's portfolio. I can answer any question about his skills, projects, work experience, education, and contact details. Fire away!",
        "Great question! I'm an AI assistant created specifically for Manikandan's portfolio. I have all his professional info loaded in — skills, projects, education, experience, and contact links. What would you like to know?"
      ]
    },

    about: {
      keys: ['who is manikandan','about manikandan','tell me about','about you','who are you','introduce manikandan','manikandan background','describe manikandan','about him','about yourself'],
      replies: [
        "Manikandan is a passionate **Software Engineer** currently working at **Splendin Software Private Limited** in Chennai, Tamil Nadu 🇮🇳.\n\nHe specialises in building enterprise-grade web applications using **ASP.NET Core, C#, JavaScript**, and **Bootstrap**. With both a B.Sc. in Computer Science and an MCA under his belt, he combines strong theoretical foundations with real-world engineering skills.",
        "Manikandan is a dedicated **Software Engineer** based in Chennai with expertise in full-stack web development. He works at **Splendin Software Pvt. Ltd.**, building scalable backend systems and responsive user interfaces. He's passionate about clean code, performance optimisation, and continuous learning! 💡"
      ]
    },

    skills: {
      keys: ['skill','skills','know','technologies','tech stack','tech','what can you do','expertise','proficient','good at','experience in','experience with','specialise','specialize','programming','languages','tools'],
      replies: [
        "Manikandan has a solid full-stack skill set! 🛠️\n\n**Frontend:** HTML5, CSS3, JavaScript (ES6), Bootstrap 5, Responsive Design\n\n**Backend:** ASP.NET MVC, ASP.NET Core, C#, REST API\n\n**Database:** SQL Server, MySQL\n\n**Tools:** Git, GitHub, SourceTree, Visual Studio, VS Code\n\n**Concepts:** MVC Architecture, OOP, Authentication & Authorisation, Agile",
        "Here's Manikandan's technical toolkit:\n\n🎨 **Frontend** — HTML5, CSS3, JavaScript, Bootstrap 5\n⚙️ **Backend** — ASP.NET Core, ASP.NET MVC, C#, REST API\n🗄️ **Database** — SQL Server, MySQL\n🔧 **Tools** — Git, GitHub, Visual Studio, VS Code\n💡 **Concepts** — OOP, MVC, JWT Auth, Agile practices"
      ]
    },

    frontend: {
      keys: ['frontend','front end','html','css','javascript','bootstrap','responsive','ui','user interface','web design'],
      replies: [
        "Manikandan is strong on the frontend! 🎨 He works with **HTML5, CSS3, JavaScript (ES6), and Bootstrap 5** to build clean, responsive user interfaces that work beautifully across all devices — mobile, tablet, and desktop.",
        "On the frontend side, Manikandan uses **HTML5, CSS3, JavaScript**, and **Bootstrap 5**. He takes a mobile-first approach and focuses on responsive design to ensure great UX on every screen size. 📱💻"
      ]
    },

    backend: {
      keys: ['backend','back end','asp.net','aspnet','c#','csharp','api','rest','server','dotnet','.net','mvc','core'],
      replies: [
        "Manikandan's backend stack is **.NET focused** ⚙️ — he builds with **ASP.NET Core** and **ASP.NET MVC** using **C#**. He designs RESTful APIs, implements JWT-based authentication, and builds scalable, maintainable server-side architectures.",
        "For backend development, Manikandan uses **ASP.NET Core, ASP.NET MVC, and C#** to build robust, secure web applications. He has hands-on experience with **REST API** development, authentication systems, and enterprise-grade backend solutions."
      ]
    },

    database: {
      keys: ['database','db','sql','mysql','sql server','data','query','queries','mssql'],
      replies: [
        "Manikandan works with **SQL Server** and **MySQL** for database management 🗄️. He handles database design, writing efficient queries, managing relationships, and integrating databases with ASP.NET Core backend applications.",
        "On the database side, Manikandan is proficient in **SQL Server** (primary) and **MySQL**. He's comfortable with schema design, query optimisation, stored procedures, and database management in enterprise environments."
      ]
    },

    experience: {
      keys: ['experience','work','job','company','splendin','current role','working','career','employed','position','role','responsibilities','what do you do','what does he do'],
      replies: [
        "Manikandan is currently a **Software Engineer at Splendin Software Private Limited**, Chennai (2025–Present) 💼\n\nHis responsibilities include:\n- Building enterprise web applications\n- Developing scalable ASP.NET Core backend solutions\n- Implementing JWT authentication systems\n- Creating responsive Bootstrap UIs\n- REST API integration & optimisation\n- SQL Server database design\n- Bug fixing & performance enhancement\n- Agile/Scrum practices",
        "He works as a **Software Engineer at Splendin Software Pvt. Ltd.** in Chennai 🏢. His day-to-day involves developing full-stack web applications, securing them with authentication systems, integrating REST APIs, and collaborating in an Agile team environment."
      ]
    },

    projects: {
      keys: ['project','projects','built','created','developed','portfolio','work samples','what have you made','what did you build','applications','apps'],
      replies: [
        "Manikandan has built **3 notable projects** 🚀\n\n**1. E-Flora 🌿**\nA plant database web app with QR code integration, PDF download, and responsive design.\n*Stack: HTML, CSS, JavaScript, Node.js, MySQL*\n\n**2. Startup User Interface 🚀**\nA corporate website with mobile-first design and interactive UI components.\n*Stack: HTML, CSS, JavaScript, Bootstrap*\n\n**3. Departmental Portal 🏫**\nFull academic portal with student management, staff login, material sharing, and authentication.\n*Stack: PHP, MySQL, HTML, CSS, JavaScript*"
      ]
    },

    eflora: {
      keys: ['eflora','e-flora','flora','plant','qr','plant database'],
      replies: [
        "**E-Flora** 🌿 is one of Manikandan's coolest projects! It's a comprehensive plant database web application featuring:\n- 📋 Searchable plant database\n- 📲 QR code integration for quick plant lookup\n- 📄 PDF download for plant information\n- 📱 Fully responsive across all devices\n\n**Tech Stack:** HTML, CSS, JavaScript, Node.js, MySQL"
      ]
    },

    portal: {
      keys: ['portal','departmental','department','academic','college','student','staff','php'],
      replies: [
        "The **Departmental Portal** 🏫 is a full-featured academic management system Manikandan built. It includes:\n- 👨‍🎓 Student management module\n- 👨‍🏫 Staff login & portal\n- 📚 Course material sharing\n- 🔐 Secure authentication system\n\n**Tech Stack:** PHP, MySQL, HTML, CSS, JavaScript"
      ]
    },

    startup: {
      keys: ['startup','corporate','company website','landing page','business website'],
      replies: [
        "The **Startup User Interface** 🚀 project is a sleek corporate website Manikandan designed with a strong focus on:\n- 📱 Mobile-first responsive design\n- ✨ Interactive UI components\n- 🎨 Modern, professional look\n- ⚡ Fast load performance\n\n**Tech Stack:** HTML, CSS, JavaScript, Bootstrap 5"
      ]
    },

    education: {
      keys: ['education','study','studied','college','university','degree','qualification','academic','mca','bsc','b.sc','alagappa','jj college','school','graduate'],
      replies: [
        "Manikandan has strong academic credentials 🎓\n\n**Master of Computer Applications (MCA)**\n🏛️ Alagappa University\n📅 2023 – 2025\n\n**B.Sc. Computer Science**\n🏛️ JJ College of Arts and Science\n📅 2020 – 2023\n\nHis MCA deepened his expertise in software engineering, data structures, algorithms, and enterprise application development.",
        "Manikandan completed his **B.Sc. Computer Science** from JJ College of Arts and Science (2020–2023), followed by an **MCA from Alagappa University** (2023–2025). His postgraduate education focused on advanced software engineering, DBMS, data structures, and algorithms 📚"
      ]
    },

    contact: {
      keys: ['contact','reach','email','phone','number','mobile','call','message','connect','get in touch','hire','talk','linkedin','github','social'],
      replies: [
        "You can reach Manikandan through multiple channels 📬\n\n📧 **Email:** smanikandanmani123@gmail.com\n📞 **Phone:** +91 9976008508\n💼 **LinkedIn:** linkedin.com/in/mani03ms\n🐙 **GitHub:** github.com/Manikandan0328\n📍 **Location:** Chennai, Tamil Nadu, India\n\nFeel free to reach out — he's always open to new opportunities and collaborations!",
        "Here's how to get in touch with Manikandan 👇\n\n- **Email:** smanikandanmani123@gmail.com\n- **Phone:** +91 9976008508\n- **LinkedIn:** linkedin.com/in/mani03ms\n- **GitHub:** github.com/Manikandan0328\n\nHe's based in Chennai and is responsive to messages! 😊"
      ]
    },

    location: {
      keys: ['location','where','city','place','based','live','from','chennai','tamil nadu','india'],
      replies: [
        "Manikandan is based in **Chennai, Tamil Nadu, India** 📍. He works at Splendin Software Private Limited, also located in Chennai.",
        "He's from **Chennai, Tamil Nadu, India** 🇮🇳 — a major tech hub! He originally comes from the Pudukkottai area of Tamil Nadu and now works in Chennai."
      ]
    },

    hire: {
      keys: ['hire','available','freelance','open to work','looking for job','opportunity','opportunities','full time','part time','remote','job','recruit','recruiter'],
      replies: [
        "Manikandan is **open to new opportunities** 🌟! Whether it's a full-time role, freelance projects, or collaborations — he's enthusiastic about exciting challenges.\n\nBest way to reach him:\n📧 smanikandanmani123@gmail.com\n💼 linkedin.com/in/mani03ms",
        "Yes, Manikandan is open to exploring opportunities! 💡 He's looking for roles where he can apply his **ASP.NET Core, C#, and full-stack** expertise. Reach out via email at **smanikandanmani123@gmail.com** or connect on LinkedIn!"
      ]
    },

    github: {
      keys: ['github','git hub','repository','repo','code','source code','open source'],
      replies: [
        "You can check out Manikandan's code on **GitHub** 🐙\n👉 **github.com/Manikandan0328**\n\nHe uses Git and GitHub daily for version control and has experience with branching, pull requests, and collaborative workflows!"
      ]
    },

    linkedin: {
      keys: ['linkedin','linked in','profile','professional profile'],
      replies: [
        "Connect with Manikandan on **LinkedIn** 💼\n👉 **linkedin.com/in/mani03ms**\n\nHe keeps his profile updated with his latest experience, skills, and projects — great for recruiters and professionals!"
      ]
    },

    thanks: {
      keys: ['thank','thanks','thank you','thankyou','thx','ty','cheers','great','awesome','cool','nice','helpful','good bot','well done','perfect'],
      replies: [
        "You're welcome! 😊 Happy to help. Feel free to ask if you have any more questions about Manikandan!",
        "Glad I could help! 🙌 If you'd like to know anything else about Manikandan's skills, projects, or how to contact him, just ask!",
        "Anytime! 😄 Is there anything else you'd like to know about Manikandan?"
      ]
    },

    bye: {
      keys: ['bye','goodbye','see you','later','take care','good night','good bye','cya','ok bye','ok thanks','ok thank you'],
      replies: [
        "Goodbye! 👋 Thanks for visiting Manikandan's portfolio. Don't hesitate to reach out at smanikandanmani123@gmail.com if you want to connect!",
        "See you! 😊 Feel free to come back anytime. You can also reach Manikandan directly at smanikandanmani123@gmail.com!"
      ]
    },

    offTopic: {
      keys: [],
      replies: [
        "I'm designed specifically to answer questions about **Manikandan's portfolio** 😊. I can help with his skills, projects, experience, education, or contact info. What would you like to know?",
        "That's a bit outside my expertise! I only know about Manikandan's professional profile. Try asking about his **skills, projects, experience, education**, or **how to contact him**! 🤖",
        "Great question, but I'm Manikandan's portfolio assistant — so I can only answer things related to him! Ask me about his **tech skills, projects, work experience**, or **education** 😄"
      ]
    }
  };

  /* ── Intent matcher ── */
  function getReply(raw) {
    const q = raw.toLowerCase().trim();

    // Priority order matters — more specific first
    const order = ['eflora','portal','startup','github','linkedin','frontend','backend','database','whoami','greeting','bye','thanks','about','skills','experience','projects','education','contact','location','hire'];

    for (const topic of order) {
      const entry = KB[topic];
      if (!entry) continue;
      const matched = entry.keys.some(k => q.includes(k));
      if (matched) {
        lastTopic = topic;
        const pool = entry.replies;
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    // Fuzzy fallback — single meaningful words
    if (q.length < 4) return "Could you give me a bit more detail? 😊 I'm happy to help!";

    lastTopic = 'offTopic';
    const pool = KB.offTopic.replies;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /* ── Open / Close ── */
  function openBot() {
    isOpen = true;
    fab.classList.add('open');
    win.classList.add('visible');
    win.setAttribute('aria-hidden', 'false');
    notif?.classList.add('hidden');
    if (msgArea.children.length === 0) {
      typeMsg("👋 Hi! I'm **Mani's Portfolio Assistant**. I know everything about Manikandan — his skills, projects, experience, and contact info. What would you like to know?");
    }
    setTimeout(() => input?.focus(), 320);
  }

  function closeBot() {
    isOpen = false;
    fab.classList.remove('open');
    win.classList.remove('visible');
    win.setAttribute('aria-hidden', 'true');
  }

  fab.addEventListener('click', () => isOpen ? closeBot() : openBot());
  closeBtn?.addEventListener('click', closeBot);
  document.addEventListener('click', e => {
    if (isOpen && !win.contains(e.target) && !fab.contains(e.target)) closeBot();
  });

  /* ── Chips ── */
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.q;
      chips?.remove();
      if (q) handleSend(q);
    });
  });

  /* ── Input ── */
  sendBtn?.addEventListener('click', () => {
    const t = input.value.trim();
    if (t) { chips?.remove(); handleSend(t); input.value = ''; }
  });
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const t = input.value.trim();
      if (t) { chips?.remove(); handleSend(t); input.value = ''; }
    }
  });

  /* ── Handle send ── */
  function handleSend(text) {
    if (busy) return;
    addUserMsg(text);
    busy = true;
    sendBtn.disabled = true;
    const typingEl = addTyping();

    // Simulate thinking delay (400–900ms feels natural)
    const delay = 400 + Math.random() * 500;
    setTimeout(() => {
      typingEl.remove();
      const reply = getReply(text);
      typeMsg(reply);
      busy = false;
      sendBtn.disabled = false;
      input?.focus();
    }, delay);
  }

  /* ── Typewriter effect for bot messages ── */
  function typeMsg(raw) {
    const div = document.createElement('div');
    div.className = 'msg bot';
    const av = document.createElement('div');
    av.className = 'msg-av';
    av.innerHTML = '<i class="fas fa-robot"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    div.appendChild(av);
    div.appendChild(bubble);
    msgArea.appendChild(div);
    scrollBottom();

    // Render markdown first, then type the HTML character by character (text only)
    const html = renderMD(raw);
    // For typewriter, stream words rather than HTML chars
    const words = raw.split(' ');
    let wi = 0;
    function nextWord() {
      if (wi >= words.length) return;
      // Re-render the whole partial string each step for correct markdown
      bubble.innerHTML = renderMD(words.slice(0, wi + 1).join(' '));
      wi++;
      scrollBottom();
      setTimeout(nextWord, 22 + Math.random() * 18);
    }
    nextWord();
  }

  /* ── DOM helpers ── */
  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'msg user';
    div.innerHTML = `<div class="msg-bubble">${esc(text)}</div>`;
    msgArea.appendChild(div);
    scrollBottom();
  }

  function addTyping() {
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.innerHTML = `<div class="msg-av"><i class="fas fa-robot"></i></div><div class="msg-bubble typing-bubble"><span></span><span></span><span></span></div>`;
    msgArea.appendChild(div);
    scrollBottom();
    return div;
  }

  function scrollBottom() {
    requestAnimationFrame(() => { msgArea.scrollTop = msgArea.scrollHeight; });
  }

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function renderMD(text) {
    return esc(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
}
