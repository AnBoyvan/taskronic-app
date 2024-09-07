'use client';

import { useTranslations } from 'next-intl';

import { ElementRef, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { FormInput } from '@/components/ui/FormInput';
import { Icon } from '@/components/ui/Icon';
import { useLists } from '@/hooks/useLists';
import { useValidation } from '@/hooks/useValidation';

type AddListProps = {
	boardId: string;
	isOpen: boolean;
	onClose: () => void;
};

export const AddListForm: React.FC<AddListProps> = ({ boardId, isOpen, onClose }) => {
	const t = useTranslations();
	const { createlistSchema } = useValidation();
	const { addList } = useLists();

	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isValid },
	} = useForm<{ label: string }>({
		mode: 'onBlur',
		defaultValues: {
			label: '',
		},

		resolver: yupResolver(createlistSchema),
	});

	const onSubmit: SubmitHandler<{ label: string }> = ({ label }) => {
		addList.mutate({
			boardId,
			data: {
				label,
				bgColor: 'bg-background',
				textColor: 'text-foreground',
			},
		});
	};

	const disableEditing = () => {
		onClose();
		reset();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing();
		}
	};

	useEventListener('keydown', onKeyDown);
	useOnClickOutside(formRef, disableEditing);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				inputRef.current?.focus();
			});
		}
	}, [isOpen]);

	useEffect(() => {
		if (addList.isSuccess) {
			disableEditing();
		}
	}, [addList.isSuccess]);

	return (
		<form
			ref={formRef}
			className="p-2 rounded-lg bg-background space-y-2 shadow-md"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormInput
				control={control}
				size="sm"
				variant="bordered"
				name="label"
				ref={inputRef}
				placeholder={t('placeholder.list_title')}
				isDisabled={addList.isPending}
			/>
			<div className="flex items-center gap-2">
				<Button
					isDisabled={addList.isPending || !isDirty || !isValid}
					type="submit"
					size="sm"
					variant="solid"
					color="primary"
				>
					{t('common.add')}
				</Button>
				<Button type="button" isIconOnly variant="light" size="sm" onPress={disableEditing}>
					<Icon name="X" size={20} />
				</Button>
			</div>
		</form>
	);
};
