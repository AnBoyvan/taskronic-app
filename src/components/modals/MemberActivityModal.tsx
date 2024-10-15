'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
	User,
} from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ActivityItem } from '@/components/shared/ActivityItem';
import { Icon } from '@/components/ui/Icon';
import { colorVariants } from '@/constants/color-variants.constants';
import { LIMITS } from '@/constants/limits';
import { useMemberActivityModal } from '@/hooks/useMemberActivityModal';
import { activityService } from '@/services/activity.service';
import { Activity } from '@/types/activity.type';

export const MemberActivityModal: React.FC = () => {
	const t = useTranslations();
	const { member, boardId, isOpen, onClose } = useMemberActivityModal();

	const [activities, setActivities] = useState<Activity[]>([]);

	const { data, isFetching, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery<Activity[]>({
			queryKey: ['activity', boardId, member?._id],
			queryFn: async ({ pageParam }) => {
				const query = `?boardId=${boardId}&userId=${member?._id}&page=${pageParam}&limit=${LIMITS.memberActivities}`;

				return await activityService.find(query);
			},
			enabled: isOpen,
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
		if (isOpen) {
			refetch();
		}
	}, [isOpen, refetch]);

	return (
		<Modal
			size="lg"
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
				<ModalHeader className="p-2 text-center">
					<User
						name={member?.name}
						description={member?.email}
						className="min-w-64 justify-start"
						avatarProps={{
							name: member?.initials,
							classNames: {
								base: `${colorVariants[member?.avatar!]}`,
							},
						}}
					/>
				</ModalHeader>
				<ModalBody className="p-0 gap-4 min-h-80">
					{isFetching && !activities ? (
						<Spinner size="sm" />
					) : activities.length > 0 ? (
						<>
							{activities.map(item => (
								<ActivityItem key={item._id} activity={item} userId={member?._id} />
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
					) : (
						<div className="w-full my-auto text-center">{t('api.not_found')}</div>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
