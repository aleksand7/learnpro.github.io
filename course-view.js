// ==================== ПОЛНЫЕ ДАННЫЕ ДЛЯ ВСЕХ КУРСОВ ====================
const lessonsDataы = {
    // ... весь объект с данными курсов (который мы добавили ранее) ...
    // (вставьте сюда весь большой объект lessonsData из предыдущего сообщения)
};

// ==================== ФУНКЦИЯ ЗАГРУЗКИ СТРАНИЦЫ КУРСА ====================
function loadCoursePage() {
    console.log("loadCoursePage вызвана");
    
    // Получаем ID курса из URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    console.log("Course ID:", courseId);
    
    if (!courseId || !lessonsData[courseId]) {
        console.log("Курс не найден, перенаправление...");
        window.location.href = 'dashboard.html';
        return;
    }

    const course = lessonsData[courseId];
    console.log("Загружаем курс:", course.title);
    
    const container = document.getElementById('courseContainer');
    
    if (!container) {
        console.log("Контейнер courseContainer не найден!");
        return;
    }
    
    container.innerHTML = `
        <!-- Course Header -->
        <div class="course-header">
            <div class="course-header-content">
                <div class="course-header-icon">${course.icon}</div>
                <div class="course-header-info">
                    <h1>${course.title}</h1>
                    <p style="font-size: 1.2rem; opacity: 0.9;">${course.description}</p>
                    <div class="course-meta">
                        <span class="course-meta-item">⏱️ ${course.duration}</span>
                        <span class="course-meta-item">📚 ${course.totalLessons} уроков</span>
                        <span class="course-meta-item">🎓 ${course.level}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Progress Section -->
        <div class="course-progress-large">
            <div class="progress-header">
                <div>
                    <h2 style="font-size: 1.5rem; margin-bottom: 0.3rem;">Ваш прогресс</h2>
                    <p style="color: var(--gray);">Продолжайте с того места, где остановились</p>
                </div>
                <div class="progress-percent-large">${course.progress}%</div>
            </div>
            <div class="progress-bar-large">
                <div class="progress-fill-large" style="width: ${course.progress}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;">
                <span style="font-weight: 600;">Пройдено уроков: ${course.completedLessons}/${course.totalLessons}</span>
                <span style="color: var(--primary); font-weight: 600;">Осталось: ${course.totalLessons - course.completedLessons}</span>
            </div>
        </div>

        <!-- Main Content -->
        <div class="course-content">
            <!-- Lessons List -->
            <div class="lessons-section">
                <div class="section-title">
                    <span>📋</span>
                    <span>Содержание курса</span>
                </div>
                
                <div style="margin-bottom: 1.5rem; background: #f0f9ff; padding: 1rem; border-radius: 12px; border-left: 4px solid #0ea5e9;">
                    <span style="font-weight: 700; color: #0369a1;">🎯 Текущий урок:</span>
                    <span style="margin-left: 0.5rem; font-weight: 600;">${course.currentLesson}</span>
                </div>
                
                <div style="max-height: 600px; overflow-y: auto; padding-right: 10px;">
                    ${course.lessons.map(lesson => `
                        <div class="lesson-item ${lesson.completed ? 'completed' : ''} ${lesson.isCurrent ? 'current-lesson' : ''}" 
                             onclick="window.playLesson('${courseId}', ${lesson.id})"
                             style="cursor: pointer;">
                            <span class="lesson-icon">
                                ${lesson.type === 'video' ? '🎬' : '📘'}
                            </span>
                            <div class="lesson-info">
                                <div class="lesson-title">${lesson.id}. ${lesson.title}</div>
                                <div class="lesson-duration">
                                    ${lesson.type === 'video' ? '⏱️ ' + lesson.duration : '📖 Текстовый урок'}
                                </div>
                            </div>
                            <div class="lesson-status">
                                ${lesson.completed ? '✅' : (lesson.isCurrent ? '▶️' : '🔒')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Sidebar -->
            <div>
                <!-- Teacher Info -->
                <div class="course-sidebar" style="margin-bottom: 2rem;">
                    <div class="section-title" style="margin-bottom: 1rem;">
                        <span>👨‍🏫</span>
                        <span>Преподаватель</span>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-avatar">
                            ${course.teacher.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h3 style="font-size: 1.2rem; margin-bottom: 0.2rem;">${course.teacher.name}</h3>
                            <p style="color: var(--gray); font-size: 0.9rem;">${course.teacher.position}</p>
                            <p style="color: var(--primary); font-size: 0.9rem; font-weight: 600;">${course.teacher.company}</p>
                        </div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 12px;">
                        <p style="color: var(--gray); font-size: 0.95rem; line-height: 1.6;">${course.teacher.bio}</p>
                    </div>
                </div>

                <!-- What You'll Learn -->
                <div class="course-sidebar" style="margin-bottom: 2rem;">
                    <div class="section-title" style="margin-bottom: 1rem;">
                        <span>🎯</span>
                        <span>Чему научитесь</span>
                    </div>
                    <ul style="list-style-type: none; padding: 0;">
                        ${course.whatYouWillLearn.map(item => `
                            <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: var(--success); font-size: 1.2rem;">✓</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Requirements -->
                <div class="course-sidebar" style="margin-bottom: 2rem;">
                    <div class="section-title" style="margin-bottom: 1rem;">
                        <span>📋</span>
                        <span>Требования</span>
                    </div>
                    <ul style="list-style-type: none; padding: 0;">
                        ${course.requirements.map(req => `
                            <li style="margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: var(--primary);">•</span>
                                <span>${req}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Resources -->
                <div class="course-sidebar">
                    <div class="section-title" style="margin-bottom: 1rem;">
                        <span>📎</span>
                        <span>Материалы</span>
                    </div>
                    <ul class="resources-list">
                        ${course.resources.map(resource => `
                            <li onclick="window.downloadResource('${resource}')" style="cursor: pointer;">
                                📄 ${resource}
                                <span style="margin-left: auto; font-size: 0.8rem;">⬇️</span>
                            </li>
                        `).join('')}
                    </ul>
                    
                    <button class="complete-lesson-btn" onclick="window.completeCurrentLesson('${courseId}')">
                        ✅ Отметить урок выполненным
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==================== ФУНКЦИИ ДЛЯ УРОКОВ ====================

window.playLesson = function(courseId, lessonId) {
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (lesson.type === 'text') {
        window.showTextLesson(courseId, lessonId);
    } else {
        alert(`▶️ Запускаем урок: ${lesson.title}\nДлительность: ${lesson.duration}`);
    }
}

window.completeCurrentLesson = function(courseId) {
    const course = lessonsData[courseId];
    
    const currentLesson = course.lessons.find(l => l.isCurrent);
    
    if (currentLesson) {
        currentLesson.completed = true;
        
        const nextIndex = course.lessons.findIndex(l => l.id === currentLesson.id) + 1;
        if (nextIndex < course.lessons.length) {
            course.lessons[nextIndex].isCurrent = true;
            course.currentLesson = course.lessons[nextIndex].title;
        }
        
        currentLesson.isCurrent = false;
        course.completedLessons++;
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);
        
        alert(`✅ Урок "${currentLesson.title}" выполнен!\n🎯 Следующий урок: ${course.currentLesson}`);
        
        loadCoursePage();
    }
}

window.downloadResource = function(resourceName) {
    alert(`📥 Скачивание: ${resourceName}\n\nФайл будет доступен через несколько секунд...`);
}

window.showTextLesson = function(courseId, lessonId) {
    window.currentCourseId = courseId;
    window.currentLessonId = lessonId;
    
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 32px;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: var(--shadow-xl);
            animation: modalSlideIn 0.4s ease;
        ">
            <div style="
                background: var(--gradient);
                color: white;
                padding: 2rem;
                border-radius: 32px 32px 0 0;
                position: sticky;
                top: 0;
                z-index: 10;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 2rem;">${course.icon}</span>
                        <div>
                            <h2 style="font-size: 1.5rem; margin-bottom: 0.3rem;">${lesson.title}</h2>
                            <p style="opacity: 0.9;">${course.title}</p>
                        </div>
                    </div>
                    <button onclick="this.closest('div[style*=\\'fixed\\']').remove()" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        font-size: 2rem;
                        cursor: pointer;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                       onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                </div>
            </div>
            
            <div style="padding: 2.5rem;">
                ${lesson.content || '<p style="color: var(--gray); text-align: center; padding: 3rem;">Содержание урока загружается...</p>'}
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--gray-light);">
                    <div>
                        ${lessonId > 1 ? `
                            <button onclick="window.showTextLesson('${courseId}', ${lessonId - 1})" style="
                                background: var(--gray-light);
                                color: var(--dark);
                                border: none;
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                font-weight: 600;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: all 0.3s;
                            " onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='var(--gray-light)'">
                                ← Предыдущий урок
                            </button>
                        ` : ''}
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="window.completeAndContinue('${courseId}', ${lessonId})" style="
                            background: var(--gradient);
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 12px;
                            font-weight: 700;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-lg)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            ✅ Отметить выполненным
                        </button>
                        
                        ${lessonId < course.lessons.length ? `
                            <button onclick="window.showTextLesson('${courseId}', ${lessonId + 1})" style="
                                background: white;
                                color: var(--primary);
                                border: 2px solid var(--primary);
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                font-weight: 700;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: all 0.3s;
                            " onmouseover="this.style.background='var(--primary)'; this.style.color='white'" 
                               onmouseout="this.style.background='white'; this.style.color='var(--primary)'">
                                Следующий урок →
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

window.completeAndContinue = function(courseId, lessonId) {
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (lesson && !lesson.completed) {
        lesson.completed = true;
        course.completedLessons++;
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);
        
        const nextLesson = course.lessons.find(l => l.id === lessonId + 1);
        if (nextLesson) {
            nextLesson.isCurrent = true;
            course.currentLesson = nextLesson.title;
        }
        
        lesson.isCurrent = false;
        
        alert(`✅ Урок "${lesson.title}" выполнен!\n🎯 Следующий урок: ${course.currentLesson}`);
        
        const modal = document.querySelector('div[style*="fixed"][style*="backdrop-filter"]');
        if (modal) modal.remove();
        
        if (nextLesson) {
            window.showTextLesson(courseId, lessonId + 1);
        }
        
        loadCoursePage();
    }
}

// Выход из системы
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==================== ЗАГРУЗКА СТРАНИЦЫ ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, проверяем авторизацию...");
    
    // Проверяем авторизацию
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (!user.email) {
        console.log("Пользователь не авторизован, перенаправление...");
        window.location.href = 'index.html';
        return;
    }
    
    console.log("Пользователь авторизован, загружаем курс...");
    
    // Загружаем страницу курса
    loadCoursePage();
});


// ==================== ПОЛНЫЕ ДАННЫЕ ДЛЯ ВСЕХ КУРСОВ С ТЕКСТОВЫМИ УРОКАМИ ====================
const lessonsData = {
    // 1. FULLSTACK-РАЗРАБОТКА
    'fullstack': {
        title: 'Fullstack-разработка',
        icon: '💻',
        description: 'JavaScript, React, Node.js, MongoDB',
        fullDescription: 'Полный курс по веб-разработке. Вы научитесь создавать современные веб-приложения с нуля, используя самые востребованные технологии.',
        duration: '6 месяцев',
        level: 'С нуля до PRO',
        teacher: {
            name: 'Алексей Иванов',
            position: 'Senior Fullstack Developer',
            company: 'Yandex',
            experience: '8 лет',
            bio: 'Ведущий разработчик в Яндексе. Специализируется на высоконагруженных проектах. Автор 5 курсов по веб-разработке.'
        },
        progress: 30,
        completedLessons: 36,
        totalLessons: 120,
        currentLesson: 'React Components',
        whatYouWillLearn: [
            'JavaScript от основ до продвинутого уровня',
            'Создание интерфейсов на React',
            'Разработка серверной части на Node.js',
            'Работа с базами данных MongoDB и PostgreSQL',
            'Деплой и DevOps',
            '6 реальных проектов в портфолио'
        ],
        requirements: [
            'Базовое понимание HTML/CSS',
            'Желание учиться',
            'Компьютер с 8GB RAM'
        ],
        lessons: [
            {
                id: 1,
                title: 'Введение в JavaScript',
                duration: '45 мин',
                completed: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Введение в JavaScript</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">🎯 Что такое JavaScript?</h3>
                        <p>JavaScript — это язык программирования, который делает веб-страницы интерактивными. Это основа современной веб-разработки.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Где используется JavaScript?</h3>
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">🌐</span>
                            <span><strong>Клиентская часть (Frontend)</strong> — интерактивные сайты</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">⚙️</span>
                            <span><strong>Серверная часть (Backend)</strong> — Node.js</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">📱</span>
                            <span><strong>Мобильные приложения</strong> — React Native</span>
                        </li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Первая программа</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px; overflow-x: auto;">
<code style="font-family: monospace;">// Вывод сообщения в консоль
console.log("Привет, мир!");

// Создание переменной
let name = "Алексей";
const age = 25;

// Вывод с использованием переменных
console.log("Меня зовут " + name + ", мне " + age + " лет");</code>
                    </pre>
                    
                    <div style="background: #fff3cd; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #856404;">📌 Важно запомнить:</h4>
                        <p><code>let</code> — переменная может меняться<br>
                        <code>const</code> — постоянная, не меняется<br>
                        <code>console.log()</code> — вывод в консоль</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Типы данных</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Числа (Number)
let number = 42;
let price = 99.99;

// Строки (String)
let text = "Hello";
let name = 'John';

// Булевы значения (Boolean)
let isActive = true;
let isDeleted = false;

// Массивы (Array)
let fruits = ["apple", "banana", "orange"];

// Объекты (Object)
let person = {
    name: "Иван",
    age: 30,
    city: "Москва"
};</code>
                    </pre>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Создайте объект "студент" с полями: имя, возраст, курс. Выведите его в консоль.</p>
                    </div>
                `
            },
            {
                id: 2,
                title: 'Функции в JavaScript',
                duration: '50 мин',
                completed: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Функции в JavaScript</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">🎯 Что такое функция?</h3>
                        <p>Функция — это блок кода, который можно вызывать многократно. Функции помогают не повторять один и тот же код.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Объявление функции</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Функция без параметров
function sayHello() {
    console.log("Привет!");
}

// Вызов функции
sayHello();

// Функция с параметрами
function greet(name) {
    console.log("Привет, " + name + "!");
}

greet("Анна"); // Выведет: Привет, Анна!</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Функции с возвратом значения</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Функция, возвращающая значение
function add(a, b) {
    return a + b;
}

let result = add(5, 3);
console.log(result); // 8

// Функция с условием
function isAdult(age) {
    if (age >= 18) {
        return "Взрослый";
    } else {
        return "Ребенок";
    }
}

console.log(isAdult(20)); // Взрослый
console.log(isAdult(15)); // Ребенок</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Стрелочные функции (современный синтаксис)</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Обычная функция
function multiply(a, b) {
    return a * b;
}

// Та же функция, но в стрелочном виде
const multiply = (a, b) => {
    return a * b;
};

// Если функция короткая, можно еще короче
const multiply = (a, b) => a * b;

console.log(multiply(4, 5)); // 20</code>
                    </pre>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Напишите функцию <code>calculateArea</code>, которая принимает ширину и высоту прямоугольника и возвращает его площадь.</p>
                    </div>
                `
            },
            {
                id: 3,
                title: 'Введение в React',
                duration: '60 мин',
                completed: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Введение в React</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">⚛️ Что такое React?</h3>
                        <p>React — это библиотека JavaScript для создания пользовательских интерфейсов. Разработана компанией Facebook.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Почему React?</h3>
                    <ul>
                        <li><strong>Компонентный подход</strong> — интерфейс разбивается на независимые компоненты</li>
                        <li><strong>Виртуальный DOM</strong> — быстрая работа приложений</li>
                        <li><strong>Большое сообщество</strong> — много готовых решений</li>
                        <li><strong>JSX</strong> — пишем HTML прямо в JavaScript</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Первый React компонент</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Простой компонент
function Welcome() {
    return (
        &lt;div&gt;
            &lt;h1&gt;Добро пожаловать в React!&lt;/h1&gt;
            &lt;p&gt;Это мой первый компонент&lt;/p&gt;
        &lt;/div&gt;
    );
}

// Использование компонента
ReactDOM.render(
    &lt;Welcome /&gt;,
    document.getElementById('root')
);</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Компонент с пропсами</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Компонент, принимающий данные (props)
function Greeting(props) {
    return (
        &lt;div&gt;
            &lt;h2&gt;Привет, {props.name}!&lt;/h2&gt;
            &lt;p&gt;Тебе {props.age} лет&lt;/p&gt;
        &lt;/div&gt;
    );
}

// Использование
&lt;Greeting name="Мария" age={25} /&gt;</code>
                    </pre>
                `
            },
            {
                id: 4,
                title: 'React Components',
                duration: '65 мин',
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">React Components</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">🎯 Что такое компоненты?</h3>
                        <p>Компоненты — это независимые, переиспользуемые куски кода, которые возвращают JSX. Они являются основой React-приложений.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Функциональные компоненты</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Функциональный компонент
function Welcome(props) {
  return &lt;h1&gt;Привет, {props.name}!&lt;/h1&gt;;
}

// Использование
&lt;Welcome name="Алексей" /&gt;</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Компонент с состоянием (useState)</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import React, { useState } from 'react';

function Counter() {
    // Состояние count с начальным значением 0
    const [count, setCount] = useState(0);
    
    return (
        &lt;div&gt;
            &lt;p&gt;Вы нажали {count} раз&lt;/p&gt;
            &lt;button onClick={() => setCount(count + 1)}&gt;
                Нажми меня
            &lt;/button&gt;
        &lt;/div&gt;
    );
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Компонент с эффектом (useEffect)</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import React, { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    // Эффект запускается при монтировании компонента
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        
        // Очистка при размонтировании
        return () => clearInterval(interval);
    }, []);
    
    return &lt;p&gt;Прошло секунд: {seconds}&lt;/p&gt;;
}</code>
                    </pre>
                    
                    <div style="background: #fff3cd; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #856404;">📌 Правила компонентов:</h4>
                        <ul>
                            <li>Название компонента всегда с большой буквы</li>
                            <li>Компонент должен возвращать JSX</li>
                            <li>Нельзя вызывать хуки внутри условий</li>
                        </ul>
                    </div>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Создайте компонент <code>TodoList</code>, который отображает список задач. Добавьте возможность добавлять новые задачи.</p>
                    </div>
                `
            }
        ],
        resources: [
            'Все материалы курса.zip',
            'Шпаргалка по React.pdf',
            'Домашние задания.pdf',
            'Полезные ссылки.txt'
        ]
    },

    // 2. МОБИЛЬНАЯ РАЗРАБОТКА
    'mobile': {
        title: 'Мобильная разработка',
        icon: '📱',
        description: 'React Native, iOS & Android',
        fullDescription: 'Научитесь создавать мобильные приложения для iOS и Android с помощью React Native. Курс включает публикацию приложений в сторах.',
        duration: '5 месяцев',
        level: 'Для начинающих',
        teacher: {
            name: 'Мария Петрова',
            position: 'Mobile Lead',
            company: 'Tinkoff',
            experience: '6 лет',
            bio: 'Разрабатываю мобильные приложения с 2017 года. Ведущий разработчик в Tinkoff, автор курсов по React Native.'
        },
        progress: 15,
        completedLessons: 15,
        totalLessons: 100,
        currentLesson: 'Настройка окружения',
        whatYouWillLearn: [
            'React Native с нуля',
            'Нативные модули',
            'Работа с API',
            'Публикация в AppStore/Google Play',
            'UI/UX для мобильных',
            '4 готовых приложения'
        ],
        requirements: [
            'Базовые знания JavaScript',
            'Компьютер (Mac для iOS разработки)',
            'Желание создавать приложения'
        ],
        lessons: [
            {
                id: 1,
                title: 'Введение в React Native',
                duration: '45 мин',
                completed: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Введение в React Native</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">📱 Что такое React Native?</h3>
                        <p>React Native — фреймворк от Facebook для создания нативных мобильных приложений с использованием JavaScript и React.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Преимущества React Native</h3>
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">✅</span>
                            <span><strong>Один код для iOS и Android</strong> — экономия времени и ресурсов</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">✅</span>
                            <span><strong>Hot Reload</strong> — мгновенное обновление приложения</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">✅</span>
                            <span><strong>Нативная производительность</strong> — приложения работают быстро</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">✅</span>
                            <span><strong>Большое сообщество</strong> — много готовых библиотек</span>
                        </li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Как работает React Native?</h3>
                    <p>React Native использует "мост" (bridge) между JavaScript и нативным кодом. Ваш JavaScript код выполняется в отдельном потоке и взаимодействует с нативными модулями.</p>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    &lt;View style={styles.container}&gt;
      &lt;Text style={styles.title}&gt;
        Hello, React Native!
      &lt;/Text&gt;
    &lt;/View&gt;
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  }
});

export default App;</code>
                    </pre>
                    
                    <div style="background: #fff3cd; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #856404;">📌 Отличие от веб-разработки:</h4>
                        <p>В React Native нет HTML-тегов (div, p, span). Вместо них используются нативные компоненты: View, Text, ScrollView, etc.</p>
                    </div>
                `
            },
            {
                id: 2,
                title: 'Настройка окружения',
                duration: '60 мин',
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Настройка окружения</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">🛠️ Что нужно установить:</h3>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">1. Node.js и npm</h3>
                    <p>Скачайте и установите Node.js с официального сайта (рекомендуется LTS версия).</p>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Проверка установки
node --version
npm --version</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">2. Установка React Native CLI</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>npm install -g react-native-cli</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">3. Для Android разработки</h3>
                    <ul>
                        <li>Установите Android Studio</li>
                        <li>Установите Android SDK</li>
                        <li>Настройте переменную ANDROID_HOME</li>
                    </ul>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Добавьте в ~/.bashrc или ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">4. Создание первого проекта</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Создание проекта
npx react-native init MyFirstApp

# Переход в папку проекта
cd MyFirstApp

# Запуск на Android
npx react-native run-android

# Запуск на iOS (только на Mac)
npx react-native run-ios</code>
                    </pre>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Установите все необходимые инструменты и создайте свой первый React Native проект. Запустите его на эмуляторе.</p>
                    </div>
                `
            }
        ],
        resources: [
            'Настройка окружения (PDF).pdf',
            'React Native Cheatsheet.pdf',
            'Полезные ссылки.txt'
        ]
    },

    // 3. UI/UX ДИЗАЙН
    'design': {
        title: 'UI/UX Дизайн',
        icon: '🎨',
        description: 'Figma, Adobe XD, Прототипирование',
        fullDescription: 'Освойте профессию дизайнера интерфейсов. Научитесь создавать удобные и красивые дизайны для веба и мобильных приложений.',
        duration: '4 месяца',
        level: 'С нуля',
        teacher: {
            name: 'Екатерина Смирнова',
            position: 'Product Designer',
            company: 'Wildberries',
            experience: '5 лет',
            bio: 'Работала над дизайном Wildberries, Ozon и Яндекс.Маркет. Специализируется на e-commerce и мобильных приложениях.'
        },
        progress: 0,
        completedLessons: 0,
        totalLessons: 80,
        currentLesson: 'Введение в дизайн',
        whatYouWillLearn: [
            'Figma и Adobe XD',
            'Прототипирование',
            'Дизайн-системы',
            'User Research',
            'Анимация интерфейсов',
            '5 кейсов в портфолио'
        ],
        requirements: [
            'Желание рисовать',
            'Компьютер',
            'Креативное мышление'
        ],
        lessons: [
            {
                id: 1,
                title: 'Введение в дизайн',
                duration: '40 мин',
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Введение в дизайн</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">🎯 Что такое UI и UX?</h3>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">UX (User Experience) — пользовательский опыт</h3>
                    <p>UX дизайн отвечает за то, как пользователь взаимодействует с продуктом. Насколько ему удобно, понятно и приятно.</p>
                    <ul>
                        <li>Исследование пользователей</li>
                        <li>Создание сценариев</li>
                        <li>Прототипирование</li>
                        <li>Тестирование</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">UI (User Interface) — пользовательский интерфейс</h3>
                    <p>UI дизайн отвечает за то, как выглядит продукт. Цвета, шрифты, кнопки, иконки.</p>
                    <ul>
                        <li>Визуальный дизайн</li>
                        <li>Типографика</li>
                        <li>Цветовые схемы</li>
                        <li>Анимация</li>
                    </ul>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 2rem 0;">
                        <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px;">
                            <h4 style="color: #0369a1; margin-bottom: 0.5rem;">🎯 UX вопросы:</h4>
                            <ul style="margin: 0; padding-left: 1rem;">
                                <li>Легко ли найти товар?</li>
                                <li>Понятно ли, как оформить заказ?</li>
                                <li>Быстро ли загружается сайт?</li>
                            </ul>
                        </div>
                        <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 16px;">
                            <h4 style="color: #be185d; margin-bottom: 0.5rem;">🎨 UI вопросы:</h4>
                            <ul style="margin: 0; padding-left: 1rem;">
                                <li>Красивые ли кнопки?</li>
                                <li>Читаемый ли текст?</li>
                                <li>Приятные ли цвета?</li>
                            </ul>
                        </div>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Основные инструменты дизайнера</h3>
                    <ul>
                        <li><strong>Figma</strong> — самый популярный инструмент (бесплатный)</li>
                        <li><strong>Adobe XD</strong> — от Adobe</li>
                        <li><strong>Sketch</strong> — для Mac</li>
                        <li><strong>Photoshop/Illustrator</strong> — для графики</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Первые шаги в Figma</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>1. Создайте аккаунт на figma.com
2. Создайте новый файл
3. Создайте фрейм (Frame) — нажмите F
4. Выберите размер (например, iPhone 14)
5. Добавьте прямоугольник (Rectangle) — R
6. Добавьте текст (Text) — T</code>
                    </pre>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Создайте в Figma простой экран входа: поле для email, поле для пароля и кнопку "Войти".</p>
                    </div>
                `
            }
        ],
        resources: [
            'Figma Basics.pdf',
            'Цветовые схемы.rar',
            'Шрифты для дизайна.zip',
            'Полезные ссылки.txt'
        ]
    },

    // 4. PYTHON & DATA SCIENCE
    'python': {
        title: 'Python & Data Science',
        icon: '🐍',
        description: 'Анализ данных и машинное обучение',
        fullDescription: 'Станьте Data Scientist с нуля. Изучите Python, библиотеки для анализа данных и машинное обучение.',
        duration: '7 месяцев',
        level: 'Продвинутый',
        teacher: {
            name: 'Дмитрий Соколов',
            position: 'Lead Data Scientist',
            company: 'СберТех',
            experience: '7 лет',
            bio: 'Кандидат физико-математических наук. Руководит командой DS в СберТехе. Спикер на конференциях.'
        },
        progress: 0,
        completedLessons: 0,
        totalLessons: 140,
        currentLesson: 'Основы Python',
        whatYouWillLearn: [
            'Python для анализа данных',
            'Pandas и NumPy',
            'Машинное обучение',
            'Нейросети и TensorFlow',
            'Визуализация данных',
            '3 реальных датасета'
        ],
        requirements: [
            'Математический склад ума',
            'Базовые знания математики',
            'Компьютер с 8GB RAM'
        ],
        lessons: [
            {
                id: 1,
                title: 'Основы Python',
                duration: '60 мин',
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Основы Python</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">🐍 Почему Python?</h3>
                        <p>Python — один из самых популярных языков для Data Science. Он простой в изучении и имеет огромное количество библиотек.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Переменные и типы данных</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Числа
x = 5
y = 3.14
z = -10

# Строки
name = "Python"
description = 'Data Science'
multiline = """Это
многострочный
текст"""

# Булевы значения
is_active = True
is_completed = False

# Списки (как массивы)
numbers = [1, 2, 3, 4, 5]
fruits = ["яблоко", "банан", "апельсин"]
mixed = [1, "текст", True, 3.14]

# Словари (как объекты)
person = {
    "name": "Алексей",
    "age": 28,
    "city": "Москва",
    "skills": ["Python", "SQL", "ML"]
}

# Кортежи (неизменяемые списки)
coordinates = (55.75, 37.62)

# Множества
unique_numbers = {1, 2, 3, 3, 3}  # будет {1, 2, 3}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Условные операторы</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>age = 18

if age >= 18:
    print("Доступ разрешен")
elif age >= 16:
    print("Доступ с родителями")
else:
    print("Доступ запрещен")

# Тернарный оператор
status = "взрослый" if age >= 18 else "ребенок"</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Циклы</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Цикл for
for i in range(5):
    print(f"Итерация {i}")

# Перебор списка
fruits = ["яблоко", "банан", "апельсин"]
for fruit in fruits:
    print(f"Фрукт: {fruit}")

# Перебор словаря
person = {"name": "Анна", "age": 25}
for key, value in person.items():
    print(f"{key}: {value}")

# Цикл while
count = 0
while count < 5:
    print(count)
    count += 1</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Функции</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Простая функция
def greet(name):
    """Функция приветствия"""
    return f"Привет, {name}!"

print(greet("Анна"))

# Функция с несколькими параметрами
def add(a, b):
    return a + b

# Функция с параметрами по умолчанию
def power(base, exponent=2):
    return base ** exponent

print(power(3))    # 9
print(power(3, 3)) # 27

# Лямбда-функции
square = lambda x: x ** 2
print(square(5))   # 25</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Работа с файлами</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Запись в файл
with open("data.txt", "w") as file:
    file.write("Hello, World!")

# Чтение из файла
with open("data.txt", "r") as file:
    content = file.read()
    print(content)

# Чтение CSV файла (важно для Data Science)
import csv
with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)</code>
                    </pre>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Напишите программу, которая читает список чисел из файла, находит их среднее значение и сохраняет результат в новый файл.</p>
                    </div>
                `
            }
        ],
        resources: [
            'Python для начинающих.pdf',
            'Jupyter Notebook setup.exe',
            'Датасеты для практики.zip'
        ]
    },

    // 5. JAVA РАЗРАБОТКА
    'java': {
        title: 'Java разработка',
        icon: '☕',
        description: 'Enterprise разработка на Java',
        fullDescription: 'Освойте Java для создания корпоративных приложений. Spring Framework, Hibernate, микросервисы.',
        duration: '6 месяцев',
        level: 'Для начинающих',
        teacher: {
            name: 'Сергей Волков',
            position: 'Java Architect',
            company: 'Тинькофф',
            experience: '9 лет',
            bio: 'Архитектор в Тинькофф Банке. Разрабатывает высоконагруженные системы. Автор курсов по Java и Spring.'
        },
        progress: 0,
        completedLessons: 0,
        totalLessons: 110,
        currentLesson: 'Java Core',
        whatYouWillLearn: [
            'Java Core и OOP',
            'Spring Framework',
            'Базы данных и Hibernate',
            'Микросервисы',
            'Тестирование',
            '4 enterprise-проекта'
        ],
        requirements: [
            'Логическое мышление',
            'Желание разбираться',
            'Компьютер с 8GB RAM'
        ],
        lessons: [
            {
                id: 1,
                title: 'Java Core',
                duration: '60 мин',
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Java Core</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">☕ Введение в Java</h3>
                        <p>Java — объектно-ориентированный язык программирования, созданный компанией Sun Microsystems (ныне Oracle). Главный принцип Java: "Написано однажды — работает везде" (Write Once, Run Anywhere).</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Первая программа на Java</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Переменные и типы данных</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>public class Variables {
    public static void main(String[] args) {
        // Примитивные типы
        int number = 42;              // целое число
        double price = 99.99;          // число с плавающей точкой
        boolean isActive = true;       // логическое значение
        char symbol = 'A';              // символ
        
        // Ссылочные типы
        String name = "Java";           // строка
        int[] array = {1, 2, 3, 4, 5}; // массив
        
        // Вывод в консоль
        System.out.println("number: " + number);
        System.out.println("name: " + name);
    }
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Условные операторы</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>public class Conditions {
    public static void main(String[] args) {
        int age = 18;
        
        if (age >= 18) {
            System.out.println("Доступ разрешен");
        } else if (age >= 16) {
            System.out.println("Доступ с родителями");
        } else {
            System.out.println("Доступ запрещен");
        }
        
        // Тернарный оператор
        String status = (age >= 18) ? "взрослый" : "ребенок";
        System.out.println("Статус: " + status);
        
        // Switch case
        int day = 3;
        switch (day) {
            case 1:
                System.out.println("Понедельник");
                break;
            case 2:
                System.out.println("Вторник");
                break;
            case 3:
                System.out.println("Среда");
                break;
            default:
                System.out.println("Другой день");
        }
    }
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Циклы</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>public class Loops {
    public static void main(String[] args) {
        // Цикл for
        for (int i = 0; i < 5; i++) {
            System.out.println("Итерация: " + i);
        }
        
        // Цикл while
        int count = 0;
        while (count < 5) {
            System.out.println("count: " + count);
            count++;
        }
        
        // Цикл do-while
        int x = 0;
        do {
            System.out.println("x: " + x);
            x++;
        } while (x < 5);
        
        // Перебор массива
        int[] numbers = {10, 20, 30, 40, 50};
        for (int num : numbers) {
            System.out.println("Число: " + num);
        }
    }
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Классы и объекты (ООП)</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Определение класса
public class Person {
    // Поля класса
    private String name;
    private int age;
    
    // Конструктор
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Геттеры и сеттеры
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    // Метод
    public void introduce() {
        System.out.println("Привет, меня зовут " + name + 
                          ", мне " + age + " лет");
    }
}

// Использование класса
public class Main {
    public static void main(String[] args) {
        Person person = new Person("Иван", 25);
        person.introduce();
        
        person.setAge(26);
        System.out.println("Новый возраст: " + person.getAge());
    }
}</code>
                    </pre>
                    
                    <div style="background: #fff3cd; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #856404;">📌 Важные концепции Java:</h4>
                        <ul>
                            <li><strong>JVM</strong> (Java Virtual Machine) — виртуальная машина, выполняющая Java-код</li>
                            <li><strong>JRE</strong> (Java Runtime Environment) — среда выполнения</li>
                            <li><strong>JDK</strong> (Java Development Kit) — набор разработчика</li>
                            <li><strong>Garbage Collector</strong> — автоматическая очистка памяти</li>
                        </ul>
                    </div>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Создайте класс <code>Book</code> с полями: title, author, year, price. Добавьте конструктор, геттеры и метод для вывода информации о книге.</p>
                    </div>
                `
            }
        ],
        resources: [
            'Java Core (PDF).pdf',
            'IntelliJ IDEA setup.exe',
            'JDK 11 installer.exe',
            'Полезные ссылки.txt'
        ]
    }
};

