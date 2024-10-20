'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	User,
} from '@nextui-org/react';

import { WorkspaceSwitcher } from '@/components/shared/WorkspaceSwitcher';
import { Icon } from '@/components/ui/Icon';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { dashboardNav } from '@/configs/nav.config';
import { ROUTES } from '@/configs/routes.config';
import { colorVariants } from '@/constants/color-variants.constants';
import { useContactsModal } from '@/hooks/useContactsModal';
import { useUser } from '@/hooks/useUser';

import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Account: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const router = useRouter();
	const t = useTranslations();
	const { name, email, initials, avatar, logout } = useUser();
	const { onOpen } = useContactsModal();

	const onWorkspaceSelect = (workspaceId: string) => {
		router.push(`${ROUTES.WORKSPACE}/${workspaceId}`);
		setIsOpen(false);
	};

	return (
		<Dropdown
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			closeOnSelect={false}
			className="w-52"
			classNames={{
				base: 'overflow-hidden',
				content: 'overflow-y-auto',
			}}
		>
			<DropdownTrigger>
				<UserAvatar avatarName={initials} avatarColor={avatar} size="sm" as="button" />
			</DropdownTrigger>
			<DropdownMenu aria-label={t('account.profile')} className="max-h-[calc(100vh_-_6rem)] p-1">
				<DropdownSection showDivider>
					<DropdownItem isReadOnly textValue={name} className="cursor-default">
						<User
							name={name}
							description={email}
							avatarProps={{
								name: initials,
								classNames: {
									base: `${colorVariants[avatar]}`,
								},
							}}
						/>
					</DropdownItem>
				</DropdownSection>

				<DropdownSection showDivider>
					{dashboardNav.map(({ value, label }) => (
						<DropdownItem
							key={label}
							closeOnSelect={true}
							href={value}
							aria-label={t(label as any)}
						>
							{t(label as any)}
						</DropdownItem>
					))}
				</DropdownSection>

				<DropdownSection showDivider>
					<DropdownItem aria-label={t('account.theme')} isReadOnly className="p-0">
						<WorkspaceSwitcher
							variant="flat"
							classNames={{
								trigger: 'pl-2 pr-6 bg-transparent',
								innerWrapper: 'w-full',
								selectorIcon: 'right-2',
								label: 'px-2',
								popoverContent: 'p-0',
								listbox: 'p-0',
							}}
							onWorkspaceChange={workspaceId => onWorkspaceSelect(workspaceId)}
						/>
					</DropdownItem>
				</DropdownSection>

				<DropdownSection showDivider>
					<DropdownItem
						href={ROUTES.PROFILE}
						aria-label={t('account.profile')}
						closeOnSelect={true}
					>
						{t('account.profile')}
					</DropdownItem>
					<DropdownItem
						aria-label={t('LocaleSwitcher.label')}
						endContent={<Icon name="ChevronRight" size={16} />}
					>
						<LanguageSwitcher />
					</DropdownItem>
					<DropdownItem
						aria-label={t('account.theme')}
						endContent={<Icon name="ChevronRight" size={16} />}
					>
						<ThemeSwitcher />
					</DropdownItem>
					<DropdownItem
						closeOnSelect={true}
						onPress={() => {
							onOpen();
						}}
						aria-label={t('account.contacts')}
					>
						{t('account.contacts')}
					</DropdownItem>
				</DropdownSection>

				<DropdownSection className="mb-0">
					<DropdownItem
						aria-label={t('account.logout')}
						color="danger"
						className="text-danger"
						endContent={<Icon name="LogOut" size={16} />}
						closeOnSelect={true}
						onPress={() => {
							signOut();
							logout();
						}}
					>
						{t('account.logout')}
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
};
