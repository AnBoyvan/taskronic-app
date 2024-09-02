'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

import { BackgroundColors } from '@/components/shared/BackgroundColors';
import { UnsplashImage, UnsplashImages } from '@/components/shared/UnsplashImages';
import { Icon } from '@/components/ui/Icon';
import { BoardColor } from '@/constants/board-colors.constants';

type CreateBoardDrawerProps = {
	image?: string;
	color?: BoardColor;
	onImageSelect: (selected: UnsplashImage) => void;
	onColorSelect: (selected: BoardColor) => void;
};

export const CreateBoardDrawer: React.FC<CreateBoardDrawerProps> = ({
	image,
	color,
	onColorSelect,
	onImageSelect,
}) => {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState<'photo' | 'color' | null>(null);

	return (
		<>
			<Dropdown
				classNames={{
					base: 'w-28',
					content: 'min-w-24',
				}}
				placement="bottom-end"
				offset={0}
			>
				<DropdownTrigger>
					<Button isIconOnly variant="solid" size="sm" color="default">
						<Icon name="Ellipsis" size={16} />
					</Button>
				</DropdownTrigger>

				<DropdownMenu>
					<DropdownItem
						key="photo"
						title={t('common.photos')}
						onPress={() => {
							setIsOpen('photo');
						}}
					/>
					<DropdownItem
						key="color"
						title={t('common.colors')}
						onPress={() => {
							setIsOpen('color');
						}}
					/>
				</DropdownMenu>
			</Dropdown>

			{isOpen && (
				<div className="absolute left-0 top-0 flex flex-col h-full p-2 z-30 w-full bg-background">
					<Button
						isIconOnly
						variant="light"
						size="sm"
						radius="full"
						color="default"
						className="absolute top-1 right-1 text-foreground-500"
						onPress={() => setIsOpen(null)}
					>
						<Icon name="X" size={16} />
					</Button>
					{isOpen === 'photo' && (
						<UnsplashImages
							current={image}
							setCurrent={value => {
								onImageSelect(value);
								setIsOpen(null);
							}}
						/>
					)}
					{isOpen === 'color' && (
						<BackgroundColors
							current={color}
							setCurrent={value => {
								onColorSelect(value);
								setIsOpen(null);
							}}
						/>
					)}
				</div>
			)}
		</>
	);
};
