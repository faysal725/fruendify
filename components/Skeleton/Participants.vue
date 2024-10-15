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
      class="border border-blue-300 shadow rounded-md  h-96 lg:min-h-[80vh] w-full mx-auto overflow-hidden"
    >
      <div
        class="animate-pulse flex justify-start items-start flex-col space-y-8 h-full"
      >
        <div class="h-12 w-full bg-slate-700"></div>
        <div class="w-full px-2 space-y-4">
          <div class="h-2 w-full bg-slate-700"></div>
          <div class="h-2 w-full bg-slate-700"></div>
          <div class="h-2 w-full bg-slate-700"></div>
        </div>

        <div class="h-12 w-full bg-slate-700"></div>
        <div class="w-full px-2 space-y-4">
          <div class="h-2 w-full bg-slate-700"></div>
          <div class="h-2 w-full bg-slate-700"></div>
          <div class="h-2 w-full bg-slate-700"></div>
        </div>
      </div>
    </div>
    <slot v-else />
  </div>
</template>
