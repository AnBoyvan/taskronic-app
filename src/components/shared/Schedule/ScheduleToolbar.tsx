import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';

type ScheduleToolbarProps = {
	date: string;
	onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
};

export const ScheduleToolbar: React.FC<ScheduleToolbarProps> = ({ date, onNavigate }) => {
	return (
		<div className="flex gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
			<Button
				isIconOnly
				size="sm"
				color="default"
				variant="light"
				className="h-8 w-8 border border-divider"
				onPress={() => onNavigate('PREV')}
			>
				<Icon name="ChevronLeft" size={20} />
			</Button>
			<div className="flex gap-2 items-center border border-divider rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
				<Icon name="Calendar" size={16} className="min-w-4 min-h-4" />
				<p>{date}</p>
			</div>
			<Button
				isIconOnly
				size="sm"
				color="default"
				variant="light"
				className="h-8 w-8 border border-divider"
				onPress={() => onNavigate('NEXT')}
			>
				<Icon name="ChevronRight" size={20} />
			</Button>
		</div>
	);
};
