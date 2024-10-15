<script setup>
import { useCrud } from "~~/composables/base";
import { useMessageDetailsStore } from "~~/stores/messageDetailsStore";
import { useProfileStore } from "~~/stores/profileStore";

// api
const sendSmsApi = api() + "/api/conversation/send-sms";
let messageDetailsApi = api() + "/api/conversation/list/";
let messageDeleteApi = api() + "/api/conversation/delete-sms/";
let participentBlockApi = api() + "/api/event/participant/block-leave";
let leaveGroupApi = api() + "/api/event/groups/leave";

// crud
const crud = useCrud();

// stores
const eventMessageStore = useMessageDetailsStore();
const {
  getCurrentMessageDetails,
  setCurrentMessageDetails,
  clearMessageDetailsData,
  setLoaderState,
  setShouldReload,
  getLoaderState,
} = useMessageDetailsStore();

const profileStore = useProfileStore();

// route controller
const router = useRouter();

const formData = ref({
  message: null,
});
// const loaderState = ref();

const options = [{ key: 0, value: " Block User" }];
const optionsOfParticipants = [{ key: 0, value: "Remove Message" }];

const activeRoom = ref();

const detailsData = ref([]);

// socket section
const { $socketio } = useNuxtApp();

const showmap = () => {
  if (locationCollected.value) {
    locationCollected.value = false;
  } else {
    locationCollected.value = true;
  }
};

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

// send message
const sendMessage = async () => {
  console.log(formData.value.message);
  const messageData = {
    eventUid: eventMessageStore.currentGroupId,
    message: formData.value.message,
  };

  await crud
    .store({
      body: messageData,
      path: sendSmsApi,
    })
    .then((res) => {
      if (res.status == 200) {
        formData.value.message = "";
        // getMessageDetailsData(eventMessageStore.currentGroupId);
      } else {
        showToast("Message send failed! Please try again.");
      }
      // scrollToBottom()
    });
};

// get message details data
const getMessageDetailsData = async (id) => {
  // setLoaderState("pending");
  await crud.index({ path: messageDetailsApi + id }).then((res) => {
    if (res.status == 200) {
      detailsData.value = [...res.res.data.data].reverse();

      // setLoaderState("resolved");
    } else {
      // setLoaderState("failed");
    }
  });
};

// delete message
const deleteMessage = async (id) => {
  console.log(id);

  await crud.destroy({ path: messageDeleteApi + id }).then((res) => {
    getMessageDetailsData(eventMessageStore.currentGroupId);
  });
};

// delete user
const deleteOrBlockParticipant = async (id, type) => {
  console.log(id, eventMessageStore.currentGroupDetails.user._id);

  if (id == eventMessageStore.currentGroupDetails.user._id && type == "block") {
    showToast("You can not block the admin!!");
  }
  const formData = {
    eventParticipentUid: id,
    type: type,
  };
  await crud
    .store({
      body: formData,
      path: participentBlockApi,
    })
    .then((res) => {
      if (res.status == 200) {
        getMessageDetailsData(eventMessageStore.currentGroupId);
      } else {
        showToast("Failed! Please try again.");
      }
    });
};


// leave gorup 
const leaveGroup = async () => {
   

  // if (id == eventMessageStore.currentGroupDetails.user._id ) {
  //   showToast("You can not block the admin!!");
  // }


  let formData = {
    eventParticipentUid: eventMessageStore.currentGroupDetails._id,
    type: 'LEAVE',
  };
  await crud
    .store({
      body: formData,
      path: leaveGroupApi,
    })
    .then((res) => {
      if (res.status == 200) {
        // getMessageDetailsData(eventMessageStore.currentGroupId);
        clearMessageDetailsData()
        setShouldReload(true)
      } else {
        showToast("Failed! Please try again.");
      }
    });
};

async function singleDelete(id) {
  await crud
    .destroy({ path: api() + "/api/category/delete/" + id })
    .then((res) => {
      getAllCategoryData();
    });
}

function scrollToBottom() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

onMounted(() => {
  // loaderState.value = "pending";
  if (eventMessageStore.currentGroupId) {
    getMessageDetailsData(eventMessageStore.currentGroupId);
  }

  $socketio.on("conversation", (data) => {
    console.log("Received message:", data);
    console.log(detailsData.value, "msg history");
    detailsData.value.unshift(data);
  });
});

watch(
  () => eventMessageStore.currentGroupId,
  () => {
    console.log("this is working");
    getMessageDetailsData(eventMessageStore.currentGroupId);
  },
  { deep: true }
);

