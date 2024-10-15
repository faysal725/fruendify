<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  error: String,
  oldValue: String,
});

let errorMsg = ref("");

const time = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
});

const emit = defineEmits(["update:modelValue"]);

// onMounted(() => {
//   const startDate = new Date();
//   const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
//   date.value = [startDate, endDate];
// })

function convertTo12HourFormat(timeObj) {
  const hours = timeObj.hours;
  const minutes = timeObj.minutes.toString().padStart(2, "0"); // Pad minutes with leading zero if needed
  const period = hours < 12 ? "AM" : "PM";

  // Handle midnight as 12 AM and convert from 24-hour to 12-hour format
  let formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  return `${formattedHours}:${minutes} ${period}`;
}

function convertTimeToObject(timeString) {
  // Split the string by colon (':')
  const parts = timeString.split(":");

  // Extract hours and minutes
  const hours = parseInt(parts[0], 10);
  let minutes = parseInt(parts[1].substring(0, 2), 10); // Extract only the first 2 characters for minutes

  // Handle AM/PM format
  const meridian = parts[1].substring(2).toUpperCase();
  if (meridian === "PM" && hours !== 12) {
    hours += 12; // Add 12 for hours in PM except for 12 PM
  } else if (meridian === "AM" && hours === 12) {
    hours = 0; // Convert 12 AM to 00
  }

  // Return object with hours and minutes
  return { hours, minutes };
}

onMounted(() => {
  let convertedTime = convertTo12HourFormat(time.value);
  console.log(convertTo12HourFormat(time.value));
  emit("update:modelValue", convertedTime);
});

onMounted(() => {
  if (props.oldValue) {
    time.value = convertTimeToObject(props.oldValue);
  }
});

watch(
  () => time.value,
  () => {
    let convertedTime = convertTo12HourFormat(time.value);
    console.log(convertTo12HourFormat(time.value));
    emit("update:modelValue", convertedTime);
  },
  { deep: true }
);

watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);
</script>

<template>
  <div class="relative">
    <VueDatePicker
      v-model="time"
      time-picker
      :is-24="false"
      :dark="$colorMode.preference == 'dark' ? true : false"
    ></VueDatePicker>
    <ChevronDownIcon
      v-if="!time"
      class="h-4 w-4 text-primary absolute top-3 right-3"
    />
  </div>
  <div>
    <p class="text-sm text-red-600">{{ errorMsg }}</p>
  </div>
</template>

<style scoped>
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #d4cbcb;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #ff774d);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>
