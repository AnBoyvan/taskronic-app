'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Divider, Input } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useBoardMenu } from '@/hooks/useBoardMenu';
import { Board } from '@/types/board.interface';

import { BoardMenuMemberItem } from './BoardMenuMemberItem';

type BoardMenuMembersProps = {
	board: Board;
	isAdmin: boolean;
	canAdd: boolean;
	currentUserId?: string;
};

export const BoardMenuMembers: React.FC<BoardMenuMembersProps> = ({
	board,
	isAdmin,
	canAdd,
	currentUserId,
}) => {
	const t = useTranslations();
	const { onOpen } = useBoardMenu();

	const { members, admins } = board;

	const [search, setSearch] = useState<string>('');

	const filtered = members.filter(
		({ name, email }) =>
			name.toLowerCase().includes(search.toLowerCase()) ||
			email.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="h-10 flex items-center justify-center font-medium">{t('common.members')}</div>
			<Divider className="my-2" />
			<div className="flex flex-row gap-4">
				<Input
					variant="bordered"
					size="md"
					placeholder={t('placeholder.search')}
					startContent={<Icon name="Search" size={16} />}
					type="search"
					value={search}
					onValueChange={value => setSearch(value)}
				/>
				<Button
					isDisabled={!canAdd}
					size="md"
					variant="solid"
					color="primary"
					onPress={() => onOpen('addMembers')}
				>
					{t('common.add')}
				</Button>
			</div>
			<div className="flex flex-col overflow-y-auto">
				{filtered.map(member => (
					<BoardMenuMemberItem
						key={member._id}
						member={member}
						isMemberAdmin={admins.includes(member._id)}
						canUpdate={isAdmin}
						boardId={board._id}
						isCurrentUser={member._id === currentUserId}
					/>
				))}
			</div>
		</div>
	);
};
