<script setup>
import { useMediaQuery } from "@vueuse/core";
import { useAuthStore } from "~~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
import { onClickOutside, useGeolocation } from "@vueuse/core";
import { useImageStore } from "~~/stores/imageStore";

const authStore = useAuthStore();
const { clearAuthUser, setStep } = authStore;

const profileStore = useProfileStore();
const { clearProfileData, setCoordinates } = profileStore;

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages, clearImages } = imageStore;

const currentModal = ref()

const { coords, locatedAt, error, resume, pause } = useGeolocation();
const locationLoaderState = ref(false);

const crud = useCrud();

onMounted(() => {
  navigator.permissions.query({ name: "geolocation" }).then((res) => {
    console.log(res);
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (res.state == "granted") {
      // get geolocation
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      console.log(timezone, "time zone");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords, "time ");
          await setCoordinates(latitude, longitude, timezone);
          // await change("login")
          console.log(position.coords, coords);
        },
        (error) => {
          console.log(error);
          location.value = error;
        }
      );
      console.log("finish");
    } else if (res.state == "prompt") {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
          const { latitude, longitude } = position.coords;

          await setCoordinates(latitude, longitude, timezone);
          // await change("login");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // alert("please enable browser location and reload")
    }
  });
});

import img1 from "../../assets/images/mobileHeroSection/1.png";
import img2 from "../../assets/images/mobileHeroSection/2.png";
import img3 from "../../assets/images/mobileHeroSection/3.png";
import img4 from "../../assets/images/mobileHeroSection/4.png";
import img5 from "../../assets/images/mobileHeroSection/5.png";

const users = [
  { imgSrc: img1 },
  { imgSrc: img2 },
  { imgSrc: img3 },
  { imgSrc: img5 },
];

const users2 = [
  { imgSrc: img1 },
  { imgSrc: img2 },
  { imgSrc: img3 },
  { imgSrc: img5 },
  { imgSrc: img1 },
  { imgSrc: img2 },
  { imgSrc: img3 },
  { imgSrc: img5 },
];
const isLargeScreen = useMediaQuery("(min-width: 1024px)");

let registerUser = ref(false);
let loginUser = ref(false);

let forgetPassword = ref(false);
let authenticated = ref(authStore.isLoggedIn);

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const titleText = ref(["Coffee Partner", "New Friend"]);
const activeIndex = ref(0);
let showSmallSlider = ref(true);

function titleChanger() {
  setInterval(() => {
    activeIndex.value == 0 ? (activeIndex.value = 1) : (activeIndex.value = 0);
  }, 3050);
}

const change = (authType) => {
  currentModal.value = authType
  clearAuthUser();
  clearProfileData();
  clearImages();
  setStep(1);
  // console.log(profileStore.latitude, profileStore.longitude);
  // console.log(
  //   profileStore.latitude,
  //   isFinite(profileStore.latitude),
  //   profileStore.longitude,
  //   isFinite(profileStore.longitude),
  //   profileStore.timezone
  // );
  if (
    profileStore.latitude &&
    isFinite(profileStore.latitude) &&
    profileStore.longitude &&
    isFinite(profileStore.longitude) &&
    profileStore.timezone
  ) {
    if (authType == "login") {
      loginUser.value = true;
    } else {
      registerUser.value = true;
    }
  } else {
    collectCoords();
  }
};

const close = () => {
  registerUser.value = false;
  loginUser.value = false;
  forgetPassword.value = false;
};

titleChanger();

