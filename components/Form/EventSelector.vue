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
  oldValue: {
    type: Array,
  },
});

const emit = defineEmits(["eventSelection"]);
const selectedOptions = ref([]);
const shouldExpand = ref(false);

const selectOption = (option) => {
  if (!props.disable) {
    if (selectedOptions.value.includes(option._id)) {
      let index = selectedOptions.value.indexOf(option._id);
      selectedOptions.value.splice(index, 1);
    } else {
      selectedOptions.value.push(option._id);
    }
    console.log(selectedOptions.value);
    emit("eventSelection", selectedOptions.value);
  }
};

onMounted(() => {
  if (props.oldValue) {
    selectedOptions.value = [...props.oldValue];
    emit("eventSelection", selectedOptions.value);
  }
});
</script>

<template>
  <section
    class="overflow-y-scroll overflow-x-hidden scrollbar-hide relative transition-all duration-150"
    :class="shouldExpand ? 'max-h-48' : 'max-h-28'"
  >
    <div :class="classes">
      <div
        v-for="data in options"
        class="flex items-center justify-center rounded-full px-4 py-1 rounded-3xl gap-3 border cursor-pointer"
        :class="
          selectedOptions.includes(data._id)
            ? ' border-primary'
            : 'border-gray-300'
        "
        @click="selectOption(data)"
      >
        <img v-if="data.image" :src="data.image" alt="" class="h-7 w-7" />
        <p
          class="text-center capitalize text-xs md:text-sm font-medium text-wrap dark:text-white"
        >
          {{ data.title }}
        </p>
      </div>
      
    </div>
    <div
      v-if="options && options.length > 11"
      class="flex justify-center sticky w-full bottom-0 bg-white/20"
    >
      <p
        @click="shouldExpand = !shouldExpand"
        class="text-white text-xs font-medium cursor-pointer bg-secondary w-fit p-1 rounded-lg"
      >
        {{  !shouldExpand ? 'See More' : 'Show Less' }}
      </p>
    </div>
  </section>
</template>
