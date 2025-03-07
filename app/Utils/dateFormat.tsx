import dayjs from 'dayjs';

const formatDateLong = (date: string) => {
	return dayjs(date).format('MMMM D, YYYY');
};

const formatDateShort = (date: string | Date | undefined) => {
	if (date === undefined) return '';
	return dayjs(date).format('DD/MM/YYYY');
};

export {formatDateLong, formatDateShort}