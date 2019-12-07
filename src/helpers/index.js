const isNotToday = date => date.getDate() != new Date().getDate();

const isUpcoming = date => isNotToday(date) && date.getTime() > new Date().getTime();
const isPrevious = date => isNotToday(date) && date.getTime() < new Date().getTime();

const getAvailableDays = (orders, isFuture) => {
    let dateCheck;
    const arr = [];
    const map = new Map();

    if (isFuture) dateCheck = isUpcoming;
    else dateCheck = isPrevious;

    orders.forEach(order => {
        if (!map.has(order.date.getDate()) && dateCheck(order.date)) {
            map.set(order.date.getDate(), true);
            arr.push(order.date);
        }
    });

    return arr;
};

const statusRanking = {
    pending: 0,
    completed: 1,
    cancelled: 2
};

const sortByStatus = (a, b) => statusRanking[a.status] - statusRanking[b.status];

const createDateObject = initialDate => {
    const [date, time] = initialDate.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minutes] = time.split(':');
    return {
        date,
        time,
        fullDate: new Date(year, month - 1, day, hour, minutes)
    };
};

export {getAvailableDays, sortByStatus, createDateObject};
