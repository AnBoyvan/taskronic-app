'use client';

import { useTranslations } from 'next-intl';

import { ReactNode, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

type RemoveTaskPopoverProps = {
	trigger: ReactNode;
	onRemove: () => void;
	canRemove?: boolean;
};

export const RemoveTaskPopover: React.FC<RemoveTaskPopoverProps> = ({
	trigger,
	onRemove,
	canRemove,
}) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Popover
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			offset={0}
			isTriggerDisabled={!canRemove}
			radius="md"
		>
			<PopoverTrigger>{trigger}</PopoverTrigger>

			<PopoverContent className="p-2 w-64 flex flex-col gap-2">
				<p className="text-sm text-center">{t('task.remove_warn')}</p>
				<Button
					variant="solid"
					color="danger"
					size="md"
					radius="sm"
					onPress={() => {
						onRemove();
						setIsOpen(false);
					}}
					fullWidth
				>
					{t('task.remove')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
