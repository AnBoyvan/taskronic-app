'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Select, SelectItem, SelectProps, SharedSelection } from '@nextui-org/react';

import { boardVisibility, Visibility } from '@/configs/board-visibility.config';

interface VisibilitySwitcherProps extends Partial<SelectProps> {
	current?: boolean;
	setCurrent: (value: boolean) => void;
}

export const VisibilitySwitcher: React.FC<VisibilitySwitcherProps> = ({
	current = false,
	setCurrent,
	classNames,
	...props
}) => {
	const t = useTranslations();

	const [visibility, setVisibility] = useState<Visibility['value']>('private');

	const changeVariant = (key: SharedSelection) => {
		const selectedKey = Array.from(key)[0] as Visibility['value'];

		setVisibility(selectedKey);
		setCurrent(selectedKey === 'private');
	};

	useEffect(() => {
		if (!current) {
			setVisibility('public');
		}
	}, [current]);

	return (
		<Select
			aria-label={t('common.visibility')}
			labelPlacement="outside"
			label={t('common.visibility')}
			placeholder={t('actions.select')}
			disallowEmptySelection
			selectionMode="single"
			radius="sm"
			variant={props.variant || 'bordered'}
			size={props.size || 'md'}
			selectedKeys={[visibility]}
			onSelectionChange={key => changeVariant(key)}
			classNames={{ popoverContent: 'rounded-lg', ...classNames }}
			{...props}
		>
			{boardVisibility.map(({ value, label, descr }) => (
				<SelectItem key={value} aria-label={t(label)} title={t(label)} description={t(descr)} />
			))}
		</Select>
	);
};
