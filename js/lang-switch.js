/*!
 * lang-switch.js — RU/EN language switcher for tscrypto.com (Tilda export)
 *
 * - Teal globe button placed in the header, right of the "About" nav item.
 *   Clicking opens a dropdown with "RU РУССКИЙ" / "EN ENGLISH".
 * - First visit: language auto-detected by IP geolocation
 *   (CIS / Russian-speaking countries -> Russian, otherwise -> English),
 *   with a browser-language / timezone fallback if the lookup fails.
 * - The chosen language is stored in the "site_lang" cookie (1 year).
 * - Pure native JS, no dependencies.
 *
 * Translations:
 *   PAIRS_HTML — [ruHTML, enHTML] for Tilda text atoms (.tn-atom); full markup
 *                (coloured spans, <br>, links) is preserved.
 *   PAIRS_FLAT — [ruText, enText] for plain leaf nodes (buttons, custom menu,
 *                cookie banner) where only the text is swapped, never the markup.
 *   Matching is done by normalized text content, so it is robust to attribute
 *   or whitespace differences.
 */
(function () {
  'use strict';

  var PAIRS_HTML = [["Торговая платформа для криптотрейдинга <span style=\"color: rgb(0, 211, 200);\">с</span> <span style=\"color: rgb(0, 211, 200);\">единым доступом</span> ко всем популярным биржам","Crypto trading platform with <span style=\"color: rgb(0, 211, 200);\">unified access</span> to all popular exchanges"],["Управляйте всеми сделками в одном терминале <span style=\"font-weight: 600;\">с минимальными комиссиями и высокой скоростью исполнения</span>","Manage all your trades in a single terminal <span style=\"font-weight: 600;\">with minimal fees and high execution speed</span>"],["<a href=\"https://lk.tscrypto.com/login\"target=\"_blank\"style=\"color: inherit\">Войти</a>","<a href=\"https://lk.tscrypto.com/login\"target=\"_blank\"style=\"color: inherit\">Log in</a>"],["<a href=\"#terminal\"style=\"color: inherit\">Терминал</a>","<a href=\"#terminal\"style=\"color: inherit\">Terminal</a>"],["<a href=\"#features\"style=\"color: inherit\">Возможности</a>","<a href=\"#features\"style=\"color: inherit\">Features</a>"],["<a href=\"#about\"style=\"color: inherit\">О нас</a>","<a href=\"#about\"style=\"color: inherit\">About</a>"],["12 лет","12 years"],["17 бирж","17 exchanges"],["На рынке криптотрейдинга","In crypto trading"],["Надежных партнеров","Reliable partners"],["Вся инфраструктура трейдинга <span style=\"color: rgb(0, 211, 200);\">собрана в одном месте</span>","All trading infrastructure <span style=\"color: rgb(0, 211, 200);\">in one place</span>"],["Терминал и брокер объединены в одну систему","Terminal and broker combined into one system"],["Терминал SmartDOM","SmartDOM Terminal"],["Предоставляем удобный интерфейс для детального анализа рынка и управления всеми вашими сделками в реальном времени","We provide a convenient interface for detailed market analysis and managing all your trades in real time"],["Криптоброкер","Crypto broker"],["Подключение к биржам и управление ликвидностью через единый аккаунт, переключение между биржами и перевод средств в один клик","Connect to exchanges and manage liquidity through a single account, switch between exchanges and transfer funds in one click"],["Терминал + технологии","Terminal + technology"],["Инфраструктура","Infrastructure"],["Предоставляем удобный интерфейс для детального анализа рынка и управления всеми вашими сделками в реальном","We provide a convenient interface for detailed market analysis and managing all your trades in real time"],["Гибкая настройка терминала","Flexible terminal customization"],["Рабочее пространство под себя: стаканы, графики и горячие клавиши","A workspace tailored to you: order books, charts and hotkeys"],["Единая инфраструктура для криптотрейдинга","Unified infrastructure for crypto trading"],["Управляйте торговлей на разных биржах из одного пространства","Manage trading across different exchanges from a single space"],["Быстрое исполнение ордеров","Fast order execution"],["Минимальная задержка и высокая скорость работы при волатильности","Minimal latency and high speed during volatility"],["Профессиональный стакан и анализ ликвидности","Professional order book and liquidity analysis"],["Глубина рынка, лента сделок, плотности и кластеры в одном интерфейсе","Market depth, time & sales, density and clusters in one interface"],["Личный дневник сделок","Personal trading journal"],["Автоматическая статистика, история сделок и анализ результатов вашей торговли","Automatic statistics, trade history and analysis of your trading results"],["Подключение бирж<br />и регистрация","Exchange connection<br />and registration"],["Подключение к системе и удобная регистрация без сложных настроек и лишних действий","Connect to the system and register easily, with no complex setup or unnecessary steps"],["Риск-менеджер","Risk manager"],["Контроль просадки, лимитов<br />и объёма позиций для защиты депозита и стабильной торговли","Control of drawdown, limits<br />and position size to protect your deposit and trade steadily"],["Партнерская программа<br />и наставничество","Partner program<br />and mentorship"],["Получайте вознаграждение за приглашённых трейдеров и развивайтесь внутри сообщества","Earn rewards for invited traders and grow within the community"],["Challenge","Challenge"],["Участвуйте в конкурсах Trade System, улучшайте свои результаты и получайте денежные премии за успешную торговлю","Take part in Trade System challenges, improve your results and earn cash rewards for successful trading"],["Бесплатный Challenge","Free Challenge"],["Идеальный вариант для трейдеров. Участие бесплатно<br />без ограничений по времени","The perfect option for traders. Participation is free<br />with no time limits"],["Прозрачный контроль прогресса","Transparent progress tracking"],["Вы всегда видите текущий прогресс выполнения, количество торговых сессий и прибыль относительно","You always see your current progress, the number of trading sessions and your relative profit"],["PRO Challenge","PRO Challenge"],["Для трейдеров, готовых бороться<br />за повышенные призы. Увеличенные денежные премии до $15 000","For traders ready to compete<br />for bigger prizes. Increased cash rewards up to $15,000"],["Денежные премии<br />за результат","Cash rewards<br />for results"],["Получайте дополнительные выплаты<br />до $15 000 сверх своей торговой прибыли за успешную торговлю","Get additional payouts<br />up to $15,000 on top of your trading profit for successful trading"],["<span style=\"color: rgb(0, 211, 200);\">Ключевые возможности,</span><br />доступные каждому","<span style=\"color: rgb(0, 211, 200);\">Key features,</span><br />available to everyone"],["Детальный анализ рынка","Detailed market analysis"],["Управление рисками","Risk management"],["Несколько аккаунтов","Multiple accounts"],["Автоматизация процессов","Process automation"],["Продвинутые графики и инструменты","Advanced charts and tools"],["Риск-менеджмент встроен в терминал","Risk management built into the terminal"],["Управление всеми вашими средствами в одном месте","Manage all your funds in one place"],["Максимальное упрощение торговых процессов","Maximum simplification of trading processes"],["Все инструменты доступны вам прямо в интерфейсе торговли","All tools available right in the trading interface"],["Интеграция с терминалом","Terminal integration"],["Система помогает вам избегать кричических просадок","The system helps you avoid critical drawdowns"],["Защита вашего депозита","Protection of your deposit"],["Задавайте собственные лимиты<br />на убытки и прибыль","Set your own limits<br />on losses and profit"],["Контроль дневного лимита","Daily limit control"],["Ограничивайте убытки автоматически при достижении заданного уровня","Limit losses automatically when a set level is reached"],["Автоблокировка при просадке","Auto-lock on drawdown"],["<span style=\"color: rgb(0, 211, 200);\">Контроль рисков </span>в каждой сделке","<span style=\"color: rgb(0, 211, 200);\">Risk control </span>in every trade"],["Риск-менеджмент встроен в терминал и работает в реальном времени","Risk management is built into the terminal and works in real time"],["<span style=\"color: rgb(0, 211, 200);\">Начать работу</span><br />с платформой просто","<span style=\"color: rgb(0, 211, 200);\">Getting started</span><br />with the platform is simple"],["Подключись и начни торговать за несколько минут","Connect and start trading in just a few minutes"],["01","01"],["Создайте аккаунт","Create an account"],["Пройдите быструю <u style=\"color: rgb(0, 211, 200);\"><a href=\"https://lk.tscrypto.com/register\" style=\"color: rgb(0, 211, 200);\" target=\"_blank\" rel=\"noreferrer noopener\">регистрацию</a></u><br />и получите доступ к платформе.<br />Без сложных настроек","Complete a quick <u style=\"color: rgb(0, 211, 200);\"><a href=\"https://lk.tscrypto.com/register\" style=\"color: rgb(0, 211, 200);\" target=\"_blank\" rel=\"noreferrer noopener\">registration</a></u><br />and get access to the platform.<br />No complex setup"],["02","02"],["Подключите биржу","Connect an exchange"],["Добавьте API ключи и управляйте аккаунтами из одного интерфейса<br />Без переноса баланса","Add API keys and manage accounts from a single interface<br />No balance transfer required"],["03","03"],["Откройте терминал","Open the terminal"],["Получите доступ ко всем необходимым инструментам анализа и торговли.<br />Все рынки собраны в одном окне","Get access to all the analysis and trading tools you need.<br />All markets in one window"],["04","04"],["Начните торговать","Start trading"],["Открывайте сделки, управляйте позициями и контролируйте результат<br />Без переключения между биржами","Open trades, manage positions and control your results<br />Without switching between exchanges"],["<span style=\"color: rgb(0, 211, 200);\">Комфортная среда</span> для роста трейдера","<span style=\"color: rgb(0, 211, 200);\">A comfortable environment</span> for a trader’s growth"],["Мы не просто обучаем, а создаем среду, где трейдер зарабатывает, развивается и контролирует риски","We don’t just teach — we create an environment where traders earn, grow and manage risk"],["<span style=\"color: rgb(0, 211, 200);\">Гарантируем безопасность</span>","<span style=\"color: rgb(0, 211, 200);\">We guarantee security</span>"],["и контроль ваших средств","and control of your funds"],["Ваши средства<br />на бирже","Your funds<br />on the exchange"],["Нет доступа<br />к выводу","No access<br />to withdrawals"],["Вы сохраняете полный контроль над активами — платформа не имеет доступа к выводу средств","You keep full control over your assets — the platform has no access to withdraw funds"],["Защита API ключей","API key protection"],["Контроль в ваших руках","Control is in your hands"],["Ваши активы хранятся на вашем аккаунте","Your assets are stored in your own account"],["Мы используем API ключи только для торговли","We use API keys for trading only"],["Все данные шифруются<br />и хранятся безопасно","All data is encrypted<br />and stored securely"],["Вы можете отключить доступ к любой момент","You can revoke access at any time"],["<span style=\"color: rgb(0, 211, 200);\">Развивайтесь и зарабатывайте в</span><br />нашей развивающейся экосистеме","<span style=\"color: rgb(0, 211, 200);\">Grow and earn in</span><br />our evolving ecosystem"],["Приглашайте новых пользователей, участвуйте в жизни активной платформы и получайте дополнительный пассивный доход","Invite new users, take part in an active platform and earn extra passive income"],["Сообщество трейдеров","Trader community"],["Обменивайтесь ценным опытом, следите за обновлениями платформы и <span style=\"font-weight: 500;\">развивайтесь вместе с другими участниками сообщества</span>","Share valuable experience, follow platform updates and <span style=\"font-weight: 500;\">grow together with other community members</span>"],["Реферальная программа","Referral program"],["Приглашайте пользователей и получайте процент от их торговой активности, <span style=\"font-weight: 500;\">без ограничений по приглашениям и автоматическими выплатами</span>","Invite users and earn a percentage of their trading activity, <span style=\"font-weight: 500;\">with no limits on invitations and automatic payouts</span>"],["Подключитесь и управляйте всеми сделками из одного интерфейса","Connect and manage all your trades from a single interface"],["Получите доступ сразу к <span style=\"font-weight: 600;\">нескольким биржам, быстрые сделки и полный контроль позиций</span>, собранный в одной платформе","Get instant access to <span style=\"font-weight: 600;\">multiple exchanges, fast trades and full position control</span>, all in one platform"],["<u>Пользовательское соглашение</u>","<u>Terms of Service</u>"],["<u>Политика конфиденциальности</u>","<u>Privacy Policy</u>"],["2026 ©Trade System","2026 ©Trade System"],["<a href=\"https://marketing102.ru/\"target=\"_blank\"style=\"color: inherit\">Сайт разработан в Маркетинг 102</a>","<a href=\"https://marketing102.ru/\"target=\"_blank\"style=\"color: inherit\">Website developed by Marketing 102</a>"]];
  var PAIRS_FLAT = [["Начать торговлю","Start trading"],["Узнать подробнее","Learn more"],["Регистрация","Registration"],["Отправить приглашение","Send invitation"],["Задать вопрос","Ask a question"],["Вступить сообщество","Join the community"],["Мы используем cookie","We use cookies"],["Файлы cookie помогают сайту работать стабильнее и удобнее. Оставаясь здесь, вы соглашаетесь с их использованием.","Cookies help the site run more smoothly and conveniently. By staying here, you agree to their use."],["Принять","Accept"],["Отклонить","Decline"],["Практика","Practice"],["Развитие","Development"],["Контроль","Control"],["Обучение через реальные сделки, а не теорию","Learning through real trades, not theory"],["Рост навыков на каждом этапе работы","Skill growth at every stage of work"],["Прозрачная система отчётности и сопровождение","Transparent reporting and support"],["Терминал","Terminal"],["Возможности","Features"],["О нас","About"],["Войти","Log in"],["Блог","Blog"]];
  var TITLE_RU = "Торговая платформа для криптотрейдинга с единым доступом ко всем популярным биржам";
  var TITLE_EN = "Crypto trading platform with unified access to all popular exchanges";
  // og:title can differ from the <title> tag (shorter, brand-led for social cards).
  var OG_TITLE_RU = "Trade System — торговый терминал для криптотрейдинга";
  var OG_TITLE_EN = "Trade System — crypto trading terminal";
  var DESC_RU = "Торговый терминал для криптотрейдинга на 12 биржах — Trade System. Единый аккаунт, встроенный риск-менеджмент, Challenge с призами до $15 000. Регистрация бесплатна.";
  var DESC_EN = "Crypto trading terminal across 12 exchanges — Trade System. Single account, built-in risk management, Challenge with prizes up to $15,000. Free registration.";
  // Each language has its own crawlable URL so search engines index both:
  //   Russian → https://tscrypto.com/   (this index.html)
  //   English → https://tscrypto.com/en/ (nginx serves the SAME index.html at /en/;
  //             the path is detected below and the page is forced into English).
  var URL_RU = "https://tscrypto.com/";
  var URL_EN = "https://tscrypto.com/en/";
  var COOKIE = 'site_lang';

  // Kinescope video in the "Crypto broker" card has a localised cut: the page is
  // served from the same HTML on / and /en/, so the RU id is baked into the markup
  // and swapped to the EN id when the page is rendered in English.
  var VIDEO_RU = 'pxc244MuzzHc91CJ7wTmGx';
  var VIDEO_EN = 'kohtbCy6WgWoPnPheaYRE6';

  // Plain leaf text holders (translate textContent only, keep structure)
  var LEAF_SELECTOR = '.tn-atom__button-text, .ts-menu-link span, .ts-menu-btn,' +
    ' .topbar__login, .topbar__cta, .ck-title, .ck-desc, #ckAccept, #ckDecline,' +
    ' .m102-card__title, .m102-card__text, .pp-title,' +
    ' .topbar__nav a, .nav-link .tn-atom a';

  // Full English versions of the legal modal bodies (translate the whole block
  // at once; the original Russian innerHTML is cached and restored for RU).
  var PP_EN = {
    privacy: '<h3>1. General provisions</h3> <p>This Privacy Policy (the “Policy”) defines how the personal data of the website users (the “Site”) is processed and protected. The personal data operator is Trade System (the “Operator”). The Policy is developed in accordance with Federal Law No. 152-FZ of 27.07.2006 “On Personal Data”.</p> <p>By using the Site, the user confirms their consent to the terms of the Policy. If the user disagrees, they should refrain from using the Site.</p> <h3>2. Key terms</h3> <p><b>Personal data</b> — any information relating to a directly or indirectly identified individual. <b>Processing</b> — any action with personal data (collection, recording, storage, use, deletion, etc.). <b>Operator</b> — the organisation that arranges and carries out the processing. <b>User</b> — a visitor of the Site.</p> <h3>3. What data is processed</h3> <ul> <li>data provided by the user in contact forms: name, phone number, email address;</li> <li>technical data transmitted automatically: IP address, browser and device information, date and time of the request, referral source;</li> <li>data collected through cookies and web-analytics systems.</li> </ul> <h3>4. Purposes of processing</h3> <ul> <li>handling user requests and applications, feedback;</li> <li>providing information about the Operator’s services;</li> <li>improving the Site and analysing user behaviour in anonymised form;</li> <li>complying with legal requirements.</li> </ul> <h3>5. Legal grounds</h3> <p>Processing is carried out on the basis of the user’s consent, as well as in cases provided for by the legislation of the Russian Federation. Providing personal data is voluntary.</p> <h3>6. Procedure and conditions of processing</h3> <p>The Operator processes data both with and without the use of automation tools. The Operator takes the necessary legal, organisational and technical measures to protect data from unauthorised access, destruction, alteration, blocking and other unlawful actions.</p> <h3>7. Cookies and analytics</h3> <p>The Site uses cookies and web-analytics services for correct operation and statistics analysis. The user may disable cookies in their browser settings, however this may affect the operation of certain features of the Site.</p> <h3>8. Transfer to third parties</h3> <p>The Operator does not transfer personal data to third parties, except in cases directly provided for by the legislation of the Russian Federation or with the user’s consent. Transfer is possible to engaged contractors to the extent necessary to provide services, subject to confidentiality requirements.</p> <h3>9. Retention periods</h3> <p>Personal data is stored no longer than required by the purposes of processing, or for the period established by law. Once the purposes are achieved or consent is withdrawn, the data is deleted or anonymised.</p> <h3>10. User rights</h3> <p>The user has the right to receive information about the processing of their data, to request its clarification, blocking or deletion, and to withdraw consent to processing by contacting the Operator using the details below.</p> <h3>11. Data protection</h3> <p>The Operator ensures the confidentiality and protection of personal data in accordance with the requirements of Law No. 152-FZ. Only authorised employees of the Operator have access to the data.</p> <h3>12. Changes to the Policy</h3> <p>The Operator may make changes to this Policy. The new version takes effect from the moment it is posted on the Site. The user is advised to review the current version periodically.</p> <h3>13. Contacts</h3> <div class="pp-req"> <p>Phone: <a href="tel:+971585936063">+971 58 593 6063</a></p> <p>E-mail for enquiries: <a href="mailto:info@tscrypto.com">info@tscrypto.com</a></p> </div>',
    terms: '<h3>1. General provisions</h3> <p>This Terms of Service agreement (the “Agreement”) governs the relationship between Trade System (the “Administration”) and the user (the “User”) when using the website and related services (the “Site”).</p> <p>By starting to use the Site or its individual features, the User is deemed to have accepted the terms of the Agreement in full. If the User does not agree with the terms, they must stop using the Site.</p> <h3>2. Subject of the Agreement</h3> <p>The Administration provides the User with access to the informational materials and functional capabilities of the Site under the terms of this Agreement. The composition of the services and their functionality may change at the Administration’s discretion.</p> <h3>3. Account</h3> <p>Access to certain sections of the Site may require registration and creation of an account. The User undertakes to provide accurate data and is responsible for keeping their login credentials safe. All actions performed using the User’s account are deemed to have been performed by the User.</p> <h3>4. User rights and obligations</h3> <ul> <li>use the Site in accordance with the legislation of the Russian Federation and this Agreement;</li> <li>not take actions that disrupt the operation of the Site and not gain unauthorised access to its data;</li> <li>not post materials that violate the rights of third parties or the law;</li> <li>independently assess the risks associated with decisions made on the basis of the Site’s information.</li> </ul> <h3>5. Administration rights and obligations</h3> <ul> <li>provide access to the Site and maintain its operability within reasonable limits;</li> <li>change, supplement or limit the functionality of the Site without prior notice;</li> <li>restrict or terminate the User’s access if they violate the terms of the Agreement.</li> </ul> <h3>6. Intellectual property</h3> <p>All materials of the Site (texts, graphics, design, program code, trademarks) are objects of intellectual property and are protected by law. Use of the materials without the written consent of the rights holder is not permitted.</p> <h3>7. Risks and disclaimer</h3> <p>The information on the Site is for reference and informational purposes only and does not constitute an individual investment recommendation, an offer, or a guarantee of any result. The User makes all decisions independently and at their own risk. The Administration is not liable for any losses arising from the use of the Site’s information.</p> <p>The Site is provided on an “as is” basis. The Administration does not guarantee uninterrupted and error-free operation of the Site and is not liable for technical failures beyond its control.</p> <h3>8. Personal data</h3> <p>Processing of the User’s personal data is carried out in accordance with the Privacy Policy posted on the Site. By using the Site, the User agrees to its terms.</p> <h3>9. Changes to the Agreement</h3> <p>The Administration may change the terms of the Agreement unilaterally. The new version takes effect from the moment it is posted on the Site. Continued use of the Site means the User agrees to the changes.</p> <h3>10. Dispute resolution</h3> <p>This Agreement is governed by the legislation of the Russian Federation. Disputes are resolved through negotiations, and if no agreement is reached — in the manner established by the legislation of the Russian Federation.</p> <h3>11. Contacts</h3> <div class="pp-req"> <p>Phone: <a href="tel:+971585936063">+971 58 593 6063</a></p> <p>E-mail for enquiries: <a href="mailto:info@tscrypto.com">info@tscrypto.com</a></p> </div>',
    challenge: '<div class="ch-hero"> <span class="ch-eyebrow">Cash rewards for results</span> <h3 class="ch-h1">Get additional payouts for successful trading</h3> <p>Meet the Challenge conditions and earn cash rewards <b class="ch-accent">up to $15,000</b> on top of your trading profit. The better your result — the bigger the reward.</p> </div> <h4 class="ch-h2">Earn twice</h4> <p>Earn profit from trading plus additional cash rewards from Trade System for reaching your trading goals.</p> <ul class="ch-feats"> <li><span class="ch-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#042c2a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Free Challenges for all participants</li> <li><span class="ch-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#042c2a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>PRO Challenge with rewards up to $15,000</li> <li><span class="ch-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#042c2a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Real-time progress tracking</li> <li><span class="ch-check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#042c2a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Cash rewards for results and discipline</li> </ul> <h4 class="ch-h2">Trading becomes more engaging</h4> <p>The Challenge turns trading into a game with clear goals, levels and rewards. Track your progress, reach new levels and earn well-deserved prizes.</p> <h4 class="ch-h2">Earn not only on the market, but for discipline too</h4> <p>To win, it is important not just to make a profit but to follow risk-management rules. The Challenge helps build the habits of a professional trader.</p> <div class="ch-cta"> <a class="ch-btn" href="https://lk.tscrypto.com/login" target="_blank" rel="noopener noreferrer"> <span>Start Challenge</span> <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> </a> </div>'
  };

  // Countries shown in Russian (CIS + Russian-speaking neighbours)
  var RU_COUNTRIES = {
    RU: 1, BY: 1, KZ: 1, KG: 1, AM: 1, AZ: 1,
    MD: 1, TJ: 1, TM: 1, UZ: 1, UA: 1, GE: 1
  };

  // ---- cookies ---------------------------------------------------------
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
  }
  function getCookie(name) {
    var parts = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0; i < parts.length; i++) {
      var kv = parts[i].split('=');
      if (kv[0] === name) return decodeURIComponent(kv.slice(1).join('='));
    }
    return '';
  }

  // ---- dictionaries ----------------------------------------------------
  var probe = document.createElement('div');
  function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }
  function textKey(html) { probe.innerHTML = html; return norm(probe.textContent); }

  var RU2EN_HTML = {};   // key -> full english html (for .tn-atom)
  var RU2EN_TEXT = {};   // key -> plain english text (for leaf nodes)
  var i, k;
  for (i = 0; i < PAIRS_HTML.length; i++) {
    k = textKey(PAIRS_HTML[i][0]);
    RU2EN_HTML[k] = PAIRS_HTML[i][1];
    RU2EN_TEXT[k] = textKey(PAIRS_HTML[i][1]);
  }
  for (i = 0; i < PAIRS_FLAT.length; i++) {
    k = norm(PAIRS_FLAT[i][0]);
    RU2EN_TEXT[k] = PAIRS_FLAT[i][1];
  }

  // ---- apply a language ------------------------------------------------
  function cacheOriginal(el) {
    if (el.getAttribute('data-i18n-ru') === null) {
      if (!norm(el.textContent)) return false;       // skip empty/decorative
      el.setAttribute('data-i18n-ru', el.innerHTML);
    }
    return el.getAttribute('data-i18n-ru') !== null;
  }

  function apply(lang) {
    var en = (lang === 'en'), el, ru, val, j;

    // 1) Tilda text atoms — replace full markup, but skip button wrappers
    var atoms = document.getElementsByClassName('tn-atom');
    for (j = 0; j < atoms.length; j++) {
      el = atoms[j];
      if (el.querySelector && el.querySelector('.tn-atom__button-content')) continue;
      // Skip the html block that hosts the circular CTA — it is managed
      // separately below; resetting its innerHTML would clobber the ring.
      if (el.querySelector && el.querySelector('.js-circle-cta')) continue;
      if (!cacheOriginal(el)) continue;
      ru = el.getAttribute('data-i18n-ru');
      if (en) {
        val = RU2EN_HTML[textKey(ru)];
        if (val !== undefined && el.innerHTML !== val) el.innerHTML = val;
      } else if (el.innerHTML !== ru) {
        el.innerHTML = ru;
      }
    }

    // 2) Plain leaf nodes — swap text only, never the markup
    var leaves = document.querySelectorAll(LEAF_SELECTOR);
    for (j = 0; j < leaves.length; j++) {
      el = leaves[j];
      if (!cacheOriginal(el)) continue;
      ru = el.getAttribute('data-i18n-ru');
      if (en) {
        val = RU2EN_TEXT[textKey(ru)];
        if (val !== undefined && el.textContent !== val) el.textContent = val;
      } else if (el.innerHTML !== ru) {
        el.innerHTML = ru;
      }
    }

    // 3) Circular rotating CTA — translate its data-circle-text and re-render.
    // We sync the attribute (so the page's own ResizeObserver re-renders the
    // right language on resize) and also render the ring ourselves right away,
    // so the result never depends on event timing.
    var circles = document.querySelectorAll('.js-circle-cta[data-circle-text]');
    for (j = 0; j < circles.length; j++) {
      el = circles[j];
      if (el.getAttribute('data-i18n-circle') === null) {
        el.setAttribute('data-i18n-circle', el.getAttribute('data-circle-text'));
      }
      var rt = el.getAttribute('data-i18n-circle');
      var nt = en ? rt.replace(/узнать подробнее/gi, 'learn more') : rt;
      el.setAttribute('data-circle-text', nt);
      observeCircle(el);
      renderCircle(el);
    }

    // 4) Legal modals (Terms / Privacy) — swap the whole body in one go
    var bodies = document.querySelectorAll('.pp-body');
    for (j = 0; j < bodies.length; j++) {
      el = bodies[j];
      if (!cacheOriginal(el)) continue;
      ru = el.getAttribute('data-i18n-ru');
      if (en) {
        var enHtml = el.classList.contains('ch') ? PP_EN.challenge
          : (ru.indexOf('Пользовательское соглашение') > -1 ? PP_EN.terms : PP_EN.privacy);
        if (el.innerHTML !== enHtml) el.innerHTML = enHtml;
      } else if (el.innerHTML !== ru) {
        el.innerHTML = ru;
      }
    }

    // 5) Logo image — the subtitle "Инвестиционная экосистема" is baked into the
    // PNG, so we swap to a localised English logo (TRADE SYSTEM / INVESTMENT ECOSYSTEM).
    swapLogos(en);

    // 6) Crypto broker video — point the Kinescope player at the localised cut.
    swapVideos(en);

    document.title = en ? TITLE_EN : TITLE_RU;
    document.documentElement.setAttribute('lang', lang);
    // Ссылки на блог ведут в нужную языковую версию (/blogs ↔ /en/blogs).
    var blogLinks = document.querySelectorAll('.js-blog-link');
    for (var bi = 0; bi < blogLinks.length; bi++) {
      blogLinks[bi].setAttribute('href', en ? '/en/blogs/' : '/blogs/');
    }
    updateSeo(lang);
    markActive(lang);
    place();
    balanceStats();
    placeHeroNav();
  }

  // Re-render a circular CTA's characters around the ring (same math as the
  // page's own generator: radius = container width * 0.437). The radius is
  // cached so a switch still renders correctly even if the live width momentarily
  // reads 0 during a reflow.
  function renderCircle(wrap) {
    var tc = wrap.querySelector('.js-circle-cta-text');
    if (!tc) return;
    var text = wrap.getAttribute('data-circle-text') || '';
    var chars = text.split('');
    var total = chars.length;
    if (!total) return;
    var size = tc.offsetWidth;
    var radius;
    if (size) {
      radius = size * 0.437;
      wrap.setAttribute('data-circle-radius', radius);   // remember a good value
    } else {
      radius = parseFloat(wrap.getAttribute('data-circle-radius')) || 0;
      if (!radius) return;                                // nothing usable yet
    }
    tc.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var span = document.createElement('span');
      span.className = 'circle-cta__char';
      span.textContent = chars[i];
      span.style.transform = 'rotate(' + ((i / total) * 360) + 'deg) translate(0, -' + radius + 'px)';
      tc.appendChild(span);
    }
  }

  // Keep the ring re-rendering in the chosen language when its size changes,
  // independently of the page's own observer.
  function observeCircle(wrap) {
    if (wrap.__i18nObserved || !('ResizeObserver' in window)) return;
    var tc = wrap.querySelector('.js-circle-cta-text');
    if (!tc) return;
    wrap.__i18nObserved = true;
    new ResizeObserver(function () { renderCircle(wrap); }).observe(tc);
  }

  // EN-only: the long word "exchanges" overflows the right edge. Shrink both
  // stat numbers equally so the right margin of "17 exchanges" matches the left
  // margin of "12 years" (symmetric). Recomputed on resize because Tilda scales.
  function balanceStats() {
    var s12 = document.querySelector('[field="tn_text_1780552121310"]');
    var s17 = document.querySelector('[field="tn_text_1780552251507000001"]');
    if (!s12 || !s17) return;
    s12.style.removeProperty('font-size');
    s17.style.removeProperty('font-size');
    if (currentLang() !== 'en' || window.innerWidth < 980) return;   // measured at natural size
    var r12 = s12.getBoundingClientRect();
    var r17 = s17.getBoundingClientRect();
    var leftMargin = r12.left;                       // gap from viewport left to "12 years"
    var natFs = parseFloat(getComputedStyle(s17).fontSize) || 0;
    var natW = s17.scrollWidth;                       // one-line width of "17 exchanges"
    var targetW = (window.innerWidth - leftMargin) - r17.left;  // width that yields equal right margin
    if (natFs && natW && targetW > 0 && targetW < natW) {
      var fs = Math.max(28, natFs * targetW / natW);
      s12.style.setProperty('font-size', fs + 'px', 'important');
      s17.style.setProperty('font-size', fs + 'px', 'important');
    }
  }

  // Localised logo: the Russian original has "Инвестиционная экосистема" baked in;
  // the English file shows "INVESTMENT ECOSYSTEM". Swap every full-size logo
  // reference (src / data-original), leaving the tiny lazy-load placeholder alone.
  var LOGO_RU = 'images/tild6666-6362-4661-b434-363931643965__logo_tc.png';
  var LOGO_EN = 'images/logo_tc_en.png';
  function swapLogos(en) {
    var target = en ? LOGO_EN : LOGO_RU;
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      ['src', 'data-original'].forEach(function (attr) {
        var v = img.getAttribute(attr);
        if (v && v.indexOf('logo_tc') > -1 && v.indexOf('resize') < 0 && v !== target) {
          img.setAttribute(attr, target);
        }
      });
    }
  }

  // Swap the "Crypto broker" Kinescope player between the RU and EN cuts.
  // The .kv player builds its iframe src from data-id on click, so updating the
  // attribute covers the not-yet-played case. If the visitor already started the
  // video and then switches language, the loaded frame must be re-pointed at the
  // new cut so what's on screen matches the chosen language.
  function swapVideos(en) {
    var target = en ? VIDEO_EN : VIDEO_RU;
    var other = en ? VIDEO_RU : VIDEO_EN;
    var players = document.querySelectorAll('.kv[data-id="' + target + '"], .kv[data-id="' + other + '"]');
    for (var i = 0; i < players.length; i++) {
      var vp = players[i];
      if (vp.getAttribute('data-id') === target) continue;
      vp.setAttribute('data-id', target);
      if (vp.classList.contains('is-playing')) {
        var fr = vp.querySelector('.kv__frame');
        if (fr) fr.src = 'https://kinescope.io/embed/' + target + '?autoplay=1';
      }
    }
  }

  function currentLang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ru';
  }

  // ---- switcher UI -----------------------------------------------------
  var GLOBE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"' +
    ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9"></circle>' +
    '<path d="M3 12h18"></path>' +
    '<path d="M12 3c2.5 2.4 3.9 5.6 3.9 9s-1.4 6.6-3.9 9c-2.5-2.4-3.9-5.6-3.9-9S9.5 5.4 12 3z"></path>' +
    '</svg>';

  var box;

  function buildSwitcher() {
    if (document.getElementById('lang-switch')) return;
    var style = document.createElement('style');
    style.textContent =
      '#lang-switch{position:absolute;top:24px;right:34px;z-index:2147483000;' +
      "font-family:'Inter',-apple-system,Segoe UI,Arial,sans-serif;}" +
      '@media (max-width:560px){#lang-switch{right:18px;}}' +
      '#lang-switch .ls-globe{display:flex;align-items:center;justify-content:center;' +
      'width:42px;height:42px;padding:0;border:none;border-radius:50%;cursor:pointer;' +
      'background:transparent;color:#fff;box-shadow:none;' +
      '-webkit-tap-highlight-color:transparent;transition:background .25s,color .25s;}' +
      '#lang-switch .ls-globe:hover{background:rgba(0,211,200,.16);color:#00d3c8;}' +
      '#lang-switch .ls-globe svg{width:22px;height:22px;display:block;}' +
      '#lang-switch .ls-menu{position:absolute;top:calc(100% + 10px);right:0;min-width:172px;' +
      'background:#fff;border-radius:14px;padding:6px;list-style:none;margin:0;' +
      'box-shadow:0 18px 46px rgba(0,0,0,.22);opacity:0;visibility:hidden;' +
      'transform:translateY(-6px) scale(.97);transform-origin:top right;' +
      'transition:opacity .18s ease,transform .18s ease,visibility .18s;}' +
      '#lang-switch.is-open .ls-menu{opacity:1;visibility:visible;transform:translateY(0) scale(1);}' +
      '#lang-switch .ls-item{display:flex;align-items:center;gap:10px;padding:11px 16px;' +
      'border-radius:9px;cursor:pointer;color:#1a1a1a;font-size:15px;line-height:1;' +
      'white-space:nowrap;transition:background .18s,color .18s;}' +
      '#lang-switch .ls-item b{font-weight:700;letter-spacing:.5px;}' +
      '#lang-switch .ls-item:hover{background:rgba(0,211,200,.12);}' +
      '#lang-switch .ls-item.is-active{color:#00b3aa;}' +
      // --- English-only fixes: longer EN text would overflow these fixed Tilda
      // boxes and overlap neighbouring elements. Applied on desktop widths only.
      '@media (min-width:980px){' +
      'html[lang="en"] [field="tn_text_1780936122663000001"],' +
      'html[lang="en"] [field="tn_text_1780656509524"]' +
      '{font-size:30px !important;line-height:35px !important;}' +
      // stats ("12 years" / "17 exchanges") must stay on a single line, otherwise
      // the longer EN words wrap and overlap the label below.
      'html[lang="en"] [field="tn_text_1780552121310"],' +
      'html[lang="en"] [field="tn_text_1780552251507000001"]' +
      '{white-space:nowrap !important;}' +
      '}';
    document.head.appendChild(style);

    box = document.createElement('div');
    box.id = 'lang-switch';
    box.innerHTML =
      '<button type="button" class="ls-globe" aria-haspopup="true" aria-expanded="false"' +
      ' aria-label="Выбрать язык / Select language">' + GLOBE + '</button>' +
      '<ul class="ls-menu" role="menu">' +
      '<li class="ls-item" data-lang="ru" role="menuitem"><b>RU</b><span>РУССКИЙ</span></li>' +
      '<li class="ls-item" data-lang="en" role="menuitem"><b>EN</b><span>ENGLISH</span></li>' +
      '</ul>';
    document.body.appendChild(box);

    var globe = box.querySelector('.ls-globe');
    globe.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = box.classList.toggle('is-open');
      globe.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    box.querySelectorAll('.ls-item').forEach(function (li) {
      li.addEventListener('click', function (e) {
        e.stopPropagation();
        var lang = li.getAttribute('data-lang');
        var current = pathLang() === 'en' ? 'en' : 'ru';
        setCookie(COOKIE, lang, 365);
        close();
        if (lang === current) return;       // already on this language's URL
        // Navigate to the language's own URL so the address bar, canonical and
        // shared links all reflect the chosen language.
        window.location.assign(lang === 'en' ? '/en/' : '/');
      });
    });
    document.addEventListener('click', function (e) {
      if (box.classList.contains('is-open') && !box.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function close() {
    if (!box) return;
    box.classList.remove('is-open');
    var g = box.querySelector('.ls-globe');
    if (g) g.setAttribute('aria-expanded', 'false');
  }

  function markActive(lang) {
    if (!box) return;
    box.querySelectorAll('.ls-item').forEach(function (li) {
      var on = li.getAttribute('data-lang') === lang;
      li.classList.toggle('is-active', on);
    });
  }

  // A visible header item used to vertically align the globe with the menu line.
  function headerRef() {
    var els = document.querySelectorAll('.tn-elem.reg-btn, .tn-elem.nav-link');
    for (var i = 0; i < els.length; i++) {
      var t = norm(els[i].textContent);
      if (t === 'Регистрация' || t === 'Registration' ||
          t === 'О нас' || t === 'About' || t === 'Войти' || t === 'Log in') {
        var r = els[i].getBoundingClientRect();
        if (els[i].offsetParent && r.height > 0 && r.top >= 0 && r.top < 400) return els[i];
      }
    }
    return null;
  }

  // The switcher is absolutely positioned in the document, so it lives on the
  // header line and scrolls away with the page (it is not a fixed overlay).
  // Horizontal position comes from CSS; the vertical position is aligned with
  // the header/menu line so the globe sits on the same row as the nav items.
  function place() {
    if (!box) return;
    if (box.parentNode !== document.body) document.body.appendChild(box);
    var ref = headerRef();
    if (ref) {
      var r = ref.getBoundingClientRect();
      var half = box.firstChild ? box.firstChild.offsetHeight / 2 : 21;
      // rect is viewport-relative; add scroll offset to get the document Y
      box.style.top = Math.round(r.top + window.pageYOffset + r.height / 2 - half) + 'px';
    }
  }

  // ---- URL <-> language --------------------------------------------------
  // The path is authoritative: /en or /en/... is the English version,
  // everything else is Russian. This keeps each URL deterministic for crawlers.
  function pathLang() {
    try {
      return /^\/en(\/|$)/i.test(window.location.pathname) ? 'en' : null;
    } catch (e) { return null; }
  }
  // Legacy ?lang= links (kept working so any already-shared URLs don't break).
  function queryLang() {
    try {
      var m = (window.location.search || '').match(/[?&]lang=(ru|en)\b/i);
      return m ? m[1].toLowerCase() : null;
    } catch (e) { return null; }
  }
  function redirectTo(path) {
    try { window.location.replace(path + (window.location.hash || '')); }
    catch (e) { window.location.href = path; }
  }

  // ---- SEO meta, kept in sync with the rendered language ------------------
  function metaByProp(prop) {
    var m = document.head && document.head.querySelector('meta[property="' + prop + '"]');
    if (!m && document.head) {
      m = document.createElement('meta');
      m.setAttribute('property', prop);
      document.head.appendChild(m);
    }
    return m;
  }
  function metaByName(name) {
    var m = document.head && document.head.querySelector('meta[name="' + name + '"]');
    if (!m && document.head) {
      m = document.createElement('meta');
      m.setAttribute('name', name);
      document.head.appendChild(m);
    }
    return m;
  }
  function updateSeo(lang) {
    if (!document.head) return;
    var en = lang === 'en';
    var url = en ? URL_EN : URL_RU;
    var canon = document.head.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', url);
    var set = function (m, v) { if (m) m.setAttribute('content', v); };
    set(metaByProp('og:url'), url);
    set(metaByProp('og:title'), en ? OG_TITLE_EN : OG_TITLE_RU);
    set(metaByProp('og:description'), en ? DESC_EN : DESC_RU);
    set(metaByProp('og:locale'), en ? 'en_US' : 'ru_RU');
    set(metaByProp('og:locale:alternate'), en ? 'ru_RU' : 'en_US');
    set(metaByName('description'), en ? DESC_EN : DESC_RU);
  }

  // ---- language detection ---------------------------------------------
  function offlineGuess() {
    try {
      var langs = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();
      if (/\b(ru|uk|be|kk|ky|hy|az|uz|tg|tk)\b/.test(langs)) return 'ru';
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (/Moscow|Minsk|Kiev|Kyiv|Almaty|Tashkent|Yekaterinburg|Samara|Volgograd|Tbilisi|Yerevan|Baku|Bishkek|Ashgabat|Dushanbe|Chisinau|Novosibirsk|Krasnoyarsk|Omsk|Vladivostok|Kaliningrad/i.test(tz)) return 'ru';
    } catch (e) {}
    return 'en';
  }
  function detectByIp(done) {
    var sources = ['https://ipapi.co/json/', 'https://ipwho.is/'];
    var idx = 0;
    (function next() {
      if (idx >= sources.length) { done(null); return; }
      fetch(sources[idx++], { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var cc = d && (d.country_code || d.country || d.countryCode);
          if (cc) done(String(cc).toUpperCase()); else next();
        })
        .catch(next);
    })();
  }

  // ---- hero navigation -------------------------------------------------
  // Hero-меню — это Tilda Zero Block: каждый пункт (Терминал/Возможности/О нас)
  // лежит в .tn-elem с фиксированной шириной, рассчитанной под ДЛИННЫЕ русские
  // слова, а текст прижат влево. По-русски слова заполняют свои боксы и зазоры
  // выходят ровные (≈55px), но по-английски слова короче — внутри боксов остаётся
  // «хвост» пустоты, и видимые отступы разъезжаются (67/98/55).
  //
  // Поэтому НЕ пытаемся подгонять один «Блог» под кривые боксы Tilda. Вместо этого
  // рисуем СВОЙ ряд меню (все четыре пункта) поверх hero одним flex-контейнером с
  // одинаковым gap, а оригинальные пункты Tilda прячем (visibility:hidden — они
  // остаются в DOM и их геометрию можно мерить для позиционирования/масштаба).
  // Так в ОБОИХ языках получаются гарантированно одинаковые отступы на одной линии.
  var heroPollTimer = null;
  var NAV_ITEMS = [
    { href: '#terminal', ru: 'Терминал',    en: 'Terminal' },
    { href: '#features', ru: 'Возможности', en: 'Features' },
    { href: '#about',    ru: 'О нас',       en: 'About' },
    { href: 'blog',      ru: 'Блог',        en: 'Blog' }   // href подставляем по языку
  ];
  var NAV_GAP = 55;   // одинаковый видимый зазор между пунктами (как в RU-дизайне)

  function navTilElem(href) {
    var a = document.querySelector('.nav-link a[href="' + href + '"]');
    return a ? a.closest('.tn-elem') : null;
  }

  // Создаём (или находим) собственный ряд меню. Кладём в body, а НЕ в artboard:
  // Tilda на широких экранах масштабирует зеро-блок (zoom), и вложенный элемент
  // считался бы в искажённых координатах. Позиционируем по реальной геометрии.
  function ensureHeroNav() {
    var nav = document.querySelector('.js-hero-nav');
    if (nav) return nav;
    nav = document.createElement('div');
    nav.className = 'js-hero-nav';
    nav.style.position = 'absolute';
    nav.style.display = 'none';
    nav.style.alignItems = 'center';
    nav.style.whiteSpace = 'nowrap';
    nav.style.zIndex = '20';
    nav.style.color = '#fff';
    for (var i = 0; i < NAV_ITEMS.length; i++) {
      var a = document.createElement('a');
      a.style.color = 'inherit';
      a.style.textDecoration = 'none';
      if (NAV_ITEMS[i].href === 'blog') a.className = 'js-blog-link';
      else a.setAttribute('href', NAV_ITEMS[i].href);
      nav.appendChild(a);
    }
    document.body.appendChild(nav);
    return nav;
  }

  function placeHeroNav() {
    // Чистим возможные клоны от прежних версий скрипта.
    var stale = document.querySelector('.js-blog-hero');
    if (stale && stale.parentNode) stale.parentNode.removeChild(stale);

    var tEl = navTilElem('#terminal');
    var refA = document.querySelector('.nav-link a[href="#terminal"]');
    if (!tEl || !refA) return;
    var nav = ensureHeroNav();
    var tr = tEl.getBoundingClientRect();

    // Скрыт (мобильная раскладка/бургер или ещё не отрисован) — прячем свой ряд,
    // оригинальные пункты Tilda не трогаем (на мобиле работает бургер-меню).
    // Проверяем ТОЛЬКО ширину: позиция считается в координатах документа
    // (tr.top + pageYOffset), поэтому ряд корректно уезжает со страницей при
    // скролле и его не нужно прятать, когда hero просто прокручен выше вьюпорта.
    if (tr.width === 0) { nav.style.display = 'none'; return; }

    // Прячем оригинальные пункты Tilda (остаются в DOM для измерений).
    for (var h = 0; h < NAV_ITEMS.length - 1; h++) {
      var el = navTilElem(NAV_ITEMS[h].href);
      if (el) el.style.visibility = 'hidden';
    }

    // Эффективный масштаб Tilda (zoom на широких экранах): отношение видимой
    // ширины к layout-ширине. fontSize/gap масштабируем тем же коэффициентом.
    var scale = tEl.offsetWidth ? (tr.width / tEl.offsetWidth) : 1;
    if (!scale || !isFinite(scale)) scale = 1;

    var en = currentLang() === 'en';
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < NAV_ITEMS.length; i++) {
      links[i].textContent = en ? NAV_ITEMS[i].en : NAV_ITEMS[i].ru;
      if (NAV_ITEMS[i].href === 'blog') {
        links[i].setAttribute('href', en ? '/en/blogs/' : '/blogs/');
      }
    }

    var cs = window.getComputedStyle(refA);
    nav.style.fontFamily = cs.fontFamily;
    nav.style.fontWeight = cs.fontWeight;
    nav.style.fontSize = (parseFloat(cs.fontSize) * scale) + 'px';
    var ls = parseFloat(cs.letterSpacing);
    nav.style.letterSpacing = isFinite(ls) ? (ls * scale) + 'px' : 'normal';
    nav.style.gap = (NAV_GAP * scale) + 'px';
    nav.style.height = tr.height + 'px';
    nav.style.left = (tr.left + window.pageXOffset) + 'px';
    nav.style.top = (tr.top + window.pageYOffset) + 'px';
    nav.style.display = 'flex';
  }

  // Пересчитываем позицию, пока Tilda не зафиксирует раскладку (до ~6 c), плюс
  // отдельные вызовы на resize.
  function pollHeroPlace() {
    if (heroPollTimer) clearInterval(heroPollTimer);
    var ticks = 0;
    heroPollTimer = setInterval(function () {
      placeHeroNav();
      if (++ticks > 60) { clearInterval(heroPollTimer); heroPollTimer = null; }
    }, 100);
  }
  function injectHeroBlog() {
    try {
      pollHeroPlace();
    } catch (e) {}
  }

  function init() {
    buildSwitcher();
    injectHeroBlog();
    place();

    // Capture the original Russian ring text now, before any translation,
    // while data-circle-text is still guaranteed to hold the source string.
    var circles = document.querySelectorAll('.js-circle-cta[data-circle-text]');
    for (var c = 0; c < circles.length; c++) {
      if (circles[c].getAttribute('data-i18n-circle') === null) {
        circles[c].setAttribute('data-i18n-circle', circles[c].getAttribute('data-circle-text'));
      }
    }

    // On the English URL (/en/...): force English, no detection, no redirect.
    if (pathLang() === 'en') {
      setCookie(COOKIE, 'en', 365);
      apply('en');
      schedule();
      return;
    }

    // From here on we are on the Russian URL "/".
    // Honour a legacy ?lang=en link by moving the visitor to the /en/ page.
    if (queryLang() === 'en') { redirectTo('/en/'); return; }

    var saved = getCookie(COOKIE);
    if (saved === 'en') { redirectTo('/en/'); return; }   // returning EN visitor → /en/
    if (saved === 'ru') { apply('ru'); schedule(); return; }

    // First visit on "/": render native Russian, then refine by IP.
    // If the visitor is outside the Russian-speaking region, send them to /en/.
    apply('ru');
    detectByIp(function (country) {
      var lang = country ? (RU_COUNTRIES[country] ? 'ru' : 'en') : offlineGuess();
      setCookie(COOKIE, lang, 365);
      if (lang === 'en') redirectTo('/en/');
    });
    schedule();
  }

  // Tilda finalises its zero-block layout asynchronously; reposition a few times
  function schedule() {
    [200, 600, 1200, 2500].forEach(function (ms) {
      setTimeout(function () { place(); balanceStats(); placeHeroNav(); }, ms);
    });
    // На resize Tilda пересобирает раскладку асинхронно — поэтому не одиночный
    // placeHeroBlog(), а pollHeroPlace() (пересчёт несколько секунд, пока не устаканится).
    window.addEventListener('resize', function () { place(); balanceStats(); pollHeroPlace(); });
    window.addEventListener('orientationchange', function () { setTimeout(function () { place(); balanceStats(); pollHeroPlace(); }, 200); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
