import type { User } from '~/server/api/auth/user.get';
import jwt_decode from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';

export default () => {
	// 定義用於獲取和設置身份驗證令牌的鉤子
	const useAuthToken = () => useState('auth_token');
	// 定義用於獲取和設置身份驗證使用者信息的鉤子
	const useAuthUser = () => useState('auth_user');
	// 打API 頁面loading
	const useAuthLoading = () => useState('auth_loading', () => true);

	// 函數：設置新的身份驗證令牌
	const setToken = (newToken: string) => {
		const authToken = useAuthToken();
		authToken.value = newToken;
	};
	// 函數：設置新的身份驗證使用者信息
	const setUser = (newUser: any) => {
		const authUser = useAuthUser();
		authUser.value = newUser;
	};
	// 函數：設置頁面loading
	const setIsAuthLoading = (value: boolean) => {
		const authLoading = useAuthLoading();
		authLoading.value = value;
	};

	// 函數：執行登錄操作
	const login = ({ username, password }: { username: string; password: string }) => {
		return new Promise(async (reslove, reject) => {
			try {
				// 向服務器發送POST請求以進行身份驗證;
				const data = await $fetch('/api/auth/login', {
					method: 'POST',
					body: {
						username,
						password,
					},
				});
				setToken(data.access_token);
				setUser(data.user);
				reslove(true);
			} catch (err) {
				reject(err);
			}
		});
	};

	// 刷新令牌
	const refreshToken = () => {
		return new Promise(async (reslove, reject) => {
			try {
				const data = await $fetch('/api/auth/refresh');
				setToken(data.access_token);
				reslove(true);
			} catch (err) {
				reject(err);
			}
		});
	};

	const getUser = () => {
		return new Promise(async (reslove, reject) => {
			try {
				const data = (await useFetchApi('/api/auth/user')) as { user: User };
				setUser(data.user);
				reslove(true);
			} catch (err) {
				reject(err);
			}
		});
	};

	// 訪問令牌過期前觸發重新刷新
	const refreshAccessToken = () => {
		const authToken = useAuthToken();

		if (!authToken.value) return;

		const jwt: JwtPayload = jwt_decode(authToken.value as string);

		if (jwt.exp === undefined) return;
		const newRefreshTime = jwt.exp - 60000;

		// 在新的令牌刷新时间后执行刷新令牌操作
		setTimeout(() => {
			// 调用刷新令牌函数
			refreshToken();
			// 递归调用 refreshAccessToken 函数，以在下一次令牌过期前再次触发刷新
			refreshAccessToken();
		}, newRefreshTime);
	};

	// 登入驗證
	const initAuth = () => {
		return new Promise(async (reslove, reject) => {
			setIsAuthLoading(true);
			try {
				await refreshToken();
				await getUser();
				refreshAccessToken();

				reslove(true);
			} catch (err) {
				reject(err);
			} finally {
				setIsAuthLoading(false);
			}
		});
	};

	const postRegister = (data: any) => {
		return new Promise(async (resolve, reject) => {
			try {
				await $fetch('/api/auth/register', {
					method: 'POST',
					body: {
						username: data.username,
						password: data.password,
						repeatPassword: data.repeatPassword,
						email: data.email,
						name: data.name,
					},
				});
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	const logout = () => {
		return new Promise(async (resolve, reject) => {
			try {
				await useFetchApi('/api/auth/logout', {
					method: 'POST',
				});

				setToken('');
				setUser(null);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	return { login, useAuthToken, useAuthUser, useAuthLoading, initAuth, logout, postRegister, getUser };
};
