<script setup>
import { useProfileStore } from "~~/stores/profileStore";

const props = defineProps({
  loaderState: {
    type: String,
    default: "",
  },
  classes: {
    type: String,
    default: 'flex flex-col'
  }
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
  <div v-if="loader">
    <div class="shadow rounded-md p-4 px-0 w-full  gap-5" :class="classes">
      <div
        class="border border-blue-300 shadow rounded-md w-full animate-pulse"
        v-for="dt in [1, 2, 3, 4, 5]"
      >
        <div class="space-y-3 p-4">
          <div class="h-36 bg-slate-700 rounded"></div>
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
