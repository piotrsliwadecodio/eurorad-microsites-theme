const micrositeHeaderToggle = document.querySelector('.er-microsite-menu-toggle');
if (micrositeHeaderToggle) {
  console.log('microsite header toggle found');
  const siteNavigation = document.querySelector('.er-site-navigation');
  micrositeHeaderToggle.addEventListener('click', () => {
    const expanded = micrositeHeaderToggle.getAttribute('aria-expanded') === 'true' || false;
    micrositeHeaderToggle.setAttribute('aria-expanded', !expanded);
    siteNavigation.classList.toggle('active');
  }
  );
}