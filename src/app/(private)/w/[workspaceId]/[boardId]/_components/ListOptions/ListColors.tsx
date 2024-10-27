'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ListColor, listColors } from '@/constants/list-colors.constants';
import { useLists } from '@/hooks/useLists';
import { List } from '@/types/board.interface';

type ListColorsProps = {
	list: List;
	boardId: string;
};

export const ListColors: React.FC<ListColorsProps> = ({ list, boardId }) => {
	const t = useTranslations();
	const { updList } = useLists();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const setColor = (color: ListColor) => {
		updList.mutate({
			boardId,
			data: {
				...list,
				bgColor: color.color,
				textColor: color.text,
			},
		});
		setIsOpen(false);
	};

	return (
		<Popover
			placement="bottom"
			offset={0}
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			radius="md"
		>
			<PopoverTrigger>{t('board.list_color')}</PopoverTrigger>
			<PopoverContent className="grid grid-cols-5 gap-2 p-2">
				{listColors.map((item, idx) => (
					<Button
						size="md"
						radius="sm"
						key={idx}
						isIconOnly={updList.isPending}
						isDisabled={item.color === list.bgColor}
						className={`${item.color} ${item.text} min-w-10 min-h-10`}
						onPress={() => {
							setColor(item);
						}}
					>
						{item.color === list.bgColor && <Icon name="Check" size={16} />}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
};
