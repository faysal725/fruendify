<script setup>

const props = defineProps({
  title: String,
  description: String,
});

</script>

<template>
  <div class="mb-3 border border-violet-400 p-4 pb-6 rounded-lg shadow-md">
    <!-- form header  -->
    <div class="mb-2">
      <h3
        class="text-sm leading-6 font-semibold text-gray-500 "
      >
        {{ title }}
      </h3>
      <p class="mt-1 text-xs text-gray-500 ">
        {{ description }}
      </p>
    </div>

    
    <div class="space-y-4">
        <slot/>
    </div>
  </div>
</template>
