<script setup>
import {
  ArrowLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { useCrud } from "~~/composables/base";
import { isOwnersProfile } from "~~/composables/profile";

const props = defineProps({
  eventDetailsData: {
    type: [String, Object],
    default: Object,
  },
  shouldTimerStart: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["sendData"]);

// apis
let joinRequestApi = api() + "/api/event/join/";

const crud = useCrud();

const eventList = ref([
  { _id: 0, title: "Cycling", imgSrc: "/cycling.png" },
  { _id: 1, title: "Boating", imgSrc: "/boating.png" },
  { _id: 2, title: "dance", imgSrc: "/dance.png" },
  { _id: 3, title: "drinking", imgSrc: "/drinking.png" },
]);

const expandComponent = ref(false);
const joinEvent = ref(false);
const form = ref({});

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
const timerStart = ref(false);

function openModal() {
  // layout.value.layoutRef.modalOpener();
  modalShouldOpen.value = true;
}

function closeModal() {
  // layout.value.layoutRef.modalCloser();
  modalShouldOpen.value = false;
}

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

// send join req
const sendJoinRequest = async () => {
  await crud
    .store({
      body: "",
      path: joinRequestApi + props.eventDetailsData._id,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Request sended successfully");
        // joinEvent.value = true;
        // getInitialData()
      } else {
        showToast("Request sending failed");
      }
    });
};




watch(
  () => expandComponent.value,
  () => {
    emit("sendData", expandComponent.value);
  }
);

watch(
  () => props.shouldTimerStart,
  () => {
    timerStart.value = props.shouldTimerStart;
  }
);

// watch(
//   () => props.eventDetailsData,
//   () => {
//     if (props.eventDetailsData) {
//       console.log(props.eventDetailsData.joinStatus, isOwnersProfile(props.eventDetailsData.user_uid._id));
//       if (
//         !props.eventDetailsData.joinStatus &&
//         !isOwnersProfile(props.eventDetailsData.user_uid._id)
//       ) {
//         console.log('is here')
//         joinEvent.value = false;
//       } else {
//         joinEvent.value = true;
//       }
//     }
//   }
// );
</script>

<template>
  <section>
    <div
      class="space-y-6 overflow-y-scroll scrollbar-hide cursor-default lg:pb-32"
      :class="expandComponent ? 'max-h-[90vh]' : 'max-h-[70vh]'"
    >
      <div class="space-y-3">
        <div v-if="expandComponent" @click="expandComponent = false">
          <ButtonWithIcon
            name="Back to Events"
            classes="w-fit bg-black text-white flex p-2 px-4 flex-row-reverse items-center gap-3 rounded-full text-sm"
          >
            <ArrowLeftIcon class="h-5 w-5 text-white" />
          </ButtonWithIcon>
        </div>
        <div class="space-y-10 bg-whiteSecondary dark:bg-blackPrimary">
          <div class=" ">
            <div
              class="col-span-5 space-y-6 bg-whitePrimary dark:bg-blackPrimary rounded-xl"
            >
              <div class="space-y-6 relative cursor-default">
                <ContainerEventImg
                  :data="eventDetailsData"
                  elimentType="discover"
                  @expand="(data) => (expandComponent = data)"
                  :isParticipating="joinEvent"
                  :shouldTimerStart="timerStart"
                />

                <header
                  v-if="!expandComponent"
                  class="text-xl capitalize font-semibold text-mediumBlack dark:text-slate-200"
                >
                  {{ eventDetailsData ? eventDetailsData?.title : "" }}
                </header>
                <div class="flex justify-between items-center flex-wrap gap-3">
                  <ContainerGroupProfile
                    :profiles="
                      eventDetailsData ? eventDetailsData?.participants : []
                    "
                    classes="h-9 w-9"
                  />
                  <!-- {{ eventDetailsData.joinStatus  }}
                  {{ v-if="!eventDetails?.joinStatus && !isOwnEvent" }} -->
                  <!-- {{ !isOwnersProfile(publicData?._id) }} -->
                  <!-- {{isOwnersProfile(eventDetailsData?.user_uid?._id) }} -->
                  
                  <!-- <div class="flex items-center gap-3">
                    <button
                      @click="sendJoinRequest()"
                      v-if="
                        !eventDetailsData?.joinStatus &&
                        !isOwnersProfile(eventDetailsData?.user_uid?._id)
                      "
                      class="h-fit px-4 py-2 text-xs lg:text-base text-white rounded-lg bg-green-600"
                    >
                      Join Event
                    </button>
                    <button
                      v-if="eventDetailsData?.joinStatus"
                      class="h-fit px-4 py-2 text-xs lg:text-base text-white rounded-lg bg-gradient-to-t from-primary to-secondary"
                    >
                      Cancel Event
                    </button>
                  </div> -->
                </div>

                <!-- <span
                  v-if="!expandComponent"
                  class="absolute right-3 top-24 rounded-full shadow-2xl p-2 border border-slate-300 bg-white dark:bg-mediumBlack cursor-pointer hover:scale-110 transition-all duration-200"
                >
                  <ChevronRightIcon
                    class="h-8 w-8 text-black dark:text-white"
                  />
                </span> -->

                <!-- <span
                v-if="!expandComponent"
                  class="absolute left-3 top-24 rounded-full shadow-2xl p-2 border border-slate-300 bg-white dark:bg-mediumBlack cursor-pointer hover:scale-110 transition-all duration-200"
                >
                  <ChevronLeftIcon class="h-8 w-8 text-black dark:text-white" />
                </span> -->
              </div>

              <div
                v-if="!expandComponent"
                class="sticky top-0 z-20 cursor-default"
              >
                <FormMap
                  v-if="eventDetailsData?.joinStatus"
                  @set-location="
                    (locationObj) => {
                      console.log(locationObj);
                    }
                  "
                  :id="'map-event-details-small'"
                  classes="w-full h-80"
                  :oldValue="{
                    name: '',
                    latitude: eventDetailsData.location.coordinates[1],
                    longitude: eventDetailsData.location.coordinates[0],
                  }"
                />
                <div v-else class="relative">
                  <img src="~~/assets/images/event/map.png" alt="" />
                  <span
                    class="absolute top-0 right-0 w-full h-full bg-red-600/40 flex items-center justify-center p-5 text-center font-medium text-lg text-white"
                  >
                    <p>You must be accepted by the Host to see the location</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="expandComponent">
          <p
            class="text-xl capitalize font-semibold text-mediumBlack dark:text-slate-200"
          >
            {{ eventDetailsData.title }}
          </p>
          <p class="text-base text-darkGrey dark:text-slate-300 leading-loose">
            {{ eventDetailsData.short_description }}
          </p>
        </div>
      </div>

      <!-- <FormEventSelector
        v-if="expandComponent"
        :options="eventDetailsData.interests"
        :disable="true"
      /> -->

      <section v-if="expandComponent" class="grid grid-cols-3 gap-2 gap-4 py-6">
        <div
          v-for="data in eventDetailsData.interests"
          class="flex items-center justify-center rounded-full px-4 py-1 rounded-3xl gap-3 border cursor-pointer"
        >
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

      <div>
        <p
          class="text-sm font-medium pb-3 text-mediumBlack dark:text-slate-200"
        >
          Want to meet
        </p>

        <div
          class="h-10 w-full p-4 block text-sm font-semibold text-gray-700 dark:text-slate-300 border bg-transparent border-gray-300 rounded-full focus:outline-none flex items-center capitalize"
        >
          {{ eventDetailsData ? eventDetailsData.gender : "" }}
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
          {{ eventDetailsData?.start_age + ", " }}
          {{ eventDetailsData?.end_age }}
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
            v-for="(language, index) in eventDetailsData?.language"
          >
            {{ language.title
            }}{{ index <= eventDetailsData?.language.length ? "," : "" }}
          </span>
        </div>
      </div>

    </div>
  </section>
</template>
