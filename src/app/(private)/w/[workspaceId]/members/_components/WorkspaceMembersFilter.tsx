'use client';

import { useTranslations } from 'next-intl';

import { Dispatch, SetStateAction } from 'react';

import { Input, Select, SelectItem, Tab, Tabs } from '@nextui-org/react';

import { useMediaQuery } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';
import { Filter } from '@/utils/helpers/filterUsers';

type WorkspaceMembersFilterProps = {
	filter: Filter;
	setFilter: Dispatch<SetStateAction<Filter>>;
	count: {
		all: number;
		members: number;
		guests: number;
	};
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
}) => {
	const t = useTranslations();
	const isDesktop = useMediaQuery('(min-width:1024px)');

	const onSearchChange = (value: string) => {
		setFilter({
			...filter,
			search: value,
		});
	};

	const onRoleChange = (value: Filter['role']) => {
		setFilter({
			...filter,
			role: value,
		});
	};

	return (
		<div className="flex w-full lg:w-72 flex-row lg:flex-col gap-8 justify-between lg:justify-start items-center p-4 lg:p-8 lg:pr-0 border-b border-divider lg:border-b-0">
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
				onChange={e => onRoleChange(e.target.value as Filter['role'])}
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
				size={isDesktop ? 'lg' : 'md'}
				isVertical={isDesktop}
				classNames={{
					wrapper: 'lg:w-full',
					tabList: 'h-10 lg:h-fit lg:w-full lg:p-2',
				}}
				className="hidden md:flex lg:w-full"
				selectedKey={filter.role}
				onSelectionChange={key => onRoleChange(key as Filter['role'])}
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
			<Input
				variant="bordered"
				size="md"
				placeholder={t('placeholder.search')}
				startContent={<Icon name="Search" size={16} />}
				type="search"
				value={filter.search}
				onValueChange={onSearchChange}
				className="max-w-52 lg:max-w-full"
			/>
		</div>
	);
};
