import { Skeleton } from '@nextui-org/react';

export const WorkspaceListSkeleton: React.FC = () => {
	const skeletons = Array(5).fill(0);

	return (
		<>
			{skeletons.map((_, index) => (
				<div key={index} className="flex flex-row items-center h-10 gap-2 w-full p-2">
					<Skeleton className="w-6 h-6 rounded-md" />
					<Skeleton className="h-2.5 w-20 rounded-lg" />
				</div>
			))}
		</>
	);
};
