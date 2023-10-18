import { deleteRefreshTokenByToken } from '~/server/db/refreshTokens';

export default defineEventHandler(async (event) => {
	try {
		const cookie = parseCookies(event);
		const refreshToken = cookie.refresh_token;
		await deleteRefreshTokenByToken(refreshToken);
	} catch (error) {
		console.log(error);
	}
	sendRefreshToken(event, null);

	return {
		message: 'Done',
	};
});
