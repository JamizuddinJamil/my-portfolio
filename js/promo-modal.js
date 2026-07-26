// ============================================================
// Promo popup , shows once per browser session (not on every
// single page click, just once per visit) so it stays useful
// instead of annoying. Edit the CONFIG block below to change
// the image, headline, text, and button.
// ============================================================

const PROMO_CONFIG = {
  enabled: true,                 // set to false to turn the popup off entirely
  showOnceKey: "promoModalShown_v1",
  delayMs: 700,                  // wait a moment after page load before showing
  eyebrow: "📣 Promo",
  headline: "New: limited slots open this month",
  text: "Special promotion limited to the first 10 clients. Grab yours now before time runs out!",
  ctaLabel: "Get a Free Quote",
  ctaHref: "contact.html",
  // Put your image at assets/images/promo.jpg , this shows a
  // placeholder box until that file exists.
  imageSrc: "assets/images/promo.jpg"
};

(function initPromoModal() {
  if (!PROMO_CONFIG.enabled) return;
  if (sessionStorage.getItem(PROMO_CONFIG.showOnceKey)) return;

  const overlay = document.createElement('div');
  overlay.className = 'promo-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Promotion');

  overlay.innerHTML = `
    <div class="promo-modal">
      <button class="promo-close" aria-label="Close">✕</button>
      <div class="promo-image">
        <img src="${PROMO_CONFIG.imageSrc}" alt="Promotion"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div class="ph" style="display:none;">Add your promo image at<br>${PROMO_CONFIG.imageSrc}</div>
      </div>
      <div class="promo-body">
        <span class="promo-eyebrow">${PROMO_CONFIG.eyebrow}</span>
        <h3>${PROMO_CONFIG.headline}</h3>
        <p>${PROMO_CONFIG.text}</p>
        <a href="${PROMO_CONFIG.ctaHref}" class="btn btn-primary">${PROMO_CONFIG.ctaLabel}</a>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  function closeModal() {
    overlay.classList.remove('open');
    sessionStorage.setItem(PROMO_CONFIG.showOnceKey, '1');
    setTimeout(() => overlay.remove(), 300);
  }

  overlay.querySelector('.promo-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(); // click outside the card
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  setTimeout(() => {
    overlay.classList.add('open');
  }, PROMO_CONFIG.delayMs);
})();
