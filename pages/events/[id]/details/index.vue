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

// store
const nextEventStore = useNexteventStore();
const { setNextEventDetails } = useNexteventStore();

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id)

// apis
const detailsApi = api() + "/api/event/details/" ;
let joinRequestApi = api() + "/api/event/join/";
let nextEventApi = api() + "/api/event/single/discover-events";

const updateApi = api() + "/api/event/update";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let dietOptionApi = api() + "/api/public/diet";
let languageOptionApi = api() + "/api/public/language";
let educationOptionApi = api() + "/api/public/education";
let categoryOptionApi = api() + "/api/public/categories";

const crud = useCrud();

const currentTime = useDateFormat(useNow(), "HH:mm:ss");

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
const slide = ref(true);
const pageNo = ref(1);

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
  loaderState.value = "pending";
  await crud.index({ path: detailsApi + id.value}).then((res) => {
    if (res.status == 200) {
      eventDetails.value = res.res.data;
      console.log(eventDetails.value, "initial value");
      loaderState.value = "resolve";

      if (eventDetails.value.user_uid._id == profileStore.profileData._id) {
        isOwnEvent.value = true;
      } else {
        isOwnEvent.value = false;
      }
      // isOwnEvent.value = profileStore
      setTimeout(() => {
        setTimerState(true);
      }, 1000);
    } else {
      loaderState.value = "failed";
      router.push("/404");
    }
  });
};

