<template>
	<div class="h-screen flex flex-col">
		<!-- 推特標誌icon -->
		<div class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20" :class="defaultTransition">
			<NuxtLink to="/">
				<div class="w-8 h-8">
					<LogoTwitter />
				</div>
			</NuxtLink>
		</div>

		<!-- 選單列表 -->
		<div class="mt-2 xl:space-y-8">
			<SidebarLeftTab v-for="(item, index) in lists" :active="item.to == route" :to="item.to" :style="{ opacity: item.work ? 1 : 0.6 }">
				<template v-slot:icon>
					<!-- <HomeIcon /> -->
					<component :is="item.icon" />
				</template>
				<template v-slot:name>{{ item.title }}</template>
			</SidebarLeftTab>
			<div class="hidden xl:block">
				<UIButton liquid size="lg" @click="emit('onTweet')">Tweet</UIButton>
			</div>
			<div class="block xl:hidden">
				<UIButton>
					<div class="w-6 h-6 font-bold" @click="emit('onTweet')">
						<PencilIcon />
					</div>
				</UIButton>
			</div>
		</div>

		<!-- 個人資訊 -->
		<div
			class="border flex flex-row items-center justify-center p-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
			:class="[defaultTransition, twitterBorderColor]"
			@click="emit('onLogout')"
		>
			<div class="flex flex-row">
				<img :src="props.user.profileImage" class="w-10 h-10 rounded-full" />
				<div class="flex-col hidden ml-2 xl:flex">
					<h1 class="text-sm font-bold text-gray-800 dark:text-white">
						{{ user.name }}
					</h1>
					<p class="text-sm text-gray-400">
						{{ user.handle }}
					</p>
				</div>
			</div>
			<!-- icon -->
			<div class="hidden ml-auto xl:block">
				<div class="w-6 h-6 dark:text-gray-500">
					<ArrowLeftOnRectangleIcon />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { HomeIcon } from '@heroicons/vue/24/solid';
	import {
		HashtagIcon,
		InboxIcon,
		BookmarkIcon,
		DocumentTextIcon,
		UserIcon,
		EllipsisHorizontalCircleIcon,
		BellIcon,
		PencilIcon,
		ChevronDownIcon,
		ArrowLeftOnRectangleIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/24/outline';
	const { defaultTransition, twitterBorderColor } = useTailwindConfig();

	const emit = defineEmits(['onTweet', 'onLogout']);

	const props = defineProps({
		user: {
			type: Object,
			required: true,
		},
	});

	const route = computed(() => useRoute().path);
	// 列表
	const lists = reactive([
		{ icon: HomeIcon, title: 'Home', work: true, to: '/' },
		{ icon: MagnifyingGlassIcon, title: 'Explore', work: true, to: '/explore' },
		{ icon: BellIcon, title: 'Notifications', work: false },
		{ icon: InboxIcon, title: 'Messages', work: false },
		{ icon: BookmarkIcon, title: 'Bookmarks', work: false },
		{ icon: DocumentTextIcon, title: 'Lists', work: false },
		{ icon: UserIcon, title: 'Profile', work: true, to: '/profile' },
		{ icon: EllipsisHorizontalCircleIcon, title: 'More', work: false },
	]);
</script>
