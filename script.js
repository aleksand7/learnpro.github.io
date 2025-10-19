// ===== ДОБАВЬТЕ ЭТОТ КОД В НАЧАЛО script.js =====

// Функция проверки email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция генерации логина
function generateLogin(firstName, lastName) {
    const namePart = firstName.toLowerCase().slice(0, 3);
    const randomNum = Math.floor(Math.random() * 1000);
    return `${namePart}${lastName.toLowerCase().slice(0, 2)}${randomNum}`;
}

// Функция генерации пароля
function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Функции для работы с пользователями
function getUsers() {
    return JSON.parse(localStorage.getItem('learnpro_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('learnpro_users', JSON.stringify(users));
}

// Функции показа статусов
function showError(element, message) {
    element.className = 'status-message status-error';
    element.innerHTML = message;
}

function showSuccess(element, message) {
    element.className = 'status-message status-success';
    element.innerHTML = message;
}

function showLoading(element, message) {
    element.className = 'status-message status-loading';
    element.innerHTML = message;
}

// ДОБАВЬТЕ ЭТУ ФУНКЦИЮ ПЕРВОЙ СТРОКОЙ В script.js
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

// Автоматическое определение URL сервера
function getServerBaseUrl() {
    // Если на хостинге, используем тот же домен
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return window.location.origin;
    }
    // Для локальной разработки
    return 'http://localhost:3001';
}

// Web3Forms - РАБОТАЕТ БЕЗ НАСТРОЙКИ ДОМЕНОВ
async function sendCredentialsEmail(userData) {
    const statusElement = document.getElementById('registerStatus');
    
    try {
        showLoading(statusElement, '📧 Создаем ваш аккаунт...');
        
        // Web3Forms - бесплатный ключ (работает сразу)
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: '90895255-4ba2-4a2d-b298-5759e6ddc327', // тестовый ключ
                subject: '🎓 Новый пользователь LearnPro',
                from_name: 'LearnPro Platform',
                email: userData.email,
                login: userData.login,
                password: userData.password,
                name: `${userData.firstName} ${userData.lastName}`,
                message: `НОВЫЙ ПОЛЬЗОВАТЕЛЬ LEARNPRO!

👤 Имя: ${userData.firstName} ${userData.lastName}
📧 Email: ${userData.email}
🔐 Логин: ${userData.login}
🔑 Пароль: ${userData.password}

Сохраните эти данные для входа в систему!`
            })
        });

        const result = await response.json();
        
        // Сохраняем пользователя в любом случае
        const users = JSON.parse(localStorage.getItem('learnpro_users')) || [];
        users.push(userData);
        localStorage.setItem('learnpro_users', JSON.stringify(users));
        
        if (result.success) {
            showSuccess(statusElement, '✅ Аккаунт создан! Данные отправлены на вашу почту.');
        } else {
            showSuccess(statusElement, '✅ Аккаунт создан! Сохраните данные ниже.');
        }
        
        setTimeout(() => {
            closeRegisterModal();
            showCredentialsModal(userData.login, userData.password, userData.email);
        }, 1500);
        
        return { success: true };
        
    } catch (error) {
        console.error('Ошибка:', error);
        
        // Сохраняем даже при ошибке
        const users = JSON.parse(localStorage.getItem('learnpro_users')) || [];
        users.push(userData);
        localStorage.setItem('learnpro_users', JSON.stringify(users));
        
        showSuccess(statusElement, '✅ Аккаунт создан! Сохраните данные ниже.');
        
        setTimeout(() => {
            closeRegisterModal();
            showCredentialsModal(userData.login, userData.password, userData.email);
        }, 1500);
        
        return { success: true };
    }
}

// Функции для работы с пользователями (должны быть в script.js)
function getUsers() {
    return JSON.parse(localStorage.getItem('learnpro_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('learnpro_users', JSON.stringify(users));
}

// Функции управления модальными окнами (должны быть в script.js)
function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
}

function enableBodyScroll() {
    document.body.style.overflow = '';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    enableBodyScroll();
}
// Управление модальными окнами
let isModalOpen = false;

function disableBodyScroll() {
    if (isModalOpen) return;
    document.body.style.overflow = 'hidden';
    document.body.dataset.scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    isModalOpen = true;
}

function enableBodyScroll() {
    if (!isModalOpen) return;
    const scrollY = document.body.dataset.scrollY;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, parseInt(scrollY || '0'));
    isModalOpen = false;
}

