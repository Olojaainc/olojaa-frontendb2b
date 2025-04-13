import dayjs from 'dayjs';

const formatDateLong = (date: string | Date | undefined) => {
	return dayjs(date).format('MMMM D, YYYY');
};

const formatDateShort = (date: string | Date | undefined) => {
	if (date === undefined) return '';
	return dayjs(date).format('YYYY-MM-DD');
};

export {formatDateLong, formatDateShort}