<script setup>
import { api } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";
import { useTimerStore } from "~~/stores/timerStore";
import usePagination from "~/composables/usePagination";
import { useInfiniteScroll } from "@vueuse/core";

const crud = useCrud();
const eventListPath = api() + "/api/event/my-events?page=";
const eventDetailsPath = api() + "/api/event/details";
const eventDeletePath = api() + "/api/event/delete";

const eventDetailsStore = useEventDetailsStore();
const {
  getCurrentEventDetails,
  setCurrentEventDetails,
  setLoaderState,
  setShouldReload,
  clearEventDetailsData,
} = useEventDetailsStore();

const timerStore = useTimerStore();
const { setTimerState } = useTimerStore();

const { paginationData, paginationController } = usePagination();

const loading = ref(true);
const eventLoaderState = ref();
const showMap = ref(false);

const detailsModalShouldOpen = ref(false);
const modalShouldExpand = ref(false);

const currentModal = ref("self");

const events = ref();
const eventKey = ref(123);
const detailsData = ref();

// pagination variables
const el = ref(null);

const getMyEvents = async () => {
  eventLoaderState.value = "pending";
  events.value = null;
  await crud
    .index({ path: eventListPath + 1 })
    .then((res) => {
      console.log(res.res.data.data);
      if (res.status == 200) {
        paginationData.value = res.res.data.metadata;
        if (res.res.data.data.length > 0) {
          events.value = res.res.data.data;
          console.log(eventDetailsStore.currentId, "event key");

          // if (eventDetailsStore.currentId === null) {
          getMyEventDetails(events.value[0]._id);
          // }
          eventKey.value = eventKey.value + 1;
        }
        eventLoaderState.value = "resolve";
      } else {
        eventLoaderState.value = "failed";
      }
    });
};

const getMyEventDetails = async (id) => {
  await setTimerState(false);
  setLoaderState("pending");
  await crud.index({ path: eventDetailsPath + "/" + id }).then((res) => {
    if (res.status == 200) {
      setCurrentEventDetails(id, res.res.data);
      loading.value = false;

      setLoaderState("resolve");
      setTimeout(() => {
        setTimerState(true);
      }, 1000);
    } else {
      setLoaderState("failed");

      setTimerState(false);
    }
  });
};

async function deleteEvent(id) {
  await crud.destroy({ path: eventDeletePath + "/" + id }).then((res) => {
    if (res.status == 200) {
      getMyEvents();
      detailsModalShouldOpen.value = false;
    }
  });
}

const callingEventsAgain = async () => {
  eventLoaderState.value = "pending";
  events.value = null;
  await crud.index({ path: eventListPath+ 1 }).then(async (res) => {
    console.log(res.res.data.data);
    if (res.status == 200) {
      if (res.res.data.data.length > 0) {
        events.value = res.res.data.data;
        console.log(eventDetailsStore.currentId, "event key");

        // await getMyEventDetails(eventDetailsStore.currentId);

        await setShouldReload(false);
        // if (eventDetailsStore.currentId === null) {
        // getMyEventDetails(events.value[0]._id);
        // }
        eventKey.value = eventKey.value + 1;
      }
      eventLoaderState.value = "resolve";
    } else {
      eventLoaderState.value = "failed";
    }
  });
};

const toggleMap = (data) => {
  // body.value.status = data ? 1 : 0;

  showMap.value = data;
};

async function openDetailsModal(id) {
  // console.log(id)
  // setTimerState(false);

  await getMyEventDetails(id);
  detailsModalShouldOpen.value = true;
}

const getPaginationEvents = async () => {
  await crud
    .index({ path: eventListPath + paginationData.value.currentPage })
    .then((res) => {
      console.log(res.res.data.data);
      if (res.status == 200) {
        paginationData.value = res.res.data.metadata;
        if (res.res.data.data.length > 0) {
          res.res.data.data.map((dt) => {
            console.log(dt);
            events.value.push(dt);
          });

          eventKey.value = eventKey.value + 1;
        }
      }
    });
};

// pagination controller
const { reset } = useInfiniteScroll(
  self,
  () => {
    console.log('runn')
    if (paginationData.value.currentPage == paginationData.value.totalPages) {
      throw new Error("Something went wrong");
    }
    paginationController(getPaginationEvents);
  },
  { distance: 10 }
);

onMounted(async () => {
  clearEventDetailsData();
  // setTimerState(false);
  getMyEvents();
});

onUnmounted(() => {
  clearEventDetailsData();
});

// onBeforeUnmount( () => {
//   console.log('asdfasdfasdf')
//   //  setTimerState(false);
// });

watch(
  () => eventDetailsStore.currentId,
  async () => {
    if (eventDetailsStore.currentId == null) {
      await getMyEvents();
    }
  },
  { deep: true }
);

// sdfsdf
watch(
  () => eventDetailsStore.shouldReload,
  async () => {
    if (eventDetailsStore.shouldReload) {
      await callingEventsAgain();
    }
  },
  { deep: true }
);

watch(
  () => currentModal.value,
  async () => {
    if (detailsModalShouldOpen.value) {
      setTimeout(() => {
        setTimerState(true);
      }, 100);
    } else {
      setTimerState(false);
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    :key="eventKey"
    class="px-4 max-h-[70vh] lg:max-h-[80vh] overflow-y-scroll scrollbar-hide pb-10 lg:pb-36 grid grid-cols-1"
  >
    <!-- <button @click="setTimerState(false)">stop</button> -->
    <SkeletonCards :loaderState="eventLoaderState">
      <div
        v-if="events?.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 relative"
        ref="self"
      >
        <div
          :class="
            data._id == eventDetailsStore.currentId
              ? 'border border-2 border-primary rounded-lg'
              : ''
          "
          v-for="data in events"
        >
          <CardsProfile
            :profile="data"
            :disableLink="true"
            @sendIdToModal="openDetailsModal(data._id)"
            @sendIdToDetails="getMyEventDetails(data._id)"
          />
        </div>
      </div>

      <div v-else class="space-y-4 text-red-500 text-xs text-center">
        <p class="pt-10">No Item to show</p>
      </div>
    </SkeletonCards>

    <!-- <div
      class="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 relative"
    >
      <CardsProfile
        v-for="data in events"
        :profile="data"
        :disableLink="true"
        @click="getMyEventDetails(data._id)"
      />
    </div> -->
  </div>

  <!-- modal  -->
  <PanelBottom
    v-if="eventDetailsStore.currentId"
    :expand="modalShouldExpand"
    :shouldOpen="detailsModalShouldOpen"
    @update-input="
      () => {
        detailsModalShouldOpen = false;
        modalShouldExpand = false;
        currentModal = 'self';
      }
    "
  >
    <ContainerEventSelfDetailsSmall
      v-if="currentModal == 'self' && !loading"
      @showdetails="(data) => (currentModal = 'details')"
      @deleteevent="(id) => deleteEvent(id)"
      :dataLoaded="detailsModalShouldOpen"
    />
    <ContainerEventDetailsSelfSmall
      v-if="currentModal == 'details'"
      :eventDetailsData="eventDetailsStore.currentDetails"
      @send-data="
        (data) => {
          modalShouldExpand = data;
        }
      "
      :shouldTimerStart="detailsModalShouldOpen"
    />
  </PanelBottom>
</template>
