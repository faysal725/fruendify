<script setup>
import useWordFilter from "../../composables/useWordFilter";
const props = defineProps({
  modelValue: [String, Number],
  title: String,
  label: String,
  type: String,
  error: String,
  classes: {
    type: String,
    default:
      "h-10 w-full p-6  block bg-white dark:bg-blackPrimary text-base text-gray-700 dark:text-gray-300  border border-gray-300 rounded-md focus:outline-none",
  },
  oldValue: [String, null],
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: String,
});

let errorMsg = ref("");
const previous = "" + props.oldValue;

const emit = defineEmits(["update:modelValue"]);
const { text, filterWords, errorMessage, limit } = useWordFilter();



onMounted(() => {
  if (props.oldValue !== "") {
    emit("update:modelValue", props.oldValue);
  }
})


watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);

watch(
  () => errorMessage,
  () => {
    errorMsg.value = errorMessage.value;
  },
  { deep: true }
);

watch(
  () => text,
  () => {
    emit("update:modelValue", text.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="w-full ">
    <label
      :for="label"
      class="block text-mediumBlack text-base leading-5 font-medium capitalize"
      ><span v-if="required" class="text-red-500 mr-1">*</span>
    </label>

    <input
      :class="classes"
      :name="label"
      :id="label"
      :type="type"
      :placeholder="placeholder ? placeholder : title"
      :value="previous"
      :maxlength="limit"
      @input="filterWords($event.target.value)"
    />
    <div>
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  text-align: start;
  font-size: 12px;
}
</style>
