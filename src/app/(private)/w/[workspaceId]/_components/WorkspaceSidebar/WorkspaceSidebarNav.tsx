import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Button, Listbox, ListboxItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { workspaceNav } from '@/configs/nav.config';

type DWorkspaceSidebarNavProps = {
	_id: string;
	name: string;
};

export const WorkspaceSidebarNav: React.FC<DWorkspaceSidebarNavProps> = ({ _id, name }) => {
	const t = useTranslations();
	const router = useRouter();
	const pathname = usePathname();

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
						label === 'common.members' ? (
							<Button
								variant="light"
								color="primary"
								size="sm"
								isIconOnly
								onPress={() => {
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
