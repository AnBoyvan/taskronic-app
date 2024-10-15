'use client';

import { ReactNode, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { List } from '@/types/board.interface';

type ListsProps = {
	current: string;
	lists: List[];
	onListSelect: (listId: string) => void;
	trigger: ReactNode;
};

export const Lists: React.FC<ListsProps> = ({ current, lists, onListSelect, trigger }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const filtered = lists.filter(({ _id }) => _id !== current);

	return (
		<Popover placement="bottom" offset={0} isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent className="p-2 max-h-64 overflow-auto">
				<div className="flex flex-col gap-2 h-full overflow-auto">
					{filtered.map(({ _id, label, bgColor, textColor }) => (
						<Button
							key={_id}
							size="sm"
							variant="faded"
							className={`p-2 ${bgColor} ${textColor} min-h-8 w-48 truncate`}
							onPress={() => {
								onListSelect(_id), setIsOpen(false);
							}}
						>
							{label}
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
