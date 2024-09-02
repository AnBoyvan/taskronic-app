'use client';

import { useTranslations } from 'next-intl';

import { Divider } from '@nextui-org/react';

import { useBoardMenu } from '@/hooks/useBoardMenu';

type BoardMenuCommentsProps = {
	boardId?: string;
};

export const BoardMenuComments: React.FC<BoardMenuCommentsProps> = ({ boardId }) => {
	const t = useTranslations();
	const { onOpen } = useBoardMenu();

	return (
		<div className="flex flex-col">
			<div className="h-10 flex items-center justify-center font-medium">
				{t('common.comments')}
			</div>
			<Divider className="my-2" />
		</div>
	);
};
