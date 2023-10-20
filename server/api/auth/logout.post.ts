import { deleteRefreshTokenByToken } from '~/server/db/refreshTokens';

export default defineEventHandler(async (event) => {
	try {
		const cookie = parseCookies(event);
		const refreshToken = cookie.refresh_token;
		await deleteRefreshTokenByToken(refreshToken);
	} catch (error) {
		sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'deleteRefreshTokenByToken is wrong',
			})
		);
	}
	sendRefreshToken(event, null);

	return {
		message: 'Done',
	};
});
