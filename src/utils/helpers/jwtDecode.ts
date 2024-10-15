import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import jwt from 'jsonwebtoken';

import { ENV } from '@/configs/env.config';
import { jwtPayload } from '@/types/auth.interface';

const JWT_SECRET = ENV.authSecret;

export const jwtDecode = (data: User): JWT => {
	const { iat, ...rest } = jwt.verify(data.accessToken, JWT_SECRET) as jwtPayload;

	return {
		user: { ...rest },
		accessToken: data.accessToken,
	};
};
