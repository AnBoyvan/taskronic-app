'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Section } from '@/components/layout/Section';
import { BoardCard } from '@/components/shared/BoardCard';
import { Icon } from '@/components/ui/Icon';
import { useUser } from '@/hooks/useUser';
import { Board } from '@/types/board.interface';

type StarredBoardsProps = {
	userBoards: Board[];
	starredBoards: Board[];
};

export const StarredBoards: React.FC<StarredBoardsProps> = ({ userBoards, starredBoards }) => {
	const t = useTranslations();
	const { _id, isLoggedIn, starred } = useUser();
	const [boardsList, setStarredBoards] = useState<Board[]>(starredBoards);

	useEffect(() => {
		if (isLoggedIn) {
			const starredIds = starred.map(({ _id }) => _id);
			setStarredBoards(userBoards.filter(board => starredIds.includes(board._id)));
		}
	}, [_id, userBoards, starred]);

	return (
		<Section noTopMargin>
			<div className="flex flex-row items-center gap-2">
				<Icon name="Star" size={20} />
				<h2 className="text-lg font-medium">{t('board.starred')}</h2>
			</div>
			<div className="w-full mt-2 grid gap-2 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
				{boardsList.map(board => (
					<BoardCard key={board._id} board={board} />
				))}
			</div>
		</Section>
	);
};
