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
import { useTimerStore } from "~~/stores/timerStore";

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

const emit = defineEmits(["sendData", "shouldReload"]);

// apis
let joinRequestApi = api() + "/api/event/join/";
let nextEventApi = api() + "/api/event/single/discover-events";
const detailsApi = api() + "/api/event/details/";

const crud = useCrud();

// store
const timerStore = useTimerStore();
const { setTimerState } = useTimerStore();

const eventList = ref([
  { _id: 0, title: "Cycling", imgSrc: "/cycling.png" },
  { _id: 1, title: "Boating", imgSrc: "/boating.png" },
  { _id: 2, title: "dance", imgSrc: "/dance.png" },
  { _id: 3, title: "drinking", imgSrc: "/drinking.png" },
]);

const expandComponent = ref(false);
const eventDetails = ref(props.eventDetailsData);
const joinEvent = ref(false);
const form = ref({});
const pageNo = ref(1);
const totalPage = ref();

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
const show = ref(true);

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
  console.log(eventDetails.value._id, "something");

  await crud
    .store({
      body: "",
      path: joinRequestApi + eventDetails.value._id,
    })
    .then(async (res) => {
      if (res.status == 200) {
        showToast("Request sended successfully");

        // emit("shouldReload");
        await getDetailsData(eventDetails.value._id);
      } else {
        showToast("Request sending failed");
      }
    });
};

// getting event data
const getDetailsData = async (id) => {
  await setTimerState(false);
  // loaderState.value = "pending";
  await crud.index({ path: detailsApi + id }).then((res) => {
    if (res.status == 200) {
      console.log(res.res.data, "details run");
      eventDetails.value = res.res.data;
      setTimeout(() => {
        setTimerState(true);
      }, 1000);
    } else {
      // loaderState.value = "failed";
      setTimerState(false);
    }
  });
};

const calledNextData = async () => {
  let formData = {
    distance: "",
    country: "",
    city: "",
    address: "",
    lat: "",
    long: "",
    event_date: "",
    language: "",
    diet: "",
    drinking: "",
    search: "",
    categories: "",
    page: pageNo.value,
  };
  show.value = false;

  // setTimeout(() => {
  //   eventDetails.value = data.data;
  //   show.value = true;
  //   setTimeout(() => {
  //     setTimerState(true);
  //   }, 10);
  // }, 1000);

  await crud
    .store({
      body: formData,
      path: nextEventApi + "?page=" + pageNo.value,
    })
    .then((res) => {
      if (res.status == 200) {
        console.log(res.res.data.metadata);
        eventDetails.value = res.res.data.data[0];
        paginationController(pageNo.value, res.res.data.metadata.totalPages);
        // loaderState.value = "resolve";
        show.value = true;
        // if (eventDetails.value.user_uid._id == profileStore.profileData._id) {
        //   isOwnEvent.value = true;
        // } else {
        //   isOwnEvent.value = false;
        // }
        setTimeout(() => {
          setTimerState(true);
        }, 1000);
        // console.log(nextEventStore);
        // setNextEventDetails(res.res.data);
      } else {
        showToast("No Event to see");
        // loaderState.value = "failed";
        show.value = false;
      }
    });
};

function paginationController(currentPage, totalPage) {
  console.log(currentPage, totalPage);
  if (currentPage == totalPage) {
    pageNo.value = 1;
  } else {
    pageNo.value++;
  }
}

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
                <Transition name="slide-fade">
                  <ContainerEventImg
                    v-if="show"
                    :data="eventDetails"
                    elimentType="discover"
                    @expand="(data) => (expandComponent = data)"
                    :isParticipating="joinEvent"
                    :shouldTimerStart="timerStart"
                  />
                </Transition>

                <header
                  v-if="!expandComponent"
                  class="text-xl capitalize font-semibold text-mediumBlack dark:text-slate-200"
                >
                  {{ eventDetails ? eventDetails?.title : "" }}
                </header>
                <div class="flex justify-between items-center flex-wrap gap-3">
                  <ContainerGroupProfile
                    :profiles="eventDetails ? eventDetails?.participants : []"
                    classes="h-9 w-9"
                  />
                  <!-- {{ eventDetails.joinStatus  }}
                  {{ v-if="!eventDetails?.joinStatus && !isOwnEvent" }} -->
                  <!-- {{ !isOwnersProfile(publicData?._id) }} -->
                  <!-- {{isOwnersProfile(eventDetails?.user_uid?._id) }} -->

                  <div class="flex items-center gap-3">
                    <button
                      @click="sendJoinRequest()"
                      v-if="
                        !eventDetails?.joinStatus &&
                        !isOwnersProfile(eventDetails?.user_uid?._id)
                      "
                      class="h-fit px-4 py-2 text-xs lg:text-base text-white rounded-lg bg-green-600"
                    >
                      Join Event
                    </button>
                    <button
                      @click="sendJoinRequest()"
                      v-if="
                        eventDetails?.joinStatus &&
                        eventDetails?.joinStatus !== 'APPROVED'
                      "
                      class="h-fit px-4 py-2 text-xs lg:text-base text-white rounded-lg bg-gradient-to-t from-primary to-secondary"
                    >
                      Cancel Event
                    </button>
                  </div>
                </div>

                <span
                  @click="calledNextData()"
                  v-if="!expandComponent"
                  class="absolute right-3 top-24 rounded-full shadow-2xl p-2 border border-slate-300 bg-white dark:bg-mediumBlack cursor-pointer hover:scale-110 transition-all duration-200"
                >
                  <ChevronRightIcon
                    class="h-8 w-8 text-black dark:text-white"
                  />
                </span>

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
                  v-if="eventDetails?.joinStatus"
                  @set-location="
                    (locationObj) => {
                      console.log(locationObj);
                    }
                  "
                  :id="'map-event-details-small'"
                  classes="w-full h-80"
                  :oldValue="{
                    name: '',
                    latitude: eventDetails.location.coordinates[1],
                    longitude: eventDetails.location.coordinates[0],
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
            {{ eventDetails.title }}
          </p>
          <p class="text-base text-darkGrey dark:text-slate-300 leading-loose">
            {{ eventDetails.short_description }}
          </p>
        </div>
      </div>

      <!-- <FormEventSelector
        v-if="expandComponent"
        :options="eventDetails.interests"
        :disable="true"
      /> -->

      <section v-if="expandComponent" class="grid grid-cols-3 gap-2 gap-4 py-6">
        <div
          v-for="data in eventDetails.interests"
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
    </div>
  </section>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
