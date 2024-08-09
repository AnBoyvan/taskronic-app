import { Divider, Skeleton } from '@nextui-org/react';

export const WorkspaceSidebarSkeleton: React.FC = () => {
	const skeletons = Array(3).fill(0);

	return (
		<div className="flex flex-col w-64 h-full px-2 border-r border-divider">
			<div className="flex flex-row items-center gap-2 p-2">
				<Skeleton className="w-8 h-8 rounded-md" />
				<Skeleton className="h-4 w-40 rounded-lg" />
			</div>
			<Divider />
			<div className="flex flex-col p-2">
				{skeletons.map((_, index) => (
					<div key={index} className="flex items-center gap-2 h-10 w-full p-2">
						<Skeleton className="w-4 h-4 rounded-sm" />
						<Skeleton className="h-3 w-40 rounded-lg" />
					</div>
				))}
			</div>
			<Divider />
			<div className="w-full flex flex-row items-center justify-between px-2 py-3">
				<Skeleton className="h-2 w-28 rounded-lg" />
				<div className="w-6 h-6 flex flex-row items-center justify-center gap-0.5">
					{skeletons.map((_, index) => (
						<Skeleton key={index} className="h-1 w-1 rounded-full" />
					))}
				</div>
			</div>
			{skeletons.map((_, index) => (
				<div key={index} className="flex flex-row items-center h-10 gap-2 w-full p-2">
					<Skeleton className="h-2.5 w-40 rounded-lg" />
				</div>
			))}
		</div>
	);
};
