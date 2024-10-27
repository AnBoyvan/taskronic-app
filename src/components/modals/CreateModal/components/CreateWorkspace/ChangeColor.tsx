'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';
import { WorkspaceIcon } from '@/constants/workspace-icons.constants';

type ChangeColorProps = {
	currentColor: ColorVariant;
	currentIcon: WorkspaceIcon;
	onColorSelect: (color: ColorVariant) => void;
};

export const ChangeColor: React.FC<ChangeColorProps> = ({
	currentIcon,
	currentColor,
	onColorSelect,
}) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const selectColor = (color: ColorVariant) => {
		onColorSelect(color);
		setIsOpen(false);
	};

	const colors = Object.keys(colorVariants) as ColorVariant[];

	return (
		<Popover
			placement="bottom"
			offset={0}
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			radius="md"
		>
			<PopoverTrigger>
				<Button variant="bordered" size="sm" className="w-28">
					{t('workspace.change_color')}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="grid grid-cols-6 gap-2 p-2">
				{colors.map(color => (
					<Button
						key={color}
						radius="sm"
						isIconOnly
						isDisabled={color === currentColor}
						className={colorVariants[color]}
						onPress={() => selectColor(color)}
					>
						<Icon name={currentIcon} size={24} />
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
};
