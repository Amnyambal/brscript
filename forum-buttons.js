// ==UserScript==
// @name         Technical Specialist
// @namespace    https://forum.blackrussia.online
// @version      3.2
// @description  Для технического отдела и комфортной модерации разделов
// @author       Raf_Piatigorsky
// @match        https://forum.blackrussia.online/*
// @grant        none
// @license      MIT
// @icon         https://avatars.mds.yandex.net/i?id=2e5b30b9c5657d05784ad9708e8c9b3597a65679-12890014-images-thumbs&n=13
// ==/UserScript==

(function () {
    'use strict';

    // Префиксы
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

    // Шаблонные кнопки-ответы
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
                'color: #fff; background: #db2309; ' +
                'box-shadow: 0 0 2px rgba(0,0,0,0.14),0 2px 2px rgba(0,0,0,0.12),0 1px 3px rgba(0,0,0,0.2); ' +
                'border: none; border-color: #f53317',
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

    // --- Вспомогательные функции ---
    function addButton(name, id, style = '') {
        const replyButton = $('.button--icon--reply');
        if (replyButton.length) {
            replyButton.before(
                `<button type="button" class="button button--primary rippleButton" id="${id}" style="${style}">${name}</button>`
            );
        }
    }

    function addAnswers() {
        const replyButton = $('.button--icon--reply');
        if (replyButton.length) {
            replyButton.after(
                `<button type="button" class="button--cta uix_quickReply--button button button--icon button--icon--write rippleButton" 
                  id="selectAnswers" 
                  style="margin-left:5px;margin-top:1px;border-radius:13px;background-color:#FF4500;border-color:#E6E6FA">
                   Ответы
                 </button>`
            );
        }
    }

    function buttonsMarkup(buttons) {
        return `<div class="select_answer">${buttons
            .map(
                (btn, i) =>
                    `<button id="answers-${i}" class="button--primary button rippleButton" style="margin:4px;border-radius:13px;${btn.dpstyle || ''}">
                        <span class="button-text">${btn.title}</span>
                     </button>`
            )
            .join('')}</div>`;
    }

    function pasteContent(id, data = {}, send = false) {
        if (typeof Handlebars === 'undefined') {
            alert('Ошибка: Handlebars не загрузился.');
            return;
        }

        const template = Handlebars.compile(buttons[id].content);
        const editor = $('.fr-element.fr-view');

        if (editor.length) {
            if (editor.find('p').text() === '') editor.find('p').empty();
            $('span.fr-placeholder').empty();
            editor.find('p').append(template(data));
            $('a.overlay-titleCloser').trigger('click');

            if (send === true) {
                editThreadData(buttons[id].prefix, buttons[id].status);
                $('.button--icon.button--icon--reply.rippleButton').trigger('click');
            }
        }
    }

    function getThreadData() {
        const authorLink = $('a.username').first();
        if (!authorLink.length) return null;

        const authorID = authorLink.attr('data-user-id');
        const authorName = authorLink.text();
        const hours = new Date().getHours();

        const greeting =
            hours > 4 && hours <= 11
                ? 'Доброе утро'
                : hours > 11 && hours <= 15
                ? 'Добрый день'
                : hours > 15 && hours <= 21
                ? 'Добрый вечер'
                : 'Доброй ночи';

        return {
            user: {
                id: authorID,
                name: authorName,
                mention: `[USER=${authorID}]${authorName}[/USER]`,
            },
            greeting: greeting,
        };
    }

    function editThreadData(prefix, pin = false, may_lens = true) {
        if (!window.XF || !XF.config) {
            console.error('XF.config не найден');
            return;
        }

        const threadTitle = $('.p-title-value')[0]?.lastChild?.textContent || 'Тема';

        const postData = {
            prefix_id: prefix,
            title: threadTitle,
            _xfToken: XF.config.csrf,
            _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
            _xfWithData: 1,
            _xfResponseType: 'json',
        };

        if (pin) {
            postData.discussion_open = 1;
            postData.sticky = 1;
        }

        fetch(`${document.URL}edit`, {
            method: 'POST',
            body: getFormData(postData),
        }).then(() => location.reload());

        if (may_lens === true) {
            if ([WATCHED_PREFIX, CLOSE_PREFIX, DECIDED_PREFIX].includes(prefix)) {
                moveThread(prefix, 230);
            }
            if (prefix == WAIT_PREFIX) {
                moveThread(prefix, 917);
            }
        }
    }

    function moveThread(prefix, type) {
        if (!window.XF || !XF.config) return;
        const threadTitle = $('.p-title-value')[0]?.lastChild?.textContent || 'Тема';

        fetch(`${document.URL}move`, {
            method: 'POST',
            body: getFormData({
                prefix_id: prefix,
                title: threadTitle,
                target_node_id: type,
                redirect_type: 'none',
                notify_watchers: 1,
                starter_alert: 1,
                starter_alert_reason: '',
                _xfToken: XF.config.csrf,
                _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                _xfWithData: 1,
                _xfResponseType: 'json',
            }),
        }).then(() => location.reload());
    }

    function getFormData(data) {
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => formData.append(k, v));
        return formData;
    }

    // --- Основная логика ---
    function main() {
        if (!$('.p-title-value').length) return; // не в теме

        const threadData = getThreadData();
        if (!threadData) return;

        // кнопки
        addButton('На рассмотрение', 'pin', 'border-radius:20px;margin-right:11px;border:2px solid;border-color:rgb(255,165,0);');
        addButton('КП', 'teamProject', 'border-radius:20px;margin-right:100px;border:2px solid;border-color:rgb(255,255,0);');
        addButton('Рассмотрено', 'watched', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(0,255,0);');
        addButton('Отказано', 'unaccept', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(255,0,0);');
        addButton('Решено', 'decided', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(0,255,0);');
        addButton('Закрыто', 'closed', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(255,0,0);');
        addButton('Тех. спецу', 'techspec', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(0,0,255);');
        addButton('Одобрено', 'odobreno', 'border-radius:13px;margin-right:5px;border:2px solid;border-color:rgb(128,255,128);');
        addAnswers();

        // события
        $('button#unaccept').click(() => editThreadData(UNACCEPT_PREFIX, false));
        $('button#pin').click(() => editThreadData(PIN_PREFIX, true));
        $('button#teamProject').click(() => editThreadData(COMMAND_PREFIX, true));
        $('button#watched').click(() => editThreadData(WATCHED_PREFIX, false));
        $('button#decided').click(() => editThreadData(DECIDED_PREFIX, false));
        $('button#closed').click(() => editThreadData(CLOSE_PREFIX, false));
        $('button#odobreno').click(() => editThreadData(ODOBRENO_PREFIX, false));
        $('button#techspec').click(() => editThreadData(TECHADM_PREFIX, true));

        $('button#selectAnswers').click(() => {
            XF.alert(buttonsMarkup(buttons), null, 'Выберите ответ:');
            buttons.forEach((btn, id) => {
                $(`button#answers-${id}`).click(() => {
                    const shouldSend = btn.prefix !== undefined && btn.status !== undefined;
                    pasteContent(id, threadData, shouldSend);
                });
            });
        });
    }

    // Ждём загрузки jQuery и XF, потом подгружаем Handlebars
    const check = setInterval(() => {
        if (window.jQuery && window.XF) {
            clearInterval(check);
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js';
            script.onload = main;
            document.body.appendChild(script);
        }
    }, 100);
})();
