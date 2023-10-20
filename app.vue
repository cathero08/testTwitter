<template>
	<div :class="{ dark: darkMode }">
		<div class="bg-white dark:bg-dim-900">
			<div v-if="isLoading">
				<LoadingPage />
			</div>
			<!-- App -->
			<div v-else-if="user" class="min-h-full">
				<div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
					<!-- nav bottom -->
					<div class="fixed w-full bottom-0 md:hidden">
						<SidebarBottom :user="user" @onLogout="handleUserLogout" />
					</div>

					<!-- left sidebar -->
					<div class="hidden md:block xs-col-span-1 xl:col-span-2">
						<div class="sticky top-0">
							<SidebarLeft @onLogout="handleUserLogout" @onTweet="handleOpenTweetModal" :user="user" />
						</div>
					</div>

					<!-- Main sidebar -->
					<div class="col-span-12 md:col-span-8 xl:col-span-6"> <NuxtPage /> </div>

					<!-- Right sidebar -->
					<div class="hidden md:block md:col-span-3 xl:col-span-4">
						<div class="sticky top-0">
							<SidebarRight />
						</div>
					</div>
				</div>
			</div>

			<!-- 登入 -->
			<div v-else>
				<AuthPage />
				<!-- <NuxtPage /> -->
			</div>

			<!-- 發文彈窗 -->
			<UIModal :isOpen="postTweetModal" @onClose="handleModalClose">
				<div class="w-5 h-5 cursor-pointer" @click="handleModalClose">
					<XMarkIcon />
				</div>
				<TweetForm :replyTo="replyTweet" :user="user" showReply @onSuccess="handleFormSuccess" />
			</UIModal>

			<!-- 訊息彈窗 -->
			<!-- <UIPopMessage :isOpen="testets" @massageClose="testets = false">
				<div> asjdfl; </div>
			</UIPopMessage> -->
		</div>
	</div>
</template>

<script setup>
	import { XMarkIcon } from '@heroicons/vue/24/solid';
	import useEmitter from './composables/useEmitter';

	const darkMode = ref(false);
	const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
	const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets();

	const isLoading = useAuthLoading();
	const user = useAuthUser();
	const emitter = useEmitter();
	const replyTweet = useReplyTweet();

	// const testets = ref(true);

	emitter.$on('replyTweet', (tweet) => {
		openPostTweetModal(tweet);
	});

	emitter.$on('toggleDarkMode', () => {
		darkMode.value = !darkMode.value;
	});

	const postTweetModal = usePostTweetModal();

	const handleFormSuccess = (tweet) => {
		closePostTweetModal();
		navigateTo({
			path: `/status/${tweet.id}`,
		});
	};

	const handleModalClose = () => {
		closePostTweetModal();
	};

	const handleOpenTweetModal = () => {
		openPostTweetModal(null);
	};

	const handleUserLogout = async () => {
		await logout();
	};

	onBeforeMount(() => {
		initAuth();
	});
</script>
