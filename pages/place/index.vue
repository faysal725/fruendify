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
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
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
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
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
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
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
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
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
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
  },
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

    <div class="py-10 max-w-7xl mx-auto grid grid-cols-2 gap-10">
      <ul v-if="locationCollected" class="space-y-4">

        <CardsLgProfile v-for="data in profiles"  :profile="data" />
      </ul>
      <div :class="locationCollected ? '' : 'col-span-2'" @click="showmap()">
        <img
          src="../../assets/images/event/map.png"
          alt=""
          class="w-full h-full rounded-lg shadow-xl"
        />
      </div>
    </div>
  </main>
</template>
