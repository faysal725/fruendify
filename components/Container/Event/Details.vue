<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  XCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/solid";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";
import { useAuthStore } from "~/stores/authStore";
import { api } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";

const props = defineProps({
  pageType: {
    type: String,
    default: "myEvent",
  },
});

const crud = useCrud();
const eventDeletePath = api() + "/api/event/delete";
const participentListApi = api() + "/api/event/participent/";

const eventDetailsStore = useEventDetailsStore();
const {
  getCurrentEventDetails,
  setCurrentEventDetails,
  clearEventDetailsData,
  setLoaderState,
} = useEventDetailsStore();

const authStore = useAuthStore();

const showMap = ref(false);
const startTimer = ref(false);
const coords = ref({
  name: null,
  lat: null,
  long: null,
});

const updateMap = ref(1);

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
const toggleMap = (data) => {
  // body.value.status = data ? 1 : 0;

  showMap.value = data;
};

const getParticipentList = async () => {
  await crud
    .index({ path: participentListApi + eventDetailsStore.currentId })
    .then((res) => {
      // console.log(res.res.data)
      // if (res.res.data) {
      //   categoryOption.value = res.res.data;
      // }

      if (res.status == 200) {
        if (res.res.data.length > 0) {
          // joiners.value = res.res.data
        }
      }
    });
};

async function deleteEvent(id) {
  setLoaderState("pending");
  await crud.destroy({ path: eventDeletePath + "/" + id }).then((res) => {
    if (res.status == 200) {
      setLoaderState("resolve");
      clearEventDetailsData();
    } else {
      setLoaderState("failed");
    }
  });
}

onMounted(() => {
  // getParticipentList();
});

watch(
  () => authStore.isLoggedIn,
  () => {
    if (!authStore.isLoggedIn) {
      clearEventDetailsData();
    }
  },
  { deep: true }
);

// watch(
//   () => eventDetailsStore.currentDetails,
//   () => {
//     // console.log(eventDetailsStore.currentDetails.location.coordinates[0])
//     coords.value.name = eventDetailsStore.currentDetails.address;
//     coords.value.lat = eventDetailsStore.currentDetails.location.coordinates[0];
//     coords.value.long =
//       eventDetailsStore.currentDetails.location.coordinates[1];
//   },
//   { deep: true }
// );

watch(
  () => eventDetailsStore.currentId,
  () => {
    updateMap.value += 1;
  },
  { deep: true }
);
</script>

<template>
  <div
    class="h-[800px] overflow-y-scroll lg:overflow-hidden relative scrollbar-hide"
  >
    <div
      class="grid grid-cols-12 w-full gap-5 lg:gap-14 rounded-2xl overflow-hidden bg-whitePrimary dark:bg-blackPrimary absolute top-0 right-0 lg:h-full lg:w-full lg:p-4"
      v-if="eventDetailsStore.currentId"
    >
      <div class="space-y-5 relative cursor-default col-span-12 lg:col-span-7">
        <ContainerEventImg2 :enableExpandBtn="false"/>

        <SkeletonParticipantsAndDelete
          :loaderState="eventDetailsStore.loaderState"
        >
          <div
            class="flex justify-between items-center flex-wrap md:flex-nowrap gap-4 lg:gap-0"
          >
            <div
              class="flex items-center gap-3 w-full md:w-fit md:justify-between"
            >
              <ContainerGroupProfile
                :profiles="eventDetailsStore.currentDetails.participants"
              />

              <NuxtLink
                to="/messages"
                class="bg-mediumBlack h-full p-3 rounded-lg"
              >
                <ChatBubbleBottomCenterTextIcon
                  class="h-8 w-8 text-white transition-all duration-150"
                />
              </NuxtLink>
            </div>

            <div class="flex items-center gap-2">
              <button
                v-if="props.pageType == 'myEvent'"
                class="h-fit px-4 py-2 text-white rounded-lg bg-gradient-to-t from-primary to-secondary"
                @click="deleteEvent(eventDetailsStore.currentId)"
              >
                Delete Event
              </button>
              <button
                v-if="props.pageType == 'joinedEvent'"
                class="h-fit px-4 py-2 text-white rounded-lg bg-gradient-to-t from-primary to-secondary"
                @click="deleteEvent(eventDetailsStore.currentId)"
              >
                Cancel Event
              </button>
            </div>
          </div>
        </SkeletonParticipantsAndDelete>
        <!-- <span
          class="absolute -right-20 bottom-0 rounded-full shadow-2xl p-2 border border-slate-300 bg-white cursor-pointer hover:scale-110 transition-all duration-200"
        >
          <ChevronRightIcon
            class="h-8 w-8 text-black transition-all duration-100"
          />
        </span> -->

        <span
          class="absolute -left-20 bottom-0 rounded-full shadow-2xl p-2 border border-slate-300 bg-white cursor-pointer hover:scale-110 transition-all duration-200"
        >
          <ChevronLeftIcon class="h-8 w-8 text-black" />
        </span>

        <div
          v-if="eventDetailsStore.currentId"
          class="sticky top-0 z-20 cursor-default"
        >
          <FormMap
            :key="updateMap"
            @set-location="
              (locationObj) => {
                // console.log(locationObj);
              }
            "
            classes="w-full h-80"
            :id="'map-container-1'"
            :showMarker="true"
            :oldValue="{
              name: '',
              latitude:
                eventDetailsStore.currentDetails.location.coordinates[1],
              longitude:
                eventDetailsStore.currentDetails.location.coordinates[0],
            }"
          />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-5">
        <ContainerEventParticipants />
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-12 w-full gap-5 lg:gap-14 rounded-2xl overflow-hidden bg-whitePrimary dark:bg-blackPrimary absolute top-0 right-0 lg:h-full lg:w-full lg:p-4"
    >
      <div
        class="space-y-5 relative cursor-default col-span-12 flex items-center justify-center text-5xl font-semibold text-red-400"
      >
        No Event selected
      </div>
    </div>
  </div>
</template>
