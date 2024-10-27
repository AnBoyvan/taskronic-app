export type SortingVariant = {
	field: string;
	order: 'asc' | 'desc';
	label: TranslationKeys;
};

export const sortingVariants: SortingVariant[] = [
	{ field: 'updatedAt', order: 'desc', label: 'actions.sort_active' },
	{ field: 'title', order: 'asc', label: 'actions.sort_title_asc' },
	{ field: 'title', order: 'desc', label: 'actions.sort_title_desc' },
	{ field: 'createdAt', order: 'desc', label: 'actions.sort_created_desc' },
	{ field: 'createdAt', order: 'asc', label: 'actions.sort_created_asc' },
];
