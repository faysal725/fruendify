<script setup>
const props = defineProps({
  loaderState: {
    type: String,
    default: "",
  },
});

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
    v-if="loader"
    class="fixed w-full h-full bg-black/50 z-50 top-0 left-0 text-white flex justify-center items-center"
  >
    <!-- <p class="-mt-10 text-3xl">Loading</p> -->
    <img src="../../assets/images/loader/spinner-loading.gif" alt="" />
  </div>
  <slot v-else />
</template>
