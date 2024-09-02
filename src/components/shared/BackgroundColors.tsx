'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Icon } from '@/components/ui/Icon';
import { BoardColor, boardColors } from '@/constants/board-colors.constants';

interface BackgroundColorsProps {
	current?: BoardColor;
	setCurrent: (value: BoardColor) => void;
}

export const BackgroundColors: React.FC<BackgroundColorsProps> = ({ current, setCurrent }) => {
	const t = useTranslations();

	const colors = Object.keys(boardColors) as BoardColor[];

	return (
		<div className="flex flex-col gap-2 h-full overflow-hidden">
			<p className="text-sm text-center">{t('common.colors')}</p>
			<div className="grid grid-cols-3 gap-1 h-full overflow-y-auto">
				{colors.map(color => (
					<div
						key={color}
						className={clsx(
							'cursor-pointer flex items-center rounded-md justify-center aspect-video hover:opacity-70 transition',
							`${boardColors[color]}`,
							color === current && 'opacity-70',
						)}
						onClick={() => setCurrent(color)}
					>
						{color === current && <Icon name="Check" size={24} />}
					</div>
				))}
			</div>
		</div>
	);
};
