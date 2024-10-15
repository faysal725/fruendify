<script setup>
import {
  ArrowLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  oldValue: Array,
  title: {
    type: String,
    default: "demo",
  },
  error: String,
});

let errorMsg = ref("");
const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref([]);

onMounted(() => {
  if (props.oldValue) {
    selectedValue.value = [...props.oldValue];
  }
});

const includeInterests = (_id) => {
  if (selectedValue.value.includes(_id)) {
    selectedValue.value.splice(selectedValue.value.indexOf(_id), 1);
  } else {
    selectedValue.value.push(_id);
  }
};

watch(
  () => selectedValue.value,
  () => {
    emit("update:modelValue", selectedValue.value);
  },
  { deep: true }
);

watch(
  () => props.oldValue,
  () => {
    selectedValue.value.push(props.oldValue);
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
  <div>
    <p class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200">
      {{ title }}
    </p>
    <ul class="flex justify-start gap-3 flex-wrap max-h-28 overflow-y-scroll scrollbar-hide">
      <li
        v-for="option in options"
        @click="includeInterests(option._id)"
        class="p-2 cursor-pointer flex items-center gap-3 text-xs rounded-md border border-lightGrey"
        :class="
          selectedValue.includes(option._id)
            ? 'bg-blackPrimary text-white'
            : 'bg-whiteSecondary '
        "
      >
        {{ option.title }}
        <XMarkIcon
          v-if="selectedValue.includes(option._id)"
          class="h-5 w-5 text-white"
        />
      </li>
    </ul>

    <div>
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>
