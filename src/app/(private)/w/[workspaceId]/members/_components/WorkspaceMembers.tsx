'use client';

import { useParams } from 'next/navigation';

import { useState } from 'react';

import { Divider } from '@nextui-org/react';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useFetchCurrentWorkspace } from '@/hooks/useFetchCurrentWorkspace';
import { Filter, filterUsers } from '@/utils/helpers/filterUsers';
import { getAllUsers } from '@/utils/helpers/getAllUsers';
import { isBoardMember } from '@/utils/helpers/isBoardMember';
import { sorter } from '@/utils/helpers/sorter';

import { WorkspaceTitle } from '../../_components/WorkspaceTitle';
import { WorkspaceMemberItem } from './WorkspaceMemberItem';
import { WorkspaceMembersFilter } from './WorkspaceMembersFilter';

export const WorkspaceMembers: React.FC = () => {
	const { workspaceId } = useParams<{ workspaceId: string }>();
	const { user } = useCurrentUser();

	const [filter, setFilter] = useState<Filter>({
		search: '',
		role: 'all',
	});

	const { data: workspace } = useFetchCurrentWorkspace(workspaceId);

	if (!workspace || !user) return null;

	const { users, membersIds } = getAllUsers(workspace);

	const filtered = filterUsers(users, workspace.admins, membersIds, filter);

	const sorted = sorter(filtered, 'name', 'asc', { field: '_id', value: user.sub });

	return (
		<div className="h-full flex flex-col">
			<WorkspaceTitle workspace={workspace} />
			<div className="h-full flex flex-col lg:flex-row overflow-hidden">
				<WorkspaceMembersFilter
					filter={filter}
					setFilter={setFilter}
					count={{
						all: users.length,
						members: membersIds.length,
						guests: users.length - membersIds.length,
					}}
				/>
				<ul className="flex flex-col w-full mx-auto h-full gap-2 p-4 lg:p-8 overflow-y-auto">
					{sorted.map(member => (
						<li key={member._id}>
							<WorkspaceMemberItem
								member={member}
								membersIds={membersIds}
								admins={workspace.admins}
								userBoards={workspace.boards.filter(board => isBoardMember(board, member._id))}
								workspaceId={workspace._id}
								canInvite={workspace.settings.invite}
							/>
							<Divider className="mt-2" />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
