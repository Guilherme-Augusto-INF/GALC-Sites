(() => {
  'use strict';

  // Preserve real anchors for copying, opening in new tabs and no-JS navigation.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href^="#"]');
    if (!link || link.classList.contains('skip') || link.hasAttribute('download') ||
        (link.target && link.target !== '_self')) return;

    const hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;

    let id;
    try { id = decodeURIComponent(hash.slice(1)); }
    catch { return; }
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hadTabindex = section.hasAttribute('tabindex');
    if (!hadTabindex) {
      section.setAttribute('tabindex', '-1');
      section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
    }
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
})();
