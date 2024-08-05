'use client';

import { CustomAvatar } from '@/components/ui/CustomAvatar';
import { getAvatarColorVariants } from '@/utils/helpers/getAvatarColorVariants';

export const Testing: React.FC = () => {
	const colorsArr = getAvatarColorVariants();

	const avatars = colorsArr.map(a => (
		<CustomAvatar name={a} color={a as any} key={a} size="lg" radius="full" />
	));

	return (
		<div
			className="flex flex-row gap-10 flex-wrap text-default-foreground
  "
		>
			{avatars}
		</div>
	);
};
