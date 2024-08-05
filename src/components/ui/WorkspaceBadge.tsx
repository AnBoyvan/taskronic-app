import { ForwardedRef, forwardRef } from 'react';

import { Avatar, AvatarProps } from '@nextui-org/react';

import { ColorVariant, colorVariants } from '@/styles/colorVariants';

import { Icon, IconName } from './Icon';

interface WorkspaceBadgeProps {
	name: string;
	avatarIcon: IconName;
	avatarColor: ColorVariant;
	large?: boolean;
	avatarProps?: AvatarProps;
}

export const WorkspaceBadge = forwardRef(
	(
		{ name, avatarIcon, avatarColor, avatarProps, large, ...props }: WorkspaceBadgeProps,
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
							base: `${colorVariants[avatarColor]} ${large ? 'w-8 h-8' : 'w-6 h-6'}`,
						}}
					/>
				</div>
				<span className={large ? 'text-sm' : 'truncate text-tiny'}>{name}</span>
			</div>
		);
	},
);
