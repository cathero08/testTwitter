import { getTweet } from '~/server/db/tweet';
import { tweetTransformer } from '~/server/transformers/tweet';

export default defineEventHandler(async (event) => {
	const { query } = getQuery(event);

	let prismaQuery = {
		include: {
			author: true,
			MediaFiles: true,
			replies: {
				include: {
					author: true,
				},
			},
			replyTo: {
				include: {
					author: true,
				},
			},
		},
		orderBy: [
			{
				createdAt: 'desc',
			},
		],
	};

	if (!!query) {
		prismaQuery = {
			...prismaQuery,
			where: {
				text: {
					contains: query,
				},
			},
		};
	}

	const tweets = await getTweet(prismaQuery);
	return {
		tweets: tweets.map((e) => tweetTransformer(e)),
	};
});
