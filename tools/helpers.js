const getNumberDay = (dayWeek) => {
    if (dayWeek == "понедельник") return 0;
    if (dayWeek == "вторник") return 1;
    if (dayWeek == "среда") return 2;
    if (dayWeek == "четверг") return 3;
    if (dayWeek == "пятница") return 4;
    if (dayWeek == "суббота") return 5;
    if (dayWeek == "воскресенье") return 6;
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
    smileFACE,
    getTimePar
}