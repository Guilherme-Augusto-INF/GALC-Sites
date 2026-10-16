(() => {
  'use strict';
  const cfg = window.SITE_CONFIG || {};
  const $ = (q) => document.querySelector(q);
  const $$ = (q) => document.querySelectorAll(q);
  const validPhone = /^\d{11,15}$/.test(cfg.whatsapp || '');
  $$('[data-brand]').forEach(el => el.textContent = cfg.brand || 'GALC-Sites');
  $$('[data-price]').forEach(el => el.textContent = cfg.prices?.[el.dataset.price] || 'Sob consulta');
  $('#year').textContent = new Date().getFullYear();
  const email = $('#footerEmail');
  if (email) { const address = (cfg.email || '').trim(); if (address && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) { email.href = `mailto:${address}`; email.textContent = address; email.hidden = false; } else { email.hidden = true; email.removeAttribute('href'); } }
  if (cfg.instagram && /^https:\/\//.test(cfg.instagram)) { $('#instagramLink').href = cfg.instagram; $('#instagramLink').hidden = false; }
  $$('.whatsapp-link').forEach(a => {
    if (validPhone) { a.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(cfg.whatsappMessage || a.dataset.message || 'Olá! Gostaria de solicitar um orçamento.')}`; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else { a.href = '#contato'; a.title = 'Configure o WhatsApp no arquivo js/config.js'; }
  });
  const toggle = $('#menuToggle'), nav = $('#mainNav');
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded)); nav.classList.toggle('open', !expanded);
    toggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu');}));
  $$('.plan-action').forEach(a => a.addEventListener('click', () => {
    const select = $('#projectType'); const plan = a.dataset.plan || '';
    const known = [...select.options].find(opt => opt.value === plan);
    if (known) select.value = known.value;
    else select.value = 'Outro / Não sei ainda';
    const message = $('textarea[name="message"]'); if (message && !message.value.trim()) message.value = `Tenho interesse em um site inspirado em: ${plan}.`;
  }));
  const form = $('#contactForm'), feedback = $('#formFeedback'), accessInput = $('#formAccessKey');
  if (accessInput) accessInput.value = cfg.web3formsAccessKey || '';
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!cfg.web3formsAccessKey) { feedback.textContent = 'Formulário ainda não configurado. Adicione a chave gratuita do Web3Forms em js/config.js ou entre em contato pelo WhatsApp.'; feedback.classList.add('error'); return; }
    const button = form.querySelector('button[type="submit"]'); button.disabled = true; button.textContent = 'Enviando...'; feedback.classList.remove('error'); feedback.textContent = 'Enviando sua mensagem...';
    try {
      const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 12000);
      let response;
      try { response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form), signal: controller.signal }); }
      finally { clearTimeout(timeout); }
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error('Falha no envio');
      feedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato pelo número informado.';
      form.reset();
      // O reset limpa campos hidden também; restaura a chave para um novo envio.
      if (accessInput) accessInput.value = cfg.web3formsAccessKey || '';
    } catch { feedback.textContent = 'Não foi possível enviar. Verifique sua conexão e tente novamente ou utilize o WhatsApp.'; feedback.classList.add('error'); }
    finally { button.disabled = false; button.textContent = 'Enviar solicitação ↗'; }
  });
  // Consentimento opcional: o banner NÃO ativa tags sem escolha explícita.
  const banner = $('#cookieBanner'); let consent;
  try { consent = localStorage.getItem('site-cookie-choice'); } catch { consent = null; }
  if (!consent && banner) banner.hidden = false;
  function injectScript(src) { const s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  function loadOptionalTracking() {
    if (cfg.ga4Id && /^G-[A-Z0-9]+$/.test(cfg.ga4Id)) {
      injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.ga4Id)}`);
      window.dataLayer = window.dataLayer || []; window.gtag = function(){ window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', cfg.ga4Id);
    }
    if (cfg.metaPixelId && /^\d+$/.test(cfg.metaPixelId)) {
      /* Stub oficial do Pixel carrega somente após aceitação. */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init',cfg.metaPixelId);window.fbq('track','PageView');
    }
  }
  if (consent === 'accepted') loadOptionalTracking();
  function choose(value) { try { localStorage.setItem('site-cookie-choice', value); } catch {} banner.hidden = true; if (value === 'accepted') loadOptionalTracking(); }
  $('#acceptCookies')?.addEventListener('click', () => choose('accepted'));
  $('#rejectCookies')?.addEventListener('click', () => choose('rejected'));
})();