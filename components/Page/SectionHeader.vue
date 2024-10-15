<script setup>
const props = defineProps({
  title: String,
  description: String,
});

</script>

<template>
  <div class="header-container">
    <p class="header-title">
      {{ title }}
    </p>
    <p class="header-description">
      {{ description }}
    </p>
  </div>
</template>
