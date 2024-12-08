document.addEventListener('DOMContentLoaded', function () {
    // Изменение прозрачности шапки при прокрутке
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Эффект параллакса для hero секции
    window.addEventListener('scroll', function () {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Эффект снега
    function createSnowflake() {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = Math.random() * mainContent.offsetWidth + 'px';
        snowflake.style.animationDuration = Math.random() * 4 + 4 + 's';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.innerHTML = '❄';
        mainContent.appendChild(snowflake);

        // Удаляем снежинку после анимации
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    setInterval(createSnowflake, 200);

    // Cтили для снежинок
    const style = document.createElement('style');
    style.textContent = `
        .snowflake {
            position: fixed;
            color: white;
            pointer-events: none;
            z-index: 1;
            top: -20px;
            animation: fall linear forwards;
        }

        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }

        .main-content {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Анимация при скролле для элементов
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    // Плавный скролл для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация для логотипа при наведении
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        logo.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Запуск анимации при скролле
    window.addEventListener('scroll', animateOnScroll);
    // Запуск один раз при загрузке
    animateOnScroll();
});
