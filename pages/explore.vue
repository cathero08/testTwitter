<template>
	<div class="h-full">
		<MainSection title="Explore" :loading="loading" back>
			<Head>
				<Title>Explore</Title>
			</Head>
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
				<h1 class="px-3 py-4 font-bold text-xl">Your Pop Trend</h1>
				<div class="px-3 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300" :class="[defaultTransition, twitterBorderColor]" v-for="item in whatsHappeningItems" @click="gotoSearch(item)">
					<h2 class="font-bold text-gray-800 text-base dark:text-white">{{ item.title }}</h2>
					<p class="text-xs text-gray-400">{{ item.count }}</p>
				</div>
				<div class="p-4 text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300" :class="[defaultTransition, twitterBorderColor]">more</div>
			</div>
		</MainSection>
	</div>
</template>
<script setup>
	import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
	const { twitterBorderColor, defaultTransition } = useTailwindConfig();
	const loading = ref(false);

	const search = ref('');

	const handleSearch = () => {
		useRouter().push({
			path: '/search',
			query: {
				q: search.value,
			},
		});
	};

	const gotoSearch = (item) => {
		search.value = item.title;
		handleSearch();
	};

	const whatsHappeningItems = ref([
		{ title: '#Pikachu', count: '123.5k Tweets' },
		{ title: '#Hunter X Hunter', count: '1.2k Tweets' },
		{ title: '#cat', count: '3.5k Tweets' },
		{ title: 'owo', count: '1k Tweets' },
		{ title: 'w', count: '4.1k Tweets' },
	]);
</script>
