<script setup>
import { useImageStore } from "~~/stores/imageStore";
import { useAuthStore } from "~~/stores/authStore";
import { useCrud } from "~~/composables/base";
import { useProfileStore } from "~~/stores/profileStore";
import { HeartIcon } from "@heroicons/vue/24/outline";
import { MapPinIcon } from "@heroicons/vue/24/solid";


definePageMeta({
  middleware: "auth"
  // or middleware: 'auth'
})

const profileDataApi = api() + "/api/auth/profile";
let interestOptionApi = api() + "/api/admin/interest/public/list";

const authStore = useAuthStore();

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages } = imageStore;

const crud = useCrud();
const suspenseOn = ref(false);

let allTabs = [
  { key: 1, value: "Created", href: "/event/discover-event" },
  { key: 2, value: "Upcomming Event", href: "/event/my-event" },
  { key: 3, value: "Joined", href: "/event/upcomming-event" },
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

const eventList = ref();

const getProfileData = async () => {
  suspenseOn.value = true;
  setLoaderState("pending");
  await crud.index({ path: profileDataApi }).then((res) => {
    if (res.status == 200) {
      saveProfileData(res.res.data);
      setLoaderState("resolved");
    } else {
      setLoaderState("failed");
    }

    setTimeout(() => {
      suspenseOn.value = false;
    }, 5000);
    setShouldReload(false);
  });
};

const getInterestOption = async () => {
  await crud.get({ path: interestOptionApi }).then((res) => {
    // console.log(res.res.data);
    eventList.value = res.res.data;
  });
};

onMounted(() => {
  getInterestOption();
});

onMounted(async () => {
  getProfileData();
});

watch(
  () => profileStore.shouldReload,
  () => {
    if (profileStore.shouldReload) {
      getProfileData();
      // console.log(profileStore.loaderState)
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
            pageName="profileEvent"
          /> -->
        </div>

        <section
          class="flex flex-col gap-4 max-h-[85vh] overflow-y-scroll scrollbar-hide"
        >
          <!-- <CardsProfile v-for="data in profiles" :profile="data" /> -->
           <ContainerProfileLeftSideSection />
        </section>
      </section>
      <div class="hidden lg:block col-span-9 mb-10 px-8 -mt-10">
        <div class="w-full pb-5">
          <ContainerUniversalSearch />
        </div>
        <div class="bg-whitePrimary dark:bg-blackPrimary p-4 rounded-xl">
          <section class="grid grid-cols-12 gap-8">
            <section
              class="col-span-4 space-y-10 bg-lightBarley dark:bg-blackTertiary p-3 rounded-lg max-h-[90vh] overflow-y-scroll scrollbar-hide pb-5"
            >
              <!-- profile  -->
              <ContainerProfileImage pageType="none" />

              <!-- about  -->
              <ContainerProfileHabits />
            </section>

            <section class="col-span-8 space-y-2">
              <ContainerProfileName />

              <ContainerProfileAbout />

              <section class="space-y-3">
                <p class="text-xl font-semibold dark:text-white">Photos</p>
                <SkeletonPhotos>
                  <div
                    v-if="profileStore.profileData"
                    class="grid grid-cols-2 md:grid-cols-4 gap-2"
                  >
                    <div
                      v-if="profileStore.profileData.userImages.length > 0"
                      v-for="(data, index) in profileStore.profileData
                        .userImages"
                      class=""
                    >

                      <img class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-36 w-full bg-no-repeat object-cover relative" :src="networkImage(data.image)" alt="">
                    </div>
                    <p
                      v-else
                      class="text-red-500 text-xs text-center col-span-4"
                    >
                      No Profile Images to show
                    </p>
                  </div>
                </SkeletonPhotos>
              </section>

              <ContainerProfileInterests
                :classes="'grid grid-cols-3 xl:grid-cols-5 gap-4'"
              />
            </section>
          </section>
        </div>
      </div>

      <div class="block lg:hidden col-span-12">
        <ContainerProfileDetailsSmall pageType="none" />
      </div>
    </div>
  </NuxtLayout>
</template>
