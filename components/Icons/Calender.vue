<script setup>
const props = defineProps({
  classes: {
    type: String,
    default: "stroke-blue-500",
    required: true,
  },
  color: {
    type: String,
    default: "black",
    required: true,
  },
  hoverColor: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <svg
    :class="classes "
    class="group-hover:stroke-white"
    :width="size"
    :height="size"
    viewBox="0 0 25 24"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5 5H6.5C5.39543 5 4.5 5.89543 4.5 7V19C4.5 20.1046 5.39543 21 6.5 21H18.5C19.6046 21 20.5 20.1046 20.5 19V7C20.5 5.89543 19.6046 5 18.5 5Z"
      
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.5 3V7"
      
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.5 3V7"
      
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.5 11H20.5"
      
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.5 15H8.5V17H10.5V15Z"
      
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
