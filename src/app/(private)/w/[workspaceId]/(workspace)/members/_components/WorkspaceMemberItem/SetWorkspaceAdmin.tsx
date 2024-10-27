'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { toast } from 'sonner';

import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';

type SetWorkspaceAdminProps = {
	userId: string;
	userName: string;
	isMemberAdmin: boolean;
	workspaceId: string;
	isAdmin: boolean;
	isOnlyAdmin: boolean;
};

export const SetWorkspaceAdmin: React.FC<SetWorkspaceAdminProps> = ({
	userId,
	userName,
	isMemberAdmin,
	workspaceId,
	isAdmin,
	isOnlyAdmin,
}) => {
	const t = useTranslations();
	const { addAdmin, removeAdmin } = useWorkspaceMembers();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [admin, setAdmin] = useState<boolean>(false);

	const adminToggle = () => {
		const dto = { _id: userId, name: userName };
		if (admin) {
			if (isOnlyAdmin) {
				toast.error(t('workspace.only_admin'));
				setIsOpen(false);
				return;
			}

			removeAdmin.mutate({ workspaceId, dto });
		}

		if (!admin) {
			addAdmin.mutate({ workspaceId, dto });
		}

		setAdmin(!admin);
		setIsOpen(false);
	};

	useEffect(() => {
		setAdmin(isMemberAdmin);
	}, [isMemberAdmin]);

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
					isDisabled={!isAdmin}
					variant="ghost"
					color={admin ? 'warning' : 'default'}
					size="sm"
					className="w-20"
				>
					{t('common.admin')}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-2">
				<Button variant="ghost" color="default" size="md" radius="sm" onPress={adminToggle}>
					{t(admin ? 'user.admin_remove' : 'user.admin_add')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
