import {month_tr} from "./contants.js"

// bugünün tarihini gün ay cinsinden tutar
export const getDate = () => {
    const date = new Date();

    const day = date.getDate();
    const monthIndex = date.getMonth();

    return day + ' ' +   month_tr[monthIndex] ;
}