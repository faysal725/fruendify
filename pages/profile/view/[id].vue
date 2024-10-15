<script setup>
import {
  BookmarkIcon,
  MapPinIcon,
  PhotoIcon,
  HeartIcon,
} from "@heroicons/vue/24/solid";
import { useImageStore } from "~~/stores/imageStore";
import { useCrud } from "~~/composables/base";
import {isOwnersProfile} from "~~/composables/profile"
import {metersToKilometers} from "~~/composables/calculation"
import { useProfileStore } from "~~/stores/profileStore";

definePageMeta({
  middleware: "auth",
  // or middleware: 'auth'
});

let publicViewApi = api() + "/api/user/details?userId=";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let friendRequestApi = api() + "/api/auth/send-friend-request";
let sendFavoriteRequestApi = api() + "/api/auth/make-favorite";

const authStore = useAuthStore();
const imageStore = useImageStore();
const { setImages, getImageStatus, getImages } = imageStore;

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const crud = useCrud();

const publicData = ref(null);
const loaderState = ref();

let allTabs = [
  { key: 1, value: "Created" },
  { key: 2, value: "Upcomming Event" },
  { key: 3, value: "Joined" },
];

const additionalImages = ref([
  "/profilePg/2.png",
  "/profilePg/3.png",
  "/profilePg/4.png",
  "/profilePg/5.png",
  "/profilePg/6.png",
]);

const interestOption = ref();

const selectedInterest = computed(() => {
  let selecteds = [];
  if (publicData.value && interestOption.value) {
    publicData.value.interests.map((dt) => {
      interestOption.value.map((list) => {
        if (list._id == dt) {
          selecteds.push(list);
        }
      });
      // console.log(dt, eventList)
    });
  }

  return selecteds;
});

const getInterestOption = async () => {
  await crud.get({ path: interestOptionApi }).then((res) => {
    // console.log(res.res.data);
    interestOption.value = res.res.data;
  });
};

const getPublicData = async () => {
  loaderState.value = "pending";
  await crud.index({ path: publicViewApi + id }).then((res) => {
    if (res.status == 200) {
      console.log(res, "runn");
      // saveProfileData(res.res.data)
      publicData.value = res.res.data;

      loaderState.value = "resolved";
    } else {
      loaderState.value = "failed";
    }
  });
};

const sendFriendRequest = async () => {
  console.log(publicData.value._id);
  const requestData = {
    toUserId: id,
  };
  await crud
    .store({
      body: requestData,
      path: friendRequestApi,
    })
    .then((res) => {
      if (res.status == 422) {
        errors.value.role_name = res.message.errors.name
          ? errorFilter(res.message.errors.name)
          : "";
        showToast("Request send failed");
      }
      if (res.status == 200) {
        showToast("Request send successful");
        getPublicData();
      }
    });
};

