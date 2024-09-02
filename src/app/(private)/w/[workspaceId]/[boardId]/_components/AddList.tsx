'use client';

import { useTranslations } from 'next-intl';

import { ElementRef, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { FormInput } from '@/components/ui/FormInput';
import { Icon } from '@/components/ui/Icon';
import { listColors } from '@/constants/list-colors.constants';
import { useLists } from '@/hooks/useLists';
import { useValidation } from '@/hooks/useValidation';
import { CreateListDto } from '@/types/board.interface';

type ListProps = {
	boardId: string;
	isOpen: boolean;
	onClose: () => void;
};

export const AddList: React.FC<ListProps> = ({ boardId, isOpen, onClose }) => {
	const t = useTranslations();
	const { createlistSchema } = useValidation();
	const { addList } = useLists();

	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const { control, handleSubmit, reset } = useForm<CreateListDto>({
		mode: 'onBlur',
		defaultValues: {
			label: '',
			bgColor: listColors.default.color,
			textColor: listColors.default.text,
		},

		resolver: yupResolver(createlistSchema),
	});

	const onSubmit: SubmitHandler<CreateListDto> = data => {
		addList.mutate({ boardId, data });
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
				disabled={addList.isPending}
			/>
			<div className="flex items-center gap-2">
				<Button type="submit" size="sm" variant="solid" color="primary">
					{t('common.add')}
				</Button>
				<Button type="button" isIconOnly variant="light" size="sm" onPress={disableEditing}>
					<Icon name="X" size={20} />
				</Button>
			</div>
		</form>
	);
};
