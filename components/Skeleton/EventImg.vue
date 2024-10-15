<script setup>
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";

const props = defineProps({
  loaderState: {
    type: String,
    default: "",
  },
});


const eventDetailsStore = useEventDetailsStore();

const loader = ref(false);

onMounted(() => {
  if (props.loaderState) {
    if (props.loaderState == "pending") {
      loader.value = true;
    } else {
      loader.value = false;
    }
  }
});

watch(
  () => eventDetailsStore.loaderState,
  () => {
    if (!props.loaderState) {
      if (eventDetailsStore.loaderState == "pending") {
        loader.value = true;
      } else {
        loader.value = false;
      }
    }
  }
);

watch(
  () => props.loaderState,
  () => {
    if (props.loaderState == "pending") {
      loader.value = true;
    } else {
      loader.value = false;
    }
  }
);
</script>
<template>
  <div 
  v-if="loader">
    <div
      class="shadow rounded-md p-4 px-0 w-full flex flex-col gap-5 animate-pulse"
    >
      <div class="border border-blue-300 shadow rounded-md w-full " >
          <div class="space-y-3 p-4">
            <div class="h-52 bg-slate-700 rounded " ></div>
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-700 rounded col-span-2"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-700 rounded col-span-3"></div>
            </div>
          </div>
      </div>
      
    </div>
  </div>
  <slot v-else />
</template>
