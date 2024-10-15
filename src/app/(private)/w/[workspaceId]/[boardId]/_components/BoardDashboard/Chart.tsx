import { ReactNode } from 'react';

import { Card, CardBody, CardHeader } from '@nextui-org/react';

type ChartProps = {
	children: ReactNode;
	title: string;
};

export const Chart: React.FC<ChartProps> = ({ children, title }) => {
	return (
		<Card shadow="md" className="bg-background aspect-video gap-4 p-4">
			<CardHeader className="p-0 text-sm justify-center font-medium">{title}</CardHeader>
			<CardBody className="p-0 justify-center">{children}</CardBody>
		</Card>
	);
};
