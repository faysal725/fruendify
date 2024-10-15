<script setup>
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { useCrud } from "~~/composables/base";
import { useProfileStore } from "~~/stores/profileStore";

definePageMeta({
  middleware: ["auth", "profilecompletion", "imageverify"],
});

// apis
const notificationListApi = api() + "/api/notification/list";
let notificationStatusUpdateApi = api() + "/api/notification/status/update/";
const unreadNotificationListApi = api() + "/api/notification/unread/list";

// store
const profileStore = useProfileStore();

// socket section
const { $socketio } = useNuxtApp();

// {{base_url}}/api/notification/unread/list
const crud = useCrud();

const notifications = ref([{ user_name: "Ralph Edwards", event: "" }]);
const currentTab = ref("all");
const notificationData = ref([]);
const unreadNotificationData = ref([]);

const loaderState = ref();
const updateKey = ref(123)

// functions

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const getNotificationData = async () => {
  notificationData.value = [];
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

const getUnreadNotificationData = async () => {
  notificationData.value = [];
  loaderState.value = "pending";
  await crud.index({ path: unreadNotificationListApi }).then((res) => {
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

// lifecycle hook
onMounted(async () => {
  getNotificationData();
});

// onMounted(() => {
//   console.log(profileStore.profileData._id)
//   $socketio.on("notification", (data) => {
//     console.log("Received message:", data);
//     // detailsData.value.push(data);
//     // console.log(detailsData.value, "msg history");
//   });

//   $socketio.emit("join-new-room", profileStore.profileData._id);
// });

console.log(profileStore.profileData._id)
  $socketio.on( profileStore.profileData._id, (data) => {
    console.log("Received message:", data);
    notificationData.value.unshift(data)
    console.log(notificationData.value);
  });


watch(
  () => currentTab.value,
  () => {
    if (currentTab.value == "all") {
      getNotificationData();
    } else {
      getUnreadNotificationData();
    }
  }
);
</script>
<template>
  <NuxtLayout name="verified" classes="max-h-screen overflow-hidden">
    <main class="grid grid-cols-12">
      <div
        class="hidden lg:block col-span-3 min-h-screen bg-whitePrimary dark:bg-blackPrimary"
      ></div>

      <div
        class="col-span-12 lg:col-span-9 min-h-screen flex justify-center items-start bg-whiteSecondary dark:bg-blackSecondary"
      >
        <div
          class="bg-whitePrimary dark:bg-blackPrimary p-4 pt-0 h-full md:min-h-[90vh] md:my-4 rounded-xl overflow-y-scroll scrollbar-hide w-full md:w-[500px] md:min-w-60"
        >
          <section
            class="sticky top-0 right-0 bg-whitePrimary pt-4 dark:bg-blackPrimary h-fit"
          >
            <div class="flex justify-between pb-5">
              <div class="flex items-center gap-x-2">
                <ButtonBack />
                <p class="text-xl font-semibold dark:text-slate-200">
                  Notifications
                </p>
              </div>

              <div class="flex items-center gap-4">
                <ButtonDarkMode />
                <ButtonDot :isHorizontal="true" />
              </div>
            </div>

            <div class="flex gap-2 pb-2">
              <div
                class="cursor-pointer p-1 px-4 rounded-full font-semibold text-sm md:text-base"
                :class="
                  currentTab == 'all'
                    ? 'bg-whiteSecondary text-primary '
                    : 'bg-transparent dark:text-slate-200'
                "
                @click="currentTab = 'all'"
              >
                All
              </div>
              <div
                class="cursor-pointer p-1 px-4 rounded-full font-semibold text-sm md:text-base"
                :class="
                  currentTab == 'unread'
                    ? 'bg-whiteSecondary text-primary'
                    : 'bg-transparent dark:text-slate-200'
                "
                @click="currentTab = 'unread'"
              >
                Unread
              </div>
            </div>
          </section>

          <section class="space-y-5">
            
            <div :key="updateKey" class="space-y-2">
              <p class="text-base md:text-xl font-base dark:text-slate-200">
                New
              </p>
              <div v-if="notificationData.length > 0" class="max-h-[70vh] overflow-y-scroll scrollbar-hide">
                <CardsNotification
                  v-for="data in notificationData"
                  :notificationData="data"
                  @seen-request="(id) => sendSeenRequest(id)"
                />
              </div>
              <div v-else class="space-y-4 text-red-500 text-xs text-center">
                <p class="pt-10">No Item to show</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
