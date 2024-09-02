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
import { useCurrentUser } from '@/hooks/useCurrentUser';

import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Account: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const router = useRouter();
	const t = useTranslations();
	const { user } = useCurrentUser();
	const { onOpen } = useContactsModal();

	if (!user) return null;

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
		>
			<DropdownTrigger>
				<UserAvatar
					avatarName={user.avatarName}
					avatarColor={user.avatarColor}
					size="sm"
					as="button"
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label={t('account.profile')}>
				<DropdownSection showDivider>
					<DropdownItem isReadOnly textValue={user.name} className="cursor-default">
						<User
							name={user.name}
							description={user.email}
							avatarProps={{
								name: user.avatarName,
								classNames: {
									base: `${colorVariants[user.avatarColor]}`,
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
							onPress={() => {
								router.push(value);
							}}
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
						onPress={() => {
							router.push(ROUTES.PROFILE);
						}}
						aria-label={t('account.profile')}
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
						}}
					>
						{t('account.logout')}
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
};
