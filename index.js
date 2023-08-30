require('dotenv').config({ path: './.env' })
const { setupBot } = require('./bot');

try {
    setupBot().launch();
    console.log("</ Бот успешно запущен >")
} catch (error) {
    console.log('Ошибка запуска: ', error)
}
