import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface PageContainerProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	smallPadding?: boolean;
	scroll?: boolean;
	title?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
	children,
	className,
	smallPadding,
	scroll,
	title,
	...props
}) => {
	return (
		<div
			className={clsx(
				'w-full flex flex-col ',
				scroll ? 'overflow-auto' : '',
				smallPadding ? 'p-2' : 'p-4 lg:p-8',
				className ? className : '',
			)}
			{...props}
		>
			{title && <h1 className="self-start text-xl font-medium">{title}</h1>}
			{children}
		</div>
	);
};
