import clsx from 'clsx';
import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';

import { Avatar, AvatarProps } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';
import { WorkspaceIcon } from '@/constants/workspace-icons.constants';

interface WorkspaceBadgeProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	name: string;
	avatarIcon: WorkspaceIcon;
	avatarColor: ColorVariant;
	mediumText?: boolean;
	largeText?: boolean;
	mediumIcon?: boolean;
	largeIcon?: boolean;
	truncateTitle?: boolean;
	avatarProps?: AvatarProps;
}

export const WorkspaceBadge = forwardRef(
	(
		{
			name,
			avatarIcon,
			avatarColor,
			avatarProps,
			mediumText,
			largeText,
			mediumIcon,
			largeIcon,
			truncateTitle,
			className,
			...props
		}: WorkspaceBadgeProps,
		ref: ForwardedRef<HTMLDivElement>,
	) => {
		const iconSize = !mediumIcon && !largeIcon ? 16 : largeIcon ? 24 : 20;

		return (
			<div
				{...props}
				className={clsx('flex flex-row items-center gap-2 rounded-sm', className && className)}
			>
				<div>
					<Avatar
						{...avatarProps}
						radius="sm"
						icon={<Icon name={avatarIcon} size={iconSize} />}
						classNames={{
							base: clsx(
								`${colorVariants[avatarColor]}`,
								!mediumIcon && !largeIcon && 'w-6 h-6',
								mediumIcon && 'w-8 h-8',
								largeIcon && 'w-10 h-10',
							),
						}}
					/>
				</div>
				<span
					className={clsx(
						!mediumText && !largeText && 'truncate text-tiny',
						mediumText && 'text-sm ',
						largeText && 'text-base',
						truncateTitle && 'truncate',
					)}
				>
					{name}
				</span>
			</div>
		);
	},
);
