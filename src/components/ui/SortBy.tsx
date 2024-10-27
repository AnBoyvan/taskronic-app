import { useTranslations } from 'next-intl';

import { Select, SelectItem, SelectProps, SharedSelection } from '@nextui-org/react';

import { SortingVariant, sortingVariants } from '@/configs/sorting-variants.config';

interface SortByProps extends Partial<SelectProps> {
	current: SortingVariant;
	setCurrent: (value: SortingVariant) => void;
}

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
			aria-label={t('actions.sort')}
			labelPlacement="outside"
			label={t('actions.sort')}
			placeholder={t('actions.select')}
			disallowEmptySelection
			selectionMode="single"
			variant={props.variant || 'bordered'}
			size={props.size || 'md'}
			radius="sm"
			selectedKeys={[`${current.field}-${current.order}`]}
			onSelectionChange={key => changeVariant(key)}
			popoverProps={{
				className: 'w-fit',
				radius: 'md',
			}}
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
