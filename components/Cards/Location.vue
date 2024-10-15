<script setup>

import { MapPinIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  locationData: Object,
});


</script>

<template>
  <div
    class="h-full w-full  flex justify-center items-center h-56 rounded-xl overflow-hidden mb-10 relative"
  >
    <img :src="locationData.imgSrc" alt="" class="h-full w-full object-cover" />
    <div
      class="absolute w-full h-fit bg-stone-800 bottom-0 text-center flex justify-center items-center gap-5 py-1.5 text-white font-thin text-base"
    >
      <p>{{ locationData.location }}</p>
      <p>|</p>
      <p class="flex items-center gap-2">
        <MapPinIcon class="h-5 w-5 text-white" /> {{ locationData.distance }}
      </p>
    </div>
    
    <div class="absolute top-0 right-0 text-primary text-base px-4 p-1 rounded-sm font-semibold bg-white mr-2 mt-2">
        <p>{{ locationData.discount }}</p>
    </div>
  </div>
</template>
