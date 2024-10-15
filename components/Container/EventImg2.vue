<script setup>
import {
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
  PencilSquareIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import { MapPinIcon } from "@heroicons/vue/24/solid";
import { useTabStore } from "~~/stores/tabStore";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";

const props = defineProps({
  pageType: String,
  shouldTimerStart: {
    type: Boolean,
    default: false,
  },
  enableEditBtn: {
    type: Boolean,
    default: true,
  },
  enableExpandBtn: {
    type: Boolean,
    default: true,
  },
});

const { getCurrentTab, setCurrentTab } = useTabStore();

const eventDetailsStore = useEventDetailsStore();

const emit = defineEmits(["showdata", "showdetails", "showedit"]);
const dataShow = ref(false);
const editShow = ref(false);

const timerStart = ref(props.shouldTimerStart);

const expandSection = () => {
  dataShow.value = !dataShow.value;
  emit("showdata", dataShow.value);
};

const expandEditSection = () => {
  editShow.value = !editShow.value;
  emit("showedit", editShow.value);
};

const tabChanger = () => {
  // console.log('asdfsdf')
  // events 0
  // setCurrentTab('events', 0)
  emit("showdetails", true);
};

watch(
  () => props.shouldTimerStart,
  () => {
    timerStart.value = props.shouldTimerStart;
  }
);
</script>

<template>
  <SkeletonEventImg>
    <div
      class="h-fit lg:h-80 bg-no-repeat bg-cover rounded-xl relative p-4 z-0 overflow-hidden relative"
    >
      <img
        :src="
          networkImage(
            eventDetailsStore.currentDetails.thumbnail
              ? eventDetailsStore.currentDetails.thumbnail
              : eventDetailsStore.currentDetails.user_uid.profile_image
          )
        "
        alt=""
        class="h-full w-full object-cover -z-10 absolute top-0 right-0"
      />

      <div class="h-full w-full flex flex-col justify-end z-20 space-y-5">
        <div class="mb-auto flex items-start justify-between">
          <CommonTimer
            :startTime="eventDetailsStore.currentDetails.start_time"
            :startDate="eventDetailsStore.currentDetails.event_date"
            :shouldTimerStart="timerStart"
          />
          <div
            class="gap-4 flex flex-col md:flex-row justify-between items-center"
          >
            <button
              v-if="enableEditBtn"
              class="hidden lg:block px-2 py-1 dark:bg-blackPrimary rounded-lg"
              :class="
                pageType == 'edit'
                  ? 'bg-gradient-to-t from-primary to-secondary text-white'
                  : 'bg-white '
              "
            >
              <NuxtLink
                :to="'/events/' + eventDetailsStore.currentId + '/edit'"
                class="flex items-center gap-2"
              >
                <!-- <p v-if="pageType == 'edit'">Save Edits</p> -->
                <PencilSquareIcon
                  class="h-5 w-5"
                  :class="
                    pageType == 'edit'
                      ? 'text-white '
                      : 'text-black dark:text-slate-200'
                  "
                />
              </NuxtLink>
            </button>

            <button
              v-if="enableEditBtn"
              class="block lg:hidden px-2 py-1 rounded-lg"
              :class="
                editShow
                  ? 'bg-gradient-to-t from-primary to-secondary'
                  : 'bg-white dark:bg-blackPrimary'
              "
              @click="expandEditSection()"
            >
              <PencilSquareIcon
                class="h-5 w-5"
                :class="
                  pageType == 'edit'
                    ? 'text-white '
                    : 'text-black dark:text-slate-200'
                "
              />
            </button>

            <button
              @click="tabChanger()"
              class="block lg:hidden px-2 py-1 bg-white dark:bg-blackPrimary rounded-lg"
            >
              <EyeIcon class="h-5 w-5 text-black dark:text-slate-200" />
            </button>
            <NuxtLink
              :to="'/events/' + eventDetailsStore.currentId + '/details'"
              class="hidden lg:block px-2 py-1 bg-white dark:bg-blackPrimary rounded-lg"
            >
              <EyeIcon class="h-5 w-5 text-black dark:text-slate-200" />
            </NuxtLink>

            <button
              v-if="enableExpandBtn"
              class="px-2 py-1 rounded-lg"
              :class="
                dataShow
                  ? 'bg-gradient-to-t from-primary to-secondary'
                  : 'bg-white dark:bg-blackPrimary'
              "
              @click="expandSection()"
            >
              <UsersIcon
                class="h-5 w-5"
                :class="
                  dataShow
                    ? 'text-white dark:text-slate-200'
                    : 'text-black dark:text-slate-200'
                "
              />
            </button>
          </div>
        </div>

        <p class="text-base lg:text-lg text-white capitalize">
          {{ eventDetailsStore.currentDetails.title }}
        </p>

        <div class="flex justify-start gap-3 items-center">
          <p class="flex items-center gap-1 text-xs text-white">
            <CalendarDaysIcon class="h-5 w-5 text-white" />
            {{
              eventDetailsStore.currentDetails.event_date
                ? eventDetailsStore.currentDetails.event_date.substring(0, 10)
                : ""
            }}
          </p>
          <p class="text-center flex items-center gap-1 text-xs text-white">
            <MapPinIcon class="text-white h-5 w-5" />
            <!-- {{
              eventDetailsStore.currentDetails
                ? eventDetailsStore.currentDetails.city +
                  ", " +
                  eventDetailsStore.currentDetails.country
                : ""
            }} -->

            {{
              eventDetailsStore.currentDetails &&
              eventDetailsStore.currentDetails.neighbourhood &&
              eventDetailsStore.currentDetails.neighbourhood !== "undefined"
                ? eventDetailsStore.currentDetails.neighbourhood + ","
                : ""
            }}
            {{
              eventDetailsStore.currentDetails &&
              eventDetailsStore.currentDetails?.country
                ? eventDetailsStore.currentDetails?.country
                : ""
            }}
          </p>
          <p class="flex items-center gap-1 text-xs text-white">
            <ClockIcon class="h-5 w-5 text-white" />

            {{
              eventDetailsStore.currentDetails.start_time
                ? eventDetailsStore.currentDetails.start_time
                : "none"
            }}
          </p>
        </div>
        <p class="text-white">
          Registration closes at:
          <!-- <span class="text-primary ml-2">
            {{
              eventDetailsStore.currentDetails.notice_hour
                ? eventDetailsStore.currentDetails.notice_hour
                : "none"
            }}
            -
            {{
              eventDetailsStore.currentDetails.notice_hour_slot
                ? eventDetailsStore.currentDetails.notice_hour_slot
                : "none"
            }}
          </span> -->
          <span class="text-primary ml-2"
            >{{
              eventDetailsStore.currentDetails
                ? eventDetailsStore.currentDetails.notice_hour.substring(0, 10)
                : "none"
            }}
            -
            {{
              eventDetailsStore.currentDetails
                ? eventDetailsStore.currentDetails.notice_hour.substring(11, 18)
                : "none"
            }}

            <!-- {{ eventDetailsStore.currentDetails ? eventDetailsStore.currentDetails.notice_hour.substring(0, 10) : "none" }} - {{ eventDetailsStore.currentDetails ? data.notice_hour.substring(11, 18) : "none" }} -->
          </span>
        </p>
      </div>
      <span
        class="bg-gradient-to-b from-transparent to-black h-full w-full absolute top-0 right-0 -z-10 flex justify-center items-center"
      >
        <!-- <p
          v-if="!eventDetailsStore.currentDetails.thumbnail"
          class="dark:text-red-500 font-medium text-xs"
        >
          No image to show
        </p> -->
        <!-- <img
          v-if="!eventDetailsStore.currentDetails.thumbnail"
          :src="
            networkImage(
              eventDetailsStore.currentDetails.user_uid?.profile_image
            )
          "
          alt=""
          class="bg-contain bg-bottom"
        /> -->
      </span>

      <!-- <XCircleIcon
        class="h-10 w-10 text-primary absolute -top-5 -right-6 cursor-pointer"
      /> -->
    </div>
  </SkeletonEventImg>
</template>
