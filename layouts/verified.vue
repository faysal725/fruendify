<script setup>
import { useAuthStore } from "~~/stores/authStore";
import { onClickOutside, useGeolocation } from "@vueuse/core";
import { useProfileStore } from "~~/stores/profileStore";

const authStore = useAuthStore();

const profileStore = useProfileStore();
const { getCoordinates, setCoordinates } = profileStore;

const { coords } = useGeolocation();
const layoutCustomProps = useAttrs();

onMounted(() => {
  setTimeout(() => {
    if (
      coords.value.latitude !== Number.POSITIVE_INFINITY &&
      coords.value.longitude !== Number.POSITIVE_INFINITY
    ) {
      setCoordinates(coords.value.latitude, coords.value.longitude);
      sendCoords()
    }
  }, 100);
});

function sendCoords() {
  if (authStore.isLoggedIn) {
    console.log("send coords function");
  }else{
    return 
  }
}



</script>

<template>
  <main
    class="relative bg-whiteSecondary dark:bg-black"
    :class="layoutCustomProps.classes"
  >
    <section class="hidden lg:grid mx-auto grid grid-cols-12">
      <div class="col-span-3 space-y-5 bg-whitePrimary dark:bg-blackPrimary">
        <PageMenu2 />
      </div>

      <div class="col-span-9"></div>
    </section>

    <section class=" ">
      <slot />
    </section>

    <section class="fixed lg:hidden -bottom-1 right-0 z-20 w-full">
      <PageMenu2 />
    </section>
  </main>
</template>
