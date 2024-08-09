import { API_ROUTES } from '@/configs/apiRoutes.config';
import {
	ChangePassForm,
	ForgotPassRequest,
	GoogleAuth,
	LoginForm,
	RegisterForm,
	ResetPassForm,
	Tokens,
} from '@/interfaces/auth.interface';
import { apiRequestAuth } from '@/utils/api/apiRequesAuth';
import { apiRequest } from '@/utils/api/apiRequest';

export const authService = {
	async register(dto: RegisterForm): Promise<void> {
		return await apiRequestAuth({
			method: 'POST',
			url: API_ROUTES.auth.register,
			data: dto,
		});
	},

	async login(dto: LoginForm): Promise<Tokens> {
		return await apiRequestAuth({
			method: 'POST',
			url: API_ROUTES.auth.login,
			data: dto,
		});
	},

	async google(dto: GoogleAuth): Promise<Tokens> {
		return await apiRequestAuth({
			method: 'POST',
			url: API_ROUTES.auth.google,
			data: dto,
		});
	},

	async passChange(dto: ChangePassForm): Promise<{ message: string }> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.auth.passChange,
			data: dto,
		});
	},

	async passRequest(dto: ForgotPassRequest): Promise<{ message: string }> {
		return await apiRequestAuth({
			method: 'PATCH',
			url: API_ROUTES.auth.passRequest,
			data: dto,
		});
	},

	async passReset(dto: ResetPassForm): Promise<{ message: string }> {
		return await apiRequestAuth({
			method: 'PATCH',
			url: API_ROUTES.auth.passReset,
			data: dto,
		});
	},
};
