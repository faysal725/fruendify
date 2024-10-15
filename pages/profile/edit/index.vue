<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import {
  MapPinIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/vue/24/solid";
import { useImageStore } from "~~/stores/imageStore";
import { useProfileStore } from "~~/stores/profileStore";

definePageMeta({
  middleware: "auth",
  // or middleware: 'auth'
});

const profileDataApi = api() + "/api/auth/profile";

const profileStore = useProfileStore();
const {
  saveProfileData,
  setLoaderState,
  getLoaderState,
  shouldReload,
  setShouldReload,
} = profileStore;

const crud = useCrud();

let allTabs = [
  { key: 1, value: "Created" },
  { key: 2, value: "Upcomming Event" },
  { key: 3, value: "Joined" },
];

const profiles = ref([
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/4.png",
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
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/5.png",
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
    language: "En, Jpn",
    distance: "800",
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
    language: "En, Jpn",
    distance: "800",
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
    language: "En, Jpn",
    distance: "800",
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
    language: "En, Jpn",
    distance: "800",
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

const additionalImages = ref([
  "/profilePg/2.png",
  "/profilePg/3.png",
  "/profilePg/4.png",
  "/profilePg/5.png",
  "/profilePg/6.png",
  "/profilePg/7.png",
]);

const eventList = ref([
  { id: 0, name: "Cycling", imgSrc: "/cycling.png" },
  { id: 1, name: "Boating", imgSrc: "/boating.png" },
  { id: 2, name: "dance", imgSrc: "/dance.png" },
  { id: 3, name: "drinking", imgSrc: "/drinking.png" },
  { id: 4, name: "hangout", imgSrc: "/hangout.png" },
  { id: 5, name: "hiking", imgSrc: "/hiking.png" },
  { id: 6, name: "party", imgSrc: "/party.png" },
]);

const editSection = ref("");

const userData = ref({
  about:
    "I am honest, encouraging, sweet , and always pure. I'm passionate about art, music, and good food, and I'm always up for a lively conversation or a fun adventure. In my free time, you can usually find me painting, hiking in the mountains, or checking out the latest",
});

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages, clearImages } = imageStore;

const editController = (sectionName) => {
  if (editSection.value == sectionName) {
    editSection.value = "";
  } else {
    editSection.value = sectionName;
  }
};

const getProfileData = async () => {
  setLoaderState("pending");
  await crud.index({ path: profileDataApi }).then((res) => {
    if (res.status == 200) {
      saveProfileData(res.res.data);
      setLoaderState("resolved");
    } else {
      setLoaderState("failed");
    }

    setShouldReload(false);
  });
};

onMounted(async () => {
  getProfileData();
});

onMounted(async () => {
  clearImages();
});

watch(
  () => profileStore.shouldReload,
  () => {
    if (profileStore.shouldReload) {
      getProfileData();
      console.log(profileStore.loaderState);
    }
  }
);
</script>

<template>
  <NuxtLayout
    name="verified"
    classes="max-h-full lg:max-h-screen overflow-hidden"
  >
    <div class="grid grid-cols-12 cursor-default">
      <section
        class="hidden lg:block col-span-3 pt-5 bg-whitePrimary dark:bg-blackPrimary px-4"
      >
        <!-- tabs  -->
        <div class="pb-2">
          <!-- <CommonTab
            v-model="currentTab"
            :tabData="allTabs"
            pageName="profile"
          /> -->
        </div>

        <section
          class="flex flex-col gap-4 max-h-[85vh] overflow-y-scroll scrollbar-hide"
        >
          <ContainerProfileLeftSideSection />
        </section>
      </section>
      <div class="hidden lg:block col-span-9 mb-10 px-8 -mt-10">
        <div class="w-full pb-5">
          <ContainerUniversalSearch />
        </div>
        <div class="bg-whitePrimary dark:bg-blackPrimary p-4 rounded-xl ">
          <section class="grid grid-cols-12 gap-8 min-h-[90vh]">
            <section
              class="col-span-4 space-y-10 bg-lightBarley dark:bg-blackTertiary p-3 rounded-lg max-h-[90vh] overflow-y-scroll scrollbar-hide pb-5"
            >
              <!-- profile  -->
              <ContainerProfileImage pageType="edit" />

              <!-- about  -->
              <ContainerProfileHabits pageType="edit" />
            </section>

            <section class="col-span-8 space-y-2">
              <ContainerProfileName pageType="edit" />

              <!-- about section  -->
              <ContainerProfileAbout :data="userData.about" pageType="edit" />

              <section class="space-y-3">
                <p class="text-xl font-semibold dark:text-white">Photos</p>

                <ContainerProfileImagesUploader />
              </section>

              <ContainerProfileInterests
                pageType="edit"
                :classes="'grid grid-cols-3 xl:grid-cols-5 gap-4'"
              />
            </section>
          </section>
        </div>
      </div>

      <div class="block lg:hidden col-span-12">
        <ContainerProfileDetailsSmall pageType="edit" />
      </div>
    </div>
  </NuxtLayout>
</template>
