const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/section-scroll.js'), 'utf8');

function simulate({ hash = '#modelos', id = 'modelos', reduced = false, skip = false, modifier = false, target = '' } = {}) {
  let listener, prevented = false, focused = false, scrolled, tabindex = '';
  const section = {
    hasAttribute: () => false,
    setAttribute: (_, value) => { tabindex = value; },
    removeAttribute: () => { tabindex = ''; },
    addEventListener: () => {},
    focus: ({preventScroll}) => { assert.equal(preventScroll, true); focused = true; },
    scrollIntoView: options => { scrolled = options; }
  };
  const link = {
    classList: {contains: name => skip && name === 'skip'},
    hasAttribute: () => false,
    target,
    getAttribute: () => hash
  };
  const ctx = {
    document: {
      addEventListener: (_, callback) => { listener = callback; },
      getElementById: requested => requested === id ? section : null
    },
    window: { matchMedia: () => ({ matches: reduced }) }
  };
  vm.runInNewContext(source, ctx);
  listener({
    defaultPrevented: false, button: 0, metaKey: modifier, ctrlKey: false,
    shiftKey: false, altKey: false,
    target: { closest: () => link },
    preventDefault: () => { prevented = true; }
  });
  return { prevented, focused, scrolled, tabindex };
}

test('normal click scrolls smoothly without changing browser history', () => {
  const result = simulate();
  assert.equal(result.prevented, true);
  assert.equal(result.focused, true);
  assert.equal(result.tabindex, '-1');
  assert.equal(result.scrolled.behavior, 'smooth');
});

test('reduced motion uses instant scrolling', () => {
  assert.equal(simulate({reduced:true}).scrolled.behavior, 'auto');
});

test('keyboard skip link, modified clicks, external targets and unknown anchors stay native', () => {
  for (const args of [{skip:true}, {modifier:true}, {target:'_blank'}, {hash:'#outro'}]) {
    const result = simulate(args);
    assert.equal(result.prevented, false);
    assert.equal(result.focused, false);
  }
});

test('direct section addresses remain in HTML for sharing and browser-native history', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert.match(html, /href="#modelos"/);
  assert.match(html, /id="modelos"/);
  assert.match(html, /js\/section-scroll\.js/);
  assert.doesNotMatch(source, /(?:pushState|replaceState)/);
});
