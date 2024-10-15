<script setup>
import {
  EllipsisHorizontalIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  notificationData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["seenRequest"]);
const router = useRouter();
const options = [{ key: 0, value: "Remove Notification" }];

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const sendSeenRequest = () => {
  if (!props.notificationData.is_seen) {
    emit("seenRequest", props.notificationData._id);
  } else {
    return;
  }
};

function calculateTimeDifference(timeString) {
  const pastTime = new Date(timeString);
  const currentTime = new Date();

  const msDifference = currentTime - pastTime;

  // Convert milliseconds to days, hours, and minutes
  const days = Math.floor(msDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (msDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((msDifference % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days,
    hours,
    minutes,
  };
}
</script>

<template>
  <div
    @click="sendSeenRequest"
    class="flex items-start gap-4 border-b border-gray-500/70 p-3 px-0 cursor-pointer"
  >
    <img
      v-if="notificationData?.user?.profile_image"
      :src="networkImage(notificationData?.user?.profile_image)"
      @click="router.push('/profile/view/' + notificationData?.user._id)"
      alt=""
      class="h-16 w-16 rounded-full object-cover"
    />
    <UserCircleIcon v-else class="h-16 w-16 text-slate-300" />
    <div class="space-y-1 flex flex-col justify-between h-full">
      <p
        class="dark:text-slate-300 text-sm lg:text-base"
        :class="notificationData.is_seen ? 'font-base ' : 'font-medium '"
      >
        {{ notificationData?.text }}
      </p>
      <p class="text-mediumBlack dark:text-slate-300 text-xs text-start">
        {{
          notificationData && notificationData?.createdAt
            ? calculateTimeDifference(notificationData?.createdAt).days + "days"
            : ""
        }}
        {{
          notificationData && notificationData?.createdAt
            ? calculateTimeDifference(notificationData?.createdAt).hours +
              "Hour"
            : ""
        }}
        {{
          notificationData && notificationData?.createdAt
            ? calculateTimeDifference(notificationData?.createdAt).minutes +
              "Min"
            : ""
        }}

        Ago
      </p>
      <div class="space-x-4">
        <!-- <button
          class="px-4 p-1 bg-green-500 text-xs md:text-base rounded-full text-sm text-white capitalize"
        >
          Accept
        </button>
        <button
          class="px-4 p-1 bg-primary text-xs md:text-base rounded-full text-sm text-white capitalize"
        >
          decline
        </button> -->
      </div>
    </div>

    <div class="flex flex-col justify-start items-end ml-auto">
      <!-- <p class="text-mediumBlack dark:text-slate-300 text-xs  text-end">
        {{ notificationData && notificationData?.createdAt ?  calculateTimeDifference(notificationData?.createdAt).hours+ "Hour" : "" }}
        {{ notificationData && notificationData?.createdAt ?  calculateTimeDifference(notificationData?.createdAt).minutes+ "Min" : "" }}
      </p> -->
      <button>
        <ButtonDot
          :isHorizontal="true"
          classes="p-1 dark:text-slate-200"
          :options="options"
          @selected-option="(dt) => console.log(dt)"
        />
      </button>
    </div>
  </div>
</template>
