export type SortingVariant = {
	field: string;
	order: 'asc' | 'desc';
	label: TranslationKeys;
};

export const sortingVariants: SortingVariant[] = [
	{ field: 'updatedAt', order: 'desc', label: 'sort.by_active' },
	{ field: 'title', order: 'asc', label: 'sort.by_title_asc' },
	{ field: 'title', order: 'desc', label: 'sort.by_title_desc' },
	{ field: 'createdAt', order: 'desc', label: 'sort.by_created_desc' },
	{ field: 'createdAt', order: 'asc', label: 'sort.by_created_asc' },
];
