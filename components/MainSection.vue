<template>
	<div class="border-x h-full" :class="twitterBorderColor">
		<h2 class="sticky top-0 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-dim-900/80 text-xl font-bold text-gray-800 dark:text-gray-100">
			<p class="flex items-center">
				<p class="w-4 h-4 mr-5 cursor-pointer" @click="goback" v-if="props.back">
					<ArrowLeftIcon/>
				</p>
				<p>{{ props.title }}</p>
			</p>
		</h2>

		<div v-if="props.loading" class="flex justify-center items-center p-4 border-b" :class="twitterBorderColor">
			<UISpinner />
		</div>
		<div v-else>
			<slot></slot>
		</div>
	</div>
</template>
<script setup>
	const { twitterBorderColor } = useTailwindConfig();
	import { ArrowLeftIcon } from '@heroicons/vue/24/solid';

	const props = defineProps({
		title: {
			type: String,
			requied: true,
		},
		loading: {
			type: Boolean,
			requied: true,
		},
		back: {
			type: Boolean,
			default: false,
		},
	});


	const goback = ()=>{
		window.history.back()
	}
</script>
