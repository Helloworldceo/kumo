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

// ---- Gallery lightbox ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryImages = document.querySelectorAll('[data-lightbox]');

if (lightbox && lightboxImg && galleryImages.length) {
  const openLightbox = (img) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
  };

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    lightboxImg.src = '';
  };

  galleryImages.forEach((img) => {
    img.addEventListener('click', () => openLightbox(img));
  });

  lightboxClose.addEventListener('click', closeLightbox);

  // Click the dark backdrop (not the image itself) to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
  });
}

// ---- Floating event pop-up ----
const eventPopup = document.getElementById('eventPopup');
const eventPopupClose = document.getElementById('eventPopupClose');
const EVENT_POPUP_DISMISSED_KEY = 'kumo-event-popup-dismissed';

if (eventPopup && eventPopupClose) {
  const alreadyDismissed = localStorage.getItem(EVENT_POPUP_DISMISSED_KEY) === 'true';

  if (!alreadyDismissed) {
    setTimeout(() => eventPopup.classList.remove('hidden'), 1500);
  }

  eventPopupClose.addEventListener('click', () => {
    eventPopup.classList.add('hidden');
    localStorage.setItem(EVENT_POPUP_DISMISSED_KEY, 'true');
  });

  // Dismiss once the visitor reaches the Events section itself
  const eventsSection = document.getElementById('events');
  if (eventsSection && 'IntersectionObserver' in window) {
    const popupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            eventPopup.classList.add('hidden');
          }
        });
      },
      { threshold: 0.3 }
    );
    popupObserver.observe(eventsSection);
  }
}

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---- Pre-order form: build a prefilled WhatsApp message ----
const WHATSAPP_NUMBER = '23059160168'; // Mauritius (+230) 5916 0168

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
