(() => {
  "use strict";

  /* ---------- Theme toggle (in-memory, defaults to system preference) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));

  themeToggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[data-nav]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Skill bar fill on scroll ---------- */
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-filled');
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  /* ---------- Skills tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      document.querySelectorAll('.skills-panel').forEach(p => p.classList.add('is-hidden'));
      const panel = document.getElementById(`panel-${btn.dataset.tab}`);
      if (panel) {
        panel.classList.remove('is-hidden');
        panel.querySelectorAll('.bar-fill').forEach(b => b.classList.add('is-filled'));
      }
    });
  });

  /* ---------- Hero console typing animation ---------- */
  const consoleEl = document.getElementById('typedConsole');
  const consoleText = `{
  "developer": "Praveen S",
  "role": "Full Stack Developer",
  "stack": ["Laravel", "PHP", "React.js", "MySQL"],
  "experience_years": 1.5,
  "status": "available_for_hire",
  "response_time_ms": 87
}`;
  let i = 0;
  function typeConsole() {
    if (i <= consoleText.length) {
      consoleEl.textContent = consoleText.slice(0, i);
      i++;
      setTimeout(typeConsole, 14);
    }
  }
  typeConsole();

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Scroll to top ---------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Contact form (client-side; wire to a backend/Formspree to send) ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in all fields.';
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:slpraveen13@gmail.com?subject=${subject}&body=${body}`;
    formNote.textContent = 'Opening your email client…';
    form.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
