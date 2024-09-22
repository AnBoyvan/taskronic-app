'use client';

import { Skeleton } from '@nextui-org/react';

import { TaskModalSection } from './TaskModalSection';

export const TaskModalSkeleton: React.FC = () => {
	const membersSkeletons = Array(5).fill(0);

	return (
		<>
			<TaskModalSection skeletonIcon>
				<Skeleton className="h-5 max-w-80 mt-1.5 mr-10 rounded-md" />
				<Skeleton className="h-3 w-32 mt-4 rounded-md" />
				<Skeleton className="h-3 w-32 mt-4 rounded-md" />
			</TaskModalSection>
			<TaskModalSection>
				<Skeleton className="h-2 w-28 rounded-md" />
				<div className="flex flex-row gap-1 py-2">
					{membersSkeletons.map((_, idx) => (
						<Skeleton key={idx} className="h-8 w-8 rounded-full" />
					))}
				</div>
				<div className="flex flex-row flex-wrap gap-y-3 gap-x-4 my-2">
					<div>
						<Skeleton className="h-2 w-28 rounded-md" />
						<Skeleton className="h-10 w-40 mt-1 rounded-2xl" />
					</div>
					<div>
						<Skeleton className="h-2 w-28 rounded-md" />
						<Skeleton className="h-10 w-20 mt-1 rounded-2xl" />
					</div>
				</div>
			</TaskModalSection>
			<TaskModalSection skeletonIcon skeletonTitle skeletonAction>
				<div className="w-full flex h-20 border-transparent border-2 bg-default-100 rounded-2xl mt-2 p-2"></div>
			</TaskModalSection>
			<TaskModalSection skeletonIcon skeletonTitle skeletonAction>
				<Skeleton className="h-8 w-20 mt-4 rounded-xl" />
			</TaskModalSection>
			<TaskModalSection skeletonIcon skeletonTitle skeletonAction>
				<Skeleton className="h-8 w-40 mt-4 rounded-xl" />
			</TaskModalSection>
			<TaskModalSection skeletonIcon skeletonTitle skeletonAction>
				<></>
			</TaskModalSection>
		</>
	);
};
