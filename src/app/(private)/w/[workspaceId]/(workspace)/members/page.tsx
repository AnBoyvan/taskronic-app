'use client';

import { useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';

import { Divider } from '@nextui-org/react';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { filterUsers, UsersFilter } from '@/utils/helpers/filterUsers';
import { getAllUsers } from '@/utils/helpers/getAllUsers';

import { WorkspaceMemberItem } from './_components/WorkspaceMemberItem';
import { WorkspaceMembersFilter } from './_components/WorkspaceMembersFilter';

export default function WorkspaceMembersPage() {
	const t = useTranslations();

	const [filter, setFilter] = useState<UsersFilter>({
		search: '',
		role: 'all',
	});

	const { current } = useWorkspacesList();

	const { users, membersIds, admins, filtered } = useMemo(() => {
		if (!current) {
			return { users: [], membersIds: [], filtered: [], admins: [] };
		}

		const { users, membersIds } = getAllUsers(current);

		const filtered = filterUsers(users, current.admins, membersIds, filter);

		return { users, membersIds, admins: current.admins, filtered };
	}, [current?.admins, filter]);

	return (
		<PageContainer scroll className="flex-col lg:flex-row">
			<Section title={t('common.members')}>
				<WorkspaceMembersFilter
					filter={filter}
					setFilter={setFilter}
					count={{
						all: users.length,
						members: membersIds.length,
						guests: users.length - membersIds.length,
					}}
				/>
			</Section>
			<Section fullWidth>
				<ul className="flex flex-col w-full mx-auto h-full gap-2 p-4 lg:p-8">
					{filtered.map(member => (
						<li key={member._id}>
							<WorkspaceMemberItem member={member} admins={admins} />
							<Divider className="mt-2" />
						</li>
					))}
				</ul>
			</Section>
		</PageContainer>
	);
}
