import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface PageContainerProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	smallPadding?: boolean;
	scroll?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
	children,
	className,
	smallPadding,
	scroll,
	...props
}) => {
	return (
		<div
			className={clsx(
				'w-full flex flex-col ',
				className ? className : '',
				scroll ? 'overflow-scroll' : '',
				smallPadding ? 'p-2' : 'px-4 lg:px-8',
			)}
			{...props}
		>
			{children}
		</div>
	);
};
