<script setup>
import { useCrud } from "~~/composables/base";
import { BookmarkIcon, UserIcon } from "@heroicons/vue/24/solid";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { useFriendsStore } from "~~/stores/friendsStore";
import usePagination from "~/composables/usePagination";

const props = defineProps({
  interestOption: {
    type: Array,
    default: [],
  },
});

let nextProfileApi = api() + "/api/auth/get/next/favourites?page=";
let sendFavoriteRequestApi = api() + "/api/auth/make-favorite";

// stores
const friendsStore = useFriendsStore();
const {
  getCurrentFriend,
  clearCurrentFriend,
  setCurrentFriend,
  setCurrentFriendFromSlider,
  setShouldReload,
  setSettingFromGallary
} = friendsStore;

const { paginationData, paginationController } = usePagination();

const loaderState = ref();
const crud = useCrud();

const prof = [
  {
    name: "Something alison",
    distance: "1.5 KM",
    likes: "2.4k",
    imgSrc: "~~/public/friends/1.png",
  },
  {
    name: "X alison",
    distance: "1.5 KM",
    likes: "2.4k",
    imgSrc: "~~/public/friends/1.png",
  },
  {
    name: "Y alison",
    distance: "1.5 KM",
    likes: "2.4k",
    imgSrc: "~~/public/friends/1.png",
  },
  {
    name: "Z alison",
    distance: "1.5 KM",
    likes: "2.4k",
    imgSrc: "~~/public/friends/1.png",
  },
];

const currentFriend = ref(0);
const profiles = [
  {
    name: "Something alison",
    distance: "1.5 KM",
    likes: "2.4k",
    src: "https://i.ibb.co/9bWMMJP/photo.jpg",
    alt: "Image 1",
  },
  {
    name: "X alison",
    distance: "1.5 KM",
    likes: "2.4k",
    src: "https://i.ibb.co/RBB92RZ/unsplash-Yd9t-GOc8-Gi0-1.png",
    alt: "Image 2",
  },
  {
    name: "Y alison",
    distance: "1.5 KM",
    likes: "2.4k",
    src: "https://petapixel.com/assets/uploads/2022/12/image11-1-800x534.jpg",
    alt: "Image 3",
  },
];

const profileData = ref([]);

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const getFriend = async () => {
  loaderState.value = "pending";

  await crud
    .index({ path: nextProfileApi + paginationData.value.currentPage })
    .then((res) => {
      if (res.status == 200) {
        paginationData.value = res.res.data.metadata;
        if (res.res.data.data.length > 0) {
          setCurrentFriend(res.res.data.data[0]);
          res.res.data.data.map((dt, index) => {
            profileData.value.push({
              id: dt.user[0]._id,
              name: dt.user[0].first_name,
              distance: dt.distance,
              likes: dt.favouriteCount,
              src: networkImage(dt.user[0].profile_image),
              alt: "image-" + index,
              allData: dt,
            });
          });
        }

        console.log(res.res.data.metadata);
        loaderState.value = "resolved";
      } else {
        loaderState.value = "failed";
      }
    });
};

const getNextFriend = async () => {
  // loaderState.value = "pending";

  await crud
    .index({ path: nextProfileApi + paginationData.value.currentPage })
    .then((res) => {
      if (res.status == 200) {
        paginationData.value = res.res.data.metadata;
        if (res.res.data.data.length > 0) {
          res.res.data.data.map((dt, index) => {
            profileData.value.push({
              id: dt.user[0]._id,
              name: dt.user[0].first_name,
              distance: dt.distance,
              likes: dt.favouriteCount,
              src: networkImage(dt.user[0].profile_image),
              alt: "image-" + index,
              allData: dt,
            });
          });
        }

        console.log(res.res.data.metadata);
        // loaderState.value = "resolved";
      } else {
        // loaderState.value = "failed";
      }
    });
};

const newKey = ref(123);
// const changeFriend = async () => {
//   // loaderState.value = "pending";

//   await crud
//     .index({ path: nextProfileApi + paginationData.value.currentPage })
//     .then((res) => {
//       if (res.status == 200) {
//         // paginationData.value = res.res.data.metadata;
//         // console.log(profileData.value)
//         // console.log(res.res.data.data);
//         profileData.value.map((data) => {
//           if (data.allData._id == res.res.data.data[0]._id) {
//             // console.log('runned')
//             data['allData'] = res.res.data.data[0]
//           }
//         })
//       } else {
//       }
//     });
// };

