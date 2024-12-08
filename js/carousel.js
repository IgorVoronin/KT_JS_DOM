document.addEventListener('DOMContentLoaded', function () {
    const carousel = {
        container: document.querySelector('.carousel-container'),
        slides: [
            {
                image: 'img/hero/slide1.jpg',
                caption: 'Живописные склоны для всех уровней подготовки'
            },
            {
                image: 'img/hero/slide2.jpg',
                caption: 'Современные подъемники и оборудование'
            },
            {
                image: 'img/hero/slide3.jpg',
                caption: 'Уютные домики для отдыха'
            },
            {
                image: 'img/hero/slide4.jpg',
                caption: 'Профессиональные инструкторы'
            }
        ],
        state: {
            currentSlide: 0,
            isAnimating: false,
            autoPlayInterval: null
        },

        init() {
            this.createSlides();
            this.createDots();
            this.addEventListeners();
            this.startAutoPlay();
            this.updateDots();
        },

        createSlides() {
            this.slides.forEach(slide => {
                const slideElement = document.createElement('div');
                slideElement.className = 'carousel-slide';
                slideElement.innerHTML = `
                    <img src="${slide.image}" alt="${slide.caption}">
                    <div class="carousel-caption">${slide.caption}</div>
                `;
                this.container.appendChild(slideElement);
            });
        },

        createDots() {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';

            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                dot.addEventListener('click', () => this.goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            document.querySelector('.carousel-section').insertBefore(dotsContainer, document.querySelector('.carousel'));
        },

        addEventListeners() {
            document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
            document.querySelector('.next').addEventListener('click', () => this.nextSlide());

            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });

            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        },

        updateDots() {
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.state.currentSlide);
            });
        },

        goToSlide(index) {
            if (this.state.isAnimating) return;
            this.state.isAnimating = true;

            this.state.currentSlide = index;
            this.container.style.transform = `translateX(-${index * 100}%)`;

            this.updateDots();

            setTimeout(() => {
                this.state.isAnimating = false;
            }, 500);
        },

        nextSlide() {
            const next = (this.state.currentSlide + 1) % this.slides.length;
            this.goToSlide(next);
        },

        prevSlide() {
            const prev = (this.state.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prev);
        },

        startAutoPlay() {
            if (!this.state.autoPlayInterval) {
                this.state.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
            }
        },

        stopAutoPlay() {
            if (this.state.autoPlayInterval) {
                clearInterval(this.state.autoPlayInterval);
                this.state.autoPlayInterval = null;
            }
        }
    };

    carousel.init();
});
