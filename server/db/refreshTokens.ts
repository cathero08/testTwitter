import { prisma } from './index';

// 寫進RefreshToken
export const createRefreshToken = (refreshToken: any) => {
	return prisma.refreshToken.create({
		data: refreshToken,
	});
};

// 搜尋RefreshToken
export const getRefreshTokenByToken = (token: string) => {
	return prisma.refreshToken.findUnique({
		where: {
			token: token,
		},
	});
};

// 刪除RefreshToken
export const deleteRefreshTokenByToken = (token: string) => {
	return prisma.refreshToken.delete({
		where: {
			token: token,
		},
	});
};
