import clsx from 'clsx';

import { Divider, Link } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { TaskCard } from '@/components/shared/TaskCard';
import { ROUTES } from '@/configs/routes.config';
import { boardColors } from '@/constants/board-colors.constants';
import { useUser } from '@/hooks/useUser';
import { Board } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

type TasksGridViewByBoardProps = {
	tasks: Task[];
	board: Board;
};

export const TasksGridViewByBoard: React.FC<TasksGridViewByBoardProps> = ({ tasks, board }) => {
	const user = useUser();

	const { _id, thumbImage, bgColor, title, workspace } = board;

	const permissions = getBoardPermissions(board, user._id);

	if (tasks.length < 1) {
		return null;
	}

	return (
		<Section noTopMargin className="flex flex-col gap-2">
			<div className="flex flex-row items-center gap-2">
				<div
					style={thumbImage ? { backgroundImage: `url(${thumbImage})` } : undefined}
					className={clsx('h-10 w-14 rounded-md shadow-sm', bgColor && `${boardColors[bgColor]}`)}
				></div>
				<Link
					href={`${ROUTES.WORKSPACE}/${workspace?._id}/${_id}`}
					className="text-wrap hover:text-primary transition-colors"
				>
					{title}
				</Link>
			</div>
			<div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
				{tasks.map(task => (
					<TaskCard key={task._id} task={task} showInfo permissions={permissions} />
				))}
			</div>
			<Divider className="my-2" />
		</Section>
	);
};
