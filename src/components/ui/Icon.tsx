import { type LucideProps, icons } from 'lucide-react';

interface IconProps extends LucideProps {
	name: keyof typeof icons;
}

export const Icon: React.FC<IconProps> = ({ name, size, ...props }) => {
	const LucideIcon = icons[name];

	return <LucideIcon size={size ? size : 24} {...props} />;
};
