// Данные курсов
const coursesData = [
    {
        id: 'fullstack',
        title: 'Fullstack-разработка',
        category: 'programming',
        icon: '💻',
        level: 'С нуля до PRO',
        duration: '6 месяцев',
        description: 'Освойте полный цикл веб-разработки: фронтенд, бэкенд и базы данных',
        features: [
            'JavaScript и современные фреймворки',
            'Node.js и Express',
            'React и Vue.js',
            'MongoDB и PostgreSQL',
            'Docker и DevOps',
            '6 реальных проектов в портфолио'
        ],
        price: 25000,
        oldPrice: 35000,
        popular: true
    },
    {
        id: 'mobile',
        title: 'Мобильная разработка',
        category: 'mobile',
        icon: '📱',
        level: 'Для начинающих',
        duration: '5 месяцев',
        description: 'Создавайте приложения для iOS и Android с помощью React Native',
        features: [
            'React Native с нуля',
            'Нативные модули',
            'Работа с API',
            'Публикация в AppStore/Google Play',
            'UI/UX для мобильных',
            '4 готовых приложения'
        ],
        price: 22000,
        oldPrice: 30000,
        popular: false
    },
    {
        id: 'design',
        title: 'UI/UX Дизайн',
        category: 'design',
        icon: '🎨',
        level: 'С нуля',
        duration: '4 месяца',
        description: 'Научитесь создавать интерфейсы, которые нравятся пользователям',
        features: [
            'Figma и Adobe XD',
            'Прототипирование',
            'Дизайн-системы',
            'User Research',
            'Анимация интерфейсов',
            '5 кейсов в портфолио'
        ],
        price: 18000,
        oldPrice: 25000,
        popular: true
    },
    {
        id: 'python',
        title: 'Python & Data Science',
        category: 'data',
        icon: '🐍',
        level: 'Продвинутый',
        duration: '7 месяцев',
        description: 'Станьте специалистом по данным и машинному обучению',
        features: [
            'Python для анализа данных',
            'Pandas и NumPy',
            'Машинное обучение',
            'Нейросети и TensorFlow',
            'Визуализация данных',
            '3 реальных датасета'
        ],
        price: 30000,
        oldPrice: 40000,
        popular: false
    },
    {
        id: 'java',
        title: 'Java разработка',
        category: 'programming',
        icon: '☕',
        level: 'Для начинающих',
        duration: '6 месяцев',
        description: 'Освойте один из самых популярных языков для enterprise-разработки',
        features: [
            'Java Core и OOP',
            'Spring Framework',
            'Базы данных и Hibernate',
            'Микросервисы',
            'Тестирование',
            '4 enterprise-проекта'
        ],
        price: 28000,
        oldPrice: 36000,
        popular: false
    }
];

// Текущий выбранный курс для оплаты
let selectedCourse = null;

