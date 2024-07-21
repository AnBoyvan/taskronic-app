import { API_ROUTES } from '@/configs/apiRoutes.config';
import {
	GoogleAuth,
	IChangePassForm,
	IForgotPassRequest,
	ILoginForm,
	IRegisterForm,
	IResetPassForm,
	ITokens,
} from '@/interfaces/auth.interface';
import { apiRequestWithRefresh } from '@/utils/api/apiClientWithRefresh';
import { apiRequest } from '@/utils/api/apiRequest';

export const authService = {
	async register(dto: IRegisterForm): Promise<void> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.auth.register,
			data: dto,
		});
	},

	async login(dto: ILoginForm): Promise<ITokens> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.auth.login,
			data: dto,
		});
	},

	async google(dto: GoogleAuth): Promise<ITokens> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.auth.google,
			data: dto,
		});
	},

	async refresh(token: string): Promise<ITokens> {
		return await apiRequestWithRefresh({
			method: 'POST',
			url: API_ROUTES.auth.refresh,
			token: token,
		});
	},

	async logout(token: string): Promise<void> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.auth.logout,
			data: token,
		});
	},

	async globalLogout(): Promise<void> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.auth.globalLogout,
		});
	},

	async passChange(dto: IChangePassForm): Promise<{ message: string }> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.auth.passChange,
			data: dto,
		});
	},

	async passRequest(dto: IForgotPassRequest): Promise<{ message: string }> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.auth.passRequest,
			data: dto,
		});
	},

	async passReset(dto: IResetPassForm): Promise<{ message: string }> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.auth.passReset,
			data: dto,
		});
	},
};
