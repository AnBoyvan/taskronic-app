'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Link, Spinner } from '@nextui-org/react';

import type { Basic } from 'unsplash-js/dist/methods/photos/types';

import { Icon } from '@/components/ui/Icon';
import { useUnsplashImages } from '@/hooks/useUnsplasImages';

interface UnsplashImagesProps {
	current?: string;
	setCurrent: (value: UnsplashImage) => void;
}

export interface UnsplashImage extends Basic {}

export const UnsplashImages: React.FC<UnsplashImagesProps> = ({ current, setCurrent }) => {
	const t = useTranslations();
	const { ref, inView } = useInView();

	const { images, fetchImages } = useUnsplashImages();

	useEffect(() => {
		if (inView) fetchImages();
	}, [inView, fetchImages]);

	return (
		<div className="flex flex-col gap-2 h-full overflow-hidden">
			<div className="flex flex-row justify-center text-sm text-center">
				<p>{t('common.photos')}:&nbsp;</p>
				<Link
					href="https://unsplash.com/?utm_source=taskronic&utm_medium=referral"
					underline="hover"
					color="primary"
					size="sm"
					target="_blank"
				>
					Unsplash
				</Link>
			</div>
			<div className="grid grid-cols-3 p-0 pb-1 gap-1 overflow-y-auto">
				{images.map(image => (
					<div
						key={image.id}
						className={clsx(
							'cursor-pointer relative rounded-md aspect-video group hover:opacity-70 transition ',
							image.id === current && 'opacity-70',
							image.urls.full === current && 'opacity-70',
						)}
						onClick={() => setCurrent(image)}
					>
						{(image.id === current || image.urls.full === current) && (
							<Icon
								name="Check"
								size={24}
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary"
							/>
						)}
						<Link
							underline="hover"
							href={image.links.html}
							target="_blank"
							className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 p-0.5 text-[10px] truncate text-white bg-black/50"
						>
							{image.user.name}
						</Link>
						<Image
							src={image.urls.thumb}
							alt={image.alt_description || 'Unsplash image'}
							className="object-cover rounded-md -z-10"
							sizes="96px"
							fill
						/>
					</div>
				))}
				<div ref={ref}></div>
				{inView && <Spinner size="sm" color="primary" className="mx-auto" />}
			</div>
		</div>
	);
};
