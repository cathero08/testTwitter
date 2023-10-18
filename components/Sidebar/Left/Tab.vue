<template>
  <NuxtLink to="#">
    <div
      class="flex items-center w-min p-3 rounded-full hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
      :class="defaultTransition"
    >
      <div class="w-6 h-6">
        <slot name="icon" />
      </div>
      <div class="hidden ml-4 text-xl xl:block" :class="textClass">
        <slot name="name" />
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const textClass = computed(() =>
  props.active ? 'font-semibold' : 'font-normal'
);
</script>
