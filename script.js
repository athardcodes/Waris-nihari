const toggleButton = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (toggleButton && mobileNav) {
  toggleButton.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

const tabs = document.querySelectorAll('.tab');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
  });
});

const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      const original = button.textContent;
      button.textContent = 'Message sent';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
        form.reset();
      }, 1800);
    }
  });
}
