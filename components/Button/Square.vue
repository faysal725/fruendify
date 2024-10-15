<script setup>

const props = defineProps({
  name: String,
  classes: {
    default: 'bg-gradient-to-r from-secondary to-primary text-gray-200 hover:text-white hover:text-lg border border-primary'
  }
});

</script>

<template>
  <button
    class=" transition-all duration-200   px-4 p-2 rounded-md w-full"
    :class="classes"
  >
  {{ props.name }}
  </button>
</template>
