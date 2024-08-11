import { ForwardedRef, forwardRef } from 'react';

import { Avatar, AvatarProps } from '@nextui-org/react';

import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';

interface UserAvatarProps extends AvatarProps {
	avatarName: string;
	avatarColor: ColorVariant;
	small?: boolean;
}

export const UserAvatar = forwardRef(
	(
		{ avatarName, avatarColor, name, small, ...props }: UserAvatarProps,
		ref: ForwardedRef<HTMLSpanElement>,
	) => {
		const smallStyle = small ? 'h-6 w-6 text-tiny' : '';

		return (
			<Avatar
				ref={ref}
				{...props}
				aria-label={name ? name : undefined}
				name={avatarName}
				classNames={{
					base: `${colorVariants[avatarColor]} ${smallStyle}`,
				}}
			/>
		);
	},
);
