'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Divider } from '@nextui-org/react';

import { WorkspaceSwitcher } from '@/components/shared/WorkspaceSwitcher';
import { useBoardMenu } from '@/hooks/useBoardMenu';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';

type BoardMenuReopenProps = {
	boardId: string;
	workspaceId?: string;
};

export const BoardMenuReopen: React.FC<BoardMenuReopenProps> = ({ boardId, workspaceId }) => {
	const t = useTranslations();
	const { onClose, onOpen } = useBoardMenu();
	const { open } = useBoardsEdit();

	const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(workspaceId);

	const openBoard = () => {
		if (!selectedWorkspace) {
			return;
		}

		open.mutate({
			boardId,
			data: { workspaceId: selectedWorkspace },
		});
	};

	useEffect(() => {
		if (open.isSuccess) {
			onClose();
		}
	}, [open.isSuccess]);

	return (
		<div className="flex flex-col">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('board.reopen')}?
			</div>
			<Divider className="my-2" />
			<WorkspaceSwitcher
				variant="bordered"
				isRequired
				classNames={{
					base: 'text-sm',
					label: 'text-tiny top-2/3',
				}}
				mediumText
				canCreateBoard
				onWorkspaceChange={workspaceId => setSelectedWorkspace(workspaceId)}
			/>
			<div className="flex flex-row gap-4 mt-2">
				<Button
					fullWidth
					variant="bordered"
					color="default"
					onPress={() => onOpen('main')}
					isDisabled={open.isPending}
				>
					{t('common.back')}
				</Button>
				<Button
					fullWidth
					variant="solid"
					color="success"
					onPress={openBoard}
					spinnerPlacement="end"
					isLoading={open.isPending}
					isDisabled={open.isPending || !selectedWorkspace}
				>
					{t('common.open')}
				</Button>
			</div>
		</div>
	);
};
