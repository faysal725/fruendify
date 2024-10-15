<script setup>
const props = defineProps({
  customClass: String,
  colNo: Number,
});

const shimmer = ref(true);

setTimeout(() => {
  shimmer.value = false;
}, 9000);
</script>

<template>
  <td
    v-for="i in props.colNo"
    v-if="shimmer"
    class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500"
  >
    <div
      class="border border-[#93c5fd] shadow rounded-md p-4 mx-auto"
      :class="customClass"
    >
      <div class="animate-pulse grid grid-cols-1 gap-2">
        <div class="flex-1 space-y-2 py-1">
          <div class="space-y-2">
            <div class="h-2 bg-[#94a3b8] rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </td>
  <td
    v-else
    colspan="100%"
    class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500"
  >
    <div class="flex items-center justify-center">
      <img class="h-20" src="~~/assets/Table/emptyDt.png" alt="" />
      <p class="text-xs text-lightBlack/50">No Data to show</p>
    </div>
  </td>
</template>
