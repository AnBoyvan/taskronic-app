import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Button, Listbox, ListboxItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { workspaceNav } from '@/configs/nav.config';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useInviteModal } from '@/hooks/useInviteModal';
import { Member } from '@/types/root.interface';
import { Workspace } from '@/types/workspace.interface';

type DWorkspaceSidebarNavProps = {
	workspace: Workspace;
	name: string;
	admins: string[];
	canInvite: boolean;
	requests: Member[];
};

export const WorkspaceSidebarNav: React.FC<DWorkspaceSidebarNavProps> = ({
	workspace,
	name,
	admins,
	canInvite,
	requests,
}) => {
	const t = useTranslations();
	const router = useRouter();
	const pathname = usePathname();
	const { user } = useCurrentUser();
	const inviteModal = useInviteModal();

	return (
		<Listbox
			aria-label={name}
			onAction={key => {
				router.push(key.toString());
			}}
		>
			{workspaceNav(workspace._id).map(({ label, value, icon }) => (
				<ListboxItem
					aria-label={t(label)}
					key={value}
					startContent={<Icon name={icon} size={16} />}
					isReadOnly={Boolean(pathname === value)}
					className="h-10"
					classNames={{
						base: pathname === value ? 'text-primary bg-primary-50' : '',
						title: 'font-medium',
					}}
					endContent={
						(admins.includes(user?.sub!) || canInvite) && label === 'common.members' ? (
							<Button
								variant="light"
								color="primary"
								size="sm"
								isIconOnly
								onPress={() => {
									inviteModal.onOpen(workspace);
								}}
							>
								<Icon name="Plus" size={16} />
							</Button>
						) : null
					}
				>
					<span className="flex flex-row gap-2 items-center">
						{t(label)}
						{label === 'common.members' && requests.length > 0 && (
							<Icon name="CircleAlert" size={16} className="text-success" />
						)}
					</span>
				</ListboxItem>
			))}
		</Listbox>
	);
};
