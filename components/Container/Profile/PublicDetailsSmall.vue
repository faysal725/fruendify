<script setup>
import { MapPinIcon, ArrowLeftIcon, HeartIcon } from "@heroicons/vue/24/solid";
import { useImageStore } from "~~/stores/imageStore";
import { useCrud } from "~~/composables/base";

const props = defineProps({
  pageType: {
    type: String,
    default: "",
  },
  publicData: {
    type: String,
    default: "",
  },
  selectedInterest: {
    type: Array,
    default: [],
  },
  loadingData: String,
});

let publicViewApi = api() + "/api/public/user/data?id=";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let sendFavoriteRequestApi = api() + "/api/auth/make-favorite";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const crud = useCrud();

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages } = imageStore;

// const publicData = ref();
const loaderState = ref(props.loadingData);

const additionalImages = ref([
  "/profilePg/2.png",
  "/profilePg/3.png",
  "/profilePg/4.png",
  "/profilePg/5.png",
  "/profilePg/6.png",
  "/profilePg/7.png",
]);

const interestOption = ref();

const currentTab = ref(1);
let allTabs = [
  { key: 1, value: "About", href: "/event/discover-event" },

  { key: 2, value: "Photo", href: "/event/my-event" },
  { key: 3, value: "Interests", href: "/event/upcomming-event" },
];

const enlargedPhoto = ref(additionalImages.value[0]);
const openModal = ref(false);

const enlarge = (src) => {
  enlargedPhoto.value = src;
  openModal.value = true;
};

const getInterestOption = async () => {
  await crud.get({ path: interestOptionApi }).then((res) => {
    interestOption.value = res.res.data;
  });
};

const getPublicData = async () => {
  loaderState.value = "pending";
  await crud.index({ path: publicViewApi + id }).then((res) => {
    if (res.status == 200) {
      // publicData.value = res.res.data;

      loaderState.value = "resolved";
    } else {
      loaderState.value = "failed";
    }
  });
};

const sendFavoriteRequest = async () => {
  console.log(props.publicData.isFavourite)
  let formData = {
    toUserId: id,
    isFavourite: props.publicData.isFavourite ? false : true,
  };

  await crud
    .store({
      body: formData,
      path: sendFavoriteRequestApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Request Sended successful");
        getPublicData();
      } else {
        showToast("Request Send Failed", "error", 5000);
      }
    });
};

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

onMounted(async () => {
  // getPublicData();
  getInterestOption();
});

watch(
  () => props.loadingData,
  () => {
    console.log("loadrer state small");
    loaderState.value = props.loadingData;
  }
);
</script>

