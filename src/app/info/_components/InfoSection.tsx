import clsx from 'clsx';
import { ReactNode } from 'react';

import { InfoHtag } from './InfoHtag';

interface InfoSectionProps {
	children?: ReactNode;
	title: string;
	htag?: 'h2' | 'h3' | 'h4';
	description: string;
	id?: string;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
	children,
	title,
	description,
	id,
	htag,
}) => {
	return (
		<div id={id} className="mt-4">
			<InfoHtag tag={htag ? htag : 'h3'} title={title} />
			<p className={clsx('leading-normal', htag === 'h2' && 'mt-4')}>{description}</p>
			{children}
		</div>
	);
};
