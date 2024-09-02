'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import {
	Select,
	SelectedItems,
	Selection,
	SelectItem,
	SelectProps,
	Skeleton,
} from '@nextui-org/react';

import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { Workspace } from '@/types/workspace.interface';

interface WorkspaceSwitcherProps extends Partial<SelectProps> {
	onWorkspaceChange: (workspaceId: string) => void;
	mediumText?: boolean;
	canCreateBoard?: boolean;
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
	onWorkspaceChange,
	mediumText,
	canCreateBoard,
	...props
}) => {
	const t = useTranslations();
	const { user } = useCurrentUser();
	const { workspaces, current, isLoading } = useWorkspacesList();

	const [selected, setSelected] = useState<string>('');

	const onWorkspaceSelect = (keys: Selection) => {
		const selected = Array.from(keys).join(', ');
		setSelected(selected);
		onWorkspaceChange(selected);
	};

	const isUserMember = workspaces.some(({ _id }) => _id == current?._id);

	useEffect(() => {
		if (current && isUserMember) {
			setSelected(current._id);
		}
	}, [current]);

	const filtered = workspaces.filter(
		({ admins, settings }) => settings.createBoard || admins.includes(user?.sub!),
	);

	return (
		<>
			{!isLoading ? (
				<Select
					{...props}
					items={canCreateBoard ? filtered : workspaces}
					aria-label="workspace"
					selectedKeys={[selected]}
					disabledKeys={[selected]}
					isDisabled={workspaces.length < 1}
					label={t('nav.workspace')}
					labelPlacement="outside"
					placeholder={t('placeholder.select')}
					onSelectionChange={onWorkspaceSelect}
					renderValue={(items: SelectedItems<Workspace>) => {
						return items.map(item => (
							<WorkspaceBadge
								key={item.data?._id!}
								mediumText={mediumText}
								avatarColor={item.data?.avatarColor!}
								avatarIcon={item.data?.avatarIcon!}
								name={item.data?.name!}
							/>
						));
					}}
				>
					{item => (
						<SelectItem key={item._id} textValue={item._id} variant="flat">
							<WorkspaceBadge
								mediumText={mediumText}
								avatarColor={item.avatarColor}
								avatarIcon={item.avatarIcon}
								name={item.name}
							/>
						</SelectItem>
					)}
				</Select>
			) : (
				<div className="flex flex-col h-16 gap-2 p-2">
					<Skeleton className="h-4 w-28 rounded-lg" />
					<div className="flex flex-row items-center gap-2 w-full h-10">
						<Skeleton className="w-6 h-6 rounded-sm" />
						<Skeleton className="h-3 w-32 rounded-lg" />
					</div>
				</div>
			)}
		</>
	);
};
