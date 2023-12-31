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

module.exports = {
    getNumberDay,
    chetOrNoChetWeek,
    smileFACE
}