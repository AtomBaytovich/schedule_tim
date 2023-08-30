const { Telegraf } = require('telegraf');
const { start, raspMessage, raspNextMessage, raspBackMessage } = require('./controllers/commands');

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {

    // команда "/start" аналог cmd.command('start', handler)
    bot.start(start);
    // прослушка на сообщение 
    bot.hears('start', start)
    bot.action('start', start)

    bot.command('rasp', raspMessage)

    bot.action(/^back\s/, raspBackMessage)
    bot.action(/^next\s/, raspNextMessage)
    return bot;
}


module.exports = {
    setupBot
}