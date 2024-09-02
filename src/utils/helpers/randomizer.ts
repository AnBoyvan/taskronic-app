export const randomizer = <T>(array: T[], count: number): T[] => {
	const shuffledArray = [...array].sort(() => 0.5 - Math.random());

	return shuffledArray.slice(0, count);
};
