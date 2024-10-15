<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  XCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/solid";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";
import { api } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";

const props = defineProps({
  pageType: {
    type: String,
    default: "myEvent",
  },
});

// apis
const participentListApi = api() + "/api/event/participant/";
const participentApproveOrRejectApi = api() + "/api/event/participant/update/";
const participentDeletetApi = api() + "/api/event/participant/delete/";
const participentRequestApi = api() + "/api/event/participant-request/";
let sendFavoriteRequestApi = api() + "/api/auth/make-favorite";


const eventDetailsStore = useEventDetailsStore();
const {
  getCurrentEventDetails,
  setCurrentEventDetails,
  clearEventDetailsData,
  setLoaderState,
  setShouldReload,
} = useEventDetailsStore();

const crud = useCrud();
const loaderState = ref();
const router = useRouter();

let form = ref({
  status: null,
});

const showPeoples = ref(true);

const requestList = ref([]);
const participantsList = ref([]);

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const getRequestList = async () => {
  loaderState.value = "pending";
  requestList.value = [];
  await crud
    .index({ path: participentRequestApi + eventDetailsStore.currentId })
    .then((res) => {
      if (res.status == 200) {
        if (res.res.data.length > 0) {
          requestList.value = [...res.res.data];
        }
        // console.log(requestList.value, "participents");
        loaderState.value = "resolve";
      } else {
        loaderState.value = "failed";
      }
    });
};

const getParticipantList = async () => {
  console.log(eventDetailsStore.currentId, 'participants')
  loaderState.value = "pending";
  participantsList.value = [];
  await crud
    .index({ path: participentListApi + eventDetailsStore.currentId })
    .then((res) => {
      if (res.status == 200) {
        if (res.res.data.length > 0) {
          console.log(res.res.data);
          participantsList.value = [...res.res.data];
        }
        // console.log(requestList.value, "participents");
        loaderState.value = "resolve";
      } else {
        loaderState.value = "failed";
      }
    });
};

const acceptOrDeclineParticipants = async (status, userInfo) => {
  loaderState.value = "pending";
  // console.log(status, userInfo.user_uid._id);
  form.value.status = status;
  await crud
    .store({
      body: form.value,
      path: participentApproveOrRejectApi + userInfo._id,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast(`Participant ${status} successfully`);
        getRequestList();
        getParticipantList();
      } else {
        showToast(`Participant ${status} failed`, "error", 5000);
      }
    });
};

const destroyParticipant = async (id) => {
  await crud.destroy({ path: participentDeletetApi + id }).then((res) => {
    if (res.status == 200) {
      showToast(`Participant Removed successfully`);

      getParticipantList();
    } else {
      showToast(`Participant Removal Failed`);
    }
  });
};

const sendFavoriteRequest = async (data) => {

  await crud
    .store({
      body: data,
      path: sendFavoriteRequestApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Request Sended successful");
        getParticipantList();
      } else {
        showToast("Request Send Failed", "error", 5000);
      }
    });
};

const panelOpen = () => {
  showPeoples.value = true;
};

const panelClose = () => {
  showPeoples.value = false;
};

onMounted(() => {
  if (eventDetailsStore.currentId) {
  // getRequestList();
  getParticipantList();
    
  }
});

watch(
  () => eventDetailsStore.currentId,
  () => {
    console.log('changed')
    panelClose();
    // getRequestList();
    getParticipantList();
  },
  { deep: true }
);
</script>

<template>
  <SkeletonParticipants :loaderState="loaderState">
    <section
      class="rounded-t-2xl overflow-hidden relative transition-all duration-200"
    >


      <div class="relative">
        <div
          class="bg-[#E2E3E4] dark:bg-gray-700 dark:text-slate-200 p-3 font-semibold"
        >
          <p>People Going to this event</p>
        </div>

        <div
          class="md:max-h-[650px] overflow-y-scroll scrollbar-style divide-y-2 transition-all duration-300 divide-slate-200 dark:divide-slate-500"
        >
          <EventGoingPeople
            v-for="data in participantsList"
            :peopleData="data"
            :disableRemove="true"
            :disableBlock="true"
            @remove="(id) => destroyParticipant(id)"
            @addtofavourite="(data) => sendFavoriteRequest(data)"
          />

          <div
            v-if="participantsList.length == 0"
            class="md:max-h-[300px] overflow-y-scroll scrollbar-style divide-y-2 divide-slate-200 transition-all duration-300 h-0"
            :class="showPeoples ? 'scale-y-100 h-full' : 'scale-y-0 h-0'"
          >
            <p class="py-5 text-center text-red-500 text-sm font-semibold">
              No Participants to show
            </p>
          </div>
        </div>
      </div>
    </section>
  </SkeletonParticipants>
</template>
