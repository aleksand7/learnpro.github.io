// admin-auth.js - Аутентификация для админ-панели

// Ваши учётные данные (в реальном проекте храните на сервере!)
const ADMIN_CREDENTIALS = {
    email: 'aleksandrsukhankin10@gmail.com',
    password: 'Admin2024!',
    name: 'Администратор'
};

// Проверка авторизации админа
function isAdminAuthenticated() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Вход в админ-панель
function adminLogin(email, password) {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminName', ADMIN_CREDENTIALS.name);
        sessionStorage.setItem('adminEmail', ADMIN_CREDENTIALS.email);
        sessionStorage.setItem('adminLoginTime', new Date().toISOString());
        return true;
    }
    return false;
}

// Выход из админ-панели
function adminLogout() {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminName');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminLoginTime');
    window.location.href = 'admin-login.html';
}

// Проверка сессии при загрузке админ-панели
function checkAdminAuth() {
    if (!isAdminAuthenticated()) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    // Дополнительная проверка времени сессии (8 часов)
    const loginTime = sessionStorage.getItem('adminLoginTime');
    if (loginTime) {
        const hoursPassed = (new Date() - new Date(loginTime)) / (1000 * 60 * 60);
        if (hoursPassed > 8) {
            sessionStorage.removeItem('adminAuthenticated');
            sessionStorage.removeItem('adminLoginTime');
            alert('⏰ Сессия истекла. Войдите снова.');
            window.location.href = 'admin-login.html';
            return false;
        }
    }
    
    return true;
}

// Защита от CSRF (добавляем токен)
function getCsrfToken() {
    let token = sessionStorage.getItem('csrfToken');
    if (!token) {
        token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        sessionStorage.setItem('csrfToken', token);
    }
    return token;
}

// Блокировка правой кнопки мыши в админке (дополнительная защита)
function disableRightClick() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}

// Скрытие консоли отладки
function protectConsole() {
    if (window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')) {
        setInterval(() => {
            console.clear();
        }, 1000);
        
        // Предотвращение открытия DevTools
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
                return false;
            }
        });
    }
}

// Экспорт функций
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.checkAdminAuth = checkAdminAuth;
window.isAdminAuthenticated = isAdminAuthenticated;
window.getCsrfToken = getCsrfToken;
