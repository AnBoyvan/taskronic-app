import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Accordion, AccordionItem, Button, Listbox, ListboxItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { workspaceNav } from '@/configs/nav.config';
import { useInviteModal } from '@/hooks/useInviteModal';
import { useUser } from '@/hooks/useUser';
import { Workspace } from '@/types/workspace.interface';

type WorkspacesListProps = {
	workspaces: Workspace[];
};

export const WorkspacesList: React.FC<WorkspacesListProps> = ({ workspaces }) => {
	const router = useRouter();
	const t = useTranslations();
	const { _id } = useUser();
	const modal = useInviteModal();

	return (
		<Accordion
			variant="light"
			isCompact
			showDivider={false}
			className="px-0 overflow-y-auto overflow-x-hidden w-full h-full"
			itemClasses={{
				content: 'p-0',
			}}
		>
			{workspaces.map(w => (
				<AccordionItem
					key={w._id}
					aria-label={w.name}
					classNames={{
						trigger: 'gap-1',
						startContent: 'w-40 overflow-hidden',
					}}
					startContent={
						<WorkspaceBadge name={w.name} avatarIcon={w.avatarIcon} avatarColor={w.avatarColor} />
					}
				>
					<Listbox
						aria-label={w.name}
						classNames={{
							base: 'p-0',
							list: 'p-0 pl-4',
						}}
						itemClasses={{
							base: 'p-0 pl-2 h-7',
							title: 'text-tiny',
						}}
						onAction={key => {
							router.push(key.toString());
						}}
					>
						{workspaceNav(w._id).map(({ label, value, icon }) => (
							<ListboxItem
								aria-label={t(label)}
								key={value}
								title={t(label)}
								startContent={<Icon name={icon} size={12} />}
								endContent={
									(w.admins.includes(_id) || w.settings.invite) && label === 'common.members' ? (
										<Button
											variant="light"
											color="primary"
											size="sm"
											className="h-7"
											isIconOnly
											onPress={() => {
												modal.onOpen(w);
											}}
										>
											<Icon name="Plus" size={16} />
										</Button>
									) : null
								}
							/>
						))}
					</Listbox>
				</AccordionItem>
			))}
		</Accordion>
	);
};
