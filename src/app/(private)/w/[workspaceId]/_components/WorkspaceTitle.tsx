import { useTranslations } from 'next-intl';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Workspace } from '@/interfaces/workspace.interface';
import { getWorkspacePermissions } from '@/utils/helpers/getWorkspacePermission';

type WorkspaceTitleProps = {
	workspace: Workspace;
};

export const WorkspaceTitle: React.FC<WorkspaceTitleProps> = ({ workspace }) => {
	const t = useTranslations();
	const { user } = useCurrentUser();

	const { name, avatarColor, avatarIcon, description } = workspace;

	const { invite } = getWorkspacePermissions(workspace, user?.sub!);

	return (
		<div className="w-full flex flex-col md:flex-row gap-4 justify-between lg:gap-8 p-4 lg:p-8 border-b border-divider">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row gap-2 items-start">
					<WorkspaceBadge
						name={name}
						avatarColor={avatarColor}
						avatarIcon={avatarIcon}
						large={true}
					/>
					<Button
						isIconOnly
						size="md"
						variant="light"
						color="success"
						onPress={() => {
							// TODO:
							console.log('UPDATE');
						}}
					>
						<Icon name="Pencil" size={16} />
					</Button>
				</div>
				{description && <span className="flex flex-col text-tiny">{workspace.description}</span>}
			</div>
			<Button
				variant="solid"
				color={invite ? 'primary' : 'default'}
				size="md"
				isDisabled={!invite}
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
