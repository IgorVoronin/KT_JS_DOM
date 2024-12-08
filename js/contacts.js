// Функция инициализации формы
function initForm() {
    const form = document.getElementById('feedbackForm');
    const formMessage = document.querySelector('.form-message');
    const phoneInput = document.getElementById('phone');
    let previousValue = '';

    // Маска для телефона
    phoneInput.addEventListener('input', function (e) {
        let cursorPosition = e.target.selectionStart;
        let value = e.target.value;
        let length = value.length;

        if (length < previousValue.length) {
            previousValue = value;
            return;
        }

        // Очищаем от всех символов кроме цифр
        value = value.replace(/\D/g, '');

        // Ограничиваем длину до 11 цифр
        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        // Форматируем номер
        let formattedValue = '';
        if (value.length > 0) {
            if (value[0] !== '7') {
                value = '7' + value;
            }

            formattedValue = '+7';
            if (value.length > 1) {
                formattedValue += ' (' + value.slice(1, 4);
            }
            if (value.length > 4) {
                formattedValue += ') ' + value.slice(4, 7);
            }
            if (value.length > 7) {
                formattedValue += '-' + value.slice(7, 11);
            }
        }

        e.target.value = formattedValue;
        previousValue = formattedValue;

        if (cursorPosition < length) {
            e.target.setSelectionRange(cursorPosition, cursorPosition);
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Валидация формы
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!validateForm(name, phone, email, message)) {
            showMessage('Пожалуйста, заполните все поля корректно', 'error');
            return;
        }

        // Имитация отправки данных
        setTimeout(() => {
            showMessage('Спасибо! Ваше сообщение отправлено.', 'success');
            form.reset();
        }, 1000);
    });

    // Функция валидации
    function validateForm(name, phone, email, message) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{4}$/;

        return name.length > 2 &&
            phoneRegex.test(phone) &&
            emailRegex.test(email) &&
            message.length > 10;
    }

    // Функция отображения сообщения
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.opacity = '0';
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.style.opacity = '1';
        }, 10);

        // Автоматическое скрытие сообщения через 5 секунд
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 300);
            }, 5000);
        }
    }
}

// Функция инициализации копирования
function initCopy() {
    const contactItems = document.querySelectorAll('.contact-value');
    let notification = null;

    // Создаем элемент уведомления
    function createNotification() {
        const notif = document.createElement('div');
        notif.className = 'copy-notification';
        document.body.appendChild(notif);
        return notif;
    }

    // Показываем уведомление
    function showNotification(text) {
        if (!notification) {
            notification = createNotification();
        }
        notification.textContent = text;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    // Копируем текст
    async function copyText(text, type) {
        try {
            await navigator.clipboard.writeText(text);
            let message;
            switch (type) {
                case 'phone':
                    message = 'Телефон скопирован';
                    break;
                case 'email':
                    message = 'Email скопирован';
                    break;
                case 'address':
                    message = 'Адрес скопирован';
                    break;
                default:
                    message = 'Текст скопирован';
            }
            showNotification(message);
        } catch (err) {
            showNotification('Не удалось скопировать');
        }
    }

    // Обработчики событий для копирования
    contactItems.forEach(item => {
        // Копирование по клику
        item.addEventListener('click', () => {
            copyText(item.textContent.trim(), item.dataset.type);
        });

        // Копирование по Ctrl+C при фокусе
        item.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'c') {
                copyText(item.textContent.trim(), item.dataset.type);
            }
        });

        item.setAttribute('tabindex', '0');
    });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
    initForm();
    initCopy();
});
