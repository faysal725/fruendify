<script setup>
const props = defineProps({
  title: String,
  link: String,
});


</script>

<template>
    <div>
        <img :src="link" alt="" class="h-10 w-10">
        <p class="text-xs text-center">{{ title }}</p>
    </div>
</template>