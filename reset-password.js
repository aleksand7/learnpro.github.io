// ==================== ВОССТАНОВЛЕНИЕ ПАРОЛЯ ====================

console.log('🚀 Страница восстановления пароля загружена');

// Генерируем случайный токен
function generateResetToken() {
    return 'reset_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
}

// Сохраняем токен в localStorage
function saveResetToken(email, token) {
    const resetRequests = JSON.parse(localStorage.getItem('learnpro_reset_requests') || '{}');
    resetRequests[token] = {
        email: email,
        created: Date.now(),
        expires: Date.now() + 3600000, // 1 час
        used: false
    };
    localStorage.setItem('learnpro_reset_requests', JSON.stringify(resetRequests));
    return resetRequests[token];
}

// Проверяем токен
function validateResetToken(token) {
    if (!token) return { valid: false, reason: 'Токен отсутствует' };
    
    const resetRequests = JSON.parse(localStorage.getItem('learnpro_reset_requests') || '{}');
    const request = resetRequests[token];
    
    if (!request) {
        return { valid: false, reason: 'Ссылка устарела или недействительна' };
    }
    
    if (request.used) {
        return { valid: false, reason: 'Эта ссылка уже была использована' };
    }
    
    if (Date.now() > request.expires) {
        delete resetRequests[token];
        localStorage.setItem('learnpro_reset_requests', JSON.stringify(resetRequests));
        return { valid: false, reason: 'Срок действия ссылки истек' };
    }
    
    return { 
        valid: true, 
        email: request.email,
        request: request
    };
}

// Помечаем токен как использованный
function markTokenAsUsed(token) {
    const resetRequests = JSON.parse(localStorage.getItem('learnpro_reset_requests') || '{}');
    if (resetRequests[token]) {
        resetRequests[token].used = true;
        localStorage.setItem('learnpro_reset_requests', JSON.stringify(resetRequests));
    }
}

// Проверяем наличие токена в URL
function checkResetToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const statusElement = document.getElementById('resetStatus');
    
    if (token) {
        const validation = validateResetToken(token);
        
        if (validation.valid) {
            document.getElementById('requestResetSection').style.display = 'none';
            document.getElementById('setNewPasswordSection').style.display = 'block';
            document.getElementById('resetToken').value = token;
            
            // Показываем email
            const emailDisplay = document.createElement('div');
            emailDisplay.id = 'emailDisplay';
            emailDisplay.style.cssText = `
                background: #f0f9ff;
                padding: 1rem;
                border-radius: 12px;
                margin-bottom: 1.5rem;
                text-align: center;
                border-left: 4px solid #8b5cf6;
                font-weight: 500;
            `;
            emailDisplay.innerHTML = `📧 Сброс пароля для: <strong>${validation.email}</strong>`;
            
            const form = document.getElementById('resetPasswordForm');
            const oldDisplay = document.getElementById('emailDisplay');
            if (oldDisplay) oldDisplay.remove();
            form.parentNode.insertBefore(emailDisplay, form);
            
            if (statusElement) statusElement.innerHTML = '';
        } else {
            showStatus(statusElement, 'error', validation.reason);
            document.getElementById('setNewPasswordSection').style.display = 'none';
            document.getElementById('requestResetSection').style.display = 'block';
        }
    }
}

