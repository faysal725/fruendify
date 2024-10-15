<script setup>


const props = defineProps({
    msgData: Object
});


</script>

<template>
  <div class="grid grid-cols-7 gap-3 p-2 border ">
    <img :src="msgData.profilePic" alt="" class="h-full w-full col-span-2" />
    <div class="col-span-5">
      <div class="flex justify-between">
        <p class="text-lg font-medium flex items-center gap-2">
          {{ msgData.name }}
          <span
            v-if="msgData.status == 'online'"
            class="block w-3 h-3 rounded-full bg-gradient-to-b from-white from-green-500 to-green-500"
          ></span>
          <span
            v-else
            class="block w-3 h-3 rounded-full bg-gradient-to-b from-white from-red-500 to-red-500"
          ></span>
        </p>
        <p class="text-base text-slate-400">{{ msgData.last_online }}</p>
      </div>
      <div class="flex">
        <p class="text-base">{{ msgData.message }}</p>
        <p
          class="flex justify-center items-center w-5 h-5 rounded-full bg-red-500 mt-auto text-xs text-white"
        >
          2
        </p>
      </div>
    </div>
  </div>
</template>
