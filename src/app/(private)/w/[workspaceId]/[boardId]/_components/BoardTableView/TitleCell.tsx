import { Button } from '@nextui-org/react';

import { useTaskModal } from '@/hooks/useTaskModal';

type TitleCellProps = {
	taskId: string;
	title: string;
};

export const TitleCell: React.FC<TitleCellProps> = ({ taskId, title }) => {
	const modal = useTaskModal();

	const openTaskModal = () => {
		modal.onOpen(taskId);
	};

	return (
		<Button
			fullWidth
			variant="light"
			radius="none"
			className="px-0 -ml-2 pl-2 h-full justify-start text-nowrap truncate"
			onPress={openTaskModal}
		>
			{title}
		</Button>
	);
};
