<template>
	<div>
		<div v-if="isEmptyArray" class="px-4 py-10 border-b bg-gray-100" :class="twitterBorderColor">
			<p class="text-center text-gray-500"> No tweets QQ </p>
		</div>
		<div class="pb-4 border-b hover:bg-gray-100 dark:hover:bg-dim-300" :class="[twitterBorderColor, defaultTransition]" v-for="tweet in props.tweets" :key="tweet.id" @click.native="redirect(tweet)">
			<TweetItem :tweet="tweet" compact />
		</div>
	</div>
</template>
<script setup>
	const props = defineProps({
		tweets: {
			type: Array,
			required: true,
		},
	});

	const { twitterBorderColor, defaultTransition } = useTailwindConfig();

	const isEmptyArray = computed(() => props.tweets.length === 0);

	const redirect = (tweet) => {
		navigateTo({
			path: `/status/${tweet.id}`,
		});
	};
</script>
