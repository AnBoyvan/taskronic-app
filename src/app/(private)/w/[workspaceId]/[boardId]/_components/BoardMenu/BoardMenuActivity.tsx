'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Divider, Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ActivityItem } from '@/components/shared/ActivityItem';
import { LIMITS } from '@/constants/limits';
import { activityService } from '@/services/activity.service';
import { Activity } from '@/types/activity.type';

type BoardMenuActivityProps = {
	boardId: string;
};

export const BoardMenuActivity: React.FC<BoardMenuActivityProps> = ({ boardId }) => {
	const t = useTranslations();
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [activities, setActivities] = useState<Activity[]>([]);

	const { data, isFetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery<Activity[]>({
			queryKey: ['activity', boardId],
			queryFn: async ({ pageParam }) => {
				const query = `?boardId=${boardId}&page=${pageParam}&limit=${LIMITS.boardActivities}`;

				return await activityService.find(query);
			},
			enabled: isMounted,
			initialPageParam: 1,
			getNextPageParam: (lastPage, pages) => {
				return lastPage.length < LIMITS.boardActivities ? undefined : pages.length + 1;
			},
		});

	useEffect(() => {
		if (data && data?.pages) {
			const activityData = data.pages.reduce((result, array) => result.concat(array), []);
			setActivities(activityData);
		}
	}, [data]);

	useEffect(() => {
		if (isMounted) {
			refetch();
		}
	}, [isMounted, refetch]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('common.activity')}
			</div>
			<Divider className="my-2" />
			{isFetching && !activities ? (
				<Spinner size="sm" />
			) : activities.length > 0 ? (
				<div className="flex flex-col overflow-x-hidden overflow-y-auto">
					{activities.map(item => (
						<ActivityItem key={item._id} activity={item} />
					))}
					{hasNextPage && (
						<Button
							size="sm"
							variant="bordered"
							onPress={() => fetchNextPage()}
							isDisabled={!hasNextPage || isFetchingNextPage}
							isLoading={isFetchingNextPage}
							spinnerPlacement="end"
							className="min-h-8 self-center"
						>
							{t('common.load_more')}
						</Button>
					)}
				</div>
			) : (
				<div className="w-full text-center">{t('api.not_found')}</div>
			)}
		</div>
	);
};
