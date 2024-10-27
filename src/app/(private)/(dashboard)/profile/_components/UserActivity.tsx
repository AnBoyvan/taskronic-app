'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ActivityItem } from '@/components/shared/ActivityItem';
import { LIMITS } from '@/constants/limits';
import { useUser } from '@/hooks/useUser';
import { activityService } from '@/services/activity.service';
import { Activity } from '@/types/activity.type';

export const UserActivity: React.FC = () => {
	const t = useTranslations();
	const user = useUser();

	const [activities, setActivities] = useState<Activity[]>([]);

	const { data, isFetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery<Activity[]>({
			queryKey: ['activity', user._id],
			queryFn: async ({ pageParam }) => {
				const query = `?userId=${user._id}&page=${pageParam}&limit=${LIMITS.memberActivities}`;

				return await activityService.find(query);
			},
			enabled: Boolean(user.isLoggedIn),
			initialPageParam: 1,
			getNextPageParam: (lastPage, pages) => {
				return lastPage.length < LIMITS.memberActivities ? undefined : pages.length + 1;
			},
		});

	useEffect(() => {
		if (data && data?.pages) {
			const activityData = data.pages.reduce((result, array) => result.concat(array), []);
			setActivities(activityData);
		}
	}, [data]);

	useEffect(() => {
		if (user.isLoggedIn) {
			refetch();
		}
	}, [user, refetch]);

	return (
		<div className="w-full flex flex-col gap-4 py-4 lg:py-8">
			{isFetching && activities.length === 0 ? (
				<Spinner size="sm" />
			) : activities.length > 0 ? (
				<>
					{activities.map(item => (
						<ActivityItem key={item._id} activity={item} userId={user._id} showBoard />
					))}
					{hasNextPage && (
						<Button
							size="sm"
							variant="solid"
							onPress={() => fetchNextPage()}
							isDisabled={!hasNextPage || isFetchingNextPage}
							isLoading={isFetchingNextPage}
							spinnerPlacement="end"
						>
							{t('actions.load_more')}
						</Button>
					)}
				</>
			) : (
				<div className="w-full my-auto text-center">{t('api.not_found')}</div>
			)}
		</div>
	);
};
