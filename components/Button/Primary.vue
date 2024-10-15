<script setup>
const props = defineProps({
  name: String,
  link: String
});
</script>

<template>
  <NuxtLink class="bg-primary rounded-full w-fit" :to="link">

    <slot />
    <!-- <span>{{ props.name }}</span> -->
  </NuxtLink>
</template>
