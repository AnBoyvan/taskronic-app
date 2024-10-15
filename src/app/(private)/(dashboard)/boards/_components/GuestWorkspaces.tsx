'use client';

import { useTranslations } from 'next-intl';

import { Tooltip } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { BoardCard } from '@/components/shared/BoardCard';
import { Icon } from '@/components/ui/Icon';
import { Board } from '@/types/board.interface';

type StarredBoardsProps = {
	boards: Board[];
};

export const GuestWorkspaces: React.FC<StarredBoardsProps> = ({ boards }) => {
	const t = useTranslations();

	return (
		<Section noTopMargin>
			<div className="flex flex-row items-center gap-2">
				<h2 className="text-lg font-medium">{t('workspace.guest')}</h2>
				<Tooltip showArrow={true} content={t('workspace.guest_info')} className="w-60">
					<div>
						<Icon name="Info" size={20} />
					</div>
				</Tooltip>
			</div>
			<div className="w-full mt-2 grid gap-2 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
				{boards.map(board => (
					<BoardCard key={board._id} board={board} />
				))}
			</div>
		</Section>
	);
};
