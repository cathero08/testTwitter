import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '~/server/utils/jwt';
import { getUserById } from '../db/users';

export default defineEventHandler(async (event) => {
	// 定義需要處理的端點
	const endpoints = ['/api/auth/user', '/api/user/tweets', '/api/user/tweets/:id', '/api/user/profileimage'];

	// 檢查是否由此中間件處理
	const isHandledByThisMiddleware = endpoints.some((endpoint) => {
		// 使用UrlPattern來創建端點的URL模式
		const pattern = new UrlPattern(endpoint);

		// 檢查當前請求的URL是否與模式匹配
		return pattern.match(event.node.req.url || '');
	});

	// 如果不是由此中間件處理，則直接返回
	if (!isHandledByThisMiddleware) {
		return;
	}

	// 從請求頭中獲取授權令牌
	const token = event.node.req.headers['authorization']?.split(' ')[1];

	// 解碼授權令牌
	const decoded = decodeAccessToken(token ?? '');

	// 如果未解碼，返回未授權錯誤
	if (!decoded) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Unauthorized',
			})
		);
	}

	interface rToken {
		userId: string;
	}
	try {
		// 從解碼後的令牌中獲取使用者ID
		const userId = (decoded as rToken).userId;

		// 使用使用者ID獲取使用者信息
		const user = await getUserById(userId);

		// 將使用者信息添加到事件上下文中
		event.context.auth = { user };
	} catch (error) {
		return error;
	}
});
