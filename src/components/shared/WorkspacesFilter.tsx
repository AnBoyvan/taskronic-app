'use client';

import { useTranslations } from 'next-intl';

import { Chip, Select, SelectedItems, SelectItem, SharedSelection } from '@nextui-org/react';

import { WorkspaceBasic } from '@/types/workspace.interface';
import { TasksFilter } from '@/utils/helpers/filterTasks';

import { WorkspaceBadge } from '../ui/WorkspaceBadge';

type WorkspacesFilterProps = {
	value?: TasksFilter['workspaces'];
	setValue: (newValue: TasksFilter['workspaces']) => void;
	workspaces: WorkspaceBasic[];
};

export const WorkspacesFilter: React.FC<WorkspacesFilterProps> = ({
	value,
	setValue,
	workspaces,
}) => {
	const t = useTranslations();

	const stringValue = value?.map(v => v.toString());

	const handleChange = (keys: SharedSelection) => {
		const selected = Array.from(keys).map(key => key.toString());
		setValue(selected);
	};

	return (
		<div className="flex flex-col w-full gap-4">
			<span className="text-sm font-medium text-foreground-500">{t('common.workspaces')}</span>
			<Select
				items={workspaces}
				selectedKeys={value}
				aria-label={t('common.workspaces')}
				placeholder={t('actions.select')}
				value={stringValue}
				isMultiline={true}
				selectionMode="multiple"
				variant="bordered"
				size="lg"
				radius="sm"
				onSelectionChange={handleChange}
				renderValue={(items: SelectedItems<WorkspaceBasic>) => {
					return (
						<div className="flex flex-wrap max-w-full overflow-hidden gap-2">
							{items.map(item => {
								return (
									<Chip
										key={item.key}
										classNames={{
											base: 'max-w-full min-w-0 overflow-hidden',
											content: 'w-full overflow-hidden truncate',
										}}
									>
										{item.textValue}
									</Chip>
								);
							})}
						</div>
					);
				}}
				classNames={{
					innerWrapper: 'py-2',
					value: 'text-sm',
					popoverContent: 'rounded-lg',
				}}
			>
				{workspaces.map(({ _id, name, avatarColor, avatarIcon }) => (
					<SelectItem key={_id} textValue={name}>
						<WorkspaceBadge name={name} avatarColor={avatarColor} avatarIcon={avatarIcon} />
					</SelectItem>
				))}
			</Select>
		</div>
	);
};
