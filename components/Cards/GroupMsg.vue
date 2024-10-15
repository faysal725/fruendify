<script setup>

const props = defineProps({
  msgData: Object,
});
</script>

<template>
  <div
    class="p-2 border border-gray-200 dark:border-slate-500 cursor-pointer rounded-xl bg-white dark:bg-blackPrimary"
  >
    <div class="">
      <div class="flex justify-between items-center">
        <p
          class="text-base dark:text-slate-200 font-medium flex items-center gap-2"
        >
          {{ msgData?.event.title }}
        </p>
        <!-- <p class="text-xs text-slate-400 dark:text-slate-200">{{ msgData.last_online }}</p> -->
      </div>
      <div class="py-2">
        <ContainerGroupProfile
          :profiles="msgData?.participants"
          :classes="'h-10 w-10'"
        />
      </div>
      <!-- <div class="flex justify-between items-end">
        <p class="text-sm text-slate-500 dark:text-slate-200">Last Message</p>
        <p
          class="flex justify-center items-center w-5 h-5 rounded-full bg-gradient-to-b from-primary to-secondary mt-auto text-xs text-white"
        >
          2
        </p>
      </div> -->
    </div>
  </div>
</template>
