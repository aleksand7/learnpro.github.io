const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Статические файлы
app.use(express.static(path.join(__dirname, './')));

// Конфигурация почты с environment variables
const createTransporter = () => {
    // Для тестирования без реальной почты
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('📧 Режим разработки: email не настроен, данные показываются в интерфейсе');
        return null;
    }

    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const transporter = createTransporter();

// API endpoints
app.post('/api/send-credentials', async (req, res) => {
    try {
        const { firstName, lastName, email, login, password } = req.body;

        console.log('📝 Регистрация нового пользователя:', email);

        // Пытаемся отправить email если настроен
        if (transporter) {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: '🎓 LearnPro - Ваши данные для входа',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                                <h1>🎓 LearnPro</h1>
                                <p>Ваш аккаунт успешно создан!</p>
                            </div>
                            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
                                <h2>Добро пожаловать, ${firstName}!</h2>
                                <p>Вы зарегистрировались на образовательной платформе LearnPro.</p>
                                
                                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1;">
                                    <h3>🔐 Ваши данные для входа:</h3>
                                    <p><strong>Логин:</strong> <code style="background: #1e293b; color: white; padding: 5px 10px; border-radius: 4px;">${login}</code></p>
                                    <p><strong>Пароль:</strong> <code style="background: #1e293b; color: white; padding: 5px 10px; border-radius: 4px;">${password}</code></p>
                                    <p><strong>Email:</strong> ${email}</p>
                                </div>
                                
                                <div style="background: #fffbeb; border: 1px solid #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                    <strong>⚠️ Важно:</strong> Сохраните эти данные! Они потребуются для входа в систему.
                                </div>
                                
                                <a href="${process.env.SITE_URL || 'https://your-app.onrender.com'}" 
                                   style="display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                                    Начать обучение →
                                </a>
                            </div>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log('✅ Email отправлен на:', email);
                
                return res.json({ 
                    success: true, 
                    message: '✅ Аккаунт создан! Данные отправлены на вашу почту.' 
                });

            } catch (emailError) {
                console.log('❌ Ошибка отправки email:', emailError.message);
            }
        }

        // Если email не отправлен, возвращаем данные в ответе
        res.json({ 
            success: true, 
            message: '✅ Аккаунт создан! Сохраните ваши данные.',
            credentials: {
                login: login,
                password: password,
                email: email
            }
        });

    } catch (error) {
        console.error('❌ Ошибка регистрации:', error);
        res.json({ 
            success: false, 
            message: 'Ошибка при создании аккаунта' 
        });
    }
});

// API для проверки работы сервера
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'LearnPro server is running',
        timestamp: new Date().toISOString()
    });
});

// Все остальные маршруты отправляют index.html (для SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`
🎓 LearnPro Platform
📍 Сервер запущен на порту: ${PORT}
🌐 Доступен по адресу: http://localhost:${PORT}
📧 Email сервис: ${transporter ? 'Настроен' : 'Режим разработки'}
    `);
});
// Добавьте в server.js
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    
    // Используйте переменные окружения!
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@learnpro.ru';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin2024!';
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Генерируем JWT токен
        const token = jwt.sign(
            { email, role: 'admin' },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '8h' }
        );
        
        res.json({
            success: true,
            token: token,
            admin: { email, name: 'Администратор' }
        });
    } else {
        res.status(401).json({ success: false, message: 'Неверные данные' });
    }
});
