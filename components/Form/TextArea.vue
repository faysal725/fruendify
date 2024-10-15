<script setup>
import useWordFilter from "../../composables/useWordFilter";
const props = defineProps({
  modelValue: [String, Number],
  title: String,
  label: String,
  type: String,
  error: String,
  rows: {
    type: Number,
    default:5
  },
  classes: {
    type: String,
    default:
      "h-full w-full p-6  block bg-white dark:bg-blackPrimary text-sm md:text-base text-gray-700 dark:text-slate-200 border border-gray-300 rounded-md focus:outline-none",
  },
  oldValue: [String, null],
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: String,
});

// dark:text-gray-200
// dark:bg-blackPrimary
let errorMsg = ref("");
const previous = "" + props.oldValue;
const inputText = ref(props.oldValue);

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
  <div>
    <label
      :for="label"
      class="block text-mediumBlack text-base pb-3 leading-5 font-medium capitalize"
      ><span v-if="required" class="text-red-500 mr-1">*</span
      ><span>{{ title }}</span>
    </label>

    <!-- <textarea
      :id="label"
      :class="classes"
      :name="label"
      rows="5"
      cols="33"
      :placeholder="'Enter ' + placeholder"
      :maxlength="limit"
      @input="filterWords($event.target.value)"
    >
</textarea> -->
    <textarea
      
      :id="label"
      :class="classes"
      :name="label"
      :rows="rows"
      cols="33"
      :placeholder="placeholder"
      :maxlength="limit"
      v-model="inputText"
      @input="filterWords($event.target.value)"
    ></textarea>

    <div>
      <p class="text-sm text-red-600 text-start">{{ errorMsg }}</p>
    </div>
  </div>
</template>
