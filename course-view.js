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
        progress: 0,
        completedLessons: 0,
        totalLessons: 10,
        currentLesson: 'Введение в JavaScript',
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
                completed: false,
                isCurrent: true,
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
                completed: false,
                isCurrent: false,
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
let notDefined = undefined;</code>
                    </pre>
                `
            },
            {
                id: 3,
                title: 'Функции в JavaScript',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
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
};</code>
                    </pre>
                `
            },
            {
                id: 4,
                title: 'Условные операторы',
                duration: '40 мин',
                completed: false,
                isCurrent: false,
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
}</code>
                    </pre>
                `
            },
            {
                id: 5,
                title: 'Циклы в JavaScript',
                duration: '45 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Циклы в JavaScript</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">for</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Классический for
for (let i = 0; i < 5; i++) {
    console.log("Итерация: " + i);
}</code>
                    </pre>
                `
            },
            {
                id: 6,
                title: 'Массивы и методы',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: Массивы и методы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Создание массивов</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>// Литерал массива
let numbers = [1, 2, 3, 4, 5];

// Конструктор
let fruits = new Array("яблоко", "банан", "апельсин");</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Объекты и методы',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
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
};</code>
                    </pre>
                `
            },
            {
                id: 8,
                title: 'Введение в React',
                duration: '60 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Введение в React</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">⚛️ Что такое React?</h3>
                        <p>React — библиотека для создания пользовательских интерфейсов. Разработана компанией Facebook в 2013 году.</p>
                    </div>
                `
            },
            {
                id: 9,
                title: 'Компоненты и пропсы',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Компоненты и пропсы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Функциональные компоненты</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>function Greeting(props) {
    return &lt;h1&gt;Привет, {props.name}!&lt;/h1&gt;
}</code>
                    </pre>
                `
            },
            {
                id: 10,
                title: 'Состояние и хуки',
                duration: '65 мин',
                completed: false,
                isCurrent: false,
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
                `
            }
        ],
        resources: [
            'Все материалы курса.zip',
            'Шпаргалка по React.pdf',
            'Домашние задания.pdf',
            'Полезные ссылки.txt'
        ],
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
        progress: 0,
        completedLessons: 0,
        totalLessons: 10,
        currentLesson: 'Введение в React Native',
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
                completed: false,
                isCurrent: true,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 1: Введение в React Native</h2>
                    
                    <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 0.5rem;">📱 Что такое React Native?</h3>
                        <p>React Native — фреймворк от Facebook для создания нативных мобильных приложений с использованием JavaScript и React.</p>
                    </div>
                `
            },
            {
                id: 2,
                title: 'Настройка окружения',
                duration: '60 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 2: Настройка окружения</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">1. Установка Node.js</h3>
                    <p>Скачайте и установите Node.js с официального сайта (рекомендуется LTS версия).</p>
                `
            },
            {
                id: 3,
                title: 'Компоненты React Native',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 3: Компоненты React Native</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Базовые компоненты</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { View, Text } from 'react-native';

const App = () => {
  return (
    &lt;View&gt;
      &lt;Text&gt;Hello World!&lt;/Text&gt;
    &lt;/View&gt;
  );
};</code>
                    </pre>
                `
            },
            {
                id: 4,
                title: 'Стилизация в React Native',
                duration: '45 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Стилизация в React Native</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Навигация в приложении</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Установка React Navigation</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>npm install @react-navigation/native</code>
                    </pre>
                `
            },
            {
                id: 6,
                title: 'Работа с API',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: Работа с API</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Fetch API</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => setData(json));</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Хранилище данных',
                duration: '45 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Хранилище данных</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">AsyncStorage</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('key', JSON.stringify(value));</code>
                    </pre>
                `
            },
            {
                id: 8,
                title: 'Камера и галерея',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Камера и галерея</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Установка react-native-image-picker</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>npm install react-native-image-picker</code>
                    </pre>
                `
            },
            {
                id: 9,
                title: 'Публикация в Google Play',
                duration: '60 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Публикация в Google Play</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">1. Создание подписанного APK</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>cd android
./gradlew bundleRelease</code>
                    </pre>
                `
            },
            {
                id: 10,
                title: 'Публикация в App Store',
                duration: '60 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Публикация в App Store</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">1. Настройка проекта в Xcode</h3>
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>cd ios
pod install</code>
                    </pre>
                `
            }
        ],
        resources: [
            'Настройка окружения.pdf',
            'React Native Cheatsheet.pdf',
            'Готовые проекты.zip'
        ],
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
                    question: "Какой компонент используется для отображения текста в React Native?",
                    options: [
                        "<div>",
                        "<p>",
                        "<Text>",
                        "<span>"
                    ],
                    correct: 2
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
                    question: "Что такое React Native?",
                    options: [
                        "Язык программирования",
                        "Фреймворк для создания мобильных приложений",
                        "База данных",
                        "Среда разработки"
                    ],
                    correct: 1
                },
                {
                    question: "Какой хук используется для создания состояния?",
                    options: [
                        "useEffect",
                        "useState",
                        "useContext",
                        "useReducer"
                    ],
                    correct: 1
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
                    question: "Какая библиотека используется для навигации?",
                    options: [
                        "react-router",
                        "react-navigation",
                        "react-router-dom",
                        "react-native-router"
                    ],
                    correct: 1
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
                },
                {
                    question: "Какой компонент используется для кнопки?",
                    options: [
                        "<Button>",
                        "<Click>",
                        "<Press>",
                        "<Tap>"
                    ],
                    correct: 0
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
                `
            },
            {
                id: 2,
                title: 'Основы Figma',
                duration: '45 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 2: Основы Figma</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Интерфейс Figma</h3>
                    <ul>
                        <li><strong>Toolbar</strong> — инструменты</li>
                        <li><strong>Layers</strong> — слои и группы</li>
                        <li><strong>Properties</strong> — свойства объекта</li>
                    </ul>
                `
            },
            {
                id: 3,
                title: 'Цвет и типографика',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 3: Цвет и типографика</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Теория цвета</h3>
                    <ul>
                        <li><strong>RGB</strong> — для цифровых экранов</li>
                        <li><strong>HEX</strong> — #6366f1</li>
                        <li><strong>HSL</strong> — hsl(240, 100%, 50%)</li>
                    </ul>
                `
            },
            {
                id: 4,
                title: 'Сетки и композиция',
                duration: '45 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Сетки и композиция</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Виды сеток</h3>
                    <ul>
                        <li><strong>Колонки</strong> — 12 колонок для веба</li>
                        <li><strong>Модульная сетка</strong> — для карточек</li>
                    </ul>
                `
            },
            {
                id: 5,
                title: 'Создание прототипов',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Создание прототипов</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Интерактивные прототипы</h3>
                    <ul>
                        <li><strong>Connections</strong> — связи между экранами</li>
                        <li><strong>Transitions</strong> — анимации переходов</li>
                    </ul>
                `
            },
            {
                id: 6,
                title: 'UI элементы',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: UI элементы</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Кнопки</h3>
                    <ul>
                        <li>Primary — главное действие</li>
                        <li>Secondary — второстепенное</li>
                    </ul>
                `
            },
            {
                id: 7,
                title: 'Дизайн мобильных приложений',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Дизайн мобильных приложений</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Особенности мобильных интерфейсов</h3>
                    <ul>
                        <li>Тач-цели (минимум 44x44 px)</li>
                        <li>Навигация (таб-бар, гамбургер)</li>
                    </ul>
                `
            },
            {
                id: 8,
                title: 'Дизайн веб-сайтов',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
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
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Презентация проектов</h2>
                    
                    <h3 style="margin: 1.5rem 0 1rem;">Структура презентации</h3>
                    <ul>
                        <li>Проблема и решение</li>
                        <li>Исследование</li>
                        <li>Визуальный дизайн</li>
                    </ul>
                `
            },
            {
                id: 10,
                title: 'Портфолио дизайнера',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
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
numbers = [1, 2, 3, 4, 5]</code>
                    </pre>
                `
            },
            {
                id: 2,
                title: 'Типы данных Python',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
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
list = [1, 2, 3]</code>
                    </pre>
                `
            },
            {
                id: 3,
                title: 'Условные операторы',
                duration: '45 мин',
                completed: false,
                isCurrent: false,
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
                isCurrent: false,
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
                isCurrent: false,
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
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 6: Работа с файлами</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code># Запись в файл
with open("data.txt", "w") as file:
    file.write("Hello, World!")</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Библиотека NumPy',
                duration: '60 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 7: Библиотека NumPy</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())</code>
                    </pre>
                `
            },
            {
                id: 8,
                title: 'Библиотека Pandas',
                duration: '65 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Библиотека Pandas</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())</code>
                    </pre>
                `
            },
            {
                id: 9,
                title: 'Визуализация данных',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Визуализация данных</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.show()</code>
                    </pre>
                `
            },
            {
                id: 10,
                title: 'Введение в ML',
                duration: '70 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Введение в ML</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)</code>
                    </pre>
                `
            }
        ],
        resources: [
            'Python для начинающих.pdf',
            'Jupyter Notebook setup.exe',
            'Датасеты для практики.zip'
        ],
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
                isCurrent: false,
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
                isCurrent: false,
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
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 4: Циклы в Java</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>for (int i = 0; i < 5; i++) {
    System.out.println(i);
}</code>
                    </pre>
                `
            },
            {
                id: 5,
                title: 'Массивы',
                duration: '45 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 5: Массивы</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];</code>
                    </pre>
                `
            },
            {
                id: 6,
                title: 'Классы и объекты',
                duration: '60 мин',
                completed: false,
                isCurrent: false,
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
}</code>
                    </pre>
                `
            },
            {
                id: 7,
                title: 'Наследование',
                duration: '55 мин',
                completed: false,
                isCurrent: false,
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
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 8: Интерфейсы</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>interface Drawable {
    void draw();
}</code>
                    </pre>
                `
            },
            {
                id: 9,
                title: 'Исключения',
                duration: '50 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 9: Исключения</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Деление на ноль!");
}</code>
                    </pre>
                `
            },
            {
                id: 10,
                title: 'Коллекции',
                duration: '60 мин',
                completed: false,
                isCurrent: false,
                type: 'text',
                content: `
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Урок 10: Коллекции</h2>
                    
                    <pre style="background: #1e293b; color: #fff; padding: 1.5rem; border-radius: 12px;">
