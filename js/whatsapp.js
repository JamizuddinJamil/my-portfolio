// ============================================================
// Floating WhatsApp button , included on every page.
// Edit WHATSAPP_NUMBER and WHATSAPP_MESSAGE below; every page
// picks up the change automatically since they all load this
// one file.
// ============================================================

// TODO: replace with your real WhatsApp number in international
// format, digits only, no +, no spaces, no leading 0.
// Example for a Malaysian mobile 012-345 6789 -> "60123456789"
const WHATSAPP_NUMBER = "+60177547847"; // <-- PLACEHOLDER, must be replaced

const WHATSAPP_MESSAGE = "Hi Jamiz, I found your site and I'd like to ask about a project.";

(function initWhatsAppFloat() {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  const link = document.createElement('a');
  link.href = href;
  link.className = 'wa-float';
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', 'Chat on WhatsApp');
  link.innerHTML = `
    <span class="wa-ring" aria-hidden="true"></span>
    <span class="wa-tooltip">Chat on WhatsApp</span>
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.353.615 4.647 1.784 6.667L2.667 29.333l6.84-1.756a13.27 13.27 0 0 0 6.497 1.69h.006c7.362 0 13.333-5.97 13.333-13.334 0-3.56-1.387-6.907-3.906-9.427a13.24 13.24 0 0 0-9.433-3.906v.067zm0 24.4h-.005a11.06 11.06 0 0 1-5.636-1.542l-.404-.24-4.06 1.043 1.084-3.958-.264-.406a11.05 11.05 0 0 1-1.696-5.898c0-6.116 4.978-11.093 11.096-11.093a11.02 11.02 0 0 1 7.844 3.25 11.02 11.02 0 0 1 3.25 7.85c-.003 6.117-4.98 11.094-11.11 11.094zm6.088-8.31c-.334-.167-1.978-.976-2.284-1.088-.306-.11-.53-.166-.752.167-.222.334-.86 1.088-1.055 1.31-.194.223-.388.25-.72.084-.334-.167-1.408-.52-2.682-1.657-.99-.885-1.66-1.977-1.855-2.31-.194-.334-.02-.514.147-.68.15-.15.334-.39.5-.585.167-.194.222-.334.334-.556.11-.223.055-.417-.028-.585-.083-.167-.752-1.815-1.03-2.485-.27-.65-.546-.562-.752-.572l-.64-.012c-.222 0-.583.083-.888.417-.306.334-1.167 1.14-1.167 2.78 0 1.64 1.194 3.225 1.36 3.448.167.222 2.35 3.59 5.695 5.034.796.343 1.417.549 1.902.703.799.254 1.526.218 2.101.132.641-.096 1.978-.809 2.257-1.59.278-.782.278-1.452.194-1.59-.083-.14-.306-.223-.64-.39z"/>
    </svg>
  `;
  document.body.appendChild(link);
})();
