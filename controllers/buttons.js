const { Markup } = require('telegraf');

const dateRaspButton = ({ dateBack = 0, dateNext = 0, isNow = undefined }) => {

    const opr = () => {
        if (isNow == false) return [
            Markup.button.callback(
                '⬅️',
                `back ${dateBack}`
            ),
            Markup.button.callback(
                '♦️',
                `nowTime`
            ),
            Markup.button.callback(
                '➡️',
                `next ${dateNext}`
            )
        ]
        return [
            Markup.button.callback(
                '⬅️',
                `back ${dateBack}`
            ),
            Markup.button.callback(
                '➡️',
                `next ${dateNext}`
            )
        ]
    }

    return Markup.inlineKeyboard([
        opr()
        ,
        [Markup.button.callback(
            'Меню',
            `start`
        )],
    ]).resize()
}

const menuButton = Markup.inlineKeyboard([
    [Markup.button.callback(
        'Меню',
        `start`
    )],
]).resize()

module.exports = {
    dateRaspButton,
    menuButton
}