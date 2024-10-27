'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Divider, Input } from '@nextui-org/react';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Icon } from '@/components/ui/Icon';
import { useUser } from '@/hooks/useUser';
import { Member } from '@/types/root.interface';
import { Workspace } from '@/types/workspace.interface';
import { filterUsers, UsersFilter } from '@/utils/helpers/filterUsers';
import { getAllUsers } from '@/utils/helpers/getAllUsers';
import { getWorkspacePermissions } from '@/utils/helpers/getWorkspacePermissions';

import { WorkspaceMemberItem } from './WorkspaceMemberItem';
import { WorkspaceMembersFilter } from './WorkspaceMembersFilter';

type WorkspaceMembersProps = {
	workspace: Workspace;
};

export const WorkspaceMembers: React.FC<WorkspaceMembersProps> = ({ workspace }) => {
	const t = useTranslations();
	const { _id } = useUser();

	const [filter, setFilter] = useState<UsersFilter>({
		search: '',
		role: 'all',
	});

	const [show, setShow] = useState<Member[]>(workspace.members);

	const { users, membersIds } = getAllUsers(workspace);
	const permissions = getWorkspacePermissions(workspace, _id);

	const onSearchChange = (value: string) => {
		setFilter({
			...filter,
			search: value,
		});
	};

	useEffect(() => {
		const filtered = filterUsers(users, workspace.admins, membersIds, filter);
		setShow(filtered);
	}, [filter, workspace]);

	return (
		<PageContainer scroll title={t('common.members')}>
			<Section className="flex flex-col lg:flex-row gap-4 lg:gap-8">
				<WorkspaceMembersFilter
					filter={filter}
					setFilter={setFilter}
					count={{
						all: users.length,
						members: membersIds.length,
						guests: users.length - membersIds.length,
					}}
					requests={workspace.requests}
					workspaceId={workspace._id}
				/>
				<ul className="flex flex-col w-full h-full gap-2">
					<Input
						variant="bordered"
						size="md"
						radius="sm"
						placeholder={t('common.search')}
						startContent={<Icon name="Search" size={16} />}
						type="search"
						value={filter.search}
						onValueChange={onSearchChange}
						className="max-w-52 self-end mb-2"
					/>
					{show.map(member => (
						<li key={member._id}>
							<WorkspaceMemberItem
								member={member}
								admins={workspace.admins}
								membersIds={membersIds}
								boards={workspace.boards}
								workspaceId={workspace._id}
								permissions={permissions}
								currentUserId={_id}
							/>
							<Divider className="mt-2" />
						</li>
					))}
				</ul>
			</Section>
		</PageContainer>
	);
};
