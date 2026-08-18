(() => {
  document.querySelectorAll('[data-language-select]').forEach((wrap) => {
    const button = wrap.querySelector('[data-language-button]');
    const menu = wrap.querySelector('[data-language-menu]');
    if (!button || !menu) return;

    const close = () => {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    };

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      menu.hidden ? open() : close();
    });
    menu.addEventListener('click', (event) => {
      const option = event.target.closest('[data-lang-href]');
      if (option) window.location.href = option.getAttribute('data-lang-href');
    });
    document.addEventListener('click', (event) => {
      if (!wrap.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  });

  document.querySelectorAll('.seoPhoneWrap').forEach((phoneWrap) => {
    const dots = phoneWrap.querySelectorAll('[data-phone-theme]');
    const setTheme = (theme) => {
      phoneWrap.setAttribute('data-color-theme', theme);
      dots.forEach((dot) => {
        const active = dot.getAttribute('data-phone-theme') === theme;
        dot.classList.toggle('isActive', active);
        dot.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => setTheme(dot.getAttribute('data-phone-theme')));
    });
    setTheme(phoneWrap.getAttribute('data-color-theme') || 'default');
  });

  document.querySelectorAll('.pollQuestionSliderCard').forEach((card) => {
    const counter = card.querySelector('[data-poll-progress-count]');
    const slides = card.querySelectorAll('.pollAppSlide');
    if (!counter || slides.length === 0) return;

    const duration = slides.length * 4000;
    const startedAt = performance.now();
    let lastIndex = -1;

    const renderCounter = (now) => {
      const progress = ((now - startedAt) % duration) / duration;
      const index = Math.min(slides.length - 1, Math.floor(progress * slides.length));

      if (index !== lastIndex) {
        counter.textContent = `${index + 1} / ${slides.length}`;
        lastIndex = index;
      }
      window.requestAnimationFrame(renderCounter);
    };

    window.requestAnimationFrame(renderCounter);
  });
})();
