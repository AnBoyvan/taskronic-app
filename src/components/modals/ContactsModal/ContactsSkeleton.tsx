import { Card, Skeleton } from '@nextui-org/react';

export const ContactsSkeleton: React.FC = () => {
	const skeletons = Array(5).fill(0);

	return (
		<>
			{skeletons.map((_, index) => (
				<Card key={index} className="flex-row items-center gap-4 w-full p-2">
					<Skeleton className="aspect-square rounded-full w-10 " />
					<div className="w-full flex flex-col gap-2">
						<Skeleton className="h-3 w-24 rounded-lg" />
						<Skeleton className="h-2.5 w-32 rounded-lg" />
					</div>
				</Card>
			))}
		</>
	);
};
