<template>
	<div class="h-full">
		<MainSection title="Profile" :loading="loading" back>
			<Head>
				<Title>Profile</Title>
			</Head>
			<div> profile </div>
		</MainSection>
	</div>
</template>
<script setup>
	const loading = ref(false);
</script>
