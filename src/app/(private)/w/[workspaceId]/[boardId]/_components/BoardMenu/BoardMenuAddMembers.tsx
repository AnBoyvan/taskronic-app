'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Divider, Input, Tab, Tabs } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { Icon } from '@/components/ui/Icon';
import { useUser } from '@/hooks/useUser';
import { userService } from '@/services/user.service';
import { Board } from '@/types/board.interface';
import { Member } from '@/types/root.interface';

import { BoardMenuAddMembersItem } from './BoardMenuAddMembersItem';

type BoardMenuAddMembersProps = {
	board: Board;
};

type Variant = 'workspace' | 'contacts';

export const BoardMenuAddMembers: React.FC<BoardMenuAddMembersProps> = ({ board }) => {
	const t = useTranslations();
	const { workspaces } = useUser();

	const [variant, setVariant] = useState<Variant>('workspace');
	const [users, setUsers] = useState<Member[]>([]);
	const [search, setSearch] = useState<string>('');

	const { data } = useQuery<Member[]>({
		queryKey: ['contacts'],
		queryFn: async () => await userService.findContacts(),
	});

	const current = workspaces.find(({ _id }) => _id === board.workspace?._id);

	useEffect(() => {
		if (variant === 'workspace' && current) {
			setUsers(current.members);
		}

		if (variant === 'contacts' && data) {
			setUsers(data);
		}
	}, [variant, current, data]);

	const boardMembersIds = board.members.map(({ _id }) => _id);

	const filtered = users.filter(
		({ _id, name, email }) =>
			!boardMembersIds.includes(_id) &&
			(name.toLowerCase().includes(search.toLowerCase()) ||
				email.toLowerCase().includes(search.toLowerCase())),
	);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="h-10 flex items-center justify-center font-medium">
				{t('common.add_members')}?
			</div>
			<Divider className="my-2" />
			<Tabs
				selectedKey={variant}
				onSelectionChange={key => setVariant(key as Variant)}
				classNames={{
					tabList: 'w-full',
				}}
			>
				<Tab key={'workspace'} title={t('common.workspace')} />
				<Tab key={'contacts'} title={t('account.contacts')} />
			</Tabs>
			<Divider className="my-2" />
			<Input
				variant="bordered"
				size="md"
				placeholder={t('placeholder.search')}
				startContent={<Icon name="Search" size={16} />}
				type="search"
				value={search}
				onValueChange={value => setSearch(value)}
			/>
			<div className="flex flex-col overflow-y-auto">
				{filtered.map(member => (
					<BoardMenuAddMembersItem key={member._id} member={member} boardId={board._id} />
				))}
			</div>
		</div>
	);
};
