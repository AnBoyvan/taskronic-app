'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useWorkspaces } from '@/hooks/useWorkspaces';

type SetWorkspaceAdminProps = {
	userId: string;
	userName: string;
	isAdmin: boolean;
	isGuest: boolean;
	workspaceId: string;
	isCurrentUserAmin: boolean;
};

export const SetWorkspaceAdmin: React.FC<SetWorkspaceAdminProps> = ({
	userId,
	userName,
	isAdmin,
	isGuest,
	workspaceId,
	isCurrentUserAmin,
}) => {
	const t = useTranslations();
	const { addAdmin, removeAdmin } = useWorkspaces();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [admin, setAdmin] = useState<boolean>(false);

	const adminToggle = async () => {
		const dto = { _id: userId, name: userName };
		if (admin) {
			await removeAdmin({ workspaceId, dto });
		}

		if (!admin) {
			await addAdmin({ workspaceId, dto });
		}

		setAdmin(!admin);
		setIsOpen(false);
	};

	useEffect(() => {
		setAdmin(isAdmin);
	}, [isAdmin]);

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
					isDisabled={!isCurrentUserAmin || isGuest}
					variant="solid"
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