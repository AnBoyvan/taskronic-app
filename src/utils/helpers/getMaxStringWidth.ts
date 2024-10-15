export const getMaxStringWidth = (words: string[], fontSize: number) => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	if (!context) return 0;

	context.font = `${fontSize}px Roboto`;

	let maxWidth = 0;

	words.forEach(word => {
		const width = context.measureText(word).width;
		if (width > maxWidth) {
			maxWidth = width;
		}
	});

	return maxWidth;
};
