<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";


const props = defineProps({
  left: {
    type: Boolean,
    default: true
  },
});


</script>

<template>


  <span
    class="block w-fit rounded-full shadow-2xl p-2 border border-slate-300 bg-white dark:bg-mediumBlack cursor-pointer hover:scale-110 transition-all duration-200"
  >
    <ChevronLeftIcon v-if="left" class="h-10 w-10 lg:h-8 lg:w-8   text-black dark:text-white" />
    <ChevronRightIcon v-else class=" h-10 w-10 lg:h-8 lg:w-8 text-black dark:text-white" />

  </span>
</template>
