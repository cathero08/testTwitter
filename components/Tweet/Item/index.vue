<template>
	<div>
		<TweetItemHeader :tweet="props.tweet" />
		<div :class="tweetBodyWrapper">
			<p class="whitespace-pre-wrap shrink w-auto font-medium text-gray-800 dark:text-white pr-4" :class="textSize">
				{{ props.tweet.text }}
			</p>
			<div v-for="img in tweet.mediaFiles" :key="img.id" class="flex my-3 mr-2 border-2 rounded-2xl" :class="twitterBorderColor">
				<img :src="img.url" class="w-full rounded-2xl" />
			</div>
			<div class="mt-2" v-if="!props.hiddenAction">
				<TweetItemActions @on-comment-click="handleCommentClick" :tweet="props.tweet" :compact="props.compact" />
			</div>
		</div>
	</div>
</template>
<script setup>
	import useEmitter from '~/composables/useEmitter';

	const props = defineProps({
		tweet: {
			type: Object,
			required: true,
		},
		compact: {
			type: Boolean,
			default: false,
		},
		hiddenAction: {
			type: Boolean,
			default: false,
		},
	});

	const emitter = useEmitter();
	const { twitterBorderColor } = useTailwindConfig;

	const handleCommentClick = () => {
		emitter.$emit('replyTweet', props.tweet);
	};

	const tweetBodyWrapper = computed(() => (props.compact ? 'ml-16' : 'ml-2 mt-4'));
	const textSize = computed(() => (props.compact ? 'text-base' : 'text-2xl'));
</script>
