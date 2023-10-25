<template>
	<div class="h-full">
		<MainSection title="TWEET" :loading="loading" class="h-full" back>
			<Head>
				<Title>TWEET / {{ user.name }}</Title>
			</Head>
			<TweetDetails :user="user" :tweet="tweets" />
		</MainSection>
		<UIPopMessage :is-open="showModal" @massageClose="showModal = false">
			<div class="flex justify-center">{{ msg }}</div>
		</UIPopMessage>
	</div>
</template>
<script setup>
	const { getTweetById } = useTweets();
	const { useAuthUser } = useAuth();

	// 錯誤彈窗
	const showModal = ref(false);
	const msg = ref('');

	const user = useAuthUser();
	const loading = ref(false);
	const tweets = ref(null);

	watch(
		() => useRoute().fullPath,
		() => getTweet()
	);

	const getTweetIdFromRoute = () => {
		return useRoute().params.id;
	};

	const getTweet = async () => {
		loading.value = true;
		try {
			const { tweet } = await getTweetById(getTweetIdFromRoute());
			tweets.value = tweet;
		} catch (error) {
			msg.value = error.response._data.statusMessage || error.response.statusText;
			showModal.value = true;
		} finally {
			loading.value = false;
		}
	};

	onBeforeMount(() => {
		getTweet();
	});
</script>
