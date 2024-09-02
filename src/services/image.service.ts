import { BackgroundImage } from '@/types/image.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const imageService = {
	async findImages(page: number, limit: number): Promise<BackgroundImage[]> {
		const pageQuery = page && `page=${page}`;
		const limitQuery = limit && `page=${limit}`;

		const query = (Boolean(page) || Boolean(limit)) && `?${pageQuery}&${limitQuery}`;

		return await apiRequest({
			method: 'GET',
			url: `/images/find/all${query}`,
		});
	},
};
