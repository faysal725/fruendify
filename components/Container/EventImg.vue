<script setup>
import { CalendarDaysIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import { MapPinIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  expand: {
    type: Boolean,
    default: false,
  },
  isParticipating: {
    type: [Boolean, String],
    default: false,
  },

  elimentType: {
    type: String,
  },
  data: {
    type: Object,
  },
  shouldTimerStart: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["expand"]);
const expanded = ref(false);
let eventData = ref();
const timerStart = ref(props.shouldTimerStart);
const router = useRouter();

const expandSection = () => {
  emit("expand", true);

  expanded.value = true;
};

watch(
  () => props.shouldTimerStart,
  () => {
    timerStart.value = props.shouldTimerStart;
  }
);
</script>

<template>
  <div
    class="h-fit md:h-80 bg-no-repeat bg-cover bg-bottom rounded-xl relative p-4 z-0 overflow-hidden relative"
  >
    <img
      :src="
        networkImage(
          data?.thumbnail ? data?.thumbnail : data?.user_uid?.profile_image
        )
      "
      alt=""
      class="h-full w-full object-cover -z-10 absolute top-0 right-0"
      :class="data?.face_blur ? 'blur-section' : ''"
    />

    <div class="h-full w-full flex flex-col justify-end z-20 space-y-5">
      <div class="mb-auto flex items-start justify-between">
        <CommonTimer
          :startTime="data?.start_time ? data.start_time : 0"
          :startDate="data?.event_date ? data.event_date : 0"
          :shouldTimerStart="timerStart"
        />

        <div v-if="elimentType == 'discover'">
          <button
            v-if="expanded && isParticipating"
            class="px-4 py-2 text-white text-xs lg:text-base rounded-lg bg-green-600"
          >
            Participating
          </button>
          <ButtonExpand v-else @click="expandSection()" />
        </div>

        <div v-if="elimentType == 'details'">
          <button
            v-if="isParticipating"
            class="px-4 py-2 text-white text-xs lg:text-base rounded-lg bg-green-600"
          >
            Participating
          </button>
        </div>
      </div>

      <p class="text-sm capitalize lg:text-xl text-white">
        {{ data?.title }}
      </p>

      <div class="flex flex-col lg:flex-row justify-between">
        <div class="space-y-3 rounded-lg">
          <div class="flex items-center gap-4">
            <img
              @click="router.push('/profile/view/' + data?.user_uid._id)"
              :src="
                networkImage(
                  data && data.user_uid ? data.user_uid.profile_image : '#'
                )
              "
              alt=""
              class="rounded-full h-14 w-14 object-cover cursor-pointer"
            />
            <div>
              <p class="text-lg font-semibold text-white">
                {{
                  data && data.user_uid ? data.user_uid.first_name : "no name"
                }}
              </p>
              <p class="text-sm font-base text-white">Event Owner</p>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-end text-sm pt-2 gap-3">
          <p class="flex items-center gap-1 text-base text-white">
            <CalendarDaysIcon class="h-5 w-5 text-white" />
            {{ data?.event_date ? data.event_date.substring(0, 10) : "" }}
          </p>
          <p class="text-center flex items-center gap-2 text-base text-white">
            <MapPinIcon class="text-white h-5 w-5" />
            <!-- {{
                data.address?.length > 30
                  ? data.address.substring(0, 30) + "..."
                  : ""
              }} -->

            {{
              data &&
              data.joinStatus == "APPROVED" &&
              data.neighbourhood &&
              data.neighbourhood !== "undefined"
                ? data.neighbourhood + ","
                : ""
            }}
            {{ data?.city ? data?.city : "" }}
          </p>
        </div>
      </div>

      <p class="text-white">
        Registration closes at:
        <span class="text-primary ml-2">
          {{ data?.notice_hour ? data.notice_hour.substring(0, 10) : "none" }} -
          {{
            data?.notice_hour ? data.notice_hour.substring(11, 18) : "none"
          }}</span
        >
      </p>
    </div>
    <span
      class="bg-gradient-to-b from-transparent to-black h-full w-full absolute top-0 right-0 -z-10 flex justify-center items-center"
    >
      <!-- <img v-if="!data?.thumbnail" :src="networkImage(data?.user_uid?.profile_image)" alt="" class="bg-contain bg-bottom"> -->
    </span>

    <!-- <XCircleIcon
      class="h-10 w-10 text-primary absolute -top-5 -right-6 cursor-pointer"
    /> -->
  </div>
</template>

<style scoped>
.blur-section {
  filter: blur(5px);
}
</style>
