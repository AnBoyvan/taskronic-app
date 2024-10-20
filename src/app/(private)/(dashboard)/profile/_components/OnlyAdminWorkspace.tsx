import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Accordion, AccordionItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { ROUTES } from '@/configs/routes.config';
import { Workspace } from '@/types/workspace.interface';

import { OnlyAdminItemMembers } from './OnlyAdminItemMembers';

type OnlyAdminWorkspacesProps = {
	workspaces: Workspace[];
	onAddAdmin: (workspaceId: string) => void;
};

export const OnlyAdminWorkspaces: React.FC<OnlyAdminWorkspacesProps> = ({
	workspaces,
	onAddAdmin,
}) => {
	const t = useTranslations();

	return (
		<div className="flex flex-col w-full">
			<p>{t('common.workspaces')}:</p>
			<Accordion
				itemClasses={{
					content: 'p-0',
					trigger: 'px-0 py-2',
					titleWrapper: 'overflow-hidden',
					title: 'flex flex-row gap-4 w-full',
				}}
			>
				{workspaces.map(workspace => (
					<AccordionItem
						key={workspace._id}
						textValue={workspace.name}
						title={
							<>
								<WorkspaceBadge
									name={workspace.name}
									avatarColor={workspace.avatarColor}
									avatarIcon={workspace.avatarIcon}
									mediumIcon
									mediumText
									truncateTitle
									className="w-full overflow-hidden"
								/>
								<Link
									href={`${ROUTES.WORKSPACE}/${workspace._id}`}
									className="h-8 w-8 flex items-center justify-center text-foreground transition-colors hover:text-primary"
								>
									<Icon name="ExternalLink" size={20} />
								</Link>
							</>
						}
					>
						<OnlyAdminItemMembers
							id={workspace._id}
							entity="workspace"
							members={workspace.members}
							onAddAdmin={onAddAdmin}
						/>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
