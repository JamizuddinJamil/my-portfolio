/* ============================================================
   PORTFOLIO — main.js
   Author: Abd Jamizuddin Bin Abd Jamil
   ============================================================ */

'use strict';

/* ─── THEME TOGGLE ──────────────────────────────────────────── */
(function initTheme() {
  const saved = localStorage.getItem('portfolio-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
  /* ─── THEME ─────────────────────────────────────────────── */
  const themeBtn = document.getElementById('theme-toggle');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  const currentTheme = localStorage.getItem('portfolio-theme') || 'light';
  setTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ─── MOBILE MENU ───────────────────────────────────────── */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks   = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.classList.toggle('active', open);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
      });
    });
  }

  /* ─── ACTIVE NAV LINK ───────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  /* ─── SCROLL REVEAL ─────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ─── SCROLL TO TOP ─────────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── PROJECT FILTERING ─────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const type = card.dataset.type;
          const show = filter === 'all' || type === filter;
          card.setAttribute('data-hidden', String(!show));

          if (show) {
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = '';
            });
          }
        });
      });
    });
  }

  /* ─── CONTACT FORM VALIDATION ───────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const fields = {
      name:    { el: contactForm.querySelector('#name'),    rule: v => v.trim().length >= 2 },
      email:   { el: contactForm.querySelector('#email'),   rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      subject: { el: contactForm.querySelector('#subject'), rule: v => v.trim().length >= 3 },
      message: { el: contactForm.querySelector('#message'), rule: v => v.trim().length >= 15 },
    };

    function validateField(key) {
      const { el, rule } = fields[key];
      if (!el) return true;
      const valid = rule(el.value);
      const errEl = document.getElementById(`${key}-error`);
      el.classList.toggle('error', !valid);
      if (errEl) errEl.classList.toggle('visible', !valid);
      return valid;
    }

    Object.keys(fields).forEach(key => {
      const el = fields[key].el;
      if (el) {
        el.addEventListener('blur', () => validateField(key));
        el.addEventListener('input', () => {
          if (el.classList.contains('error')) validateField(key);
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const allValid = Object.keys(fields).map(validateField).every(Boolean);
      if (!allValid) return;

      const submitBtn = contactForm.querySelector('.form-submit');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        const successEl = document.getElementById('form-success');
        if (successEl) {
          successEl.classList.add('visible');
          setTimeout(() => successEl.classList.remove('visible'), 5000);
        }
      }, 1200);
    });
  }

  /* ─── LAZY LOAD IMAGES ──────────────────────────────────── */
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window && lazyImages.length) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

  /* ─── NAVBAR SCROLL EFFECT ──────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 20 ? 'var(--shadow)' : 'none';
    }, { passive: true });
  }

  /* ─── MENU TOGGLE ANIMATION ─────────────────────────────── */
  if (menuToggle) {
    const spans = menuToggle.querySelectorAll('span');
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('active');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }
});
