import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

import { Avatar, AvatarProps } from '@nextui-org/react';

import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';
import { WorkspaceIcon } from '@/constants/workspace-icons.constants';

import { Icon } from './Icon';

type WorkspaceBadgeProps = {
	name: string;
	avatarIcon: WorkspaceIcon;
	avatarColor: ColorVariant;
	medium?: boolean;
	large?: boolean;
	avatarProps?: AvatarProps;
};

export const WorkspaceBadge = forwardRef(
	(
		{ name, avatarIcon, avatarColor, avatarProps, medium, large, ...props }: WorkspaceBadgeProps,
		ref: ForwardedRef<HTMLDivElement>,
	) => {
		return (
			<div {...props} className="flex flex-row items-center gap-2 rounded-sm">
				<div>
					<Avatar
						{...avatarProps}
						radius="sm"
						icon={<Icon name={avatarIcon} size={large ? 24 : 16} />}
						classNames={{
							base: clsx(
								`${colorVariants[avatarColor]}`,
								!medium && !large && 'w-6 h-6',
								medium && 'w-8 h-8',
								large && 'w-10 h-10',
							),
						}}
					/>
				</div>
				<span
					className={clsx(
						!medium && !large && 'truncate text-tiny',
						medium && 'text-sm ',
						large && 'text-base',
					)}
				>
					{name}
				</span>
			</div>
		);
	},
);
