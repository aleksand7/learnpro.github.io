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


// ==================== ПОЛНЫЕ ДАННЫЕ ДЛЯ ВСЕХ КУРСОВ С 10 УРОКАМИ И ВОПРОСАМИ ====================
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
        completedLessons: 3,
        totalLessons: 10,
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
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 1: Введение в JavaScript</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">🎯 Что такое JavaScript?</h3>
                        <p>JavaScript — это язык программирования, который делает веб-страницы интерактивными. Это основа современной веб-разработки.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Где используется JavaScript?</h3>
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">🌐</span>
                            <span><strong>Frontend:</strong> React, Vue, Angular</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">⚙️</span>
                            <span><strong>Backend:</strong> Node.js</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">📱</span>
                            <span><strong>Мобильные приложения:</strong> React Native</span>
                        </li>
                        <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: var(--success);">💻</span>
                            <span><strong>Десктоп приложения:</strong> Electron</span>
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
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Создайте три переменные с вашим именем, возрастом и городом. Выведите их в консоль.</p>
                    </div>
                `
            },
            {
                id: 2,
                title: 'Типы данных и переменные',
                duration: '50 мин',
                completed: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 2: Типы данных и переменные</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Примитивные типы данных</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Числа (Number)
let number = 42;
let price = 99.99;
let temperature = -10;

// Строки (String)
let text = "Hello";
let name = 'John';
let message = \`Hello, \${name}\`; // шаблонная строка

// Булевы значения (Boolean)
let isActive = true;
let isDeleted = false;

// Null и Undefined
let empty = null;
let notDefined = undefined;

// Symbol (уникальное значение)
let sym = Symbol('id');</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Ссылочные типы</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Массивы (Array)
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "text", true, null];

// Объекты (Object)
let person = {
    name: "Иван",
    age: 30,
    city: "Москва",
    hobbies: ["футбол", "книги"],
    address: {
        street: "Ленина",
        house: 10
    }
};

// Дата
let now = new Date();</code>
                    </pre>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0369a1;">📌 typeof - проверить тип</h4>
                        <pre style="background: #1e293b; color: #fff; padding: 1rem; border-radius: 8px;">
<code>console.log(typeof 42);        // "number"
console.log(typeof "text");    // "string"
console.log(typeof true);      // "boolean"
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"
console.log(typeof null);      // "object" (особенность JS)</code>
                        </pre>
                    </div>
                `
            },
            {
                id: 3,
                title: 'Функции в JavaScript',
                duration: '55 мин',
                completed: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 3: Функции в JavaScript</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Объявление функции</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Function Declaration
function greet(name) {
    return "Привет, " + name;
}

// Function Expression
const greet = function(name) {
    return "Привет, " + name;
};

// Стрелочная функция (Arrow Function)
const greet = (name) => {
    return "Привет, " + name;
};

// Краткая форма (если одно действие)
const greet = name => "Привет, " + name;</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Параметры и аргументы</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Несколько параметров
function add(a, b) {
    return a + b;
}

// Параметры по умолчанию
function multiply(a, b = 1) {
    return a * b;
}

// Rest параметры (остаточные параметры)
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Замыкания (Closures)</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3</code>
                    </pre>
                `
            },
            {
                id: 4,
                title: 'Условные операторы',
                duration: '40 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Условные операторы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">if...else</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let age = 18;

if (age >= 18) {
    console.log("Доступ разрешен");
} else {
    console.log("Доступ запрещен");
}

// if...else if...else
let score = 85;

if (score >= 90) {
    console.log("Отлично");
} else if (score >= 75) {
    console.log("Хорошо");
} else if (score >= 60) {
    console.log("Удовлетворительно");
} else {
    console.log("Нужно подучить");
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Тернарный оператор</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let age = 20;
let status = age >= 18 ? "взрослый" : "ребенок";
console.log(status); // "взрослый"

// Можно вкладывать, но лучше не злоупотреблять
let message = score >= 60 
    ? score >= 75 
        ? score >= 90 
            ? "Отлично" 
            : "Хорошо" 
        : "Удовлетворительно" 
    : "Нужно подучить";</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">switch</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let day = 3;
let dayName;

switch(day) {
    case 1:
        dayName = "Понедельник";
        break;
    case 2:
        dayName = "Вторник";
        break;
    case 3:
        dayName = "Среда";
        break;
    case 4:
        dayName = "Четверг";
        break;
    case 5:
        dayName = "Пятница";
        break;
    case 6:
    case 7:
        dayName = "Выходной";
        break;
    default:
        dayName = "Неизвестный день";
}

console.log(dayName); // "Среда"</code>
                    </pre>
                    
                    <div style="background: #e6f7e6; padding: 1.5rem; border-radius: 16px; margin: 1.5rem 0;">
                        <h4 style="color: #0a5c0a;">✅ Практическое задание:</h4>
                        <p>Напишите функцию, которая принимает число и возвращает "Положительное", "Отрицательное" или "Ноль".</p>
                    </div>
                `
            },
            {
                id: 5,
                title: 'Циклы в JavaScript',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Циклы в JavaScript</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">for</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Классический for
for (let i = 0; i < 5; i++) {
    console.log("Итерация: " + i);
}

// Можно опускать части
let i = 0;
for (; i < 5; ) {
    console.log(i);
    i++;
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">while</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// Бесконечный цикл (осторожно!)
// while (true) {
//     // что-то делаем
//     if (условие) break;
// }</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">do...while</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let j = 0;
do {
    console.log(j);
    j++;
} while (j < 5);

// do...while выполнится хотя бы один раз</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">for...of (для массивов)</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let fruits = ["яблоко", "банан", "апельсин"];
for (let fruit of fruits) {
    console.log(fruit);
}</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">forEach для массивов</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>fruits.forEach((fruit, index) => {
    console.log(index + ": " + fruit);
});</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">break и continue</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>for (let i = 0; i < 10; i++) {
    if (i === 3) continue; // пропустить 3
    if (i === 7) break;    // остановиться на 7
    console.log(i);
}
// Выведет: 0,1,2,4,5,6</code>
                    </pre>
                `
            },
            {
                id: 6,
                title: 'Массивы и методы',
                duration: '50 мин',
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: Массивы и методы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Создание массивов</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Литерал массива
let numbers = [1, 2, 3, 4, 5];

// Конструктор
let fruits = new Array("яблоко", "банан", "апельсин");

// Пустой массив
let empty = [];

// Смешанный массив
let mixed = [1, "текст", true, null, {name: "объект"}];</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Доступ к элементам</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let fruits = ["яблоко", "банан", "апельсин"];

console.log(fruits[0]); // "яблоко"
console.log(fruits[1]); // "банан"
console.log(fruits[2]); // "апельсин"
console.log(fruits.length); // 3

// Последний элемент
console.log(fruits[fruits.length - 1]); // "апельсин"</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Методы для добавления/удаления</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let fruits = ["яблоко", "банан"];

// Добавление в конец
fruits.push("груша"); // ["яблоко", "банан", "груша"]

// Удаление с конца
let last = fruits.pop(); // last = "груша", fruits = ["яблоко", "банан"]

// Добавление в начало
fruits.unshift("киви"); // ["киви", "яблоко", "банан"]

// Удаление с начала
let first = fruits.shift(); // first = "киви", fruits = ["яблоко", "банан"]</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Полезные методы</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let fruits = ["яблоко", "банан", "апельсин", "киви"];

// Поиск индекса
let index = fruits.indexOf("банан"); // 1

// Включает ли массив элемент
let hasApple = fruits.includes("яблоко"); // true

// Срез массива (не меняет исходный)
let slice = fruits.slice(1, 3); // ["банан", "апельсин"]

// Удаление/замена элементов (меняет исходный)
let removed = fruits.splice(1, 2); // удаляет 2 элемента с индекса 1
// fruits = ["яблоко", "киви"], removed = ["банан", "апельсин"]

// Объединение массивов
let more = ["груша", "манго"];
let all = fruits.concat(more); // ["яблоко", "киви", "груша", "манго"]

// Преобразование в строку
let str = fruits.join(", "); // "яблоко, киви"</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Методы для перебора и трансформации</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let numbers = [1, 2, 3, 4, 5];

// map - преобразует каждый элемент
let doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - фильтрует элементы
let even = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce - сворачивает массив
let sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// find - находит первый подходящий элемент
let firstEven = numbers.find(n => n % 2 === 0); // 2

// every - все элементы удовлетворяют условию
let allPositive = numbers.every(n => n > 0); // true

// some - хотя бы один элемент удовлетворяет условию
let hasNegative = numbers.some(n => n < 0); // false

// sort - сортировка
let unsorted = [3, 1, 4, 2, 5];
unsorted.sort((a, b) => a - b); // [1, 2, 3, 4, 5]</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Объекты и методы',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Объекты и методы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Создание объектов</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Литерал объекта
let person = {
    firstName: "Иван",
    lastName: "Петров",
    age: 30,
    city: "Москва"
};

// Конструктор Object
let car = new Object();
car.brand = "Toyota";
car.model = "Camry";

// Доступ к свойствам
console.log(person.firstName); // "Иван"
console.log(person["lastName"]); // "Петров"</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Методы объектов</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let person = {
    firstName: "Иван",
    lastName: "Петров",
    age: 30,
    
    // Метод объекта
    fullName() {
        return this.firstName + " " + this.lastName;
    },
    
    // Метод с параметрами
    introduce() {
        console.log("Привет, я " + this.fullName() + ", мне " + this.age + " лет");
    },
    
    // Стрелочная функция (не имеет своего this)
    getAge: () => {
        return this.age; // this будет глобальным объектом!
    }
};

console.log(person.fullName()); // "Иван Петров"
person.introduce(); // "Привет, я Иван Петров, мне 30 лет"</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Работа со свойствами</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let person = {
    name: "Иван",
    age: 30
};

// Добавление свойства
person.city = "Москва";
person["country"] = "Россия";

// Изменение свойства
person.age = 31;

// Удаление свойства
delete person.city;

// Проверка наличия свойства
console.log("name" in person); // true
console.log(person.hasOwnProperty("age")); // true

// Получение ключей и значений
let keys = Object.keys(person); // ["name", "age"]
let values = Object.values(person); // ["Иван", 31]
let entries = Object.entries(person); // [["name", "Иван"], ["age", 31]]</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Вложенные объекты</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>let user = {
    name: "Анна",
    address: {
        city: "Санкт-Петербург",
        street: "Невский",
        house: 10,
        apartment: 25
    },
    contacts: {
        email: "anna@example.com",
        phone: "+7 (999) 123-45-67"
    }
};

console.log(user.address.city); // "Санкт-Петербург"
console.log(user.contacts.email); // "anna@example.com"</code>
                    </pre>
                `
            },
            {
                id: 8,
                title: 'Введение в React',
                duration: '60 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Введение в React</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">⚛️ Что такое React?</h3>
                        <p>React — библиотека для создания пользовательских интерфейсов. Разработана компанией Facebook в 2013 году.</p>
                    </div>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Основные концепции</h3>
                    <ul>
                        <li><strong>Компоненты</strong> — строительные блоки интерфейса</li>
                        <li><strong>JSX</strong> — расширение JavaScript для описания разметки</li>
                        <li><strong>Props</strong> — данные, передаваемые в компонент</li>
                        <li><strong>State</strong> — внутреннее состояние компонента</li>
                        <li><strong>Virtual DOM</strong> — оптимизация обновлений</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Первый компонент</h3>
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
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Установка React проекта</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Создание проекта с Create React App
npx create-react-app my-app
cd my-app
npm start

// Или с Vite
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev</code>
                    </pre>
                `
            },
            {
                id: 9,
                title: 'Компоненты и пропсы',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Компоненты и пропсы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Функциональные компоненты</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>function Greeting(props) {
    return &lt;h1&gt;Привет, {props.name}!&lt;/h1&gt;
}

// Использование
&lt;Greeting name="Анна" /&gt;
&lt;Greeting name="Иван" /&gt;</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Пропсы по умолчанию</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>function Welcome({ name = "Гость" }) {
    return &lt;h1&gt;Добро пожаловать, {name}!&lt;/h1&gt;
}

// или
Welcome.defaultProps = {
    name: "Гость"
};</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Дочерние компоненты</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>function Card({ title, children }) {
    return (
        &lt;div className="card"&gt;
            &lt;h2&gt;{title}&lt;/h2&gt;
            &lt;div className="card-content"&gt;
                {children}
            &lt;/div&gt;
        &lt;/div&gt;
    );
}

// Использование
&lt;Card title="Заголовок"&gt;
    &lt;p&gt;Это содержимое карточки&lt;/p&gt;
    &lt;button&gt;Кнопка&lt;/button&gt;
&lt;/Card&gt;</code>
                    </pre>
                `
            },
            {
                id: 10,
                title: 'Состояние и хуки',
                duration: '65 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Состояние и хуки</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">useState</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { useState } from 'react';

function Counter() {
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
                    
                    <h3 style="margin: 1.5rem 0 1rem;">useEffect</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);
    
    return &lt;p&gt;Прошло секунд: {seconds}&lt;/p&gt;;
}</code>
                    </pre>
                `
            }
        ],
        resources: [
            'Все материалы курса.zip',
            'Шпаргалка по React.pdf',
            'Домашние задания.pdf',
            'Полезные ссылки.txt'
        ],
        
        // ИТОГОВЫЙ ТЕСТ ДЛЯ FULLSTACK
        quiz: {
            title: "Итоговый тест: Fullstack-разработка",
            description: "Проверьте свои знания по JavaScript, React и Node.js",
            passingScore: 70,
            questions: [
                {
                    question: "Какой метод используется для создания состояния в функциональном компоненте React?",
                    options: [
                        "this.state",
                        "useState()",
                        "createState()",
                        "setState()"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое JSX?",
                    options: [
                        "JavaScript XML - расширение синтаксиса для React",
                        "Java Standard Extension",
                        "JavaScript XHR запрос",
                        "JSON формат данных"
                    ],
                    correct: 0
                },
                {
                    question: "Какой хук используется для побочных эффектов в React?",
                    options: [
                        "useEffect()",
                        "useState()",
                        "useContext()",
                        "useReducer()"
                    ],
                    correct: 0
                },
                {
                    question: "Что возвращает хук useState?",
                    options: [
                        "Объект с данными",
                        "Массив из двух элементов: значение и функция для обновления",
                        "Только значение",
                        "Только функцию для обновления"
                    ],
                    correct: 1
                },
                {
                    question: "Как передать данные от родительского компонента дочернему в React?",
                    options: [
                        "Через state",
                        "Через props",
                        "Через context",
                        "Через refs"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое виртуальный DOM (Virtual DOM) в React?",
                    options: [
                        "Настоящий DOM браузера",
                        "Легковесная копия реального DOM для оптимизации",
                        "База данных",
                        "Серверный рендеринг"
                    ],
                    correct: 1
                },
                {
                    question: "Какой оператор используется для строгого сравнения в JavaScript?",
                    options: [
                        "==",
                        "===",
                        "=",
                        "!="
                    ],
                    correct: 1
                },
                {
                    question: "Что такое Promise в JavaScript?",
                    options: [
                        "Объект для работы с асинхронными операциями",
                        "Функция",
                        "Массив",
                        "Цикл"
                    ],
                    correct: 0
                },
                {
                    question: "Какой метод массива создает новый массив с результатом вызова функции для каждого элемента?",
                    options: [
                        "forEach()",
                        "map()",
                        "filter()",
                        "reduce()"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое Node.js?",
                    options: [
                        "Фреймворк для фронтенда",
                        "Среда выполнения JavaScript на сервере",
                        "База данных",
                        "Язык программирования"
                    ],
                    correct: 1
                }
            ]
        }
    },

    // 2. МОБИЛЬНАЯ РАЗРАБОТКА
    'mobile': {
        title: 'Мобильная разработка',
        icon: '📱',
        description: 'React Native, iOS & Android',
        fullDescription: 'Научитесь создавать мобильные приложения для iOS и Android с помощью React Native.',
        duration: '5 месяцев',
        level: 'Для начинающих',
        teacher: {
            name: 'Мария Петрова',
            position: 'Mobile Lead',
            company: 'Tinkoff',
            experience: '6 лет',
            bio: 'Разрабатываю мобильные приложения с 2017 года. Ведущий разработчик в Tinkoff. Спикер на конференциях Mobius.'
        },
        progress: 15,
        completedLessons: 2,
        totalLessons: 10,
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
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 1: Введение в React Native</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">📱 Что такое React Native?</h3>
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
                `
            },
            {
                id: 2,
                title: 'Настройка окружения',
                duration: '60 мин',
                completed: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 2: Настройка окружения</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">1. Установка Node.js</h3>
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
                    
                    <h3 style="margin: 1.5rem 0 1rem;">4. Создание первого проекта</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>npx react-native init MyFirstApp
cd MyFirstApp
npx react-native run-android</code>
                    </pre>
                `
            },
            {
                id: 3,
                title: 'Компоненты React Native',
                duration: '50 мин',
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 3: Компоненты React Native</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Базовые компоненты</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { View, Text, Image, ScrollView } from 'react-native';

const App = () => {
  return (
    &lt;ScrollView&gt;
      &lt;View&gt;
        &lt;Text&gt;Hello World!&lt;/Text&gt;
        &lt;Image 
          source={{uri: 'https://example.com/image.jpg'}}
          style={{width: 100, height: 100}}
        /&gt;
      &lt;/View&gt;
    &lt;/ScrollView&gt;
  );
};</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Кнопки и Touchable</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { Button, TouchableOpacity } from 'react-native';

&lt;Button
  title="Нажми меня"
  onPress={() => alert('Привет!')}
/&gt;

&lt;TouchableOpacity
  style={{padding: 10, backgroundColor: 'blue'}}
  onPress={() => console.log('Pressed')}
&gt;
  &lt;Text style={{color: 'white'}}&gt;Нажми меня&lt;/Text&gt;
&lt;/TouchableOpacity&gt;</code>
                    </pre>
                `
            },
            {
                id: 4,
                title: 'Стилизация в React Native',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Стилизация в React Native</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { StyleSheet, View, Text } from 'react-native';

const App = () => {
  return (
    &lt;View style={styles.container}&gt;
      &lt;Text style={styles.title}&gt;Заголовок&lt;/Text&gt;
      &lt;Text style={styles.subtitle}&gt;Подзаголовок&lt;/Text&gt;
    &lt;/View&gt;
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  }
});</code>
                    </pre>
                `
            },
            {
                id: 5,
                title: 'Навигация в приложении',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Навигация в приложении</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Установка React Navigation</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Пример навигации</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    &lt;View&gt;
      &lt;Text&gt;Главный экран&lt;/Text&gt;
      &lt;Button
        title="Перейти к профилю"
        onPress={() => navigation.navigate('Profile')}
      /&gt;
    &lt;/View&gt;
  );
}

function App() {
  return (
    &lt;NavigationContainer&gt;
      &lt;Stack.Navigator&gt;
        &lt;Stack.Screen name="Home" component={HomeScreen} /&gt;
        &lt;Stack.Screen name="Profile" component={ProfileScreen} /&gt;
      &lt;/Stack.Navigator&gt;
    &lt;/NavigationContainer&gt;
  );
}</code>
                    </pre>
                `
            },
            {
                id: 6,
                title: 'Работа с API',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: Работа с API</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Fetch API</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>const [data, setData] = useState([]);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => console.error(error));
}, []);</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Axios</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import axios from 'axios';

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => setData(response.data))
    .catch(error => console.error(error));
}, []);</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Хранилище данных',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Хранилище данных</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">AsyncStorage</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import AsyncStorage from '@react-native-async-storage/async-storage';