const sendFavoriteRequest = async () => {
console.log(publicData.value)
  let formData = {
    toUserId: id,
    isFavourite: publicData.value.isFavourite ? false : true,
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
  getPublicData();
  getInterestOption();
});
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
          <!-- <CommonTab v-model="currentTab" :tabData="allTabs" /> -->
        </div>

        <section
          class="flex flex-col gap-4 max-h-[85vh] overflow-y-scroll scrollbar-hide"
        >
          <ContainerProfileLeftSideSection />
        </section>
      </section>
      <div class="hidden lg:block col-span-9 mb-10 px-8 -mt-6">
        
        <div class="w-full pb-5">
          <ContainerUniversalSearch />
        </div>
        <div class="bg-whitePrimary dark:bg-blackPrimary p-4 rounded-xl">
          <section class="grid grid-cols-12 gap-8">
            <section
              class="col-span-4 space-y-10 bg-lightBarley dark:bg-blackTertiary p-3 rounded-lg max-h-[90vh] overflow-y-scroll scrollbar-hide  pb-5"
            >
              <!-- profile  -->
              <SkeletonProfileImg :loaderState="loaderState">
                <section class="relative">
                  <img
                    :src="
                      networkImage(publicData ? publicData.profile_image : '#')
                    "
                    alt=""
                    class="h-full w-full rounded-lg"
                  />
                </section>
              </SkeletonProfileImg>

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
                      <SkeletonSpinner :loaderState="loaderState">
                        {{
                          publicData?.birth_date
                            ? calculateAge(
                                publicData?.birth_date.substring(0, 10)
                              )
                            : 0
                        }}
                      </SkeletonSpinner>
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
                      <SkeletonSpinner :loaderState="loaderState">
                        {{ publicData ? publicData.gender : "none" }}
                      </SkeletonSpinner>
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
                      <SkeletonSpinner :loaderState="loaderState">
                        {{
                          publicData && publicData.religion
                            ? publicData.religion.title
                            : "none"
                        }}
                      </SkeletonSpinner>
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
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
                    >
                      <SkeletonSpinner :loaderState="loaderState">
                        <!-- {{
                          publicData && publicData.education
                            ? publicData.education[0].title
                            : "none"
                        }} -->
                        {{
                          publicData?.education.length > 0
                            ? publicData.education[0].title
                            : "none"
                        }}
                      </SkeletonSpinner>
                      <!-- {{
                        publicData && publicData.education.length > 0
                          ? publicData.education.title
                          : "none"
                      }} -->
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
                      <SkeletonSpinner :loaderState="loaderState">
                        {{ publicData ? publicData.maritial_status : "none" }}
                      </SkeletonSpinner>
                      <!-- {{
                        publicData && publicData.maritial_status.length > 0
                          ? publicData.maritial_status
                          : "none"
                      }} -->
                    </p>
                  </div>
                </div>
              </section>

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
                      <SkeletonSpinner :loaderState="loaderState">
                        {{ publicData && publicData.smoke ? "Yes" : "No" }}
                      </SkeletonSpinner>
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
                      <SkeletonSpinner :loaderState="loaderState">
                        {{ publicData && publicData.drinks ? "Yes" : "No" }}
                      </SkeletonSpinner>
                    </p>
                  </div>

                  <!-- <div class="flex items-center gap-3 py-1.5">
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
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
                    >
                      <SkeletonSpinner :loaderState="loaderState">
                        {{
                          publicData && publicData.diet.length > 0
                            ? publicData.diet[0].title
                            : "none"
                        }}
                      </SkeletonSpinner>
                    </p>
                  </div> -->

                  <div class="flex items-center gap-3 py-1.5">
                    <img src="~~/assets/images/profile/sport.png" alt="" />
                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold"
                    >
                      Sport
                    </p>

                    <p
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
                    >
                      <SkeletonSpinner :loaderState="loaderState">
                        {{
                          publicData && publicData.drinks
                            ? "Active"
                            : "Inactive"
                        }}
                      </SkeletonSpinner>
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
                      class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
                    >
                      <SkeletonSpinner :loaderState="loaderState">
                        {{ publicData ? publicData.height : "none" }}
                      </SkeletonSpinner>
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
                  <SkeletonSpinner :loaderState="loaderState">
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
                  </SkeletonSpinner>
                </p>
              </section>

              <section class="w-full">
                <p class="text-base dark:text-white font-semibold pb-3">
                  Want to meet
                </p>
                <p
                  class="text-sm text-stone-600 dark:text-slate-300 font-semibold"
                >
                  <SkeletonSpinner :loaderState="loaderState">
                    <span
                      v-if="publicData"
                      v-for="(data, index) in publicData.want_to_meet"
                    >
                      {{ data }}
                      <span v-if="index + 1 < publicData.want_to_meet.length"
                        >,</span
                      >
                    </span>
                  </SkeletonSpinner>
                </p>
              </section>
            </section>

            <section class="col-span-8 space-y-2">
              <SkeletonName :loaderState="loaderState">
                <section class="flex justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <p
                        class="text-3xl font-semibold pb-3 capitalize dark:text-white"
                      >
                        {{ publicData ? publicData.first_name : "none" }}
                      </p>
                      <img
                        v-if="publicData?.is_verified"
                        src="~~/assets/images/profile/verified.svg"
                        alt=""
                      />
                    </div>
                    <div v-if="id !== profileStore.profileData?._id" class="inline-flex items-center justify-start gap-1">
                      <MapPinIcon class="h-5 w-5 text-secondary" />
                      <span
                        class="text-sm font-base text-slate-700 dark:text-slate-300"
                        >{{ publicData ? metersToKilometers(publicData.distance) : "0" }} km
                        away</span
                      >
                    </div>
                    <!-- <div
                    class="inline-flex items-center justify-start gap-1 pl-5"
                  >
                    <HeartIcon class="h-5 w-5 text-secondary" />
                    <span
                      class="text-sm font-base text-slate-700 dark:text-slate-300"
                      >2.4K</span
                    >
                  </div> -->
                  </div>

                  <div class="flex gap-2 items-center bg-gradient-to-t">
                    <!-- <ButtonLogin
                      @click="sendFriendRequest"
                      name="Add Friend"
                      classes="text-white  p-1 px-4 h-10 rounded-md bg-primary"
                    /> -->
                    <ButtonLogin
                      v-if="publicData?.is_verified"
                      name="Verified"
                      classes="text-white bg-green-500 p-1 px-4 h-10 rounded-md "
                    />

                    <button v-if="!isOwnersProfile(publicData?._id)"
                      @click="sendFavoriteRequest()"
                      class="text-white px-4 p-2 rounded-md flex items-center h-10"
                      :class="
                        publicData?.isFavourite
                          ? 'bg-gradient-to-t from-primary to-secondary'
                          : 'bg-slate-500'
                      "
                    >
                      <HeartIcon class="h-5 w-5 text-white" />
                    </button>
                  </div>
                </section>
              </SkeletonName>

              <!-- about me  -->
              <SkeletonAbout :loaderState="loaderState">
                <ContainerProfileAbout
                  :publicData="publicData ? publicData.description : ''"
                />
              </SkeletonAbout>
              <section class="space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-xl font-semibold dark:text-white">Photos</p>

                  <div class="flex items-center gap-2">
                    <PhotoIcon
                      class="h-6 w-6 text-mediumBlack text-slate-500 dark:text-slate-200"
                    />
                    <p
                      class="font-semibold text-slate-500 dark:text-slate-200 text-lg"
                    >
                      {{ publicData ? publicData.userImages.length : 0 }}
                    </p>
                  </div>
                </div>

                <SkeletonPhotos :loaderState="loaderState">
                  <div
                    v-if="publicData && publicData.userImages.length > 0"
                    class="grid grid-cols-3 lg:grid-cols-5 gap-2 relative"
                  >
                    <img
                      v-for="data in publicData.userImages"
                      :src="networkImage(data.image)"
                      alt=""
                      class="w-full h-full rounded-lg min-h-52 object-cover"
                    />
                    <span
                    v-if="!isOwnersProfile(publicData?._id) && !publicData?.isFavourite"
                      class="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-primary via-transparent to-secondary rounded-lg flex justify-center items-center"
                    >
                      <button
                        class="text-lg text-primary bg-whitePrimary hover:bg-blackPrimary dark:bg-blackPrimary dark:hover:bg-whitePrimary transition-all duration-100 px-4 py-2 rounded-lg"
                      >
                        Request Access
                      </button>
                    </span>
                  </div>
                  <div v-else class="flex items-center justify-center h-20">
                    <p class="text-red-500 text-xs">No Image to Show</p>
                  </div>
                </SkeletonPhotos>
              </section>

              <section class="space-y-3">
                <p class="text-xl font-semibold dark:text-white">Interests</p>
                
                <SkeletonInterests :loaderState="loaderState">
                  <div
                    v-if="selectedInterest.length > 0"
                    class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                  >
                    <div
                      v-for="data in selectedInterest"
                      class="flex items-center justify-center rounded-full px-4 py-1 rounded-3xl gap-3 border cursor-pointer border-primary"
                    >
                      <img v-if="data.image" :src="data.image" alt="" class="h-7 w-7" />
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
              </section>
            </section>
          </section>
        </div>
      </div>
      
      <div class="block lg:hidden col-span-12">
        <ContainerProfilePublicDetailsSmall
          v-if="publicData"
          :publicData="publicData"
          :loadingData="loaderState"
          :selectedInterest="selectedInterest"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
