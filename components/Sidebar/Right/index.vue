<template>
	<div class="flex flex-col">
		<!-- Search bar -->
		<div class="relative m-2">
			<div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
				<div class="w-6 h-6" @click="handleSearch">
					<MagnifyingGlassIcon />
				</div>
			</div>
			<input
				type="text"
				@keyup.enter="handleSearch"
				placeholder="Search tweet"
				v-model="search"
				class="flex items-center w-full pl-12 text-sm font-normal text-black dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-200 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
			/>
		</div>

		<!-- what's happening -->
		<SidebarRightPreviewCard title="What's happening">
			<SidebarRightPreviewCardItem v-for="item in whatsHappeningItems">
				<div>
					<h2 class="font-bold text-gray-800 text-base dark:text-white">{{ item.title }}</h2>
					<p class="text-xs text-gray-400">{{ item.count }}</p>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>

		<!-- who to follow -->
		<SidebarRightPreviewCard title="Who to follow">
			<SidebarRightPreviewCardItem v-for="item in whoToFollowItems">
				<div class="flex justify-between items-center p-2">
					<div class="flex">
						<img class="w-10 h-10 rounded-full" :src="item.image" :alt="item.name" />
						<div class="flex flex-col ml-2">
							<h2 class="text-sm font-bold text-gray-900 dark:text-white">{{ item.name }}</h2>
							<p class="text-xs text-gray-400">{{ item.handle }}</p>
						</div>
					</div>
					<div>
						<button class="px-4 py-2 rounded-full font-bold text-xs text-white dark:text-black bg-black dark:bg-white">Follow</button>
					</div>
				</div>
			</SidebarRightPreviewCardItem>
		</SidebarRightPreviewCard>

		<footer>
			<ul class="mx-2 my-4 text-xs text-gray-500">
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">Dark mode</a>
				</li>
				<li class="inline-block mx-2">
					<a href="#" class="hover:underline">more</a>
				</li>
				<li class="inline-block mx-2"> © 2023 Twitter test,Inc. </li>
			</ul>
		</footer>
	</div>
</template>
<script setup>
	import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

	const emitter = useEmitter();

	const search = ref('');

	const handleSearch = () => {
		useRouter().push({
			path: '/search',
			query: {
				q: search.value,
			},
		});
	};

	const handleToggleDarkMode = () => {
		emitter.$emit('toggleDarkMode');
	};

	const whatsHappeningItems = ref([
		{ title: '#Pikachu', count: '123.5k Tweets' },
		{ title: '#Hunter X Hunter', count: '1.2k Tweets' },
		{ title: '#Cat', count: '3.5k Tweets' },
	]);
	const whoToFollowItems = ref([
		{ name: 'Joe Biden', handle: '@JoeBiden', image: 'https://picsum.photos/200/200' },
		{ name: 'Joe Biden', handle: '@JoeBiden', image: 'https://picsum.photos/200/200' },
		{ name: 'Joe Biden', handle: '@JoeBiden', image: 'https://picsum.photos/200/200' },
	]);
</script>
