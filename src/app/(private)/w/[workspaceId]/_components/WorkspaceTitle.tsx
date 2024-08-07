import { useTranslations } from 'next-intl';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { IWorkspace } from '@/interfaces/workspace.interface';

type WorkspaceTitleProps = {
	workspace: IWorkspace;
};

export const WorkspaceTitle: React.FC<WorkspaceTitleProps> = ({ workspace }) => {
	const t = useTranslations();
	const { user } = useCurrentUser();

	const { name, avatarColor, avatarIcon, admins, members, settings, description } = workspace;

	const canInvite = () => {
		if (!user) return false;

		if (admins?.includes(user.sub)) {
			return true;
		}

		if (members.some(member => member._id === user.sub) && settings.invite) {
			return true;
		}

		return false;
	};

	const canUpdate = () => {
		if (!user) return false;

		if (admins?.includes(user.sub)) {
			return true;
		}

		if (members.some(member => member._id === user.sub) && settings.update) {
			return true;
		}

		return false;
	};

	const canRemoveMember = () => {
		if (!user) return false;

		if (admins?.includes(user.sub)) {
			return true;
		}

		if (members.some(member => member._id === user.sub) && settings.removeMember) {
			return true;
		}

		return false;
	};

	const canCreateBoard = () => {
		if (!user) return false;

		if (admins?.includes(user.sub)) {
			return true;
		}

		if (members.some(member => member._id === user.sub) && settings.createBoard) {
			return true;
		}

		return false;
	};

	console.log(canInvite());

	return (
		<div className="flex flex-col md:flex-row gap-4 justify-between lg:gap-8 p-4 lg:p-8 border-b border-divider">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-start">
					<WorkspaceBadge
						name={name}
						avatarColor={avatarColor}
						avatarIcon={avatarIcon}
						large={true}
					/>
					<Button isIconOnly size="md" variant="light" color="success">
						<Icon name="Pencil" size={16} />
					</Button>
				</div>
				{description && <span className="flex flex-col text-tiny">{workspace.description}</span>}
			</div>
			<Button
				variant="solid"
				color={canInvite() ? 'primary' : 'default'}
				size="md"
				isDisabled={!canInvite()}
				startContent={<Icon name="UserPlus" size={20} />}
				className="min-w-48 w-48 ml-auto"
				onPress={() => {
					// TODO:
					console.log('INVITE');
				}}
			>
				{t('workspace.invite_members')}
			</Button>
		</div>
	);
};
