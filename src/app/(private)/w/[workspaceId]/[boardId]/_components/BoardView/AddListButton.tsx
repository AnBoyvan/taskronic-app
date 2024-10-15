'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';

import { AddListForm } from '../AddListForm';

type AddListButtonProps = {
	boardId: string;
};

export const AddListButton: React.FC<AddListButtonProps> = ({ boardId }) => {
	const t = useTranslations();

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const enableEditing = () => {
		setIsEditing(true);
	};

	return (
		<div className={`shrink-0 h-full mx-1.5 w-64 select-none`}>
			{isEditing ? (
				<AddListForm boardId={boardId} isOpen={isEditing} onClose={() => setIsEditing(false)} />
			) : (
				<Button
					size="lg"
					variant="flat"
					radius="sm"
					color="primary"
					className="bg-transparent bg-background text-sm justify-start p-2"
					startContent={<Icon name="Plus" size={16} />}
					fullWidth
					onPress={enableEditing}
				>
					{t('board.add_list')}
				</Button>
			)}
		</div>
	);
};
