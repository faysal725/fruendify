<script setup>
const props = defineProps({
  name: String,
  classes: {
    type: [String, Array],
    default: 'min-w-16 bg-primary text-sm btn-login ',
  }
});
</script>

<template>
  <button
    :class="classes"
  >
    {{ props.name }}
  </button>
</template>
