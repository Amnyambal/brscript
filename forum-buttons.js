// ==UserScript==
// @name         TechSpec Test
// @namespace    https://forum.blackrussia.online
// @version      0.1
// @description  Проверка факта инъекции
// @match        https://forum.blackrussia.online/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("[TechSpec] Скрипт загружен и выполняется");

    // Попробуем добавить простую тестовую кнопку
    const testBtn = document.createElement("button");
    testBtn.textContent = "TEST BUTTON";
    testBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background: red;
        color: white;
        padding: 10px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
    `;
    testBtn.onclick = () => alert("Скрипт реально работает!");
    document.body.appendChild(testBtn);
})();
