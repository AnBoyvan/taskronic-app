export const createStyleSafeList = (data: Object): string[] => {
	const arr = Object.values(data);
	return arr.map(i => `${i}`);
};
