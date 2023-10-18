<template>
	<div>
		<MainSection title="Search" :loading="loading" back>
			<Head>
				<Title>Search</Title>
			</Head>
			<TweetListFeed :tweets="searchTweets" />
		</MainSection>
	</div>
</template>
<script setup>
	const { getTweets: getTweetComposable } = useTweets();

	const loading = ref(false);
	const searchTweets = ref([]);
	const searchQuery = () => useRoute().query.q;

	watch(
		() => useRoute().fullPath,
		() => getTweet()
	);

	const getTweet = async () => {
		loading.value = true;
		try {
			const { tweets } = await getTweetComposable({
				query: searchQuery(),
			});
			searchTweets.value = tweets;
		} catch (error) {
			console.log(error);
		} finally {
			loading.value = false;
		}
	};

	onBeforeMount(async () => {
		getTweet();
	});
</script>
