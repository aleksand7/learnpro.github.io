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

// Получение текущего пользователя
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
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

// ==================== ФУНКЦИИ ДЛЯ РАБОТЫ С ПРОГРЕССОМ ====================

// Получение ключа для хранения прогресса с привязкой к пользователю
function getProgressKey(courseId) {
    const user = getCurrentUser();
    return `course_progress_${user.email}_${courseId}`;
}

// Загрузка прогресса для конкретного курса
function loadCourseProgress(courseId) {
    const user = getCurrentUser();
    if (!user.email) return null;
    
    const key = getProgressKey(courseId);
    return JSON.parse(localStorage.getItem(key) || '{}');
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

    // Получаем данные о курсах с реальным прогрессом из localStorage
    const userCourseData = getUserCourseData(user.courses);
    
    container.innerHTML = `
        <div class="user-courses-grid">
            ${userCourseData.map(course => createCourseCard(course)).join('')}
        </div>
    `;
}

// Получаем данные о курсах пользователя с учетом реального прогресса
function getUserCourseData(courseIds) {
    const user = getCurrentUser();
    
    // Базовая информация о курсах (всего 10 уроков в каждом)
    const coursesData = {
        'fullstack': {
            id: 'fullstack',
            title: 'Fullstack-разработка',
            icon: '💻',
            description: 'JavaScript, React, Node.js, MongoDB',
            lessonsTotal: 10,
            level: 'С нуля до PRO',
            teacher: 'Алексей Иванов',
            fullDescription: 'Полный курс по веб-разработке. Вы научитесь создавать современные веб-приложения с нуля.',
            skills: [
                'JavaScript (ES6+)',
                'React и Redux',
                'Node.js и Express',
                'MongoDB и PostgreSQL',
                'Docker и DevOps',
                'Git и GitHub'
            ],
            duration: '6 месяцев',
            projects: 6,
            price: '25 000₽'
        },
        'mobile': {
            id: 'mobile',
            title: 'Мобильная разработка',
            icon: '📱',
            description: 'React Native, iOS & Android',
            lessonsTotal: 10,
            level: 'Для начинающих',
            teacher: 'Мария Петрова',
            fullDescription: 'Научитесь создавать мобильные приложения для iOS и Android с помощью React Native.',
            skills: [
                'React Native',
                'Нативные модули',
                'Работа с API',
                'Публикация в сторах',
                'UI/UX для мобильных',
                'Firebase'
            ],
            duration: '5 месяцев',
            projects: 4,
            price: '22 000₽'
        },
        'design': {
            id: 'design',
            title: 'UI/UX Дизайн',
            icon: '🎨',
            description: 'Figma, Adobe XD, Прототипирование',
            lessonsTotal: 10,
            level: 'С нуля',
            teacher: 'Екатерина Смирнова',
            fullDescription: 'Освойте профессию дизайнера интерфейсов. Научитесь создавать удобные и красивые дизайны.',
            skills: [
                'Figma',
                'Adobe XD',
                'Прототипирование',
                'Дизайн-системы',
                'User Research',
                'Анимация'
            ],
            duration: '4 месяца',
            projects: 5,
            price: '18 000₽'
        },
        'python': {
            id: 'python',
            title: 'Python & Data Science',
            icon: '🐍',
            description: 'Анализ данных и машинное обучение',
            lessonsTotal: 10,
            level: 'Продвинутый',
            teacher: 'Дмитрий Соколов',
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
            projects: 3,
            price: '30 000₽'
        },
        'java': {
            id: 'java',
            title: 'Java разработка',
            icon: '☕',
            description: 'Enterprise разработка на Java',
            lessonsTotal: 10,
            level: 'Для начинающих',
            teacher: 'Сергей Волков',
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
            projects: 4,
            price: '28 000₽'
        }
    };

    // Названия уроков для каждого курса
    const lessonTitles = {
        'fullstack': [
            'Введение в JavaScript',
            'Типы данных и переменные',
            'Функции в JavaScript',
            'Условные операторы',
            'Циклы в JavaScript',
            'Массивы и методы',
            'Объекты и методы',
            'Введение в React',
            'Компоненты и пропсы',
            'Состояние и хуки'
        ],
        'mobile': [
            'Введение в React Native',
            'Настройка окружения',
            'Компоненты React Native',
            'Стилизация в React Native',
            'Навигация в приложении',
            'Работа с API',
            'Хранилище данных',
            'Камера и галерея',
            'Публикация в Google Play',
            'Публикация в App Store'
        ],
        'design': [
            'Введение в дизайн',
            'Основы Figma',
            'Цвет и типографика',
            'Сетки и композиция',
            'Создание прототипов',
            'UI элементы',
            'Дизайн мобильных приложений',
            'Дизайн веб-сайтов',
            'Презентация проектов',
            'Портфолио дизайнера'
        ],
        'python': [
            'Основы Python',
            'Типы данных Python',
            'Условные операторы',
            'Циклы в Python',
            'Функции',
            'Работа с файлами',
            'Библиотека NumPy',
            'Библиотека Pandas',
            'Визуализация данных',
            'Введение в ML'
        ],
        'java': [
            'Java Core',
            'Переменные и типы',
            'Условные операторы',
            'Циклы в Java',
            'Массивы',
            'Классы и объекты',
            'Наследование',
            'Интерфейсы',
            'Исключения',
            'Коллекции'
        ]
    };

    return courseIds.map(courseId => {
        const baseCourse = coursesData[courseId];
        if (!baseCourse) {
            return {
                id: courseId,
                title: courseId,
                icon: '📚',
                description: 'Курс в разработке',
                lessonsTotal: 10,
                level: 'Неизвестно',
                teacher: 'Неизвестно',
                progress: 0,
                lessonsCompleted: 0,
                nextLesson: 'Скоро',
                lastActivity: 'еще не начат'
            };
        }
        
        // Загружаем прогресс с привязкой к пользователю
        const savedProgress = loadCourseProgress(courseId);
        
        let lessonsCompleted = 0;
        let nextLesson = 'Введение';
        let lastActivity = 'еще не начат';
        
        // Проверяем, что прогресс принадлежит текущему пользователю
        if (savedProgress && savedProgress.userId === user.email && savedProgress.completedLessons) {
            lessonsCompleted = savedProgress.completedLessons;
            
            // Определяем следующий урок
            if (lessonsCompleted < baseCourse.lessonsTotal) {
                const titles = lessonTitles[courseId] || Array(10).fill('Урок');
                nextLesson = titles[lessonsCompleted] || `Урок ${lessonsCompleted + 1}`;
            } else {
                nextLesson = 'Курс завершен';
            }
            
            // Определяем время последней активности
            if (savedProgress.lastAccess) {
                const lastDate = new Date(savedProgress.lastAccess);
                const now = new Date();
                const diffHours = Math.floor((now - lastDate) / (1000 * 60 * 60));
                
                if (diffHours < 1) {
                    lastActivity = 'только что';
                } else if (diffHours < 24) {
                    lastActivity = `${diffHours} ${getHoursWord(diffHours)} назад`;
                } else {
                    const diffDays = Math.floor(diffHours / 24);
                    lastActivity = `${diffDays} ${getDaysWord(diffDays)} назад`;
                }
            }
        }
        
        // Вычисляем прогресс в процентах
        const progress = Math.round((lessonsCompleted / baseCourse.lessonsTotal) * 100);
        
        return {
            ...baseCourse,
            progress: progress,
            lessonsCompleted: lessonsCompleted,
            lessonsTotal: baseCourse.lessonsTotal,
            nextLesson: nextLesson,
            lastActivity: lastActivity
        };
    });
}

