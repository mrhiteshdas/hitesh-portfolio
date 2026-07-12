/* =============================================================
   Hitesh Chandra Das — Portfolio
   Shared site behaviour
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initScrollReveal();
  initTerminalTyping();
  initContactForm();
  markActiveNavLink();
});

/* ---------------------------------------------------------
   Mobile nav toggle
   --------------------------------------------------------- */
function initNavToggle() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (!header || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after a link is picked (mobile)
  header.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => header.classList.remove('nav-open'));
  });
}

/* ---------------------------------------------------------
   Highlight current page in nav
   --------------------------------------------------------- */
function markActiveNavLink() {
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
    if (link.dataset.page === current) link.classList.add('active');
  });
}

/* ---------------------------------------------------------
   Scroll reveal for sections/cards
   --------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Inject visible-state rule once
  const style = document.createElement('style');
  style.textContent = '[data-reveal].is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}

/* ---------------------------------------------------------
   Terminal-style typing effect in the hero (signature element)
   --------------------------------------------------------- */
function initTerminalTyping() {
  const body = document.querySelector('.terminal-body');
  if (!body) return;

  const lines = [
    { text: "const student = {", cls: '' },
    { text: "  name: 'Hitesh Chandra Das',", cls: 'string-line' },
    { text: "  course: 'MCA (Master of Computer Applications)',", cls: 'string-line' },
    { text: "  focus: 'Full-Stack Development & Problem Solving',", cls: 'string-line' },
    { text: "  status: 'open_to_opportunities'", cls: 'string-line' },
    { text: "};", cls: '' },
  ];

  body.innerHTML = '';
  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;

  function typeStep() {
    if (lineIndex >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      body.appendChild(cursor);
      return;
    }

    const line = lines[lineIndex];

    if (charIndex === 0) {
      currentLineEl = document.createElement('div');
      body.appendChild(currentLineEl);
    }

    charIndex++;
    currentLineEl.textContent = line.text.slice(0, charIndex);

    if (charIndex < line.text.length) {
      setTimeout(typeStep, 14);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeStep, 90);
    }
  }

  typeStep();
}

/* ---------------------------------------------------------
   Contact form — client-side validation + mailto handoff
   (Static site, no backend: this opens the user's email
   client pre-filled with the message.)
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');
  const destinationEmail = form.dataset.destinationEmail || 'your-email@example.com';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { name: 'name', check: (v) => v.trim().length > 1, msg: 'Please enter your name.' },
      { name: 'email', check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
      { name: 'message', check: (v) => v.trim().length > 9, msg: 'Message should be at least 10 characters.' },
    ];

    const values = {};

    fields.forEach(({ name, check, msg }) => {
      const input = form.querySelector(`[name="${name}"]`);
      const row = input.closest('.form-row');
      const errorEl = row.querySelector('.error');
      values[name] = input.value;

      if (!check(input.value)) {
        row.classList.add('invalid');
        if (errorEl) errorEl.textContent = msg;
        valid = false;
      } else {
        row.classList.remove('invalid');
      }
    });

    if (!valid) {
      if (status) {
        status.textContent = '> Please fix the highlighted fields above.';
        status.classList.add('visible');
        status.style.color = '#d97b6c';
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    const mailtoLink = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = '> Opening your email client to send this message...';
      status.style.color = '';
      status.classList.add('visible');
    }

    window.location.href = mailtoLink;
    form.reset();
  });
}
