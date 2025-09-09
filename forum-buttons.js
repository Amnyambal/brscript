// ==UserScript==
// @name         Technical Specialist
// @namespace    https://forum.blackrussia.online
// @version      3.1
// @description  Для технического отдела и комфортной модерации разделов
// @author       Raf_Piatigorsky (доработано)
// @match        https://forum.blackrussia.online/*
// @grant        none
// @license      MIT
// @collaborator Raf_Piatigorsky
// @icon         https://avatars.mds.yandex.net/i?id=2e5b30b9c5657d05784ad9708e8c9b3597a65679-12890014-images-thumbs&n=13
// ==/UserScript==

(function () {
    'use strict';

    // Ожидаем полной загрузки страницы и всех её компонентов (jQuery и XF)
    const onPageReady = () => {
        const UNACCEPT_PREFIX = 4; // префикс отказано
        const ODOBRENO_PREFIX = 8; // префикс одобрено
        const PIN_PREFIX = 2; //  префикс закрепить
        const COMMAND_PREFIX = 10; // префикс команде проекта
        const CLOSE_PREFIX = 7; // префикс закрыто
        const DECIDED_PREFIX = 6; // префикс решено
        const TECHADM_PREFIX = 13 // префикс техническому специалисту
        const WATCHED_PREFIX = 9; // префикс рассмотрено
        const WAIT_PREFIX = 14; // префикс ожидание (для переноса в баг-трекер)
        const NO_PREFIX = 0; // префикс отсутствует

        const buttons = [
            {
                title: 'Приветствие',
                content:
                "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
                '[CENTER] текст [/CENTER][/FONT]',
            },
            {
                title: 'Дубликат',
                content:
                "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER][/CENTER]<br><br>" +
                "[CENTER]Данная тема является дубликатом вашей предыдущей темы, ссылка на тему - <br>Пожалуйста, <b>прекратите создавать идентичные или похожие темы - иначе Ваш форумный аккаунт может быть заблокирован</b>.<br><br>" +
                '[B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Закрыто[/COLOR][/FONT][/I][/B]',
            },
            {
                title: 'ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠ ЖАЛОБЫ НА ИГРОКОВ ᅠ ᅠ ᅠᅠ ᅠ ᅠ ᅠ ᅠᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ ᅠ     ',
                dpstyle: 'oswald: 3px;     color: #fff; background: #db2309; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
            },
            {
                title: 'Игрок будет заблокирован',
                color: '',
                content:
                "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
                '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                "[CENTER][SIZE=4][FONT=Verdana]После проверки доказательств и системы логирования вердикт:<br><br>[FONT=verdana]Игрок будет заблокирован[/CENTER]<br><br>" +
                '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                "[CENTER][I][FONT=verdana][COLOR=rgb(0, 255, 0)][B]Одобрено[/B][/COLOR][/FONT][/I][/CENTER]",
                prefix: ODOBRENO_PREFIX,
                status: false
            },
            {
                title: 'Игрок не будет заблокирован',
                color: '',
                content:
                "[CENTER][COLOR=rgb(209, 213, 216)][FONT=Verdana][SIZE=15px][CENTER]{{ greeting }}, уважаемый [/COLOR][COLOR=rgb(255, 204, 0)]{{ user.name }}[/COLOR].[/CENTER]<br><br>" +
                '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                "[CENTER][SIZE=4][FONT=Verdana]После проверки доказательств и системы логирования вердикт:<br><br>Доказательств недостаточно для блокировки игрока[/CENTER]<br><br>" +
                '[CENTER][img]https://i.postimg.cc/tgD5Xwhj/1618083711121.png[/img][/CENTER]<br>' +
                "[CENTER][B][I][FONT=verdana][COLOR=rgb(255, 0, 0)]Отказано[/COLOR][/FONT][/I][/B][/CENTER]",
                prefix: UNACCEPT_PREFIX,
                status: false
            },
        ];

        function main() {
            // Если мы не в теме, а на главной странице форума или в списке тем, то скрипт не должен работать
            if (!$('.p-title-value').length) return;

            // Поиск информации о теме
            const threadData = getThreadData();
            if (!threadData) return; // Если не удалось получить данные, выходим

            // Добавление кнопок
            addButton('На рассмотрение', 'pin', 'border-radius: 20px; margin-right: 11px; border: 2px solid; border-color: rgb(255, 165, 0);');
            addButton('КП', 'teamProject', 'border-radius: 20px; margin-right: 100x; border: 2px solid; border-color: rgb(255, 255, 0);');
            addButton('Рассмотрено', 'watched', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 0);');
            addButton('Отказано', 'unaccept', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0);');
            addButton('Решено', 'decided', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 0);');
            addButton('Закрыто', 'closed', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(255, 0, 0);');
            addButton('Тех. спецу', 'techspec', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 0, 255);');
            addButton('Одобрено', 'odobreno', 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(128, 255, 128);');
            addAnswers();

            // Назначение событий на кнопки
            $('button#unaccept').click(() => editThreadData(UNACCEPT_PREFIX, false));
            $('button#pin').click(() => editThreadData(PIN_PREFIX, true));
            $('button#teamProject').click(() => editThreadData(COMMAND_PREFIX, true));
            $('button#watched').click(() => editThreadData(WATCHED_PREFIX, false));
            $('button#decided').click(() => editThreadData(DECIDED_PREFIX, false));
            $('button#closed').click(() => editThreadData(CLOSE_PREFIX, false));
            $('button#odobreno').click(() => editThreadData(ODOBRENO_PREFIX, false));
            $('button#techspec').click(() => editThreadData(TECHADM_PREFIX, true));

            $(`button#selectAnswers`).click(() => {
                XF.alert(buttonsMarkup(buttons), null, 'Выберите ответ:');
                buttons.forEach((btn, id) => {
                    $(`button#answers-${id}`).click(() => {
                        const shouldSend = (buttons[id].prefix !== undefined && buttons[id].status !== undefined);
                        pasteContent(id, threadData, shouldSend);
                    });
                });
            });
        }

        function addButton(name, id, style = "") {
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
                replyButton.after(`<button type="button" class="button--cta uix_quickReply--button button button--icon button--icon--write rippleButton" id="selectAnswers" style="oswald: 3px; margin-left: 5px; margin-top: 1px; border-radius: 13px; background-color: #FF4500; border-color: #E6E6FA">Ответы</button>`);
            }
        }

        function buttonsMarkup(buttons) {
            return `<div class="select_answer">${buttons
                .map(
                (btn, i) =>
                `<button id="answers-${i}" class="button--primary button rippleButton" style="margin:4px; border-radius: 13px; ${btn.dpstyle || ''}"><span class="button-text">${btn.title}</span></button>`,
            )
                .join('')}</div>`;
        }

        function pasteContent(id, data = {}, send = false) {
            if (typeof Handlebars === 'undefined') {
                console.error('Handlebars.js не загружен!');
                alert('Ошибка: библиотека для шаблонов не загружена. Попробуйте обновить страницу.');
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
            if (!authorLink.length) {
                return null;
            }

            const authorID = authorLink.attr('data-user-id');
            const authorName = authorLink.html();
            const hours = new Date().getHours();

            return {
                user: {
                    id: authorID,
                    name: authorName,
                    mention: `[USER=${authorID}]${authorName}[/USER]`,
                },
                greeting: () =>
                4 < hours && hours <= 11 ? 'Доброе утро' :
                11 < hours && hours <= 15 ? 'Добрый день' :
                15 < hours && hours <= 21 ? 'Добрый вечер' : 'Доброй ночи',
            };
        }

        function editThreadData(prefix, pin = false, may_lens = true) {
            const threadTitle = $('.p-title-value')[0].lastChild.textContent;
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
                if (prefix == WATCHED_PREFIX || prefix == CLOSE_PREFIX || prefix == DECIDED_PREFIX) {
                    moveThread(prefix, 230);
                }
                if (prefix == WAIT_PREFIX) {
                    moveThread(prefix, 917);
                }
            }
        }

        function moveThread(prefix, type) {
            const threadTitle = $('.p-title-value')[0].lastChild.textContent;
            fetch(`${document.URL}move`, {
                method: 'POST',
                body: getFormData({
                    prefix_id: prefix,
                    title: threadTitle,
                    target_node_id: type,
                    redirect_type: 'none',
                    notify_watchers: 1,
                    starter_alert: 1,
                    starter_alert_reason: "",
                    _xfToken: XF.config.csrf,
                    _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                    _xfWithData: 1,
                    _xfResponseType: 'json',
                }),
            }).then(() => location.reload());
        }

        function getFormData(data) {
            const formData = new FormData();
            Object.entries(data).forEach(i => formData.append(i[0], i[1]));
            return formData;
        }

        // --- Запуск основной логики скрипта ---
        // Загрузка скрипта для обработки шаблонов
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js';
        script.onload = main; // Запускаем основную функцию только после загрузки Handlebars
        document.body.appendChild(script);

        // --- Нижние кнопки навигации ---
        const bgButtonsContainer = document.querySelector(".p-body-main .p-body-content");
        if (bgButtonsContainer) {

            const buttonConfig = (text, href) => {
                const button = document.createElement("button");
                button.style.color = "#FFFFFF";
                button.style.backgroundColor = "#212529";
                button.style.borderColor = "#6c757d";
                button.style.borderRadius = "13px";
                button.style.borderStyle = "solid";
                button.style.borderWidth = "1px";
                button.style.padding = "0.5rem 1rem";
                button.style.fontSize = "1rem";
                button.style.cursor = "pointer";
                button.style.transition = "background-color 0.3s ease";
                button.style.margin = "5px";
                button.textContent = text;

                button.addEventListener("mouseover", () => {
                    button.style.backgroundColor = "#343a40";
                });
                button.addEventListener("mouseout", () => {
                    button.style.backgroundColor = "#212529";
                });
                button.addEventListener("click", () => {
                    window.location.href = href;
                });
                return button;
            };

            const wrapper = document.createElement('div');
            wrapper.style.textAlign = 'center';
            wrapper.style.padding = '10px';

            const Button1 = buttonConfig("Тех. раздел", 'https://forum.blackrussia.online/forums/Технический-раздел.22/');
            const Button2 = buttonConfig("Жб на техов", 'https://forum.blackrussia.online/forums/Жалобы-на-технических-специалистов.490/');
            const Button4 = buttonConfig("Правила проекта", 'https://forum.blackrussia.online/threads/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%B2.312571/');

            wrapper.append(Button1);
            wrapper.append(Button2);
            wrapper.append(Button4);

            bgButtonsContainer.append(wrapper);
        }
    };

    // Проверяем, загружены ли jQuery и объект XF от XenForo, прежде чем запускать скрипт
    const checkDependencies = setInterval(() => {
        if (window.jQuery && window.XF) {
            clearInterval(checkDependencies);
            // Используем $(document).ready для дополнительной надежности
            window.jQuery(document).ready(onPageReady);
        }
    }, 100);

})();
