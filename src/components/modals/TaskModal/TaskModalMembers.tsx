'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';

import { AddTaskMemberPopover } from '@/components/shared/AddTaskMembersPopover';
import { TaskMember } from '@/components/shared/TaskMember';
import { Icon } from '@/components/ui/Icon';
import { useTaskMembers } from '@/hooks/useTaskMembers';
import { Member } from '@/types/root.interface';

type TaskModalMembersProps = {
	members: Member[];
	taskId: string;
	boardId: string;
	canRemove?: boolean;
	boardMembers: Member[];
};

export const TaskModalMembers: React.FC<TaskModalMembersProps> = ({
	members,
	taskId,
	boardId,
	canRemove,
	boardMembers,
}) => {
	const t = useTranslations();
	const { addMember } = useTaskMembers();

	const [membersList, setMembersList] = useState<Member[]>(members);
	const [filteredBoardMembers, setFilteredBoardMembers] = useState<Member[]>(members);

	const addTaskMember = (newMember: Member) => {
		setMembersList([...membersList, newMember]);
		addMember.mutate({
			taskId,
			data: {
				_id: newMember._id,
				name: newMember.name,
			},
		});
	};

	const removeTaskMember = (memberId: string) => {
		setMembersList(membersList.filter(({ _id }) => _id !== memberId));
	};

	useEffect(() => {
		const membersIds = membersList.map(({ _id }) => _id);
		setFilteredBoardMembers(boardMembers.filter(({ _id }) => !membersIds.includes(_id)));
	}, [membersList, boardMembers]);

	return (
		<div className="flex flex-col gap-1">
			<span className="text-tiny">{t('common.members')}:</span>
			<div className="flex flex-row flex-wrap gap-1">
				{membersList.map(member => (
					<TaskMember
						key={member._id}
						member={member}
						taskId={taskId}
						boardId={boardId}
						canRemove={canRemove}
						size="sm"
						onRemove={removeTaskMember}
					/>
				))}
				{canRemove && (
					<AddTaskMemberPopover
						trigger={
							<Button isIconOnly variant="solid" color="default" size="sm" radius="full">
								<Icon name="Plus" size={16} />
							</Button>
						}
						boardMembers={filteredBoardMembers}
						onMemberAdd={addTaskMember}
					/>
				)}
			</div>
		</div>
	);
};
