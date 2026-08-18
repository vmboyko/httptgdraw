(function () {
  "use strict";

  var headings = {
  "en": "Telegram bot for giveaways, polls and quizzes",
  "ru": "Telegram-бот для розыгрышей, опросов и викторин",
  "uk": "Telegram-бот для розіграшів, опитувань і вікторин",
  "be": "Telegram-бот для розыгрышаў, апытанняў і віктарын",
  "kk": "Ұтыстарға, сауалнамаларға және викториналарға арналған Telegram боты",
  "uz": "Giveaway, so‘rovlar va viktorinalar uchun Telegram boti",
  "de": "Telegram-Bot für Gewinnspiele, Umfragen und Quizze",
  "fr": "Bot Telegram pour jeux-concours, sondages et quiz",
  "es": "Bot de Telegram para sorteos, encuestas y cuestionarios",
  "it": "Bot Telegram per giveaway, sondaggi e quiz",
  "nl": "Telegram-bot voor giveaways, polls en quizzen",
  "pl": "Bot Telegram do rozdań, ankiet i quizów",
  "pt-br": "Bot do Telegram para sorteios, enquetes e quizzes",
  "pt-pt": "Bot do Telegram para sorteios, sondagens e questionários",
  "ro": "Bot Telegram pentru concursuri, sondaje și quizuri",
  "cs": "Telegram bot pro soutěže, ankety a kvízy",
  "tr": "Çekilişler, anketler ve quizler için Telegram botu",
  "ar": "بوت Telegram للسحوبات والاستطلاعات والاختبارات",
  "fa": "ربات Telegram برای قرعه‌کشی، نظرسنجی و آزمون",
  "hy": "Telegram բոտ խաղարկությունների, հարցումների և վիկտորինաների համար",
  "az": "Telegram botu: çəkilişlər, sorğular və viktorinalar",
  "ka": "Telegram ბოტი გათამაშებებისთვის, გამოკითხვებისთვის და ვიქტორინებისთვის",
  "zh-cn": "用于抽奖、投票和测验的 Telegram 机器人",
  "zh-tw": "用於抽獎、投票和測驗的 Telegram 機器人",
  "ja": "抽選・投票・クイズ向けTelegramボット",
  "ko": "경품 이벤트, 투표, 퀴즈용 Telegram 봇",
  "hi": "Giveaways, polls और quizzes के लिए Telegram bot",
  "id": "Bot Telegram untuk giveaway, polling, dan kuis",
  "ms": "Bot Telegram untuk giveaway, tinjauan dan kuiz",
  "th": "บอท Telegram สำหรับ giveaway โพล และควิซ",
  "vi": "Bot Telegram cho giveaway, khảo sát và quiz"
};
  var path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  var segments = path ? path.split("/") : [];
  var locale = segments[0] && segments[0] !== "index.html" ? segments[0] : "en";
  var trailingIndex = segments[segments.length - 1] === "index.html";
  var isHomepage = Object.prototype.hasOwnProperty.call(headings, locale) &&
    (segments.length === 0 || segments.length === 1 ||
      (segments.length === 2 && trailingIndex));

  if (!isHomepage) return;

  function content(selector) {
    var element = document.head.querySelector(selector);
    return element ? element.getAttribute("content") : "";
  }

  var seo = {
    title: document.title,
    description: content('meta[name="description"]'),
    ogTitle: content('meta[property="og:title"]'),
    ogDescription: content('meta[property="og:description"]'),
    twitterTitle: content('meta[name="twitter:title"]'),
    twitterDescription: content('meta[name="twitter:description"]')
  };

  function setContent(selector, value) {
    var element = document.head.querySelector(selector);
    if (element && element.getAttribute("content") !== value) {
      element.setAttribute("content", value);
    }
  }

  function applyOverrides() {
    if (document.title !== seo.title) document.title = seo.title;
    setContent('meta[name="description"]', seo.description);
    setContent('meta[property="og:title"]', seo.ogTitle);
    setContent('meta[property="og:description"]', seo.ogDescription);
    setContent('meta[name="twitter:title"]', seo.twitterTitle);
    setContent('meta[name="twitter:description"]', seo.twitterDescription);

    var heading = document.querySelector("#root h1");
    if (heading && heading.textContent !== headings[locale]) {
      heading.textContent = headings[locale];
    }
  }

  applyOverrides();
  new MutationObserver(applyOverrides).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["content"]
  });
})();
