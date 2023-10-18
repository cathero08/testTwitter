import formidable, { Fields, Files } from 'formidable';
import { createTweet } from '~/server/db/tweet';
import { createMediaFile } from '~/server/db/mediafiles';
import { tweetTransformer } from '~/server/transformers/tweet';
import { uploadToCloudinary } from '~/server/utils/cloudinary';

export default defineEventHandler(async (event) => {
	// 創建 formidable 表單解析器
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
	const userId = event.context?.auth?.user?.id;

	// 創建 tweetData 對象，包含文本和用戶 ID
	const tweetData = {
		text: fields?.text?.[0],
		authorId: userId,
	};

	const replyTo = fields.replyTo;
	if (replyTo && replyTo !== null && replyTo !== undefined) {
		tweetData.replyToId = replyTo?.[0];
	}
	// 創建推文（tweet）
	const tweet = await createTweet(tweetData);

	// 創建一個 Promise 陣列來處理上傳的媒體文件
	const filePromise = Object.keys(files).map(async (key) => {
		const file = files[key]?.[0];

		// 上傳文件到 Cloudinary 並獲取 Cloudinary 資源信息
		const cloudinaryResource = await uploadToCloudinary(file?.filepath ?? '');

		// 創建媒體文件
		return createMediaFile({
			url: cloudinaryResource.secure_url,
			providerPublicId: cloudinaryResource.public_id,
			userId: userId,
			tweetId: tweet.id,
		});
	});

	// 等待所有媒體文件上傳完成
	await Promise.all(filePromise);

	return {
		tweet: tweetTransformer(tweet),
	};
});
