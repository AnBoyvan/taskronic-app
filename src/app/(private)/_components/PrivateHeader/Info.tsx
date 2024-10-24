import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';

export const Info: React.FC = () => {
	return (
		<Button
			isIconOnly
			size="sm"
			radius="full"
			variant="light"
			color="default"
			className="text-foreground"
		>
			<Icon name="CircleHelp" size={20} />
		</Button>
	);
};
