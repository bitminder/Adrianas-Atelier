const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation?.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('is-open');
  });
});

document.querySelectorAll('.inquiry-button').forEach((button) => {
  button.addEventListener('click', () => {
    const artwork = button.dataset.artwork || '';
    const field = document.querySelector('#artwork-field');
    if (field) field.value = artwork;
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' });
  });
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const iframeName = 'contact-form-target';
  const iframe = document.createElement('iframe');
  iframe.name = iframeName;
  iframe.title = 'Formularübermittlung';
  iframe.hidden = true;
  document.body.appendChild(iframe);

  contactForm.action = 'https://formsubmit.co/atelierbyadriana@gmail.com';
  contactForm.method = 'POST';
  contactForm.target = iframeName;

  const addHiddenField = (name, value) => {
    let input = contactForm.querySelector(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      contactForm.appendChild(input);
    }
    input.value = value;
  };

  addHiddenField('_subject', 'Neue Anfrage über Adrianas Atelier');
  addHiddenField('_template', 'table');
  addHiddenField('_captcha', 'false');
  addHiddenField('_next', 'https://adrianas-atelier.com/#kontakt');

  const existingNote = contactForm.querySelector('.form-note');
  if (existingNote) {
    existingNote.textContent = 'Die Anfrage wird direkt über die Website gesendet.';
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const statusMessage = document.createElement('p');
  statusMessage.className = 'form-note';
  statusMessage.setAttribute('role', 'status');
  statusMessage.setAttribute('aria-live', 'polite');
  contactForm.appendChild(statusMessage);

  let submitted = false;

  contactForm.addEventListener('submit', () => {
    submitted = true;
    statusMessage.textContent = 'Die Anfrage wird gesendet …';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet …';
    }
  });

  iframe.addEventListener('load', () => {
    if (!submitted) return;

    submitted = false;
    contactForm.reset();
    statusMessage.textContent = 'Vielen Dank! Deine Anfrage wurde übermittelt.';

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Anfrage senden';
    }
  });
}

document.querySelector('#show-more')?.addEventListener('click', (event) => {
  event.currentTarget.textContent = 'Weitere Werke folgen bald ✦';
  event.currentTarget.disabled = true;
});

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
