import { v2 as _cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';

// 做初始化設置
const cloudinary = () => {
	const config = useRuntimeConfig();

	_cloudinary.config({
		cloud_name: config.cloudinaryCloudName,
		api_key: config.cloudinaryApiKey,
		api_secret: config.cloudinaryApiSecret,
		// secure: true
	});

	return _cloudinary;
};

// 上傳圖片
export const uploadToCloudinary = (image: string): Promise<UploadApiResponse> => {
	return new Promise((resolve, reject) => {
		cloudinary().uploader.upload(image, {}, (error, data: UploadApiResponse | undefined) => {
			if (error) {
				reject(error);
			} else if (data) {
				resolve(data);
			} else {
				reject('Upload response is undefined');
			}
		});
	});
};
