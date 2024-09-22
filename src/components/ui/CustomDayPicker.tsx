'use client';

import { useLocale } from 'next-intl';

import { DayPicker, DayPickerProps } from 'react-day-picker';

import { Button } from '@nextui-org/react';

import { uk } from 'date-fns/locale';

export const CustomDayPicker: React.FC<DayPickerProps> = props => {
	const locale = useLocale();

	return (
		<DayPicker
			{...props}
			locale={locale === 'uk' ? uk : undefined}
			showOutsideDays
			components={{
				Button: props => {
					const { ref, ...rest } = props;
					return (
						<Button
							isDisabled={props.disabled}
							tabIndex={props.tabIndex}
							onClick={props.onClick}
							isIconOnly
							size="sm"
							radius="full"
							variant="light"
						>
							{props.children}
						</Button>
					);
				},
			}}
			classNames={{
				months: 'relative overflow-hidden rounded-2xl pb-2',
				nav: 'absolute w-full left-0 top-0 flex py-1 px-2 justify-between',
				chevron: 'w-4 h-4 fill-divider',
				month_caption:
					'px-10 h-10 py-2 flex items-center justify-center overflow-hidden text-sm capitalize',
				weekdays: 'px-4 flex justify-center text-default-400',
				weekday: 'flex w-8 justify-center items-center font-medium text-small',
				weeks: 'transform translate-x-0',
				week: 'flex justify-center items-center first:mt-2',
				day_button: 'w-8 h-8 hover:cursor-pointer',
				day: 'w-8 h-8 flex items-center text-foreground justify-center rounded-full box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden  hover:cursor-pointer tap-highlight-transparent data-[disabled=true]:text-default-300 data-[disabled=true]:cursor-default data-[disabled=true]:transition-none data-[outside=true]:text-default-300 data-[outside=true]:cursor-default data-[outside=true]:pointer-events-none outline-none shadow-none data-[today=true]:text-primary-500 data-[selected=true]:shadow-none data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground hover:bg-primary-50 hover:text-primary-400 data-[selected=true]:hover:bg-primary data-[selected=true]:data-[today=true]:text-primary-foreground data-[selected=true]:hover:text-primary-foreground',
			}}
		/>
	);
};
