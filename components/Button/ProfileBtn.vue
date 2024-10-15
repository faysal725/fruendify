<script setup>
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  XCircleIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/solid";
import { BellIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
import { useCrud } from "~~/composables/base";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  showProfileOnly: {
    type: Boolean,
    default: false,
  },
});

const logoutApi = api() + "/api/auth/logout";

const crud = useCrud();

const profileStore = useProfileStore();
const { clearProfileData } = profileStore;

const authStore = useAuthStore();
const { clearAuthUser } = authStore;

const showToolTip = ref(false);
const router = useRouter();

const profileDropdown = ref(null);

const showProfile = () => {
  // showToolTip.value = true
  // showToolTip.value ? showToolTip.value = false : showToolTip.value = true

  if (showToolTip.value) {
    showToolTip.value = false;
  } else {
    showToolTip.value = true;
  }
};

onClickOutside(profileDropdown, (event) => (showToolTip.value = false));

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const logoutUser = async () => {
  await crud
    .store({
      body: {},
      path: logoutApi,
    })
    .then((res) => {
      if (res.status == 422) {
        clearProfileData();
        clearAuthUser();
        showToast("Logout successful");
        router.push("/");
      }
      if (res.status == 200) {
        clearProfileData();
        clearAuthUser();
        showToast("Logout successful");
        router.push("/");
      }
    });
};

function profileImageLink() {
  let link;

  if (authStore.userDataAfterLogin) {
    link = api() + "/" + authStore.userDataAfterLogin.profile_image;
  } else {
    link = "#";
  }
  return link;
}
</script>
<template>
  <div class="hidden md:flex items-center justify-center gap-5 relative">
    <ButtonLogin
      v-if="!showProfileOnly"
      name="Create Event"
      classes=" bg-primary text-lg font-normal text-black px-7 rounded-full text-white"
      @click="router.push('/events/create')"
    />

    <div
      class="flex gap-3 justify-center items-center cursor-pointer"
      v-if="!showProfileOnly"
      @click="router.push('/messages')"
    >
      <img src="../../assets/images/menu/message.png" alt="" class="h-5 w-5" />
      <BellIcon class="h-5 w-5 text-mediumBlack" />
    </div>
    <button @click="showProfile()">
      <!-- <img
        :src="profileImageLink()"
        alt=""
        class="h-10 w-10 rounded-full object-cover"
      /> -->
      <img
          v-if="profileStore.profileData"
          :src="
            networkImage(
              profileStore.profileData
                ? profileStore.profileData.profile_image
                : '#'
            )
          "
          alt=""
          class="h-10 w-10 rounded-full object-cover"
        />
        <UserCircleIcon
          v-else
          class="h-14 w-14 text-slate-700 dark:text-slate-200"
        />
    </button>

    <!-- profile section  -->
    <div
      ref="profileDropdown"
      v-show="showToolTip"
      class="absolute transition-all bg-white dark:bg-blackPrimary duration-150 top-14 right-0 z-50 border border-gray-400/50 shadow-2xl rounded-sm p-4 space-y-5 divide-y-2"
    >
      <div class="flex justify-center flex-col items-center space-y-3">
        <img
          v-if="profileStore.profileData"
          :src="
            networkImage(
              profileStore.profileData
                ? profileStore.profileData.profile_image
                : '#'
            )
          "
          alt=""
          class="h-14 w-14 rounded-full object-cover"
        />
        <UserCircleIcon
          v-else
          class="h-14 w-14 text-slate-700 dark:text-slate-200"
        />
        <div class="text-center">
          <p
            class="text-xl text-mediumBlack dark:text-slate-200 font-semibold capitalize"
          >
            {{
              authStore.userDataAfterLogin
                ? authStore.userDataAfterLogin.first_name
                : "None"
            }}
          </p>
          <p class="text-base text-gray-600 dark:text-slate-200 font-normal">
            {{
              authStore.userDataAfterLogin
                ? authStore.userDataAfterLogin.email
                : "No Email"
            }}
          </p>
        </div>
      </div>

      <div
        class="flex justify-center flex-col items-start space-y-3 pt-2 min-w-60"
      >
        <p
          class="text-mediumBlack hover:border-b hover:border-b-2 border-slate-200 py-1 w-full dark:text-slate-200 font-medium cursor-pointer"
          @click="router.push('/profile')"
        >
          Freundify profile
        </p>
        <p
          class="text-mediumBlack hover:border-b hover:border-b-2 border-slate-200 py-1 w-full dark:text-slate-200 font-medium cursor-pointer"
        >
          Settings
        </p>
        <p
          class="text-mediumBlack hover:border-b hover:border-b-2 border-slate-200 py-1 w-full dark:text-slate-200 font-medium cursor-pointer"
          @click="logoutUser()"
        >
          Logout
        </p>
      </div>
    </div>
  </div>
</template>
