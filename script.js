/* =============================================
   RAJNISH JAISWAR — PORTFOLIO SCRIPTS
   Premium Dark Theme — Particles, Typing, Animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Cursor Glow (Indigo) ──
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile Nav Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
      }
    });
  }

  // ── Typing Effect ──
  const typedTextEl = document.getElementById('typedText');
  const phrases = [
    'BSc IT Student',
    'Software Developer',
    'Web Developer',
    'Cybersecurity Enthusiast',
    'AI/ML Explorer',
    'UI/UX Designer',
    'Creative Professional',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function type() {
    if (!typedTextEl) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingDelay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400;
    }

    setTimeout(type, typingDelay);
  }

  type();

  // ── Scroll Animations (Intersection Observer) ──
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger animations among siblings
        const siblings = entry.target.parentElement?.querySelectorAll('.animate-on-scroll');
        let siblingIndex = 0;
        if (siblings) {
          siblings.forEach((sib, i) => {
            if (sib === entry.target) siblingIndex = i;
          });
        }

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, siblingIndex * 80);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));

  // ── Stat Counter Animation ──
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const count = parseInt(target.getAttribute('data-count'), 10);
          animateCounter(target, 0, count, 1500);
          statObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => statObserver.observe(el));

  function animateCounter(el, start, end, duration) {
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.floor(eased * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // ── Hero Floating Particles (Indigo/Violet/Cyan glowing orbs) ──
  const particlesContainer = document.getElementById('heroParticles');

  if (particlesContainer) {
    const particleCount = 35;
    const colors = [
      { bg: '#6366f1', glow: 'rgba(99, 102, 241, 0.6)' },
      { bg: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.6)' },
      { bg: '#06b6d4', glow: 'rgba(6, 182, 212, 0.6)' },
      { bg: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)' },
      { bg: '#22c55e', glow: 'rgba(34, 197, 94, 0.4)' },
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 5 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 18;
      const duration = Math.random() * 12 + 10;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color.bg};
        left: ${left}%;
        bottom: -10px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        box-shadow: 0 0 ${size * 3}px ${color.glow}, 0 0 ${size * 6}px ${color.glow};
      `;

      particlesContainer.appendChild(particle);
    }
  }

  // ── Footer Year ──
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // ── Smooth Scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Card 3D Tilt Effect ──
  const tiltCards = document.querySelectorAll('.skill-card, .project-card, .strength-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
