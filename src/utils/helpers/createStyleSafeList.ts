export const createStyleSafeList = (data: Object) => {
	const arr = Object.values(data);
	return arr.map(i => `${i}`);
};
