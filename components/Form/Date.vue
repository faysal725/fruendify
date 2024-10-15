<script setup>
const props = defineProps({
  title: String,
  oldValue: Number,
  error: String,
  lowerLimit: {
    type: Number,
    default: 18,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

let errorMsg = ref("");
const selectedDay = ref(1);
const selectedMonth = ref(1);
const selectedYear = ref(0);

const emit = defineEmits(["update:modelValue"]);

const dateOptions = ref([]);
const monthsOptions = ref([
  { key: 1, value: "January" },
  { key: 2, value: "february" },
  { key: 3, value: "march" },
  { key: 4, value: "april" },
  { key: 5, value: "may" },
  { key: 6, value: "june" },
  { key: 7, value: "july" },
  { key: 8, value: "august" },
  { key: 9, value: "september" },
  { key: 10, value: "october" },
  { key: 11, value: "november" },
  { key: 12, value: "december" },
]);

const setDayOptions = (key) => {
  dateOptions.value = [];
  let totalDay;
  if (key <= 7) {
    console.log(key);
    if (key == 2) {
      totalDay = 28;
    } else {
      if (key % 2 === 1) {
        totalDay = 31;
      } else {
        totalDay = 30;
      }
    }
  } else {
    if (key % 2 === 1) {
      totalDay = 30;
    } else {
      totalDay = 31;
    }
  }

  for (let i = 1; i <= totalDay; i++) {
    dateOptions.value.push({ key: i, value: i });
  }
};

onMounted(() => {
  setDayOptions(1);

  let currentDate = new Date();

  selectedDay.value = currentDate.getDate();
  selectedMonth.value = currentDate.getMonth() + 1;
  selectedYear.value = currentDate.getFullYear();

  let fullDate = buildFullDate();
  emit("update:modelValue", fullDate);
});

onMounted(() => {
  if (props.oldValue) {
    // selectedDay.value = props.oldValue;
    let dateObj = convertDateStringToObject(props.oldValue);
    console.log(dateObj);
    selectedDay.value = dateObj.day;
    selectedMonth.value = dateObj.month;
    selectedYear.value = dateObj.year;

    let fullDate = buildFullDate();
    emit("update:modelValue", fullDate);
  }
});

onMounted(() => {
  if (props.lowerLimit) {
    // selectedDay.value = props.oldValue;
    // let dateObj = convertDateStringToObject(props.oldValue);
    // console.log(dateObj);
    // selectedDay.value = dateObj.day;
    // selectedMonth.value = dateObj.month;
    // selectedYear.value = dateObj.year;
    // let fullDate = buildFullDate();
    // emit("update:modelValue", fullDate);
  }
});

function convertDateStringToObject(dateString) {
  // Split the dateString by "-"
  const parts = dateString.split("-");

  // Extract year, month, and day from parts array
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  // Return an object with year, month, and day properties
  return { year, month, day };
}

function buildFullDate() {
  let passedTime = calculateTimePassed(
    selectedYear.value,
    selectedMonth.value,
    selectedDay.value
  );

  let fullDate;
  console.log(passedTime.years, props.lowerLimit);
  if (passedTime.years > props.lowerLimit) {
    fullDate =
      selectedYear.value + "-" + selectedMonth.value + "-" + selectedDay.value;
      errorMsg.value = "";
  } else {
    fullDate = "";
    errorMsg.value = props.errorMessage;
  }
  return fullDate;
}

function calculateTimePassed(year, month, day) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  // Calculate age in milliseconds
  let ageInMillis = currentDate - birthDate;

  // Convert milliseconds to years, months, and days
  const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25)); // Accounting for leap years
  ageInMillis -= ageInYears * (1000 * 60 * 60 * 24 * 365.25);
  const ageInMonths = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 30.44));
  ageInMillis -= ageInMonths * (1000 * 60 * 60 * 24 * 30.44);
  const ageInDays = Math.floor(ageInMillis / (1000 * 60 * 60 * 24));

  return {
    years: ageInYears,
    months: ageInMonths,
    days: ageInDays,
  };
}

watch(
  () => selectedDay.value,
  () => {
    let fullDate = buildFullDate();
    console.log(fullDate);
    emit("update:modelValue", fullDate);
  },
  { deep: true }
);

watch(
  () => selectedMonth.value,
  () => {
    setDayOptions(selectedMonth.value);
    let fullDate = buildFullDate();
    console.log(fullDate);
    emit("update:modelValue", fullDate);
  },
  { deep: true }
);

watch(
  () => selectedYear.value,
  () => {
    let fullDate = buildFullDate();
    console.log(fullDate);
    emit("update:modelValue", fullDate);
  },
  { deep: true }
);

// watch(
//   () => props.oldValue,
//   () => {
//     selectedDay.value = props.oldValue;
//   },
//   { deep: true }
// );

watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);
</script>

<template>
  <div class="grid grid-cols-5 md:grid-cols-4 gap-2 gap-x-3 px-5">
    <div class="md:col-span-1">
      {{ presentDate }}
      <label :for="title"></label>

      <select
        v-model="selectedDay"
        :name="title"
        :id="title"
        class="h-full w-full block text-center appearance-none bg-white text-xs md:text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none scrollbar-style"
      >
        <option v-for="data in dateOptions" :value="data.key">
          {{ data.value }}
        </option>
      </select>
    </div>

    <div class="col-span-2 md:col-span-1">
      <label :for="title"></label>

      <select
        v-model="selectedMonth"
        :name="title"
        :id="title"
        class="h-full w-full block text-center capitalize appearance-none bg-white text-xs md:text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none scrollbar-style"
      >
        <option
          v-for="data in monthsOptions"
          :value="data.key"
          class="capitalize"
        >
          {{ data.value }}
        </option>
      </select>
    </div>

    <div class="col-span-2">
      <label :for="title"></label>
      <input
        class="h-full w-full block p-3 md:p-4 text-center capitalize bg-white text-xs md:text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none"
        :name="label"
        :id="label"
        type="number"
        placeholder="year"
        :maxlength="limit"
        v-model="selectedYear"
      />
    </div>

    <div class="col-span-5">
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>
