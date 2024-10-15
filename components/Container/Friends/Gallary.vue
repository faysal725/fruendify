<script setup>
import { useCrud } from "~~/composables/base";
import { useFriendsStore } from "~~/stores/friendsStore";

// apis
let friendsRequestApi = api() + "/api/auth/favourites";

const crud = useCrud();
const router = useRouter();

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

const emit = defineEmits([
  "openModal"
]);

const additionalImages = ref([
  { name: "Name", imgSrc: "/profilePg/2.png" },
  { name: "Name", imgSrc: "/profilePg/3.png" },
  { name: "Name", imgSrc: "/profilePg/4.png" },
  { name: "Name", imgSrc: "/profilePg/5.png" },
  { name: "Name", imgSrc: "/profilePg/6.png" },
  { name: "Name", imgSrc: "/profilePg/7.png" },
]);
const loaderState = ref();
const friendsData = ref([]);

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

// friends data
const getFriendsData = async () => {
  loaderState.value = "pending";
  await crud.index({ path: friendsRequestApi }).then((res) => {
    if (res.status == 200) {
      // saveProfileData(res.res.data)
      friendsData.value = res.res.data.data;

      loaderState.value = "resolved";
      setShouldReload(false)
    } else {
      loaderState.value = "failed";
    }
  });
};


const inesertFriendsDataToStore = async (data) => {
  // loaderState.value = "pending";
  // await crud.index({ path: friendsRequestApi }).then((res) => {
  //   if (res.status == 200) {
  //     // saveProfileData(res.res.data)
  //     friendsData.value = res.res.data.data;

  //     loaderState.value = "resolved";
  //     setShouldReload(false)
  //   } else {
  //     loaderState.value = "failed";
  //   }
  // });
  
  await setCurrentFriend(data);
  await setSettingFromGallary(true)
  await emit("openModal");
};

onMounted(() => {
  getFriendsData();
});

onUnmounted(() => {
  clearCurrentFriend()
});

watch(
  () => friendsStore.shouldReload,
  () => {
    if (friendsStore.shouldReload) {
      getFriendsData()
    }
  }
);

// watch(
//   () => friendsStore.currentFriendId,
//   () => {
//     if (friendsStore.currentFriendId) {
//       getFriendsData()
//     }
//   }
// );
</script>

<template>
  <div class="grid grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 gap-2">
    <SkeletonFriends :loaderState="loaderState">
      <div
      @click="inesertFriendsDataToStore(data)"
        v-for="data in friendsData"
        class="cursor-pointer relative overflow-hidden rounded-lg"
        :class="data.user[0]._id == friendsStore.currentFriendId ? 'border border-2 border-primary': ''"
      >
        <img
          :src="networkImage(data.user[0].profile_image)"
          alt=""
          class="w-full h-full rounded-lg"
        />
        <span
          class="absolute bottom-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black"
        ></span>

        <div class="absolute bottom-3 right-0 w-full h-fit flex justify-center">
          <p class="font-semibold text-base md:text-xs text-white z-10 text-center">
            {{ data.user[0].first_name }}
          </p>
        </div>
        <!-- <p class="absolute bottom-1 lg:right-12 right-14 font-semibold text-white z-10">{{ data.name }}</p> -->
      </div>

      <p v-if="friendsData.length == 0" class="text-xs text-red-500 text-center w-full col-span-2 lg:col-span-3 pt-10">
        No Items to show
      </p>
    </SkeletonFriends>
  </div>
</template>