// Сохранение данных
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

// Чтение данных
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error(error);
  }
};</code>
                    </pre>
                `
            },
            {
                id: 8,
                title: 'Камера и галерея',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Камера и галерея</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Установка react-native-image-picker</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>npm install react-native-image-picker</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Выбор изображения</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { launchImageLibrary } from 'react-native-image-picker';

const selectImage = () => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  launchImageLibrary(options, (response) => {
    if (response.assets) {
      setImage(response.assets[0].uri);
    }
  });
};</code>
                    </pre>
                `
            },
            {
                id: 9,
                title: 'Публикация в Google Play',
                duration: '60 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Публикация в Google Play</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">1. Создание подписанного APK</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>cd android
./gradlew bundleRelease</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">2. Создание ключа подписи</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">3. Загрузка в Google Play Console</h3>
                    <p>Создайте аккаунт разработчика ($25), создайте приложение и загрузите AAB файл.</p>
                `
            },
            {
                id: 10,
                title: 'Публикация в App Store',
                duration: '60 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Публикация в App Store</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">1. Настройка проекта в Xcode</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>cd ios
pod install</code>
                    </pre>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">2. Создание сертификатов</h3>
                    <p>В Xcode: Signing & Capabilities → Add Account → Apple Developer Program ($99/год)</p>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">3. Архивация и загрузка</h3>
                    <p>Product → Archive → Distribute App → App Store Connect</p>
                `
            }
        ],
        resources: [
            'Настройка окружения.pdf',
            'React Native Cheatsheet.pdf',
            'Готовые проекты.zip'
        ],
        
        // ИТОГОВЫЙ ТЕСТ ДЛЯ MOBILE
        quiz: {
            title: "Итоговый тест: Мобильная разработка",
            description: "Проверьте свои знания React Native",
            passingScore: 70,
            questions: [
                {
                    question: "Какой компонент используется для создания списка в React Native?",
                    options: [
                        "<List>",
                        "<FlatList>",
                        "<ScrollList>",
                        "<ListView>"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое React Native?",
                    options: [
                        "Язык программирования",
                        "Фреймворк для создания нативных мобильных приложений",
                        "База данных",
                        "Среда разработки"
                    ],
                    correct: 1
                },
                {
                    question: "Какой компонент используется для отображения текста в React Native?",
                    options: [
                        "<div>",
                        "<span>",
                        "<Text>",
                        "<p>"
                    ],
                    correct: 2
                },
                {
                    question: "Что такое StyleSheet в React Native?",
                    options: [
                        "CSS файл",
                        "API для создания стилей",
                        "HTML тег",
                        "База данных"
                    ],
                    correct: 1
                },
                {
                    question: "Какой хук используется для создания состояния в React Native?",
                    options: [
                        "useEffect",
                        "useState",
                        "useContext",
                        "useReducer"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое навигация в React Native?",
                    options: [
                        "Перемещение по карте",
                        "Переход между экранами приложения",
                        "Загрузка данных",
                        "Стилизация"
                    ],
                    correct: 1
                },
                {
                    question: "Какая библиотека используется для навигации в React Native?",
                    options: [
                        "react-router",
                        "react-navigation",
                        "react-router-dom",
                        "react-native-router"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое Flexbox в React Native?",
                    options: [
                        "База данных",
                        "Система верстки",
                        "Язык программирования",
                        "Библиотека"
                    ],
                    correct: 1
                },
                {
                    question: "Какой компонент используется для скролла в React Native?",
                    options: [
                        "<ScrollView>",
                        "<View>",
                        "<Text>",
                        "<Image>"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое bridge (мост) в React Native?",
                    options: [
                        "Мост через реку",
                        "Механизм связи между JavaScript и нативным кодом",
                        "Компонент",
                        "Стиль"
                    ],
                    correct: 1
                }
            ]
        }
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
        totalLessons: 10,
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
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 1: Введение в дизайн</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Что такое UI и UX?</h3>
                    <p><strong>UX (User Experience)</strong> — пользовательский опыт. Как человек взаимодействует с продуктом.</p>
                    <p><strong>UI (User Interface)</strong> — пользовательский интерфейс. Как выглядит продукт.</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 2rem 0;">
                        <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 12px;">
                            <h4 style="color: #0369a1;">🎯 UX вопросы:</h4>
                            <ul>
                                <li>Легко ли найти товар?</li>
                                <li>Понятно ли, как оформить заказ?</li>
                                <li>Быстро ли загружается сайт?</li>
                            </ul>
                        </div>
                        <div style="background: #fdf2f8; padding: 1.5rem; border-radius: 12px;">
                            <h4 style="color: #be185d;">🎨 UI вопросы:</h4>
                            <ul>
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
                    </ul>
                `
            },
            {
                id: 2,
                title: 'Основы Figma',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 2: Основы Figma</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Интерфейс Figma</h3>
                    <ul>
                        <li><strong>Toolbar</strong> — инструменты (Move, Scale, Shapes)</li>
                        <li><strong>Layers</strong> — слои и группы</li>
                        <li><strong>Properties</strong> — свойства выделенного объекта</li>
                        <li><strong>Assets</strong> — компоненты и стили</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Первые шаги</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>1. Создайте аккаунт на figma.com
2. Создайте новый файл
3. Создайте фрейм (Frame) — нажмите F
4. Выберите размер (например, iPhone 14)
5. Добавьте прямоугольник (Rectangle) — R
6. Добавьте текст (Text) — T</code>
                    </pre>
                `
            },
            {
                id: 3,
                title: 'Цвет и типографика',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 3: Цвет и типографика</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Теория цвета</h3>
                    <ul>
                        <li><strong>RGB</strong> — для цифровых экранов</li>
                        <li><strong>HEX</strong> — #6366f1</li>
                        <li><strong>HSL</strong> — hsl(240, 100%, 50%)</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Типографика</h3>
                    <ul>
                        <li><strong>Заголовки</strong> — Inter, Roboto, SF Pro</li>
                        <li><strong>Текст</strong> — Open Sans, Lato</li>
                        <li><strong>Размеры</strong> — 16px для текста, 24px+ для заголовков</li>
                    </ul>
                `
            },
            {
                id: 4,
                title: 'Сетки и композиция',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Сетки и композиция</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Виды сеток</h3>
                    <ul>
                        <li><strong>Колонки</strong> — 12 колонок для веба</li>
                        <li><strong>Модульная сетка</strong> — для карточек</li>
                        <li><strong>Базовая линия</strong> — для типографики</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Правила композиции</h3>
                    <ul>
                        <li>Правило третей</li>
                        <li>Золотое сечение</li>
                        <li>Воздух (negative space)</li>
                    </ul>
                `
            },
            {
                id: 5,
                title: 'Создание прототипов',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Создание прототипов</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Интерактивные прототипы</h3>
                    <ul>
                        <li><strong>Connections</strong> — связи между экранами</li>
                        <li><strong>Transitions</strong> — анимации переходов</li>
                        <li><strong>Smart Animate</strong> — умная анимация</li>
                    </ul>
                `
            },
            {
                id: 6,
                title: 'UI элементы',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: UI элементы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Кнопки</h3>
                    <ul>
                        <li>Primary — главное действие</li>
                        <li>Secondary — второстепенное</li>
                        <li>Disabled — неактивное состояние</li>
                    </ul>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Поля ввода</h3>
                    <ul>
                        <li>Default — обычное состояние</li>
                        <li>Focus — при фокусе</li>
                        <li>Error — при ошибке</li>
                        <li>Success — при успехе</li>
                    </ul>
                `
            },
            {
                id: 7,
                title: 'Дизайн мобильных приложений',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Дизайн мобильных приложений</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Особенности мобильных интерфейсов</h3>
                    <ul>
                        <li>Тач-цели (минимум 44x44 px)</li>
                        <li>Навигация (таб-бар, гамбургер)</li>
                        <li>Жесты (свайпы, тапы)</li>
                    </ul>
                `
            },
            {
                id: 8,
                title: 'Дизайн веб-сайтов',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Дизайн веб-сайтов</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Адаптивный дизайн</h3>
                    <ul>
                        <li>Desktop (1920px)</li>
                        <li>Tablet (768px)</li>
                        <li>Mobile (375px)</li>
                    </ul>
                `
            },
            {
                id: 9,
                title: 'Презентация проектов',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Презентация проектов</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Структура презентации</h3>
                    <ul>
                        <li>Проблема и решение</li>
                        <li>Исследование</li>
                        <li>Визуальный дизайн</li>
                        <li>Результаты</li>
                    </ul>
                `
            },
            {
                id: 10,
                title: 'Портфолио дизайнера',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Портфолио дизайнера</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Платформы</h3>
                    <ul>
                        <li>Behance</li>
                        <li>Dribbble</li>
                        <li>Личный сайт</li>
                    </ul>
                `
            }
        ],
        resources: [
            'Figma Basics.pdf',
            'Цветовые схемы.rar',
            'Шрифты для дизайна.zip'
        ],
        
        // ИТОГОВЫЙ ТЕСТ ДЛЯ DESIGN
        quiz: {
            title: "Итоговый тест: UI/UX Дизайн",
            description: "Проверьте свои знания по дизайну интерфейсов",
            passingScore: 70,
            questions: [
                {
                    question: "Что означает UX?",
                    options: [
                        "User Experience (пользовательский опыт)",
                        "User Interface (пользовательский интерфейс)",
                        "Universal XML",
                        "United Xperience"
                    ],
                    correct: 0
                },
                {
                    question: "Что означает UI?",
                    options: [
                        "User Experience",
                        "User Interface",
                        "Universal Interface",
                        "United Interface"
                    ],
                    correct: 1
                },
                {
                    question: "Какой инструмент самый популярный для дизайна интерфейсов?",
                    options: [
                        "Photoshop",
                        "Figma",
                        "Paint",
                        "Word"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое прототип в дизайне?",
                    options: [
                        "Готовый продукт",
                        "Интерактивная модель продукта",
                        "Код приложения",
                        "База данных"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое сетка (grid) в дизайне?",
                    options: [
                        "Сетка для ловли рыбы",
                        "Система для выравнивания элементов",
                        "Фотография",
                        "Шрифт"
                    ],
                    correct: 1
                },
                {
                    question: "Какие цвета считаются основными в RGB модели?",
                    options: [
                        "Красный, зеленый, синий",
                        "Красный, желтый, синий",
                        "Зеленый, желтый, черный",
                        "Белый, черный, серый"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое типографика?",
                    options: [
                        "Искусство оформления текста",
                        "Типография",
                        "Печатная машинка",
                        "Шрифт"
                    ],
                    correct: 0
                },
                {
                    question: "Какой размер шрифта обычно используется для основного текста?",
                    options: [
                        "8-10px",
                        "16-18px",
                        "24-30px",
                        "36-48px"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое контраст в дизайне?",
                    options: [
                        "Разница между элементами",
                        "Сходство элементов",
                        "Копирование элементов",
                        "Удаление элементов"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое юзабилити-тестирование?",
                    options: [
                        "Тестирование скорости",
                        "Тестирование удобства использования",
                        "Тестирование кода",
                        "Тестирование цвета"
                    ],
                    correct: 1
                }
            ]
        }
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
        totalLessons: 10,
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
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 1: Основы Python</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>print("Hello, World!")

# Переменные
name = "Python"
age = 30
is_fun = True

# Списки
numbers = [1, 2, 3, 4, 5]

# Словари
person = {
    "name": "Алексей",
    "age": 28,
    "city": "Москва"
}</code>
                    </pre>
                `
            },
            {
                id: 2,
                title: 'Типы данных Python',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 2: Типы данных Python</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Числа
x = 5
y = 3.14

# Строки
text = "Hello"

# Списки
list = [1, 2, 3]

# Кортежи
tuple = (1, 2, 3)

# Словари
dict = {"key": "value"}

# Множества
set = {1, 2, 3}</code>
                    </pre>
                `
            },
            {
                id: 3,
                title: 'Условные операторы',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 3: Условные операторы</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>age = 18

if age >= 18:
    print("Доступ разрешен")
elif age >= 16:
    print("Доступ с родителями")
else:
    print("Доступ запрещен")</code>
                    </pre>
                `
            },
            {
                id: 4,
                title: 'Циклы в Python',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Циклы в Python</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># for loop
for i in range(5):
    print(i)

# while loop
count = 0
while count < 5:
    print(count)
    count += 1</code>
                    </pre>
                `
            },
            {
                id: 5,
                title: 'Функции',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Функции</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>def greet(name):
    return f"Привет, {name}!"

def add(a, b):
    return a + b</code>
                    </pre>
                `
            },
            {
                id: 6,
                title: 'Работа с файлами',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: Работа с файлами</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Запись в файл
with open("data.txt", "w") as file:
    file.write("Hello, World!")

# Чтение из файла
with open("data.txt", "r") as file:
    content = file.read()</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Библиотека NumPy',
                duration: '60 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Библиотека NumPy</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())
print(arr.sum())
print(arr.max())</code>
                    </pre>
                `
            },
            {
                id: 8,
                title: 'Библиотека Pandas',
                duration: '65 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Библиотека Pandas</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())
print(df.describe())</code>
                    </pre>
                `
            },
            {
                id: 9,
                title: 'Визуализация данных',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Визуализация данных</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.title('График')
plt.show()</code>
                    </pre>
                `
            },
            {
                id: 10,
                title: 'Введение в ML',
                duration: '70 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Введение в ML</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)</code>
                    </pre>
                `
            }
        ],
        resources: [
            'Python для начинающих.pdf',
            'Jupyter Notebook setup.exe',
            'Датасеты для практики.zip'
        ],
        
        // ИТОГОВЫЙ ТЕСТ ДЛЯ PYTHON
        quiz: {
            title: "Итоговый тест: Python & Data Science",
            description: "Проверьте свои знания Python и анализа данных",
            passingScore: 70,
            questions: [
                {
                    question: "Какой оператор используется для возведения в степень в Python?",
                    options: [
                        "^",
                        "**",
                        "^^",
                        "pow()"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое Pandas?",
                    options: [
                        "Животное",
                        "Библиотека для анализа данных",
                        "Игра",
                        "Язык программирования"
                    ],
                    correct: 1
                },
                {
                    question: "Как создать список в Python?",
                    options: [
                        "{}",
                        "[]",
                        "()",
                        "<>"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое NumPy?",
                    options: [
                        "Библиотека для работы с массивами",
                        "База данных",
                        "Фреймворк",
                        "Игра"
                    ],
                    correct: 0
                },
                {
                    question: "Какой метод используется для чтения CSV файла в Pandas?",
                    options: [
                        "read_csv()",
                        "open_csv()",
                        "load_csv()",
                        "get_csv()"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое машинное обучение?",
                    options: [
                        "Обучение работе на машине",
                        "Область ИИ, где компьютер учится на данных",
                        "Ремонт машин",
                        "Вождение автомобиля"
                    ],
                    correct: 1
                },
                {
                    question: "Какая библиотека используется для визуализации данных?",
                    options: [
                        "Matplotlib",
                        "Pandas",
                        "NumPy",
                        "Scipy"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое DataFrame в Pandas?",
                    options: [
                        "Таблица с данными",
                        "График",
                        "Диаграмма",
                        "Число"
                    ],
                    correct: 0
                },
                {
                    question: "Какой тип обучения используется, когда данные размечены?",
                    options: [
                        "Обучение с учителем",
                        "Обучение без учителя",
                        "Обучение с подкреплением",
                        "Глубокое обучение"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое нейронная сеть?",
                    options: [
                        "Сеть для ловли рыбы",
                        "Математическая модель, имитирующая работу мозга",
                        "Компьютерная сеть",
                        "Интернет"
                    ],
                    correct: 1
                }
            ]
        }
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
        totalLessons: 10,
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
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 1: Java Core</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}</code>
                    </pre>
                `
            },
            {
                id: 2,
                title: 'Переменные и типы',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 2: Переменные и типы</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>int number = 42;
double price = 99.99;
boolean isActive = true;
String name = "Java";</code>
                    </pre>
                `
            },
            {
                id: 3,
                title: 'Условные операторы',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 3: Условные операторы</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>int age = 18;

if (age >= 18) {
    System.out.println("Доступ разрешен");
} else {
    System.out.println("Доступ запрещен");
}</code>
                    </pre>
                `
            },
            {
                id: 4,
                title: 'Циклы в Java',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Циклы в Java</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}</code>
                    </pre>
                `
            },
            {
                id: 5,
                title: 'Массивы',
                duration: '45 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Массивы</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];
names[0] = "Иван";</code>
                    </pre>
                `
            },
            {
                id: 6,
                title: 'Классы и объекты',
                duration: '60 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: Классы и объекты</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>public class Person {
    String name;
    int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void introduce() {
        System.out.println("Привет, я " + name);
    }
}</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Наследование',
                duration: '55 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Наследование</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>public class Student extends Person {
    String university;
    
    public Student(String name, int age, String university) {
        super(name, age);
        this.university = university;
    }
}</code>
                    </pre>
                `
            },
            {
                id: 8,
                title: 'Интерфейсы',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Интерфейсы</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>interface Drawable {
    void draw();
}

class Circle implements Drawable {
    public void draw() {
        System.out.println("Рисую круг");
    }
}</code>
                    </pre>
                `
            },
            {
                id: 9,
                title: 'Исключения',
                duration: '50 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Исключения</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Деление на ноль!");
} finally {
    System.out.println("Это выполнится всегда");
}</code>
                    </pre>
                `
            },
            {
                id: 10,
                title: 'Коллекции',
                duration: '60 мин',
                completed: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Коллекции</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import java.util.*;

List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");

Map<String, Integer> map = new HashMap<>();
map.put("age", 25);
map.put("score", 100);</code>
                    </pre>
                `
            }
        ],
        resources: [
            'Java Core.pdf',
            'IntelliJ IDEA setup.exe',
            'JDK 11 installer.exe'
        ],
        
        // ИТОГОВЫЙ ТЕСТ ДЛЯ JAVA
        quiz: {
            title: "Итоговый тест: Java разработка",
            description: "Проверьте свои знания Java Core и ООП",
            passingScore: 70,
            questions: [
                {
                    question: "Какая виртуальная машина исполняет Java код?",
                    options: [
                        "JVM (Java Virtual Machine)",
                        "JRE (Java Runtime Environment)",
                        "JDK (Java Development Kit)",
                        "JIT (Just In Time)"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое ООП?",
                    options: [
                        "Объектно-ориентированное программирование",
                        "Очень опасное программирование",
                        "Основы программирования",
                        "Общая операционная память"
                    ],
                    correct: 0
                },
                {
                    question: "Какое ключевое слово используется для создания объекта?",
                    options: [
                        "class",
                        "new",
                        "object",
                        "create"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое наследование в Java?",
                    options: [
                        "Получение денег",
                        "Механизм, позволяющий классу наследовать свойства другого класса",
                        "Копирование кода",
                        "Удаление класса"
                    ],
                    correct: 1
                },
                {
                    question: "Какое ключевое слово используется для наследования?",
                    options: [
                        "implements",
                        "extends",
                        "inherits",
                        "from"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое полиморфизм?",
                    options: [
                        "Способность объекта принимать разные формы",
                        "Много форм",
                        "Разные цвета",
                        "Многоугольник"
                    ],
                    correct: 0
                },
                {
                    question: "Какой метод является точкой входа в Java программу?",
                    options: [
                        "public void start()",
                        "public static void main(String[] args)",
                        "public void run()",
                        "public int main()"
                    ],
                    correct: 1
                },
                {
                    question: "Что такое инкапсуляция?",
                    options: [
                        "Сокрытие данных и методов внутри класса",
                        "Упаковка подарка",
                        "Капсула времени",
                        "Защита от вирусов"
                    ],
                    correct: 0
                },
                {
                    question: "Какие модификаторы доступа есть в Java?",
                    options: [
                        "public, private, protected",
                        "open, close, read",
                        "big, small, medium",
                        "red, green, blue"
                    ],
                    correct: 0
                },
                {
                    question: "Что такое интерфейс в Java?",
                    options: [
                        "Графический интерфейс",
                        "Совокупность абстрактных методов",
                        "Кнопка",
                        "Окно программы"
                    ],
                    correct: 1
                }
            ]
        }
    }
};

// ==================== ГЛОБАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ ТЕКУЩЕГО МОДАЛЬНОГО ОКНА ====================
let currentLessonModal = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizResults = JSON.parse(localStorage.getItem('quiz_results') || '{}');

// ==================== ФУНКЦИЯ ЗАГРУЗКИ СТРАНИЦЫ КУРСА ====================
function loadCoursePage() {
    // Получаем ID курса из URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (!courseId || !lessonsData[courseId]) {
        window.location.href = 'dashboard.html';
        return;
    }

    const course = lessonsData[courseId];
    const container = document.getElementById('courseContainer');
    
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
        
        <!-- Quiz Section -->
        <div class="quiz-section" id="quizSection" style="display: none;">
            <div class="quiz-header">
                <h2>📝 ${course.quiz ? course.quiz.title : 'Итоговый тест'}</h2>
                <p>${course.quiz ? course.quiz.description : 'Проверьте свои знания перед получением сертификата'}</p>
            </div>
            
            <div class="quiz-progress">
                <div class="quiz-progress-bar" id="quizProgressBar" style="width: 0%;"></div>
            </div>
            
            <div class="quiz-question" id="quizQuestion">
                <!-- Вопросы загружаются через JavaScript -->
            </div>
            
            <div class="quiz-actions">
                <button class="quiz-prev-btn" id="quizPrevBtn" onclick="prevQuestion()" style="display: none;">← Назад</button>
                <span class="quiz-counter" id="quizCounter">1/10</span>
                <button class="quiz-next-btn" id="quizNextBtn" onclick="nextQuestion()">Далее →</button>
                <button class="quiz-submit-btn" id="quizSubmitBtn" onclick="submitQuiz()" style="display: none;">📤 Отправить</button>
            </div>
            
            <div class="quiz-result" id="quizResult"></div>
        </div>
    `;
    
    // После загрузки страницы проверяем, все ли уроки пройдены
    if (course.completedLessons === course.totalLessons) {
        const quizSection = document.getElementById('quizSection');
        if (quizSection) {
            quizSection.style.display = 'block';
            initQuiz(courseId);
        }
    }
}

// ==================== QUIZ FUNCTIONS ====================

function initQuiz(courseId) {
    const course = lessonsData[courseId];
    if (!course.quiz) return;
    
    currentQuiz = course.quiz;
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(-1);
    
    // Загружаем предыдущие результаты если есть
    if (quizResults[courseId]) {
        showQuizResult(courseId, quizResults[courseId]);
        return;
    }
    
    showQuizQuestion();
}

function showQuizQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    const container = document.getElementById('quizQuestion');
    const counter = document.getElementById('quizCounter');
    const prevBtn = document.getElementById('quizPrevBtn');
    const nextBtn = document.getElementById('quizNextBtn');
    const submitBtn = document.getElementById('quizSubmitBtn');
    const progressBar = document.getElementById('quizProgressBar');
    
    if (!container || !counter || !prevBtn || !nextBtn || !submitBtn || !progressBar) return;
    
    // Обновляем счетчик
    counter.textContent = `${currentQuestionIndex + 1}/${currentQuiz.questions.length}`;
    
    // Обновляем прогресс бар
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Показываем/скрываем кнопки
    prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    
    const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
    nextBtn.style.display = isLastQuestion ? 'none' : 'block';
    submitBtn.style.display = isLastQuestion ? 'block' : 'none';
    
    // Отображаем вопрос и варианты
    let optionsHtml = '';
    question.options.forEach((option, index) => {
        const isSelected = userAnswers[currentQuestionIndex] === index;
        optionsHtml += `
            <label class="quiz-option ${isSelected ? 'selected' : ''}">
                <input type="radio" name="quiz-option" value="${index}" 
                       ${isSelected ? 'checked' : ''} onchange="selectAnswer(${index})">
                <span>${option}</span>
            </label>
        `;
    });
    
    container.innerHTML = `
        <h3>${question.question}</h3>
        <div class="quiz-options">
            ${optionsHtml}
        </div>
    `;
}

window.selectAnswer = function(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
    
    // Обновляем выделение
    document.querySelectorAll('.quiz-option').forEach((opt, idx) => {
        if (idx === answerIndex) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
}

window.nextQuestion = function() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        showQuizQuestion();
    }
}

window.prevQuestion = function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuizQuestion();
    }
}

window.submitQuiz = function() {
    // Проверяем, что на все вопросы даны ответы
    const unanswered = userAnswers.filter(a => a === -1).length;
    
    if (unanswered > 0) {
        alert(`Пожалуйста, ответьте на все вопросы. Осталось: ${unanswered}`);
        return;
    }
    
    // Подсчитываем результаты
    let correctCount = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctCount++;
        }
    });
    
    const percentage = Math.round((correctCount / currentQuiz.questions.length) * 100);
    const passed = percentage >= currentQuiz.passingScore;
    
    // Сохраняем результат
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    quizResults[courseId] = {
        passed: passed,
        score: percentage,
        correct: correctCount,
        total: currentQuiz.questions.length,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('quiz_results', JSON.stringify(quizResults));
    
    // Показываем результат
    showQuizResult(courseId, quizResults[courseId]);
}

function showQuizResult(courseId, result) {
    const resultDiv = document.getElementById('quizResult');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizActions = document.querySelector('.quiz-actions');
    
    if (!resultDiv || !quizQuestion || !quizActions) return;
    
    quizQuestion.style.display = 'none';
    quizActions.style.display = 'none';
    
    if (result.passed) {
        resultDiv.className = 'quiz-result success';
        resultDiv.innerHTML = `
            <h3>🎉 Поздравляем!</h3>
            <p>Вы набрали ${result.score}% (${result.correct}/${result.total} правильных ответов)</p>
            <p>Тест пройден успешно!</p>
            <button class="quiz-submit-btn" onclick="showCertificate('${courseId}')" style="margin-top: 1rem; display: inline-block;">
                🎓 Получить сертификат
            </button>
        `;
    } else {
        resultDiv.className = 'quiz-result fail';
        resultDiv.innerHTML = `
            <h3>😔 Тест не пройден</h3>
            <p>Вы набрали ${result.score}% (${result.correct}/${result.total} правильных ответов)</p>
            <p>Проходной балл: ${currentQuiz.passingScore}%</p>
            <button class="quiz-submit-btn" onclick="resetQuiz('${courseId}')" style="margin-top: 1rem; background: var(--gradient);">
                🔄 Попробовать снова
            </button>
        `;
    }
    
    resultDiv.style.display = 'block';
}

window.resetQuiz = function(courseId) {
    delete quizResults[courseId];
    localStorage.setItem('quiz_results', JSON.stringify(quizResults));
    
    const resultDiv = document.getElementById('quizResult');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizActions = document.querySelector('.quiz-actions');
    
    if (resultDiv) resultDiv.style.display = 'none';
    if (quizQuestion) quizQuestion.style.display = 'block';
    if (quizActions) quizActions.style.display = 'flex';
    
    initQuiz(courseId);
}

// ==================== ПОЛНОЭКРАННЫЙ СЕРТИФИКАТ ====================
window.showCertificate = function(courseId) {
    const course = lessonsData[courseId];
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('ru-RU');
    const certNumber = `LRN-${today.getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 32px;
            width: 100%;
            max-width: 1000px;
            max-height: 95vh;
            overflow-y: auto;
            position: relative;
            box-shadow: var(--shadow-xl);
            animation: certificateZoom 0.5s ease;
        ">
            <!-- Кнопка закрытия -->
            <button onclick="this.closest('div[style*=\\'fixed\\']').remove()" style="
                position: absolute;
                right: 20px;
                top: 20px;
                background: var(--gray-light);
                border: none;
                font-size: 2rem;
                cursor: pointer;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                transition: all 0.3s;
            " onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='var(--gray-light)'">×</button>
            
            <!-- Полноэкранный сертификат -->
            <div class="certificate-full" style="padding: 3rem;">
                <div class="certificate-header-full">
                    <div class="certificate-icon-full">🎓</div>
                    <h2>СЕРТИФИКАТ ОБ ОКОНЧАНИИ</h2>
                </div>
                
                <div class="certificate-body-full">
                    <div class="certificate-label">НАСТОЯЩИЙ СЕРТИФИКАТ ПОДТВЕРЖДАЕТ, ЧТО</div>
                    <div class="student-name-full">${user.firstName} ${user.lastName}</div>
                    <div class="certificate-text">успешно завершил(а) курс</div>
                    <div class="course-name-full">${course.title}</div>
                    
                    <div class="certificate-date-full">
                        <span><strong>Дата:</strong> ${dateStr}</span>
                        <span><strong>№</strong> ${certNumber}</span>
                    </div>
                </div>
                
                <div class="certificate-footer-full">
                    <div class="signature-full">
                        <div class="signature-line"></div>
                        <p>А. Иванов</p>
                        <p>Директор LearnPro</p>
                    </div>
                    
                    <div class="certificate-seal-full">
                        <div class="seal-circle">✓</div>
                        <div class="seal-text">OFFICIAL SEAL</div>
                    </div>
                    
                    <div class="signature-full">
                        <div class="signature-line"></div>
                        <p>М. Петрова</p>
                        <p>Академический директор</p>
                    </div>
                </div>
            </div>
            
            <!-- Кнопки действий -->
            <div class="certificate-actions-full">
                <button class="download-pdf-btn" onclick="window.downloadCertificatePDF('${courseId}')">
                    📥 Скачать PDF
                </button>
                <button class="share-certificate-btn" onclick="window.shareCertificateFull()">
                    📤 Поделиться
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    disableBodyScroll();
}

window.downloadCertificatePDF = function(courseId) {
    const course = lessonsData[courseId];
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('ru-RU');
    const certNumber = `LRN-${today.getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    
    // Создаем элемент сертификата
    const certificateElement = document.createElement('div');
    certificateElement.style.cssText = `
        width: 800px;
        padding: 40px;
        background: white;
        font-family: 'Times New Roman', serif;
        position: absolute;
        left: -9999px;
        top: -9999px;
    `;
    
    certificateElement.innerHTML = `
        <div style="background: linear-gradient(135deg, #fff 0%, #f8fafc 100%); padding: 40px; border: 8px double #6366f1;">
            <div style="text-align: center;">
                <div style="font-size: 60px;">🎓</div>
                <h1 style="font-size: 36px; color: #6366f1;">СЕРТИФИКАТ ОБ ОКОНЧАНИИ</h1>
                <p style="font-size: 18px; color: #64748b; margin: 20px 0;">Настоящий сертификат подтверждает, что</p>
                <h2 style="font-size: 40px; color: #8b5cf6; margin: 20px 0;">${user.firstName} ${user.lastName}</h2>
                <p style="font-size: 18px; color: #64748b;">успешно завершил(а) курс</p>
                <h3 style="font-size: 32px; color: #0f172a; margin: 20px 0;">${course.title}</h3>
                <div style="margin: 30px 0;">
                    <p><strong>Дата:</strong> ${dateStr}</p>
                    <p><strong>№</strong> ${certNumber}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(certificateElement);
    
    showNotification('🔄 Генерация PDF...');
    
    // Конвертируем в PDF с помощью html2canvas и jsPDF
    html2canvas(certificateElement, {
        scale: 2,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width / 2, canvas.height / 2]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save(`certificate_${course.title.replace(/[^a-zа-я0-9]/gi, '_')}.pdf`);
        
        document.body.removeChild(certificateElement);
        showNotification('✅ PDF сертификат скачан!');
        
        const modal = document.querySelector('div[style*="fixed"][style*="background: rgba(0,0,0,0.9)"]');
        if (modal) {
            modal.remove();
            enableBodyScroll();
        }
    });

    
    // Создаем Blob и скачиваем
    const blob = new Blob([certificateHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificate_${course.title.replace(/[^a-zа-я0-9]/gi, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Показываем уведомление
    showNotification('✅ PDF сертификат скачан!');
    
    // Закрываем модальное окно
    const modal = document.querySelector('div[style*="fixed"][style*="background: rgba(0,0,0,0.9)"]');
    if (modal) modal.remove();
    enableBodyScroll();
}

// Функция для уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--gradient);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: var(--shadow-xl);
        z-index: 100001;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <span style="font-size: 1.5rem;">✅</span>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 1.2rem;
            padding: 5px 10px;
            border-radius: 8px;
            cursor: pointer;
            margin-left: 15px;
        ">✕</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Функция для поделиться
window.shareCertificateFull = function() {
    const studentName = document.querySelector('.student-name-full')?.textContent || 'Студент';
    const courseName = document.querySelector('.course-name-full')?.textContent || 'Курс';
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой сертификат LearnPro',
            text: `Я успешно завершил курс "${courseName}" на платформе LearnPro! 🎓`,
            url: window.location.href
        });
    } else {
        // Копируем текст в буфер обмена
        const text = `Я успешно завершил курс "${courseName}" на платформе LearnPro! 🎓`;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('✅ Текст скопирован в буфер обмена');
        });
    }
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
        
        // Закрываем модальное окно если открыто
        if (currentLessonModal) {
            currentLessonModal.remove();
            currentLessonModal = null;
        }
        
        loadCoursePage();
        
        // Проверяем, все ли уроки пройдены
        if (course.completedLessons === course.totalLessons) {
            setTimeout(() => {
                const quizSection = document.getElementById('quizSection');
                if (quizSection) {
                    quizSection.style.display = 'block';
                    initQuiz(courseId);
                    
                    // Плавный скролл к опросу
                    quizSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        }
    }
}

window.downloadResource = function(resourceName) {
    // Определяем содержимое файла в зависимости от названия
    let content = '';
    let filename = resourceName;
    
    if (resourceName.includes('Все материалы курса.zip')) {
        content = 'Это архив со всеми материалами курса:\n- Презентации\n- Исходный код\n- Дополнительные материалы\n- Домашние задания';
        filename = 'vse_materialy_kursa.txt';
    } 
    else if (resourceName.includes('Шпаргалка по React.pdf')) {
        content = `РЕАКТ ШПАРГАЛКА
=================

КОМПОНЕНТЫ
----------
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

ХУКИ
----
useState - состояние
useEffect - эффекты
useContext - контекст

JSX
---
- className вместо class
- htmlFor вместо for
- {} для JavaScript выражений

ПРОПСЫ
------
<Welcome name="Иван" age={25} />

СОСТОЯНИЕ
---------
const [count, setCount] = useState(0);

ЭФФЕКТЫ
-------
useEffect(() => {
  // код
  return () => // очистка
}, [зависимости]);`;
        filename = 'react_cheatsheet.txt';
    }
    else if (resourceName.includes('Домашние задания.pdf')) {
        content = `ДОМАШНИЕ ЗАДАНИЯ
=================

Урок 1: JavaScript
------------------
1. Создайте переменные с вашими данными
2. Напишите функцию приветствия
3. Создайте объект "студент"

Урок 2: React
-------------
1. Создайте компонент Card
2. Добавьте пропсы
3. Добавьте состояние

Урок 3: Компоненты
------------------
1. Создайте список задач
2. Добавьте возможность добавления
3. Добавьте удаление`;
        filename = 'domashnie_zadaniya.txt';
    }
    else if (resourceName.includes('Полезные ссылки.txt')) {
        content = `ПОЛЕЗНЫЕ ССЫЛКИ
================

ДОКУМЕНТАЦИЯ
------------
React: https://react.dev
JavaScript: https://developer.mozilla.org/ru/
Node.js: https://nodejs.org/

ИНСТРУМЕНТЫ
-----------
VS Code: https://code.visualstudio.com/
Git: https://git-scm.com/
Figma: https://figma.com

СООБЩЕСТВА
----------
Stack Overflow: https://stackoverflow.com/
Habr: https://habr.com/
GitHub: https://github.com/`;
        filename = 'poleznye_ssylki.txt';
    }
    else if (resourceName.includes('Настройка окружения.pdf')) {
        content = `НАСТРОЙКА ОКРУЖЕНИЯ
===================

1. Установка Node.js
2. Установка React Native CLI
3. Настройка Android Studio
4. Настройка эмулятора
5. Создание первого проекта`;
        filename = 'nastroyka_okruzheniya.txt';
    }
    else if (resourceName.includes('React Native Cheatsheet.pdf')) {
        content = `REACT NATIVE ШПАРГАЛКА
========================

КОМПОНЕНТЫ
----------
View - контейнер
Text - текст
ScrollView - скролл
FlatList - список

СТИЛИ
-----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

НАВИГАЦИЯ
---------
npm install @react-navigation/native

АСИНХРОННОСТЬ
-------------
fetch('url')
  .then(res => res.json())
  .then(data => setData(data));`;
        filename = 'react_native_cheatsheet.txt';
    }
    else if (resourceName.includes('Python для начинающих.pdf')) {
        content = `PYTHON ДЛЯ НАЧИНАЮЩИХ
======================

ПЕРЕМЕННЫЕ
----------
name = "Python"
age = 30
is_fun = True

СПИСКИ
------
numbers = [1, 2, 3, 4, 5]

СЛОВАРИ
-------
person = {"name": "Анна", "age": 25}

УСЛОВИЯ
-------
if age >= 18:
    print("Взрослый")

ЦИКЛЫ
-----
for i in range(5):
    print(i)`;
        filename = 'python_basics.txt';
    }
    else if (resourceName.includes('Java Core.pdf')) {
        content = `JAVA CORE
=========

ПЕРВАЯ ПРОГРАММА
----------------
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}

ТИПЫ ДАННЫХ
-----------
int number = 42;
double price = 99.99;
boolean flag = true;
String text = "Java";

УСЛОВИЯ
-------
if (age >= 18) {
    System.out.println("Доступ разрешен");
}

ЦИКЛЫ
-----
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`;
        filename = 'java_core.txt';
    }
    else {
        content = `Файл: ${resourceName}\n\nСодержимое файла будет доступно в ближайшее время.`;
        filename = resourceName.replace(/[^a-zа-яё0-9.]/gi, '_').toLowerCase() + '.txt';
    }
    
    // Создаем и скачиваем файл
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification(`📥 Скачивание: ${resourceName}`);
}

// Функция для уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--gradient);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: var(--shadow-xl);
        z-index: 99999;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <span style="font-size: 1.5rem;">✅</span>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 1.2rem;
            padding: 5px 10px;
            border-radius: 8px;
            cursor: pointer;
            margin-left: 15px;
        ">✕</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

window.showTextLesson = function(courseId, lessonId) {
    // Закрываем предыдущее модальное окно, если оно открыто
    if (currentLessonModal) {
        currentLessonModal.remove();
        currentLessonModal = null;
    }
    
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
        animation: fadeIn 0.3s ease;
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
                            <h2 style="font-size: 1.5rem; margin-bottom: 0.3rem;">Урок ${lesson.id}: ${lesson.title}</h2>
                            <p style="opacity: 0.9;">${course.title}</p>
                        </div>
                    </div>
                    <button onclick="window.closeLessonModal()" style="
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
                ${lesson.content}
                
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
    currentLessonModal = modal;
}

// Функция для закрытия модального окна
window.closeLessonModal = function() {
    if (currentLessonModal) {
        currentLessonModal.remove();
        currentLessonModal = null;
    }
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
        
        // Закрываем текущее модальное окно
        window.closeLessonModal();
        
        if (nextLesson) {
            window.showTextLesson(courseId, lessonId + 1);
        }
        
        loadCoursePage();
    }
}

// Вспомогательные функции для скролла
function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
}

