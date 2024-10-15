<script setup>
import { useCrud } from "~~/composables/base";

// apis 
let friendsRequestApi = api() + "/api/auth/friends/request";
let acceptFriendsRequestApi = api() + "/api/auth/accept-friend-request";
let rejectFriendsRequestApi = api() + "/api/auth/reject-friend-request";

const crud = useCrud();
const router = useRouter()
const additionalImages = ref([
  {
    _id: "66af50aa8182362e47c9fcdb",
    from_user: "6683a3c3e224e11f6c0af7d3",
    to_user: "66a36ad820ecb1682a5d0a03",
    status: "pending",
    createdAt: "2024-08-04T09:58:02.607Z",
    updatedAt: "2024-08-04T09:58:02.607Z",
    __v: 0,
    lookupUserId: "6683a3c3e224e11f6c0af7d3",
    user: [
      {
        _id: "6683a3c3e224e11f6c0af7d3",
        email: "user21@mail.com",
        first_name: "william blazkowitz ",
        profile_image: "uploads/1722502437023-869428631self.jpeg",
      },
    ],
  },
]);

const loaderState = ref();

// profile_image: "uploads/1722502437023-869428631self.jpeg",

const requestsData = ref([]);




// toast 
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};


// friends request data 
const getFriendsRequestData = async () => {
  loaderState.value = "pending";
  await crud.index({ path: friendsRequestApi }).then((res) => {
    if (res.status == 200) {
      console.log(res, "runn");
      // saveProfileData(res.res.data)
      requestsData.value = res.res.data.data;

      loaderState.value = "resolved";
    } else {
      loaderState.value = "failed";
    }
  });
};

const acceptOrDeclineRequest = async (status, userInfo) => {
  loaderState.value = "pending";
  let acceptOrRejectApi;
  if (status == "APPROVED") {
    acceptOrRejectApi = acceptFriendsRequestApi;
  } else {
    acceptOrRejectApi = rejectFriendsRequestApi;
  }
  let formData = {
    requestId: userInfo._id,
  };

  console.log(status, formData);
  await crud
    .store({
      body: formData,
      path: acceptOrRejectApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast(`Participant ${status} successfully`);
        getFriendsRequestData();
      } else {
        showToast(`Participant ${status} failed`, "error", 5000);
        loaderState.value = "failed";
      }
    });
};

onMounted(() => {
  getFriendsRequestData();
});
</script>

<template>
  <div class="space-2">
    <SkeletonMsgGroupCards :loaderState="loaderState">
      <div
        v-for="data in requestsData"
        class="flex items-center gap-5 p-3 px-5 bg-whitePrimary dark:bg-blackPrimary"
      >
        <div class="h-16 w-16">
          <img
          @click="router.push('/profile/view/' + data.user[0]._id)"
          :src="networkImage( data?.user[0] ? data?.user[0]?.profile_image : '#')"
          alt=""
          class="h-full w-full rounded-full object-cover cursor-pointer"
        />
        </div>
        <div class="space-y-2">
          <p class="text-lg max-w-xs dark:text-white">
            {{ data?.user[0]?.first_name }} sent you friend request
            
          </p>
          <div class="flex items-center gap-3">
            <button
              @click="acceptOrDeclineRequest('APPROVED', data)"
              class="bg-green-700 py-1 text-white rounded-2xl px-2 text-xs flex gap-2 items-center justify-center"
            >
              <p>Accept</p>
            </button>
            <button
              @click="acceptOrDeclineRequest('REJECTED', data)"
              class="bg-primary py-1 text-white rounded-2xl px-2 text-xs flex gap-2 items-center justify-center"
            >
              <p>Reject</p>
            </button>
          </div>
        </div>
      </div>
      
      <p v-if="requestsData.length == 0" class="text-xs text-red-500">No Items to show</p>
    </SkeletonMsgGroupCards>
  </div>
</template>
