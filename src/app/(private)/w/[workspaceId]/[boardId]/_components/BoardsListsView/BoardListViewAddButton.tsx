'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';

import { AddList } from '../AddList';
import { ListWrapper } from './ListWrapper';

type ListProps = {
	boardId: string;
};

export const BoardListViewAddButton: React.FC<ListProps> = ({ boardId }) => {
	const t = useTranslations();
	// const { createlistSchema } = useValidation();
	// const { addList } = useLists();

	const [isEditing, setIsEditing] = useState<boolean>(false);
	// const formRef = useRef<ElementRef<'form'>>(null);
	// const inputRef = useRef<ElementRef<'input'>>(null);

	// const { control, handleSubmit, reset } = useForm<CreateListDto>({
	// 	mode: 'onBlur',
	// 	defaultValues: {
	// 		label: '',
	// 		bgColor: listColors.default.color,
	// 		textColor: listColors.default.text,
	// 	},

	// 	resolver: yupResolver(createlistSchema),
	// });

	// const onSubmit: SubmitHandler<CreateListDto> = data => {
	// 	addList.mutate({ boardId, data });
	// };

	const enableEditing = () => {
		setIsEditing(true);
		// setTimeout(() => {
		// 	inputRef.current?.focus();
		// });
	};

	// const disableEditing = () => {
	// 	setIsEditing(false);
	// 	reset();
	// };

	// const onKeyDown = (e: KeyboardEvent) => {
	// 	if (e.key === 'Escape') {
	// 		disableEditing();
	// 	}
	// };

	// useEventListener('keydown', onKeyDown);
	// useOnClickOutside(formRef, disableEditing);

	// useEffect(() => {
	// 	if (addList.isSuccess) {
	// 		disableEditing();
	// 	}
	// }, [addList.isSuccess]);

	return (
		<ListWrapper>
			{isEditing ? (
				<AddList boardId={boardId} isOpen={isEditing} onClose={() => setIsEditing(false)} />
			) : (
				// <form
				// 	ref={formRef}
				// 	className="p-2 rounded-lg bg-background space-y-2 shadow-md"
				// 	onSubmit={handleSubmit(onSubmit)}
				// >
				// 	<FormInput
				// 		control={control}
				// 		size="sm"
				// 		variant="bordered"
				// 		name="label"
				// 		ref={inputRef}
				// 		placeholder={t('placeholder.list_title')}
				// 		disabled={addList.isPending}
				// 	/>
				// 	<div className="flex items-center gap-2">
				// 		<Button type="submit" size="sm" variant="solid" color="primary">
				// 			{t('common.add')}
				// 		</Button>
				// 		<Button type="button" isIconOnly variant="light" size="sm" onPress={disableEditing}>
				// 			<Icon name="X" size={20} />
				// 		</Button>
				// 	</div>
				// </form>
				<Button
					size="md"
					variant="flat"
					radius="sm"
					color="primary"
					className="bg-background justify-start"
					startContent={<Icon name="Plus" size={16} />}
					fullWidth
					onPress={enableEditing}
				>
					{t('board.add_list')}
				</Button>
			)}
		</ListWrapper>
	);
};
