'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Card, CardBody, CardProps, Tooltip } from '@nextui-org/react';

export const CreateBoardButton: React.FC<Partial<CardProps>> = ({ ...props }) => {
	const t = useTranslations();

	return (
		<Card
			shadow="none"
			radius="md"
			isPressable
			{...props}
			classNames={{
				base: clsx(`h-28 bg-default-200 hover:opacity-80 hover:text-primary `),
				body: 'flex items0center justify-center text-sm text-center',
			}}
		>
			<Tooltip
				isDisabled={!props.isDisabled}
				content={t('board.open_admin')}
				offset={-60}
				className="text-tiny max-w-40"
			>
				<CardBody>
					<span>{t('board.create')}</span>
				</CardBody>
			</Tooltip>
		</Card>
	);
};
