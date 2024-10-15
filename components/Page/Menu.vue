<script setup>
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "~~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
import { useCrud } from "~~/composables/base";
import { onClickOutside, useGeolocation } from "@vueuse/core";
import { useImageStore } from "~~/stores/imageStore";

const logoutApi = api() + "/api/auth/logout";

const crud = useCrud();

const authStore = useAuthStore();
const { clearAuthUser, setStep } = authStore;

const profileStore = useProfileStore();
const { clearProfileData, setCoordinates } = profileStore;

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages, clearImages } = imageStore;

const currentModal = ref()

const { coords, locatedAt, error, resume, pause } = useGeolocation();
const locationLoaderState = ref(false);

// if (process.client) {
//   // get geolocation
//   window.location.reload(true);
// }

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

const router = useRouter();

let showSidebar = ref(false);
let registerUser = ref(false);
let loginUser = ref(false);
let forgetPassword = ref(false);
let authenticated = ref(authStore.isLoggedIn);

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const change = async (authType) => {
  currentModal.value = authType
  clearAuthUser();
  clearProfileData();
  clearImages();
  setStep(1);
  console.log(profileStore.latitude, profileStore.longitude);
  console.log(
    profileStore.latitude,
    isFinite(profileStore.latitude),
    profileStore.longitude,
    isFinite(profileStore.longitude),
    profileStore.timezone
  );
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
    console.log("this is second");
    collectCoords();
    // alert('Please enable browser location.')
  }
};

const close = () => {
  registerUser.value = false;
  loginUser.value = false;
  forgetPassword.value = false;
};

const logoutUser = async () => {
  console.log("asdfasdfsdf");
  await crud
    .store({
      body: {},
      path: logoutApi,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 422) {
        clearProfileData();
        clearAuthUser();
        showToast("Logout successful");
        showSidebar.value = false;
        router.push("/");
      }
      if (res.status == 200) {
        clearProfileData();
        clearAuthUser();
        showToast("Logout successful");
        showSidebar.value = false;
        router.push("/");
      }
    });
};

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

// onMounted(() => {
//   setTimeout(() => {
//     if (
//       coords.value.latitude !== Number.POSITIVE_INFINITY &&
//       coords.value.longitude !== Number.POSITIVE_INFINITY
//     ) {
//       setCoordinates(coords.value.latitude, coords.value.longitude);
//     }
//   }, 100);
// });

watch(
  () => authStore.isLoggedIn,
  () => {
    authenticated.value = authStore.isLoggedIn;
  },
  { deep: true }
);
</script>

<template>
  <section class="menu-container">
    <div class="menu-sections-container">
      <NuxtLink to="/">
        <img src="../../assets/images/logo/logo.png" alt="" class="menu-logo" />
      </NuxtLink>
      <ul
        class="items-center gap-x-6 font-medium text-mediumBlack hidden sm:flex"
      >
        <li class="text-base">
          <NuxtLink to="/events">Events</NuxtLink>
        </li>
        <li class="text-base">
          <NuxtLink to="/messages">Messages</NuxtLink>
        </li>
        <!-- <li class="text-base"><NuxtLink to="/place">Place</NuxtLink></li> -->
      </ul>
      <!-- {{ profileStore.latitude }} -->
      <div v-if="!locationLoaderState" class="flex gap-x-4 items-center">
        <ButtonProfileBtn v-if="authenticated" />
        <ButtonLogin
          v-if="!authenticated"
          name="Login"
          classes="text-sm bg-primary hidden sm:block px-6 p-1 rounded-full text-white"
          @click="change('login')"
        />
        <ButtonLogin
          v-if="!authenticated"
          name="Sign up"
          classes="text-sm bg-secondary hidden sm:block px-6 p-1 rounded-full text-white"
          @click="change('register')"
        />
        <button
          v-if="authenticated"
          @click="showSidebar = !showSidebar"
          class="block sm:hidden"
        >
          <Bars3Icon class="h-8 w-8 text-secondary" />
        </button>
      </div>

      <div v-else class="flex items-center">
        <span class="relative flex">
          <p class="text-xs text-primary">Collecting your location</p>
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
          ></span>
        </span>
      </div>

      <!-- sidebar  -->
      <div
        class="fixed h-full w-full bg-gradient-to-b from-secondary to-primary top-0 right-0 transition-all duration-200"
        :class="showSidebar ? 'left-sidebar-active' : 'left-sidebar-inactive'"
      >
        <div
          class="w-full h-full flex flex-col justify-start items-center fixed gap-20"
        >
          <div
            v-if="authenticated && authStore?.userDataAfterLogin"
            class="mt-28 flex flex-col items-center gap-4"
          >
            <!-- {{ authStore.userDataAfterLogin.profile_image }} -->
            <NuxtLink
              :to="'/profile'"
              class="bg-white rounded-full p-0.5 w-fit"
            >
              <img
                :src="
                  networkImage(authStore?.userDataAfterLogin?.profile_image)
                "
                alt=""
                class="h-20 w-20 rounded-full object-cover"
              />
            </NuxtLink>
            <div>
              <p class="text-xl text-center text-white">
                Welcome <br />
                <span class="text-2xl capitalize">{{
                  authStore?.userDataAfterLogin?.first_name
                }}</span>
              </p>
            </div>
          </div>
          <ul class="flex flex-col gap-y-5 text-white my-auto mt-5">
            <!-- <NuxtLink class="text-2xl text-center underline" to="/"
              >Home</NuxtLink
            > -->
            <NuxtLink class="text-2xl text-center" to="/events"
              >Events</NuxtLink
            >
            <NuxtLink class="text-2xl text-center" to="/messages"
              >Messages</NuxtLink
            >
            <!-- <NuxtLink class="text-2xl text-center" to="/">Place</NuxtLink> -->
            <div
              class="text-2xl text-center cursor-pointer"
              @click="logoutUser()"
            >
              Logout
            </div>
            <!-- <div class="flex flex-col items-center gap-2 pt-5">
              <ButtonLogin name="Login" classes="text-sm bg-primary" />
              <p>Or</p>
              <ButtonLogin name="Sign up" classes="text-sm bg-secondary " />
            </div> -->
          </ul>
        </div>

        <button @click="showSidebar = false" class="absolute top-10 right-6">
          <XMarkIcon class="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  </section>

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
