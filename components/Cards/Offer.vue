<script setup>
const props = defineProps({
  offerData: Object,
});

</script>
<template>
  <li
    class="min-w-72 rounded-lg overflow-hidden relative"
  >
    <img :src="offerData.imgSrc" alt="" class="h-full w-full object-cover" />

    <div
      class="absolute bottom-2 right-20 flex justify-center flex-col items-center gap-3"
    >
      <p
        class="text-primary font-medium text-lg px-4 p-1 rounded-lg w-fit bg-white"
      >
        {{ offerData.discount }}
      </p>
      <p class="bg-red-500/50 text-xl text-white font-base px-4 p-1 rounded-lg">
        {{ offerData.title }}
      </p>
    </div>
  </li>
</template>
