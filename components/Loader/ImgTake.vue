<script setup>

const loader = ref(true);

setTimeout(() => {
  loader.value = false;
}, 3000);

</script>


<template>
    
    <div v-if="loader" class="flex justify-center py-10 relative">
        <img src="../../assets/images/loader/frame.png" alt="">
        <img src="../../assets/images/loader/circle.png" alt="" class="absolute top-16 animate-[spinner_3s_ease-in-out_infinite]">
    </div>

    <slot v-else/>
</template>