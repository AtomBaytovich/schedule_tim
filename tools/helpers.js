const getNumberDay = (dayWeek) => {
    if (dayWeek == "понедельник") return 0;
    if (dayWeek == "вторник") return 1;
    if (dayWeek == "среда") return 2;
    if (dayWeek == "четверг") return 3;
    if (dayWeek == "пятница") return 4;
    if (dayWeek == "суббота") return 5;
    if (dayWeek == "воскресенье") return 6;
}

const chetOrNoChetWeek = (date = new Date()) => {
    //https://dwweb.ru/chetnost_nedeli.html#paragraph_javascript_even_odd_week_2
    let d0 = new Date(date).getTime(),

        d = new Date(new Date(date).getFullYear(), 0, 1),

        d1 = d.getTime(),

        dd = d.getDay(),

        re = Math.floor((d0 - d1) / 8.64e7) + (dd ? dd - 1 : 6);

    if (Math.floor(re / 7) % 2) {
        return 'нечётная'
    } else {
        return 'чётная'
    }
}

const smileFACE = (num) => {
    if (num == 1) return '1️⃣'
    if (num == 2) return '2️⃣'
    if (num == 3) return '3️⃣'
    if (num == 4) return '4️⃣'
    if (num == 5) return '5️⃣'
    if (num == 6) return '6️⃣'
}

const getTimePar = (num) => {
    if (num == 1) return "09.00-10.35"
    if (num == 2) return "10.55-12.30"
    if (num == 3) return "13.00-14.35"
    if (num == 4) return "14.55-16.30"
    if (num == 5) return "16.50-18.25"
}

module.exports = {
    getNumberDay,
    chetOrNoChetWeek,
    smileFACE,
    getTimePar
}