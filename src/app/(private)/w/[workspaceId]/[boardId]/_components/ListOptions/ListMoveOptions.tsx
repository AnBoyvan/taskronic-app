'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { List } from '@/types/board.interface';

type ListMoveOptionsProps = {
	current: List;
	lists: List[];
	onListMove: (sourceIndex: number, destIndex: number) => void;
};

export const ListMoveOptions: React.FC<ListMoveOptionsProps> = ({ current, lists, onListMove }) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const changeListOrder = (newOrder: number) => {
		setIsOpen(false);
		onListMove(current.order, newOrder);
	};

	return (
		<Popover placement="bottom" offset={0} isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
			<PopoverTrigger>{t('board.list_move')}</PopoverTrigger>
			<PopoverContent className="p-2 max-h-64 overflow-auto">
				<div className="flex flex-col gap-2 h-full overflow-auto">
					{lists.map(({ _id, order }) => (
						<Button
							key={order}
							variant="ghost"
							color={_id === current._id ? 'primary' : 'default'}
							size="sm"
							isDisabled={_id === current._id}
							className={`p-2 min-h-8 w-40`}
							onPress={() => changeListOrder(order)}
						>
							{order + 1}
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
