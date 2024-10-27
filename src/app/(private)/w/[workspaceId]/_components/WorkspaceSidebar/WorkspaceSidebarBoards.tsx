'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { useState } from 'react';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Listbox,
	ListboxItem,
} from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { SortBy } from '@/components/ui/SortBy';
import { StarredSwitcher } from '@/components/ui/StarredSwitcher';
import { ROUTES } from '@/configs/routes.config';
import { SortingVariant } from '@/configs/sorting-variants.config';
import { boardColors } from '@/constants/board-colors.constants';
import { BoardBasic } from '@/types/board.interface';
import { sorter } from '@/utils/helpers/sorter';

type WorkspaceSidebarBoardsProps = {
	boards: BoardBasic[];
	workspaceId: string;
};

export const WorkspaceSidebarBoards: React.FC<WorkspaceSidebarBoardsProps> = ({
	boards,
	workspaceId,
}) => {
	const t = useTranslations();

	const [sortBy, setSortBy] = useState<SortingVariant>({
		field: 'createdAt',
		order: 'desc',
		label: 'sort.by_created_desc',
	});

	const onlyActive = boards.filter(board => !board.closed);

	const sortedBoards = sorter(onlyActive, sortBy.field as keyof BoardBasic, sortBy.order);

	return (
		<div className="h-full flex flex-col overflow-hidden py-2">
			<div className="flex flex-row items-center justify-between px-2">
				<span className="text-sm font-medium">{t('common.boards')}:</span>
				<Dropdown radius="md">
					<DropdownTrigger>
						<Button isIconOnly variant="light" size="sm">
							<Icon name="Ellipsis" size={16} />
						</Button>
					</DropdownTrigger>
					<DropdownMenu>
						<DropdownItem aria-label={t('actions.sort')} closeOnSelect={false} isReadOnly>
							<SortBy current={sortBy} setCurrent={setSortBy} />
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<Listbox
				className="flex flex-col overflow-y-auto gap-2"
				emptyContent={t('board.no_boards')}
				aria-label={t('common.boards')}
			>
				{sortedBoards.map(b => (
					<ListboxItem
						key={b._id}
						textValue={b.title}
						href={`${ROUTES.WORKSPACE}/${workspaceId}/${b._id}`}
						classNames={{
							title: 'flex flex-row items-center justify-between gap-2 truncate',
						}}
					>
						<div className="flex flex-row items-center gap-2 w-full overflow-hidden">
							<div
								style={b.thumbImage ? { backgroundImage: `url(${b.thumbImage})` } : undefined}
								className={clsx(
									'h-6 w-8 min-w-8 rounded-sm shadow-sm truncate',
									b.bgColor && `${boardColors[b.bgColor]}`,
								)}
							></div>
							<span className="truncate">{b.title}</span>
						</div>
						<StarredSwitcher board={b} />
					</ListboxItem>
				))}
			</Listbox>
		</div>
	);
};
