export default () => {
	const postProfilePhoto = (formData) => {
		const form = new FormData();

		// 將每個媒體文件添加到表單數據中
		formData.mediaFiles.forEach((mediaFiles, index) => {
			form.append('media_file_' + index, mediaFiles);
		});

		return useFetchApi('/api/user/profileimage', {
			method: 'POST',
			body: form,
		});
	};

	return {
		postProfilePhoto,
	};
};
