'use client';

import { useTranslations } from 'next-intl';

import { Input } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useBoardState } from '@/hooks/useBoardState';
import { BoardPermissions, List } from '@/types/board.interface';

import { AddListPopover } from '../AddListPopover';
import { AddTaskPopover } from '../AddTaskPopover';

type BoardTableTopContentProps = {
	boardId: string;
	lists: List[];
	permissions?: BoardPermissions;
};

export const BoardTableTopContent: React.FC<BoardTableTopContentProps> = ({
	boardId,
	lists,
	permissions,
}) => {
	const t = useTranslations();
	const { filter, changeFilter } = useBoardState(boardId);

	return (
		<div className="flex flex-row gap-8 justify-between items-center">
			<Input
				variant="flat"
				size="sm"
				placeholder={t('common.search')}
				startContent={<Icon name="Search" size={16} />}
				type="search"
				value={filter.search}
				onValueChange={value => changeFilter('search', value)}
				className="max-w-80"
			/>
			<div className="flex flex-row gap-4">
				{permissions?.createTask && <AddTaskPopover boardId={boardId} lists={lists} />}
				{permissions?.lists && <AddListPopover boardId={boardId} />}
			</div>
		</div>
	);
};
