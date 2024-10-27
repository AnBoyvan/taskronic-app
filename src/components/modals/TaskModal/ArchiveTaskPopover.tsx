'use client';

import { useTranslations } from 'next-intl';

import { ReactNode, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

interface ArchiveTaskPopoverProps {
	trigger: ReactNode;
	isArchived?: boolean;
	onArchive: () => void;
	canArchive?: boolean;
}

export const ArchiveTaskPopover: React.FC<ArchiveTaskPopoverProps> = ({
	trigger,
	isArchived,
	onArchive,
	canArchive,
}) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Popover
			offset={0}
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			isTriggerDisabled={!canArchive}
		>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent className="p-2">
				<Button
					variant="faded"
					color={isArchived ? 'success' : 'danger'}
					onPress={() => {
						onArchive();
						setIsOpen(false);
					}}
				>
					{isArchived ? t('actions.restore') : t('actions.archive')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
