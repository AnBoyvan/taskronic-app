'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ActivityItem } from '@/components/shared/ActivityItem';
import { LIMITS } from '@/constants/limits';
import { activityService } from '@/services/activity.service';
import { Activity } from '@/types/activity.type';

import { TaskModalSection } from './TaskModalSection';

type TaskModalActivityProps = {
	taskId: string;
	boardId: string;
	userId?: string;
};

export const TaskModalActivity: React.FC<TaskModalActivityProps> = ({ taskId, userId }) => {
	const t = useTranslations();

	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [activities, setActivities] = useState<Activity[]>([]);

	const { data, isFetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery<Activity[]>({
			queryKey: ['activity', taskId],
			queryFn: async ({ pageParam }) => {
				const query = `?taskId=${taskId}&page=${pageParam}&limit=${LIMITS.taskModalActivities}`;

				return await activityService.find(query);
			},
			enabled: showDetails,
			initialPageParam: 1,
			getNextPageParam: (lastPage, pages) => {
				return lastPage.length < LIMITS.taskModalActivities ? undefined : pages.length + 1;
			},
		});

	useEffect(() => {
		if (data && data?.pages) {
			const activityData = data.pages.reduce((result, array) => result.concat(array), []);
			setActivities(activityData);
		}
	}, [data]);

	useEffect(() => {
		if (showDetails) {
			refetch();
		}
	}, [showDetails, refetch]);

	return (
		<TaskModalSection
			icon="Activity"
			title={t('common.activity')}
			button={t(!showDetails ? 'task.activity_show' : 'task.activity_hide')}
			action={() => setShowDetails(!showDetails)}
		>
			{showDetails &&
				(isFetching && !activities ? (
					<Spinner size="sm" />
				) : (
					<>
						{activities.map(item => (
							<ActivityItem key={item._id} activity={item} taskId={taskId} userId={userId} />
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
								{t('actions.load_more')}
							</Button>
						)}
					</>
				))}
		</TaskModalSection>
	);
};
