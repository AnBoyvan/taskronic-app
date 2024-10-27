'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import {
	Button,
	Chip,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Textarea,
} from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { ENV } from '@/configs/env.config';
import { Locale } from '@/configs/i18n.config';
import { ROUTES } from '@/configs/routes.config';
import { useInviteModal } from '@/hooks/useInviteModal';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';

import { InviteForm } from './InviteForm';
import { InviteLang } from './InviteLang';

export const InviteModal: React.FC = () => {
	const t = useTranslations();
	const { invite } = useWorkspaceMembers();

	const { workspace, invitations, isOpen, onClose, setInvitations } = useInviteModal(state => ({
		workspace: state.workspace,
		invitations: state.invitations,
		isOpen: state.isOpen,
		onClose: state.onClose,
		setInvitations: state.setInvitations,
	}));

	const [invitationLang, setInvitationLang] = useState<Locale>(t('locale.current') as Locale);
	const [invitationMessage, setInvitationMessage] = useState<string>('');

	const addInvitation = (email: string) => {
		setInvitations([...invitations, email]);
	};

	const removeInvitation = (email: string) => {
		const filtered = invitations.filter(i => i !== email);
		setInvitations(filtered);
	};

	const closeModal = () => {
		onClose();
		setInvitationLang(t('locale.current') as Locale);
		setInvitationMessage('');
	};

	const sendInvites = () => {
		if (!workspace) return;

		const invites = invitations.map(email => {
			return {
				email,
				invitation: invitationMessage,
				lang: invitationLang,
				link: `${ENV.baseUrl}${ROUTES.WORKSPACE}/${workspace._id}/invite`,
			};
		});

		invite.mutate({
			workspaceId: workspace._id,
			dto: invites,
		});
	};

	useEffect(() => {
		if (invite.isSuccess) {
			closeModal();
		}
	}, [invite.isSuccess]);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={closeModal}
			placement="center"
			closeButton
			backdrop="blur"
			radius="md"
		>
			<ModalContent className="flex-col justify-start p-2 gap-4">
				<ModalHeader className="justify-center py-0 px-6 text-center">
					{t('workspace.invite_title')}
				</ModalHeader>
				<ModalBody className="p-0">
					{workspace && (
						<WorkspaceBadge
							name={workspace?.name}
							avatarIcon={workspace.avatarIcon}
							avatarColor={workspace.avatarColor}
							mediumIcon
							mediumText
							className="mx-auto"
						/>
					)}

					<InviteForm
						invitations={invitations}
						addInvitation={email => addInvitation(email)}
						members={workspace?.members}
					/>
					{invitations.length > 0 && (
						<div className="flex flex-row flex-wrap gap-2">
							{invitations.map(email => (
								<Chip key={email} variant="bordered" onClose={() => removeInvitation(email)}>
									{email}
								</Chip>
							))}
						</div>
					)}
					<Textarea
						variant="bordered"
						radius="sm"
						placeholder={t('workspace.invite_message')}
						value={invitationMessage}
						onValueChange={value => setInvitationMessage(value)}
					/>
					<div className="flex flex-row gap-2">
						<InviteLang current={invitationLang} setLang={lang => setInvitationLang(lang)} />
						<Button
							variant="solid"
							color="primary"
							size="lg"
							radius="sm"
							onPress={sendInvites}
							startContent={<Icon name="MailCheck" size={20} />}
							fullWidth
							className="h-14"
							isDisabled={invitations.length < 1 || invite.isPending}
							isLoading={invite.isPending}
							spinnerPlacement="end"
						>
							{t('actions.invite')}
						</Button>
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
