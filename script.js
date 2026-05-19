const themeBtn = document.getElementById('themeBtn');
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');

const preferredTheme = localStorage.getItem('theme');
if (preferredTheme) {
  document.documentElement.setAttribute('data-theme', preferredTheme);
  themeBtn.textContent = preferredTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
}

themeBtn.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  themeBtn.textContent = nextTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
});

navToggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

const links = document.querySelectorAll('.nav a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
  });
});
