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
    <div v-if="loader" class="shadow rounded-md p-4 px-0 max-w-sm w-full">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-4 bg-slate-700 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-700 rounded col-span-2"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot v-else />
  </div>
</template>
