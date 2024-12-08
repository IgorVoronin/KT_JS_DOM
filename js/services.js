document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.service-card');

    // Анимация появления карточек при загрузке
    function animateCardsAppearance() {
        const baseDelay = 100;
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, baseDelay * (index + 1));
        });
    }

    // Анимация при наведении и клике
    function initializeCardInteractions() {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                if (this.classList.contains('visible')) {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                    this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }
            });

            card.addEventListener('mouseleave', function () {
                if (this.classList.contains('visible')) {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }
            });

            card.addEventListener('click', function () {
                if (this.classList.contains('visible')) {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                }
            });
        });
    }

    // Инициализация
    animateCardsAppearance();
    initializeCardInteractions();
});
