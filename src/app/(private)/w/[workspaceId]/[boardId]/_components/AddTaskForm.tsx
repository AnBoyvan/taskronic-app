'use client';

import { useTranslations } from 'next-intl';

import { ElementRef, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';

import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { useValidation } from '@/hooks/useValidation';
import { List } from '@/types/board.interface';
import { TaskCreate } from '@/types/tasks.interface';

type AddTaskFormProps = {
	boardId: string;
	listId?: string;
	lists?: List[];
	isOpen: boolean;
	onClose: () => void;
	showTitle?: boolean;
};

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
	boardId,
	listId,
	isOpen,
	onClose,
	lists,
	showTitle,
}) => {
	const t = useTranslations();
	const { taskCreateSchema } = useValidation();
	const { create } = useTasksEdit();

	const formRef = useRef<ElementRef<'form'>>(null);
	const textareaRef = useRef<ElementRef<'textarea'>>(null);

	const {
		register,
		watch,
		handleSubmit,
		reset,
		setValue,
		formState: { isDirty, isValid },
	} = useForm<TaskCreate>({
		mode: 'onBlur',
		defaultValues: {
			title: '',
			list: listId,
		},

		resolver: yupResolver(taskCreateSchema),
	});

	const onSubmit: SubmitHandler<TaskCreate> = data => {
		create.mutate({
			boardId,
			data,
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
				textareaRef.current?.focus();
			});
		}
	}, [isOpen]);

	useEffect(() => {
		if (create.isSuccess) {
			disableEditing();
		}
	}, [create.isSuccess]);

	return (
		<form
			ref={formRef}
			className="flex flex-col p-2 w-full rounded-lg bg-background gap-y-2 shadow-md"
			onSubmit={handleSubmit(onSubmit)}
		>
			{showTitle && <div className="text-center">{t('task.new')}</div>}
			{lists && (
				<Select
					{...register('list')}
					variant="bordered"
					placeholder={t('board.list_select')}
					label={t('common.list')}
					labelPlacement="outside"
					isRequired
					radius="sm"
					classNames={{
						base: 'text-sm data-[has-label=true]:mt-4',
						label: 'text-tiny top-2/3',
						popoverContent: 'rounded-lg',
					}}
				>
					{lists.map(list => (
						<SelectItem key={list._id} className={`${list.bgColor} ${list.textColor}`}>
							{list.label}
						</SelectItem>
					))}
				</Select>
			)}
			<Textarea
				{...register('title')}
				value={watch('title')}
				radius="sm"
				ref={textareaRef}
				variant="bordered"
				minRows={2}
				onValueChange={value => setValue('title', value)}
			/>

			<div className="flex items-center gap-2">
				<Button
					type="submit"
					isDisabled={create.isPending || !isDirty || !isValid}
					size="sm"
					variant="solid"
					color="primary"
				>
					{t('actions.add')}
				</Button>
				<Button type="button" isIconOnly variant="light" size="sm" onPress={disableEditing}>
					<Icon name="X" size={20} />
				</Button>
			</div>
		</form>
	);
};
