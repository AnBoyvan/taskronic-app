import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface InfoHtagProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	tag: 'h1' | 'h2' | 'h3' | 'h4';
	title: string;
}

export const InfoHtag: React.FC<InfoHtagProps> = ({ tag, title, className, ...props }) => {
	switch (tag) {
		case 'h1':
			return (
				<h1
					className={clsx('text-4xl leading-normal font-medium text-primary', className)}
					{...props}
				>
					{title}
				</h1>
			);
		case 'h2':
			return (
				<h2
					className={clsx('text-2xl leading-normal font-medium text-primary', className)}
					{...props}
				>
					{title}
				</h2>
			);
		case 'h3':
			return (
				<h3 className={clsx('text-xl  leading-normal text-primary', className)} {...props}>
					{title}
				</h3>
			);
		case 'h4':
			return (
				<h4 className={clsx('text-base  leading-normal italic text-primary', className)} {...props}>
					{title}
				</h4>
			);
		default:
			return <></>;
	}
};
