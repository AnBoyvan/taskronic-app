'use client';

import Image from 'next/image';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Link } from '@nextui-org/react';

import { UnsplashImage } from '@/components/shared/UnsplashImages';
import { Icon } from '@/components/ui/Icon';
import { BoardColor, boardColors } from '@/constants/board-colors.constants';
import { defaultImages } from '@/constants/default-images.constants';
import { getTextColor } from '@/utils/helpers/getTextColor';
import { randomizer } from '@/utils/helpers/randomizer';

import { CreateBoardDrawer } from './CreateBoardDrawer';

type NewBoardBackgroundProps = {
	setImg: (thumbImage?: string, bgImage?: string, textColor?: string) => void;
	setColor: (value?: BoardColor, textColor?: string) => void;
};

export const NewBoardBackground: React.FC<NewBoardBackgroundProps> = ({ setColor, setImg }) => {
	const [images, setImages] = useState<UnsplashImage[]>(randomizer(defaultImages, 3));
	const [colors, setColors] = useState<BoardColor[]>(
		randomizer(Object.keys(boardColors), 5) as BoardColor[],
	);
	const [selectedImageId, setSelectedImageId] = useState<string | undefined>(undefined);
	const [selectedColor, setSelectedColor] = useState<BoardColor | undefined>(undefined);

	const onImageSelect = (selected: UnsplashImage) => {
		const {
			id,
			color,
			urls: { small, full },
		} = selected;

		const textColor = getTextColor({ color: color || undefined });

		if (!images.map(i => i.id).includes(id)) {
			setImages([selected, ...images.slice(1)]);
		}

		setSelectedImageId(selected.id);
		setSelectedColor(undefined);
		setColor(undefined, undefined);
		setImg(small, full, textColor);
	};

	const onColorSelect = (selected: BoardColor) => {
		const textColor = getTextColor({ boardColor: selected });

		if (!colors.includes(selected)) {
			setColors([selected, ...colors.slice(1)]);
		}

		setSelectedImageId(undefined);
		setSelectedColor(selected);
		setImg(undefined, undefined, undefined);
		setColor(selected, textColor);
	};

	useEffect(() => {
		onImageSelect(images[0]);
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<div className="grid grid-cols-3 gap-1">
				{images.map(image => (
					<div
						key={image.id}
						className={clsx(
							'cursor-pointer relative rounded-md aspect-video group hover:opacity-70 transition ',
							image.id === selectedImageId && 'opacity-70',
						)}
						onClick={() => onImageSelect(image)}
					>
						{image.id === selectedImageId && (
							<Icon
								name="Check"
								size={24}
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary"
							/>
						)}
						<Link
							underline="hover"
							href={image.links.html}
							target="_blank"
							className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 p-0.5 text-[10px] truncate text-white bg-black/50"
						>
							{image.user.name}
						</Link>
						<Image
							src={image.urls.thumb}
							alt="Unsplash image"
							className="object-cover rounded-md -z-10"
							sizes="96px"
							fill
						/>
					</div>
				))}
			</div>
			<div className="flex flex-row gap-1">
				<div className="grid grid-cols-5 gap-1 w-full">
					{colors.map(color => (
						<div
							key={color}
							className={clsx(
								'cursor-pointer flex items-center justify-center hover:opacity-70 transition rounded-md',
								`${boardColors[color]}`,
								color === selectedColor && 'opacity-70',
							)}
							onClick={() => onColorSelect(color as BoardColor)}
						>
							{color === selectedColor && <Icon name="Check" size={24} />}
						</div>
					))}
				</div>
				<CreateBoardDrawer
					image={selectedImageId}
					color={selectedColor}
					onColorSelect={onColorSelect}
					onImageSelect={onImageSelect}
				/>
			</div>
		</div>
	);
};
