'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Card, CardBody, CardProps } from '@nextui-org/react';

export const CreateBoardButton: React.FC<Partial<CardProps>> = ({ ...props }) => {
	const t = useTranslations();

	return (
		<Card
			shadow="none"
			radius="md"
			isPressable
			{...props}
			classNames={{
				base: clsx(`h-28 bg-default-200 hover:opacity-80 hover:text-primary transition-colors`),
				body: 'flex items0center justify-center text-sm text-center',
			}}
		>
			<CardBody>
				<span>{t('board.create')}</span>
			</CardBody>
		</Card>
	);
};
