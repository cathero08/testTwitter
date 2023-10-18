<template>
	<div class="w-full max-w-md px-2 py-16 sm:px-0">
		<div class="flex justify-center mb-10">
			<div class="w-10 h-10">
				<LogoTwitter />
			</div>
		</div>
		<TabGroup>
			<TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
				<Tab as="template" v-slot="{ selected }">
					<button
						:class="[
							'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
							'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
							selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
						]"
					>
						Log in</button
					>
				</Tab>
				<Tab as="template" v-slot="{ selected }">
					<button
						:class="[
							'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
							'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
							selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
						]"
					>
						Sign in</button
					>
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<div class="w-full">
						<div class="pt-5 space-y-6">
							<UIInput label="Username" placeholder="@username" v-model="data.username" />
							<UIInput label="Password" placeholder="*****" type="password" v-model="data.password" />
							<UIButton @click="handleLogin" liquid :disabled="isButtonDisabled"> Login </UIButton>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<div class="w-full">
						<div class="pt-5 space-y-6">
							<UIInput label="Username" placeholder="@username" v-model="dataRegister.username" />
							<UIInput label="Password" placeholder="*****" type="password" v-model="dataRegister.password" />
							<UIInput label="Repeat Password" placeholder="*****" type="password" v-model="dataRegister.repeatPassword" />
							<UIInput label="E-mail" placeholder="123.@yahoo.com" v-model="dataRegister.email" />
							<UIInput label="Nick name" placeholder="loveCat" v-model="dataRegister.name" />
							<UIButton @click="handleRegister" liquid :disabled="isButtonDisabledRegister"> Create </UIButton>
						</div>
					</div>
				</TabPanel>
			</TabPanels>
		</TabGroup>
	</div>
</template>
<script setup>
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

	// 登入
	const data = reactive({
		password: '',
		username: '',
		loading: false,
	});

	// 註冊
	const dataRegister = reactive({
		password: '',
		repeatPassword: '',
		username: '',
		email: '',
		name: '',
	});

	const handleLogin = async () => {
		data.loading = true;
		const { login } = useAuth();
		try {
			await login(data);
		} catch (error) {
			console.log(error);
		} finally {
			data.loading = false;
		}
	};

	const handleRegister = async () => {
		data.loading = true;
		const { postRegister } = useAuth();
		try {
			await postRegister(dataRegister);
		} catch (error) {
			console.log(error);
		} finally {
			data.loading = false;
		}
	};

	const isButtonDisabled = computed(() => {
		return !data.username || !data.password || data.loading;
	});

	const isButtonDisabledRegister = computed(() => {
		return !dataRegister.repeatPassword || !dataRegister.email || !dataRegister.name || !dataRegister.username || !dataRegister.password || data.loading;
	});
</script>
