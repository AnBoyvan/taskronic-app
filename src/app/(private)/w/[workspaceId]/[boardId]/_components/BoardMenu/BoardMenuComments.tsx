'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Divider, Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { CommentItem } from '@/components/shared/CommentItem';
import { LIMITS } from '@/constants/limits';
import { useBoardMenu } from '@/hooks/useBoardMenu';
import { commentService } from '@/services/comment.service';
import { Comment } from '@/types/comment.interface';

type BoardMenuCommentsProps = {
	boardId: string;
};

export const BoardMenuComments: React.FC<BoardMenuCommentsProps> = ({ boardId }) => {
	const t = useTranslations();
	const { section } = useBoardMenu();
	const [comments, setComments] = useState<Comment[]>([]);

	const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
		Comment[]
	>({
		queryKey: ['comments', boardId],
		queryFn: async ({ pageParam }) => {
			const query = `?page=${pageParam}&limit=${LIMITS.boardComments}`;

			return await commentService.findByBoard(boardId, query);
		},
		enabled: section === 'comments',
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length < LIMITS.taskModalComments ? undefined : pages.length + 1;
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

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('common.comments')}
			</div>
			<Divider className="my-2" />
			<div className="flex flex-col overflow-x-hidden overflow-y-auto">
				{isFetching && !comments ? (
					<Spinner size="sm" />
				) : (
					<>
						{comments.map(comment => (
							<CommentItem key={comment._id} comment={comment} isMenu />
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
				)}
			</div>
		</div>
	);
};
