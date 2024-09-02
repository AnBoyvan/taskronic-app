'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';

type SetWorkspaceAdminProps = {
	userId: string;
	userName: string;
	isMemberAdmin: boolean;
	workspaceId: string;
	isAdmin: boolean;
};

export const SetWorkspaceAdmin: React.FC<SetWorkspaceAdminProps> = ({
	userId,
	userName,
	isMemberAdmin,
	workspaceId,
	isAdmin,
}) => {
	const t = useTranslations();
	const { addAdmin, removeAdmin } = useWorkspaceMembers();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [admin, setAdmin] = useState<boolean>(false);

	const adminToggle = async () => {
		const dto = { _id: userId, name: userName };
		if (admin) {
			await removeAdmin.mutate({ workspaceId, dto });
		}

		if (!admin) {
			await addAdmin.mutate({ workspaceId, dto });
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
					{t('roles.user_admin')}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-2">
				<Button variant="ghost" color="default" size="md" radius="sm" onPress={adminToggle}>
					{t(admin ? 'roles.remove_admin' : 'roles.add_admin')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
