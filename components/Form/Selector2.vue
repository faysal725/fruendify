<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  oldValue: {
    type: [Number, String],
    default: "",
  },
  title: {
    type: String,
    default: "demo",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(0);

onMounted(() => {
  if (props.oldValue) {
    selectedValue.value = props.oldValue;
  }
});

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
    selectedValue.value = props.oldValue;
  },
  { deep: true }
);
</script>
<template>
  <div>
    <p class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200">
      {{ title }}
    </p>
    <ul class="flex border border-red-200 rounded-lg overflow-hidden w-fit gap-1">
      <li
        v-for="option in options"
        @click="selectedValue = option.key"
        class="p-4 cursor-pointer flex items-center text-xs"
        :class="
          selectedValue == option.key
            ? 'bg-primary text-white'
            : 'bg-whiteSecondary dark:bg-blackSecondary dark:text-slate-200'
        "
      >
        {{ option.value }}
      </li>
    </ul>
  </div>
</template>
