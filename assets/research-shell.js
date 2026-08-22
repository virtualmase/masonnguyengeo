(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const nav = header.querySelector('.nav');
  const toggle = header.querySelector('.nav-toggle');
  const links = header.querySelectorAll('.nav-links a');
  if (!nav || !toggle) return;

  const closeNav = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });

  links.forEach((link) => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeNav();
  });
})();
