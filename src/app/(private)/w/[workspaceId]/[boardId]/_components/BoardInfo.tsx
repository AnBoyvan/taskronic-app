'use client';

import { useTranslations } from 'next-intl';

import { useBoardMenu } from '@/hooks/useBoardMenu';
import { Board } from '@/types/board.interface';

type BoardInfoProps = {
	board: Board;
};

export const BoardInfo: React.FC<BoardInfoProps> = ({ board }) => {
	const t = useTranslations();
	const { onOpen } = useBoardMenu();

	if (!board.closed) {
		return null;
	}

	return (
		<div className="w-full p-2 text-wrap break-words font-medium text-center bg-background/60">
			{t('board.closed_info')}
			<span
				className="pl-1 underline text-foreground hover:text-primary transition-colors cursor-pointer"
				onClick={() => onOpen('reopen')}
			>
				{t('board.reopen')}
			</span>
		</div>
	);
};