// ==================== ФУНКЦИИ ДЛЯ УРОКОВ ====================

window.playLesson = function(courseId, lessonId) {
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (lesson.type === 'text') {
        window.showTextLesson(courseId, lessonId);
    } else {
        alert(`▶️ Запускаем урок: ${lesson.title}\nДлительность: ${lesson.duration}`);
    }
}

window.completeCurrentLesson = function(courseId) {
    const course = lessonsData[courseId];
    
    const currentLesson = course.lessons.find(l => l.isCurrent);
    
    if (currentLesson) {
        currentLesson.completed = true;
        
        const nextIndex = course.lessons.findIndex(l => l.id === currentLesson.id) + 1;
        if (nextIndex < course.lessons.length) {
            course.lessons[nextIndex].isCurrent = true;
            course.currentLesson = course.lessons[nextIndex].title;
        }
        
        currentLesson.isCurrent = false;
        course.completedLessons++;
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);
        
        alert(`✅ Урок "${currentLesson.title}" выполнен!\n🎯 Следующий урок: ${course.currentLesson}`);
        
        loadCoursePage();
    }
}

window.downloadResource = function(resourceName) {
    alert(`📥 Скачивание: ${resourceName}\n\nФайл будет доступен через несколько секунд...`);
}

window.showTextLesson = function(courseId, lessonId) {
    window.currentCourseId = courseId;
    window.currentLessonId = lessonId;
    
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 32px;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: var(--shadow-xl);
            animation: modalSlideIn 0.4s ease;
        ">
            <div style="
                background: var(--gradient);
                color: white;
                padding: 2rem;
                border-radius: 32px 32px 0 0;
                position: sticky;
                top: 0;
                z-index: 10;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 2rem;">${course.icon}</span>
                        <div>
                            <h2 style="font-size: 1.5rem; margin-bottom: 0.3rem;">${lesson.title}</h2>
                            <p style="opacity: 0.9;">${course.title}</p>
                        </div>
                    </div>
                    <button onclick="this.closest('div[style*=\\'fixed\\']').remove()" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        font-size: 2rem;
                        cursor: pointer;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                       onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                </div>
            </div>
            
            <div style="padding: 2.5rem;">
                ${lesson.content || '<p style="color: var(--gray); text-align: center; padding: 3rem;">Содержание урока загружается...</p>'}
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--gray-light);">
                    <div>
                        ${lessonId > 1 ? `
                            <button onclick="window.showTextLesson('${courseId}', ${lessonId - 1})" style="
                                background: var(--gray-light);
                                color: var(--dark);
                                border: none;
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                font-weight: 600;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: all 0.3s;
                            " onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='var(--gray-light)'">
                                ← Предыдущий урок
                            </button>
                        ` : ''}
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="window.completeAndContinue('${courseId}', ${lessonId})" style="
                            background: var(--gradient);
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 12px;
                            font-weight: 700;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-lg)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            ✅ Отметить выполненным
                        </button>
                        
                        ${lessonId < course.lessons.length ? `
                            <button onclick="window.showTextLesson('${courseId}', ${lessonId + 1})" style="
                                background: white;
                                color: var(--primary);
                                border: 2px solid var(--primary);
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                font-weight: 700;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: all 0.3s;
                            " onmouseover="this.style.background='var(--primary)'; this.style.color='white'" 
                               onmouseout="this.style.background='white'; this.style.color='var(--primary)'">
                                Следующий урок →
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

window.completeAndContinue = function(courseId, lessonId) {
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (lesson && !lesson.completed) {
        lesson.completed = true;
        course.completedLessons++;
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);
        
        const nextLesson = course.lessons.find(l => l.id === lessonId + 1);
        if (nextLesson) {
            nextLesson.isCurrent = true;
            course.currentLesson = nextLesson.title;
        }
        
        lesson.isCurrent = false;
        
        alert(`✅ Урок "${lesson.title}" выполнен!\n🎯 Следующий урок: ${course.currentLesson}`);
        
        const modal = document.querySelector('div[style*="fixed"][style*="backdrop-filter"]');
        if (modal) modal.remove();
        
        if (nextLesson) {
            window.showTextLesson(courseId, lessonId + 1);
        }
        
        loadCoursePage();
    }
}

// Выход из системы
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==================== ВАЖНО! ЗАГРУЗКА СТРАНИЦЫ ====================
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (!user.email) {
        window.location.href = 'index.html';
        return;
    }
    
    // Загружаем страницу курса
    loadCoursePage();
});
