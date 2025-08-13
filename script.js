// Плавная прокрутка и анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {

    // Анимация при загрузке страницы
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Навигация
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Переключение мобильного меню
    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        });
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 70; // Учитываем высоту навигации
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Интерактивная пасхалка - терминал
    const terminal = document.querySelector('.terminal-easter-egg');
    const terminalOutput = document.getElementById('terminal-output');
    const command = document.getElementById('type-command');
    let isTerminalActive = false;

    // Показать терминал через 2 секунды после загрузки страницы
    setTimeout(() => {
        terminal?.classList.add('show');
    }, 2000);

    // Функция для типизации текста
    function typeText(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Обработка взаимодействия с терминалом
    function executeCommand() {
        if (isTerminalActive || !terminal) return;
        isTerminalActive = true;

        const output = [
    { text: '$ ./hire_junior --skills', class: 'info' },
    { text: '🛠️ Загрузка опыта: <span class="loading-progress step-0"></span>', class: 'success' },
    { text: '✅ Python (Django, FastAPI) - "О, я это видел в туториале!"', class: 'success' },
    { text: '✅ PostgreSQL - "пишу запросы, а он возвращает мне жизненные уроки"', class: 'success' },
    { text: '⚠️ Docker - "Умею запускать, но иногда забываю --rm"', class: 'warning' },
    { text: '❓ Git - "git commit -m "Что-то починил, надеюсь"', class: 'error' },
    { text: '📊 Soft skills: "Гуглю как Терминатор" + "Сплю с документацией под подушкой"', class: 'warning' },
    { text: '🔥 Главный навык: "В моем коде есть всё: PEP8, магия и молитвы"', class: 'highlight' },
    { text: '🎯 Результат: <span class="highlight">ОБУЧАЕМЫЙ ЭНТУЗИАСТ</span>', class: 'highlight' },
    { text: '💡 Готов: "Впитывать знания как губка и не заливать прод"', class: 'success' },
    { text: '📧 "Пишите, даже если просто решите похвалить мой код "', class: 'info' }
];

        terminalOutput.innerHTML = '';

        output.forEach((line, index) => {
            setTimeout(async () => {
                if (line.text.includes('loading-progress')) {
                    // Create initial loading line
                    const loadingLine = document.createElement('div');
                    loadingLine.className = 'line success';
                    loadingLine.innerHTML = '🛠️ Загрузка опыта: <span class="loading-progress step-0"></span>';
                    terminalOutput.appendChild(loadingLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;

                    // Animate loading steps
                    const progressSpan = loadingLine.querySelector('.loading-progress');
                    for (let step = 1; step <= 6; step++) {
                        await new Promise(resolve => setTimeout(resolve, 400));
                        progressSpan.className = `loading-progress step-${step}`;
                    }

                    // Add the joke text to the same line after loading completes
                     loadingLine.innerHTML = '🛠️ Загрузка опыта: <span class="loading-progress step-6"></span> (вчера было 20%!)';
                } else {
                    const lineElement = document.createElement('div');
                    lineElement.className = `line ${line.class}`;
                    lineElement.innerHTML = line.text;
                    terminalOutput.appendChild(lineElement);
                }
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, index * 600);
        });

        // Скрыть подсказку
         const hint = document.querySelector('.terminal-hint');
         if (hint) hint.style.display = 'none';

         // Скрыть курсор
         const cursor = document.querySelector('.cursor');
         if (cursor) cursor.style.display = 'none';
    }

    // Обработчики событий
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand();
        }
    });

    terminal?.addEventListener('click', () => {
        executeCommand();
    });

    // Закрытие терминала при клике на красную кнопку
    document.querySelector('.control-btn.close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        terminal.style.display = 'none';
    });

    // Минимизация терминала
    document.querySelector('.control-btn.minimize')?.addEventListener('click', (e) => {
        e.stopPropagation();
        terminal?.classList.remove('show');
        setTimeout(() => {
            terminal?.classList.add('show');
        }, 3000);
    });

    // Активная секция в навигации
    function updateActiveNav() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Анимированные счетчики
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };

            // Запуск анимации когда элемент в зоне видимости
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }



    // Параллакс эффект для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body');
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
    });

    // Анимация счетчика навыков
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Анимация для карточек проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
        });
    });

    // Типичный эффект печати для заголовков
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Применение эффекта к заголовку
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 150);
        }, 1000);
    }

    // Анимации при прокрутке
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.section, .testimonial-card, .project-card, .achievement-card');

        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            if (scrollTop > elementTop - windowHeight + elementHeight / 3) {
                element.classList.add('fade-in', 'visible');
            }
        });
    }

    // Добавление CSS для прелоадера
    const preloaderCSS = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }

        .preloader-content {
            text-align: center;
            color: white;
        }

        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    const style = document.createElement('style');
    style.textContent = preloaderCSS;
    document.head.appendChild(style);

    // Добавление прелоадера
    function addPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-spinner"></div>
                <p>Загрузка резюме...</p>
            </div>
        `;

        document.body.appendChild(preloader);

        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1500);
    }

    // Запуск всех функций
    window.addEventListener('load', () => {
        setTimeout(() => {
            typeWriter(document.querySelector('.name'), document.querySelector('.name').textContent, 150);
            animateCounters();
        }, 1000);

        handleScrollAnimations();
    });

    window.addEventListener('scroll', () => {
        updateActiveNav();
        handleScrollAnimations();
    });

    addPreloader();

    // Инициализация темы
    initTheme();

    // Анимация графиков навыков
    animateSkillBars();

    // Кнопка печати
    document.getElementById('print-btn')?.addEventListener('click', function() {
        window.print();
    });

    // Обновление активной навигации при прокрутке
    window.addEventListener('scroll', updateActiveNav);

    console.log('✅ Резюме успешно загружено!');
    console.log('📧 Не забудьте обновить контактную информацию и ссылки на проекты');
});

// Переключение темы
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    setTheme(savedTheme);

    themeToggle?.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Анимация иконки
        const icon = this.querySelector('i');
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.transform = 'rotate(0deg)';
        }, 200);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Анимация графиков навыков
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');

    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.getAttribute('data-width');

                setTimeout(() => {
                    progress.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        animateOnScroll.observe(bar);
    });
}

// Дополнительные улучшения
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.achievement-card, .project-card');

    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('float-animation');
    });
}

// Вызов дополнительных функций
addFloatingAnimation();

// Системные настройки темы
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        setTheme('dark');
    }
}

// Обработка системных изменений темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Дополнительные утилиты для мобильных устройств
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Оптимизация для медленных соединений
if (navigator.connection && navigator.connection.saveData) {
    // Оптимизации для экономии трафика
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
}

// Service Worker для офлайн-доступа (опционально)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Можно добавить Service Worker для офлайн-доступа
    });
}
