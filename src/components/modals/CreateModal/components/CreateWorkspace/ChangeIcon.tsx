'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';
import { WorkspaceIcon, workspaceIconsArray } from '@/constants/workspace-icons.constants';

type ChangeIconProps = {
	currentColor: ColorVariant;
	currentIcon: WorkspaceIcon;
	onIconSelect: (color: WorkspaceIcon) => void;
};

export const ChangeIcon: React.FC<ChangeIconProps> = ({
	currentColor,
	currentIcon,
	onIconSelect,
}) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const selectColor = (color: WorkspaceIcon) => {
		onIconSelect(color);
		setIsOpen(false);
	};

	return (
		<Popover placement="bottom" offset={0} isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
			<PopoverTrigger>
				<Button variant="bordered" size="sm" className="w-28">
					{t('workspace.change_icon')}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="grid grid-cols-6 gap-2 p-2">
				{workspaceIconsArray.map(icon => (
					<Button
						key={icon}
						isIconOnly
						isDisabled={icon === currentIcon}
						className={colorVariants[currentColor]}
						onPress={() => selectColor(icon)}
					>
						<Icon name={icon} size={24} />
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
};
