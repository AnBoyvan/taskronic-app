'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Listbox,
	ListboxItem,
	Select,
	SelectItem,
} from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { StarredSwitcher } from '@/components/ui/StarredSwitcher';
import { ROUTES } from '@/configs/routes.config';
import { BoardWorkspaceField } from '@/interfaces/board.interface';
import { sorter } from '@/utils/helpers/sorter';

type WorkspaceSidebarBoardsProps = {
	boards: BoardWorkspaceField[];
	workspaceId: string;
};

export const WorkspaceSidebarBoards: React.FC<WorkspaceSidebarBoardsProps> = ({
	boards,
	workspaceId,
}) => {
	const t = useTranslations();
	const router = useRouter();

	const [sortBy, setSortBy] = useState<'title' | 'createdAt'>('createdAt');

	const sortedBoards = sorter(boards, sortBy, sortBy === 'createdAt' ? 'desc' : 'asc');

	const onBoardSelect = (boardId: string) => {
		router.push(`${ROUTES.WORKSPACE}/${workspaceId}/${boardId}`);
	};

	return (
		<div className="h-full flex flex-col overflow-hidden py-2">
			<div className="flex flex-row items-center justify-between px-2">
				<span className="text-sm font-medium">{t('nav.boards')}:</span>
				<Dropdown>
					<DropdownTrigger>
						<Button isIconOnly variant="light" size="sm">
							<Icon name="Ellipsis" size={16} />
						</Button>
					</DropdownTrigger>
					<DropdownMenu>
						<DropdownItem aria-label={t('label.sort')} closeOnSelect={false} isReadOnly>
							<Select
								labelPlacement="outside"
								label={t('label.sort')}
								placeholder={t('placeholder.select')}
								disallowEmptySelection
								selectedKeys={[sortBy]}
								selectionMode="single"
								variant="bordered"
								onSelectionChange={({ currentKey }) => setSortBy(currentKey as any)}
							>
								<SelectItem key="title" textValue={t('sort.by_title')}>
									{t('sort.by_title')}
								</SelectItem>
								<SelectItem key="createdAt" textValue={t('sort.by_newest')}>
									{t('sort.by_newest')}
								</SelectItem>
							</Select>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<Listbox
				className="flex flex-col overflow-y-scroll gap-2"
				emptyContent={t('workspace.no_boards')}
				aria-label={t('nav.boards')}
			>
				{sortedBoards.map(b => (
					<ListboxItem
						key={b._id}
						textValue={b._id}
						onPress={() => onBoardSelect(b._id)}
						classNames={{
							title: 'flex flex-row items-center justify-between gap-2 truncate',
						}}
					>
						<span>{b.title}</span>
						<StarredSwitcher boardStarred={b.starred} boardId={b._id} />
					</ListboxItem>
				))}
			</Listbox>
		</div>
	);
};