<code>import java.util.*;

List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");</code>
                    </pre>
                `
            }
        ],
        resources: [
            'Java Core.pdf',
            'IntelliJ IDEA setup.exe',
            'JDK 11 installer.exe'
        ],
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

// ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================
let currentLessonModal = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizResults = {};

// ==================== ФУНКЦИИ ДЛЯ РАБОТЫ С ПОЛЬЗОВАТЕЛЕМ ====================

// Получение текущего пользователя
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
}

// Проверка авторизации
function checkAuth() {
    const user = getCurrentUser();
    if (!user.email) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// ==================== ФУНКЦИИ ДЛЯ РАБОТЫ С ПРОГРЕССОМ (С ПРИВЯЗКОЙ К ПОЛЬЗОВАТЕЛЮ) ====================

// Получение ключа для хранения прогресса с привязкой к пользователю
function getProgressKey(courseId) {
    const user = getCurrentUser();
    return `course_progress_${user.email}_${courseId}`;
}

// Получение ключа для хранения результатов тестов с привязкой к пользователю
function getQuizKey() {
    const user = getCurrentUser();
    return `quiz_results_${user.email}`;
}

// Сохранение прогресса курса
function saveCourseProgress(courseId) {
    const course = lessonsData[courseId];
    if (!course) return;
    
    const user = getCurrentUser();
    if (!user.email) return;
    
    const progress = {
        userId: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        courseId: courseId,
        completedLessons: course.completedLessons,
        progress: course.progress,
        currentLesson: course.currentLesson,
        completedLessonIds: course.lessons
            .filter(lesson => lesson.completed)
            .map(lesson => lesson.id),
        lastAccess: new Date().toISOString()
    };
    
    const key = getProgressKey(courseId);
    localStorage.setItem(key, JSON.stringify(progress));
    console.log(`✅ Прогресс сохранен для пользователя ${user.email} по курсу ${courseId}:`, progress);
}

// Загрузка прогресса курса для конкретного пользователя
function loadCourseProgress(courseId) {
    const course = lessonsData[courseId];
    if (!course) return;
    
    const user = getCurrentUser();
    if (!user.email) return;
    
    const key = getProgressKey(courseId);
    const savedProgress = JSON.parse(localStorage.getItem(key) || '{}');
    
    // Проверяем, что прогресс принадлежит текущему пользователю
    if (savedProgress.userId && savedProgress.userId !== user.email) {
        console.log(`⚠️ Прогресс принадлежит другому пользователю (${savedProgress.userId}), сбрасываем`);
        resetCourseProgress(course);
        return;
    }
    
    if (savedProgress.completedLessons) {
        course.completedLessons = savedProgress.completedLessons;
        course.progress = savedProgress.progress;
        course.currentLesson = savedProgress.currentLesson;
        
        // Сбрасываем все уроки
        course.lessons.forEach(lesson => {
            lesson.completed = false;
            lesson.isCurrent = false;
        });
        
        // Отмечаем пройденные уроки
        if (savedProgress.completedLessonIds) {
            savedProgress.completedLessonIds.forEach(lessonId => {
                const lesson = course.lessons.find(l => l.id === lessonId);
                if (lesson) lesson.completed = true;
            });
        }
        
        // Отмечаем текущий урок (первый непройденный)
        const nextLesson = course.lessons.find(lesson => !lesson.completed);
        if (nextLesson) {
            nextLesson.isCurrent = true;
            course.currentLesson = nextLesson.title;
        } else if (course.lessons.length > 0) {
            // Все уроки пройдены - отмечаем последний как текущий для показа
            course.lessons[course.lessons.length - 1].isCurrent = true;
        }
    } else {
        // Если нет сохраненного прогресса, начинаем с первого урока
        resetCourseProgress(course);
    }
    
    console.log(`📚 Загружен прогресс для пользователя ${user.email} по курсу ${courseId}:`, course.progress + '%');
}

// Сброс прогресса курса
function resetCourseProgress(course) {
    if (course.lessons.length > 0) {
        course.lessons.forEach(lesson => {
            lesson.completed = false;
            lesson.isCurrent = false;
        });
        course.lessons[0].isCurrent = true;
        course.currentLesson = course.lessons[0].title;
    }
    course.completedLessons = 0;
    course.progress = 0;
}

// ==================== ФУНКЦИИ ДЛЯ РАБОТЫ С ТЕСТАМИ ====================

// Загрузка результатов тестов для текущего пользователя
function loadQuizResults() {
    const user = getCurrentUser();
    if (!user.email) return {};
    
    const key = getQuizKey();
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    
    quizResults = saved;
    console.log(`📊 Загружены результаты тестов для пользователя ${user.email}:`, quizResults);
}

// Сохранение результатов тестов
function saveQuizResults() {
    const user = getCurrentUser();
    if (!user.email) return;
    
    const key = getQuizKey();
    localStorage.setItem(key, JSON.stringify(quizResults));
    console.log(`✅ Результаты тестов сохранены для пользователя ${user.email}`);
}

// ==================== ФУНКЦИЯ ОТМЕТИТЬ УРОК ВЫПОЛНЕННЫМ ====================

function markLessonAsCompleted(courseId, lessonId, closeModal = true) {
    const course = lessonsData[courseId];
    if (!course) return false;
    
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (!lesson) return false;
    
    if (lesson.completed) {
        showNotification('⚠️ Этот урок уже был отмечен как выполненный', 'warning');
        return false;
    }
    
    lesson.completed = true;
    lesson.isCurrent = false;
    
    course.completedLessons++;
    
    const nextLesson = course.lessons.find(l => l.id === lessonId + 1);
    
    if (nextLesson) {
        nextLesson.isCurrent = true;
        course.currentLesson = nextLesson.title;
        showNotification(`✅ Урок "${lesson.title}" выполнен! Следующий урок: "${nextLesson.title}"`, 'success');
    } else {
        course.currentLesson = "Курс завершен!";
        
        const allCompleted = course.lessons.every(l => l.completed);
        if (allCompleted) {
            showNotification('🎉 Поздравляем! Вы завершили все уроки курса! Теперь можно пройти итоговый тест.', 'success');
            
            setTimeout(() => {
                const quizSection = document.getElementById('quizSection');
                if (quizSection) {
                    quizSection.style.display = 'block';
                    initQuiz(courseId);
                    quizSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1000);
        }
    }
    
    course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);
    saveCourseProgress(courseId);
    
    if (closeModal && currentLessonModal) {
        closeLessonModal();
    }
    
    loadCoursePage();
    return true;
}

// ==================== ФУНКЦИЯ ДЛЯ КНОПКИ "ОТМЕТИТЬ УРОК ВЫПОЛНЕННЫМ" ====================

function completeCurrentLesson(courseId) {
    const course = lessonsData[courseId];
    
    const currentLesson = course.lessons.find(l => l.isCurrent);
    
    if (currentLesson) {
        markLessonAsCompleted(courseId, currentLesson.id, true);
    } else {
        const nextLesson = course.lessons.find(l => !l.completed);
        if (nextLesson) {
            markLessonAsCompleted(courseId, nextLesson.id, true);
        } else {
            showNotification('🎉 Все уроки уже выполнены!', 'info');
        }
    }
}

// ==================== ФУНКЦИЯ ПОКАЗА ТЕКСТОВОГО УРОКА ====================

function showTextLesson(courseId, lessonId) {
    if (currentLessonModal) {
        currentLessonModal.remove();
        currentLessonModal = null;
    }
    
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;
    
    if (lessonId > 1) {
        const prevLesson = course.lessons.find(l => l.id === lessonId - 1);
        if (prevLesson && !prevLesson.completed && !lesson.completed) {
            showNotification('⚠️ Сначала выполните предыдущий урок', 'warning');
            return;
        }
    }
    
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
    
    const isCompleted = lesson.completed;
    const isCurrent = lesson.isCurrent;
    const canComplete = !isCompleted && (isCurrent || lessonId === 1);
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 32px;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            animation: modalSlideIn 0.4s ease;
        ">
            <div style="
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
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
                    <button onclick="closeLessonModal()" style="
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
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #f1f5f9;">
                    <div>
                        ${lessonId > 1 ? `
                            <button onclick="showTextLesson('${courseId}', ${lessonId - 1})" style="
                                background: #f1f5f9;
                                color: #0f172a;
                                border: none;
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                font-weight: 600;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: all 0.3s;
                            " onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">
                                ← Предыдущий урок
                            </button>
                        ` : ''}
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        ${!isCompleted ? `
                            <button onclick="markLessonAsCompleted('${courseId}', ${lessonId})" style="
                                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
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
                                ${!canComplete ? 'opacity: 0.5; pointer-events: none;' : ''}
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)'" 
                               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                ✅ Отметить выполненным
                            </button>
                        ` : `
                            <div style="
                                background: #10b981;
                                color: white;
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                font-weight: 700;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                            ">
                                ✅ Урок пройден
                            </div>
                        `}
                        
                        ${lessonId < course.lessons.length ? `
                            <button onclick="showTextLesson('${courseId}', ${lessonId + 1})" style="
                                background: white;
                                color: #8b5cf6;
                                border: 2px solid #8b5cf6;
                                padding: 1rem 2rem;
                                border-radius: 12px;
                                font-weight: 700;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: all 0.3s;
                            " onmouseover="this.style.background='#8b5cf6'; this.style.color='white'" 
                               onmouseout="this.style.background='white'; this.style.color='#8b5cf6'">
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
    disableBodyScroll();
}