function showRegisterModal() {
    closeAllModals();
    disableBodyScroll();
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('registerForm').reset();
    document.getElementById('registerStatus').innerHTML = '';
    enableBodyScroll();
}

function showLoginModal() {
    closeAllModals();
    disableBodyScroll();
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('loginStatus').innerHTML = '';
    enableBodyScroll();
}

function showCredentialsModal(login, password, email, emailResult) {
    closeAllModals();
    disableBodyScroll();
    
    document.getElementById('displayLogin').textContent = login;
    document.getElementById('displayPassword').textContent = password;
    document.getElementById('displayEmail').textContent = email;
    
    const statusElement = document.getElementById('credentialsStatus');
    statusElement.className = 'status-message status-success';
    statusElement.innerHTML = '✅ Аккаунт успешно создан! Сохраните данные ниже.';
    
    document.getElementById('credentialsModal').style.display = 'block';
}

function closeCredentialsModal() {
    document.getElementById('credentialsModal').style.display = 'none';
    enableBodyScroll();
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    enableBodyScroll();
}

// Вспомогательные функции
function showError(element, message) {
    element.className = 'status-message status-error';
    element.innerHTML = message;
}

function showSuccess(element, message) {
    element.className = 'status-message status-success';
    element.innerHTML = message;
}

function showLoading(element, message) {
    element.className = 'status-message status-loading';
    element.innerHTML = message;
}

// Обработка формы регистрации
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const statusElement = document.getElementById('registerStatus');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Валидация
    if (!firstName || !lastName || !email) {
        showError(statusElement, '❌ Заполните все поля');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError(statusElement, '❌ Введите корректный email');
        return;
    }
    
    // Показываем загрузку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Создаем аккаунт...';
    showLoading(statusElement, '⏳ Создаем ваш аккаунт...');
    
    try {
        // Генерируем логин и пароль
        const login = generateLogin(firstName, lastName);
        const password = generatePassword();
        
        // Создаем объект пользователя
        const userData = {
            firstName,
            lastName,
            email,
            login,
            password,
            registeredAt: new Date().toISOString(),
            courses: ['fullstack', 'mobile'], // Добавляем тестовые курсы
            emailSent: false
        };
        
        // Сохраняем пользователя
        const users = getUsers();
        
        // Проверяем, нет ли уже пользователя с таким email
        if (users.find(u => u.email === email)) {
            showError(statusElement, '❌ Пользователь с таким email уже существует');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Создать аккаунт';
            return;
        }
        
        users.push(userData);
        saveUsers(users);
        
        // "Отправляем" email
        const emailResult = await sendCredentialsEmail(userData);
        
        showSuccess(statusElement, '✅ Аккаунт создан! Открываем данные для входа...');
        
        // Показываем модальное окно с данными
        setTimeout(() => {
            closeRegisterModal();
            showCredentialsModal(login, password, email, emailResult);
        }, 1500);
        
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        showError(statusElement, '❌ Ошибка при создании аккаунта');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Создать аккаунт';
    }
});

// Обработка формы входа
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const statusElement = document.getElementById('loginStatus');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Показываем загрузку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Вход...';
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        showSuccess(statusElement, '✅ Вход выполнен! Перенаправляем...');
        
        // Сохраняем текущего пользователя
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Перенаправление в личный кабинет
        setTimeout(() => {
            closeLoginModal();
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showError(statusElement, '❌ Неверный email или пароль');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Войти';
    }
});

// Обработчики закрытия модальных окон
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeAllModals();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAllModals();
    }
});

document.querySelectorAll('.modal-content').forEach(modalContent => {
    modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

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

// Эффект при скролле для хедера
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 LearnPro инициализирован');
    
    // Обработчики для кнопок выбора курса
    document.querySelectorAll('.course-btn').forEach(button => {
        button.addEventListener('click', function() {
            showRegisterModal();
        });
    });
    
    // Обработчик для CTA кнопки
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            showRegisterModal();
        });
    }
});
