# Firebase Google Authentication Demo

Это демо-проект, демонстрирующий аутентификацию пользователей через Google с использованием Firebase Authentication.

## 🚀 Функциональность

- Вход через Google аккаунт
- Отображение информации о пользователе (имя, email, фото)
- Выход из системы
- Статусные сообщения об операциях
- Адаптивный дизайн

## 📋 Предварительные требования

1. **Firebase проект**: У вас должен быть настроенный проект в Firebase Console
2. **Google Auth Provider**: Включите Google в Authentication > Sign-in method
3. **Веб-сервер**: Для тестирования локально (например, Live Server в VS Code)

## 🛠️ Настройка проекта

### 1. Клонируйте или скачайте файлы проекта

Проект состоит из следующих файлов:
- `index.html` - основная HTML структура
- `styles.css` - стили интерфейса
- `script.js` - логика аутентификации
- `README.md` - инструкции

### 2. Настройка Firebase

Если вы хотите использовать свой проект Firebase:

1. Перейдите в [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект или выберите существующий
3. В разделе Authentication > Sign-in method включите Google
4. В разделе Project settings получите конфигурацию
5. Замените конфигурацию в файле `script.js`:

```javascript
const firebaseConfig = {
    apiKey: "ВАШ_API_KEY",
    authDomain: "ВАШ_PROJECT.firebaseapp.com",
    projectId: "ВАШ_PROJECT",
    storageBucket: "ВАШ_PROJECT.appspot.com",
    messagingSenderId: "ВАШ_SENDER_ID",
    appId: "ВАШ_APP_ID",
    measurementId: "ВАШ_MEASUREMENT_ID"
};
```

### 3. Добавьте домен в Authorized domains

В Firebase Console > Authentication > Settings добавьте ваш локальный домен:
- Для локального тестирования: `localhost`
- Для продакшена: ваш домен

## ▶️ Запуск проекта

### Локально с веб-сервером

1. Откройте проект в VS Code
2. Установите расширение "Live Server"
3. Кликните правой кнопкой на `index.html` и выберите "Open with Live Server"
4. Или используйте любой другой локальный веб-сервер

### Альтернативные способы

- Используйте Python: `python -m http.server 8000`
- Используйте Node.js с `http-server`: `npx http-server`
- Откройте файл напрямую в браузере (некоторые функции могут не работать)

## 🎯 Использование

1. **Вход**: Нажмите кнопку "Войти через Google"
2. **Выбор аккаунта**: Выберите Google аккаунт в всплывающем окне
3. **Разрешения**: Подтвердите доступ к email и профилю
4. **Информация**: После входа отобразится информация о пользователе
5. **Выход**: Нажмите кнопку "Выйти" для выхода из системы

## 📱 Адаптивность

Проект адаптирован для различных устройств:
- Десктоп
- Планшеты
- Мобильные устройства

## 🔧 Технические детали

### Используемые Firebase сервисы:
- **Firebase Authentication**: для аутентификации
- **Google Auth Provider**: для входа через Google

### Браузерная поддержка:
- Chrome/Chromium (рекомендуется)
- Firefox
- Safari
- Edge

## 🐛 Устранение неполадок

### Проблема: "Auth domain not authorized"
**Решение**: Добавьте ваш домен в Authorized domains в Firebase Console

### Проблема: "Invalid API key"
**Решение**: Проверьте корректность API ключа в конфигурации

### Проблема: Кнопка входа не работает
**Решение**: Убедитесь, что файл открывается через веб-сервер, а не напрямую из файловой системы

### Проблема: CORS ошибка
**Решение**: Всегда запускайте через локальный веб-сервер

## 📚 Дополнительные ресурсы

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Sign-In for Websites](https://developers.google.com/identity/sign-in/web/sign-in)

## 🤝 Вклад в проект

Если вы нашли баг или хотите улучшить проект:
1. Создайте issue в репозитории
2. Предложите изменения через Pull Request

## 📄 Лицензия

Этот проект создан для демонстрационных целей и может использоваться свободно.



