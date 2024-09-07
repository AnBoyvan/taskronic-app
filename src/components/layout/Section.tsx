import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface SectionProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	title?: string;
	// rowDirection?: boolean;
	// flexItems?: 'start' | 'end' | 'center';
	// flexJustify?: 'start' | 'end' | 'between' | 'center';
	// fullWidth?: boolean;
	// gap?: number;
	noTopMargin?: boolean;
}

export const Section: React.FC<SectionProps> = ({
	children,
	className,
	title,
	// flexJustify,
	// flexItems,
	// rowDirection,
	// fullWidth,
	// gap,
	noTopMargin,
	...props
}) => {
	return (
		<section
			className={clsx(
				'flex',
				className ? className : '',
				noTopMargin ? '' : 'mt-4 lg:mt-8',
				// rowDirection ? 'flex-row' : 'flex-col',
				// flexJustify ? `justify-${flexJustify}` : '',
				// flexItems ? `items-${flexItems}` : '',
				// fullWidth ? 'w-full' : '',
				// gap ? `gap-${gap}` : '',
			)}
			{...props}
		>
			{title && <h2 className="self-start text-lg font-medium">{title}</h2>}
			{children}
		</section>
	);
};