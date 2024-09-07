'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Divider, Tab, Tabs } from '@nextui-org/react';

import { toast } from 'sonner';

import { BackgroundColors } from '@/components/shared/BackgroundColors';
import { UnsplashImage, UnsplashImages } from '@/components/shared/UnsplashImages';
import { BoardColor } from '@/constants/board-colors.constants';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';
import { Board } from '@/types/board.interface';
import { getTextColor } from '@/utils/helpers/getTextColor';

type BoardMenuBackgroundProps = {
	board: Board;
	canUpdate: boolean;
};

type Variant = 'photo' | 'color';

export const BoardMenuBackground: React.FC<BoardMenuBackgroundProps> = ({ board, canUpdate }) => {
	const t = useTranslations();
	const { updGeneral } = useBoardsEdit();

	const [variant, setVariant] = useState<Variant>('color');

	const { _id, bgImage, bgColor } = board;

	const setImageBackground = (selected: UnsplashImage) => {
		if (!canUpdate) {
			toast.error(t('board.denied'), { closeButton: false });
			return;
		}

		const {
			color,
			urls: { small, full },
		} = selected;

		const textColor = getTextColor({ color: color || undefined });

		updGeneral.mutate({
			boardId: _id,
			data: {
				thumbImage: small,
				bgImage: full,
				bgColor: '',
				textColor,
			},
		});
	};

	const setColorBackground = (selected: BoardColor) => {
		if (!canUpdate) {
			toast.error(t('board.denied'), { closeButton: false });
			return;
		}

		const textColor = getTextColor({ boardColor: selected });

		updGeneral.mutate({
			boardId: _id,
			data: {
				thumbImage: '',
				bgImage: '',
				bgColor: selected,
				textColor,
			},
		});
	};
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="h-10 flex items-center justify-center font-medium">
				{t('board.change_background')}
			</div>
			<Divider className="my-2" />
			<Tabs
				selectedKey={variant}
				onSelectionChange={key => setVariant(key as Variant)}
				classNames={{
					tabList: 'w-full',
				}}
			>
				<Tab key={'color'} title={t('common.colors')} />
				<Tab key={'photo'} title={t('common.photos')} />
			</Tabs>
			<Divider className="my-2" />
			{variant === 'photo' ? (
				<UnsplashImages current={bgImage} setCurrent={setImageBackground} />
			) : (
				<BackgroundColors current={bgColor} setCurrent={setColorBackground} />
			)}
		</div>
	);
};
