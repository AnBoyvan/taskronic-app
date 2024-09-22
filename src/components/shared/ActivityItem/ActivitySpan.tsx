import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ActivitySpanProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	medium?: boolean;
	active?: boolean;
}

export const ActivitySpan: React.FC<ActivitySpanProps> = ({
	children,
	className,
	medium,
	active,
	...props
}) => {
	return (
		<span
			className={clsx(
				'text-wrap break-words',
				medium && 'font-medium',
				active &&
					'text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer',
				className ? className : 'text-foreground',
			)}
			{...props}
		>
			{children}
		</span>
	);
};
