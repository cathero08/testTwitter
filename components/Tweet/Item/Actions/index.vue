<template>
	<div>
		<div class="flex items-center justify-around">
			<TweetItemActionsIcon @onClick="emit('onCommentClick')" :color="item.color" :size="size" v-for="item in list">
				<template v-slot:icon="{ classes }">
					<!-- <ChatBubbleOvalLeftEllipsisIcon :class="classes" /> -->
					<component :is="item.icon" :class="classes"></component>
				</template>
				<template v-slot:default v-if="props.compact"> {{ item.count }} </template>
			</TweetItemActionsIcon>
		</div>
	</div>
</template>
<script setup>
	import { ChatBubbleOvalLeftEllipsisIcon, ArrowPathIcon, HeartIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/24/outline';

	const props = defineProps({
		tweet: {
			type: Object,
			required: true,
		},
		compact: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['onCommentClick']);

	const generateRandomNumber = () => {
		return Math.floor(Math.random() * 100);
	};

	const size = computed(() => (props.compact ? 5 : 8));

	const list = ref([
		{ color: 'blue', icon: ChatBubbleOvalLeftEllipsisIcon, count: props.tweet.repliesCount },
		{ color: 'green', icon: ArrowPathIcon, count: generateRandomNumber() },
		{ color: 'red', icon: HeartIcon, count: generateRandomNumber() },
		{ color: 'blue', icon: ArrowUpOnSquareIcon, count: generateRandomNumber() },
	]);
</script>
