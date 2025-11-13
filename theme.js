document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const logo = document.getElementById('site-logo');
  const favicon = document.getElementById('favicon');
  const body = document.body;

  const setIcon = (btn, dark) => {
    const i = btn?.querySelector('i');
    if (!i) return;
    i.classList.toggle('fa-moon', !dark);
    i.classList.toggle('fa-sun', dark);
  };

  // Initialize from localStorage
  const savedTheme = localStorage.getItem('theme');
  const darkMode = savedTheme === 'dark';
  if (darkMode) body.classList.add('dark-mode');
  setIcon(toggleBtn, darkMode);

  if (logo) logo.src = darkMode 
    ? '/assets/logo/kyme-logo-dark.svg' 
    : '/assets/logo/kyme-logo-light.svg';
  if (favicon) favicon.href = darkMode 
    ? '/assets/logo/kyme-logo-dark.ico' 
    : '/assets/logo/kyme-logo-light.ico';

  // Toggle handler
  toggleBtn?.addEventListener('click', () => {
    const dark = body.classList.toggle('dark-mode');
    setIcon(toggleBtn, dark);
    if (logo) logo.src = dark 
      ? '/assets/logo/kyme-logo-dark.svg' 
      : '/assets/logo/kyme-logo-light.svg';
    if (favicon) favicon.href = dark 
      ? '/assets/logo/kyme-logo-dark.ico' 
      : '/assets/logo/kyme-logo-light.ico';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
});

var typed = new Typed("#element", {
  strings: [
    "System Administrator",
    "Front-end Designer",
    "Video Editor",
    "Graphics Designer"
  ],
  typeSpeed: 50,
  loop: true,
});

