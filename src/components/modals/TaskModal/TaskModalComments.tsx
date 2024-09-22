'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { CommentForm } from '@/components/shared/CommentForm';
import { CommentItem } from '@/components/shared/CommentItem';
import { Icon } from '@/components/ui/Icon';
import { useCommentsEdit } from '@/hooks/useCommentsEdit';
import { commentService } from '@/services/comment.service';
import { BoardPermissions } from '@/types/board.interface';
import { Comment } from '@/types/comment.interface';
import { Task } from '@/types/tasks.interface';

import { TaskModalSection } from './TaskModalSection';

type TaskModalCommentsProps = {
	task: Task;
	userId?: string;
	permissions?: BoardPermissions;
};

export const TaskModalComments: React.FC<TaskModalCommentsProps> = ({
	task,
	permissions,
	userId,
}) => {
	const t = useTranslations();
	const { create, update, remove } = useCommentsEdit();
	const limit = 10;

	const [showComments, setShowComments] = useState<boolean>(false);
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [comments, setComments] = useState<Comment[]>([]);

	const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
		Comment[]
	>({
		queryKey: ['comments', task._id],
		queryFn: async ({ pageParam }) => {
			const query = `?page=${pageParam}&limit=${limit}`;

			return await commentService.findByTask(task._id, query);
		},
		enabled: showComments,
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length < limit ? undefined : pages.length + 1;
		},
	});

	useEffect(() => {
		if (data && data?.pages) {
			const commentsData = data.pages.reduce((result, array) => {
				const filteredArray = array.filter(
					comment => !result.find(existingComment => existingComment._id === comment._id),
				);
				return result.concat(filteredArray);
			}, []);
			setComments(commentsData);
		}
	}, [data]);

	const handleAddComment = async (comment: string) => {
		setIsFormOpen(false);
		const newComment = await create.mutateAsync({
			task: task._id,
			board: task.board._id,
			content: comment,
		});
		setComments(prev => [newComment, ...prev.filter(com => com._id !== newComment._id)]);
	};

	const handleCommentEdit = (commentId: string, edited: string) => {
		update.mutate({ commentId, data: { content: edited } });

		setComments(prev =>
			prev.map(com => (com._id === commentId ? { ...com, content: edited } : com)),
		);
	};

	const handleCommentRemove = (commentId: string) => {
		remove.mutate(commentId);

		setComments(comments.filter(com => com._id !== commentId));
	};

	return (
		<TaskModalSection
			icon="MessageSquareText"
			title={t('common.comments')}
			button={t(showComments ? 'task.comments_hide' : 'task.comments_show')}
			action={() => setShowComments(!showComments)}
		>
			<div className="flex flex-col w-full mt-2">
				{showComments &&
					(isFetching && !comments ? (
						<Spinner size="sm" />
					) : (
						<>
							{comments.map(comment => (
								<CommentItem
									key={comment._id}
									comment={comment}
									userId={userId}
									isAdmin={permissions?.isAdmin}
									onRemove={handleCommentRemove}
									onEdit={handleCommentEdit}
								/>
							))}
							{hasNextPage && (
								<Button
									size="sm"
									variant="bordered"
									onPress={() => fetchNextPage()}
									isDisabled={!hasNextPage || isFetchingNextPage}
									isLoading={isFetchingNextPage}
									spinnerPlacement="end"
									className="self-center"
								>
									{t('common.load_more')}
								</Button>
							)}
						</>
					))}
			</div>
			{isFormOpen ? (
				<CommentForm onAccept={handleAddComment} onReject={() => setIsFormOpen(false)} />
			) : (
				<Button
					size="sm"
					variant="solid"
					radius="sm"
					color="default"
					className="w-fit mt-2"
					startContent={<Icon name="Plus" size={16} />}
					onPress={() => setIsFormOpen(true)}
				>
					{t('comment.write')}
				</Button>
			)}
		</TaskModalSection>
	);
};
