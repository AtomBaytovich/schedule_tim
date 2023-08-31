const { Telegraf } = require('telegraf');
const { start, raspMessage, raspMovementMessage, help } = require('./controllers/commands');

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
    bot.start((ctx) => start(ctx, false));
    bot.action('start', (ctx) => start(ctx, true))

    bot.command('rasp', (ctx) => raspMessage(ctx, false))

    bot.action('nowTime', (ctx) => raspMessage(ctx, true))
    bot.action(/^back\s/, raspMovementMessage)
    bot.action(/^next\s/, raspMovementMessage)

    bot.command('help', help)
    return bot;
}

module.exports = {
    setupBot
}