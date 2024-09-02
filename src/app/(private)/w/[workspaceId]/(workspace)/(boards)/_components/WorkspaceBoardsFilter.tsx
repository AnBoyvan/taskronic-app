'use client';

import { useTranslations } from 'next-intl';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { Input, Select, SelectItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { SortBy } from '@/components/ui/SortBy';
import { SortingVariant } from '@/configs/sorting-variants.config';

export type WorkspaceBoardsFilter = {
	sortBy: SortingVariant;
	search: string;
	closed: 'show' | 'hide';
};

type WorkspaceMembersFilterProps = {
	filter: WorkspaceBoardsFilter;
	setFilter: Dispatch<SetStateAction<WorkspaceBoardsFilter>>;
};

export const WorkspaceBoardsFilter: React.FC<WorkspaceMembersFilterProps> = ({
	filter,
	setFilter,
}) => {
	const t = useTranslations();

	const onSortChange = (value: SortingVariant) => {
		setFilter({
			...filter,
			sortBy: value,
		});
	};

	const onShowClosedChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as WorkspaceBoardsFilter['closed'];

		setFilter({
			...filter,
			closed: value,
		});
	};

	const onSearchChange = (value: string) => {
		setFilter({
			...filter,
			search: value,
		});
	};

	return (
		<div className="flex w-full flex-col md:flex-row gap-4 justify-between items-start md:items-center">
			<div className="flex w-full flex-col md:flex-row gap-4 items-start md:items-center">
				<SortBy
					current={filter.sortBy}
					setCurrent={onSortChange}
					classNames={{
						base: 'w-44 data-[has-label=true]:mt-5',
						label: 'text-tiny top-2/3 pl-1',
					}}
				/>
				<Select
					aria-label={t('label.closed')}
					labelPlacement="outside"
					label={t('label.closed')}
					placeholder={t('placeholder.select')}
					disallowEmptySelection
					selectionMode="single"
					variant="bordered"
					size="md"
					selectedKeys={[filter.closed]}
					onChange={onShowClosedChange}
					classNames={{
						base: 'w-44 data-[has-label=true]:mt-5',
						label: 'text-tiny top-2/3 pl-1',
					}}
				>
					<SelectItem key="show" aria-label={t('common.show')}>
						{t('common.show')}
					</SelectItem>
					<SelectItem key="hide" aria-label={t('common.hide')}>
						{t('common.hide')}
					</SelectItem>
				</Select>
			</div>
			<Input
				variant="bordered"
				size="md"
				label={t('label.search')}
				labelPlacement="outside"
				placeholder={t('placeholder.search_boards')}
				startContent={<Icon name="Search" size={16} />}
				type="search"
				value={filter.search}
				onValueChange={onSearchChange}
				classNames={{
					base: 'max-w-52 data-[has-label=true]:mt-5',
					label: 'text-tiny top-2/3 pl-1',
				}}
			/>
		</div>
	);
};
