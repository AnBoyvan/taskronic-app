'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { TaskMember } from '@/components/shared/TaskMember';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

type MembersCellProps = {
	task: Task;
	permissions: BoardPermissions;
	textColor?: string;
};

export const MembersCell: React.FC<MembersCellProps> = ({ task, permissions, textColor }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const membersList = task.members.length > 3 ? task.members.slice(0, 3) : task.members;

	return (
		<div className="flex flex-row gap-0.5 items-center">
			{membersList.map(member => (
				<TaskMember
					key={member._id}
					member={member}
					taskId={task._id}
					boardId={task.board._id}
					canRemove={permissions?.taskMembers}
					isSmall
					onAction={() => setIsOpen(false)}
				/>
			))}
			{task.members.length > 3 && (
				<Popover
					placement="bottom"
					offset={0}
					isOpen={isOpen}
					onOpenChange={open => setIsOpen(open)}
				>
					<PopoverTrigger>
						<Button
							variant="light"
							size="sm"
							radius="full"
							isIconOnly
							className={clsx(textColor ? textColor : 'text-foreground')}
						>
							+{task.members.length - 3}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="grid grid-cols-6 gap-2 p-2">
						{task.members.map(member => (
							<TaskMember
								key={member._id}
								member={member}
								taskId={task._id}
								boardId={task.board._id}
								canRemove={permissions?.taskMembers}
								isSmall
								onAction={() => setIsOpen(false)}
							/>
						))}
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
};
