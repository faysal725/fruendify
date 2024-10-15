<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  classes: {
    type: String,
    default: "capitalize text-sm text-gray-600 outline-none text-end min-w-14 rounded-md",
  },
  title: String,
  return: {
    type: String,
    default: "key"
  },
  show: {
    type: String,
    default: "value"
  },
  oldValue: [Number, String, Boolean],
  error: String,
});

const emit = defineEmits(["update:modelValue"]);


let errorMsg = ref("");
const selectedValue = ref(0);


onMounted(() => {


  console.log(props.options.length, props.oldValue, 'old value')
  if (props.options.length > 0) {
    selectedValue.value = props.options[0][props.return]
  }

  if (typeof props.oldValue !== 'undefined') {
    // console.log('is here', props.oldValue)
    selectedValue.value = props.oldValue
  }
})

watch(
  () => selectedValue.value,
  () => {
    console.log(selectedValue.value)
    emit("update:modelValue", selectedValue.value);
  },
  { deep: true }
);

watch(
  () => props.oldValue,
  () => {
    console.log('old value')
    selectedValue.value = props.oldValue
    emit("update:modelValue", selectedValue.value);
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
    <label :for="title"></label>
    
    <select
      v-model="selectedValue"
      :name="title"
      :id="title"
      :class="classes"
    >
      <option v-for="data in options" :value="data[props.return]">
        {{ data[props.show].substring(0, 10) }}
      </option>

    </select>
    <div>
      <p class="text-sm text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>
