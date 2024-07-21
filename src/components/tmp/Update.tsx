'use client';

import { useSession } from 'next-auth/react';

import { Button } from '@nextui-org/react';

export const Update: React.FC = () => {
	const { update } = useSession();

	const handleUpdate = () => {
		update({ name: 'Testing User' });
	};

	return (
		<Button color="danger" variant="flat" onClick={handleUpdate}>
			<span>UPD</span>
		</Button>
	);
};
