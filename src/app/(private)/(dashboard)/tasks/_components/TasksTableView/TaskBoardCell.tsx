import Link from 'next/link';

import clsx from 'clsx';

import { ROUTES } from '@/configs/routes.config';
import { boardColors } from '@/constants/board-colors.constants';
import { Board } from '@/types/board.interface';
import { WorkspaceBasic } from '@/types/workspace.interface';

type TaskBoardCellProps = {
	board: Board;
	workspace?: WorkspaceBasic;
};

export const TaskBoardCell: React.FC<TaskBoardCellProps> = ({ board, workspace }) => {
	return (
		<Link
			href={`${ROUTES.WORKSPACE}/${workspace?._id}/${board._id}`}
			className="h-full w-full flex flex-row justify-start items-center gap-1 bg-transparent hover:bg-default/40 transition-colors"
		>
			<div
				style={board.thumbImage ? { backgroundImage: `url(${board.thumbImage})` } : undefined}
				className={clsx(
					'h-8 w-10 min-h-8 min-w-10 rounded-md shadow-sm bg-cover',
					board.bgColor && `${boardColors[board.bgColor]}`,
				)}
			/>
			<div className="flex flex-col gap-1 w-full overflow-hidden items-start justify-center">
				<span className="text-start text-xs truncate w-full">{board.title}</span>
				{workspace && (
					<span className="text-start text-[10px] leading-3 truncate w-full">{workspace.name}</span>
				)}
			</div>
		</Link>
	);
};
