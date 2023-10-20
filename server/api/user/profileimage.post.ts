import formidable, { Fields, Files } from 'formidable';
import { updateUser } from '~/server/db/users';

export default defineEventHandler(async (event) => {
	const form = formidable({});

	// 創建 Promise 以等待表單解析的完成
	const response: Promise<{ fields: Fields; files: Files }> = new Promise((resolve, reject) => {
		// 使用 formidable 解析來自事件的 HTTP 請求
		form.parse(event.node.req, (err, fields, files) => {
			if (err) {
				reject(err);
			}
			resolve({ fields, files });
		});
	});

	const { fields, files } = await response;

	// 從事件上下文中獲取用戶 ID
	const userId = event.context?.auth?.user?.id ?? null;

	// 創建一個 Promise 陣列來處理上傳的媒體文件
	const filePromise = Object.keys(files).map(async (key) => {
		const file = files[key]?.[0];

		// 上傳文件到 Cloudinary 並獲取 Cloudinary 資源信息
		const cloudinaryResource = await uploadToCloudinary(file?.filepath ?? '');

		// 創建媒體文件
		return updateUser(userId, cloudinaryResource.secure_url);
	});

	// 等待所有媒體文件上傳完成
	await Promise.all(filePromise);

	return {
		message: 'Done',
	};
});
