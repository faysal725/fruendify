<script setup>
const props = defineProps({
  name: String,
  classes: {
    default:
      "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary hover:bg-gradient-to-r text-white ",
    type: String,
  },
});
</script>

<template>
  <button
    class="w-full inline-flex justify-center items-center py-2 rounded-full text-sm md:text-lg font-normal"
    :class="classes"
  >
    <span>{{ props.name }}</span>
  </button>
</template>
