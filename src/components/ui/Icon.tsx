import { type LucideProps, icons } from 'lucide-react';

export type IconName = keyof typeof icons;
interface IconProps extends LucideProps {
	name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, size, ...props }) => {
	const LucideIcon = icons[name];

	return <LucideIcon size={size ? size : 24} {...props} />;
};
