// ============================================================
// Shared behaviors used across all pages. Every block checks
// that its target element exists before running, so this one
// file is safe to include on every page regardless of layout.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- header scroll state ----
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  // ---- mobile menu ----
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---- scroll reveal ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach(el => el.classList.add('in'));
    } else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in'));
    }
  }

  // ---- terminal typing effect (home page hero only) ----
  const typeTarget = document.getElementById('typeTarget');
  if (typeTarget) {
    const script = [
      { prompt: '$ ', text: 'whoami', type: 'cmd' },
      { text: 'Abd Jamizuddin — Full Stack Developer\nJohor, Malaysia', type: 'out' },
      { prompt: '$ ', text: 'cat focus.txt', type: 'cmd' },
      { text: 'HTML5, CSS3, JavaScript (ES6+), Next.js · React · Node.js · Supabase\nBuilding for startups, SMBs & e-commerce', type: 'out' },
      { prompt: '$ ', text: 'status', type: 'cmd' },
      { text: '● available for new projects', type: 'out-accent' }
    ];

    function renderStatic() {
      typeTarget.innerHTML = script.map(s => {
        if (s.type === 'cmd') return `<div class="line"><span class="prompt">${s.prompt}</span>${s.text}</div>`;
        if (s.type === 'out-accent') return `<div class="line" style="color:var(--available);">${s.text}</div>`;
        return `<div class="line out">${s.text}</div>`;
      }).join('');
    }

    if (reduceMotion) {
      renderStatic();
    } else {
      let i = 0;
      function typeLine() {
        if (i >= script.length) {
          const caret = document.createElement('span');
          caret.className = 'caret';
          typeTarget.appendChild(caret);
          return;
        }
        const s = script[i];
        const div = document.createElement('div');
        div.className = 'line';
        if (s.type === 'out-accent') div.style.color = 'var(--available)';
        typeTarget.appendChild(div);
        let charIndex = 0;
        const text = s.text;
        const speed = s.type === 'cmd' ? 55 : 12;
        function typeChar() {
          if (charIndex < text.length) {
            div.innerHTML = (s.type === 'cmd' ? `<span class="prompt">${s.prompt}</span>` : '') + text.slice(0, charIndex + 1).replace(/\n/g, '<br>');
            charIndex++;
            setTimeout(typeChar, speed);
          } else {
            i++;
            setTimeout(typeLine, 260);
          }
        }
        typeChar();
      }
      setTimeout(typeLine, 400);
    }
  }

  // ---- project filters (projects page / home preview) ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('projectGrid');
  if (filterBtns.length && grid) {
    const cards = grid.querySelectorAll('.card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const show = filter === 'all' || card.dataset.cat === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ---- contact form validation + simulated submit ----
  // NOTE: replace the marked block with a real POST (Formspree,
  // EmailJS, or your own endpoint) before relying on this for leads.
  const form = document.getElementById('contactForm');
  if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      [...form.querySelectorAll('[required]')].forEach(input => {
        const fieldWrap = input.closest('.field');
        if (!input.checkValidity()) {
          valid = false;
          if (fieldWrap) fieldWrap.classList.add('error');
        } else if (fieldWrap) {
          fieldWrap.classList.remove('error');
        }
      });

      const hpField = form.querySelector('[name="company"]');
      if (hpField && hpField.value) return; // honeypot — likely a bot

      if (!valid) {
        formStatus.textContent = 'Please fix the highlighted fields.';
        formStatus.className = 'form-status';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formStatus.textContent = '';

      // ---- REPLACE THIS BLOCK with a real submission ----
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Project Enquiry';
        formStatus.textContent = "Thanks — I've received your enquiry and will get back to you within 24–48 hours.";
        formStatus.className = 'form-status success';
        form.reset();
        form.querySelectorAll('.field').forEach(f => f.classList.remove('error'));
      }, 900);
      // ---- END placeholder submission block ----
    });
  }

  // ---- copy email button (footer, all pages) ----
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'abdjamizuddin@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        // clipboard API unavailable — fail silently, address is still visible
      }
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Email copied ✓';
      setTimeout(() => { copyBtn.textContent = original; }, 1800);
    });
  }

});
