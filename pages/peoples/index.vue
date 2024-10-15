<script setup>
definePageMeta({
  layout: "common",
});
const searchString = ref();

const eventList = ref([
  { name: "Cycling", imgSrc: "/cycling.png" },
  { name: "Boating", imgSrc: "/boating.png" },
  { name: "dance", imgSrc: "/dance.png" },
  { name: "drinking", imgSrc: "/drinking.png" },
  { name: "hangout", imgSrc: "/hangout.png" },
  { name: "hiking", imgSrc: "/hiking.png" },
  { name: "party", imgSrc: "/party.png" },
  { name: "surfing", imgSrc: "/surfing.png" },
  { name: "hangout", imgSrc: "/hangout.png" },
  { name: "hiking", imgSrc: "/hiking.png" },
  { name: "party", imgSrc: "/party.png" },
  { name: "surfing", imgSrc: "/surfing.png" },
  { name: "hangout", imgSrc: "/hangout.png" },
  { name: "hiking", imgSrc: "/hiking.png" },
  { name: "party", imgSrc: "/party.png" },
  { name: "surfing", imgSrc: "/surfing.png" },
]);

const profiles = ref([
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    distance: "800 meter",
    type: "dating",
    imgSrc: "/profilecard/1.png",
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    distance: "800 meter",
    type: "dating",
    imgSrc: "/profilecard/2.png",
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    distance: "800 meter",
    type: "dating",
    imgSrc: "/profilecard/3.png",
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    distance: "800 meter",
    type: "dating",
    imgSrc: "/profilecard/2.png",
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    distance: "800 meter",
    type: "dating",
    imgSrc: "/profilecard/3.png",
  },
]);

const userImages = ref([
  { id: 0, imgSrc: "/face/self.jpeg" },
  { id: 1, imgSrc: "/face/self2.jpeg" },
]);
const locationCollected = ref(false);

const showmap = () => {
  if (locationCollected.value) {
    locationCollected.value = false;
  } else {
    locationCollected.value = true;
  }
};

watch(
  () => searchString.value,
  () => {
    console.log(searchString.value);
  },
  { deep: true }
);
</script>

<template>
  <main class="min-h-screen">
    <PageSearchbar v-model="searchString" />

    <PageEventList :eventData="eventList" />
    <!-- <ImgRecognizer :userImages="userImages" /> -->
    <div
      class="py-10 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10"
    >
      <CardsProfile v-for="data in profiles" :profile="data" />
    </div>
  </main>
</template>
