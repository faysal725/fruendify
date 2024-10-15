<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  need: {
    type: String,
    default: "key",
  },
  oldValue: Number || String,
  error: String,
});


let errorMsg = ref("");
const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(0);

onMounted(() => {
  if (props.oldValue) {
    selectedValue.value = props.oldValue;
    emit("update:modelValue", selectedValue.value);
  }
});

watch(
  () => selectedValue.value,
  () => {
    if (props.need == "value") {
      let value;
      props.options.map((option) => {
        // selectedValue.value == option.key ?
        if (selectedValue.value == option.key) {
          value = option.value;
        }
      });
      emit("update:modelValue", value);
    } else {
      emit("update:modelValue", selectedValue.value);
    }
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

watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);

</script>
<template>
  <ul class="flex flex-col gap-2">
    
    <div>
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>
    <li
      v-for="option in options"
      @click="selectedValue = option.key"
      class="p-2 md:p-3 px-4 md:px-6 rounded-lg cursor-pointer text-sm transition-all duration-200"
      :class="
        selectedValue == option.key
          ? 'bg-secondary text-white'
          : 'bg-whiteSecondary '
      "
    >
      {{ option.value }}
    </li>
  </ul>
</template>
