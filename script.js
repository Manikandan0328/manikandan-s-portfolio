/* ====================================================
   MANIKANDAN PORTFOLIO – script.js
   ==================================================== */

'use strict';

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
  initAOS();
  initNavbar();
  initTypingEffect();
  initSkillTabs();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
});

/* ==============================
   THEME TOGGLE
   ============================== */
function initTheme() {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  toggleBtn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ==============================
   PARTICLE BACKGROUND
   ============================== */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const colors = ['rgba(79,70,229,', 'rgba(6,182,212,', 'rgba(139,92,246,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.8 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.5 + 0.2);
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.fill();
    }
  }

  const COUNT = Math.min(120, Math.floor(W / 12));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79,70,229,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ==============================
   AOS INIT
   ============================== */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      once: true,
      offset: 60,
    });
  }
}

/* ==============================
   NAVBAR
   ============================== */
function initNavbar() {
  const nav = document.getElementById('mainNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    highlightNav();
  }, { passive: true });

  // Smooth close on mobile
  links.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = document.getElementById('navbarNav');
      if (bsCollapse?.classList.contains('show')) {
        const bootstrapCollapse = bootstrap.Collapse.getInstance(bsCollapse);
        bootstrapCollapse?.hide();
      }
    });
  });

  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
}

/* ==============================
   TYPING EFFECT
   ============================== */
function initTypingEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Software Engineer',
    'ASP.NET Developer',
    'Full Stack Developer',
    'Problem Solver',
    'UI/UX Enthusiast',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function type() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2000);
      }
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    if (!paused) {
      const speed = deleting ? 50 : 90;
      setTimeout(type, speed);
    } else {
      setTimeout(type, 100);
    }
  }
  type();
}

/* ==============================
   SKILL TABS
   ============================== */
function initSkillTabs() {
  const buttons = document.querySelectorAll('.skills-tab-btn');
  const contents = document.querySelectorAll('.skills-tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${target}`);
      targetContent?.classList.add('active');

      // Re-animate bars in new tab
      setTimeout(() => animateBarsInContainer(targetContent), 100);
    });
  });
}

/* ==============================
   SKILL BARS
   ============================== */
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBarsInContainer(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}

function animateBarsInContainer(container) {
  if (!container) return;
  const bars = container.querySelectorAll('.skill-fill');
  bars.forEach(bar => {
    const width = bar.style.getPropertyValue('--w') || '0%';
    bar.style.width = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = width;
      });
    });
  });
}

/* ==============================
   COUNTERS
   ============================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

/* ==============================
   CONTACT FORM
   ============================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('successToast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('formName');
    const email   = document.getElementById('formEmail');
    const subject = document.getElementById('formSubject');
    const message = document.getElementById('formMessage');
    const fields  = [name, email, subject, message];

    let valid = true;
    fields.forEach(f => {
      f.classList.remove('error');
      if (!f.value.trim()) { f.classList.add('error'); valid = false; }
    });

    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      form.reset();
      showToast(toast);
    }, 1500);
  });

  // Remove error on input
  form.querySelectorAll('.form-input-custom').forEach(input => {
    input.addEventListener('input', () => input.classList.remove('error'));
  });
}

function showToast(toast) {
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ==============================
   BACK TO TOP
   ============================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==============================
   SKILL BARS – ACTIVATE ON FIRST TAB LOAD
   ============================== */
window.addEventListener('load', () => {
  const firstTab = document.getElementById('tab-frontend');
  if (firstTab) {
    setTimeout(() => animateBarsInContainer(firstTab), 500);
  }
});
