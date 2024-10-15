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
      <div class="border border-blue-300 shadow rounded-full w-full p-5">

        <div class="h-2 bg-slate-700 rounded "></div>
      </div>
      
      <div class="border border-blue-300 shadow rounded-full w-full p-5">
        <div class="h-2 bg-slate-700 rounded "></div>
      </div>
      
      <div class="border border-blue-300 shadow rounded-full w-full p-5">
        <div class="h-2 bg-slate-700 rounded "></div>
      </div>
    </div>
    <slot v-else />
  </div>
</template>
