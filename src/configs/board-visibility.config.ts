export type Visibility = {
	value: 'private' | 'public';
	label: TranslationKeys;
	descr: TranslationKeys;
};

export const boardVisibility: Visibility[] = [
	{
		value: 'private',
		label: 'board.private',
		descr: 'board.private_descr',
	},
	{
		value: 'public',
		label: 'board.public',
		descr: 'board.public_descr',
	},
];
