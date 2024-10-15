import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface SectionProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	title?: string;
	noTopMargin?: boolean;
}

export const Section: React.FC<SectionProps> = ({
	children,
	className,
	title,
	noTopMargin,
	...props
}) => {
	return (
		<section
			className={clsx(noTopMargin ? '' : 'mt-4 lg:mt-8', className ? className : '')}
			{...props}
		>
			{title && <h2 className="self-start text-lg font-medium">{title}</h2>}
			{children}
		</section>
	);
};
