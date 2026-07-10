
(() => {
  document.querySelectorAll('[data-language-select]').forEach((wrap) => {
    const button = wrap.querySelector('[data-language-button]');
    const menu = wrap.querySelector('[data-language-menu]');
    if (!button || !menu) return;
    const close = () => { menu.hidden = true; button.setAttribute('aria-expanded', 'false'); };
    const open = () => { menu.hidden = false; button.setAttribute('aria-expanded', 'true'); };
    button.addEventListener('click', (event) => { event.stopPropagation(); menu.hidden ? open() : close(); });
    menu.addEventListener('click', (event) => {
      const option = event.target.closest('[data-lang-href]');
      if (option) window.location.href = option.getAttribute('data-lang-href');
    });
    document.addEventListener('click', (event) => { if (!wrap.contains(event.target)) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  });

  const themes = new Set(['default','sapphire','emerald','ruby','violet','amber','aurora','noir']);
  const phones = Array.from(document.querySelectorAll('.seoPhoneWrap'));
  const buttons = Array.from(document.querySelectorAll('[data-phone-theme]'));
  const applyTheme = (theme) => {
    const key = themes.has(theme) ? theme : 'default';
    phones.forEach((phone) => phone.setAttribute('data-color-theme', key));
    buttons.forEach((button) => {
      const active = button.getAttribute('data-phone-theme') === key;
      button.classList.toggle('isActive', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };
  buttons.forEach((button) => button.addEventListener('click', () => applyTheme(button.getAttribute('data-phone-theme'))));
  applyTheme(document.querySelector('[data-phone-theme].isActive')?.getAttribute('data-phone-theme') || 'default');

  document.querySelectorAll('[data-sticker-carousel]').forEach((carousel) => {
    const items = Array.from(carousel.querySelectorAll('[data-sticker-item]'));
    if (!items.length) return;
    let index = 0;
    const activate = (next) => {
      index = (next + items.length) % items.length;
      items.forEach((item, i) => {
        const active = i === index;
        item.classList.toggle('isActive', active);
        if (item.tagName === 'VIDEO') {
          if (active) { try { item.currentTime = 0; } catch (_) {} const p = item.play(); if (p?.catch) p.catch(() => {}); }
          else { item.pause(); try { item.currentTime = 0; } catch (_) {} }
        }
        if (item.tagName === 'LOTTIE-PLAYER') {
          item.setAttribute('loop', ''); item.setAttribute('autoplay', '');
          if (active && typeof item.play === 'function') { try { item.stop?.(); item.play(); } catch (_) {} }
          if (!active && typeof item.stop === 'function') { try { item.stop(); } catch (_) {} }
        }
      });
    };
    activate(0);
    window.setInterval(() => activate(index + 1), 3000);
  });
})();
