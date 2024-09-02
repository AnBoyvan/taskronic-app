'use client';

import { List as ListType } from '@/types/board.interface';
import { TaskBoardField } from '@/types/tasks.interface';

type ListProps = {
	list: ListType;
	tasks: TaskBoardField[];
};

export const List: React.FC<ListProps> = ({ list, tasks }) => {
	return (
		<div
		// className="shrink-0 w-64 select-none p-2 bg-background "
		>
			ListContainer
		</div>
	);
};
