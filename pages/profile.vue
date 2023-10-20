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
	const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();

	const loading = useAuthLoading();
	const user = useAuthUser();

	setTimeout(() => {
		console.log(user.value);
	}, 5000);
</script>
