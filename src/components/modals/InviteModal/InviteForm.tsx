'use client';

import { useTranslations } from 'next-intl';

import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { FormInput } from '@/components/ui/FormInput';
import { useValidation } from '@/hooks/useValidation';
import { Member } from '@/types/root.interface';

type InviteFormProps = {
	invitations: string[];
	addInvitation: (invitation: string) => void;
	members?: Member[];
};

export const InviteForm: React.FC<InviteFormProps> = ({ invitations, addInvitation, members }) => {
	const t = useTranslations();
	const { inviteSchema } = useValidation();

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isValid },
		setError,
	} = useForm<{ email: string }>({
		mode: 'onChange',
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(inviteSchema),
	});

	const onSubmit: SubmitHandler<{ email: string }> = ({ email }) => {
		const isMember = members?.some(member => member.email === email);
		const isAdded = invitations.some(inv => inv === email);

		if (isMember) {
			setError('email', { message: t('roles.already_member') });
			return;
		}

		if (isAdded) {
			setError('email', { message: t('validation.already_added') });
			return;
		}

		addInvitation(email);
		reset();
	};

	return (
		<form className="flex flex-row gap-2" onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				control={control}
				variant="bordered"
				name="email"
				icon="Mail"
				isClearable
				onClear={reset}
			/>
			<Button color={'primary'} variant="solid" type="submit" isDisabled={!isDirty || !isValid}>
				{t('common.add')}
			</Button>
		</form>
	);
};
