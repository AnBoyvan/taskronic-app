'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Select, SelectedItems, Selection, SelectItem, Skeleton } from '@nextui-org/react';

import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { ROUTES } from '@/configs/routes.config';
import { useFetchWorkspaces } from '@/hooks/useFetchWorkspaces';
import { Workspace } from '@/interfaces/workspace.interface';

interface WorkspaceSwitcherProps {
	onChange: Dispatch<SetStateAction<boolean>>;
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({ onChange }) => {
	const t = useTranslations();
	const router = useRouter();
	const { workspaceId } = useParams<{ workspaceId: string }>();
	const [selected, setSelected] = useState<string>('');

	const { data } = useFetchWorkspaces();

	const onWorkspaceSelect = (keys: Selection) => {
		const selected = Array.from(keys).join(', ');
		router.push(`${ROUTES.WORKSPACE}/${selected}`);
		onChange(false);
	};

	useEffect(() => {
		if (workspaceId) {
			setSelected(workspaceId);
		}
	}, [workspaceId]);

	return (
		<>
			{data ? (
				<Select
					items={data}
					aria-label="workspace"
					variant="flat"
					selectedKeys={[selected]}
					label={t('nav.workspace')}
					labelPlacement="outside"
					placeholder={t('placeholder.select')}
					onSelectionChange={onWorkspaceSelect}
					classNames={{
						trigger: 'pl-2 pr-6 bg-transparent',
						innerWrapper: 'w-full',
						selectorIcon: 'right-2',
						label: 'px-2',
						popoverContent: 'p-0',
						listbox: 'p-0',
					}}
					renderValue={(items: SelectedItems<Workspace>) => {
						return items.map(item => (
							<WorkspaceBadge
								key={item.data?._id!}
								avatarColor={item.data?.avatarColor!}
								avatarIcon={item.data?.avatarIcon || 'Settings'}
								name={item.data?.name!}
							/>
						));
					}}
				>
					{item => (
						<SelectItem key={item._id} textValue={item._id} variant="flat">
							<WorkspaceBadge
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
