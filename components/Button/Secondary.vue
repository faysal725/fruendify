<script setup>
const props = defineProps({
  name: String,
  link: String,
});
</script>

<template>
  <a
    class="h-10 inline-flex items-center px-2 py-1  border border-gray-300  rounded-md font-semibold text-sm text-white capitalize tracking-widest bg-red-600/70 hover:bg-red-600 focus:outline-none focus:shadow-outline-gray transition ease-in-out duration-150 cursor-pointer"
    :href="link"
    >{{ props.name }}</a
  >
</template>
