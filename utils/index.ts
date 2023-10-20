export const formatDateToYYYYMM = (dateTimeString: string): string => {
	const date = new Date(dateTimeString);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 因為月份是從0開始的
	return `${year}-${month}`;
};
