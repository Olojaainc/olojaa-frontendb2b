import dayjs from 'dayjs';
import { TransactionFilterType } from '../Types/Interfaces/ITransactions';

const formatDateLong = (date: string | Date | undefined) => {
	return dayjs(date).format('MMMM D, YYYY');
};

const formatDateShort = (date: string | Date | undefined) => {
	if (date === undefined) return '';
	return dayjs(date).format('YYYY-MM-DD');
};

const getFilterDisplayText = (filter?: TransactionFilterType): string => {
	switch (filter) {
		case 'yesterday':
			return 'yesterday';
		case '2_days_ago':
			return '2 days ago';
		case '3_days_ago':
			return '3 days ago';
		case 'last_7_days':
			return 'last 7 days';
		case 'last_30_days':
			return 'last 30 days';
		case 'last_90_days':
			return 'last 90 days';
		case 'last_365_days':
			return 'last 365 days';
		case 'last_month':
			return 'last month';
		case 'last_12_months':
			return 'last 12 months';
		case 'last_year':
			return 'last year';
		case 'date_range':
			return 'selected period';
		default:
			return 'yesterday';
	}
};

export {formatDateLong, formatDateShort, getFilterDisplayText}