const sendFavoriteRequest = async (data) => {
  loaderState.value = "pending";

  await crud
    .store({
      body: data,
      path: sendFavoriteRequestApi,
    })
    .then(async (res) => {
      if (res.status == 200) {
        await showToast("Request Sended successful");
        // await getNextFriend();
        loaderState.value = "resolve";
        setShouldReload(true);
      } else {
        showToast("Request Send Failed", "error", 5000);
        loaderState.value = "failed";
      }
    });
};

const getFriendFromStore = async () => {
  profileData.value.unshift({
    id: friendsStore.currentFriend.user[0]._id,
    name: friendsStore.currentFriend.user[0].first_name,
    distance: friendsStore.currentFriend.distance,
    likes: friendsStore.currentFriend.favouriteCount,
    src: networkImage(friendsStore.currentFriend.user[0].profile_image),
    alt: "image-" + profileData.length + 1,
    allData: friendsStore.currentFriend,
  });

  

  setTimeout(() => {
    setSettingFromGallary(false)
  }, 100);

  // res.res.data.data.map((dt, index) => {
  //   profileData.value.push({
  //     id: dt.user[0]._id,
  //     name: dt.user[0].first_name,
  //     distance: dt.distance,
  //     likes: dt.favouriteCount,
  //     src: networkImage(dt.user[0].profile_image),
  //     alt: "image-" + index,
  //     allData: dt,
  //   });
  // });
};

onMounted(() => {
  getFriend();
});

watch(
  () => friendsStore.settingFromGallary,
  () => {
    if (friendsStore.settingFromGallary) {
      getFriendFromStore();
    }
  }
);
</script>

<template>
  <main
    class="flex justify-start items-center lg:justify-center lg:items-center h-full flex-col space-y-8 min-h-[40vh] lg:min-h-[90vh]"
  >
    <section v-if="profileData.length > 0" class="relative">
      <SkeletonSlider :loaderState="loaderState">
        <CommonSlider
          :key="Math.random()"
          :sliderData="profileData"
          @forward="async () => await paginationController(getNextFriend, true)"
          @backword="
            async () => await paginationController(getNextFriend, false)
          "
          @currentdata="
            (dt) => {
              if (dt) {
                setCurrentFriendFromSlider(dt);
              }
            }
          "
          @callfavorite="(data) => sendFavoriteRequest(data)"
        />
      </SkeletonSlider>
    </section>

    <section v-else class="relative">
      <p class="text-3xl font-bold text-red-500/80">No Friends to show</p>
    </section>

    <div
      v-if="profileData.length > 0"
      class="flex justify-center flex-col items-center gap-7 w-full"
    >
      <div class="hidden lg:flex gap-4">
        <NuxtLink :to="'/profile/view/' + friendsStore.currentFriendId">
          <ButtonWithIcon
            name="Show Profile"
            classes="w-full h-full bg-gradient-to-r inline-flex justify-center items-center from-primary to-secondary py-1 px-4 rounded-full text-base lg:text-lg font-normal text-white hover:bg-gradient-to-r hover:from-secondary hover:to-primary"
          >
            <UserIcon class="h-5 w-5 text-white ml-3" />
          </ButtonWithIcon>
        </NuxtLink>
      </div>

      <section class="space-y-3 px-8 lg:hidden w-full">
        <p class="text-xl font-semibold dark:text-white">About</p>
        <p class="text-darkGrey dark:text-slate-300 text-base">
          {{
            friendsStore.currentFriend
              ? friendsStore.currentFriend.user[0].description
              : "None"
          }}
        </p>
      </section>

      <section class="space-y-3 w-full px-8 pb-36 lg:hidden">
        <p class="text-xl font-semibold dark:text-white">Interests</p>
        <SkeletonInterests :loaderState="loaderState">
          <div
            v-if="friendsStore.currentFriend?.user[0].interests.length > 0"
            class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            <div
              v-for="data in friendsStore.currentFriend?.user[0].interests"
              class="flex items-center justify-center rounded-full px-4 py-1 rounded-3xl gap-3 border cursor-pointer border-primary"
            >
              <img :src="data.image" alt="" class="h-7 w-7" v-if="data.image" />
              <p
                class="text-center capitalize text-xs md:text-sm font-medium text-wrap dark:text-white"
              >
                {{ data.title }}
              </p>
            </div>
          </div>
          <div v-else>
            <p class="text-primary font-semibold text-sm">No Item to show</p>
          </div>
        </SkeletonInterests>
      </section>
    </div>
  </main>
</template>
