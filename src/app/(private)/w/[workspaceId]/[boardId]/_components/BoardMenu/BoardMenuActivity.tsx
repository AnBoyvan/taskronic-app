'use client';

import { useTranslations } from 'next-intl';

import { Divider } from '@nextui-org/react';

import { useBoardMenu } from '@/hooks/useBoardMenu';

type BoardMenuActivityProps = {
	boardId?: string;
};

export const BoardMenuActivity: React.FC<BoardMenuActivityProps> = ({ boardId }) => {
	const t = useTranslations();
	const { onOpen } = useBoardMenu();

	return (
		<div className="flex flex-col">
			<div className="h-10 flex items-center justify-center font-medium">
				{t('common.activity')}
			</div>
			<Divider className="my-2" />
		</div>
	);
};
