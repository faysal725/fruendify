<script setup>
import {
  ArrowLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { useDateFormat, useNow } from "@vueuse/core";
import { useCrud } from "~~/composables/base";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";
import { useNexteventStore } from "~~/stores/nextEventStore";
import { useImageStore } from "~~/stores/imageStore";
import { useTimerStore } from "~~/stores/timerStore";
import { useProfileStore } from "~~/stores/profileStore";

definePageMeta({
  middleware: ["auth", "profilecompletion"],
});

const route = useRoute();
const id = route.params.id;

// apis
const detailsApi = api() + "/api/event/details/" + id;
let joinRequestApi = api() + "/api/event/join/" + id;
let nextEventApi = api() + "/api/event/single/discover-events";



const updateApi = api() + "/api/event/update";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let dietOptionApi = api() + "/api/public/diet";
let languageOptionApi = api() + "/api/public/language";
let educationOptionApi = api() + "/api/public/education";
let categoryOptionApi = api() + "/api/public/categories";

const crud = useCrud();

const currentTime = useDateFormat(useNow(), "HH:mm:ss");


// store 
const nextEventStore = useNexteventStore()
const {setNextEventDetails, setnextLoaderState} = useNexteventStore()

const timerStore = useTimerStore();
const { setTimerState } = useTimerStore();

const profileStore = useProfileStore();
const { clearProfileData } = profileStore;

const eventList = ref([
  { id: 0, name: "Cycling", imgSrc: "/cycling.png" },
  { id: 1, name: "Boating", imgSrc: "/boating.png" },
  { id: 2, name: "dance", imgSrc: "/dance.png" },
  { id: 3, name: "drinking", imgSrc: "/drinking.png" },
]);

const loaderState = ref();
const expandComponent = ref(false);
const joinEvent = ref(false);
const eventDetails = ref();
const isOwnEvent = ref();

const eventRequirements = [
  { title: "Want to meet", value: "Men, Women" },
  { title: "Age Group", value: "24-32" },
  { title: "Preferred Language", value: "French, Germany, English" },
];

const joiners = [
  "/profileImg/1.png",
  "/profileImg/2.png",
  "/profileImg/3.png",
  "/profileImg/4.png",
  "/profileImg/4.png",
];

const modalShouldOpen = ref(false);
const showMap = ref(false);

function openModal() {
  // layout.value.layoutRef.modalOpener();
  modalShouldOpen.value = true;
}

function closeModal() {
  // layout.value.layoutRef.modalCloser();
  modalShouldOpen.value = false;
}

const toggleMap = (data) => {
  // body.value.status = data ? 1 : 0;

  showMap.value = data;
};

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

// initial data getting
const getInitialData = async () => {
  await setTimerState(false);
  setnextLoaderState("pending")
   
  
  // await crud.index({ path: detailsApi }).then((res) => {
  //   if (res.status == 200) {
  //     eventDetails.value = res.res.data;
  //     console.log(eventDetails.value, "initial value");
  //     loaderState.value = "resolve";

  //     if (eventDetails.value.user_uid._id == profileStore.profileData._id) {
  //       isOwnEvent.value = true;
  //     } else {
  //       isOwnEvent.value = false;
  //     }
  //     // isOwnEvent.value = profileStore
  //     setTimeout(() => {
  //       setTimerState(true);
  //     }, 1000);
  //   } else {
  //     loaderState.value = "failed";
  //   }
  // });

  eventDetails.value = nextEventStore.nextDetails.data[0]
  setnextLoaderState("resolve")
  

};


const getNextDetailsData = async () => {
  await setTimerState(false);
  setnextLoaderState("pending")
  // await crud.index({ path: detailsApi }).then((res) => {
  //   if (res.status == 200) {
  //     eventDetails.value = res.res.data;
  //     console.log(eventDetails.value, "initial value");
  //     loaderState.value = "resolve";

  //     if (eventDetails.value.user_uid._id == profileStore.profileData._id) {
  //       isOwnEvent.value = true;
  //     } else {
  //       isOwnEvent.value = false;
  //     }
  //     // isOwnEvent.value = profileStore
  //     setTimeout(() => {
  //       setTimerState(true);
  //     }, 1000);
  //   } else {
  //     loaderState.value = "failed";
  //   }
  // });

  eventDetails.value = res.res.data[0]


};

// send join req
const sendJoinRequest = async () => {
  await crud
    .store({
      body: "",
      path: joinRequestApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Request sended successfully");
        joinEvent.value = true;
        getInitialData();
      } else {
        showToast("Request sending failed");
      }
    });
};

