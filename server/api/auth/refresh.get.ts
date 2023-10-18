import { getRefreshTokenByToken } from '~/server/db/refreshTokens';
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt';
import { getUserById } from '~/server/db/users';
import type { JwtPayload } from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
	// 解析事件中的 cookies
	const cookies = parseCookies(event);

	const refreshToken = cookies.refresh_token;

	// 如果未找到刷新令牌，返回未授權錯誤
	if (!refreshToken) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Refresh token is invalid',
			})
		);
	}

	// 使用刷新令牌查找相對應的刷新令牌
	const rToken = await getRefreshTokenByToken(refreshToken);
	// 如果未找到刷新令牌，返回未授權錯誤
	if (!rToken) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Refresh token is invalid',
			})
		);
	}

	interface rToken {
		userId: string;
	}
	// 解碼刷新令牌
	const token = decodeRefreshToken(refreshToken) as (JwtPayload & rToken) | undefined;

	// 解碼錯誤
	if (!token) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Refresh token is invalid',
			})
		);
	}

	try {
		// 使用使用者ID查找相應的使用者數據
		const user = await getUserById(token?.userId);
		// 生成新的訪問令牌
		const { accessToken } = generateTokens(user);
		// 返回新的訪問令牌
		return { access_token: accessToken };
	} catch (error) {
		// 如果發生錯誤，返回服務器錯誤
		return sendError(
			event,
			createError({
				statusCode: 500,
				statusMessage: 'Something went wrong',
			})
		);
	}
});
