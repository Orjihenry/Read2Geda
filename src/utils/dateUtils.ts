import dayjs from "dayjs";

export const getToday = () => dayjs();

export const getCurrentDate = () => getToday().format("YYYY-MM-DD");

export const getCurrentDateTime = () => getToday().format("YYYY-MM-DD HH:mm:ss");
