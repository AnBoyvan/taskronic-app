'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { WorkspaceSwitcher } from '@/components/shared/WorkspaceSwitcher';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';

type OpenBoardPopoverProps = {
	boardId: string;
	workspaceId?: string;
	onAction: (boardId: string) => void;
};

export const OpenBoardPopover: React.FC<OpenBoardPopoverProps> = ({
	boardId,
	workspaceId,
	onAction,
}) => {
	const t = useTranslations();
	const { open } = useBoardsEdit();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(workspaceId);

	const openBoard = () => {
		if (!selectedWorkspace) {
			return;
		}

		open.mutate({
			boardId,
			data: { workspaceId: selectedWorkspace },
		});

		setIsOpen(false);
		onAction(boardId);
	};

	useEffect(() => {
		if (open.isSuccess) {
			setIsOpen(false);
			onAction(boardId);
		}
	}, [open.isSuccess]);

	return (
		<Popover isOpen={isOpen} onOpenChange={open => setIsOpen(open)} placement="bottom" offset={0}>
			<PopoverTrigger>
				<Button size="sm" variant="solid" color="success">
					{t('common.open')}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-2 w-64 flex-col gap-2">
				{!workspaceId && (
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
				)}

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
			</PopoverContent>
		</Popover>
	);
};
