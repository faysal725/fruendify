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
      class="border border-blue-300 shadow rounded-md p-4 max-w-sm h-52 w-full mx-auto"
    >
      <div
        class="animate-pulse flex justify-center items-center space-x-4 h-full"
      >
        <div class="rounded-full bg-slate-700 h-40 w-40"></div>
      </div>
    </div>
    <slot v-else />
  </div>
</template>