function enableBodyScroll() {
    document.body.style.overflow = '';
}

// Выход из системы
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==================== ЗАГРУЗКА СТРАНИЦЫ ====================
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
        
        // Закрываем модальное окно если открыто
        if (currentLessonModal) {
            currentLessonModal.remove();
            currentLessonModal = null;
        }
        
        loadCoursePage();
    }
}

window.downloadResource = function(resourceName) {
    // Определяем содержимое файла в зависимости от названия
    let content = '';
    let filename = resourceName;
    
    if (resourceName.includes('Все материалы курса.zip')) {
        content = 'Это архив со всеми материалами курса:\n- Презентации\n- Исходный код\n- Дополнительные материалы\n- Домашние задания';
        filename = 'vse_materialy_kursa.txt';
    } 
    else if (resourceName.includes('Шпаргалка по React.pdf')) {
        content = `РЕАКТ ШПАРГАЛКА
=================

КОМПОНЕНТЫ
----------
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

ХУКИ
----
useState - состояние
useEffect - эффекты
useContext - контекст

JSX
---
- className вместо class
- htmlFor вместо for
- {} для JavaScript выражений

ПРОПСЫ
------
<Welcome name="Иван" age={25} />

СОСТОЯНИЕ
---------
const [count, setCount] = useState(0);

ЭФФЕКТЫ
-------
useEffect(() => {
  // код
  return () => // очистка
}, [зависимости]);`;
        filename = 'react_cheatsheet.txt';
    }
    else if (resourceName.includes('Домашние задания.pdf')) {
        content = `ДОМАШНИЕ ЗАДАНИЯ
=================

Урок 1: JavaScript
------------------
1. Создайте переменные с вашими данными
2. Напишите функцию приветствия
3. Создайте объект "студент"

Урок 2: React
-------------
1. Создайте компонент Card
2. Добавьте пропсы
3. Добавьте состояние

Урок 3: Компоненты
------------------
1. Создайте список задач
2. Добавьте возможность добавления
3. Добавьте удаление`;
        filename = 'domashnie_zadaniya.txt';
    }
    else if (resourceName.includes('Полезные ссылки.txt')) {
        content = `ПОЛЕЗНЫЕ ССЫЛКИ
================

ДОКУМЕНТАЦИЯ
------------
React: https://react.dev
JavaScript: https://developer.mozilla.org/ru/
Node.js: https://nodejs.org/

ИНСТРУМЕНТЫ
-----------
VS Code: https://code.visualstudio.com/
Git: https://git-scm.com/
Figma: https://figma.com

СООБЩЕСТВА
----------
Stack Overflow: https://stackoverflow.com/
Habr: https://habr.com/
GitHub: https://github.com/`;
        filename = 'poleznye_ssylki.txt';
    }
    else if (resourceName.includes('Настройка окружения.pdf')) {
        content = `НАСТРОЙКА ОКРУЖЕНИЯ
===================

1. Установка Node.js
2. Установка React Native CLI
3. Настройка Android Studio
4. Настройка эмулятора
5. Создание первого проекта`;
        filename = 'nastroyka_okruzheniya.txt';
    }
    else if (resourceName.includes('React Native Cheatsheet.pdf')) {
        content = `REACT NATIVE ШПАРГАЛКА
========================

КОМПОНЕНТЫ
----------
View - контейнер
Text - текст
ScrollView - скролл
FlatList - список

СТИЛИ
-----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

НАВИГАЦИЯ
---------
npm install @react-navigation/native

АСИНХРОННОСТЬ
-------------
fetch('url')
  .then(res => res.json())
  .then(data => setData(data));`;
        filename = 'react_native_cheatsheet.txt';
    }
    else if (resourceName.includes('Python для начинающих.pdf')) {
        content = `PYTHON ДЛЯ НАЧИНАЮЩИХ
======================

ПЕРЕМЕННЫЕ
----------
name = "Python"
age = 30
is_fun = True

СПИСКИ
------
numbers = [1, 2, 3, 4, 5]

СЛОВАРИ
-------
person = {"name": "Анна", "age": 25}

УСЛОВИЯ
-------
if age >= 18:
    print("Взрослый")

ЦИКЛЫ
-----
for i in range(5):
    print(i)`;
        filename = 'python_basics.txt';
    }
    else if (resourceName.includes('Java Core.pdf')) {
        content = `JAVA CORE
=========

ПЕРВАЯ ПРОГРАММА
----------------
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}

ТИПЫ ДАННЫХ
-----------
int number = 42;
double price = 99.99;
boolean flag = true;
String text = "Java";

УСЛОВИЯ
-------
if (age >= 18) {
    System.out.println("Доступ разрешен");
}

ЦИКЛЫ
-----
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`;
        filename = 'java_core.txt';
    }
    else {
        content = `Файл: ${resourceName}\n\nСодержимое файла будет доступно в ближайшее время.`;
        filename = resourceName.replace(/[^a-zа-яё0-9.]/gi, '_').toLowerCase() + '.txt';
    }
    
    // Создаем и скачиваем файл
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Показываем уведомление
    showNotification(`📥 Скачивание: ${resourceName}`);
}

