// ==================== SUPABASE КОНФИГУРАЦИЯ ====================
const SUPABASE_URL = 'https://qlpgkuuoirkkklzdkflx.supabase.co'; // ЗАМЕНИТЕ НА ВАШ URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFscGdrdXVvaXJra2tsemRrZmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3Mzk1MTQsImV4cCI6MjA3NzMxNTUxNH0.huOLRPI9HdYLmayuvkDqOmRLFtBhvOdGr6oSPobq7Yc'; // ЗАМЕНИТЕ НА ВАШ КЛЮЧ

// Инициализация Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Подключаем Supabase JS клиент
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

document.head.appendChild(script);
// ==================== ОСНОВНЫЕ ФУНКЦИИ ====================

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

// ==================== ФУНКЦИЯ ОТПРАВКИ EMAIL ====================

// Google Apps Script функция отправки
async function sendCredentialsEmail(userData) {
    const statusElement = document.getElementById('registerStatus');
    
    // Сохраняем пользователя в любом случае
    const users = getUsers();
    users.push(userData);
    saveUsers(users);
    
    try {
        // URL вашего Google Apps Script (ЗАМЕНИТЕ НА ВАШ!)
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxM824sxbXabVbUuzjNZ0syLMNO22ZDQcQ6sKpnDhnhlxo8QQb2KahyPUYwpv1lXCab/exec'; // Ваш URL здесь!
        
        console.log('📧 Отправка данных на GAS...', userData);
        
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Важно для Google Apps Script!
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: userData.email,
                userName: `${userData.firstName} ${userData.lastName}`,
                userLogin: userData.login,
                userPassword: userData.password
            })
        });

        // С no-cors мы не можем прочитать ответ, но запрос отправляется
        showSuccess(statusElement, '✅ Аккаунт создан! Данные отправлены на вашу почту.');
        console.log('✅ Запрос отправлен для:', userData.email);
        
    } catch (error) {
        console.log('🌐 Ошибка подключения:', error);
        showSuccess(statusElement, '✅ Аккаунт создан! Сохраните данные ниже.');
    }
    
    setTimeout(() => {
        closeRegisterModal();
        showCredentialsModal(userData.login, userData.password, userData.email);
    }, 1500);
    
    return { success: true };
}
// ==================== УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ ====================

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

function showCredentialsModal(login, password, email) {
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

// ==================== ОБРАБОТЧИКИ ФОРМ ====================

// Обработка формы регистрации
// ОБНОВЛЕННАЯ ФУНКЦИЯ РЕГИСТРАЦИИ С БАЗОЙ ДАННЫХ
async function sendCredentialsEmail(userData) {
    const statusElement = document.getElementById('registerStatus');
    
    try {
        showLoading(statusElement, '📧 Проверяем данные...');

        // Проверяем нет ли пользователя в БД
        const checkResult = await checkUserExists(userData.email);
        if (checkResult.exists) {
            showError(statusElement, '❌ Пользователь с таким email уже существует');
            return { success: false };
        }

        // Регистрируем в БД
        const dbResult = await registerUserInDB(userData);
        if (!dbResult.success) {
            showError(statusElement, '❌ Ошибка при создании аккаунта');
            return { success: false };
        }

        // Сохраняем также в localStorage для совместимости
        const users = getUsers();
        users.push(userData);
        saveUsers(users);

        // Отправляем email (ваш существующий код)
        await sendEmailViaGoogleAppsScript(userData);

        showSuccess(statusElement, '✅ Аккаунт создан! Данные отправлены на вашу почту.');
        
        setTimeout(() => {
            closeRegisterModal();
            showCredentialsModal(userData.login, userData.password, userData.email);
        }, 1500);
        
        return { success: true };
        
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        showError(statusElement, '❌ Ошибка при создании аккаунта');
        return { success: false };
    }
}

// Обработка формы входа
// ОБНОВЛЕННАЯ ФУНКЦИЯ ВХОДА С БАЗОЙ ДАННЫХ
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const statusElement = document.getElementById('loginStatus');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Показываем загрузку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Вход...';
    showLoading(statusElement, '⏳ Проверяем данные...');
    
    try {
        // Ищем пользователя в БД
        const result = await findUserInDB(email, password);
        
        if (result.success) {
            showSuccess(statusElement, '✅ Вход выполнен! Перенаправляем...');
            
            // Сохраняем в sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            
            // Перенаправление
            setTimeout(() => {
                closeLoginModal();
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showError(statusElement, '❌ Неверный email или пароль');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти';
        }
        
    } catch (error) {
        showError(statusElement, '❌ Ошибка входа');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Войти';
    }
});

// ==================== ОБРАБОТЧИКИ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН ====================

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

// ==================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ====================

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

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

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
    
    // Проверка авторизации на защищенных страницах
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('courses.html')) {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        if (!user.email) {
            window.location.href = 'index.html';
        }
    }
});

// Функция выхода из системы
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}


















