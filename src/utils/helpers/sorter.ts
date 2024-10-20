type Order = 'asc' | 'desc' | 'ascending' | 'descending';

interface PriorityItem<T> {
	field: keyof T;
	value: any;
}

export const sorter = <T>(
	array: T[],
	field: keyof T,
	order: Order = 'asc',
	priorityItem?: PriorityItem<T>,
): T[] => {
	const prioritizedArray: T[] = [];

	if (priorityItem) {
		const priorityIndex = array.findIndex(item => item[priorityItem.field] === priorityItem.value);

		if (priorityIndex !== -1) {
			const [priorityObject] = array.splice(priorityIndex, 1);
			prioritizedArray.push(priorityObject);
		}
	}

	const sortedArray = array.sort((a, b) => {
		const aValue = a[field];
		const bValue = b[field];
		const isDateField = field === 'createdAt' || field === 'updatedAt' || 'dueDate';

		let aField: any = aValue;
		let bField: any = bValue;

		if (isDateField) {
			aField = new Date(aValue as unknown as string);
			bField = new Date(bValue as unknown as string);
		}

		if (typeof aField === 'string' && typeof bField === 'string') {
			const aFieldLower = aField.toLowerCase();
			const bFieldLower = bField.toLowerCase();
			if (order === 'asc' || order === 'ascending') {
				return aFieldLower.localeCompare(bFieldLower);
			} else {
				return bFieldLower.localeCompare(aFieldLower);
			}
		} else if (typeof aField === 'number' && typeof bField === 'number') {
			if (order === 'asc' || order === 'ascending') {
				return aField - bField;
			} else {
				return bField - aField;
			}
		} else if (typeof aField === 'boolean' && typeof bField === 'boolean') {
			if (order === 'asc' || order === 'ascending') {
				return aField === bField ? 0 : aField ? -1 : 1;
			} else {
				return aField === bField ? 0 : aField ? 1 : -1;
			}
		} else if (aField instanceof Date && bField instanceof Date) {
			if (order === 'asc' || order === 'ascending') {
				return aField.getTime() - bField.getTime();
			} else {
				return bField.getTime() - aField.getTime();
			}
		}

		return 0;
	});

	return [...prioritizedArray, ...sortedArray];
};
