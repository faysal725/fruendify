<script setup>
import { useProfileStore } from "~~/stores/profileStore";

const props = defineProps({
  loaderState: {
    type: Boolean,
    default: false,
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
  <div v-if="loader" class="w-full h-full">
    <div class="shadow rounded-md p-4 px-0 w-full flex flex-col gap-5">
      <div class="border border-blue-300 shadow rounded-md w-full p-4">
        <div class="space-y-3">
          <div class="h-2 w-28 bg-slate-700 rounded"></div>
          <div class="flex">
            <div class="h-12 w-12 bg-slate-700 rounded-full col-span-3"></div>
            <div
              class="h-12 w-12 bg-slate-700 rounded-full col-span-3 -ml-5"
            ></div>
            <div
              class="h-12 w-12 bg-slate-700 rounded-full col-span-3 -ml-5"
            ></div>
          </div>
          <div class="h-2 w-40 bg-slate-700 rounded"></div>
        </div>

        <div class="h-0.5 w-full bg-slate-700 rounded-full my-5"></div>

        <!-- messages  -->
        <div class="flex flex-col gap-8">
          <div class="space-y-3">
            <div class="flex gap-3">
              <div class="h-12 w-12 bg-slate-700 rounded-full col-span-3"></div>
              <div class="h-24 w-40 bg-slate-700 rounded"></div>
            </div>
            <div class="flex justify-between">
              <div class="h-2 w-40 bg-slate-700 rounded"></div>
            </div>
          </div>

          <div class="space-y-3 ml-auto">
            <div class="flex gap-3">
              <div class="h-24 w-64 bg-slate-700 rounded"></div>
              <div class="h-12 w-12 bg-slate-700 rounded-full col-span-3"></div>
            </div>
            <div class="flex justify-end">
              <div class="h-2 w-40 bg-slate-700 rounded"></div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex gap-3">
              <div class="h-12 w-12 bg-slate-700 rounded-full col-span-3"></div>
              <div class="h-24 w-72 bg-slate-700 rounded"></div>
            </div>
            <div class="flex justify-between">
              <div class="h-2 w-40 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <div
            class="border border-blue-300 shadow rounded-md w-full p-4 h-10"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <slot v-else />
</template>
