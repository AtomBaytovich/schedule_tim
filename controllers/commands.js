const raspJson = require('../rasp.json');
const moment = require("moment/moment");
const { dateRaspButton } = require('./buttons');
const { getNumberDay, chetOrNoChetWeek, smileFACE } = require('../tools/helpers');
moment.locale("ru")

const start = (ctx) => {
    
    ctx.reply(`
        ❤️ Привет, ${ctx.from.first_name}! 
    ❔ Я помогу тебе с расписанием 
    🖥 Д-Э 207, команды:
    /rasp - получить расписание на сегодня
    `);
}

const rasp = (command, date = new Date()) => {
    //https://dwweb.ru/chetnost_nedeli.html#paragraph_javascript_even_odd_week_2
    let dateBack = moment().add(-1, 'days').format('L')
    let dateNext = moment().add(+1, 'days').format('L')
    let dayWeek = moment().format('dddd');
    let chetOrNechet = chetOrNoChetWeek()

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
                text += `\n${smileFACE(i + 1)}. ${dataNow[i][0]}`
            } else {
                if (dataNow[i][1].length < 2) continue
                text += `\n${smileFACE(i + 1)}. ${dataNow[i][1]}`
            }
        } else {
            if (dataNow[i][0].length < 2) continue
            text += `\n${smileFACE(i + 1)}. ${dataNow[i][0]}`
        }
    }

    return {
        text,
        dateBack,
        dateNext
    }
}


const raspMessage = (ctx) => {
    let { text, dateBack, dateNext } = rasp(ctx)

    ctx.reply(text, {
        ...dateRaspButton({ dateBack, dateNext })
    });
}

const raspNextMessage = (ctx) => {
    const dateCallback = ctx.match["input"].split(" ")[1]
    let { text, dateBack, dateNext } = rasp("движение", moment(dateCallback, "DD MM YYYY"))

    ctx.deleteMessage()
    ctx.reply(text, {
        ...dateRaspButton({ dateBack, dateNext })
    });
}

const raspBackMessage = (ctx) => {
    const dateCallback = ctx.match["input"].split(" ")[1]
    let { text, dateBack, dateNext } = rasp("движение", moment(dateCallback, "DD MM YYYY"))

    ctx.deleteMessage()
    ctx.reply(text, {
        ...dateRaspButton({ dateBack, dateNext })
    });
}

module.exports = {
    start,
    raspMessage,
    raspNextMessage,
    raspBackMessage
}