// ==================== ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА ====================

function closeLessonModal() {
    if (currentLessonModal) {
        currentLessonModal.remove();
        currentLessonModal = null;
        enableBodyScroll();
    }
}

// ==================== ФУНКЦИЯ ЗАГРУЗКИ СТРАНИЦЫ КУРСА ====================

function loadCoursePage() {
    console.log("loadCoursePage вызвана");
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    console.log("Course ID:", courseId);
    
    if (!courseId || !lessonsData[courseId]) {
        console.log("Курс не найден, перенаправление...");
        window.location.href = 'dashboard.html';
        return;
    }

    loadCourseProgress(courseId);

    const course = lessonsData[courseId];
    const container = document.getElementById('courseContainer');
    
    if (!container) {
        console.log("Контейнер courseContainer не найден!");
        return;
    }
    
    const completedCount = course.lessons.filter(l => l.completed).length;
    const progress = Math.round((completedCount / course.totalLessons) * 100);
    
    container.innerHTML = `
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

        <div class="course-progress-large">
            <div class="progress-header">
                <div>
                    <h2 style="font-size: 1.5rem; margin-bottom: 0.3rem;">Ваш прогресс</h2>
                    <p style="color: #64748b;">Продолжайте с того места, где остановились</p>
                </div>
                <div class="progress-percent-large">${progress}%</div>
            </div>
            <div class="progress-bar-large">
                <div class="progress-fill-large" style="width: ${progress}%;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;">
                <span style="font-weight: 600;">Пройдено уроков: ${completedCount}/${course.totalLessons}</span>
                <span style="color: #8b5cf6; font-weight: 600;">Осталось: ${course.totalLessons - completedCount}</span>
            </div>
        </div>

        <div class="course-content">
            <div class="lessons-section">
                <div class="section-title">
                    <span>📋</span>
                    <span>Содержание курса</span>
                </div>
                
                <div style="margin-bottom: 1.5rem; background: #f0f9ff; padding: 1rem; border-radius: 12px; border-left: 4px solid #0ea5e9;">
                    <span style="font-weight: 700; color: #0369a1;">🎯 Текущий урок:</span>
                    <span style="margin-left: 0.5rem; font-weight: 600;">${course.currentLesson || 'Не выбран'}</span>
                </div>
                
                <div style="max-height: 600px; overflow-y: auto; padding-right: 10px;">
                    ${course.lessons.map(lesson => `
                        <div class="lesson-item ${lesson.completed ? 'completed' : ''} ${lesson.isCurrent ? 'current-lesson' : ''}" 
                             onclick="playLesson('${courseId}', ${lesson.id})"
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

            <div>
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
                            <p style="color: #64748b; font-size: 0.9rem;">${course.teacher.position}</p>
                            <p style="color: #8b5cf6; font-size: 0.9rem; font-weight: 600;">${course.teacher.company}</p>
                        </div>
                    </div>
                </div>

                <div class="course-sidebar" style="margin-bottom: 2rem;">
                    <div class="section-title" style="margin-bottom: 1rem;">
                        <span>🎯</span>
                        <span>Чему научитесь</span>
                    </div>
                    <ul style="list-style-type: none; padding: 0;">
                        ${course.whatYouWillLearn.map(item => `
                            <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span style="color: #10b981; font-size: 1.2rem;">✓</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="course-sidebar">
                    <div class="section-title" style="margin-bottom: 1rem;">
                        <span>📎</span>
                        <span>Материалы</span>
                    </div>
                    <ul class="resources-list">
                        ${course.resources.map(resource => `
                            <li onclick="downloadResource('${resource}', '${courseId}')" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between;">
                                <span style="display: flex; align-items: center; gap: 0.5rem;">
                                    ${resource.includes('.pdf') ? '📄' : resource.includes('.zip') ? '📦' : '📝'}
                                    ${resource}
                                </span>
                                <span style="font-size: 0.8rem; color: #8b5cf6;">⬇️ Скачать</span>
                            </li>
                        `).join('')}
                    </ul>
                    
                    <button class="complete-lesson-btn" onclick="downloadAllResources('${courseId}')" style="margin-bottom: 10px; background: linear-gradient(135deg, #10b981, #059669);">
                        📦 Скачать все материалы
                    </button>
                    
                    <button class="complete-lesson-btn" onclick="completeCurrentLesson('${courseId}')">
                        ✅ Отметить текущий урок выполненным
                    </button>
                </div>
            </div>
        </div>
        
        <div class="quiz-section" id="quizSection" style="display: none;">
            <div class="quiz-header">
                <h2>📝 ${course.quiz ? course.quiz.title : 'Итоговый тест'}</h2>
                <p>${course.quiz ? course.quiz.description : 'Проверьте свои знания перед получением сертификата'}</p>
            </div>
            
            <div class="quiz-progress">
                <div class="quiz-progress-bar" id="quizProgressBar" style="width: 0%;"></div>
            </div>
            
            <div class="quiz-question" id="quizQuestion"></div>
            
            <div class="quiz-actions">
                <button class="quiz-prev-btn" id="quizPrevBtn" onclick="prevQuestion()" style="display: none;">← Назад</button>
                <span class="quiz-counter" id="quizCounter">1/${course.quiz ? course.quiz.questions.length : 10}</span>
                <button class="quiz-next-btn" id="quizNextBtn" onclick="nextQuestion()">Далее →</button>
                <button class="quiz-submit-btn" id="quizSubmitBtn" onclick="submitQuiz()" style="display: none;">📤 Отправить</button>
            </div>
            
            <div class="quiz-result" id="quizResult"></div>
        </div>
    `;
    
    if (completedCount === course.totalLessons) {
        const quizSection = document.getElementById('quizSection');
        if (quizSection) {
            quizSection.style.display = 'block';
            initQuiz(courseId);
        }
    }
}

// ==================== ФУНКЦИЯ ДЛЯ УВЕДОМЛЕНИЙ ====================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    
    const emoji = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 100001;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <span style="font-size: 1.5rem;">${emoji[type]}</span>
        <span style="flex: 1;">${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 1.2rem;
            padding: 5px 10px;
            border-radius: 8px;
            cursor: pointer;
            margin-left: 5px;
            transition: all 0.2s;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">✕</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==================== ФУНКЦИИ ДЛЯ СКРОЛЛА ====================

function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
}

function enableBodyScroll() {
    document.body.style.overflow = '';
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

function playLesson(courseId, lessonId) {
    const course = lessonsData[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (lesson.type === 'text') {
        showTextLesson(courseId, lessonId);
    } else {
        showNotification(`▶️ Запускаем видеоурок: ${lesson.title}`, 'info');
    }
}

function logout() {
    currentLessonModal = null;
    currentQuiz = null;
    currentQuestionIndex = 0;
    userAnswers = [];
    quizResults = {};
    
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==================== QUIZ FUNCTIONS ====================

function initQuiz(courseId) {
    const course = lessonsData[courseId];
    if (!course.quiz) return;
    
    currentQuiz = course.quiz;
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(-1);
    
    loadQuizResults();
    
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
    
    if (!container) return;
    
    if (counter) {
        counter.textContent = `${currentQuestionIndex + 1}/${currentQuiz.questions.length}`;
    }
    
    if (progressBar) {
        const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    if (prevBtn) {
        prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    }
    
    const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
    if (nextBtn) {
        nextBtn.style.display = isLastQuestion ? 'none' : 'block';
    }
    if (submitBtn) {
        submitBtn.style.display = isLastQuestion ? 'block' : 'none';
    }
    
    let optionsHtml = '';
    
    if (question.options && question.options.length > 0) {
        for (let i = 0; i < question.options.length; i++) {
            const option = question.options[i];
            const isSelected = userAnswers[currentQuestionIndex] === i;
            
            optionsHtml += `
                <label class="quiz-option" style="
                    display: flex;
                    align-items: center;
                    padding: 12px 15px;
                    margin: 8px 0;
                    background: ${isSelected ? 'rgba(139, 92, 246, 0.1)' : '#f8fafc'};
                    border: 2px solid ${isSelected ? '#8b5cf6' : '#e2e8f0'};
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                ">
                    <input type="radio" 
                           name="quiz-option" 
                           value="${i}" 
                           ${isSelected ? 'checked' : ''} 
                           onchange="selectAnswer(${i})"
                           style="margin-right: 15px; width: 18px; height: 18px;">
                    <span style="font-size: 16px;">${option}</span>
                </label>
            `;
        }
    }
    
    container.innerHTML = `
        <h3 style="font-size: 18px; margin-bottom: 20px; color: #1e293b; font-weight: 600;">${question.question || 'Вопрос не найден'}</h3>
        <div class="quiz-options" style="margin-bottom: 20px;">
            ${optionsHtml}
        </div>
    `;
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
    
    document.querySelectorAll('.quiz-option').forEach((opt, idx) => {
        if (idx === answerIndex) {
            opt.style.background = 'rgba(139, 92, 246, 0.1)';
            opt.style.borderColor = '#8b5cf6';
        } else {
            opt.style.background = '#f8fafc';
            opt.style.borderColor = '#e2e8f0';
        }
    });
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        showQuizQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuizQuestion();
    }
}

function submitQuiz() {
    const unanswered = userAnswers.filter(a => a === -1).length;
    
    if (unanswered > 0) {
        alert(`Пожалуйста, ответьте на все вопросы. Осталось: ${unanswered}`);
        return;
    }
    
    let correctCount = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctCount++;
        }
    });
    
    const percentage = Math.round((correctCount / currentQuiz.questions.length) * 100);
    const passed = percentage >= currentQuiz.passingScore;
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const user = getCurrentUser();
    
    quizResults[courseId] = {
        userId: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        courseId: courseId,
        passed: passed,
        score: percentage,
        correct: correctCount,
        total: currentQuiz.questions.length,
        date: new Date().toISOString()
    };
    
    saveQuizResults();
    
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
            <button class="quiz-submit-btn" onclick="previewCertificate('${courseId}')" style="margin-top: 1rem; display: inline-block;">
                🎓 Получить сертификат
            </button>
        `;
    } else {
        resultDiv.className = 'quiz-result fail';
        resultDiv.innerHTML = `
            <h3>😔 Тест не пройден</h3>
            <p>Вы набрали ${result.score}% (${result.correct}/${result.total} правильных ответов)</p>
            <p>Проходной балл: ${currentQuiz.passingScore}%</p>
            <button class="quiz-submit-btn" onclick="resetQuiz('${courseId}')" style="margin-top: 1rem; background: linear-gradient(135deg, #8b5cf6, #06b6d4);">
                🔄 Попробовать снова
            </button>
        `;
    }
    
    resultDiv.style.display = 'block';
}

function resetQuiz(courseId) {
    delete quizResults[courseId];
    saveQuizResults();
    
    const resultDiv = document.getElementById('quizResult');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizActions = document.querySelector('.quiz-actions');
    
    if (resultDiv) resultDiv.style.display = 'none';
    if (quizQuestion) quizQuestion.style.display = 'block';
    if (quizActions) quizActions.style.display = 'flex';
    
    initQuiz(courseId);
}

// ==================== ФУНКЦИИ ДЛЯ СКАЧИВАНИЯ МАТЕРИАЛОВ ====================

// Функция для скачивания материалов
function downloadResource(resourceName, courseId) {
    const course = lessonsData[courseId];
    
    // Создаем содержимое файла
    let content = '';
    let filename = resourceName;
    let type = 'text/plain';
    
    // Определяем тип файла по расширению
    if (resourceName.endsWith('.pdf')) {
        type = 'application/pdf';
        // Для PDF создаем демо-контент
        content = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>\n3 0 obj<</Type/Page/MediaBox[0 0 595 842]/Parent 2 0 R/Resources<<>>>>\nendobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000101 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF`;
    } else if (resourceName.endsWith('.zip')) {
        type = 'application/zip';
        content = 'PK\x03\x04\x14\x00\x00\x00\x08\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00';
        filename = 'demo.zip';
    } else if (resourceName.endsWith('.txt')) {
        type = 'text/plain';
        content = generateResourceContent(courseId, resourceName);
    } else {
        content = generateResourceContent(courseId, resourceName);
    }
    
    // Создаем и скачиваем файл
    const blob = new Blob([content], { type: type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showNotification(`📥 Начинаем скачивание: ${resourceName}`, 'info');
}

// Генерация содержимого для демо-файлов
function generateResourceContent(courseId, resourceName) {
    const course = lessonsData[courseId];
    
    if (resourceName.includes('Все материалы курса')) {
        return `Все материалы курса "${course.title}"
        
Список файлов:
1. Презентации к урокам (10 файлов)
2. Домашние задания (10 заданий)
3. Дополнительные материалы
4. Примеры кода
5. Полезные ссылки

Курс: ${course.title}
Преподаватель: ${course.teacher.name}
Длительность: ${course.duration}
Уроков: ${course.lessons.length}

Инструкция по установке:
1. Распакуйте архив
2. Откройте папку с материалами
3. Следуйте инструкциям в README.txt

Ссылка на скачивание будет отправлена на email в ближайшее время.`;
    }
    
    if (resourceName.includes('Шпаргалка по React')) {
        return `Шпаргалка по React

🔹 Основные хуки:
useState() - для состояния
useEffect() - для побочных эффектов
useContext() - для контекста
useRef() - для ссылок

🔹 Компоненты:
function Component(props) {
  return <div>{props.children}</div>
}

🔹 Стилизация:
const styles = {
  container: {
    padding: '20px'
  }
}

🔹 Пропсы:
<Component name="value" />

🔹 Состояние:
const [count, setCount] = useState(0)`;
    }
    
    if (resourceName.includes('Домашние задания')) {
        let tasks = '';
        course.lessons.forEach((lesson, index) => {
            tasks += `\n\nУрок ${index + 1}. ${lesson.title}\n`;
            tasks += `Задание: ${generateTaskForLesson(lesson.title)}\n`;
            tasks += `Сложность: ${index < 3 ? 'Легкая' : index < 7 ? 'Средняя' : 'Высокая'}\n`;
            tasks += `Дедлайн: ${index + 3} дня\n`;
        });
        
        return `Домашние задания по курсу "${course.title}"${tasks}`;
    }
    
    if (resourceName.includes('Полезные ссылки')) {
        return `Полезные ссылки по курсу "${course.title}"

📚 Документация:
- Официальная документация
- MDN Web Docs
- W3Schools

🎓 Дополнительные курсы:
- Курс на YouTube
- Статьи на Habr
- Видеоуроки

💬 Сообщества:
- Telegram чат
- Discord сервер
- Форум поддержки

🛠 Инструменты:
- VS Code
- Git
- Figma

⭐ Полезные ресурсы:
- GitHub
- Stack Overflow
- CodePen`;
    }
    
    return `Демо-файл: ${resourceName}\nКурс: ${course.title}`;
}

function generateTaskForLesson(lessonTitle) {
    const tasks = [
        'Напишите программу "Hello World"',
        'Создайте переменные разных типов',
        'Напишите функцию для сложения чисел',
        'Создайте условный оператор',
        'Напишите цикл для вывода чисел',
        'Создайте массив и примените методы',
        'Создайте объект с данными',
        'Создайте простой компонент',
        'Передайте пропсы в компонент',
        'Используйте состояние в компоненте'
    ];
    
    const index = Math.floor(Math.random() * tasks.length);
    return tasks[index];
}

// Функция для скачивания всех материалов одним архивом
function downloadAllResources(courseId) {
    const course = lessonsData[courseId];
    
    showNotification('📦 Подготавливаем все материалы...', 'info');
    
    setTimeout(() => {
        // Создаем мета-файл со списком всех материалов
        const manifest = course.resources.map(res => `- ${res}`).join('\n');
        const content = `Все материалы курса "${course.title}"

Доступные файлы:
${manifest}

Для скачивания каждого файла нажмите на него в списке материалов.

Курс: ${course.title}
Всего материалов: ${course.resources.length}
Дата генерации: ${new Date().toLocaleString()}
        `;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${course.title}_материалы.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        showNotification('✅ Файл со списком материалов скачан!', 'success');
    }, 1500);
}

// ==================== ФУНКЦИИ ДЛЯ СЕРТИФИКАТА ====================

// Функция для предпросмотра сертификата
function previewCertificate(courseId) {
    const course = lessonsData[courseId];
    const user = getCurrentUser();
    
    if (!course || !user) {
        showNotification('Ошибка: данные не найдены', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        padding: 20px;
    `;
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('ru-RU');
    const certNumber = `LRN-${today.getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 32px;
            width: 100%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        ">
            <div style="
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                padding: 1.5rem;
                border-radius: 32px 32px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
            ">
                <h2 style="font-size: 1.5rem;">🎓 Сертификат об окончании</h2>
                <button onclick="this.closest('div[style*=\\'fixed\\']').remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
            
            <div style="padding: 2rem;">
                <div style="
                    padding: 2rem;
                    background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
                    border: 4px double #8b5cf6;
                    border-radius: 24px;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: 20px;
                        right: 30px;
                        font-size: 60px;
                        color: #8b5cf6;
                        opacity: 0.1;
                    ">🎓</div>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="font-size: 50px; margin-bottom: 10px;">🎓</div>
                        <h1 style="font-size: 30px; color: #8b5cf6; margin-bottom: 5px;">СЕРТИФИКАТ ОБ ОКОНЧАНИИ</h1>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="font-size: 16px; color: #64748b;">Настоящий сертификат подтверждает, что</p>
                        <h2 style="
                            font-size: 32px;
                            color: #0f172a;
                            margin: 15px 0;
                            border-bottom: 2px solid #8b5cf6;
                            border-top: 2px solid #8b5cf6;
                            padding: 15px 0;
                        ">${user.firstName} ${user.lastName}</h2>
                        <p style="font-size: 16px; color: #64748b;">успешно завершил(а) курс</p>
                        <h3 style="
                            font-size: 26px;
                            color: #8b5cf6;
                            margin: 15px 0;
                            padding: 8px 25px;
                            border: 2px solid #8b5cf6;
                            border-radius: 40px;
                            display: inline-block;
                        ">${course.title}</h3>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                        margin: 30px 0;
                        font-size: 14px;
                    ">
                        <span><strong>Дата:</strong> ${dateStr}</span>
                        <span><strong>№</strong> ${certNumber}</span>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e2e8f0;
                    ">
                        <div style="text-align: center;">
                            <div style="width: 150px; height: 2px; background: #8b5cf6; margin-bottom: 5px;"></div>
                            <p style="font-family: 'Brush Script MT', cursive; font-size: 20px;">А. Иванов</p>
                            <p style="color: #64748b; font-size: 12px;">Директор LearnPro</p>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-size: 30px;
                                margin: 0 auto 5px;
                            ">✓</div>
                            <p style="color: #8b5cf6; font-size: 12px;">Официально</p>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="width: 150px; height: 2px; background: #8b5cf6; margin-bottom: 5px;"></div>
                            <p style="font-family: 'Brush Script MT', cursive; font-size: 20px;">М. Петрова</p>
                            <p style="color: #64748b; font-size: 12px;">Академический директор</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 20px; margin-top: 30px;">
                    <button onclick="downloadCertificatePDF('${courseId}')" style="
                        flex: 1;
                        background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        📥 Скачать PDF
                    </button>
                    <button onclick="shareCertificate('${courseId}')" style="
                        flex: 1;
                        background: white;
                        color: #8b5cf6;
                        border: 2px solid #8b5cf6;
                        padding: 15px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        📤 Поделиться
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    disableBodyScroll();
}

// Функция скачивания PDF сертификата
// Функция скачивания PDF сертификата
async function downloadCertificatePDF(courseId) {
    const course = lessonsData[courseId];
    const user = getCurrentUser();
    
    if (!course || !user) {
        showNotification('Ошибка: данные не найдены', 'error');
        return;
    }
    
    showNotification('📄 Генерируем PDF...', 'info');
    
    try {
        // Проверяем наличие библиотек
        if (typeof html2canvas === 'undefined') {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
        }
        
        if (typeof jspdf === 'undefined') {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        }
        
        // Даем время на инициализацию
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const today = new Date();
        const dateStr = today.toLocaleDateString('ru-RU');
        const certNumber = `LRN-${today.getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
        
        // Создаем контейнер для сертификата
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '800px';
        container.style.height = '600px';
        container.style.backgroundColor = '#ffffff';
        container.style.zIndex = '-1000';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
        
        // Наполняем контейнер содержимым сертификата
        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                padding: 40px;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                border: 4px double #8b5cf6;
                border-radius: 24px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                font-family: Arial, sans-serif;
                position: relative;
                overflow: hidden;
            ">
                <!-- Водяной знак -->
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-15deg);
                    font-size: 120px;
                    color: rgba(139, 92, 246, 0.05);
                    white-space: nowrap;
                    pointer-events: none;
                ">🎓 LEARNPRO</div>
                
                <!-- Шапка -->
                <div style="text-align: center; margin-bottom: 20px; position: relative; z-index: 1;">
                    <div style="font-size: 48px; margin-bottom: 10px;">🎓</div>
                    <h1 style="
                        font-size: 32px;
                        color: #8b5cf6;
                        margin: 0 0 5px 0;
                        font-weight: 800;
                        letter-spacing: 2px;
                    ">СЕРТИФИКАТ ОБ ОКОНЧАНИИ</h1>
                </div>
                
                <!-- Основной контент -->
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 1;">
                    <p style="font-size: 16px; color: #64748b; text-align: center; margin: 5px 0;">
                        Настоящий сертификат подтверждает, что
                    </p>
                    
                    <h2 style="
                        font-size: 36px;
                        color: #0f172a;
                        text-align: center;
                        margin: 15px 0;
                        padding: 15px 0;
                        border-top: 2px solid #8b5cf6;
                        border-bottom: 2px solid #8b5cf6;
                        font-weight: 700;
                    ">
                        ${user.firstName} ${user.lastName}
                    </h2>
                    
                    <p style="font-size: 16px; color: #64748b; text-align: center; margin: 5px 0;">
                        успешно завершил(а) курс
                    </p>
                    
                    <h3 style="
                        font-size: 28px;
                        color: #8b5cf6;
                        text-align: center;
                        margin: 15px auto;
                        padding: 8px 25px;
                        border: 2px solid #8b5cf6;
                        border-radius: 40px;
                        display: inline-block;
                        font-weight: 600;
                    ">
                        ${course.title}
                    </h3>
                    
                    <div style="
                        display: flex;
                        justify-content: center;
                        gap: 40px;
                        margin: 20px 0;
                        font-size: 14px;
                    ">
                        <span style="color: #475569;">
                            <strong style="color: #0f172a;">Дата:</strong> ${dateStr}
                        </span>
                        <span style="color: #475569;">
                            <strong style="color: #0f172a;">№</strong> ${certNumber}
                        </span>
                    </div>
                </div>
                
                <!-- Подписи -->
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-top: 20px;
                    position: relative;
                    z-index: 1;
                ">
                    <div style="text-align: center; width: 30%;">
                        <div style="width: 80%; height: 2px; background: #8b5cf6; margin: 0 auto 5px;"></div>
                        <p style="font-family: 'Brush Script MT', cursive; font-size: 20px; margin: 0;">А. Иванов</p>
                        <p style="color: #64748b; font-size: 12px; margin: 2px 0 0;">Директор LearnPro</p>
                    </div>
                    
                    <div style="text-align: center; width: 30%;">
                        <div style="
                            width: 50px;
                            height: 50px;
                            background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 24px;
                            margin: 0 auto 5px;
                        ">✓</div>
                        <p style="color: #8b5cf6; font-size: 12px; margin: 0;">Официально</p>
                    </div>
                    
                    <div style="text-align: center; width: 30%;">
                        <div style="width: 80%; height: 2px; background: #8b5cf6; margin: 0 auto 5px;"></div>
                        <p style="font-family: 'Brush Script MT', cursive; font-size: 20px; margin: 0;">М. Петрова</p>
                        <p style="color: #64748b; font-size: 12px; margin: 2px 0 0;">Академический директор</p>
                    </div>
                </div>
            </div>
        `;
        
        // Добавляем контейнер в DOM
        document.body.appendChild(container);
        
        // Ждем рендеринга
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Получаем первый дочерний элемент (наш сертификат)
        const certificateElement = container.firstElementChild;
        
        if (!certificateElement) {
            throw new Error('Элемент сертификата не создан');
        }
        
        // Генерируем канвас
        const canvas = await html2canvas(certificateElement, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: false,
            useCORS: true,
            windowWidth: 800,
            windowHeight: 600
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // Создаем PDF
        const pdf = new jspdf.jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        
        // Очищаем имя файла
        const safeFileName = `${course.title}_${user.firstName}_${user.lastName}`
            .replace(/[^\wа-яА-ЯёЁ]/g, '_')
            .replace(/_+/g, '_');
            
        pdf.save(`LearnPro_${safeFileName}.pdf`);
        
        // Удаляем временный контейнер
        document.body.removeChild(container);
        
        showNotification('✅ PDF успешно скачан!', 'success');
        
    } catch (error) {
        console.error('❌ Ошибка при создании PDF:', error);
        showNotification('❌ Ошибка при создании PDF. Использую текстовый формат...', 'warning');
        
        // Запасной вариант - текстовый файл
        setTimeout(() => downloadCertificateText(courseId), 500);
    }
}

// Функция для скачивания текстовой версии сертификата
function downloadCertificateText(courseId) {
    const course = lessonsData[courseId];
    const user = getCurrentUser();
    
    if (!course || !user) return;
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('ru-RU');
    const certNumber = `LRN-${today.getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    
    const certificateText = `╔════════════════════════════════════════════════════════════════╗
║                                                                    ║
║                    СЕРТИФИКАТ ОБ ОКОНЧАНИИ                        ║
║                                                                    ║
║   Настоящий сертификат подтверждает, что                          ║
║                                                                    ║
║   ${user.firstName} ${user.lastName.padEnd(30)}                   ║
║                                                                    ║
║   успешно завершил(а) курс                                         ║
║                                                                    ║
║   "${course.title}"                                                ║
║                                                                    ║
║   Дата: ${dateStr.padEnd(20)}                                     ║
║   Номер: ${certNumber}                                             ║
║                                                                    ║
║                                                                    ║
║   ____________________          ____________________              ║
║   А. Иванов                     М. Петрова                        ║
║   Директор LearnPro              Академический директор           ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

LearnPro - онлайн платформа для обучения IT профессиям
Сертификат действителен и может быть проверен на сайте learnpro.ru`;

    const blob = new Blob([certificateText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LearnPro_Сертификат_${user.firstName}_${user.lastName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showNotification('✅ Сертификат скачан в текстовом формате!', 'success');
}

// Функция для загрузки скриптов
function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Проверяем, не загружен ли уже скрипт
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Копирование в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ Текст скопирован в буфер обмена!', 'success');
    }).catch(() => {
        showNotification('❌ Не удалось скопировать', 'error');
    });
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    // Проверяем наличие библиотек
    if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        console.warn('⚠️ Библиотеки для PDF не загружены. Подключите jsPDF и html2canvas для скачивания сертификатов.');
    }
    
    loadQuizResults();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
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
        
        @keyframes certificateZoom {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    loadCoursePage();
});

// Функция для предпросмотра сертификата
function previewCertificate(courseId) {
    const course = lessonsData[courseId];
    const user = getCurrentUser();
    
    if (!course || !user) {
        showNotification('Ошибка: данные не найдены', 'error');
        return;
    }
    
    // Отключаем скролл
    disableBodyScroll();
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        padding: 20px;
    `;
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('ru-RU');
    const certNumber = `LRN-${today.getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 32px;
            width: 100%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        ">
            <div style="
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                padding: 1.5rem;
                border-radius: 32px 32px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
                position: sticky;
                top: 0;
                z-index: 10;
            ">
                <h2 style="font-size: 1.5rem;">🎓 Сертификат об окончании</h2>
                <button onclick="closeCertificateModal(this)" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
            </div>
            
            <div style="padding: 2rem;">
                <div style="
                    padding: 2rem;
                    background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
                    border: 4px double #8b5cf6;
                    border-radius: 24px;
                    position: relative;
                ">
                    <div style="
                        position: absolute;
                        top: 20px;
                        right: 30px;
                        font-size: 60px;
                        color: #8b5cf6;
                        opacity: 0.1;
                    ">🎓</div>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="font-size: 50px; margin-bottom: 10px;">🎓</div>
                        <h1 style="font-size: 30px; color: #8b5cf6; margin-bottom: 5px;">СЕРТИФИКАТ ОБ ОКОНЧАНИИ</h1>
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="font-size: 16px; color: #64748b;">Настоящий сертификат подтверждает, что</p>
                        <h2 style="
                            font-size: 32px;
                            color: #0f172a;
                            margin: 15px 0;
                            border-bottom: 2px solid #8b5cf6;
                            border-top: 2px solid #8b5cf6;
                            padding: 15px 0;
                        ">${user.firstName} ${user.lastName}</h2>
                        <p style="font-size: 16px; color: #64748b;">успешно завершил(а) курс</p>
                        <h3 style="
                            font-size: 26px;
                            color: #8b5cf6;
                            margin: 15px 0;
                            padding: 8px 25px;
                            border: 2px solid #8b5cf6;
                            border-radius: 40px;
                            display: inline-block;
                        ">${course.title}</h3>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: center;
                        gap: 30px;
                        margin: 30px 0;
                        font-size: 14px;
                    ">
                        <span><strong>Дата:</strong> ${dateStr}</span>
                        <span><strong>№</strong> ${certNumber}</span>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e2e8f0;
                    ">
                        <div style="text-align: center;">
                            <div style="width: 150px; height: 2px; background: #8b5cf6; margin-bottom: 5px;"></div>
                            <p style="font-family: 'Brush Script MT', cursive; font-size: 20px;">А. Иванов</p>
                            <p style="color: #64748b; font-size: 12px;">Директор LearnPro</p>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-size: 30px;
                                margin: 0 auto 5px;
                            ">✓</div>
                            <p style="color: #8b5cf6; font-size: 12px;">Официально</p>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="width: 150px; height: 2px; background: #8b5cf6; margin-bottom: 5px;"></div>
                            <p style="font-family: 'Brush Script MT', cursive; font-size: 20px;">М. Петрова</p>
                            <p style="color: #64748b; font-size: 12px;">Академический директор</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 20px; margin-top: 30px;">
                    <button onclick="downloadCertificatePDF('${courseId}')" style="
                        flex: 1;
                        background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                        color: white;
                        border: none;
                        padding: 15px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)'" 
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        📥 Скачать PDF
                    </button>
                    <button onclick="shareCertificate('${courseId}')" style="
                        flex: 1;
                        background: white;
                        color: #8b5cf6;
                        border: 2px solid #8b5cf6;
                        padding: 15px;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#8b5cf6'; this.style.color='white'" 
                       onmouseout="this.style.background='white'; this.style.color='#8b5cf6'">
                        📤 Поделиться
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем обработчик для закрытия по клику на фон
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModalFromElement(modal);
        }
    });
    
    document.body.appendChild(modal);
}

// Функция для закрытия модального окна сертификата
function closeCertificateModal(button) {
    const modal = button.closest('div[style*="position: fixed"]');
    if (modal) {
        document.body.removeChild(modal);
        enableBodyScroll();
    }
}

// Функция для закрытия модального окна по клику на фон
function closeCertificateModalFromElement(modal) {
    if (modal && modal.parentNode) {
        document.body.removeChild(modal);
        enableBodyScroll();
    }
}

// Обновим функцию загрузки скриптов для обработки ошибок
function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Проверяем, не загружен ли уже скрипт
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log(`✅ Скрипт загружен: ${src}`);
            resolve();
        };
        script.onerror = (error) => {
            console.error(`❌ Ошибка загрузки скрипта: ${src}`, error);
            reject(error);
        };
        document.head.appendChild(script);
    });
}
// Добавим обработчик Escape в инициализацию
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    // Проверяем наличие библиотек
    if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        console.warn('⚠️ Библиотеки для PDF не загружены. Подключите jsPDF и html2canvas для скачивания сертификатов.');
    }
    
    loadQuizResults();
    
    // Обработчик для закрытия модальных окон по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Ищем открытое модальное окно сертификата
            const modals = document.querySelectorAll('div[style*="position: fixed"][style*="background: rgba(0,0,0,0.9)"]');
            modals.forEach(modal => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                    enableBodyScroll();
                }
            });
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
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
        
        @keyframes certificateZoom {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    loadCoursePage();
});
// Делаем функции глобальными
window.playLesson = playLesson;
window.showTextLesson = showTextLesson;
window.completeCurrentLesson = completeCurrentLesson;
window.markLessonAsCompleted = markLessonAsCompleted;
window.closeLessonModal = closeLessonModal;
window.logout = logout;
window.initQuiz = initQuiz;
window.showQuizQuestion = showQuizQuestion;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.submitQuiz = submitQuiz;
window.resetQuiz = resetQuiz;
window.downloadResource = downloadResource;
window.downloadAllResources = downloadAllResources;
window.previewCertificate = previewCertificate;
window.downloadCertificatePDF = downloadCertificatePDF;
window.disableBodyScroll = disableBodyScroll;
window.enableBodyScroll = enableBodyScroll;
window.showNotification = showNotification;
