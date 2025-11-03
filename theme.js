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

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  const darkMode = savedTheme === 'dark';
  if (darkMode) body.classList.add('dark-mode');
  setIcon(toggleBtn, darkMode);
  favicon.href = darkMode ? '/assets/logo/kyme-logo-dark.ico' : '/assets/logo/kyme-logo-light.ico';

  // Handle theme toggle
  toggleBtn?.addEventListener('click', () => {
    const dark = body.classList.toggle('dark-mode');
    setIcon(toggleBtn, dark);
    favicon.href = dark ? '/assets/logo/kyme-logo-dark.ico' : '/assets/logo/kyme-logo-light.ico';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
});
