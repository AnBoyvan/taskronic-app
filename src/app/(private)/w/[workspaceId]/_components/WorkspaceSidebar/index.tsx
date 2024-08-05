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

type WorkspaceSidebarProps = {
	workspaceId: string;
};

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ workspaceId }) => {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const isMobile = useMediaQuery('(max-width:640px)');
	const [isOpen, setOpen] = useLocalStorage<boolean | undefined>('ws-sidebar', undefined);

	const { data: workspace } = useQuery({
		queryKey: ['workspaces', workspaceId],
		queryFn: () => workspaceService.findById(workspaceId),
	});

	useEffect(() => {
		setIsMounted(true);
	});

	useEffect(() => {
		if (isMounted && isOpen === undefined) {
			setOpen(!isMobile);
		}
	}, [isMounted]);

	if (!workspace || !isMounted) return null;

	return (
		<div className="relative flex h-full">
			<div
				className={`transition-all duration-200 ${!isOpen ? 'w-0 mr-4' : 'w-64'} overflow-hidden`}
			>
				{isOpen && (
					<div className="flex flex-col w-64 h-full px-2 border-r">
						<div className="flex flex-row items-center justify-between py-2">
							<WorkspaceBadge
								name={workspace.name}
								avatarColor={workspace.avatarColor}
								avatarIcon={workspace.avatarIcon}
								large={true}
							/>
							<Button
								variant="flat"
								isIconOnly
								size="sm"
								className="text-default-500"
								onPress={() => setOpen(false)}
							>
								<Icon name="ChevronLeft" size={20} strokeWidth={3} />
							</Button>
						</div>
						<Divider />
						<WorkspaceSidebarNav _id={workspace._id} name={workspace.name} />
						<Divider />
						<WorkspaceSidebarBoards boards={workspace.boards} workspaceId={workspace._id} />
					</div>
				)}
			</div>
			<div
				className={`transition-opacity duration-300 ${!isOpen ? 'opacity-100' : 'opacity-0'} ${
					!isOpen ? 'w-4' : 'w-0'
				} h-full absolute left-0 top-0flex items-center justify-center`}
			>
				<Button
					className="relative min-w-4 w-4 p-0 rounded-none h-full overflow-visible"
					disableAnimation
					variant="solid"
					color="default"
					onClick={() => setOpen(true)}
				>
					<div className="absolute flex items-center justify-center w-6 h-6 top-4 -right-2 rounded-full bg-inherit border text-default-500 border-default-500/50">
						<Icon name="ChevronRight" size={16} />
					</div>
				</Button>
			</div>
		</div>
	);
};
