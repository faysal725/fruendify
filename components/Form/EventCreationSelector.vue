<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  classes: {
    type: String,
    default: "grid grid-cols-2 gap-2 gap-4 md:min-w-96 py-6",
  },
  disable: {
    type: Boolean,
    default: false,
  },

  error: String,
  oldValue: {
    type: [Array, String],
    default: [],
  },
});

let errorMsg = ref("");

const emit = defineEmits(["update:modelValue"]);
const selectedOptions = ref([]);

const selectOption = (option) => {
  if (!props.disable) {
    // if (selectedOptions.value.includes(option._id)) {
    //   let index = selectedOptions.value.indexOf(option._id);
    //   selectedOptions.value.splice(index, 1);
    // } else {
    //   selectedOptions.value.push(option._id);
    // }

    selectedOptions.value = option._id
    emit("update:modelValue", selectedOptions.value);
  }
};

onMounted(() => {
  // if (props.oldValue.length > 0) {
  //     props.oldValue.map((data) => {
  //       props.options?.map((optData) => {
          
  //         if (optData._id == data) {
  //           selectOption(optData)
  //           // console.log(optData._id, data);
  //         }
  //       });
  //     });
  //   }

  if (props.oldValue) {
    // if (props.oldValue == props.options._id) {
    //   selectOption(optData)
    // }
      // props.oldValue.map((data) => {
        props.options?.map((optData) => {
          
          if (optData._id == props.oldValue) {
            selectOption(optData)
            // console.log(optData._id, data);
          }
        });
      // });
    }
});

watch(
  () => props.error,
  () => {
    errorMsg.value = props.error;
  },
  { deep: true }
);

watch(
  () => props.options,
  () => {
    // if (props.oldValue.length > 0) {
    //   props.oldValue.map((data) => {
    //     props.options.map((optData) => {
          
    //       if (optData._id == data) {
    //         selectOption(optData)
    //         // console.log(optData._id, data);
    //       }
    //     });
    //   });
    // }


    if (props.oldValue) {
        props.options?.map((optData) => {
          
          if (optData._id == props.oldValue) {
            selectOption(optData)
          }
        });
    }

  },
  { deep: true }
);
</script>

<template>
  <div>
    <p class="text-sm text-red-600">{{ errorMsg }}</p>
  </div>
  <div :class="classes">
    <div
      v-for="data in options"
      class="flex items-center justify-center flex-col rounded-lg px-4 py-1 rounded-3xl cursor-pointer"
      :class="
        selectedOptions.includes(data._id)
          ? 'border border-primary'
          : 'border-gray-300'
      "
      @click="selectOption(data)"
    >
      <img :src="data.image" alt="" class="h-10 w-10" />
      <p class="text-center capitalize text-xs font-medium text-wrap">
        {{ data.title }}
      </p>
    </div>
  </div>
</template>
