import { toast } from 'sonner';
import { create } from 'zustand';

import { UnsplashImage } from '@/components/shared/UnsplashImages';
import { defaultImages } from '@/constants/default-images.constants';
import { unsplash } from '@/utils/api/unsplash';

type UnsplashImagesStore = {
	images: UnsplashImage[];
	setImages: (images: UnsplashImage[]) => void;
	fetchImages: () => Promise<void>;
};

export const useUnsplashImages = create<UnsplashImagesStore>((set, get) => ({
	images: [],
	setImages: (images: UnsplashImage[]) => set({ images: [...get().images, ...images] }),
	fetchImages: async () => {
		try {
			const result = await unsplash.photos.getRandom({
				collectionIds: ['317099'],
				count: 24,
			});

			if (result && result.response) {
				const data = result.response as UnsplashImage[];
				set({ images: [...get().images, ...data] });
			}
		} catch (error: any) {
			toast.error(error.message, { closeButton: false });
			set({ images: defaultImages });
		}
	},
}));
