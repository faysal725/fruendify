<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  oldValue: [Number, String],
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
    <ul class="flex justify-start gap-3 flex-wrap">
      <li
        v-for="option in options"
        @click="selectedValue = option.key"
        class="p-2 px-4 cursor-pointer flex items-center text-xs rounded-lg border border-lightGrey"
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
