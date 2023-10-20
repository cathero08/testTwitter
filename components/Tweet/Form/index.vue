<template>
	<div>
		<div v-if="loading" class="flex justify-center items-center py-6">
			<UISpinner />
		</div>
		<div v-else>
			<TweetItem :tweet="props.replyTo" v-if="props.replyTo && props.showReply" hiddenAction />
			<TweetFormInput :user="props.user" :placeholder="props.placeholder" @onSubmit="handleFormSubmit" />
		</div>
		<UIPopMessage :is-open="showModal" @massageClose="showModal = false">
			<div class="flex justify-center">{{ msg }}</div>
		</UIPopMessage>
	</div>
</template>
<script setup>
	const props = defineProps({
		user: {
			type: Object,
			required: true,
		},
		placeholder: {
			type: String,
			default: "What's happening ?",
		},
		replyTo: {
			type: Object,
			default: null,
		},
		showReply: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['onSuccess']);
	const { postTweet } = useTweets();

	// 錯誤彈窗
	const showModal = ref(false);
	const msg = ref('');

	const loading = ref(false);

	const handleFormSubmit = async (data) => {
		loading.value = true;
		try {
			const res = await postTweet({
				text: data.text,
				mediaFiles: data.mediaFiles,
				replyTo: props.replyTo?.id,
			});
			emit('onSuccess', res.tweet);
		} catch (error) {
			msg.value = error.response.statusText;
			showModal.value = true;
		} finally {
			loading.value = false;
		}
	};
</script>
