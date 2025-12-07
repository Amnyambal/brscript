// ==UserScript==
// @name         Black Russia Forum New Year Theme (Dark + Snow)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Новогодняя тема (тёмная), снегопад и праздничные элементы для форума Black Russia (XenForo 2.2)
// @author       You
// @match        https://forum.blackrussia.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=forum.blackrussia.online
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // --- КОНФИГУРАЦИЯ ---
    const CONFIG = {
        storageKey: 'br_snow_enabled',
        colors: {
            bg: '#0d1117',
            card: '#161b22',
            border: '#30363d',
            textMain: '#e6edf3',
            textDim: '#8b949e',
            accentRed: '#c41e3a',
            accentGreen: '#238636',
            glow: '0 0 10px rgba(196, 30, 58, 0.5)'
        },
        snow: {
            countDesktop: 80,
            countMobile: 30,
            zIndex: 8000 // Ниже модалок XF (обычно 9000+), но выше контента
        }
    };

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 1. CSS СТИЛИ (ТЁМНАЯ ТЕМА + ПРАЗДНИК) ---
    // Мы переопределяем переменные XenForo (--xf-*) для максимальной совместимости
    const css = `
        :root {
            /* Базовые цвета XF Override */
            --xf-bodyBg: ${CONFIG.colors.bg} !important;
            --xf-contentBg: ${CONFIG.colors.card} !important;
            --xf-paletteColor1: ${CONFIG.colors.card} !important; /* Часто используется в блоках */
            --xf-paletteColor2: ${CONFIG.colors.border} !important;
            --xf-borderColor: ${CONFIG.colors.border} !important;
            --xf-borderColorLight: ${CONFIG.colors.border} !important;
            --xf-textColor: ${CONFIG.colors.textMain} !important;
            --xf-textColorMuted: ${CONFIG.colors.textDim} !important;
            --xf-linkColor: #58a6ff !important;

            /* Праздничные переменные */
            --ny-accent-red: ${CONFIG.colors.accentRed};
            --ny-accent-green: ${CONFIG.colors.accentGreen};
        }

        body {
            background-color: var(--xf-bodyBg) !important;
            color: var(--xf-textColor) !important;
        }

        /* Блоки и карточки */
        .block-container, .p-nav, .p-sectionLinks, .message-inner, .p-footer-inner {
            background: var(--xf-contentBg) !important;
            border-color: var(--xf-borderColor) !important;
            color: var(--xf-textColor) !important;
        }

        /* Хедер и навигация */
        .p-header, .p-nav {
            background: #101419 !important;
            border-bottom: 1px solid ${CONFIG.colors.accentRed} !important;
            box-shadow: 0 4px 15px rgba(196, 30, 58, 0.2) !important;
        }
        
        .p-header-logo img {
             filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
        }

        /* Ссылки и наведение */
        a { transition: color 0.2s ease, text-shadow 0.2s ease; }
        a:hover {
            text-shadow: 0 0 5px rgba(88, 166, 255, 0.6);
        }

        /* Кнопки - праздничный градиент */
        .button.button--primary, .button.button--cta {
            background: linear-gradient(135deg, ${CONFIG.colors.accentRed}, #8b0000) !important;
            border: none !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.4);
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .button.button--primary:hover, .button.button--cta:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(196, 30, 58, 0.6);
        }

        /* Инпуты */
        .input, .inputGroup-text {
            background: #0d1117 !important;
            border: 1px solid #30363d !important;
            color: #e6edf3 !important;
        }
        .input:focus {
            background: #1a1f26 !important;
            box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.3) !important;
        }

        /* Текст в сообщениях */
        .bbWrapper { color: #e6edf3 !important; }
        
        /* Цитаты */
        .bbCodeBlock {
            background: #1f252e !important;
            border-left: 3px solid ${CONFIG.colors.accentGreen} !important;
        }

        /* Canvas для снега */
        #ny-snow-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: ${CONFIG.snow.zIndex};
        }

        /* Кнопка управления снегом */
        #ny-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: rgba(22, 27, 34, 0.8);
            border: 1px solid ${CONFIG.colors.accentGreen};
            border-radius: 50%;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.3s ease;
            backdrop-filter: blur(4px);
            user-select: none;
        }
        #ny-toggle-btn:hover {
            transform: scale(1.1) rotate(15deg);
            background: rgba(35, 134, 54, 0.9);
            box-shadow: 0 0 10px ${CONFIG.colors.accentGreen};
        }
    `;

    GM_addStyle(css);

    // --- 2. ЛОГИКА СНЕГОПАДА (CANVAS) ---
    function initSnow() {
        if (prefersReducedMotion) return; // Уважать настройки системы

        // Проверка сохраненных настроек
        let isSnowEnabled = GM_getValue(CONFIG.storageKey, true);

        // Создаем Canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'ny-snow-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        // Кнопка переключения
        const toggleBtn = document.createElement('div');
        toggleBtn.id = 'ny-toggle-btn';
        toggleBtn.textContent = '❄️';
        toggleBtn.title = 'Вкл/Выкл снег';
        toggleBtn.style.opacity = isSnowEnabled ? '1' : '0.5';
        toggleBtn.style.filter = isSnowEnabled ? 'grayscale(0%)' : 'grayscale(100%)';
        
        toggleBtn.onclick = () => {
            isSnowEnabled = !isSnowEnabled;
            GM_setValue(CONFIG.storageKey, isSnowEnabled);
            toggleBtn.style.opacity = isSnowEnabled ? '1' : '0.5';
            toggleBtn.style.filter = isSnowEnabled ? 'grayscale(0%)' : 'grayscale(100%)';
            if (isSnowEnabled) {
                canvas.style.display = 'block';
                animate();
            } else {
                canvas.style.display = 'none';
            }
        };
        document.body.appendChild(toggleBtn);

        if (!isSnowEnabled) canvas.style.display = 'none';

        // Настройки снежинок
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const maxFlakes = isMobile ? CONFIG.snow.countMobile : CONFIG.snow.countDesktop;
        const flakes = [];

        class Flake {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : -10;
                this.vy = 1 + Math.random() * 2; // Скорость падения
                this.vx = (Math.random() - 0.5) * 0.5; // Покачивание
                this.r = 1.5 + Math.random() * 2.5; // Размер
                this.alpha = 0.4 + Math.random() * 0.6;
            }

            update() {
                this.y += this.vy;
                this.x += this.vx;

                // Легкое покачивание (синус)
                this.vx += (Math.random() - 0.5) * 0.05;
                // Ограничение горизонтальной скорости
                if(this.vx > 0.5) this.vx = 0.5;
                if(this.vx < -0.5) this.vx = -0.5;

                if (this.y > height) {
                    this.reset();
                }
                // Зацикливание по горизонтали
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Инициализация снежинок
        for (let i = 0; i < maxFlakes; i++) {
            flakes.push(new Flake());
        }

        // Анимация
        function animate() {
            if (!isSnowEnabled) return;
            
            ctx.clearRect(0, 0, width, height);
            
            for (let flake of flakes) {
                flake.update();
                flake.draw();
            }
            
            requestAnimationFrame(animate);
        }

        // Resize handler (с Debounce)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
            }, 100);
        });

        // Запуск
        animate();
    }

    // Запускаем только когда DOM готов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSnow);
    } else {
        initSnow();
    }

})();
