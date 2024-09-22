'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useInviteModal } from '@/hooks/useInviteModal';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { Workspace } from '@/types/workspace.interface';
import { getWorkspacePermissions } from '@/utils/helpers/getWorkspacePermissions';

type WorkspaceTitleProps = {
	workspace: Workspace;
};

export const WorkspaceTitle: React.FC<WorkspaceTitleProps> = ({ workspace }) => {
	const t = useTranslations();
	const createModal = useCreateModal();
	const inviteModal = useInviteModal();
	const { user } = useCurrentUser();
	const { addRequest } = useWorkspaceMembers();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const permissions = getWorkspacePermissions(workspace, user?.sub);

	useEffect(() => {
		if (isOpen && addRequest.isSuccess) {
			setIsOpen(false);
		}
	}, [addRequest.isSuccess]);

	const { _id, name, avatarColor, avatarIcon, description, members, requests } = workspace;

	const isGuest = !members.some(({ _id }) => _id === user?.sub);

	const isRequest = requests.some(({ _id }) => _id === user?.sub);

	return (
		<Section className="flex flex-col md:flex-row px-4 lg:px-8 pb-4 lg:pb-8 border-b border-divider w-full gap-4 justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-start">
					<WorkspaceBadge
						name={name}
						avatarColor={avatarColor}
						avatarIcon={avatarIcon}
						largeIcon
						largeText
					/>
					{permissions.update && (
						<Button
							isIconOnly
							size="md"
							variant="light"
							color="success"
							onPress={() => {
								createModal.onOpen('workspace-edit');
							}}
						>
							<Icon name="Pencil" size={16} />
						</Button>
					)}
				</div>
				{description && <span className="flex flex-col text-tiny">{description}</span>}
			</div>
			{isGuest ? (
				<Popover
					isOpen={isOpen}
					onOpenChange={open => setIsOpen(open)}
					shouldFlip
					placement="bottom"
					offset={0}
					shadow="lg"
					radius="sm"
				>
					<PopoverTrigger>
						<Button
							variant="solid"
							color={!isRequest ? 'primary' : 'default'}
							size="md"
							isDisabled={isRequest}
							startContent={<Icon name="UserPlus" size={20} />}
							className="min-w-48 ml-auto"
						>
							{t(isRequest ? 'workspace.request_exist' : 'common.join')}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-2">
						<Button
							variant="ghost"
							color="success"
							size="md"
							radius="sm"
							onPress={() => {
								addRequest.mutate(_id);
							}}
							isLoading={addRequest.isPending}
							spinnerPlacement="end"
						>
							{t('common.send_request')}
						</Button>
					</PopoverContent>
				</Popover>
			) : (
				<Button
					variant="solid"
					color={permissions.invite ? 'primary' : 'default'}
					size="md"
					isDisabled={!permissions.invite}
					startContent={<Icon name="UserPlus" size={20} />}
					className="min-w-48 w-48 ml-auto"
					onPress={() => {
						inviteModal.onOpen(workspace);
					}}
				>
					{t('workspace.invite_members')}
				</Button>
			)}
		</Section>
	);
};
