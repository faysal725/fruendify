<script setup>
import {
  XCircleIcon,
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/solid";
import { useMessageDetailsStore } from "~~/stores/messageDetailsStore";
import { useCrud } from "~~/composables/base";

definePageMeta({
  middleware: ["auth", "profilecompletion", "imageverify"],
});

// api
let messageListApi = api() + "/api/event/events-groups";
let messageDetailsApi = api() + "/api/conversation/list/";

// crud
const crud = useCrud();

// stores
const eventMessageStore = useMessageDetailsStore();
const {
  getCurrentMessageDetails,
  setCurrentGroupDetails,
  setCurrentMessageDetails,
  clearMessageDetailsData,
  setLoaderState,
  setShouldReload,
  getLoaderState,
} = useMessageDetailsStore();

const locationCollected = ref(false);
const currentTab = ref("group");
const modalShouldOpen = ref(false);

const allProfiles = [
  {
    name: "Peter Pan",
    message: "Hi, How are you? Nice to meet you?",
    profilePic: "/profileImg/1.png",
    last_online: "3:45 PM",
    status: "online",
  },
  {
    name: "Peter Pan",
    message: "Hi, How are you? Nice to meet you?",
    profilePic: "/profileImg/2.png",
    last_online: "3:45 PM",
    status: "offline",
  },
  {
    name: "Peter Pan",
    message: "Hi, How are you? Nice to meet you?",
    profilePic: "/profileImg/3.png",
    last_online: "3:45 PM",
    status: "online",
  },
  {
    name: "Peter Pan",
    message: "Hi, How are you? Nice to meet you?",
    profilePic: "/profileImg/4.png",
    last_online: "3:45 PM",
    status: "online",
  },
  {
    name: "Peter Pan",
    message: "Hi, How are you? Nice to meet you?",
    profilePic: "/profileImg/5.png",
    last_online: "3:45 PM",
    status: "online",
  },
];

const allGroups = ref();

const activeRoom = ref({
  name: "Group Name",
  message: "Hi, How are you? Nice to meet you?",
  profilePic: "/profileImg/1.png",
  last_online: "3:45 PM",
  status: "online",
  joiners: [
    "/profileImg/1.png",
    "/profileImg/2.png",
    "/profileImg/3.png",
    "/profileImg/4.png",
    "/profileImg/4.png",
  ],
  chatHistory: [
    {
      imgSrc: "/profileImg/1.png",
      name: "People Name",
      time: "2:55 PM",
      msg: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄",
    },
    {
      imgSrc: "/profileImg/2.png",
      name: "People Name",
      time: "2:55 PM",
      msg: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄",
    },
    {
      imgSrc: "/profileImg/3.png",
      name: "People Name",
      time: "2:55 PM",
      msg: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄",
    },
    {
      imgSrc: "/profileImg/1.png",
      name: "People Name",
      time: "2:55 PM",
      msg: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄",
    },
    {
      imgSrc: "/profileImg/1.png",
      name: "People Name",
      time: "2:55 PM",
      msg: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄",
    },
    {
      imgSrc: "/profileImg/1.png",
      name: "People Name",
      time: "2:55 PM",
      msg: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄",
    },
  ],
});

let allTabs = [
  { key: 1, value: "All Message" },
  { key: 2, value: "Group" },
];

const detailsData = ref();

const showmap = () => {
  if (locationCollected.value) {
    locationCollected.value = false;
  } else {
    locationCollected.value = true;
  }
};

function openModal() {
  // layout.value.layoutRef.modalOpener();
  modalShouldOpen.value = true;
}

function closeModal() {
  // layout.value.layoutRef.modalCloser();
  modalShouldOpen.value = false;
}

const getPublicData = async () => {
  // loaderState.value = "pending";
  setLoaderState("pending");
  await crud.index({ path: messageListApi }).then((res) => {
    if (res.status == 200) {
      console.log(res.res.data.data, "runn");
      // saveProfileData(res.res.data)
      allGroups.value = res.res.data.data;

      setLoaderState("resolved");
    } else {
      // loaderState.value = "failed";
      setLoaderState("failed");
    }
  });
};

const getMessageDetailsData = async (id, details) => {
  setCurrentGroupDetails(id, details);
  // setLoaderState("pending");
  // await crud.index({ path: messageDetailsApi + id }).then((res) => {
  //   if (res.status == 200) {
  //     console.log(details)
  //     // detailsData.value = res.res.data;
  //     setCurrentGroupDetails(details)
  //     // setCurrentMessageDetails(id, res)

  //     setLoaderState("resolved");
  //   } else {
  //     setLoaderState("failed");
  //   }
  // });
};

onMounted(() => {
  // setTimeout(() => {
  //   allGroups.value = [
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/1.png",
  //       last_online: "3:45 PM",
  //       status: "online",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/2.png",
  //       last_online: "3:45 PM",
  //       status: "offline",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/3.png",
  //       last_online: "3:45 PM",
  //       status: "online",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/4.png",
  //       last_online: "3:45 PM",
  //       status: "online",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/5.png",
  //       last_online: "3:45 PM",
  //       status: "online",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/5.png",
  //       last_online: "3:45 PM",
  //       status: "online",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/5.png",
  //       last_online: "3:45 PM",
  //       status: "online",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //     {
  //       name: "Group Name",
  //       message: "Hi, How are you? Nice to meet you?",
  //       profilePic: "/profileImg/5.png",
  //       last_online: "3:45 PM",
  //       status: "online",
  //       joiners: [
  //         "/profileImg/1.png",
  //         "/profileImg/2.png",
  //         "/profileImg/3.png",
  //         "/profileImg/4.png",
  //         "/profileImg/4.png",
  //       ],
  //     },
  //   ];
  // }, 3000);
  getPublicData();
});

onUnmounted(() => {
  clearMessageDetailsData();
});

watch(
  () => eventMessageStore.shouldReload,
  () => {
    if (eventMessageStore.shouldReload) {
      getPublicData();
    }
  }
);
</script>

<template>
  <NuxtLayout name="verified" classes="max-h-screen overflow-hidden">
    <div class="grid grid-cols-12">
      <div
        class="col-span-12 lg:col-span-3 px-4 min-h-screen bg-whitePrimary dark:bg-blackPrimary"
      >
        <div class="flex lg:hidden items-center py-5 gap-3">
          <ButtonBack />
          <p class="text-base font-bold dark:text-white">All Messages</p>
          <!-- <AdjustmentsHorizontalIcon
            @click="openModal"
            class="h-8 w-8 text-primary ml-auto"
          /> -->
        </div>

        <div v-if="currentTab == 'messages'" class="space-y-2 pt-5">
          <CardsMessage v-for="data in allProfiles" :msgData="data" />
        </div>

        <div
          v-else
          class="flex flex-col gap-4 h-[80vh] lg:h-[800px] overflow-y-scroll scrollbar-hide relative"
        >
          <div
            class="flex justify-between items-start flex-col gap-6 sticky top-0 right-0 bg-whitePrimary dark:bg-blackPrimary py-5"
          >
            <p class="hidden lg:block text-base font-bold dark:text-white">
              All Messages
            </p>
            <!-- <PageSearchbar
              classes="h-8 rounded-full border border-lightGrey px-5 flex items-center w-full font-base bg-[#FBFBFB]"
            /> -->
          </div>
          <div class="flex lg:hidden flex-col gap-4">
            <SkeletonMsgGroupCards :loaderState="eventMessageStore.loaderState">
              <CardsGroupMsg
                @click="
                  () => {
                    setCurrentGroupDetails(data.event._id, data);
                    openModal();
                  }
                "
                v-for="data in allGroups"
                :msgData="data"
              />
            </SkeletonMsgGroupCards>
            <!-- <div v-if="!allGroups.length" class="space-y-4 text-red-500 text-xs text-center">
              <p class="pt-10">No Item to show</p>
            </div> -->
          </div>

          <div class="hidden lg:flex flex-col gap-4">
            <SkeletonMsgGroupCards :loaderState="eventMessageStore.loaderState">
              <CardsGroupMsg
                v-for="data in allGroups"
                :msgData="data"
                @click="() => setCurrentGroupDetails(data.event._id, data)"
              />
            </SkeletonMsgGroupCards>
          </div>
        </div>
      </div>

      <section
        class="hidden lg:block col-span-12 lg:col-span-9 max-h-screen lg:-mt-4"
      >
        <section class="max-w-7xl mx-auto gap-6">
          <div class="w-full px-4 lg:px-20 pb-5">
            <ContainerUniversalSearch />
          </div>

          <ContainerMessageBox />
        </section>
      </section>

      <!-- modal  -->
      <PanelBottom
        :shouldOpen="modalShouldOpen"
        @update-input="modalShouldOpen = false"
      >
        <ContainerMessageBox />
      </PanelBottom>
    </div>
  </NuxtLayout>
</template>

<style scoped>
input::placeholder {
  text-align: start;
}
</style>
