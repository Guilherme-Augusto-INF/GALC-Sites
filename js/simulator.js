(() => {
  'use strict';
  const root = document.querySelector('#quoteSimulator');
  if (!root) return;
  const planInputs = [...root.querySelectorAll('input[name="sim_plan"]')];
  const formOption = root.querySelector('#simContactForm');
  const formNote = root.querySelector('#simFormNote');
  const pages = root.querySelector('#simExtraPages');
  const pagesNote = root.querySelector('#simPagesNote');
  const custom = root.querySelector('#simCustom');
  const estimate = root.querySelector('#simEstimate');
  const detail = root.querySelector('#simDetail');
  const send = root.querySelector('#simSend');
  const money = amount => amount.toLocaleString('pt-BR', {style:'currency',currency:'BRL',maximumFractionDigits:0});
  // Valores exibidos são as bases comerciais já aprovadas. Adicionais usam faixas, nunca preço inventado.
  const plans = {
    basic: {label:'Site Básico',price:790},
    pro: {label:'Site Profissional',price:1490},
    store: {label:'Loja Virtual',price:3490}
  };
  let selection = '';
  function render() {
    const key = planInputs.find(i => i.checked)?.value || 'pro';
    const plan = plans[key];
    const isPro = key === 'pro';
    formOption.disabled = isPro;
    formOption.checked = isPro || formOption.checked;
    if (isPro) formOption.checked = true;
    formNote.textContent = isPro ? 'Incluído no Site Profissional, sem custo adicional.' : 'Não está incluído no escopo-base deste plano; preço sob consulta.';
    const n = Number(pages.value) || 0;
    pages.disabled = key === 'store';
    if (key === 'store') pages.value = '0';
    const count = key === 'store' ? 0 : n;
    pagesNote.textContent = key === 'store' ? 'Alterações no escopo da loja devem ser orçadas individualmente.' : 'Cada página adicional: R$ 150 a R$ 300, conforme escopo.';
    const min = plan.price + count * 150;
    const max = plan.price + count * 300;
    const needsQuote = custom.checked || (!isPro && formOption.checked);
    estimate.textContent = count ? money(min) + ' a ' + money(max) : 'A partir de ' + money(min);
    const notes = [plan.label, isPro ? 'formulário incluído' : formOption.checked ? 'formulário sob consulta' : 'sem formulário adicional'];
    if (count) notes.push(count + (count === 1 ? ' página adicional' : ' páginas adicionais'));
    if (custom.checked) notes.push('integração personalizada sob consulta');
    if (key === 'store') notes.push('extras de loja sob consulta');
    if (needsQuote) notes.push('preço final sujeito a itens sob consulta');
    selection = 'Simulação GALC-Sites: ' + notes.join('; ') + '. Valor inicial estimado: ' + estimate.textContent + '. Estimativa não vinculante.';
    detail.textContent = needsQuote ? 'Há itens sob consulta. O valor acima não inclui esses itens.' : 'Faixa estimada apenas para o escopo e as páginas selecionadas.';
  }
  planInputs.forEach(input => input.addEventListener('change', () => {
    if (input.value !== 'pro') formOption.checked = false;
    render();
  }));
  [pages,formOption,custom].forEach(el => el.addEventListener('change', render));
  send.addEventListener('click', () => {
    const key = planInputs.find(i => i.checked)?.value || 'pro';
    const form = document.querySelector('#contactForm');
    const projectType = document.querySelector('#projectType');
    const summary = document.querySelector('#simQuoteSummary');
    const message = form?.querySelector('textarea[name="message"]');
    if (summary) summary.value = selection;
    if (projectType) {
      projectType.value = plans[key].label;
      projectType.dispatchEvent(new Event('change',{bubbles:true}));
    }
    // Nunca sobrescrever conteúdo que o visitante já escreveu.
    if (message && !message.value.trim()) message.value = selection;
    form?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    projectType?.focus({preventScroll:true});
  });
  // Se o formulário for reiniciado após sucesso, não manter o resumo antigo.
  const form = document.querySelector('#contactForm');
  form?.addEventListener('reset', () => {
    const hidden = document.querySelector('#simQuoteSummary');
    if (hidden) hidden.value = '';
  });
  render();
})();