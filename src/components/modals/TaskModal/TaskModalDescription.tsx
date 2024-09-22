'use client';

import { useTranslations } from 'next-intl';

import { ElementRef, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Textarea } from '@nextui-org/react';

import { useTasksEdit } from '@/hooks/useTasksEdit';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { TaskModalSection } from './TaskModalSection';

type TaskModalDescriptionProps = {
	task: Task;
	permissions?: BoardPermissions;
};

export const TaskModalDescription: React.FC<TaskModalDescriptionProps> = ({
	task,
	permissions,
}) => {
	const t = useTranslations();
	const { updGeneral } = useTasksEdit();

	const [taskDescription, setTaskDescription] = useState<string>(task.description || '');
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const formRef = useRef<ElementRef<'form'>>(null);
	const textareaRef = useRef<ElementRef<'textarea'>>(null);

	const { register, watch, setValue, handleSubmit, reset } = useForm<{ value: string }>({
		mode: 'onBlur',
		defaultValues: {
			value: task.description,
		},
	});

	const enableEditing = () => {
		if (!permissions?.createTask) {
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
		reset();
	};

	const onSubmit: SubmitHandler<{ value: string }> = ({ value }) => {
		if (value === task.description) {
			return disableEditing();
		}

		updGeneral.mutate({
			taskId: task._id,
			data: {
				description: value,
			},
		});

		setTaskDescription(value);
		disableEditing();
	};

	return (
		<TaskModalSection
			icon="Text"
			title={t('common.description')}
			button={permissions?.createTask ? t('common.edit') : ''}
			action={() => setIsEditing(true)}
		>
			{isEditing ? (
				<form
					ref={formRef}
					className="w-full flex flex-col gap-2"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Textarea
						{...register('value')}
						value={watch('value')}
						ref={textareaRef}
						variant="bordered"
						color="primary"
						minRows={5}
						onValueChange={value => setValue('value', value)}
						classNames={{
							base: 'mt-2',
							inputWrapper: 'p-2',

							input: 'text-sm',
						}}
					/>
					<div className="flex flex-row gap-4">
						<Button
							type="submit"
							variant="solid"
							color="primary"
							size="sm"
							isLoading={updGeneral.isPending}
							isDisabled={updGeneral.isPending}
							spinnerPlacement="end"
						>
							{t('common.save')}
						</Button>
						<Button
							type="button"
							variant="light"
							color="default"
							size="sm"
							isDisabled={updGeneral.isPending}
							onPress={disableEditing}
						>
							{t('common.cancel')}
						</Button>
					</div>
				</form>
			) : (
				<div
					onClick={enableEditing}
					className={`w-full flex text-sm min-h-20 border-transparent border-2 bg-default-100 rounded-2xl mt-2 p-2`}
				>
					{taskDescription ? taskDescription : t('placeholder.task_descr')}
				</div>
			)}
		</TaskModalSection>
	);
};
