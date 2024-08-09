'use client';

import { useEffect, useState } from 'react';

import { Button, Divider } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { workspaceService } from '@/services/workspace.service';

import { WorkspaceSidebarBoards } from './WorkspaceSidebarBoards';
import { WorkspaceSidebarNav } from './WorkspaceSidebarNav';
import { WorkspaceSidebarSkeleton } from './WorkspaceSidebarSeleton';

type WorkspaceSidebarProps = {
	workspaceId: string;
};

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ workspaceId }) => {
	const isMobile = useMediaQuery('(max-width:640px)');
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isCollapsed, setCollapsed] = useLocalStorage<boolean | undefined>('ws-sidebar', undefined);

	const { data: workspace } = useQuery({
		queryKey: ['workspaces', workspaceId],
		queryFn: () => workspaceService.findById(workspaceId),
	});

	useEffect(() => {
		if (isCollapsed === undefined) {
			setCollapsed(isMobile);
			return;
		}

		setOpen(isCollapsed);
	}, [isCollapsed, isMobile]);

	return (
		<div className={`relative flex h-full ${!isOpen ? 'mr-4' : 'mr-4 md:mr-0'}`}>
			<div
				className={`absolute md:relative bg-background z-50 h-full transition-all duration-200 ${!isOpen ? 'w-0' : 'w-64'} overflow-hidden`}
			>
				{isOpen &&
					(workspace ? (
						<div className="flex flex-col w-64 h-full px-2 border-r border-divider">
							<div className="flex flex-row items-center justify-between py-2">
								<WorkspaceBadge
									name={workspace.name}
									avatarColor={workspace.avatarColor}
									avatarIcon={workspace.avatarIcon}
									medium={true}
								/>
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
								_id={workspace._id}
								name={workspace.name}
								admins={workspace.admins}
								canInvite={workspace.settings.invite}
							/>
							<Divider />
							<WorkspaceSidebarBoards boards={workspace.boards} workspaceId={workspace._id} />
						</div>
					) : (
						<WorkspaceSidebarSkeleton />
					))}
			</div>
			<div
				className={`z-50 md:z-auto transition-opacity duration-300 ${!isOpen ? 'opacity-100' : 'opacity-0'} ${
					!isOpen ? 'w-4' : 'w-0'
				} h-full absolute left-0 top-0flex items-center justify-center`}
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
