'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

import { Button, Skeleton } from '@nextui-org/react';

import { Icon, IconName } from '@/components/ui/Icon';

type TaskModalSectionProps = {
	children: ReactNode;
	icon?: IconName;
	iconWrapper?: string;
	title?: string;
	button?: string;
	action?: () => void;
	skeletonIcon?: boolean;
	skeletonTitle?: boolean;
	skeletonAction?: boolean;
};

export const TaskModalSection: React.FC<TaskModalSectionProps> = ({
	children,
	icon,
	iconWrapper,
	title,
	button,
	action,
	skeletonIcon,
	skeletonTitle,
	skeletonAction,
}) => {
	return (
		<div className="flex flex-row">
			<div className={clsx('flex items-center w-10 h-8 px-2', iconWrapper && iconWrapper)}>
				{icon && <Icon name={icon} size={24} />}
				{skeletonIcon && <Skeleton className="w-6 h-6 rounded-md" />}
			</div>
			<div className="w-full flex flex-col">
				{title && (
					<div className="w-full flex flex-row gap-4 items-center justify-between h-8">
						<div>{title}</div>
						{button && action && (
							<Button variant="solid" color="default" size="sm" onPress={action}>
								{button}
							</Button>
						)}
					</div>
				)}
				{skeletonTitle && (
					<div className="w-full flex flex-row gap-4 items-center justify-between h-8">
						<Skeleton className="h-4 py-2 w-40 rounded-md" />
						{skeletonAction && <Skeleton className="h-8 w-20 rounded-xl" />}
					</div>
				)}
				{children}
			</div>
		</div>
	);
};
