'use client';

import { useState } from 'react';

import { Button, Checkbox, CheckboxGroup, Image } from '@nextui-org/react';

import { ImageDto } from '@/types/image.interface';
import { apiRequest } from '@/utils/api/apiRequest';

import { unsplash } from './unsplash';

export const Imagelist = () => {
	// const image = <Checkbox><Image src={ } width={300} height={200} /></Checkbox>;
	const [images, setImages] = useState<Array<Record<string, any>>>([]);
	const [selected, setSelected] = useState<string[]>([]);

	const onFetchClick = async () => {
		try {
			const result = await unsplash.photos.getRandom({
				collectionIds: ['317099'],
				count: 24,
			});

			if (result && result.response) {
				const imgs = result.response as Array<Record<string, any>>;
				setImages(imgs);
			}
		} catch (error) {
			console.log(error);
			setImages([]);
		}
	};

	const onSendClick = async () => {
		const send: ImageDto[] = [];
		const filtered = images
			.filter((img: any) => selected.includes(img.id))
			.map(i => {
				return {
					usplashId: i.id,
					author: i.user.name,
					link: i.links.html,
					thumb: i.urls.thumb,
					full: i.urls.full,
				};
			});

		await apiRequest({
			method: 'POST',
			url: '/images/add',
			data: filtered,
		});

		// console.log(filtered);
	};

	// console.log({ images, selected });

	return (
		<div className="w-full flex flex-col gap-8 overflow-auto">
			<div className="w-full flex flex-row gap-8">
				<Button variant="solid" color="primary" onPress={onFetchClick}>
					FETCH
				</Button>
				<Button variant="solid" color="success" onPress={onSendClick}>
					SEND
				</Button>
			</div>
			<CheckboxGroup
				value={selected}
				onValueChange={setSelected}
				className="flex flex-row flex-wrap w-full"
				orientation="horizontal"
			>
				{images.map((img: any) => (
					<Checkbox key={img.id} value={img.id}>
						<Image src={img.urls.thumb} width={300} height={200} />
					</Checkbox>
				))}
			</CheckboxGroup>
		</div>
	);
};