watch(
  () => eventMessageStore.currentGroupId,
  () => {
    console.log("this is working");
    $socketio.emit("join-new-room", eventMessageStore.currentGroupId);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="space-y-10">
    <div
      v-if="eventMessageStore.currentGroupId"
      class="flex flex-col items-center gap-3 h-[70vh] lg:h-screen w-full px-4 lg:px-20"
    >
      <SkeletonMsgBox :loaderState="eventMessageStore.loaderState">
        <div
          class="bg-whitePrimary dark:bg-blackPrimary w-full lg:p-8 relative rounded-xl overflow-hidden"
          id="chat-container"
        >
          <section class="flex justify-between items-center">
            <div class="py-2">
              <p
                class="text-lg font-medium flex items-center gap-2 capitalize dark:text-white"
              >
                {{ eventMessageStore.currentGroupDetails.event.title }}
              </p>
              <ContainerGroupProfile
                :profiles="eventMessageStore.currentGroupDetails.participants"
                :classes="'h-10 w-10'"
              />
            </div>

            <ButtonDot
              @selected-option="
                (dt) => {
                  console.log(dt);
                  if (dt == 'Leave Group') {
                    leaveGroup()
                  }
                }
              "
              :options="[
                { key: 0, value: 'View this event' },
                { key: 1, value: 'Leave Group' },
              ]"
            />
          </section>

          <section class="py-5 flex flex-col items-center">
            <span
              class="block w-full h-0.5 bg-slate-200 dark:bg-slate-400"
            ></span>
            <p
              class="-mt-3 bg-whitePrimary dark:bg-blackPrimary w-20 text-center text-slate-500 dark:text-slate-200 text-xs"
            >
              Today
            </p>
          </section>

          <section
            class="flex flex-col gap-10 h-[40vh] md:h-[44vh] lg:h-[60vh] overflow-y-scroll scrollbar-style pr-2 flex-col-reverse"
          >
            <div
              v-for="(history, index) in detailsData"
              class="max-w-xs space-y-3"
              :class="
                profileStore.profileData._id == history.userUid
                  ? 'ml-auto'
                  : 'mr-auto'
              "
            >
              <section
                class="flex gap-2"
                :class="
                  profileStore.profileData._id == history.userUid
                    ? 'flex-row-reverse'
                    : ''
                "
              >
                <img
                  @click="router.push('/profile/view/' + history.user._id)"
                  :src="networkImage(history.user.profile_image)"
                  alt=""
                  class="h-10 w-10 rounded-full object-cover cursor-pointer"
                />

                <div
                  class="text-sm font-base p-4 rounded-lg group min-w-28 min-h-20 flex flex-col justify-end break-words"
                  :class="
                    profileStore.profileData._id == history.userUid
                      ? 'pr-4 bg-gray-400 dark:bg-blue-500'
                      : 'pl-4 bg-primary dark:bg-slate-300/10'
                  "
                >
                  <div
                    class="flex transition-all duration-150"
                    :class="
                      profileStore.profileData._id == history.userUid
                        ? 'justify-end'
                        : 'justify-start'
                    "
                  >
                    <ButtonDot
                    v-if="profileStore.profileData._id == history.userUid"
                      :isHorizontal="true"
                      classes="p-1 dark:text-slate-200 text-white"
                      :alignment="
                        profileStore.profileData._id == history.userUid
                          ? 'right-0'
                          : 'left-0'
                      "
                      :options="
                        profileStore.profileData._id == history.userUid
                          ? optionsOfParticipants
                          : options
                      "
                      @selected-option="
                        (dt) => {
                          if (dt == 'Remove Message') {
                            deleteMessage(history._id);
                          } else {
                            console.log(dt);
                            deleteOrBlockParticipant(history.user._id, 'block');
                          }
                        }
                      "
                    />
                  </div>

                  <p class="text-white">{{ history.message }}</p>
                </div>
              </section>

              <!-- {{ history.user._id }} -->
              <div
                class="flex gap-6 text-slate-500 dark:text-slate-200 text-xs"
                :class="
                  profileStore.profileData._id == history.userUid
                    ? 'justify-end'
                    : 'justify-end flex-row-reverse'
                "
              >
                <p>{{ history.user.first_name }}</p>
                <div class="flex gap-2">
                  <img src="~~/assets/images/message/double-tick.svg" alt="" />
                </div>
              </div>
            </div>
          </section>

          <section
            class="w-full h-10 lg:h-14 sticky bottom-0 right-0 flex gap-4 mt-3"
          >
            <form
              @submit.prevent="sendMessage"
              class="border grow border-slate-300 rounded-xl overflow-hidden relative"
            >
              <input
                v-model="formData.message"
                type="text"
                placeholder="Your Message"
                class="h-full w-full border-none outline-none text-sm px-8 bg-white dark:bg-blackPrimary dark:text-white"
              />
              <img
                @click="sendMessage"
                class="absolute cursor-pointer top-2 lg:top-3 h-6 w-6 right-3 block dark:hidden"
                src="~~/assets/images/message/stickers.png"
                alt=""
              />
              <img
                @click="sendMessage"
                class="absolute cursor-pointer top-2 lg:top-3 h-6 w-6 right-3 hidden dark:block"
                src="~~/assets/images/message/stickers.png"
                alt=""
              />
            </form>
          </section>
        </div>
      </SkeletonMsgBox>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center gap-3 h-[70vh] lg:h-screen w-full px-4 lg:px-20"
    >
      <p class="text-2xl font-semibold text-red-600/80 -mt-40">
        Select a group first
      </p>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  text-align: start;
  font-size: 12px;
}
</style>