// Функция для уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--gradient);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: var(--shadow-xl);
        z-index: 99999;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <span style="font-size: 1.5rem;">✅</span>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 1.2rem;
            padding: 5px 10px;
            border-radius: 8px;
            cursor: pointer;
            margin-left: 15px;
        ">✕</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ИСПРАВЛЕННАЯ ФУНКЦИЯ - предыдущий урок автоматически закрывается
window.showTextLesson = function(courseId, lessonId) {
    // Закрываем предыдущее модальное окно, если оно открыто
    if (currentLessonModal) {
        currentLessonModal.remove();
        currentLessonModal = null;
    }
    
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
        animation: fadeIn 0.3s ease;
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
                            <h2 style="font-size: 1.5rem; margin-bottom: 0.3rem;">Урок ${lesson.id}: ${lesson.title}</h2>
                            <p style="opacity: 0.9;">${course.title}</p>
                        </div>
                    </div>
                    <button onclick="window.closeLessonModal()" style="
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
                ${lesson.content}
                
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
    currentLessonModal = modal;
}

// Функция для закрытия модального окна
window.closeLessonModal = function() {
    if (currentLessonModal) {
        currentLessonModal.remove();
        currentLessonModal = null;
    }
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
        
        // Закрываем текущее модальное окно
        window.closeLessonModal();
        
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
    // Проверяем авторизацию
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (!user.email) {
        window.location.href = 'index.html';
        return;
    }
    
    // Загружаем страницу курса
    loadCoursePage();
});
