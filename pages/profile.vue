<template>
	<div class="h-full">
		<MainSection title="Profile" :loading="loading" back>
			<Head>
				<Title>Profile</Title>
			</Head>
			<div>
				<div class="w-full h-52 bg-[#CFD9DE]"></div>
				<div class="px-3 py-4 flex flex-col">
					<!-- 個人圖片 -->
					<div class="w-1/3 min-w-[48px] mt-[-19%] p-4 relative rounded-full bg-white border-4 border-white overflow-hidden">
						<div class="pb-[100%]"></div>
						<div class="absolute w-full h-full top-1/2 left-1/2 cursor-pointer -translate-x-1/2 -translate-y-1/2">
							<img class="w-full" :src="user.profileImage" />
						</div>
						<div class="opacity-0 absolute top-0 left-0 z-10 w-full h-full bg-black/5 cursor-pointer hover:opacity-100" :class="defaultTransition" @click="toggleFullScreen"></div>
					</div>
					<h1 class="text-xl font-bold"> {{ user.name }} </h1>
					<h2 class="text-sm text-gray-500 mb-3"> {{ user.handle }} </h2>
					<div class="flex items-center">
						<div class="w-5 h-5 text-gray-500 mr-2">
							<CalendarDaysIcon />
						</div>
						<p class="text-sm text-gray-500"> Joined in {{ formatDateToYYYYMM(user.createdAt) }} </p>
					</div>
				</div>
				<!-- tweets -->
				<div class="font-bold h-[50px] flex items-center text-lg">
					<div class="px-4 h-full flex items-center border-b-4 border-blue-400"> Tweets </div>
				</div>
				<TweetListFeed :tweets="filterTweets" />
			</div>
		</MainSection>
		<div class="fullscreen" @click="toggleFullScreen" v-if="isFullScreen">
			<img :src="imageSource" alt="Image" />
		</div>
	</div>
</template>
<script setup>
	import { CalendarDaysIcon } from '@heroicons/vue/24/outline';
	const { defaultTransition } = useTailwindConfig();
	const { getTweets } = useTweets();
	const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();

	const loading = useAuthLoading();
	const user = useAuthUser();

	const userTweets = ref([]);
	const filterTweets = computed(() => {
		return userTweets.value.filter((e) => e?.author?.id === user.value.id);
	});

	const isFullScreen = ref(false);
	const imageSource = computed(() => user.value.profileImage || '');

	const toggleFullScreen = () => {
		isFullScreen.value = !isFullScreen.value;
	};

	const getTweet = async () => {
		try {
			const { tweets } = await getTweets();
			userTweets.value = tweets;
		} catch (error) {
			console.log(error);
		}
	};

	onMounted(async () => {
		getTweet();
	});
</script>
<style scoped>
	/* 全螢幕時的樣式 */
	.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.9);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.fullscreen img {
		max-width: 90%;
		max-height: 90%;
		cursor: zoom-out;
	}
</style>