async function collectCoords() {
  navigator.permissions.query({ name: "geolocation" }).then((res) => {
    locationLoaderState.value = true;
    console.log(res);
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (res.state == "granted") {
      // get geolocation

      console.log(timezone, "time zone");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords, "time ");
          await setCoordinates(latitude, longitude, timezone);
          await change(currentModal.value)
          console.log(position.coords, coords);
          locationLoaderState.value = false;
        },
        (error) => {
          console.log(error);
          location.value = error;
          locationLoaderState.value = false;
        }
      );
      console.log("finish");
    } else if (res.state == "prompt") {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
          const { latitude, longitude } = position;

          await setCoordinates(latitude, longitude, timezone);
          await change(currentModal.value)
          locationLoaderState.value = false;
        },
        (error) => {
          console.log(error);
          locationLoaderState.value = false;
          showToast("Please enable browser location.");
        }
      );
    } else {
      locationLoaderState.value = false;
      showToast("Please enable browser location.");
    }
  });
}

watch(
  () => authStore.isLoggedIn,
  () => {
    authenticated.value = authStore.isLoggedIn;
  },
  { deep: true }
);
</script>

<template>
  <main
    class="mb-10 md:pb-0 h-[90vh] flex flex-col gap-y-10 relative overflow-hidden"
  >
    <section class="grow flex gap-2 justify-start relative mx-auto">
      <PageVerticalImageSlider
        :usersData="users2"
        title="userData3"
        zIndex="z-30"
        :imgWidth="100"
        :isReverse="false"
        @mouseover="showSmallSlider = false"
        @mouseleave="showSmallSlider = true"
      />

      <PageVerticalImageSlider
        :usersData="users2"
        title="userData3"
        zIndex="z-30"
        :imgWidth="100"
        :isReverse="true"
        @mouseover="showSmallSlider = false"
        @mouseleave="showSmallSlider = true"
      />

      <PageVerticalImageSlider
        :usersData="users"
        title="userData3"
        zIndex="z-30"
        :imgWidth="100"
        :isReverse="false"
        @mouseover="showSmallSlider = false"
        @mouseleave="showSmallSlider = true"
      />
    </section>

    <div
      class="sticky -bottom-0.5 right-0 w-full z-30 bg-white flex justify-start flex-col items-center px-4 before:absolute before:-top-24 before:right-0 before:w-full before:h-28 before:bg-gradient-to-b before:from-transparent before:to-white before:-z-10"
      :class="authenticated ? 'h-96' : 'h-96'"
    >
      <img
        src="../../assets/images/logo/logoMobile.svg"
        alt=""
        class="-mt-20"
      />
      <p
        class="text-2xl font-medium text-center"
        :class="!locationLoaderState ? 'py-10' : 'py-4'"
      >
        Meet your next <span class="text-primary">Beach Buddy</span>
      </p>

      <div
        v-if="!locationLoaderState"
        class="space-y-3 w-full h-full flex flex-col justify-start"
      >
        <ButtonLarge
          v-if="!authenticated"
          :name="'Register'"
          classes="bg-mediumBlack text-white  font-semibold"
          @click="change('register')"
        />
        <ButtonLarge
          v-if="!authenticated"
          :name="'Log in'"
          classes="bg-transparent text-mediumBlack font-semibold"
          @click="change('login')"
        />
      </div>

      <div v-else class="flex items-center pb-5">
        <span class="relative flex">
          <p class="text-xs text-primary">Collecting your location</p>
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
          ></span>
        </span>
      </div>
      <p class="mt-auto text-center text-xs">
        By continuing, you agree to the Terms of Service and confirm that you
        have read our <span class="font-bold">Privacy Policy</span>.
      </p>
    </div>
  </main>

  <ContainerRegister
    :shouldOpenModal="registerUser"
    @update-input="close"
    @open-register="registerUser = true"
    @open-login="loginUser = true"
  />
  <ContainerLogin
    :shouldOpenModal="loginUser"
    @update-input="close"
    @forget-pass="
      () => {
        close();
        forgetPassword = true;
      }
    "
    @open-registration="
      () => {
        console.log('registration opening');
        close();
        registerUser = true;
      }
    "
  />
  <ContainerForgetPassword
    :shouldOpenModal="forgetPassword"
    @update-input="close"
  />
</template>
