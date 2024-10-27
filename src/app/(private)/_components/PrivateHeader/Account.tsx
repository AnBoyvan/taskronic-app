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
				base: 'overflow-hidden rounded-lg shadow-lg',
				content: 'overflow-y-auto',
			}}
			radius="md"
		>
			<DropdownTrigger>
				<UserAvatar avatarName={initials} avatarColor={avatar} size="sm" as="button" />
			</DropdownTrigger>
			<DropdownMenu aria-label={t('user.profile')} className="max-h-[calc(100vh_-_6rem)] p-1">
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
					<DropdownItem aria-label={t('theme.label')} isReadOnly className="p-0">
						<WorkspaceSwitcher
							variant="flat"
							classNames={{
								trigger: 'pl-2 pr-6 bg-transparent',
								innerWrapper: 'w-full',
								selectorIcon: 'right-2',
								label: 'px-2',
								popoverContent: 'p-0 rounded-lg',
								listbox: 'p-0',
							}}
							onWorkspaceChange={workspaceId => onWorkspaceSelect(workspaceId)}
						/>
					</DropdownItem>
				</DropdownSection>

				<DropdownSection showDivider>
					<DropdownItem href={ROUTES.PROFILE} aria-label={t('user.profile')} closeOnSelect={true}>
						{t('user.profile')}
					</DropdownItem>
					<DropdownItem
						aria-label={t('locale.label')}
						endContent={<Icon name="ChevronRight" size={16} />}
					>
						<LanguageSwitcher onAction={() => setIsOpen(false)} />
					</DropdownItem>
					<DropdownItem
						aria-label={t('theme.label')}
						endContent={<Icon name="ChevronRight" size={16} />}
					>
						<ThemeSwitcher onSelect={() => setIsOpen(false)} />
					</DropdownItem>
					<DropdownItem
						closeOnSelect={true}
						onPress={() => {
							setIsOpen(false);
							onOpen();
						}}
						aria-label={t('user.contacts')}
					>
						{t('user.contacts')}
					</DropdownItem>
				</DropdownSection>

				<DropdownSection className="mb-0">
					<DropdownItem
						aria-label={t('auth.logout')}
						color="danger"
						className="text-danger"
						endContent={<Icon name="LogOut" size={16} />}
						closeOnSelect={true}
						onPress={() => {
							setIsOpen(false);
							signOut();
							logout();
						}}
					>
						{t('auth.logout')}
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
};
