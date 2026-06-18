/* ───────────────────────────────────────────────────────────────
   Blog (tscrypto.com) — клиентская логика статических страниц блога:
   1) переключатель языка (глобус) — навигация между /blogs и /en/blogs
      с сохранением раздела/slug, тот же cookie site_lang, что и на сайте;
   2) фильтр по типам (табы) + пагинация на листинге.
   Страницы прегенерированы по-языкам, поэтому SEO/мета здесь НЕ трогаем.
   ─────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var COOKIE = 'site_lang';
  var PER_PAGE = 9;

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie =
      name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function isEn() {
    return /^\/en(\/|$)/i.test(window.location.pathname);
  }

  // Текущий путь → путь на другом языке, сохраняя раздел и slug.
  function pathForLang(lang) {
    var p = window.location.pathname;
    if (lang === 'en') {
      return isEn() ? p : '/en' + (p === '/' ? '/' : p);
    }
    // ru
    return isEn() ? p.replace(/^\/en(?=\/|$)/i, '') || '/' : p;
  }

  function go(lang) {
    setCookie(COOKIE, lang, 365);
    var target = pathForLang(lang);
    if (target !== window.location.pathname) {
      window.location.assign(target + (window.location.hash || ''));
    }
  }

  /* ── Глобус-переключатель ── */
  function initLang() {
    var btn = document.getElementById('tsbLang');
    if (!btn) return;
    var cur = isEn() ? 'en' : 'ru';

    var menu = document.createElement('div');
    menu.className = 'tsb-lang__menu';
    menu.innerHTML =
      '<button type="button" data-lang="ru"' +
      (cur === 'ru' ? ' class="is-current"' : '') +
      '>Русский</button>' +
      '<button type="button" data-lang="en"' +
      (cur === 'en' ? ' class="is-current"' : '') +
      '>English</button>';
    btn.appendChild(menu);

    btn.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute('data-lang')) {
        e.stopPropagation();
        go(t.getAttribute('data-lang'));
        return;
      }
      e.stopPropagation();
      menu.classList.toggle('is-open');
    });
    document.addEventListener('click', function () {
      menu.classList.remove('is-open');
    });
  }

  /* ── Табы + пагинация ── */
  function initListing() {
    var grid = document.getElementById('tsbGrid');
    var pager = document.getElementById('tsbPagination');
    if (!grid) return;

    var allCards = Array.prototype.slice.call(grid.querySelectorAll('.tsb-card'));
    if (!allCards.length) return;

    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tsb-tab'));
    var filter = '';
    var page = 1;

    function filtered() {
      if (!filter) return allCards;
      return allCards.filter(function (c) {
        return c.getAttribute('data-type') === filter;
      });
    }

    function render() {
      var items = filtered();
      var pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
      if (page > pages) page = pages;
      var start = (page - 1) * PER_PAGE;
      var end = start + PER_PAGE;

      allCards.forEach(function (c) {
        c.style.display = 'none';
      });
      items.slice(start, end).forEach(function (c) {
        c.style.display = '';
      });

      renderPager(pages);
    }

    function renderPager(pages) {
      if (!pager) return;
      pager.innerHTML = '';
      if (pages <= 1) return;

      var mk = function (label, target, opts) {
        opts = opts || {};
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = label;
        if (opts.active) b.className = 'is-active';
        if (opts.disabled) b.disabled = true;
        else
          b.addEventListener('click', function () {
            page = target;
            render();
            var top = grid.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({ top: top, behavior: 'smooth' });
          });
        pager.appendChild(b);
      };

      mk('‹', page - 1, { disabled: page === 1 });
      // окно из максимум 5 страниц вокруг текущей
      var from = Math.max(1, page - 2);
      var to = Math.min(pages, from + 4);
      from = Math.max(1, to - 4);
      for (var i = from; i <= to; i++) mk(String(i), i, { active: i === page });
      mk('›', page + 1, { disabled: page === pages });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.classList.remove('is-active');
        });
        tab.classList.add('is-active');
        filter = tab.getAttribute('data-filter') || '';
        page = 1;
        render();
      });
    });

    render();
  }

  function init() {
    initLang();
    initListing();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
