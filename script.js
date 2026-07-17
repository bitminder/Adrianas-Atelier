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
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const statusMessage = document.createElement('p');
  statusMessage.className = 'form-note';
  statusMessage.setAttribute('role', 'status');
  statusMessage.setAttribute('aria-live', 'polite');
  contactForm.appendChild(statusMessage);

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const artwork = String(data.get('artwork') || '').trim();
    const originalButtonText = submitButton?.textContent || 'Anfrage senden';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet …';
    }
    statusMessage.textContent = '';

    try {
      const response = await fetch('https://formsubmit.co/ajax/atelierbyadriana@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: String(data.get('name') || '').trim(),
          email: String(data.get('email') || '').trim(),
          artwork: artwork || 'Allgemeine Anfrage',
          message: String(data.get('message') || '').trim(),
          _subject: `Neue Anfrage${artwork ? ` zu „${artwork}“` : ''} über Adrianas Atelier`,
          _template: 'table'
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Die Anfrage konnte nicht gesendet werden.');
      }

      contactForm.reset();
      statusMessage.textContent = 'Vielen Dank! Deine Anfrage wurde erfolgreich gesendet.';
    } catch (error) {
      console.error(error);
      statusMessage.textContent = 'Das Senden hat leider nicht funktioniert. Bitte versuche es noch einmal oder schreibe direkt an atelierbyadriana@gmail.com.';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

document.querySelector('#show-more')?.addEventListener('click', (event) => {
  event.currentTarget.textContent = 'Weitere Werke folgen bald ✦';
  event.currentTarget.disabled = true;
});

document.querySelector('#year').textContent = new Date().getFullYear();
