import { prisma } from './index';
import bcrypt from 'bcrypt';

// 創建一個新的使用者
export const createUser = (userData: any) => {
	// 將密碼使用 bcrypt 進行加密
	const finalUserData = {
		...userData,
		password: bcrypt.hashSync(userData.password, 10),
	};

	// 使用 Prisma 創建一個新的使用者
	return prisma.user.create({
		data: finalUserData,
	});
};

// 根據使用者名稱查找使用者
export const getUserByUsername = async (username: any) => {
	// 使用 Prisma 查找具有特定使用者名稱的使用者
	return prisma.user.findUnique({
		where: {
			username: username,
		},
	});
};

// 根據使用者ID查找使用者
export const getUserById = (userid: string | undefined) => {
	return prisma.user.findUnique({
		where: {
			id: userid,
		},
	});
};

// 根據使用ID更換圖片
export const updateUser = (userid: string | undefined, img: string | undefined) => {
	return prisma.user.update({
		where: {
			id: userid,
		},
		data: {
			profileImage: img,
		},
	});
};
