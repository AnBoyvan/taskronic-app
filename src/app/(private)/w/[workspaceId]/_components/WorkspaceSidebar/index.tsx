'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Button, Divider } from '@nextui-org/react';

import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { ROUTES } from '@/configs/routes.config';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { Workspace } from '@/types/workspace.interface';
import { getWorkspacePermissions } from '@/utils/helpers/getWorkspacePermissions';

import { WorkspaceSidebarBoards } from './WorkspaceSidebarBoards';
import { WorkspaceSidebarNav } from './WorkspaceSidebarNav';
import { WorkspaceSidebarSkeleton } from './WorkspaceSidebarSeleton';

type WorkspaceSidebarProps = {
	workspace: Workspace;
};

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ workspace }) => {
	const isMobile = useMediaQuery('(max-width:640px)');
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isCollapsed, setCollapsed] = useLocalStorage<boolean | undefined>('ws-sidebar', undefined);
	const { user } = useCurrentUser();

	const { setCurrent } = useWorkspacesList();

	const permissions = getWorkspacePermissions(workspace, user?.sub!);

	useEffect(() => {
		if (isCollapsed === undefined) {
			setCollapsed(isMobile);
			return;
		}

		setOpen(isCollapsed);
	}, [isCollapsed, isMobile]);

	useEffect(() => {
		setCurrent(workspace, permissions);
	}, [workspace]);

	return (
		<div className={`relative flex h-full ${!isOpen ? 'mr-4' : 'mr-4 md:mr-0'}`}>
			<div
				className={`absolute md:relative bg-background z-50 h-full transition-all duration-200 ${!isOpen ? 'w-0' : 'w-64'} overflow-hidden`}
			>
				{isOpen &&
					(workspace ? (
						<div className="flex flex-col w-64 h-full px-2 border-r border-divider">
							<div className="flex flex-row items-center justify-between py-2">
								<Link
									href={`${ROUTES.WORKSPACE}/${workspace._id}`}
									className="hover:text-primary transition-colors"
								>
									<WorkspaceBadge
										name={workspace.name}
										avatarColor={workspace.avatarColor}
										avatarIcon={workspace.avatarIcon}
										mediumIcon
										mediumText
									/>
								</Link>
								<Button
									variant="flat"
									isIconOnly
									size="sm"
									className="text-default-500"
									onPress={() => setCollapsed(false)}
								>
									<Icon name="ChevronLeft" size={20} strokeWidth={3} />
								</Button>
							</div>
							<Divider />
							<WorkspaceSidebarNav
								workspace={workspace}
								name={workspace.name}
								admins={workspace.admins}
								canInvite={permissions.invite}
								requests={workspace.requests}
							/>
							<Divider />
							<WorkspaceSidebarBoards boards={workspace.boards} workspaceId={workspace._id} />
						</div>
					) : (
						<WorkspaceSidebarSkeleton />
					))}
			</div>
			<div
				className={`z-50 transition-opacity duration-300 ${!isOpen ? 'opacity-100' : 'opacity-0'} ${
					!isOpen ? 'w-4' : 'w-0 hidden'
				} h-full absolute left-0 top-0 flex items-center justify-center`}
			>
				<Button
					className="relative min-w-4 w-4 p-0 rounded-none h-full overflow-visible"
					disableAnimation
					variant="solid"
					color="default"
					onClick={() => setCollapsed(true)}
				>
					<div className="absolute flex items-center justify-center w-6 h-6 top-4 -right-2 rounded-full bg-inherit border text-default-500 border-default-500/50">
						<Icon name="ChevronRight" size={16} />
					</div>
				</Button>
			</div>
		</div>
	);
};
