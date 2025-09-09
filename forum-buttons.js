// ==UserScript==
// @name         Technical Specialist (no-external-deps)
// @namespace    https://forum.blackrussia.online
// @version      3.3
// @description  Для техотдела и удобной модерации разделов (без CDN/GM_*)
// @author       Raf_Piatigorsky
// @match        https://forum.blackrussia.online/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  // --- Константы префиксов ---
  const UNACCEPT_PREFIX = 4;
  const ODOBRENO_PREFIX = 8;
  const PIN_PREFIX = 2;
  const COMMAND_PREFIX = 10;
  const CLOSE_PREFIX = 7;
  const DECIDED_PREFIX = 6;
  const TECHADM_PREFIX = 13;
  const WATCHED_PREFIX = 9;
  const WAIT_PREFIX = 14;
  const NO_PREFIX = 0;

  // --- Кнопки-ответы (шаблоны на {{ dot.path }}) ---
  const buttons = [
    {
      title: 'Приветствие',
      content:
        "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px]" +
        "[CENTER]{{ greeting }}, уважаемый [/COLOR]" +
        "[COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
        '[CENTER] текст [/CENTER][/FONT]',
    },
    {
      title: 'Дубликат',
      content:
        "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px]" +
        "[CENTER]{{ greeting }}, уважаемый [/COLOR]" +
        "[COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
        "[CENTER]Данная тема является дубликатом вашей предыдущей темы, ссылка на тему - <br>" +
        "Пожалуйста, <b>прекратите создавать идентичные или похожие темы - иначе Ваш форумный аккаунт может быть заблокирован</b>.<br><br>" +
        '[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
    },
    {
      title: 'ᅠ ᅠ ᅠ ЖАЛОБЫ НА ИГРОКОВ',
      dpstyle:
        'color:#fff;background:#db2309;box-shadow:0 0 2px rgba(0,0,0,.14),0 2px 2px rgba(0,0,0,.12),0 1px 3px rgba(0,0,0,.2);border:none;border-color:#f53317',
    },
    {
      title: 'Игрок будет заблокирован',
      content:
        "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px]" +
        "[CENTER]{{ greeting }}, уважаемый [/COLOR]" +
        "[COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
        '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
        "[CENTER][SIZE=4][FONT=Verdana]После проверки доказательств и системы логирования вердикт:<br><br>" +
        "Игрок будет заблокирован[/CENTER]<br><br>" +
        '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
        "[CENTER][I][FONT=verdana][COLOR=rgb(0, 255, 0)][B]Одобрено[/B][/COLOR][/FONT][/I][/CENTER]",
      prefix: ODOBRENO_PREFIX,
      status: false,
    },
    {
      title: 'Игрок не будет заблокирован',
      content:
        "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px]" +
        "[CENTER]{{ greeting }}, уважаемый [/COLOR]" +
        "[COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
        '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
        "[CENTER][SIZE=4][FONT=Verdana]После проверки доказательств и системы логирования вердикт:<br><br>" +
        "Доказательств недостаточно для блокировки игрока[/CENTER]<br><br>" +
        '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
        "[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Отказано[/COLOR][/FONT][/I][/B][/CENTER]",
      prefix: UNACCEPT_PREFIX,
      status: false,
    },
  ];

  // --- Утилиты ---
  const REPLY_BTN_SEL = '.button--icon.button--icon--reply, .button--icon--reply';

  function waitFor(pred, { interval = 100, timeout = 15000 } = {}) {
    return new Promise((resolve) => {
      const start = Date.now();
      const t = setInterval(() => {
        if (pred()) {
          clearInterval(t);
          resolve(true);
        } else if (timeout && Date.now() - start > timeout) {
          clearInterval(t);
          resolve(false);
        }
      }, interval);
    });
  }

  function renderTemplate(tpl, data) {
    return tpl.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
      const parts = key.split('.');
      let v = data;
      for (const p of parts) {
        if (v && Object.prototype.hasOwnProperty.call(v, p)) v = v[p];
        else return '';
      }
      return String(v ?? '');
    });
  }

  function addButton(name, id, style = '') {
    const replyButton = document.querySelector(REPLY_BTN_SEL);
    if (!replyButton) return;
    if (document.getElementById(id)) return; // не дублируем

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = id;
    btn.className = 'button button--primary rippleButton';
    btn.setAttribute('style', style || 'border-radius:13px;margin-right:5px;');
    btn.textContent = name;
    replyButton.parentNode.insertBefore(btn, replyButton);
  }

  function addAnswers() {
    const replyButton = document.querySelector(REPLY_BTN_SEL);
    if (!replyButton) return;
    if (document.getElementById('selectAnswers')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'selectAnswers';
    btn.className = 'button--cta uix_quickReply--button button button--icon button--icon--write rippleButton';
    btn.setAttribute(
      'style',
      'margin-left:5px;margin-top:1px;border-radius:13px;background-color:#FF4500;border-color:#E6E6FA'
    );
    btn.textContent = 'Ответы';
    replyButton.insertAdjacentElement('afterend', btn);
  }

  function buttonsMarkup(list) {
    return `<div class="select_answer">${
      list
        .map(
          (btn, i) =>
            `<button id="answers-${i}" class="button--primary button rippleButton" style="margin:4px;border-radius:13px;${btn.dpstyle || ''}">
               <span class="button-text">${btn.title}</span>
             </button>`
        )
        .join('')
    }</div>`;
  }

  function pasteContent(id, data = {}, send = false) {
    const editor = document.querySelector('.fr-element.fr-view');
    if (!editor) return;

    const html = renderTemplate(buttons[id].content, data);
    const p = editor.querySelector('p') || editor;

    if (p.textContent === '') p.innerHTML = '';
    const placeholder = document.querySelector('span.fr-placeholder');
    if (placeholder) placeholder.textContent = '';

    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    while (tmp.firstChild) p.appendChild(tmp.firstChild);

    const closer = document.querySelector('a.overlay-titleCloser');
    if (closer) closer.click();

    if (send === true) {
      editThreadData(buttons[id].prefix, buttons[id].status);
      const reply = document.querySelector('.button--icon.button--icon--reply.rippleButton') ||
                    document.querySelector('.button--icon--reply');
      if (reply) reply.click();
    }
  }

  function getThreadData() {
    const authorLink = document.querySelector('a.username');
    if (!authorLink) return null;

    const authorID = authorLink.getAttribute('data-user-id') || '';
    const authorName = (authorLink.textContent || '').trim();
    const h = new Date().getHours();

    const greeting =
      h > 4 && h <= 11 ? 'Доброе утро' :
      h > 11 && h <= 15 ? 'Добрый день' :
      h > 15 && h <= 21 ? 'Добрый вечер' : 'Доброй ночи';

    return {
      user: {
        id: authorID,
        name: authorName,
        mention: `[USER=${authorID}]${authorName}[/USER]`,
      },
      greeting,
    };
  }

  function getFormData(obj) {
    const fd = new FormData();
    for (const [k, v] of Object.entries(obj)) fd.append(k, v);
    return fd;
  }

  function editThreadData(prefix, pin = false, may_lens = true) {
    if (!window.XF || !XF.config) return;

    const titleNode = document.querySelector('.p-title-value');
    const threadTitle = titleNode && titleNode.lastChild ? (titleNode.lastChild.textContent || '').trim() : document.title;
    const base = XF.config.url.fullBase;

    const postData = {
      prefix_id: prefix,
      title: threadTitle,
      _xfToken: XF.config.csrf,
      _xfRequestUri: location.href.split(base)[1] || location.pathname,
      _xfWithData: 1,
      _xfResponseType: 'json',
    };
    if (pin) {
      postData.discussion_open = 1;
      postData.sticky = 1;
    }

    fetch(`${location.href}edit`, { method: 'POST', body: getFormData(postData) })
      .then(() => location.reload());

    if (may_lens) {
      if ([WATCHED_PREFIX, CLOSE_PREFIX, DECIDED_PREFIX].includes(prefix)) moveThread(prefix, 230);
      if (prefix === WAIT_PREFIX) moveThread(prefix, 917);
    }
  }

  function moveThread(prefix, nodeId) {
    if (!window.XF || !XF.config) return;

    const titleNode = document.querySelector('.p-title-value');
    const threadTitle = titleNode && titleNode.lastChild ? (titleNode.lastChild.textContent || '').trim() : document.title;
    const base = XF.config.url.fullBase;

    const data = {
      prefix_id: prefix,
      title: threadTitle,
      target_node_id: nodeId,
      redirect_type: 'none',
      notify_watchers: 1,
      starter_alert: 1,
      starter_alert_reason: '',
      _xfToken: XF.config.csrf,
      _xfRequestUri: location.href.split(base)[1] || location.pathname,
      _xfWithData: 1,
      _xfResponseType: 'json',
    };

    fetch(`${location.href}move`, { method: 'POST', body: getFormData(data) })
      .then(() => location.reload());
  }

  function addBottomButtons() {
    const container =
      document.querySelector('.p-body-main .p-body-content') ||
      document.querySelector('.pageContent');
    if (!container) return;
    if (container.querySelector('.br-bottom-links')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'br-bottom-links';
    wrapper.style.textAlign = 'center';
    wrapper.style.padding = '10px';

    function mk(text, href) {
      const b = document.createElement('button');
      b.style.color = '#FFFFFF';
      b.style.backgroundColor = '#212529';
      b.style.borderColor = '#6c757d';
      b.style.borderRadius = '13px';
      b.style.borderStyle = 'solid';
      b.style.borderWidth = '1px';
      b.style.padding = '0.5rem 1rem';
      b.style.fontSize = '1rem';
      b.style.cursor = 'pointer';
      b.style.transition = 'background-color .3s ease';
      b.style.margin = '5px';
      b.textContent = text;
      b.addEventListener('mouseover', () => (b.style.backgroundColor = '#343a40'));
      b.addEventListener('mouseout', () => (b.style.backgroundColor = '#212529'));
      b.addEventListener('click', () => (location.href = href));
      return b;
    }

    wrapper.append(mk('Тех. раздел', 'https://forum.blackrussia.online/forums/Технический-раздел.22/'));
    wrapper.append(mk('Жб на техов', 'https://forum.blackrussia.online/forums/Жалобы-на-технических-специалистов.490/'));
    wrapper.append(mk('Правила проекта', 'https://forum.blackrussia.online/threads/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%B2.312571/'));

    container.appendChild(wrapper);
  }

  // --- Основной запуск ---
  async function initOncePerPage() {
    // ждём jQuery, XF и элемент заголовка темы (значит, это страница темы)
    const ok = await waitFor(() => window.jQuery && window.XF && document.querySelector('.p-title-value'));
    if (!ok) return;

    // Защита от дубликатов (если уже инициализировались)
    if (document.getElementById('pin')) return;

    const threadData = getThreadData();
    if (!threadData) return;

    // Кнопки у редактора
    addButton('На рассмотрение', 'pin', 'border-radius:20px;margin-right:11px;border:2px solid;border-color:rgb(255,165,0);');
    addButton('КП', 'teamProject', 'border-radius:20px;margin-right:100px;border:2px solid;border-color:rgb(255,255,0);');
    addButton('Рассмотрено', 'watched', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(0,255,0);');
    addButton('Отказано', 'unaccept', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(255,0,0);');
    addButton('Решено', 'decided', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(0,255,0);');
    addButton('Закрыто', 'closed', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(255,0,0);');
    addButton('Тех. спецу', 'techspec', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(0,0,255);');
    addButton('Одобрено', 'odobreno', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(128,255,128);');
    addAnswers();

    // Нижние навигационные кнопки
    addBottomButtons();

    // Обработчики действий
    $(document).on('click', 'button#unaccept', () => editThreadData(UNACCEPT_PREFIX, false));
    $(document).on('click', 'button#pin', () => editThreadData(PIN_PREFIX, true));
    $(document).on('click', 'button#teamProject', () => editThreadData(COMMAND_PREFIX, true));
    $(document).on('click', 'button#watched', () => editThreadData(WATCHED_PREFIX, false));
    $(document).on('click', 'button#decided', () => editThreadData(DECIDED_PREFIX, false));
    $(document).on('click', 'button#closed', () => editThreadData(CLOSE_PREFIX, false));
    $(document).on('click', 'button#odobreno', () => editThreadData(ODOBRENO_PREFIX, false));
    $(document).on('click', 'button#techspec', () => editThreadData(TECHADM_PREFIX, true));

    $(document).on('click', 'button#selectAnswers', () => {
      XF.alert(buttonsMarkup(buttons), null, 'Выберите ответ:');
      buttons.forEach((btn, id) => {
        $(document).on('click', `#answers-${id}`, () => {
          const shouldSend = btn.prefix !== undefined && btn.status !== undefined;
          pasteContent(id, threadData, shouldSend);
        });
      });
    });
  }

  // Первый запуск
  initOncePerPage();

  // Повторная инициализация на AJAX-переходах XenForo (SPA)
  if (window.XF && XF.on) {
    XF.on('page:load', () => initOncePerPage());
  }

})();
