/* Optional display preference; no analytics or personal data. */
(function () {
  'use strict';
  var key = 'galc-theme';
  var root = document.documentElement;
  function savedTheme() {
    try { return localStorage.getItem(key) === 'dark' ? 'dark' : 'light'; }
    catch (_) { return 'light'; }
  }
  function apply(theme) {
    root.dataset.theme = theme;
    var button = document.getElementById('themeToggle');
    if (button) {
      var label = theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro';
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }
  apply(savedTheme());
  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('themeToggle');
    if (!button) return;
    apply(root.dataset.theme);
    button.hidden = false;
    button.addEventListener('click', function () {
      var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      try { localStorage.setItem(key, theme); } catch (_) { /* Theme still works for this page. */ }
    });
  });
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === null) apply(savedTheme());
  });
}());
