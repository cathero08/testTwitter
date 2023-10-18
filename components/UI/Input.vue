<template>
	<div>
		<label for="" class="block pl-3 ml-px text-sm font-medium text-gray-700">{{ props.label }}</label>
		<div class="mt-1">
			<input
				:type="props.type"
				:value="props.modelValue"
				:placeholder="props.placeholder"
				:maxlength="props.maxlength"
				@input="(event) => emits('update:modelValue', event.target.value)"
				class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 sm:text-sm"
			/>
		</div>
	</div>
</template>

<script setup>
	const emits = defineEmits(['update:modelValue']);
	const props = defineProps({
		label: {
			type: String,
			default: null,
		},
		modelValue: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		maxlength: {
			type: String,
			default: 200,
		},
	});
</script>
