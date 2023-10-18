<template>
	<div>
		<MainSection title="TWEET" :loading="loading">
			<Head>
				<Title></Title>
			</Head>
			<TweetDetails :user="user" :tweet="tweets" />
		</MainSection>
	</div>
</template>
<script setup>
	const { getTweetById } = useTweets();
	const { useAuthUser } = useAuth();

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
			console.log(error);
		} finally {
			loading.value = false;
		}
	};

	onBeforeMount(() => {
		getTweet();
	});
</script>
