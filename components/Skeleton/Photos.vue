<script setup>
import { useProfileStore } from "~~/stores/profileStore";

const props = defineProps({
  loaderState: {
    type: String,
    default: "",
  },
});

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

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
  () => profileStore.loaderState,
  () => {
    if (!props.loaderState) {
      if (profileStore.loaderState == "pending") {
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
  <div>
    <div
      v-if="loader"
      class="shadow rounded-md p-4 px-0 w-full grid grid-cols-2 md:grid-cols-4 gap-2"
    >
      <div class="border border-blue-300 shadow rounded-md w-full">
        <div
          class="animate-pulse flex justify-center items-center space-x-4 h-40"
        >
          <div class="rounded-full bg-slate-700 h-20 w-20"></div>
        </div>
      </div>
      
      <div class="border border-blue-300 shadow rounded-md w-full">
        <div
          class="animate-pulse flex justify-center items-center space-x-4 h-full"
        >
          <div class="rounded-full bg-slate-700 h-20 w-20"></div>
        </div>
      </div>
      
      <div class="border border-blue-300 shadow rounded-md w-full">
        <div
          class="animate-pulse flex justify-center items-center space-x-4 h-full"
        >
          <div class="rounded-full bg-slate-700 h-20 w-20"></div>
        </div>
      </div>
    </div>
    <slot v-else />
  </div>
</template>
