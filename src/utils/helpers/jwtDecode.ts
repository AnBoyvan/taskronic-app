import { JWT } from 'next-auth/jwt';

import jwt from 'jsonwebtoken';

import { ENV } from '@/configs/env.config';
import { Token, jwtPayload } from '@/types/auth.interface';

const JWT_SECRET = ENV.authSecret;

export const jwtDecode = (tokens: Token): JWT => {
	const { iat, ...rest } = jwt.verify(tokens.accessToken, JWT_SECRET) as jwtPayload;

	return {
		user: { ...rest },
		accessToken: tokens.accessToken,
	};
};
