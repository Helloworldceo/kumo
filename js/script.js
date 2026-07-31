// =========================================================
// KUMO Bakery — site interactions
// =========================================================

// ---- Mobile nav toggle ----
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu after tapping a link
  mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

// ---- Scroll fade-in for sections ----
const fadeSections = document.querySelectorAll('.fade-section');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeSections.forEach((section) => observer.observe(section));
} else {
  // Fallback: no IntersectionObserver support
  fadeSections.forEach((section) => section.classList.add('is-visible'));
}

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---- Pre-order form: build a prefilled WhatsApp message ----
const WHATSAPP_NUMBER = '59160168'; // TODO: replace with full international number, e.g. 855XXXXXXXX

const preorderForm = document.getElementById('preorderForm');
const formNote = document.getElementById('formNote');

if (preorderForm) {
  // Prevent picking a pickup date in the past
  const pickupDateInput = document.getElementById('pickupDate');
  if (pickupDateInput) {
    pickupDateInput.min = new Date().toISOString().split('T')[0];
  }

  preorderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;
    const pickupDate = document.getElementById('pickupDate').value;

    const message =
      `Hi KUMO! I'd like to place a pre-order 🍪☁️\n\n` +
      `Name: ${name}\n` +
      `Item: ${item}\n` +
      `Quantity: ${quantity}\n` +
      `Pickup Date: ${pickupDate}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (formNote) {
      formNote.textContent = 'Opening WhatsApp…';
    }

    window.open(url, '_blank', 'noopener');
    preorderForm.reset();
  });
}