onMounted(() => {
  if (nextEventStore.nextId) {
    getInitialData();
  }
  // getInitialData();
});

watch(
  () => expandComponent.value,
  () => {
    emit("sendData", expandComponent.value);
  }
);
</script>

<template>
  <NuxtLayout name="verified" classes="max-h-screen overflow-hidden">
    <div class="grid grid-cols-12 relative">
      <div
        class="col-span-12 col-span-3 min-h-screen cursor-default px-4 bg-whitePrimary dark:bg-blackPrimary z-20"
      >
        <div
          class="h-[80vh] lg:h-[90vh] overflow-y-scroll scrollbar-hide space-y-5"
        >
          <div class="space-y-3">
            <NuxtLink to="/events">
              <ButtonWithIcon
                name="Back to Events"
                classes="w-fit bg-black text-white flex p-2 px-4 flex-row-reverse items-center gap-3 rounded-full text-sm mt-5"
              >
                <ArrowLeftIcon class="h-5 w-5 text-white" />
              </ButtonWithIcon>
            </NuxtLink>
            <SkeletonName :loaderState="nextEventStore.nextLoaderState">
              <p
                class="text-base xl:text-lg font-semibold capitalize text-mediumBlack dark:text-slate-200"
              >
                {{ eventDetails?.title }}
              </p>
            </SkeletonName>

            <SkeletonName :loaderState="nextEventStore.nextLoaderState">
              <p
                class="text-sm xl:text-base capitalize text-darkGrey dark:text-slate-400 leading-loose"
              >
                {{ eventDetails?.short_description }}
              </p>
            </SkeletonName>
          </div>

          <SkeletonInterests :loaderState="nextEventStore.nextLoaderState">
            <section
              class="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2 gap-4 py-6"
            >
              <div
                v-for="data in eventDetails?.interests"
                class="flex items-center justify-center rounded-full px-4 py-1 rounded-3xl gap-3 border cursor-pointer"
              >
                <!-- <img :src="networkImage(data.image)" alt="" class="h-7 w-7" /> -->

                <img
                  v-if="data.image"
                  :src="networkImage(data.image)"
                  alt=""
                  class="h-7 w-7"
                />
                <p
                  class="text-center capitalize text-xs md:text-sm font-medium text-wrap dark:text-white"
                >
                  {{ data.title }}
                </p>
              </div>
            </section>
          </SkeletonInterests>

          <div>
            <p
              class="text-sm font-medium pb-3 text-mediumBlack dark:text-slate-200"
            >
              Want to meet
            </p>

            <div
              class="h-10 w-full p-4 block text-sm font-semibold text-gray-700 dark:text-slate-300 border bg-transparent border-gray-300 rounded-full focus:outline-none flex items-center capitalize"
            >
              {{ eventDetails ? eventDetails.gender : "" }}
            </div>
          </div>

          <div>
            <p
              class="text-sm font-medium pb-3 text-mediumBlack dark:text-slate-200"
            >
              Age Group
            </p>

            <div
              class="h-10 w-full p-4 block text-sm font-semibold text-gray-700 dark:text-slate-300 border bg-transparent border-gray-300 rounded-full focus:outline-none flex items-center"
            >
              {{ eventDetails?.start_age + ", " }}
              {{ eventDetails?.end_age }}
            </div>
          </div>

          <div>
            <p
              class="text-sm font-medium pb-3 text-mediumBlack dark:text-slate-200"
            >
              Preferred Language
            </p>

            <div
              class="h-10 w-full p-4 block text-sm font-semibold text-gray-700 dark:text-slate-300 border bg-transparent border-gray-300 rounded-full focus:outline-none flex items-center gap-2"
            >
              <span
                class="capitalize"
                v-for="(language, index) in eventDetails?.language"
              >
                {{ language.title
                }}{{ index <= eventDetails?.language.length ? "," : "" }}
              </span>
            </div>
          </div>

          <div class="block md:hidden">
            <img src="../../assets/images/event/map.png" alt="" />
          </div>
        </div>
      </div>

      <div
        class="col-span-12 col-span-9 max-h-screen lg:-mt-4 bg-whiteSecondary dark:bg-blackSecondary z-20 px-8"
      >
        <div class="pb-5">
          <ContainerUniversalSearch classes="bg-transparent" />
        </div>

        <div v-if="showMap" class="lg:min-h-96 min-h-[50vh]">
          <div>
            <img
              src="~~/assets/images/event/map.png"
              alt=""
              class="w-full h-full rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div v-else class="lg:max-w-xl xl:lg:max-w-2xl mx-auto gap-14">
          <div
            class="col-span-5 space-y-6 hidden md:block bg-whitePrimary dark:bg-blackPrimary p-3 rounded-xl"
          >
            <div class="space-y-6 relative cursor-default">
              <SkeletonEventImg :loaderState="nextEventStore.nextLoaderState">
                <ContainerEventImg
                  :data="eventDetails"
                  :isParticipating="eventDetails?.joinStatus"
                  :elimentType="'details'"
                />
              </SkeletonEventImg>
              <div class="flex justify-between items-center">
                <div class="flex gap-3 items-center">
                  <ContainerGroupProfile
                    :profiles="eventDetails?.participants"
                  />

                  <NuxtLink
                    to="/messages"
                    class="bg-mediumBlack dark:bg-slate-300 dark:border h-full p-3 rounded-lg"
                  >
                    <ChatBubbleBottomCenterTextIcon
                      class="h-8 w-8 text-white dark:text-blackPrimary transition-all duration-150"
                    />
                  </NuxtLink>
                </div>

                <div class="flex items-center gap-4">
                  <button
                    @click="sendJoinRequest()"
                    v-if="!eventDetails?.joinStatus && !isOwnEvent"
                    class="h-fit px-4 py-2 text-white rounded-lg bg-green-600"
                  >
                    Join Event
                  </button>

                  <button
                    v-if="eventDetails?.joinStatus"
                    class="h-fit px-4 py-2 text-xs lg:text-base text-white rounded-lg bg-gradient-to-t from-primary to-secondary"
                  >
                    Cancel Event
                  </button>
                </div>
              </div>

              <span
                class="absolute -right-20 bottom-0 rounded-full shadow-2xl p-2 border border-slate-300 bg-white dark:bg-mediumBlack cursor-pointer hover:scale-110 transition-all duration-200"
              >
                <ChevronRightIcon class="h-8 w-8 text-black dark:text-white" />
              </span>

              <span
                class="absolute -left-20 bottom-0 rounded-full shadow-2xl p-2 border border-slate-300 bg-white dark:bg-mediumBlack cursor-pointer hover:scale-110 transition-all duration-200"
              >
                <ChevronLeftIcon class="h-8 w-8 text-black dark:text-white" />
              </span>
            </div>
            <div class="sticky top-0 z-20 cursor-default">
              <FormMap
                v-if="eventDetails?.joinStatus"
                @set-location="
                  (locationObj) => {
                    console.log(locationObj);
                  }
                "
                :id="'map-event-details'"
                classes="w-full h-80"
                :oldValue="{
                  name: '',
                  latitude: eventDetails.location.coordinates[1],
                  longitude: eventDetails.location.coordinates[0],
                }"
              />
              <div v-else class="relative hidden md:block overflow-hidden">
                <img src="~~/assets/images/event/map.png" alt="" class="" />
                <span
                  class="absolute top-0 right-0 w-full h-full bg-red-600/40 flex items-center justify-center p-5 text-center font-medium text-lg text-white"
                >
                  <p>You must be accepted by the Host to see the location</p>
                </span>
              </div>
            </div>
          </div>
          <!-- <Paginator
              :lastPage="12"
              :firstPage="1"
              :perPage="2"
              :presentPage="1"
              :presentRoute="'/event/id'"
            /> -->
        </div>

        <!-- <section class="fixed bottom-16 right-4 md:bottom-20 md:right-20 z-20">
          <ButtonMapToggle
            @update-input="toggleMap"
            :oldValue="isVarified"
            containerClass="bg-white"
            iconClass="text-secondary"
          />
        </section> -->
      </div>

      <div
        class="fixed top-0 right-0 w-full h-[1000vh] bg-whiteSecondary dark:bg-blackSecondary z-10"
      ></div>
    </div>
  </NuxtLayout>
</template>
