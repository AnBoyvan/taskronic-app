import { createApi } from 'unsplash-js';

import { ENV } from '@/configs/env.config';

export const unsplash = createApi({
	accessKey: ENV.unsplashAccessKey,
	fetch: fetch,
});
