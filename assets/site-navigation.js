(() => {
  "use strict";

  const supportedLocales = new Set([
    "ar", "hy", "az", "be", "zh-cn", "zh-tw", "cs", "nl", "fr", "ka", "de",
    "hi", "id", "it", "ja", "kk", "ko", "ms", "fa", "pl", "pt-br", "pt-pt",
    "ro", "ru", "es", "th", "tr", "uk", "uz", "vi"
  ]);

  const translations = {
    en: { menu: "Open site menu", home: "Home", giveaway: "Giveaways", polls: "Polls", quiz: "Quizzes" },
    ar: { menu: "فتح قائمة الموقع", home: "الرئيسية", giveaway: "المسابقات", polls: "الاستطلاعات", quiz: "الاختبارات" },
    hy: { menu: "Բացել կայքի ընտրացանկը", home: "Գլխավոր", giveaway: "Խաղարկություններ", polls: "Հարցումներ", quiz: "Վիկտորինաներ" },
    az: { menu: "Sayt menyusunu aç", home: "Ana səhifə", giveaway: "Çəkilişlər", polls: "Sorğular", quiz: "Viktorinalar" },
    be: { menu: "Адкрыць меню сайта", home: "Галоўная", giveaway: "Розыгрышы", polls: "Апытанні", quiz: "Віктарыны" },
    "zh-cn": { menu: "打开网站菜单", home: "首页", giveaway: "抽奖", polls: "问卷", quiz: "知识竞赛" },
    "zh-tw": { menu: "開啟網站選單", home: "首頁", giveaway: "抽獎", polls: "問卷", quiz: "知識競賽" },
    cs: { menu: "Otevřít nabídku webu", home: "Domů", giveaway: "Soutěže", polls: "Ankety", quiz: "Kvízy" },
    nl: { menu: "Sitemenu openen", home: "Home", giveaway: "Winacties", polls: "Peilingen", quiz: "Quizzen" },
    fr: { menu: "Ouvrir le menu du site", home: "Accueil", giveaway: "Tirages au sort", polls: "Sondages", quiz: "Quiz" },
    ka: { menu: "საიტის მენიუს გახსნა", home: "მთავარი", giveaway: "გათამაშებები", polls: "გამოკითხვები", quiz: "ვიქტორინები" },
    de: { menu: "Website-Menü öffnen", home: "Startseite", giveaway: "Gewinnspiele", polls: "Umfragen", quiz: "Quizze" },
    hi: { menu: "साइट मेनू खोलें", home: "मुख्य पृष्ठ", giveaway: "गिवअवे", polls: "पोल", quiz: "क्विज़" },
    id: { menu: "Buka menu situs", home: "Beranda", giveaway: "Giveaway", polls: "Jajak pendapat", quiz: "Kuis" },
    it: { menu: "Apri il menu del sito", home: "Home", giveaway: "Estrazioni", polls: "Sondaggi", quiz: "Quiz" },
    ja: { menu: "サイトメニューを開く", home: "ホーム", giveaway: "抽選", polls: "アンケート", quiz: "クイズ" },
    kk: { menu: "Сайт мәзірін ашу", home: "Басты бет", giveaway: "Ұтыс ойындары", polls: "Сауалнамалар", quiz: "Викториналар" },
    ko: { menu: "사이트 메뉴 열기", home: "홈", giveaway: "경품 추첨", polls: "설문조사", quiz: "퀴즈" },
    ms: { menu: "Buka menu laman", home: "Laman utama", giveaway: "Cabutan bertuah", polls: "Tinjauan", quiz: "Kuiz" },
    fa: { menu: "باز کردن منوی سایت", home: "صفحه اصلی", giveaway: "قرعه‌کشی‌ها", polls: "نظرسنجی‌ها", quiz: "آزمون‌ها" },
    pl: { menu: "Otwórz menu strony", home: "Strona główna", giveaway: "Losowania", polls: "Ankiety", quiz: "Quizy" },
    "pt-br": { menu: "Abrir menu do site", home: "Início", giveaway: "Sorteios", polls: "Enquetes", quiz: "Quizzes" },
    "pt-pt": { menu: "Abrir menu do site", home: "Início", giveaway: "Sorteios", polls: "Sondagens", quiz: "Quizzes" },
    ro: { menu: "Deschide meniul site-ului", home: "Acasă", giveaway: "Tombole", polls: "Sondaje", quiz: "Quizuri" },
    ru: { menu: "Открыть меню сайта", home: "Главная", giveaway: "Розыгрыши", polls: "Опросы", quiz: "Викторины" },
    es: { menu: "Abrir el menú del sitio", home: "Inicio", giveaway: "Sorteos", polls: "Encuestas", quiz: "Quizzes" },
    th: { menu: "เปิดเมนูเว็บไซต์", home: "หน้าหลัก", giveaway: "กิจกรรมแจกของรางวัล", polls: "แบบสำรวจ", quiz: "แบบทดสอบ" },
    tr: { menu: "Site menüsünü aç", home: "Ana sayfa", giveaway: "Çekilişler", polls: "Anketler", quiz: "Bilgi yarışmaları" },
    uk: { menu: "Відкрити меню сайту", home: "Головна", giveaway: "Розіграші", polls: "Опитування", quiz: "Вікторини" },
    uz: { menu: "Sayt menyusini ochish", home: "Bosh sahifa", giveaway: "Tanlovlar", polls: "So‘rovnomalar", quiz: "Viktorinalar" },
    vi: { menu: "Mở menu trang web", home: "Trang chủ", giveaway: "Quay thưởng", polls: "Khảo sát", quiz: "Câu đố" }
  };

  const cleanPath = (value) => {
    const pathname = (value || "/").split("?")[0].split("#")[0];
    return pathname.endsWith("/") ? pathname : pathname + "/";
  };

  const getLocale = () => {
    const first = location.pathname.split("/").filter(Boolean)[0]?.toLowerCase() || "";
    if (supportedLocales.has(first)) return first;
    const htmlLang = (document.documentElement.lang || "en").toLowerCase();
    if (htmlLang.startsWith("pt-br")) return "pt-br";
    if (htmlLang.startsWith("pt-pt")) return "pt-pt";
    if (htmlLang.startsWith("zh-cn")) return "zh-cn";
    if (htmlLang.startsWith("zh-tw")) return "zh-tw";
    const short = htmlLang.split("-")[0];
    return supportedLocales.has(short) ? short : "en";
  };

  const closeLanguageMenu = () => {
    document.querySelectorAll("[data-language-menu]").forEach((menu) => { menu.hidden = true; });
    document.querySelectorAll("[data-language-button]").forEach((button) => button.setAttribute("aria-expanded", "false"));
  };

  const syncLanguageSelection = () => {
    const current = cleanPath(location.pathname);
    document.querySelectorAll("[data-language-select]").forEach((select) => {
      const options = Array.from(select.querySelectorAll(".languageOption[data-lang-href]"));
      const active = options.find((option) => cleanPath(option.dataset.langHref) === current);
      if (!active) return;
      options.forEach((option) => {
        const selected = option === active;
        option.classList.toggle("isActive", selected);
        option.setAttribute("aria-selected", selected ? "true" : "false");
      });
      const button = select.querySelector("[data-language-button]");
      if (!button) return;
      const activeImg = active.querySelector(".languageFlagImg");
      const buttonImg = button.querySelector(".languageFlagImg");
      if (activeImg && buttonImg) {
        buttonImg.src = activeImg.src;
        buttonImg.srcset = activeImg.srcset;
      }
      const activeText = active.querySelector("span");
      const buttonText = button.querySelector("span");
      if (activeText && buttonText) buttonText.textContent = activeText.textContent;
    });
  };

  const createNavigation = () => {
    syncLanguageSelection();
    const headerRight = document.querySelector(".siteHeader .headerRight");
    if (!headerRight || headerRight.querySelector(".siteNavWrap")) return Boolean(headerRight);
    const openTgDraw = Array.from(headerRight.querySelectorAll("a,button")).find((el) => {
      if (el.matches('a[href*="t.me/tgdraw_bot"]')) return true;
      return /TgDraw/i.test((el.textContent || "").trim()) && el.classList.contains("btnSmall");
    });
    if (!openTgDraw) return false;

    const locale = getLocale();
    const text = translations[locale] || translations.en;
    const prefix = locale === "en" ? "" : `/${locale}`;
    const items = [
      ["home", `${prefix}/`],
      ["giveaway", `${prefix}/telegram-giveaway-bot/`],
      ["polls", `${prefix}/telegram-polls/`],
      ["quiz", `${prefix}/telegram-quiz/`]
    ];
    const current = cleanPath(location.pathname);

    const wrap = document.createElement("div");
    wrap.className = "siteNavWrap";
    wrap.innerHTML = `
      <button class="siteNavButton" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="${text.menu}" title="${text.menu}">
        <span class="siteNavIcon" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
      <nav class="siteNavMenu" aria-label="${text.menu}" hidden>
        ${items.map(([key, href]) => `<a class="siteNavLink${cleanPath(href) === current ? " isActive" : ""}" href="${href}"${cleanPath(href) === current ? ' aria-current="page"' : ""}>${text[key]}</a>`).join("")}
      </nav>`;

    openTgDraw.insertAdjacentElement("afterend", wrap);
    const button = wrap.querySelector(".siteNavButton");
    const menu = wrap.querySelector(".siteNavMenu");
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const opening = menu.hidden;
      document.querySelectorAll(".siteNavMenu").forEach((other) => { other.hidden = true; });
      document.querySelectorAll(".siteNavButton").forEach((other) => other.setAttribute("aria-expanded", "false"));
      if (opening) closeLanguageMenu();
      menu.hidden = !opening;
      button.setAttribute("aria-expanded", opening ? "true" : "false");
    });
    return true;
  };

  let queued = false;
  const queueCreate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      createNavigation();
    });
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-language-button]")) {
      document.querySelectorAll(".siteNavMenu").forEach((menu) => { menu.hidden = true; });
      document.querySelectorAll(".siteNavButton").forEach((button) => button.setAttribute("aria-expanded", "false"));
      return;
    }
    if (!event.target.closest(".siteNavWrap")) {
      document.querySelectorAll(".siteNavMenu").forEach((menu) => { menu.hidden = true; });
      document.querySelectorAll(".siteNavButton").forEach((button) => button.setAttribute("aria-expanded", "false"));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".siteNavMenu").forEach((menu) => { menu.hidden = true; });
    document.querySelectorAll(".siteNavButton").forEach((button) => button.setAttribute("aria-expanded", "false"));
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", queueCreate, { once: true });
  else queueCreate();

  new MutationObserver(queueCreate).observe(document.documentElement, { childList: true, subtree: true });
})();
