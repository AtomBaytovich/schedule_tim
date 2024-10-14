const raspJson = require('../rasp.json');
const moment = require('moment-timezone');
const { dateRaspButton, menuButton } = require('./buttons');
const { getNumberDay, smileFACE, getTimePar } = require('../tools/helpers');
moment.locale("ru");
moment.tz.setDefault('Europe/Moscow');

const start = (ctx) => {
    return ctx.reply(`
        ❤️ Привет, ${ctx.from.first_name}! 
    ❔ Я помогу тебе с расписанием 
    🖥 Д-Э 207, команды:\n
    /rasp - получить расписание на сегодня
    /help - как пользоваться ботом
    `);
}

const startDate = moment('2024-09-02'); // 2 сентября 2024 года

function chetOrNoChetWeek(currentDate) {
    const daysDifference = currentDate.diff(startDate, 'days');
    const weekNumber = Math.floor(daysDifference / 7) + 1; // Добавляем 1, так как первая неделя считается первой

    return (weekNumber % 2 === 0) ? 'чётная' : 'нечётная';
}

function updateDateInfo(date = moment()) {
    const dateBack = date.clone().add(-1, 'days').format('L');
    const dateNext = date.clone().add(+1, 'days').format('L');
    const dayWeek = date.format('dddd');
    const chetOrNechet = chetOrNoChetWeek(date);

    return { dateBack, dateNext, dayWeek, chetOrNechet };
}

const rasp = (command, date) => {
    try {
        let { dateBack, dateNext, dayWeek, chetOrNechet } = updateDateInfo();

        if (command === "движение") {
            ({ dateBack, dateNext, dayWeek, chetOrNechet } = updateDateInfo(moment(date)));
        }

        let dayWeeekNumber = getNumberDay(dayWeek);
        const dataNow = raspJson[dayWeeekNumber][dayWeek];

        let text = ``;
        text += `Неделя: ${chetOrNechet}, ${moment(date).format('DD.MM.YYYY')}, ${dayWeek}\n`;

        for (let i = 0; i < dataNow.length; i++) {
            if (dataNow[i].length > 1) {
                if (chetOrNechet === 'нечётная') {
                    if (dataNow[i][0].length < 2) continue;
                    text += `\n\n${smileFACE(i + 1)}. <b>${getTimePar(i + 1)}</b> | <code>${dataNow[i][0]}</code>`;
                } else {
                    if (dataNow[i][1].length < 2) continue;
                    text += `\n\n${smileFACE(i + 1)}. <b>${getTimePar(i + 1)}</b> | <code>${dataNow[i][1]}</code>`;
                }
            } else {
                if (dataNow[i][0].length < 2) {
                    text += `\n\n${smileFACE(i + 1)}. <b>${getTimePar(i + 1)}</b> | <code>Пары нет. Окно</code>`;
                    continue;
                }
                text += `\n\n${smileFACE(i + 1)}. <b>${getTimePar(i + 1)}</b> | <code>${dataNow[i][0]}</code>`;
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
        console.log(error);
    }
}

const raspMessage = (ctx, isEdit) => {
    try {
        let { text, dateBack, dateNext, isNow } = rasp(ctx);

        if (isEdit) {
            ctx.editMessageText(text, {
                parse_mode: 'HTML',
                ...dateRaspButton({ dateBack, dateNext, isNow })
            }).catch((error) => console.log(error));
        } else {
            ctx.replyWithHTML(text, {
                ...dateRaspButton({ dateBack, dateNext, isNow })
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const raspMovementMessage = (ctx) => {
    try {
        const dateCallback = ctx.match["input"].split(" ")[1];

        let { text, dateBack, dateNext, isNow } = rasp("движение", moment(dateCallback, "DD MM YYYY"));

        ctx.editMessageText(text, {
            parse_mode: 'HTML',
            ...dateRaspButton({ dateBack, dateNext, isNow })
        }).catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
}

const help = (ctx) => {
    return ctx.replyWithHTML(`Привет! Меня сделал <a href="https://t.me/atombaytovich">Володя</a>)\n
Пробежимся по командам: 

/rasp - покажет тебе расписание на сегодняшний день, кнопки ⬅️➡️ помогут посмотреть что было вчера или будет завтра
Если появляется ♦️, то можно вернуться на сегодняшний день по расписанию

Спасибо <a href="https://t.me/s0ft1">Глебасу</a>! Вместе оплачиваем сервак ❤️ 

`, {
        ...menuButton,
        disable_web_page_preview: true
    });
}

///calend - покажет тебе календарное расписание занятий
module.exports = {
    start,
    raspMessage,
    raspMovementMessage,
    help
}
