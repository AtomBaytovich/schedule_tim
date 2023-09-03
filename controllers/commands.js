const raspJson = require('../rasp.json');
//const moment = require("moment/moment");
const moment = require('moment-timezone')
const { dateRaspButton, menuButton } = require('./buttons');
const { getNumberDay, chetOrNoChetWeek, smileFACE, getTimePar } = require('../tools/helpers');
moment.locale("ru")
moment.tz.setDefault('Europe/Moscow')

const start = (ctx) => {
    return ctx.reply(`
        ❤️ Привет, ${ctx.from.first_name}! 
    ❔ Я помогу тебе с расписанием 
    🖥 Д-Э 107, команды:\n
    /rasp - получить расписание на сегодня
    /help - как пользоваться ботом
    `);
}

const rasp = (command, date = new Date()) => {
    try {
        let dateBack = moment().add(-1, 'days').format('L')
        let dateNext = moment().add(+1, 'days').format('L')
        let dayWeek = moment().format('dddd');
        let chetOrNechet = chetOrNoChetWeek(moment().format('DD MM YYYY'))
        console.log(moment())
        if (command == "движение") {
            dateBack = moment(date).add(-1, 'days').format('L')
            dateNext = moment(date).add(+1, 'days').format('L')
            dayWeek = moment(date).format('dddd');
            chetOrNechet = chetOrNoChetWeek(date)
        }

        let dayWeeekNumber = getNumberDay(dayWeek)
        const dataNow = raspJson[dayWeeekNumber][dayWeek]

        let text = ``;
        text += `Неделя: ${chetOrNechet}, ${moment(date).format('DD.MM.YYYY')}, ${dayWeek}\n`

        for (let i = 0; i < dataNow.length; i++) {
            console.log(dataNow[i])
            if (dataNow[i].length > 1) {

                if (chetOrNechet == 'нечётная') {
                    if (dataNow[i][0].length < 2) continue
                    text += `\n\n${smileFACE(i + 1)}. <b>${getTimePar(i + 1)}</b> | <code>${dataNow[i][0]}</code>`
                } else {
                    if (dataNow[i][1].length < 2) continue
                    text += `\n\n${smileFACE(i + 1)}. <b>${getTimePar(i + 1)}</b> | <code>${dataNow[i][1]}</code>`
                }
            } else {
                if (dataNow[i][0].length < 2) continue
                text += `\n\n${smileFACE(i + 1)}. <b>${getTimePar(i + 1)}</b> | <code>${dataNow[i][0]}</code>`
            }
        }

        const isNow = moment(date).isSame(moment(), 'day');
        return {
            text,
            dateBack,
            dateNext,
            isNow
        }

    } catch (error) {
        console.log(error)
    }
}


const raspMessage = (ctx, isDel) => {
    try {
        let { text, dateBack, dateNext, isNow } = rasp(ctx)
        if (isDel) ctx.deleteMessage()
        ctx.replyWithHTML(text, {
            ...dateRaspButton({ dateBack, dateNext, isNow })
        });
    } catch (error) {
        console.log(error)
    }
}

const raspMovementMessage = (ctx) => {
    try {
        const dateCallback = ctx.match["input"].split(" ")[1]
        let { text, dateBack, dateNext, isNow } = rasp("движение", moment(dateCallback, "DD MM YYYY"))

        ctx.deleteMessage()
        ctx.replyWithHTML(text, {
            ...dateRaspButton({ dateBack, dateNext, isNow })
        });
    } catch (error) {
        console.log(error)
    }
}

const help = (ctx) => {
    return ctx.replyWithHTML(`Привет! Меня сделал <a href="https://t.me/atombaytovich">Володя</a>)\n
Пробежимся по командам: 

/rasp - покажет тебе расписание на сегодняшний день, кнопки ⬅️➡️ помогут посмотреть что было вчера или будет завтра
Если появляется ♦️, то можно вернуться на сегодняшний день по расписанию


`, {
        ...menuButton,
        disable_web_page_preview: true
    })
}
///calend - покажет тебе календарное расписание занятий
module.exports = {
    start,
    raspMessage,
    raspMovementMessage,
    help
}