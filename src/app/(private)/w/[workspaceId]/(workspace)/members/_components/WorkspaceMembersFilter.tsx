'use client';

import { useTranslations } from 'next-intl';

import { Dispatch, SetStateAction } from 'react';

import { Select, SelectItem, Tab, Tabs } from '@nextui-org/react';

import { Member } from '@/types/root.interface';
import { UsersFilter } from '@/utils/helpers/filterUsers';

import { WorkspaceMembersRequests } from './WorkspaceMembersRequests';

type WorkspaceMembersFilterProps = {
	filter: UsersFilter;
	setFilter: Dispatch<SetStateAction<UsersFilter>>;
	count: {
		all: number;
		members: number;
		guests: number;
	};
	requests: Member[];
	workspaceId: string;
};

const roles: { value: 'all' | 'members' | 'guests'; label: TranslationKeys }[] = [
	{ value: 'all', label: 'roles.all' },
	{ value: 'members', label: 'roles.members' },
	{ value: 'guests', label: 'roles.guests' },
];

export const WorkspaceMembersFilter: React.FC<WorkspaceMembersFilterProps> = ({
	filter,
	setFilter,
	count,
	requests,
	workspaceId,
}) => {
	const t = useTranslations();

	const onRoleChange = (value: UsersFilter['role']) => {
		setFilter({
			...filter,
			role: value,
		});
	};

	return (
		<div className="flex w-full lg:w-72 flex-row lg:flex-col gap-8 justify-between lg:justify-start items-center">
			<Select
				aria-label="roles"
				variant="bordered"
				size="md"
				className="flex md:hidden"
				classNames={{
					mainWrapper: 'w-32',
					value: 'text-tiny',
				}}
				listboxProps={{
					itemClasses: {
						title: 'text-tiny',
					},
				}}
				selectedKeys={[filter.role]}
				onChange={e => onRoleChange(e.target.value as UsersFilter['role'])}
			>
				{roles.map(({ value, label }) => (
					<SelectItem
						key={value}
						aria-label={t(label)}
					>{`${t(label)} (${count[value]})`}</SelectItem>
				))}
			</Select>

			<Tabs
				variant="bordered"
				classNames={{
					wrapper: 'lg:w-full',
					tabList: 'lg:flex-col h-10 lg:h-fit lg:w-full lg:p-2',
				}}
				className="hidden md:flex lg:w-full"
				selectedKey={filter.role}
				onSelectionChange={key => onRoleChange(key as UsersFilter['role'])}
			>
				{roles.map(({ label, value }) => (
					<Tab
						key={value}
						isDisabled={Boolean(count[value] < 1)}
						title={<div>{`${t(label)} (${count[value]})`}</div>}
						className="w-20 lg:w-full text-tiny lg:text-sm"
					/>
				))}
			</Tabs>

			<WorkspaceMembersRequests requests={requests} workspaceId={workspaceId} />
		</div>
	);
};
