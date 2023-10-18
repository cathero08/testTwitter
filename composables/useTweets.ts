export default () => {
	const usePostTweetModal = () => useState('post_tweet_modal', () => false);
	const useReplyTweet = () => useState('reply_tweet', () => null);

	const setReplyTo = (tweet) => {
		const replyTweet = useReplyTweet();
		replyTweet.value = tweet;
	};

	const closePostTweetModal = () => {
		const postTweetModal = usePostTweetModal();
		postTweetModal.value = false;
	};

	const openPostTweetModal = (tweet = null) => {
		const postTweetModal = usePostTweetModal();
		postTweetModal.value = true;

		setReplyTo(tweet);
	};

	const postTweet = (formData) => {
		const form = new FormData();

		// 使用 FormData 的 append 方法將推文文本添加到表單數據中，'text' 是字段名，formData.text 是字段值。
		form.append('text', formData.text);
		if (formData.replyTo) {
			form.append('replyTo', formData.replyTo);
		}

		// 將每個媒體文件添加到表單數據中
		formData.mediaFiles.forEach((mediaFiles, index) => {
			form.append('media_file_' + index, mediaFiles);
		});

		return useFetchApi('/api/user/tweets', {
			method: 'POST',
			body: form,
		});
	};

	const getTweets = (params = {}) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await useFetchApi('/api/user/tweets', {
					method: 'GET',
					params: { ...params },
				});
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	};

	const getTweetById = (tweetId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi(`/api/user/tweets/${tweetId}`, {
					method: 'GET',
				});
				resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	};

	return {
		postTweet,
		getTweets,
		getTweetById,
		usePostTweetModal,
		closePostTweetModal,
		openPostTweetModal,
		useReplyTweet,
	};
};
