<script setup>
import { useTimerStore } from "~~/stores/timerStore";

const props = defineProps({
  startTime: {
    type: [String, Number],
    default: "00:00:00",
  },
  startDate: {
    type: [String, Number],
    default: "0000-00-00",
  },
  shouldTimerStart: {
    type: Boolean,
    default: false,
  },
});

const timerStore = useTimerStore();
const { setTimerState } = useTimerStore();

const startTimer = ref(false);
const intervalId = ref();

const totalHours = ref("00");
const totalMinutes = ref("00");
const totalSeconds = ref("00");

function calculateTotalTime(dateString, timeString) {
  // Parse the date and time strings into Date objects
  const targetDate = new Date(dateString); // Directly use the dateString

  // Convert timeString to 24-hour format
  const timeParts = timeString.split(":");
  const hours = parseInt(timeParts[0]) + (timeParts[1].includes("PM") ? 12 : 0);
  const minutes = parseInt(timeParts[1].replace("AM", "").replace("PM", ""));

  // Set the hours and minutes in the targetDate
  targetDate.setHours(hours);
  targetDate.setMinutes(minutes);

  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  // Convert   milliseconds to hours, minutes, and seconds
  const totalSeconds = Math.floor(timeDifference / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const remainingSeconds = totalSeconds % 60;
  return {
    hours: totalHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  };
}

// onMounted(() => {
//   if (
//     props.startTime !== "00:00:00" &&
//     props.startDate !== "0000-00-00" &&
//     props.shouldTimerStart
//   ) {
//     startTimer.value = true;
//   }
// });

onUnmounted(() => {
  startTimer.value = false;
});

function startTheTimer() {
  intervalId.value = setInterval(() => {
    const { hours, minutes, seconds } = calculateTotalTime(
      props.startDate,
      props.startTime
    );

    // console.log(hours, minutes, seconds);
    totalHours.value = hours;
    totalMinutes.value = minutes;
    totalSeconds.value = seconds;
  }, 1000);
}

function clearTheTimer() {
  totalHours.value = "00";
  totalMinutes.value = "00";
  totalSeconds.value = "00";
  clearInterval(intervalId.value);
}

watch(
  () => startTimer.value,
  () => {
    // if (startTimer.value) {
    //   intervalId.value = setInterval(() => {
    //     const { hours, minutes, seconds } = calculateTotalTime(
    //       props.startDate,
    //       props.startTime
    //     );
    //     console.log(hours, minutes, seconds);
    //     totalHours.value = hours;
    //     totalMinutes.value = minutes;
    //     totalSeconds.value = seconds;
    //   }, 1000);
    // } else {
    //   totalHours.value = "00";
    //   totalMinutes.value = "00";
    //   totalSeconds.value = "00";
    //   clearInterval(intervalId.value);
    // }
  }
);

// watch(
//   () => props.shouldTimerStart,
//   () => {
//     console.log(props.shouldTimerStart, "timer");
//     if (props.shouldTimerStart) {
//       startTheTimer()
//     }else{
//       clearTheTimer()
//     }
//   }
// );

onBeforeUnmount(() => {
  console.log(timerStore.timerShouldStart, "timer ru");
  clearTheTimer();
  setTimerState(false);
});

watch(
  () => timerStore.timerShouldStart,
  () => {
    if (timerStore.timerShouldStart) {
      startTheTimer();
    } else {
      clearTheTimer();
    }
  }
);

watch(
  () => totalSeconds.value,
  () => {
    if (totalSeconds.value < 0) {
      clearTheTimer();
    }
  }
);
</script>

<template>
  <div
    class="rounded-xl flex flex-col justify-between h-24 w-fit p-3 bg-white dark:bg-blackPrimary"
  >
    <p class="text-sm font-bold dark:text-white">Happening in</p>

    <div class="flex justify-between items-center text-sm lg:text-lg gap-1">
      <span
        class="bg-gradient-to-t from-primary to-secondary font-semibold p-1 px-2 rounded-lg text-white"
        >{{ totalHours }}</span
      >
      <span class="text-3xl dark:text-white">:</span>
      <span
        class="bg-gradient-to-t from-primary to-secondary font-semibold p-1 px-2 rounded-lg text-white"
        >{{ totalMinutes }}</span
      >
      <span class="text-3xl dark:text-white">:</span>
      <span
        class="bg-gradient-to-t from-primary to-secondary font-semibold p-1 px-2 rounded-lg text-white"
        >{{ totalSeconds }}</span
      >
    </div>
  </div>
</template>
