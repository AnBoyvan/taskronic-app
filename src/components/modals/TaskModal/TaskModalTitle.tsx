'use client';

import { ElementRef, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Textarea } from '@nextui-org/react';

import { useTasksEdit } from '@/hooks/useTasksEdit';

type TaskModalTitleProps = {
	taskId: string;
	title: string;
	canEdit?: boolean;
};

export const TaskModalTitle: React.FC<TaskModalTitleProps> = ({ taskId, title, canEdit }) => {
	const { updGeneral } = useTasksEdit();

	const [taskTitle, setTaskTitle] = useState<string>(title);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const formRef = useRef<ElementRef<'form'>>(null);
	const textareaRef = useRef<ElementRef<'textarea'>>(null);

	const { register, watch, setValue, handleSubmit } = useForm<{ value: string }>({
		mode: 'onBlur',
		defaultValues: {
			value: title,
		},
	});

	const enableEditing = () => {
		if (!canEdit) {
			return;
		}

		setIsEditing(true);
		setTimeout(() => {
			textareaRef.current?.focus();
			textareaRef.current?.select();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const onBlur = () => {
		handleSubmit(onSubmit)();
	};

	const onSubmit: SubmitHandler<{ value: string }> = ({ value }) => {
		if (value === title) {
			return disableEditing();
		}

		updGeneral.mutate({
			taskId,
			data: {
				title: value,
			},
		});

		setTaskTitle(value);
		disableEditing();
	};

	return (
		<>
			{isEditing ? (
				<form ref={formRef} className="mr-8" onSubmit={handleSubmit(onSubmit)}>
					<Textarea
						{...register('value')}
						value={watch('value')}
						ref={textareaRef}
						variant="bordered"
						radius="sm"
						color="primary"
						minRows={1}
						onValueChange={value => setValue('value', value)}
						onBlur={onBlur}
						classNames={{
							base: 'min-h-10 -ml-2',
							inputWrapper: 'py-1 px-2 items-center',

							input: 'text-xl font-medium items-center',
						}}
					/>
					<button type="submit" hidden />
				</form>
			) : (
				<div
					onClick={enableEditing}
					className="flex items-center text-xl px-0 py-1 min-h-10 font-medium border-transparent border-2 mr-10"
				>
					{taskTitle}
				</div>
			)}
		</>
	);
};
