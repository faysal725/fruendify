<script setup>
import { useAuthStore } from "~~/stores/authStore";
import { onClickOutside, useGeolocation } from "@vueuse/core";
import { useProfileStore } from "~~/stores/profileStore";

const authStore = useAuthStore();

const profileStore = useProfileStore();
const { setCoordinates } = profileStore;

const { coords } = useGeolocation();

const layoutCustomProps = useAttrs();

let allTabs = [
  { key: 1, value: "Discover Event", href: "/event/discover-event" },
  { key: 2, value: "Upcomming Event", href: "/event/upcomming-event" },
  { key: 3, value: "Joined", href: "#" },
  { key: 4, value: "My Event", href: "/event/my-event" },
];

if (process.client) {
  // get geolocation
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  console.log(profileStore.profileData, "time zone");
  if (!profileStore.latitude && !profileStore.longitude) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(position.coords, "time ");
        setCoordinates(latitude, longitude, timezone);

        console.log(position.coords, coords);
      },
      (error) => {
        console.log(error);
        location.value = error;
      },
      {
        timeout: 80000, // 30 seconds
        maximumAge: 0,
        enableHighAccuracy: false,
      }
    );
  }

  // console.log("finish");
}

// onMounted(() => {
//   setTimeout(() => {
//     if (
//       coords.value.latitude !== Number.POSITIVE_INFINITY &&
//       coords.value.longitude !== Number.POSITIVE_INFINITY
//     ) {
//       setCoordinates(coords.value.latitude, coords.value.longitude);
//       sendCoords()
//     }
//   }, 100);
// });

// function sendCoords() {
//   if (authStore.isLoggedIn) {
//     // console.log("send coords function");
//   }else{
//     return
//   }
// }
</script>

<template>
  <main class="relative">
    <section
      class="max-w-full min-h-screen mx-auto grid grid-cols-12 bg-whiteSecondary dark:bg-blackSecondary auto-rows-min lg:auto-rows-max"
    >
      <div
        class="col-span-12 lg:col-span-3 space-y-5 bg-whitePrimary dark:bg-blackPrimary max-h-screen overflow-hidden lg:pb-10 px-2"
      >
        <div class="hidden lg:block space-y-5">
          <PageMenu2 />
          <!-- tabs  -->
          <!-- <CommonTab v-if="layoutCustomProps.tabs" v-model="currentTab" :tabData="layoutCustomProps.tabs" /> -->
        </div>

        <slot name="sidebar-sec-1" />
        <div class="hidden lg:block">
          <slot name="sidebar-sec-2" />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-9 space-y-10">
        <slot />
      </div>
    </section>

    <section class="fixed lg:hidden -bottom-1 right-0 z-20 w-full">
      <PageMenu2 />
    </section>
  </main>
</template>