// Вспомогательная функция для склонения слова "час"
function getHoursWord(hours) {
    if (hours % 10 === 1 && hours % 100 !== 11) return 'час';
    if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours % 100)) return 'часа';
    return 'часов';
}

// Вспомогательная функция для склонения слова "день"
function getDaysWord(days) {
    if (days % 10 === 1 && days % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
    return 'дней';
}

// Создание карточки курса
function createCourseCard(course) {
    const progressWidth = course.progress > 0 ? course.progress : 0;
    const isStarted = course.lessonsCompleted > 0;
    
    return `
        <div class="user-course-card" data-course-id="${course.id}">
            <div class="course-card-header">
                <div class="course-icon">${course.icon}</div>
                <div class="course-status ${isStarted ? 'active' : 'not-started'}">
                    ${isStarted ? 'В процессе' : 'Не начат'}
                </div>
            </div>
            
            <div class="course-card-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">
                    👨‍🏫 ${course.teacher} • ${course.level}
                </div>
                
                <div class="course-progress">
                    <div class="progress-info">
                        <span>Прогресс:</span>
                        <span class="progress-percent">${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressWidth}%;"></div>
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
                ${isStarted ? `
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

// Глобальная функция для продолжения курса
window.continueCourse = function(courseId) {
    window.location.href = `course-view.html?id=${courseId}`;
}

// Глобальная функция для начала курса
window.startCourse = function(courseId) {
    window.location.href = `course-view.html?id=${courseId}`;
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

// Вспомогательные функции для удаления
function showDeleteError(element, message) {
    element.className = 'status-message status-error';
    element.innerHTML = message;
}

function showDeleteSuccess(element, message) {
    element.className = 'status-message status-success';
    element.innerHTML = message;
}

// ==================== ФУНКЦИИ ДЛЯ СКРОЛЛА ====================

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

// ==================== ФУНКЦИЯ ДЛЯ ПОДРОБНОЙ ИНФОРМАЦИИ О КУРСЕ ====================
window.showCourseDetails = function(courseId) {
    // Получаем данные о курсе
    const course = getUserCourseData([courseId])[0];
    
    // Данные для разных курсов (из coursesData)
    const coursesData = {
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
            lessons: 10,
            projects: 6,
            price: '25 000₽'
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
            lessons: 10,
            projects: 4,
            price: '22 000₽'
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
            lessons: 10,
            projects: 5,
            price: '18 000₽'
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
            lessons: 10,
            projects: 3,
            price: '30 000₽'
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
            lessons: 10,
            projects: 4,
            price: '28 000₽'
        }
    };
    
    const details = coursesData[courseId] || {
        fullDescription: course.description || 'Описание курса',
        skills: ['JavaScript', 'React', 'Node.js'],
        duration: '6 месяцев',
        lessons: 10,
        projects: 4,
        price: '25 000₽'
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
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            animation: modalSlideIn 0.4s ease;
        ">
            <div style="
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
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
                ${course.lessonsCompleted > 0 ? `
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; border-left: 4px solid #0ea5e9;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem;">
                            <span style="font-weight: 600;">Ваш прогресс:</span>
                            <span style="color: #0ea5e9; font-weight: 700;">${course.progress}%</span>
                        </div>
                        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${course.progress}%; height: 100%; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border-radius: 4px;"></div>
                        </div>
                        <div style="margin-top: 0.8rem; color: #64748b;">
                            Пройдено ${course.lessonsCompleted} из ${course.lessonsTotal} уроков
                        </div>
                    </div>
                ` : ''}
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>📖</span> О курсе
                    </h3>
                    <p style="color: #64748b; line-height: 1.7;">${details.fullDescription}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>🎯</span> Чему вы научитесь
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                        ${details.skills.map(skill => `
                            <div style="display: flex; align-items: center; gap: 0.5rem; background: #f8fafc; padding: 0.8rem 1rem; border-radius: 12px;">
                                <span style="color: #10b981;">✓</span>
                                <span>${skill}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">⏱️</div>
                        <div style="font-weight: 600;">${details.duration}</div>
                        <div style="font-size: 0.8rem; color: #64748b;">Длительность</div>
                    </div>
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">📚</div>
                        <div style="font-weight: 600;">${details.lessons} уроков</div>
                        <div style="font-size: 0.8rem; color: #64748b;">Всего</div>
                    </div>
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">🎯</div>
                        <div style="font-weight: 600;">${details.projects} проектов</div>
                        <div style="font-size: 0.8rem; color: #64748b;">В портфолио</div>
                    </div>
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; margin-bottom: 0.3rem;">💰</div>
                        <div style="font-weight: 600; color: #8b5cf6;">${details.price}</div>
                        <div style="font-size: 0.8rem; color: #64748b;">Стоимость</div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #f0f9ff, #ffffff); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>👨‍🏫</span> Преподаватель
                    </h3>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">
                            ${course.teacher ? course.teacher.split(' ').map(n => n[0]).join('') : 'ПП'}
                        </div>
                        <div>
                            <div style="font-weight: 700;">${course.teacher || 'Преподаватель'}</div>
                            <div style="font-size: 0.9rem; color: #64748b;">Ведущий разработчик</div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    ${course.lessonsCompleted > 0 ? `
                        <button onclick="window.continueCourse('${courseId}')" style="
                            flex: 1;
                            background: linear-gradient(135deg, #8b5cf6, #06b6d4);
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
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            🎯 Продолжить обучение
                        </button>
                    ` : `
                        <button onclick="window.startCourse('${courseId}')" style="
                            flex: 1;
                            background: linear-gradient(135deg, #8b5cf6, #06b6d4);
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
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            🚀 Начать обучение
                        </button>
                    `}
                    <button onclick="this.closest('div[style*=\\'fixed\\']').remove()" style="
                        padding: 0 2rem;
                        background: #f1f5f9;
                        color: #0f172a;
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

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    
    // Добавляем CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-60px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
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

// Делаем функции глобальными
window.logout = logout;
window.showDeleteAccountModal = showDeleteAccountModal;
window.closeDeleteAccountModal = closeDeleteAccountModal;
window.validateDeleteEmail = validateDeleteEmail;
window.deleteAccount = deleteAccount;
