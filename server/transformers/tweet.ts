import { mediaFileTransformer } from '~/server/transformers/mediaFiles';
import { userTransformer } from './user';
import human from 'human-time';

export const tweetTransformer = (tweet) => {
	return {
		id: tweet.id,
		text: tweet.text,
		mediaFiles: tweet.MediaFiles ? tweet.MediaFiles.map(mediaFileTransformer) : [],
		author: !!tweet.author ? userTransformer(tweet.author) : null,
		replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
		replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
		repliesCount: !!tweet.replies ? tweet.replies.length : 0,
		postedAtHuman: human(tweet.createdAt),
	};
};

/**
 * 如果推文有作者（author），則將作者信息轉換為包含作者數據的 author 屬性。
 * 如果推文有回覆（replies），則將回覆的每個推文轉換為包含推文數據的數組，並將其存儲在 replies 屬性中。
 * 如果推文有回覆的上級推文（replyTo），則將上級推文轉換為包含推文數據的 replyTo 屬性。
 * 如果推文有回覆，則計算回覆數並存儲在 repliesCount 屬性中，否則設置為 0。
 */
