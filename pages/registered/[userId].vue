<script setup>
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "common",
});


const router = useRouter();
const route = useRoute();
const userId = route.params.userId;
let registerUser = ref(true)


const change = () => {
  // open.value = true
  registerUser.value = true;
};

const close = () => {
  registerUser.value = false;
}


</script>

<template>
  <main>
    <PageHerosection />
    <ContainerDiscount />
    <ContainerMeetup />
    <ContainerHowWorks />
    <ContainerTestimonial />

    <ContainerStories />
    
  <ContainerUserDetails :shouldOpenModal="registerUser" @update-input="close"/>
  </main>
</template>
