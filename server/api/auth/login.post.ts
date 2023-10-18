import { getUserByUsername } from '~/server/db/users';
import bcrypt from 'bcrypt';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt';
import { userTransformer } from '~/server/transformers/user';
import { createRefreshToken } from '~/server/db/refreshTokens';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { username, password } = body;

	// 沒送資料就回報錯誤
	if (!username || !password) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Invalid params',
			})
		);
	}

	// 確認用戶是否已註冊
	const user = await getUserByUsername(username);

	if (!user) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Username or Password is invalid',
			})
		);
	}
	// 比較是否正確
	const doesThePasswordMatch = await bcrypt.compare(password, user.password);

	if (!doesThePasswordMatch) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Username or Password is invalid',
			})
		);
	}
	// 生成token
	// Access token
	// refresh token
	const { accessToken, refreshToken } = generateTokens(user);

	// 寫進 database
	await createRefreshToken({
		token: refreshToken,
		userId: user.id,
	});

	// 新增http cookie
	sendRefreshToken(event, refreshToken);

	return {
		access_token: accessToken,
		user: userTransformer(user),
	};
});
