'use client';

import { useEffect } from 'react';

import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { Icon } from '@/components/ui/Icon';
import { useTaskModal } from '@/hooks/useTaskModal';
import { taskService } from '@/services/task.service';
import { Task } from '@/types/tasks.interface';

import { TaskModalContent } from './TaskModalContent';
import { TaskModalNotFound } from './TaskModalNotFound';
import { TaskModalSkeleton } from './TaskModalSkeleton';

export const TaskModal: React.FC = () => {
	const { isOpen, taskId, onClose } = useTaskModal();

	const { data, isFetching, refetch, error } = useQuery<Task>({
		queryKey: ['task', taskId],
		queryFn: () => taskService.findById(taskId!),
		refetchOnWindowFocus: false,
		enabled: isOpen,
	});

	useEffect(() => {
		if (isOpen) {
			refetch();
		}
	}, [isOpen, refetch]);

	return (
		<Modal
			size="2xl"
			scrollBehavior="outside"
			isOpen={isOpen}
			onOpenChange={onClose}
			placement="center"
			backdrop="blur"
			classNames={{
				base: 'my-12',
				closeButton: 'right-2 top-2',
			}}
			closeButton={
				<Button isIconOnly variant="light" size="md">
					<Icon name="X" size={20} />
				</Button>
			}
		>
			<ModalContent className="flex-col justify-start p-3">
				<ModalBody className="p-0 gap-4">
					{isFetching ? (
						<TaskModalSkeleton />
					) : data ? (
						<TaskModalContent task={data} />
					) : (
						<TaskModalNotFound error={error?.message} />
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