// Показать ссылку для сброса прямо на странице
function showResetLink(email, resetLink) {
    const statusElement = document.getElementById('resetStatus');
    
    // Очищаем статус
    statusElement.innerHTML = '';
    statusElement.className = '';
    
    // Создаем контейнер для ссылки
    const linkContainer = document.createElement('div');
    linkContainer.style.cssText = `
        background: linear-gradient(135deg, #f0f9ff, #ffffff);
        border: 2px solid #8b5cf6;
        border-radius: 24px;
        padding: 2rem;
        margin: 1.5rem 0;
        text-align: center;
        box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.2);
    `;
    
    linkContainer.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔗</div>
        <h3 style="color: #0f172a; font-size: 1.5rem; margin-bottom: 0.5rem;">Ссылка для сброса пароля</h3>
        <p style="color: #64748b; margin-bottom: 1.5rem;">Скопируйте ссылку и откройте в браузере:</p>
        <div style="
            background: #1e293b;
            color: #e2e8f0;
            padding: 1.2rem;
            border-radius: 16px;
            word-break: break-all;
            font-family: monospace;
            font-size: 0.9rem;
            border: 1px solid #334155;
            margin-bottom: 1.5rem;
            text-align: left;
        ">${resetLink}</div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="copyToClipboard('${resetLink}')" style="
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 12px;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                flex: 1;
                max-width: 200px;
                transition: all 0.3s;
            " onmouseover="this.style.transform='translateY(-2px)'" 
               onmouseout="this.style.transform='translateY(0)'">
                📋 Копировать
            </button>
            <button onclick="window.open('${resetLink}', '_blank')" style="
                background: white;
                color: #8b5cf6;
                border: 2px solid #8b5cf6;
                padding: 1rem 2rem;
                border-radius: 12px;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                flex: 1;
                max-width: 200px;
                transition: all 0.3s;
            " onmouseover="this.style.background='#8b5cf6'; this.style.color='white'" 
               onmouseout="this.style.background='white'; this.style.color='#8b5cf6'">
                🔗 Открыть
            </button>
        </div>
        <p style="color: #94a3b8; font-size: 0.9rem; margin-top: 1.5rem;">
            ⏰ Ссылка действительна 1 час
        </p>
    `;
    
    statusElement.appendChild(linkContainer);
}

// Копирование в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ Ссылка скопирована в буфер обмена!');
    }).catch(() => {
        // Fallback для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('✅ Ссылка скопирована!');
    });
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Запрос на сброс пароля
document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value.trim();
    const statusElement = document.getElementById('resetStatus');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    if (!email) {
        showStatus(statusElement, 'error', 'Введите email');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showStatus(statusElement, 'error', 'Введите корректный email');
        return;
    }
    
    // Показываем загрузку
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Проверяем...';
    showStatus(statusElement, 'loading', 'Проверяем данные...');
    
    setTimeout(() => {
        try {
            const users = JSON.parse(localStorage.getItem('learnpro_users') || '[]');
            const user = users.find(u => u.email === email);
            
            if (user) {
                // Генерируем токен
                const token = generateResetToken();
                saveResetToken(email, token);
                
                // Создаем ссылку
                const baseUrl = window.location.origin + window.location.pathname;
                const resetLink = `${baseUrl}?token=${token}`;
                
                // Показываем ссылку прямо на странице
                showResetLink(email, resetLink);
                
                // Очищаем поле и прячем кнопку
                document.getElementById('resetEmail').value = '';
                submitBtn.style.display = 'none';
                
                // Показываем кнопку "Запросить снова"
                const tryAgainBtn = document.createElement('button');
                tryAgainBtn.innerHTML = '🔄 Запросить снова';
                tryAgainBtn.style.cssText = `
                    background: #f1f5f9;
                    color: #0f172a;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 1rem;
                    width: 100%;
                `;
                tryAgainBtn.onclick = function() {
                    location.reload();
                };
                statusElement.appendChild(tryAgainBtn);
                
            } else {
                showStatus(statusElement, 'error', 'Пользователь с таким email не найден');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Отправить инструкции';
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            showStatus(statusElement, 'error', 'Произошла ошибка');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Отправить инструкции';
        }
    }, 1500);
});

// Установка нового пароля
document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const token = document.getElementById('resetToken').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const statusElement = document.getElementById('newPasswordStatus');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    if (!newPassword || !confirmPassword) {
        showStatus(statusElement, 'error', 'Заполните все поля');
        return;
    }
    
    if (newPassword.length < 6) {
        showStatus(statusElement, 'error', 'Пароль должен быть не менее 6 символов');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showStatus(statusElement, 'error', 'Пароли не совпадают');
        return;
    }
    
    const validation = validateResetToken(token);
    
    if (!validation.valid) {
        showStatus(statusElement, 'error', validation.reason);
        setTimeout(() => {
            document.getElementById('setNewPasswordSection').style.display = 'none';
            document.getElementById('requestResetSection').style.display = 'block';
        }, 2000);
        return;
    }
    
    // Показываем загрузку
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Обновляем...';
    showStatus(statusElement, 'loading', 'Обновляем пароль...');
    
    setTimeout(() => {
        try {
            const users = JSON.parse(localStorage.getItem('learnpro_users') || '[]');
            const userIndex = users.findIndex(u => u.email === validation.email);
            
            if (userIndex === -1) {
                showStatus(statusElement, 'error', 'Пользователь не найден');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Установить новый пароль';
                return;
            }
            
            // Обновляем пароль
            users[userIndex].password = newPassword;
            localStorage.setItem('learnpro_users', JSON.stringify(users));
            
            // Помечаем токен как использованный
            markTokenAsUsed(token);
            
            // Показываем успех
            showStatus(statusElement, 'success', '✅ Пароль успешно изменен!');
            
            // Очищаем поля
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
            
            // Перенаправляем на главную
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        } catch (error) {
            console.error('Ошибка:', error);
            showStatus(statusElement, 'error', '❌ Ошибка при обновлении пароля');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Установить новый пароль';
        }
    }, 1500);
});

// Вспомогательная функция для показа статуса
function showStatus(element, type, message) {
    element.className = 'status-message';
    element.innerHTML = message;
    
    if (type === 'success') {
        element.classList.add('status-success');
    } else if (type === 'error') {
        element.classList.add('status-error');
    } else if (type === 'loading') {
        element.classList.add('status-loading');
    }
}

// Очистка старых токенов
function cleanupOldTokens() {
    const resetRequests = JSON.parse(localStorage.getItem('learnpro_reset_requests') || '{}');
    let changed = false;
    const now = Date.now();
    
    Object.keys(resetRequests).forEach(token => {
        if (now > resetRequests[token].expires) {
            delete resetRequests[token];
            changed = true;
        }
    });
    
    if (changed) {
        localStorage.setItem('learnpro_reset_requests', JSON.stringify(resetRequests));
        console.log('🧹 Очищены старые токены');
    }
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    cleanupOldTokens();
    checkResetToken();
});

// Функция для возврата к форме запроса
window.showRequestForm = function() {
    document.getElementById('setNewPasswordSection').style.display = 'none';
    document.getElementById('requestResetSection').style.display = 'block';
    document.getElementById('resetStatus').innerHTML = '';
    document.getElementById('newPasswordStatus').innerHTML = '';
    
    // Показываем кнопку отправки
    const submitBtn = document.querySelector('#forgotPasswordForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.style.display = 'block';
    }
};