// send join req
const sendJoinRequest = async () => {
  console.log(id.value, joinRequestApi)
  await crud
    .store({
      body: "",
      path: joinRequestApi+id.value,
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

// get next data
const getNextEventData = async () => {
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
  };

  await crud
    .store({
      body: formData,
      path: nextEventApi,
    })
    .then((res) => {
      if (res.status == 200) {
        console.log(nextEventStore);
        setNextEventDetails(res.res.data);
        router.push("/events/next");
      } else {
        showToast("No Event to see");
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
  slide.value = false;
  await setTimerState(false);
  loaderState.value = "pending";

  const data = {
    status: true,
    message: "Event data found",
    data: {
      location: {
        type: "Point",
        coordinates: [90.4436568, 23.7466693],
      },
      _id: "66c18e48f459229f34016435",
      title: "Bjd",
      short_description: "bbzhzj",
      event_date: "2024-08-24",
      event_date_time: "2024-08-24T12:01:00.000Z",
      number_of_people: 50,
      start_time: "12:01 PM",
      notice_hour: 1,
      notice_hour_slot: "DAY",
      user_uid: {
        _id: "66c0acd657429f97597a9b50",
        first_name: "faysal ahmad",
        profile_image: "uploads/1723982231724-48524719self.jpeg",
      },
      interests: [
        {
          _id: "66abb527a1992a894c567512",
          title: "Gardening",
          image: null,
          createdAt: "2024-08-01T16:17:43.473Z",
          updatedAt: "2024-08-01T16:17:43.473Z",
          __v: 0,
        },
        {
          _id: "66abb4eca1992a894c5674c9",
          title: "Movies",
          image: null,
          createdAt: "2024-08-01T16:16:44.086Z",
          updatedAt: "2024-08-01T16:16:44.086Z",
          __v: 0,
        },
      ],
      address: "Abul Hotel",
      gender: "Male",
      start_age: 10,
      end_age: 58,
      diet: [],
      language: [
        {
          _id: "668d0f12905c80a25f353880",
          title: "English",
          createdAt: "2024-07-09T10:21:06.352Z",
          updatedAt: "2024-08-01T16:35:44.773Z",
          __v: 0,
        },
      ],
      education: [
        {
          _id: "66656769e0f011315220b331",
          title: "Master’s Degrees ",
          createdAt: "2024-06-09T08:27:21.826Z",
          updatedAt: "2024-08-01T16:56:20.070Z",
          __v: 0,
        },
      ],
      carrier: [
        {
          _id: "6694ab898ca2837ec66ca3b1",
          title: "Textile",
          createdAt: "2024-07-15T04:54:33.671Z",
          updatedAt: "2024-07-15T04:54:33.671Z",
          __v: 0,
        },
      ],
      hobbies: [],
      music: [
        {
          _id: "6694ab408ca2837ec66ca383",
          title: "Modern",
          createdAt: "2024-07-15T04:53:20.995Z",
          updatedAt: "2024-07-15T04:53:20.995Z",
          __v: 0,
        },
      ],
      politic: [
        {
          _id: "66656f98e0f011315220b47f",
          title: "Quisquam corrupti q",
          createdAt: "2024-06-09T09:02:16.680Z",
          updatedAt: "2024-06-09T09:07:09.219Z",
          __v: 0,
        },
      ],
      relationship_status: "Married",
      drink: "Alcoholic",
      is_athlete: true,
      smoke: "Preferred",
      face_blur: false,
      religion: [],
      category: [
        {
          _id: "66b78fb70c0a410cc7d0f129",
          title: "studying",
          type: 1,
          image: "uploads/1723305911295-18531926education.png",
          createdAt: "2024-08-10T16:05:11.299Z",
          updatedAt: "2024-08-10T16:05:11.299Z",
          __v: 0,
        },
      ],
      thumbnail: "uploads/1724050537613-426500127fog-1535201_1920.jpg",
      status: "ACTIVE",
      city: "Dhaka",
      country: "Bangladesh",
      createdAt: "2024-08-18T06:01:44.957Z",
      updatedAt: "2024-08-19T06:55:37.615Z",
      __v: 0,
      joinableStatus: false,
      cancelableStatus: true,
      joinStatus: "APPROVED",
      participants: [
        {
          _id: "66c18e48f459229f34016438",
          event_uid: "66c18e48f459229f34016435",
          user_uid: {
            _id: "66c0acd657429f97597a9b50",
            first_name: "faysal ahmad",
            profile_image: "uploads/1723982231724-48524719self.jpeg",
          },
          status: "APPROVED",
          block: false,
          leave: false,
          createdAt: "2024-08-18T06:01:44.996Z",
          updatedAt: "2024-08-18T06:01:44.996Z",
          __v: 0,
        },
      ],
    },
  };

  await crud
    .store({
      body: formData,
      path: nextEventApi + "?page=" + pageNo.value,
    })
    .then((res) => {
      if (res.status == 200) {
        eventDetails.value = res.res.data.data[0];
        console.log(res.res.data.data[0]._id);
        id.value = res.res.data.data[0]._id
        paginationController(pageNo.value, res.res.data.metadata.totalPages);
        loaderState.value = "resolve";
        slide.value = true;
        if (eventDetails.value.user_uid._id == profileStore.profileData._id) {
          isOwnEvent.value = true;
        } else {
          isOwnEvent.value = false;
        }
        setTimeout(() => {
          setTimerState(true);
        }, 1000);
        // console.log(nextEventStore);
        // setNextEventDetails(res.res.data);
      } else {
        showToast("No Event to see");
        loaderState.value = "failed";
        slide.value = false;
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

onMounted(() => {
  getInitialData();
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
            <SkeletonName :loaderState="loaderState">
              <p
                class="text-base xl:text-lg font-semibold capitalize text-mediumBlack dark:text-slate-200"
              >
                {{ eventDetails?.title }}
              </p>
            </SkeletonName>

            <SkeletonName :loaderState="loaderState">
              <p
                class="text-sm xl:text-base capitalize text-darkGrey dark:text-slate-400 leading-loose"
              >
                {{ eventDetails?.short_description }}
              </p>
            </SkeletonName>
          </div>

          <SkeletonInterests :loaderState="loaderState">
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
              <div class="min-h-72">
                <Transition name="slide-fade">
                  <div v-if="slide">
                    <SkeletonEventImg :loaderState="loaderState">
                      <ContainerEventImg
                        :data="eventDetails"
                        :isParticipating="eventDetails?.joinStatus"
                        :elimentType="'details'"
                      />
                    </SkeletonEventImg>
                  </div>
                </Transition>
              </div>
              <!-- <Transition name="slide-fade">
                  <SkeletonEventImg :loaderState="loaderState" :is="slide">
                    <ContainerEventImg
                      :data="eventDetails"
                      :isParticipating="eventDetails?.joinStatus"
                      :elimentType="'details'"
                    />
                  </SkeletonEventImg>
              </Transition> -->

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
                    @click="sendJoinRequest()"
                    v-if="eventDetails?.joinStatus && eventDetails?.joinStatus !== 'APPROVED'"
                    class="h-fit px-4 py-2 text-xs lg:text-base text-white rounded-lg bg-gradient-to-t from-primary to-secondary"
                  >
                    Cancel Event
                  </button>
                </div>
              </div>

              <span
                @click="calledNextData()"
                class="absolute -right-20 bottom-0 rounded-full shadow-2xl p-2 border border-slate-300 bg-white dark:bg-mediumBlack cursor-pointer hover:scale-110 transition-all duration-200"
              >
                <ChevronRightIcon class="h-8 w-8 text-black dark:text-white" />
              </span>

              <span
                @click="calledNextData()"
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

<style>
.slide-fade-enter-active {
  overflow: hidden;
  transition: all 0.3s ease-out;
  min-height: 18rem;
}

.slide-fade-leave-active {
  overflow: hidden;
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  min-height: 18rem;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
