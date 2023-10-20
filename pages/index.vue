<template>
	<div>
		<MainSection title="Home" :loading="loading">
			<Head>
				<Title>Home / Twitter</Title>
			</Head>
			<div class="border-b" :class="twitterBorderColor">
				<TweetForm :user="user" @onSuccess="handHomeSuccess" />
			</div>
			<TweetListFeed :tweets="homeTweets" />
		</MainSection>
		<UIPopMessage :is-open="showModal" @massageClose="showModal = false">
			<div class="flex justify-center">{{ msg }}</div>
		</UIPopMessage>
	</div>
</template>
<script setup>
	const { useAuthUser } = useAuth();
	const { twitterBorderColor } = useTailwindConfig();
	const { getTweets } = useTweets();

	const user = useAuthUser();
	const loading = ref(false);
	const homeTweets = ref([]);

	// 錯誤彈窗
	const showModal = ref(false);
	const msg = ref('');

	const handHomeSuccess = (tweet) => {
		navigateTo({
			path: `/status/${tweet.id}`,
		});
	};

	onBeforeMount(async () => {
		loading.value = true;
		try {
			const { tweets } = await getTweets();
			homeTweets.value = tweets;
		} catch (error) {
			msg.value = error.response.statusText;
			showModal.value = true;
		} finally {
			loading.value = false;
		}
	});
</script>
