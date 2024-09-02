import { User } from '@nextui-org/react';

import { colorVariants } from '@/constants/color-variants.constants';
import { Member } from '@/types/root.interface';

import { ContactInvite } from './ContactInvite';
import { ContactRemove } from './ContactRemove';

type ContactProps = {
	contact: Member;
};

export const Contact: React.FC<ContactProps> = ({ contact }) => {
	const { _id, name, email, avatarColor, avatarName } = contact;

	return (
		<div className="flex flex-row justify-between w-full p-2 border-b-1 border-divider">
			<User
				name={name}
				description={email}
				avatarProps={{
					size: 'sm',
					name: avatarName,
					classNames: {
						base: `${colorVariants[avatarColor]}`,
					},
				}}
			/>
			<div className="flex flex-row gap-2">
				<ContactInvite contactEmail={email} contactId={_id} />
				<ContactRemove contactId={_id} />
			</div>
		</div>
	);
};
