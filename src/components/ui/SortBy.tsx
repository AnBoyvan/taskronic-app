import { useTranslations } from 'next-intl';

import { Select, SelectItem, SelectProps, SharedSelection } from '@nextui-org/react';

export type SortingVariant = {
	field: string;
	order: 'asc' | 'desc';
	label: TranslationKeys;
};

interface SortByProps extends Partial<SelectProps> {
	current: SortingVariant;
	setCurrent: (value: SortingVariant) => void;
}

const sortingVariants: SortingVariant[] = [
	{ field: 'updatedAt', order: 'desc', label: 'sort.by_active' },
	{ field: 'title', order: 'asc', label: 'sort.by_title_asc' },
	{ field: 'title', order: 'desc', label: 'sort.by_title_desc' },
	{ field: 'createdAt', order: 'desc', label: 'sort.by_created_desc' },
	{ field: 'createdAt', order: 'asc', label: 'sort.by_created_asc' },
];

export const SortBy: React.FC<SortByProps> = ({ current, setCurrent, ...props }) => {
	const t = useTranslations();

	const changeVariant = (key: SharedSelection) => {
		const selectedKey = Array.from(key)[0];
		if (typeof selectedKey === 'string') {
			const [field, order] = selectedKey.split('-');
			const selectedVariant = sortingVariants.find(
				variant => variant.field === field && variant.order === order,
			);
			if (selectedVariant) setCurrent(selectedVariant);
		}
	};

	return (
		<Select
			aria-label={t('label.sort')}
			labelPlacement="outside"
			label={t('label.sort')}
			placeholder={t('placeholder.select')}
			disallowEmptySelection
			selectionMode="single"
			variant={props.variant || 'bordered'}
			size={props.size || 'md'}
			selectedKeys={[`${current.field}-${current.order}`]}
			onSelectionChange={key => changeVariant(key)}
			{...props}
		>
			{sortingVariants.map(variant => (
				<SelectItem key={`${variant.field}-${variant.order}`} aria-label={t(variant.label)}>
					{t(variant.label)}
				</SelectItem>
			))}
		</Select>
	);
};
