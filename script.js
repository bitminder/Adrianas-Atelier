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
  contactForm.action = 'https://api.web3forms.com/submit';
  contactForm.method = 'POST';

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

  addHiddenField('access_key', '3c793518-60f0-4b4f-a3ea-0d1d9c12decb');
  addHiddenField('subject', 'Neue Anfrage über Adrianas Atelier');
  addHiddenField('from_name', 'Adrianas Atelier Website');
  addHiddenField('redirect', 'https://adrianas-atelier.com/danke.html');

  const botcheck = document.createElement('input');
  botcheck.type = 'checkbox';
  botcheck.name = 'botcheck';
  botcheck.className = 'sr-only';
  botcheck.tabIndex = -1;
  botcheck.autocomplete = 'off';
  contactForm.appendChild(botcheck);

  const existingNote = contactForm.querySelector('.form-note');
  if (existingNote) {
    existingNote.innerHTML = 'Die Anfrage wird sicher über Web3Forms an uns übermittelt. Das Absenden ist unverbindlich und stellt noch keine Bestellung dar.';
  }

  const legalNotice = document.createElement('p');
  legalNotice.className = 'form-note';
  legalNotice.innerHTML = 'Mit dem Absenden werden deine Angaben zur Bearbeitung der Anfrage verarbeitet. Weitere Informationen findest du in unserer <a href="/datenschutz.html">Datenschutzerklärung</a>.';
  contactForm.appendChild(legalNotice);

  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = 'Anfrage senden';
  }

  contactForm.addEventListener('submit', () => {
    const email = contactForm.querySelector('input[name="email"]');
    if (email?.value) addHiddenField('replyto', email.value.trim());

    const artwork = contactForm.querySelector('input[name="artwork"]');
    const artworkName = artwork?.value.trim();
    addHiddenField('subject', artworkName ? `Neue Anfrage zu „${artworkName}“` : 'Neue Anfrage über Adrianas Atelier');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet …';
    }
  });
}

const footerLinks = document.querySelector('.footer-links');
if (footerLinks) {
  const ensureFooterLink = (href, label) => {
    if (!footerLinks.querySelector(`a[href="${href}"]`)) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      footerLinks.appendChild(link);
    }
  };

  ensureFooterLink('/impressum.html', 'Impressum');
  ensureFooterLink('/datenschutz.html', 'Datenschutz');
}

document.querySelector('#show-more')?.addEventListener('click', (event) => {
  event.currentTarget.textContent = 'Weitere Werke folgen bald ✦';
  event.currentTarget.disabled = true;
});

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
