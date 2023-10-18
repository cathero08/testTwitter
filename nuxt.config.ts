// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	build: {
		transpile: ['@heroicons/vue'],
	},
	modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui'],
	runtimeConfig: {
		jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
		jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,

		cloudinaryCloudName: process.env.CLOUDINARY_CLOUDNAME,
		cloudinaryApiKey: process.env.CLOUDINARY_APIKEY,
		cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
	},
	devServer: {
		port: 1245,
	},
	css: ['~/assets/scss/main.scss'],
});
