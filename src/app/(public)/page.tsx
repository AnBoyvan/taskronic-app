import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';

import heroimage from '../../../public/images/hero-image.png';

export default function HomePage() {
	const t = useTranslations();

	return (
		<section className="w-full flex flex-col justify-center py-20 lg:py-auto min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-500 to-blue-200 overflow-clip">
			<div className="flex flex-col lg:flex-row gap-8 self-center items-center px-4">
				<div className="flex flex-col gap-3 w-full max-w-[450px]">
					<h1 className="text-4xl md:text-6xl">{t('page.home.boost')}</h1>
					<p>{t('page.home.description')}</p>
					<Button
						as={Link}
						href={`${ROUTES.AUTH}`}
						color="primary"
						variant="solid"
						size="lg"
						endContent={<Icon name="MoveRight" />}
					>
						{t('button.lets_try_it')}
					</Button>
				</div>
				<Image
					src={heroimage}
					alt="hero image"
					width={300}
					height={300}
					className="aspect-square object-contain"
				/>
			</div>
		</section>
	);
}
