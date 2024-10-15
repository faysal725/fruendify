<script setup>
const props = defineProps({
  name: String,
  classes: {
    type: String,
    default:
      "w-full  inline-flex justify-center items-center bg-gradient-to-r from-primary to-secondary py-2 rounded-full text-sm md:text-lg font-normal text-white hover:bg-gradient-to-r hover:from-secondary hover:to-primary",
  },
});
</script>

<template>
  <button :class="classes">
    <span>{{ name }}</span>
    <slot />
  </button>
</template>
