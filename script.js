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
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Anfrage zu ${data.get('artwork') || 'einem Kunstwerk'}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\nKunstwerk: ${data.get('artwork') || '-'}\n\n${data.get('message')}`
  );
  window.location.href = `mailto:atelierbyadriana@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelector('#show-more')?.addEventListener('click', (event) => {
  event.currentTarget.textContent = 'Weitere Werke folgen bald ✦';
  event.currentTarget.disabled = true;
});

document.querySelector('#year').textContent = new Date().getFullYear();
