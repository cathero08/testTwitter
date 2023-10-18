import { userTransformer } from '~/server/transformers/user';

export interface User {
	id: string;
	name: string;
	email: string;
	username: string;
	profileImage: string;
}

export default defineEventHandler(async (event) => {
	return {
		user: userTransformer(event.context.auth?.user) as User,
	};
});
