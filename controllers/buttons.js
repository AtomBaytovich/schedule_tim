const { Markup } = require('telegraf');

const dateRaspButton = ({dateBack = 0, dateNext = 0}) => 
    Markup.inlineKeyboard([
        [
        Markup.button.callback(
            '⬅️',
            `back ${dateBack}`
        ),
        Markup.button.callback(
            '➡️',
            `next ${dateNext}`
        )
        ],
        [Markup.button.callback(
            'Меню',
            `start`
        )],
    ]).resize()


module.exports = {
    dateRaspButton
}