'use client';

import { useTranslations } from 'next-intl';

import { Select, SelectedItems, SelectItem, SharedSelection, User } from '@nextui-org/react';

import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';
import { Member } from '@/types/root.interface';
import { TasksFilter } from '@/utils/helpers/filterTasks';

type MembersFilterProps = {
	value?: TasksFilter['members'];
	setValue: (newValue: TasksFilter['members']) => void;
	members: Member[];
};

export const MembersFilter: React.FC<MembersFilterProps> = ({ value, setValue, members }) => {
	const t = useTranslations();

	const stringValue = value?.map(v => v.toString());

	const handleChange = (keys: SharedSelection) => {
		const selected = Array.from(keys).map(key => key.toString());
		setValue(selected);
	};

	return (
		<div className="flex flex-col w-full gap-4">
			<span className="text-sm font-medium text-foreground-500">{t('common.members')}</span>
			<Select
				items={members}
				selectedKeys={value}
				aria-label={t('common.members')}
				placeholder={t('placeholder.select')}
				value={stringValue}
				isMultiline={true}
				selectionMode="multiple"
				variant="bordered"
				size="lg"
				onSelectionChange={handleChange}
				renderValue={(items: SelectedItems<Member>) => {
					return (
						<div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
							{items.map(item => {
								const user = members.find(m => m._id === item.key);
								return user ? (
									<User
										key={item.key}
										name={user.name}
										description={user.email}
										className="min-w-64 justify-start"
										avatarProps={{
											name: user.initials,
											classNames: {
												base: `${colorVariants[(user.avatar as ColorVariant) || 'zink']} h-6 w-6 text-tiny`,
											},
										}}
									/>
								) : (
									<span>{item.textValue}</span>
								);
							})}
						</div>
					);
				}}
				classNames={{
					innerWrapper: 'py-2',
					value: 'text-sm',
				}}
			>
				{members.map(member => (
					<SelectItem key={member._id} textValue={member.name}>
						<User
							name={member.name}
							description={member.email}
							className="min-w-64 justify-start"
							avatarProps={{
								name: member.initials,
								classNames: {
									base: `${colorVariants[member.avatar]} h-6 w-6 text-tiny`,
								},
							}}
						/>
					</SelectItem>
				))}
			</Select>
		</div>
	);
};
