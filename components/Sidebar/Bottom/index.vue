<template>
	<div class="grid grid-cols-4 w-full bg-white dark:bg-dim-900 border-t" :class="[defaultTransition, twitterBorderColor]">
		<div class="col-span-1 justify-center flex" v-for="(item, index) in lists">
			<SidebarLeftTab :active="item.to == route" :to="item.to" :style="{ opacity: item.work ? 1 : 0.6 }">
				<template v-slot:icon>
					<!-- <HomeIcon /> -->
					<component :is="item.icon" />
				</template>
				<!-- <template v-slot:name>{{ item.title }}</template> -->
			</SidebarLeftTab>
		</div>
		<div class="col-span-1 flex justify-center">
			<div class="flex items-center">
				<div
					class="p-3 flex items-center justify-center rounded-full cursor-pointer xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
					:class="[defaultTransition, twitterBorderColor]"
					@click="emit('onLogout')"
				>
					<!-- <img :src="props.user.profileImage" class="w-8 h-8 rounded-full" /> -->
					<div class="w-6 h-6 dark:text-white">
						<ArrowLeftOnRectangleIcon />
					</div>
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

	const route = computed(() => useRoute().path);

	const emit = defineEmits(['onLogout']);
	const props = defineProps({
		user: {
			type: Object,
			required: true,
		},
	});

	// 列表
	const lists = reactive([
		{ icon: HomeIcon, title: 'Home', work: true, to: '/' },
		{ icon: MagnifyingGlassIcon, title: 'Search', work: true, to: '/explore' },
		{ icon: UserIcon, title: 'Profile', work: true, to: '/profile' },
		// { icon: BellIcon, title: 'Notifications', work: false },
		// { icon: InboxIcon, title: 'Messages', work: false },
		// { icon: BookmarkIcon, title: 'Bookmarks', work: false },
		// { icon: DocumentTextIcon, title: 'Lists', work: false },
		// { icon: EllipsisHorizontalCircleIcon, title: 'More', work: false },
	]);
</script>
