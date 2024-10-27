'use client';

import { useTranslations } from 'next-intl';

import { ElementRef, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Textarea } from '@nextui-org/react';

import { useEventListener, useOnClickOutside } from 'usehooks-ts';

type CommentFormProps = {
	current?: string;
	isEditing?: boolean;
	onAccept: (label: string) => void;
	onReject: () => void;
};

export const CommentForm: React.FC<CommentFormProps> = ({
	current,
	isEditing,
	onAccept,
	onReject,
}) => {
	const t = useTranslations();

	const formRef = useRef<ElementRef<'form'>>(null);

	const {
		register,
		watch,
		setValue,
		formState: { isDirty, isValid },
		handleSubmit,
		reset,
	} = useForm<{ comment: string }>({
		mode: 'onBlur',
		defaultValues: {
			comment: current || '',
		},
	});

	const onSubmit: SubmitHandler<{ comment: string }> = ({ comment }) => {
		onAccept(comment);
		reset();
	};
	const disableEditing = () => {
		onReject();
		reset();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing();
		}
	};

	useEventListener('keydown', onKeyDown);
	useOnClickOutside(formRef, disableEditing);

	return (
		<form ref={formRef} className="w-full mt-1 space-y-2" onSubmit={handleSubmit(onSubmit)}>
			<Textarea
				{...register('comment')}
				value={watch('comment')}
				variant="bordered"
				radius="sm"
				minRows={2}
				onValueChange={value => setValue('comment', value)}
			/>

			<div className="flex items-center gap-2">
				<Button
					type="submit"
					size="sm"
					variant="solid"
					color="primary"
					isDisabled={!isDirty || !isValid}
				>
					{t(isEditing ? 'actions.save' : 'actions.add')}
				</Button>
				<Button type="button" variant="light" size="sm" onPress={disableEditing}>
					{t('actions.cancel')}
				</Button>
			</div>
		</form>
	);
};
