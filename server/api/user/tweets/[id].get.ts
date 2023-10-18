import { getTweetById } from '~/server/db/tweet';
import { tweetTransformer } from '~/server/transformers/tweet';

export default defineEventHandler(async (event) => {
	const { id } = event.context.params;

	const tweet = await getTweetById(id, {
		include: {
			author: true,
			MediaFiles: true,
			replyTo: {
				include: {
					author: true,
				},
			},
			replies: {
				include: {
					author: true,
					MediaFiles: true,
					replyTo: {
						include: {
							author: true,
						},
					},
				},
			},
		},
	});
	return {
		tweet: tweetTransformer(tweet),
	};
});
