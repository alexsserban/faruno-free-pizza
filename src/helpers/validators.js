import {helpers as vuelidateHelpers} from 'vuelidate/lib/validators';
import {createDateObject} from '../helpers';
import {db} from '@/main';

const uniquePhone = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }

    return new Promise(async resolve => {
        const data = await db
            .collection('orders')
            .where('phone', '==', value)
            .get();

        resolve(data.docs.length == 0);
    });
};

const uniqueEmail = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }

    return new Promise(async resolve => {
        const data = await db
            .collection('orders')
            .where('email', '==', value)
            .get();

        resolve(data.docs.length == 0);
    });
};

const dateEnoughTimeToPrepare = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }

    let {fullDate: date} = createDateObject(value);
    const now = new Date();

    // If order is made in the past, next validator will take the job
    if (date < now) return true;

    // Add 30minutes to time of the order
    now.setTime(now.getTime() + 30 * 60 * 1000);

    // Round to nearest 15min increment
    let ms = 1000 * 60 * 15;
    let roundedNow = new Date(Math.round(now.getTime() / ms) * ms);

    if (date < roundedNow) return false;
    return true;
};

const dateAvailableSlot = value => {
    if (!vuelidateHelpers.req(value)) {
        return true;
    }

    const now = new Date();
    let {fullDate: date} = createDateObject(value);

    if (date.getDate() == now.getDate() && date < now) return false;

    return new Promise(async resolve => {
        const doc = await db
            .collection('admin')
            .doc('iWkLWuYXqHvwd9tmpZrZ')
            .get();

        const [date, hour] = value.split(' ');

        if (!doc.data()[date] || !doc.data()[date][hour] || doc.data()[date][hour] <= 4) resolve(true);
        resolve(false);
    });
};

export {uniquePhone, uniqueEmail, dateEnoughTimeToPrepare, dateAvailableSlot};