// Загрузка каталога курсов
function loadCoursesCatalog() {
    const catalogContainer = document.getElementById('courseCatalog');
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const userCourses = user.courses || [];

    catalogContainer.innerHTML = coursesData.map(course => {
        const isEnrolled = userCourses.includes(course.id);
        
        return `
            <div class="catalog-course-card" data-category="${course.category}">
                ${course.popular ? '<div class="course-badge">🔥 Популярный</div>' : ''}
                <div class="course-icon">${course.icon}</div>
                <div class="course-level">${course.level}</div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                
                <div class="course-duration">
                    <span>⏱️ ${course.duration}</span>
                </div>
                
                <ul class="course-features-list">
                    ${course.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <div class="course-price-section">
                    <div>
                        <span class="course-price">${course.price.toLocaleString()}₽</span>
                        ${course.oldPrice ? `<span class="course-old-price">${course.oldPrice.toLocaleString()}₽</span>` : ''}
                    </div>
                    <button class="subscribe-btn ${isEnrolled ? 'enrolled' : ''}" 
                            onclick="${isEnrolled ? 'startLearning(\'' + course.id + '\')' : 'showPaymentModal(\'' + course.id + '\')'}">
                        ${isEnrolled ? '🎓 Начать обучение' : '💳 Оформить подписку'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Фильтрация курсов
function filterCourses(category) {
    const cards = document.querySelectorAll('.catalog-course-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Обновляем активную кнопку фильтра
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Показываем/скрываем карточки
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Показать модальное окно оплаты
function showPaymentModal(courseId) {
    selectedCourse = coursesData.find(course => course.id === courseId);
    if (!selectedCourse) return;

    // Обновляем данные в модальном окне
    document.getElementById('paymentCourseTitle').textContent = selectedCourse.title;
    document.getElementById('paymentCoursePrice').textContent = selectedCourse.price.toLocaleString() + '₽';
    document.getElementById('paymentAmount').textContent = selectedCourse.price.toLocaleString() + '₽';
    document.getElementById('summaryCourseName').textContent = selectedCourse.title;
    document.getElementById('finalAmount').textContent = selectedCourse.price.toLocaleString() + '₽';
    document.getElementById('totalAmount').textContent = selectedCourse.price.toLocaleString() + '₽';

    // Сбрасываем форму
    document.getElementById('cardNumber').value = '';
    document.getElementById('cardExpiry').value = '';
    document.getElementById('cardCvc').value = '';
    document.getElementById('cardHolder').value = '';
    
    // Показываем модальное окно
    document.getElementById('paymentModal').style.display = 'block';
}

// Закрыть модальное окно оплаты
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    selectedCourse = null;
}

// Обработка оплаты с анимацией
function processPayment() {
    if (!selectedCourse) {
        showPaymentError('Курс не выбран!');
        return;
    }
    
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvc = document.getElementById('cardCvc').value;
    const cardHolder = document.getElementById('cardHolder').value;
    
    // Базовая валидация
    if (!cardNumber || !cardExpiry || !cardCvc || !cardHolder) {
        showPaymentError('Заполните все поля карты');
        return;
    }
    
    // Показываем загрузку
    const payBtn = document.querySelector('.pay-now-btn-compact');
    const originalText = payBtn.innerHTML;
    payBtn.classList.add('loading');
    payBtn.innerHTML = '<span class="btn-text">Обрабатываем оплату...</span>';
    
    // Имитация процесса оплаты
    setTimeout(() => {
        // Успешная оплата
        payBtn.classList.remove('loading');
        payBtn.innerHTML = '<span class="btn-text">✅ Оплата прошла успешно!</span>';
        
        setTimeout(() => {
            alert(`🎉 Курс "${selectedCourse.title}" успешно приобретен!`);
            
            // Добавляем курс пользователю
            const user = JSON.parse(sessionStorage.getItem('currentUser'));
            if (user && !user.courses.includes(selectedCourse.id)) {
                user.courses.push(selectedCourse.id);
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                updateUserInStorage(user);
            }
            
            closePaymentModal();
            
            // Обновляем каталог и перенаправляем
            setTimeout(() => {
                loadCoursesCatalog();
                window.location.href = 'dashboard.html';
            }, 500);
            
        }, 1000);
        
    }, 2000);
}

// Функция показа ошибки оплаты
function showPaymentError(message) {
    const payBtn = document.querySelector('.pay-now-btn-compact');
    payBtn.classList.add('error');
    payBtn.innerHTML = `<span class="btn-text">❌ ${message}</span>`;
    
    setTimeout(() => {
        payBtn.classList.remove('error');
        payBtn.innerHTML = `
            <span class="btn-text">💳 Оплатить</span>
            <span class="btn-amount">${selectedCourse.price.toLocaleString()}₽</span>
        `;
    }, 2000);
}

// Начать обучение (для уже оплаченных курсов)
function startLearning(courseId) {
    alert(`Запускаем курс "${coursesData.find(c => c.id === courseId)?.title}"! 🚀`);
}

// Обновить пользователя в localStorage
function updateUserInStorage(updatedUser) {
    const users = JSON.parse(localStorage.getItem('learnpro_users')) || [];
    const userIndex = users.findIndex(u => u.email === updatedUser.email);
    
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('learnpro_users', JSON.stringify(users));
    }
}

// Выход из системы
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (!user.email) {
        window.location.href = 'index.html';
        return;
    }
    
    loadCoursesCatalog();
});

// Обработчики закрытия модальных окон
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        if (event.target.id === 'paymentModal') {
            closePaymentModal();
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal && paymentModal.style.display === 'block') {
            closePaymentModal();
        }
    }
});

// Плавная фильтрация курсов
function filterCourses(category) {
    const cards = document.querySelectorAll('.catalog-course-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Обновляем активную кнопку фильтра
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Плавное скрытие/показ карточек
    cards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            // Показываем карточку с задержкой для анимации
            setTimeout(() => {
                card.style.display = 'block';
                card.classList.remove('hidden');
                card.classList.add('visible');
            }, index * 100);
        } else {
            // Скрываем карточку
            card.classList.remove('visible');
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}