<template>
  <div class="grid grid-cols-12 cursor-default relative">
    <div class="col-span-12 mb-10">
      <div
        class="bg-whitePrimary dark:bg-blackPrimary p-4 rounded-xl min-h-screen"
      >
        <!-- heading  -->
        <div class="flex justify-between pb-5">
          <div class="flex gap-2 items-center">
            <ButtonBack />
            <p class="text-base font-bold dark:text-white">Profile</p>
          </div>
        </div>

        <section class="grid grid-cols-12">
          <!-- profile  -->
          <section class="col-span-12">
            <section
              class="space-y-5 bg-lightBarley dark:bg-blackTertiary p-3 rounded-lg"
            >
              <SkeletonProfileImg :loaderState="loaderState">
                <section class="relative">
                  <img
                    :src="networkImage(publicData.profile_image)"
                    alt=""
                    class="h-full w-full rounded-lg"
                  />

                  <div
                    class="absolute top-0 right-0 w-full h-fit flex justify-end -mb-3"
                  >
                    <div
                      v-if="publicData.is_verified"
                      class="w-fit bg-gradient-to-r py-2 px-4 to-secondary text-sm bg-green-600 rounded-md text-white"
                    >
                      <p class="bottom-0 right-1/2 text-sm capitalize">
                        Verified
                      </p>
                    </div>
                  </div>

                  <div
                    class="absolute -bottom-8 right-0 w-full flex justify-center items-center"
                  >
                    <span
                      v-if="!isOwnersProfile(publicData?._id)"
                      @click="sendFavoriteRequest()"
                      class="p-3 rounded-full cursor-pointer text-sm text-white w-fit"
                      :class="
                        publicData?.isFavourite
                          ? 'bg-gradient-to-t from-primary to-secondary'
                          : 'bg-slate-500'
                      "
                    >
                      <HeartIcon class="h-10 w-10 text-gray-900" />
                    </span>
                  </div>
                </section>
              </SkeletonProfileImg>

              <section class="flex justify-between">
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-lg md:text-xl font-semibold dark:text-white">
                      {{ publicData.first_name }}
                    </p>
                    <img
                      src="~~/assets/images/profile/verified.svg"
                      alt=""
                      class="h-4 w-4"
                    />
                  </div>
                  <div
                    class="inline-flex items-center justify-start gap-1 pt-2"
                  >
                    <MapPinIcon class="h-4 w-4 text-secondary" />
                    <span
                      class="text-xs md:text-sm font-base text-slate-700 dark:text-slate-300"
                      >{{ publicData ? publicData.distance : "0" }} km
                      away</span
                    >
                    <!-- <span
                        class="text-sm font-base text-slate-700 dark:text-slate-300"
                        >{{ publicData ? publicData.distance : "0" }} km
                        away</span
                      > -->
                  </div>
                  <!-- <div
                    class="inline-flex items-center justify-start gap-1 pl-5 pt-2"
                  >
                    <HeartIcon class="h-4 w-4 text-secondary" />
                    <span
                      class="text-xs md:text-sm font-base text-slate-700 dark:text-slate-300"
                      >2.4K</span
                    >
                  </div> -->
                </div>
              </section>

              <!-- about me  -->
              <ContainerProfileAbout
                :publicData="publicData ? publicData.description : ''"
              />

              <!-- interests -->
              <!-- <SkeletonInterests :loaderState="loaderState">
                <div v-if="publicData" class="">
                  <FormEventSelector
                    :options="interestOption"
                    :classes="'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'"
                    :disable="true"
                    :oldValue="publicData.interests"
                  />
                </div>
              </SkeletonInterests> -->

              <SkeletonInterests :loaderState="loaderState">
                <div
                  v-if="selectedInterest.length > 0"
                  class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                >
                  <div
                    v-for="data in selectedInterest"
                    class="flex items-center justify-center rounded-full px-4 py-1 rounded-3xl gap-3 border cursor-pointer border-primary"
                  >
                    <img
                      v-if="data.image"
                      :src="data.image"
                      alt=""
                      class="h-7 w-7"
                    />
                    <p
                      class="text-center capitalize text-xs md:text-sm font-medium text-wrap dark:text-white"
                    >
                      {{ data.title }}
                    </p>
                  </div>
                </div>
                <div v-else>
                  <p class="text-primary font-semibold text-sm">
                    No Item to show
                  </p>
                </div>
              </SkeletonInterests>

              <!-- photos  -->
              <SkeletonPhotos :loaderState="loaderState">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <img
                    v-if="publicData.userImages[0]"
                    @click="enlarge(publicData.userImages[0]?.image)"
                    :src="networkImage(publicData.userImages[0]?.image)"
                    alt=""
                    class="w-full h-full rounded-lg object-cover"
                  />

                  <img
                    v-if="publicData.userImages[1]"
                    @click="enlarge(publicData.userImages[1]?.image)"
                    :src="networkImage(publicData.userImages[1]?.image)"
                    alt=""
                    class="w-full h-full rounded-lg object-cover"
                  />
                </div>
              </SkeletonPhotos>

              <!-- about  -->
              <section class="w-full">
                <div>
                  <p class="text-base font-semibold pb-3 dark:text-white">
                    About Me
                  </p>
                </div>

                <div class="flex flex-col divide-y">
                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/ageRange.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
                    >
                      Age
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      23
                    </p>
                  </div>
                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/genders.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
                    >
                      Gender
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
                    >
                      {{ publicData ? publicData.gender : "none" }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/pray.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Religion
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      {{
                        publicData && publicData.religion
                          ? publicData.religion.title
                          : "none"
                      }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/education.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Education
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      {{
                        publicData?.education.length > 0
                          ? publicData.education[0].title
                          : "none"
                      }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/relation.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Status
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
                    >
                      {{ publicData ? publicData.maritial_status : "none" }}
                    </p>
                  </div>
                </div>
              </section>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <img
                  v-if="publicData.userImages[2]"
                  @click="enlarge(publicData.userImages[2].image)"
                  :src="networkImage(publicData.userImages[2].image)"
                  alt=""
                  class="w-full h-full rounded-lg object-cover"
                />

                <img
                  v-if="publicData.userImages[3]"
                  @click="enlarge(publicData.userImages[3].image)"
                  :src="networkImage(publicData.userImages[3].image)"
                  alt=""
                  class="w-full h-full rounded-lg object-cover"
                />
              </div>

              <section class="w-full">
                <div class="flex gap-2 items-center justify-between h-fit pb-3">
                  <p class="text-base font-semibold dark:text-white">
                    More About Me
                  </p>
                </div>
                <div class="flex flex-col divide-y">
                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/smoke.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Smoking
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      {{ publicData && publicData.smoke ? "Yes" : "No" }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/drink.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Drinking
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      {{ publicData && publicData.drinks ? "Yes" : "No" }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 py-1.5">
                    <img
                      src="~~/assets/images/profile/healthy-food.png"
                      alt=""
                    />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Diet
                    </p>
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      {{
                        publicData && publicData.diet.length > 0
                          ? publicData.diet[0].title
                          : "none"
                      }}
                      <!-- {{ publicData && publicData.diet ? publicData.diet[0].title : "none" }} -->
                    </p>
                  </div>

                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/sport.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Sport
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      {{
                        publicData && publicData.drinks ? "Active" : "Inactive"
                      }}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/height.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Height
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
                    >
                      {{ publicData ? publicData.height : "none" }}
                    </p>
                  </div>
                </div>
              </section>

              <section class="w-full">
                <p class="text-base font-semibold dark:text-white pb-3">
                  Language
                </p>
                <p
                  class="text-sm text-stone-600 dark:text-slate-300 font-semibold"
                >
                  <span
                    v-if="publicData"
                    v-for="(language, index) in publicData.languages"
                  >
                    <!-- {{ findingValue(languageOption, language) }} -->
                    {{ language.title }}
                    <span v-if="index + 1 < publicData.languages.length"
                      >,</span
                    >
                  </span>
                </p>
              </section>

              <SkeletonPhotos :loaderState="loaderState">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <img
                    v-if="publicData.userImages.length == 5"
                    @click="enlarge(publicData.userImages[4].image)"
                    :src="networkImage(publicData.userImages[4].image)"
                    alt=""
                    class="w-full h-full rounded-lg"
                  />

                  <img
                    v-if="publicData.userImages.length == 6"
                    @click="enlarge(publicData.userImages[5].image)"
                    :src="networkImage(publicData.userImages[5].image)"
                    alt=""
                    class="w-full h-full rounded-lg"
                  />
                </div>
              </SkeletonPhotos>

              <section class="w-full">
                <p class="text-base dark:text-white font-semibold pb-3">
                  Want to meet
                </p>
                <p
                  class="text-sm text-stone-600 dark:text-slate-300 font-semibold"
                >
                  <span
                    v-if="publicData"
                    v-for="(data, index) in publicData.want_to_meet"
                  >
                    {{ data }}
                    <span v-if="index + 1 < publicData.want_to_meet.length"
                      >,</span
                    >
                  </span>
                </p>
              </section>
            </section>

            <!-- <ContainerProfileSummery :pageType="pageType"  />
            
            <ContainerProfileInterests :pageType="pageType" />
            <ContainerProfilePhotos v-if="currentTab == 2" /> -->
          </section>
        </section>
      </div>
    </div>

    <!-- photo modal  -->

    <ModalPhotoviewer
      :openModal="openModal"
      :src="networkImage(enlargedPhoto)"
      @update-input="(data) => (openModal = data)"
    />
  </div>
</template>
