// ==================== АУТЕНТИФИКАЦИЯ ====================

// Проверка авторизации
function checkAuth() {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    
    if (!user.email) {
        window.location.href = 'index.html';
        return null;
    }
    
    return user;
}

// Функции для работы с пользователями
function getUsers() {
    return JSON.parse(localStorage.getItem('learnpro_users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('learnpro_users', JSON.stringify(users));
}

// Обновление пользователя в хранилище
function updateUserInStorage(updatedUser) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === updatedUser.email);
    
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        saveUsers(users);
    }
}

// ==================== ОСНОВНЫЕ ФУНКЦИИ ====================

// Загрузка данных пользователя
function loadUserData() {
    const user = checkAuth();
    if (!user) return;

    // Обновляем интерфейс
    document.getElementById('userAvatar').textContent = 
        user.firstName.charAt(0) + user.lastName.charAt(0);
    document.getElementById('welcomeTitle').textContent = 
        `Добро пожаловать, ${user.firstName}!`;
    document.getElementById('userEmail').textContent = user.email;
    
    document.getElementById('profileName').textContent = 
        `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileLogin').textContent = user.login;
    document.getElementById('profileDate').textContent = 
        new Date(user.registeredAt).toLocaleDateString('ru-RU');

    // Загружаем курсы
    loadUserCourses(user);
}

// Загрузка курсов пользователя
function loadUserCourses(user) {
    const container = document.getElementById('userCoursesContainer');
    
    if (!user.courses || user.courses.length === 0) {
        container.innerHTML = `
            <div class="empty-courses-state">
                <div class="empty-icon">📚</div>
                <h3>У вас пока нет курсов</h3>
                <p>Выберите курсы из каталога чтобы начать обучение</p>
                <a href="courses.html" class="browse-courses-btn">Перейти к каталогу</a>
            </div>
        `;
        return;
    }

    // Получаем данные о курсах
    const userCourseData = getUserCourseData(user.courses);
    
    container.innerHTML = `
        <div class="user-courses-grid">
            ${userCourseData.map(course => createCourseCard(course)).join('')}
        </div>
    `;
}

// Получаем данные о курсах пользователя
function getUserCourseData(courseIds) {
    const coursesData = {
        'fullstack': {
            id: 'fullstack',
            title: 'Fullstack-разработка',
            icon: '💻',
            description: 'JavaScript, React, Node.js, MongoDB',
            progress: 30,
            lessonsTotal: 120,
            lessonsCompleted: 36,
            nextLesson: 'React Components',
            lastActivity: '2 часа назад'
        },
        'mobile': {
            id: 'mobile',
            title: 'Мобильная разработка',
            icon: '📱',
            description: 'React Native, iOS & Android',
            progress: 15,
            lessonsTotal: 100,
            lessonsCompleted: 15,
            nextLesson: 'Настройка окружения',
            lastActivity: 'вчера'
        },
        'design': {
            id: 'design',
            title: 'UI/UX Дизайн',
            icon: '🎨',
            description: 'Figma, Adobe XD, Прототипирование',
            progress: 0,
            lessonsTotal: 80,
            lessonsCompleted: 0,
            nextLesson: 'Введение в дизайн',
            lastActivity: 'еще не начат'
        },
        'python': {
            id: 'python',
            title: 'Python & Data Science',
            icon: '🐍',
            description: 'Анализ данных и машинное обучение',
            progress: 0,
            lessonsTotal: 140,
            lessonsCompleted: 0,
            nextLesson: 'Основы Python',
            lastActivity: 'еще не начат'
        },
        'java': {
            id: 'java',
            title: 'Java разработка',
            icon: '☕',
            description: 'Enterprise разработка на Java',
            progress: 0,
            lessonsTotal: 110,
            lessonsCompleted: 0,
            nextLesson: 'Java Core',
            lastActivity: 'еще не начат'
        }
    };

    return courseIds.map(courseId => coursesData[courseId] || {
        id: courseId,
        title: courseId,
        icon: '📚',
        description: 'Курс в разработке',
        progress: 0,
        lessonsTotal: 0,
        lessonsCompleted: 0,
        nextLesson: 'Скоро',
        lastActivity: 'ожидается'
    });
}

// Создание карточки курса
function createCourseCard(course) {
    const progressWidth = course.progress > 0 ? course.progress : 0;
    
    return `
        <div class="user-course-card" data-course-id="${course.id}">
            <div class="course-card-header">
                <div class="course-icon">${course.icon}</div>
                <div class="course-status ${course.progress > 0 ? 'active' : 'not-started'}">
                    ${course.progress > 0 ? 'В процессе' : 'Не начат'}
                </div>
            </div>
            
            <div class="course-card-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                
                <div class="course-progress">
                    <div class="progress-info">
                        <span>Прогресс:</span>
                        <span class="progress-percent">${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressWidth}%"></div>
                    </div>
                    <div class="progress-stats">
                        <span>${course.lessonsCompleted}/${course.lessonsTotal} уроков</span>
                    </div>
                </div>
                
                <div class="course-next-lesson">
                    <strong>Следующий урок:</strong> ${course.nextLesson}
                </div>
                
                <div class="course-last-activity">
                    Последняя активность: ${course.lastActivity}
                </div>
            </div>
            
            <div class="course-card-actions">
                ${course.progress > 0 ? `
                    <button class="continue-btn" onclick="continueCourse('${course.id}')">
                        🎯 Продолжить
                    </button>
                ` : `
                    <button class="start-btn" onclick="startCourse('${course.id}')">
                        🚀 Начать обучение
                    </button>
                `}
                <button class="course-details-btn" onclick="showCourseDetails('${course.id}')">
                    ℹ️ Подробнее
                </button>
            </div>
        </div>
    `;
}

// ГЛОБАЛЬНАЯ функция для продолжения курса
window.continueCourse = function(courseId) {
    // Перенаправляем на страницу курса с ID
    window.location.href = `course-view.html?id=${courseId}`;
}

// ГЛОБАЛЬНАЯ функция для начала курса
window.startCourse = function(courseId) {
    // Тоже перенаправляем на страницу курса
    window.location.href = `course-view.html?id=${courseId}`;
}

function startCourse(courseId) {
    alert(`Начинаем курс "${courseId}"! 🚀`);
}

function showCourseDetails(courseId) {
    alert(`Подробности курса "${courseId}" ℹ️`);
}

// ==================== УДАЛЕНИЕ АККАУНТА ====================

function showDeleteAccountModal() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('confirmEmail').value = '';
    document.getElementById('confirmDeleteBtn').disabled = true;
    document.getElementById('deleteStatus').innerHTML = '';
    
    document.getElementById('confirmEmail').addEventListener('input', validateDeleteEmail);
    document.getElementById('deleteAccountModal').style.display = 'block';
    disableBodyScroll();
}

function closeDeleteAccountModal() {
    document.getElementById('deleteAccountModal').style.display = 'none';
    enableBodyScroll();
}

function validateDeleteEmail() {
    const user = checkAuth();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    const input = document.getElementById('confirmEmail');
    
    if (confirmEmail === user.email) {
        confirmBtn.disabled = false;
        input.classList.remove('error');
    } else {
        confirmBtn.disabled = true;
        if (confirmEmail && confirmEmail !== user.email) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }
}

function deleteAccount() {
    const user = checkAuth();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();
    const statusElement = document.getElementById('deleteStatus');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    if (confirmEmail !== user.email) {
        showDeleteError(statusElement, 'Email не совпадает');
        document.getElementById('confirmEmail').classList.add('shake');
        setTimeout(() => {
            document.getElementById('confirmEmail').classList.remove('shake');
        }, 500);
        return;
    }

    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '⏳ Удаляем...';
    
    setTimeout(() => {
        try {
            const users = getUsers();
            const userIndex = users.findIndex(u => u.email === user.email);
            
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                saveUsers(users);
                sessionStorage.removeItem('currentUser');
                
                showDeleteSuccess(statusElement, '✅ Аккаунт успешно удален');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                throw new Error('Пользователь не найден');
            }
            
        } catch (error) {
            console.error('Ошибка удаления аккаунта:', error);
            showDeleteError(statusElement, '❌ Ошибка при удалении аккаунта');
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = 'Удалить аккаунт';
        }
    }, 1500);
}

// Вспомогательные функции
function showDeleteError(element, message) {
    element.className = 'status-message status-error';
    element.innerHTML = message;
}

function showDeleteSuccess(element, message) {
    element.className = 'status-message status-success';
    element.innerHTML = message;
}

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

// Выход из системы
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    
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
});
// ==================== ФУНКЦИЯ ДЛЯ ПОДРОБНОЙ ИНФОРМАЦИИ О КУРСЕ ====================
window.showCourseDetails = function(courseId) {
    // Получаем данные о курсе
    const course = getUserCourseData([courseId])[0];
    
    // Данные для разных курсов (можно расширить)
    const courseDetails = {
        'fullstack': {
            fullDescription: 'Полный курс по веб-разработке. Вы научитесь создавать современные веб-приложения с нуля, используя JavaScript, React, Node.js и MongoDB.',
            skills: [
                'JavaScript (ES6+)',
                'React и Redux',
                'Node.js и Express',
                'MongoDB и PostgreSQL',
                'Docker и DevOps',
                'Git и GitHub'
            ],
            duration: '6 месяцев',
            lessons: 120,
            projects: 6,
            price: '25 000₽',
            teacher: 'Алексей Иванов (Yandex)'
        },
        'mobile': {
            fullDescription: 'Научитесь создавать мобильные приложения для iOS и Android с помощью React Native. Курс включает публикацию приложений в AppStore и Google Play.',
            skills: [
                'React Native',
                'Нативные модули',
                'Работа с API',
                'Публикация в сторах',
                'UI/UX для мобильных',
                'Firebase'
            ],
            duration: '5 месяцев',
            lessons: 100,
            projects: 4,
            price: '22 000₽',
            teacher: 'Мария Петрова (Tinkoff)'
        },
        'design': {
            fullDescription: 'Освойте профессию дизайнера интерфейсов. Научитесь создавать удобные и красивые дизайны для веба и мобильных приложений.',
            skills: [
                'Figma',
                'Adobe XD',
                'Прототипирование',
                'Дизайн-системы',
                'User Research',
                'Анимация'
            ],
            duration: '4 месяца',
            lessons: 80,
            projects: 5,
            price: '18 000₽',
            teacher: 'Екатерина Смирнова (Wildberries)'
        },
        'python': {
            fullDescription: 'Станьте Data Scientist с нуля. Изучите Python, библиотеки для анализа данных и машинное обучение.',
            skills: [
                'Python',
                'Pandas и NumPy',
                'Машинное обучение',
                'TensorFlow',
                'Визуализация данных',
                'SQL'
            ],
            duration: '7 месяцев',
            lessons: 140,
            projects: 3,
            price: '30 000₽',
            teacher: 'Дмитрий Соколов (СберТех)'
        },
        'java': {
            fullDescription: 'Освойте Java для создания корпоративных приложений. Spring Framework, Hibernate, микросервисы.',
            skills: [
                'Java Core',
                'Spring Framework',
                'Hibernate',
                'Микросервисы',
                'Базы данных',
                'Тестирование'
            ],
            duration: '6 месяцев',
            lessons: 110,
            projects: 4,
            price: '28 000₽',
            teacher: 'Сергей Волков (Тинькофф)'
        }
    };
    
    const details = courseDetails[courseId] || {
        fullDescription: course.description,
        skills: ['JavaScript', 'React', 'Node.js'],
        duration: '6 месяцев',
        lessons: 120,
        projects: 4,
        price: '25 000₽',
        teacher: 'Алексей Иванов'
    };
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 32px;
            width: 90%;
            max-width: 600px;
            max-height: 85vh;
            overflow-y: auto;
            position: relative;
            box-shadow: var(--shadow-xl);
            animation: modalSlideIn 0.4s ease;
        ">
            <!-- Хедер с градиентом -->
            <div style="
                background: var(--gradient);
                padding: 2rem;
                border-radius: 32px 32px 0 0;
                color: white;
                position: sticky;
                top: 0;
                z-index: 10;
            ">
                <div style="display: flex; align-items: center; gap: 1.5rem;">
                    <div style="font-size: 3.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
                        ${course.icon}
                    </div>
                    <div>
                        <h2 style="font-size: 1.8rem; margin-bottom: 0.3rem;">${course.title}</h2>
                        <p style="opacity: 0.9;">${details.duration} • ${details.lessons} уроков</p>
                    </div>
                </div>
                <button onclick="this.closest('div[style*=\\'fixed\\']').remove()" style="
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
            </div>
            
            <div style="padding: 2rem;">
                <!-- Прогресс (если курс начат) -->
                ${course.progress > 0 ? `
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; border-left: 4px solid #0ea5e9;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem;">
                            <span style="font-weight: 600;">Ваш прогресс:</span>
                            <span style="color: #0ea5e9; font-weight: 700;">${course.progress}%</span>
                        </div>
                        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${course.progress}%; height: 100%; background: var(--gradient); border-radius: 4px;"></div>
                        </div>
                        <div style="margin-top: 0.8rem; color: #64748b;">
                            Пройдено ${course.lessonsCompleted} из ${course.lessonsTotal} уроков
                        </div>
                    </div>
                ` : ''}
                
                <!-- Описание курса -->
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>📖</span> О курсе
                    </h3>
                    <p style="color: var(--gray); line-height: 1.7;">${details.fullDescription}</p>
                </div>
                
                <!-- Чему научитесь -->
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>🎯</span> Чему вы научитесь
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                        ${details.skills.map(skill => `
                            <div style="display: flex; align-items: center; gap: 0.5rem; background: #f8fafc; padding: 0.8rem 1rem; border-radius: 12px;">
                                <span style="color: var(--success);">✓</span>
                                <span>${skill}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Детали курса -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">⏱️</div>
                        <div style="font-weight: 600;">${details.duration}</div>
                        <div style="font-size: 0.8rem; color: var(--gray);">Длительность</div>
                    </div>
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">📚</div>
                        <div style="font-weight: 600;">${details.lessons} уроков</div>
                        <div style="font-size: 0.8rem; color: var(--gray);">Всего</div>
                    </div>
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">🎯</div>
                        <div style="font-weight: 600;">${details.projects} проектов</div>
                        <div style="font-size: 0.8rem; color: var(--gray);">В портфолио</div>
                    </div>
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">💰</div>
                        <div style="font-weight: 600; color: var(--primary);">${details.price}</div>
                        <div style="font-size: 0.8rem; color: var(--gray);">Стоимость</div>
                    </div>
                </div>
                
                <!-- Преподаватель -->
                <div style="background: linear-gradient(135deg, #f0f9ff, #ffffff); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>👨‍🏫</span> Преподаватель
                    </h3>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 50px; height: 50px; background: var(--gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">
                            ${details.teacher.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <div style="font-weight: 700;">${details.teacher}</div>
                            <div style="font-size: 0.9rem; color: var(--gray);">Ведущий разработчик</div>
                        </div>
                    </div>
                </div>
                
                <!-- Кнопки действий -->
                <div style="display: flex; gap: 1rem;">
                    ${course.progress > 0 ? `
                        <button onclick="window.continueCourse('${courseId}')" style="
                            flex: 1;
                            background: var(--gradient);
                            color: white;
                            border: none;
                            padding: 1.2rem;
                            border-radius: 16px;
                            font-weight: 700;
                            font-size: 1rem;
                            cursor: pointer;
                            transition: all 0.3s;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-lg)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            🎯 Продолжить обучение
                        </button>
                    ` : `
                        <button onclick="window.startCourse('${courseId}')" style="
                            flex: 1;
                            background: var(--gradient);
                            color: white;
                            border: none;
                            padding: 1.2rem;
                            border-radius: 16px;
                            font-weight: 700;
                            font-size: 1rem;
                            cursor: pointer;
                            transition: all 0.3s;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-lg)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            🚀 Начать обучение
                        </button>
                    `}
                    <button onclick="this.closest('div[style*=\\'fixed\\']').remove()" style="
                        padding: 0 2rem;
                        background: #f1f5f9;
                        color: var(--dark);
                        border: none;
                        border-radius: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">
                        ✕ Закрыть
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}
