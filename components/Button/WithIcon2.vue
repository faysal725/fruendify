<script setup>
const props = defineProps({
  name: String,
});
</script>

<template>
  <button
            
            class="w-fit  inline-flex justify-center items-center border border-lightGrey rounded-md p-1 px-3 text-base font-medium text-black"
          >
            <slot />
            <span>{{ props.name }}</span>
          </button>
</template>
