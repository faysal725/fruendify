<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";
import { api } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";

const props = defineProps({
  dataLoaded: {
    type: Boolean,
    default: false,
  },
});

const showMap = ref(false);
const emit = defineEmits(["showdetails", "deleteevent"]);

const eventDetailsStore = useEventDetailsStore();
const { getCurrentEventDetails, setCurrentEventDetails } =
  useEventDetailsStore();

const joiners = [
  "/profileImg/1.png",
  "/profileImg/2.png",
  "/profileImg/3.png",
  "/profileImg/4.png",
  "/profileImg/4.png",
];

const eventPeople = [
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/1.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/2.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/3.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/1.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/2.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/3.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/1.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/2.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/3.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "leslie Alex",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
];

const pendingRequests = [
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/1.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/2.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/3.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/1.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/2.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/3.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/1.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/2.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/3.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
  {
    name: "Ralph Edward sent to join the coffee meet-up",
    distance: "1.5 KM",
    like: "2.4K",
    imgSrc: "/profileImg/4.png",
  },
];
const showPeoples = ref(false);
const showInterestedPeople = ref(false);
const showEditSection = ref(false);

const sectionController = (sectionName, bool) => {
  if (sectionName == "edit") {
    showEditSection.value = bool;
    showInterestedPeople.value = false;
  } else {
    showInterestedPeople.value = bool;
    showEditSection.value = false;
  }
};

const timerStart = ref(false);

// watch(
//   () => props.shouldTimerStart,
//   () => {
//     timerStart.value = props.shouldTimerStart;
//   }
// );


watch(
  () => props.dataLoaded,
  () => {
    setTimeout(() => {
      showMap.value = true
    }, 1000);
  }
);
</script>

<template>
  <div
    class="h-[70vh] overflow-y-scroll lg:overflow-hidden relative scrollbar-hide"
  >
    <div
      class="grid grid-cols-12 w-full gap-5 lg:gap-14 rounded-2xl overflow-hidden bg-whitePrimary dark:bg-blackPrimary absolute top-0 right-0 lg:h-full lg:w-full lg:p-4"
    >
           
    <!-- <button @click="showMap = !showMap" class="bg-primary">start</button>  -->
      <div class="space-y-5 relative cursor-default col-span-12 lg:col-span-7">
        <ContainerEventImg2
          @showdetails="(data) => $emit('showdetails', data)"
          @showedit="(data) => sectionController('edit', data)"
          @showdata="(data) => sectionController('show', data)"
          :shouldTimerStart="timerStart"
        />
        <header
          v-if="!showInterestedPeople"
          class="text-xl font-semibold text-mediumBlack dark:text-slate-200 capitalize"
        >
          <!-- {{ eventDetailsStore.currentDetails.title }} -->
        </header>
        <div
          v-if="!showInterestedPeople"
          class="flex justify-between items-center flex-wrap md:flex-nowrap gap-4 lg:gap-0"
        >
          <div
            v-if="!showInterestedPeople"
            class="flex items-center gap-3 w-full md:justify-between"
          >
            <div class="flex items-center gap-3">
              <ContainerGroupProfile
                :profiles="eventDetailsStore.currentDetails ? eventDetailsStore.currentDetails.participants : []"
                classes="h-9 w-9 md:h-14 md:w-14"
              />

              <NuxtLink
                to="/messages"
                class="bg-mediumBlack h-full w-fit p-1 md:p-3 rounded-lg"
              >
                <ChatBubbleBottomCenterTextIcon
                  class="h-5 w-5 md:h-8 md:w-8 text-white transition-all duration-150"
                />
              </NuxtLink>
            </div>

            <button
              class="h-fit px-2 md:px-4 py-2 text-xs md:text-sm text-white rounded-lg bg-gradient-to-t from-primary to-secondary"
              @click="
                $emit('deleteevent', eventDetailsStore.currentDetails._id)
              "
            >
              Delete Event
            </button>
          </div>
        </div>

        <span
          class="absolute -left-20 bottom-0 rounded-full shadow-2xl p-2 border border-slate-300 bg-white cursor-pointer hover:scale-110 transition-all duration-200"
        >
          <ChevronLeftIcon class="h-8 w-8 text-black" />
        </span>

        <div
          v-if="!showInterestedPeople && !showEditSection"
          class="sticky top-0 z-20 cursor-default"
        >
          <!-- <div class="relative">
            <img src="~~/assets/images/event/map.png" alt="" />
          </div> -->

          <FormMap
            v-if="showMap"
            @set-location="
              (locationObj) => {
                console.log(locationObj);
              }
            "
            classes="w-full h-80"
            :id="'selfDetailsSmall-1'"
            :showMarker="true"
            :oldValue="{
              name: '',
              latitude:
                eventDetailsStore.currentDetails.location.coordinates[1],
              longitude:
                eventDetailsStore.currentDetails.location.coordinates[0],
            }"
          />
          <!-- <div v-else class="relative">
            <img src="~~/assets/images/event/map.png" alt="" />
            <span class="bg-red-500/30 w-full h-full absolute top-0 right-0 flex justify-center items-center">
              <button @click="showMap = !showMap" class="bg-primary p-2 rounded-lg text-white font-semibold">Click to show map</button>
            </span>
          </div> -->

        </div>
      </div>

      <div v-if="showInterestedPeople" class="col-span-12 lg:col-span-5">
        <ContainerEventParticipants />
      </div>

      <div v-if="showEditSection" class="col-span-12 lg:col-span-5">

        <ContainerEventEditSmall />
      </div>
    </div>
  </div>
</template>
