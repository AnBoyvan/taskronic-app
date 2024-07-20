import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ContainerProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	padding?: number;
	gap?: number;
}

export const Container: React.FC<ContainerProps> = ({
	children,
	gap,
	className,
	padding,
	...props
}) => {
	const getGap = gap ? gap : 4;
	const getPadding = padding ? padding : 4;

	return (
		<div
			className={clsx(`flex flex-col gap-${getGap} p-${getPadding} w-full`, className)}
			{...props}
		>
			{children}
		</div>
	);
};
