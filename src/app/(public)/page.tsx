import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { PageContainer } from '@/components/layout/PageContainer';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';

import heroimage from '../../../public/images/hero-image.png';

export default function HomePage() {
	const t = useTranslations();

	return (
		<PageContainer
			scroll
			className="flex flex-col lg:flex-row gap-8 self-center items-center lg:justify-center p-4"
		>
			<div className="flex flex-col gap-3 w-full max-w-[450px]">
				<h1 className="text-4xl md:text-6xl">{t('general.slogan')}</h1>
				<p>{t('general.description')}</p>
				<Button
					as={Link}
					href={`${ROUTES.REGISTER}`}
					color="primary"
					variant="solid"
					size="lg"
					radius="sm"
					endContent={<Icon name="MoveRight" />}
				>
					{t('auth.lets_try_it')}
				</Button>
			</div>
			<Image
				src={heroimage}
				alt="hero image"
				width={300}
				height={300}
				className="aspect-square object-contain"
			/>
		</PageContainer>
	);
}
