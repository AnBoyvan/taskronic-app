'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useWorkspaces } from '@/hooks/useWorkspaces';

type RemoveWorkspaceMemberProps = {
	userId: string;
	userName: string;
	workspaceId: string;
	isCurrentUserAmin: boolean;
};

export const RemoveWorkspaceMember: React.FC<RemoveWorkspaceMemberProps> = ({
	userId,
	userName,
	workspaceId,
	isCurrentUserAmin,
}) => {
	const t = useTranslations();
	const { removeMember } = useWorkspaces();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const remove = async () => {
		const dto = { _id: userId, name: userName };

		await removeMember({ workspaceId, dto });

		setIsOpen(false);
	};

	return (
		<Popover
			shouldFlip
			offset={0}
			shadow="lg"
			radius="sm"
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
		>
			<PopoverTrigger>
				<Button
					isDisabled={!isCurrentUserAmin}
					variant="solid"
					color="danger"
					size="sm"
					className="w-20"
				>
					{t('common.remove')}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-2">
				<Button variant="ghost" color="danger" size="md" radius="sm" onPress={remove}>
					{t('workspace.remove_member')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
