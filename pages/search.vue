<template>
	<div>
		<MainSection title="Search" :loading="loading" back>
			<Head>
				<Title>Search</Title>
			</Head>
			<TweetListFeed :tweets="searchTweets" />
		</MainSection>
		<UIPopMessage :is-open="showModal" @massageClose="showModal = false">
			<div class="flex justify-center">{{ msg }}</div>
		</UIPopMessage>
	</div>
</template>
<script setup>
	const { getTweets: getTweetComposable } = useTweets();

	// 錯誤彈窗
	const showModal = ref(false);
	const msg = ref('');

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
			msg.value = error.response.statusText;
			showModal.value = true;
		} finally {
			loading.value = false;
		}
	};

	onBeforeMount(async () => {
		getTweet();
	});
</script>
