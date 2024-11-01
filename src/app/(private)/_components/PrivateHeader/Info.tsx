import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { infoNav } from '@/configs/nav.config';

export const Info: React.FC = () => {
	const t = useTranslations();

	return (
		<Popover shouldFlip placement="bottom" offset={0} shadow="lg" radius="sm" shouldCloseOnBlur>
			<PopoverTrigger>
				<Button
					isIconOnly
					size="sm"
					radius="full"
					variant="light"
					color="default"
					className="text-foreground"
				>
					<Icon name="Info" size={20} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 max-h-[400px] overflow-hidden justify-start">
				{infoNav.map(({ label, value }) => (
					<Link
						key={value}
						href={value}
						className="w-full p-2 text-foreground hover:bg-default hover:text-primary transition-all"
						target="_blank"
					>
						{t(label)}
					</Link>
				))}
			</PopoverContent>
		</Popover>
	);
};
