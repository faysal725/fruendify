<script setup>
const props = defineProps({
  stepNo: {
    type: Number,
    default: 0,
  },
  total:{
    type: Number,
  }
});

const totalStep = ref([])
const emit = defineEmits(["changeState"]);

onMounted(() => {
  for (let i = 1; i <= props.total; i++) {
    
    totalStep.value.push(i)
  }
})
</script>

<template>
  <div class="flex justify-center items-center gap-6">
    <span
    @click="$emit('changeState', step)"
      v-for="step in totalStep"
      class="block h-3 w-3  rounded-full hover:bg-mediumBlack cursor-pointer"
      :class="stepNo == step ? 'bg-mediumBlack' : 'bg-lightGrey'"
    ></span>
    <!-- <span class="block h-3 w-3 bg-mediumBlack rounded-full"></span>
    <span class="block h-3 w-3 bg-lightGrey rounded-full"></span>
    <span class="block h-3 w-3 bg-lightGrey rounded-full"></span>
    <span class="block h-3 w-3 bg-lightGrey rounded-full"></span>
    <span class="block h-3 w-3 bg-lightGrey rounded-full"></span> -->
  </div>
</template>
