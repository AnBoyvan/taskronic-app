import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Button, Listbox, ListboxItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { workspaceNav } from '@/configs/nav.config';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type DWorkspaceSidebarNavProps = {
	_id: string;
	name: string;
	admins: string[];
	canInvite: boolean;
};

export const WorkspaceSidebarNav: React.FC<DWorkspaceSidebarNavProps> = ({
	_id,
	name,
	admins,
	canInvite,
}) => {
	const t = useTranslations();
	const router = useRouter();
	const pathname = usePathname();
	const { user } = useCurrentUser();

	return (
		<Listbox
			aria-label={name}
			onAction={key => {
				router.push(key.toString());
			}}
		>
			{workspaceNav(_id).map(({ label, value, icon }) => (
				<ListboxItem
					aria-label={t(label)}
					key={value}
					title={t(label)}
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
									// TODO:
									console.log('ADD MEMBER');
								}}
							>
								<Icon name="Plus" size={16} />
							</Button>
						) : null
					}
				/>
			))}
		</Listbox>
	);
};
