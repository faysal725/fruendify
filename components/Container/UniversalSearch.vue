<script setup>
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  XCircleIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/solid";
import { BellIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "~~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
import { useSearchStore } from "~~/stores/searchStore";
import { onClickOutside, useGeolocation } from "@vueuse/core";
import { useCrud } from "~~/composables/base";
import { useTabStore } from "~~/stores/tabStore";

const props = defineProps({
  classes: {
    type: String,
    default: "bg-whiteSecondary dark:bg-blackSecondary",
  },
});

// apis
const notificationListApi = api() + "/api/notification/list";
let notificationStatusUpdateApi = api() + "/api/notification/status/update/";

const crud = useCrud();

const route = useRoute()
const router = useRouter()

// store
const authStore = useAuthStore();

const profileStore = useProfileStore();
const { clearProfileData } = profileStore;

const searchStore = useSearchStore();
const { clearSearchData, setSearchData } = searchStore;

const { getCurrentTab, setCurrentTab } = useTabStore();


// socket section
const { $socketio } = useNuxtApp();


const { coords } = useGeolocation();

let authenticated = ref(authStore.isLoggedIn);

const showNotificationBar = ref(false);
const newNotificationHasCome =ref(false)

const notificationPanel = ref(null);
const notificationData = ref([]);

const searchString = ref({});

const loaderState = ref();
let key = ref(1234);

onClickOutside(
  notificationPanel,
  (event) => (showNotificationBar.value = false)
);
const getNotificationData = async () => {
  newNotificationHasCome.value = false
  showNotificationBar.value = true;
  loaderState.value = "pending";
  await crud.index({ path: notificationListApi }).then((res) => {
    if (res.status == 200) {
      if (res.res.data.data.length > 0) {
        notificationData.value = [...res.res.data.data];
      }
      console.log(notificationData.value);
      loaderState.value = "resolved";
    } else {
      loaderState.value = "failed";
    }
  });
};

const sendSeenRequest = async (id) => {
  await crud
    .store({
      body: "",
      path: notificationStatusUpdateApi + id,
    })
    .then((res) => {
      if (res.status == 200) {
        getNotificationData();
      }
    });
};

const submitFilter = async () => {
  // filterStore.formData["search"] = searchString.value;
  // console.log(searchString.value);

  setSearchData(searchString.value);

  // setCallFilterApi(true);
};

  $socketio.on( profileStore.profileData._id, (data) => {
    if (!showNotificationBar.value) {
      newNotificationHasCome.value = true
    }
    console.log("Received message:", data);
    notificationData.value.unshift(data)
    console.log(notificationData.value);
  });

watch(
  () => authStore.isLoggedIn,
  () => {
    authenticated.value = authStore.isLoggedIn;
  },
  { deep: true }
);

watch(
  () => searchString.value,
  () => {
    submitFilter();
  },
  { deep: true }
);

watch(
  () => searchStore.searchData,
  () => {
    if (searchStore.searchData == "") {
      searchString.value = "";
      key.value++;
    }
  },
  { deep: true }
);
</script>

<template>
  <section class="relative">
    <div class="flex flex-col md:flex-row justify-between items-center gap-5 relative z-40">

      <!-- <PageSearchbar
      v-if="route.name == 'events'"
        :key="key"
        v-model="searchString"
        classes="h-8 rounded-full border border-lightGrey px-5 flex items-center w-full md:max-w-52 bg-white"
      /> -->

      <div class="flex gap-3 items-center ml-auto">
        <ButtonDarkMode />

        <div
          class="flex items-center gap-1 group cursor-pointer w-fit rounded-lg transition-all duration-500 relative"
          @click="getNotificationData"
        >
          <BellIcon
            class="h-6 w-6 transition-all duration-150 dark:text-white hover:scale-110"
          />
          <span v-if="newNotificationHasCome" class="absolute bg-primary h-2 w-2 rounded-full top-1 -right-0">
          </span>
        </div>

        <NuxtLink
          to="/events/create"
          class="flex bg-primary h-8 w-32 text-white rounded-2xl px-4 text-sm gap-2 items-center justify-center"
        >
          <p>Create Event</p>
        </NuxtLink>

        <NuxtLink :to="'/profile'" class="block md:hidden">
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
        </NuxtLink>

        <ButtonProfileBtn v-if="authenticated" :showProfileOnly="true" />
      </div>
    </div>

    <div
      ref="notificationPanel"
      class="absolute -top-0 right-0 h-96 w-full max-w-96 overflow-y-scroll bg-whitePrimary dark:bg-blackPrimary transition-all duration-200 scrollbar-hide border border-t-0 dark:border-slate-500/50 rounded-b-lg z-50 cursor-default"
      :class="
        showNotificationBar
          ? ' translate-y-16 scale-y-full'
          : '-translate-y-32 scale-y-0'
      "
    >
      <div
        class="flex justify-between items-center px-3 sticky top-0 right-0 bg-whitePrimary dark:bg-blackPrimary z-20 border-b dark:border-b-slate-500/50"
      >
        <p class="text-lg font-bold py-3 dark:text-white">
          Latest Notifications
        </p>
        <NuxtLink to="/notifications">
          <p class="text-sm underline dark:text-white">See all</p>
        </NuxtLink>
      </div>
      <CardsNotification2
        v-for="data in notificationData"
        :notificationData="data"
        @seen-request="(id) => sendSeenRequest(id)"
      />
    </div>
  </section>
</template>

<!-- :class="showNotificationBar ? ' translate-x-16 ' : 'translate-x-full '" -->
