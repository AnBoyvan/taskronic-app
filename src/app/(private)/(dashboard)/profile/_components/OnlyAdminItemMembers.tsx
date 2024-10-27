import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Checkbox, CheckboxGroup, User } from '@nextui-org/react';

import { colorVariants } from '@/constants/color-variants.constants';
import { useBoardMembers } from '@/hooks/useBoardMembers';
import { useUser } from '@/hooks/useUser';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { Member } from '@/types/root.interface';

type OnlyAdminItemMembersProps = {
	entity: 'board' | 'workspace';
	id: string;
	members: Member[];
	onAddAdmin: (workspaceId: string) => void;
};

export const OnlyAdminItemMembers: React.FC<OnlyAdminItemMembersProps> = ({
	id,
	entity,
	members,
	onAddAdmin,
}) => {
	const t = useTranslations();
	const user = useUser();
	const { addAdmin: addWorkspaceAdmin } = useWorkspaceMembers();
	const { addAdmin: addBoardAdmin } = useBoardMembers();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selected, setSelected] = useState<string[]>([]);

	const addNewAdmins = async () => {
		setIsLoading(true);
		const data = members
			.filter(({ _id }) => selected.includes(_id))
			.map(({ _id, name }) => {
				return { _id, name };
			});

		try {
			await Promise.all(
				data.map(async item => {
					if (entity === 'workspace') {
						await addWorkspaceAdmin.mutateAsync({
							workspaceId: id,
							dto: item,
						});
					}

					if (entity === 'board') {
						await addBoardAdmin.mutateAsync({
							boardId: id,
							dto: item,
						});
					}
				}),
			);
		} finally {
			setIsLoading(false);
			onAddAdmin(id);
		}
	};

	const filtered = members.filter(({ _id }) => _id !== user._id);

	return (
		<div className="flex flex-col w-full gap-2">
			<Button
				as="div"
				size="sm"
				color={selected.length > 0 ? 'primary' : 'default'}
				variant="solid"
				isDisabled={selected.length < 1}
				onPress={addNewAdmins}
				isLoading={isLoading}
				spinnerPlacement="end"
			>
				{t('actions.add')}
			</Button>
			<CheckboxGroup
				color="primary"
				value={selected}
				onValueChange={setSelected}
				classNames={{
					wrapper: 'w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(210px,1fr))]',
				}}
			>
				{filtered.map(({ _id, name, avatar, initials }) => (
					<Checkbox key={_id} value={_id}>
						<User
							name={name}
							avatarProps={{
								size: 'sm',
								name: initials,
								classNames: {
									base: `${colorVariants[avatar]}`,
								},
							}}
						/>
					</Checkbox>
				))}
			</CheckboxGroup>
		</div>
	);
};
