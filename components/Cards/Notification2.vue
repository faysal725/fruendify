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
    class="flex items-center gap-4 border-b border-gray-500/70 dark:border-slate-500/50 border-l-0 border-r-0 p-2 px-3 bg-whitePrimary dark:bg-blackPrimary transition-all duration-150 hover:scale-105"
  >
    <img
      v-if="notificationData?.user?.profile_image"
      :src="networkImage(notificationData?.user?.profile_image)"
      @click="router.push('/profile/view/' + notificationData?.user._id)"
      alt=""
      class="h-14 w-14 rounded-full object-cover"
    />
    <UserCircleIcon v-else class="h-16 w-16 text-slate-300" />
    <div class="">
      <p
        class="dark:text-slate-300 text-sm lg:text-base"
        :class="notificationData.is_seen ? 'font-base' : 'font-medium'"
      >
        {{ notificationData?.text }}
      </p>
      <div>
        <p class="text-mediumBlack text-sm dark:text-slate-200">
          {{
            notificationData && notificationData?.createdAt
              ? calculateTimeDifference(notificationData?.createdAt).days +
                "days"
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
      </div>
    </div>

    <button>
      <ButtonDot
        :isHorizontal="true"
        classes="p-1 dark:text-slate-200"
        :options="options"
        @selected-option="(dt) => console.log(dt)"
      />
    </button>
  </div>
</template>
