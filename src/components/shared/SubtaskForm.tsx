'use client';

import { useTranslations } from 'next-intl';

import { ElementRef, ReactNode, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Textarea } from '@nextui-org/react';

import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';

type SubtaskFormProps = {
	label?: string;
	isEditing?: boolean;
	onAccept: (label: string) => void;
	onReject: () => void;
	actions?: ReactNode;
};

export const SubtaskFormForm: React.FC<SubtaskFormProps> = ({
	label,
	isEditing,
	onAccept,
	onReject,
	actions,
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
	} = useForm<{ value: string }>({
		mode: 'onBlur',
		defaultValues: {
			value: label || '',
		},
	});

	const onSubmit: SubmitHandler<{ value: string }> = ({ value }) => {
		onAccept(value);
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
		<form ref={formRef} className="w-full p-2 space-y-2" onSubmit={handleSubmit(onSubmit)}>
			<Textarea
				{...register('value')}
				value={watch('value')}
				variant="bordered"
				minRows={2}
				onValueChange={value => setValue('value', value)}
			/>

			<div className="flex items-center gap-2">
				<Button
					type="submit"
					size="sm"
					variant="solid"
					color="primary"
					isDisabled={!isDirty || !isValid}
				>
					{t(isEditing ? 'common.save' : 'common.add')}
				</Button>
				<Button type="button" isIconOnly variant="light" size="sm" onPress={disableEditing}>
					<Icon name="X" size={20} />
				</Button>
				{actions}
			</div>
		</form>
	);
};
