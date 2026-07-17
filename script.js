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
  const existingNote = contactForm.querySelector('.form-note');

  if (existingNote) {
    existingNote.textContent = 'Die Anfrage wird sicher direkt über die Website gesendet.';
  }

  const statusMessage = document.createElement('div');
  statusMessage.className = 'form-status';
  statusMessage.setAttribute('role', 'status');
  statusMessage.setAttribute('aria-live', 'polite');
  statusMessage.hidden = true;
  contactForm.appendChild(statusMessage);

  const setStatus = (type, title, text) => {
    statusMessage.className = `form-status form-status--${type}`;
    statusMessage.innerHTML = `<span class="form-status__icon" aria-hidden="true">${type === 'success' ? '✓' : '!'}</span><span><strong>${title}</strong><small>${text}</small></span>`;
    statusMessage.hidden = false;
    statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const originalButtonText = submitButton?.textContent || 'Anfrage senden';
    const formData = new FormData(contactForm);
    const artwork = String(formData.get('artwork') || '').trim();

    formData.append('access_key', '3c793518-60f0-4b4f-a3ea-0d1d9c12decb');
    formData.append('subject', artwork ? `Neue Anfrage zu „${artwork}“` : 'Neue Anfrage über Adrianas Atelier');
    formData.append('from_name', 'Adrianas Atelier Website');
    formData.append('replyto', String(formData.get('email') || '').trim());
    formData.append('botcheck', '');

    statusMessage.hidden = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet …';
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Der Versanddienst hat die Anfrage nicht angenommen.');
      }

      contactForm.reset();
      setStatus(
        'success',
        'Anfrage erfolgreich gesendet',
        'Vielen Dank! Wir haben deine Nachricht erhalten und melden uns so bald wie möglich.'
      );
    } catch (error) {
      console.error('Kontaktformular:', error);
      setStatus(
        'error',
        'Das Senden hat nicht funktioniert',
        'Bitte versuche es erneut oder schreibe direkt an atelierbyadriana@gmail.com.'
      );
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

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
