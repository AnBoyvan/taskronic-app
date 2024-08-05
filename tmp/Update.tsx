'use client';

import { Button } from '@nextui-org/react';

import { useCurrentUser } from '@/hooks/useCurrentUser';

export const Update: React.FC = () => {
	const { user, update } = useCurrentUser();

	const handleUpdate = () => {
		if (user) {
			update({
				name: user.name,
				avatarColor: 'bg-lime-500 ring-lime-500 text-[#000]',
				noteGroups: user.noteGroups,
			});
		}
	};

	return (
		<Button color="danger" variant="flat" onClick={handleUpdate}>
			<span>UPD</span>
		</Button>
	);
};
