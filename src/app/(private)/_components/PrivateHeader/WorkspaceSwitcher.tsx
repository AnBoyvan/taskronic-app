'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { Select, SelectedItems, Selection, SelectItem } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { ROUTES } from '@/configs/routes.config';
import { IWorkspace } from '@/interfaces/workspace.interface';
import { workspaceService } from '@/services/workspace.service';

export const WorkspaceSwitcher: React.FC = () => {
	const t = useTranslations();
	const router = useRouter();
	const { workspaceId } = useParams<{ workspaceId: string }>();

	const { data } = useQuery({
		queryKey: ['workspaces'],
		queryFn: workspaceService.findAll,
	});

	const onWorkspaceSelect = (keys: Selection) => {
		const selected = Array.from(keys).join(', ');
		router.push(`${ROUTES.WORKSPACE}/${selected}`);
	};

	return (
		<Select
			items={data || []}
			aria-label="workspace"
			variant="flat"
			selectedKeys={data && [workspaceId]}
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
			renderValue={(items: SelectedItems<IWorkspace>) => {
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
	);
};
