/* ============================================================
   BLOG MODALS — blog-modal.js
   ============================================================ */

'use strict';

(function () {
  const backdrop    = document.getElementById('modal-backdrop');
  const allModals   = document.querySelectorAll('.modal');
  let   activeModal = null;
  let   lastTrigger = null;

  /* ── Open ─────────────────────────────────────────────────── */
  function openModal(id, triggerEl) {
    const modal = document.getElementById(id);
    if (!modal) return;

    // Close any open modal first
    if (activeModal) closeModal(false);

    lastTrigger  = triggerEl || null;
    activeModal  = modal;

    backdrop.classList.add('active');
    backdrop.removeAttribute('aria-hidden');

    modal.classList.add('active');
    modal.removeAttribute('aria-hidden');

    document.body.classList.add('modal-open');

    // Focus the modal for accessibility
    modal.focus();

    // Scroll modal body to top
    const body = modal.querySelector('.modal-body');
    if (body) body.scrollTop = 0;
  }

  /* ── Close ────────────────────────────────────────────────── */
  function closeModal(returnFocus = true) {
    if (!activeModal) return;

    activeModal.classList.remove('active');
    activeModal.setAttribute('aria-hidden', 'true');

    backdrop.classList.remove('active');
    backdrop.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');

    if (returnFocus && lastTrigger) {
      lastTrigger.focus();
    }

    activeModal  = null;
    lastTrigger  = null;
  }

  /* ── Trigger buttons ([data-modal]) ──────────────────────── */
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.modal, btn);
    });
  });

  /* ── Close buttons ([data-close]) ────────────────────────── */
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal());
  });

  /* ── Backdrop click ───────────────────────────────────────── */
  backdrop.addEventListener('click', () => closeModal());

  /* ── Escape key ───────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) closeModal();
  });

  /* ── Focus trap ───────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !activeModal) return;

    const focusable = activeModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

})();