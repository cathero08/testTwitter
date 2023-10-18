import jwt from 'jsonwebtoken';

// 回傳一個防問令牌(塞userId進去)
const generateAccessToken = (user: any) => {
	const config = useRuntimeConfig();

	return jwt.sign({ userId: user.id }, config.jwtAccessSecret, { expiresIn: '10m' });
};

// 回傳一個刷新令牌(塞userId進去)
const generateRefreshToken = (user: any) => {
	const config = useRuntimeConfig();

	return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, { expiresIn: '4h' });
};

// 驗證刷新令牌
export const decodeRefreshToken = (token: string) => {
	const config = useRuntimeConfig();
	try {
		return jwt.verify(token, config.jwtRefreshSecret);
	} catch (err) {
		return undefined;
	}
};

// 驗證訪問令牌
export const decodeAccessToken = (token: string) => {
	const config = useRuntimeConfig();
	try {
		return jwt.verify(token, config.jwtAccessSecret);
	} catch (err) {
		return undefined;
	}
};

// 製作一個令牌
export const generateTokens = (user: any) => {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	return {
		accessToken: accessToken,
		refreshToken: refreshToken,
	};
};

// 刷新令牌寫進cookie
export const sendRefreshToken = (event: any, token: any) => {
	setCookie(event, 'refresh_token', token, {
		httpOnly: true,
		sameSite: true,
	});
};
/**
 * httpOnly: true：這表示該 Cookie 將被設置為 HTTP Only，這意味著它無法透過客戶端的 JavaScript 來訪問，增加了安全性。
 * sameSite: true：這表示該 Cookie 的 SameSite 屬性被設置為 "SameSite"，以增加對 CSRF 攻擊的保護。它防止 Cookie 在跨站點請求中被附加。
 */
