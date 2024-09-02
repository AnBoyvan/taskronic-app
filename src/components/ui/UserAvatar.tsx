import { ForwardedRef, forwardRef } from 'react';

import { Avatar, AvatarProps } from '@nextui-org/react';

import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';

import { Icon } from './Icon';

interface UserAvatarProps extends AvatarProps {
	avatarName: string;
	avatarColor: ColorVariant;
	small?: boolean;
	isAdmin?: boolean;
}

export const UserAvatar = forwardRef(
	(
		{ avatarName, avatarColor, name, small, isAdmin, ...props }: UserAvatarProps,
		ref: ForwardedRef<HTMLSpanElement>,
	) => {
		const smallStyle = small ? 'h-6 w-6 text-tiny' : '';

		return (
			<div className="relative">
				<Avatar
					ref={ref}
					{...props}
					aria-label={name ? name : undefined}
					name={avatarName}
					classNames={{
						base: `${colorVariants[avatarColor]} ${smallStyle}`,
					}}
				/>
				{isAdmin && (
					<Icon
						name="ChevronsUp"
						size={16}
						className="absolute -bottom-1 -right-1 text-yellow-300 z-10"
						strokeWidth={3}
					/>
				)}
			</div>
		);
	},
);
