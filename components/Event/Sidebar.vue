<script setup>
import { api } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";
import { useTimerStore } from "~~/stores/timerStore";
import usePagination from "~/composables/usePagination";
import { useInfiniteScroll } from "@vueuse/core";

const props = defineProps({
  apiPath: {
    type: String,
    default: "",
  },
});

const crud = useCrud();
const eventListPath = props.apiPath + "?page=";
const eventDetailsPath = api() + "/api/event/details";
const eventDeletePath = api() + "/api/event/delete";

// store
const eventDetailsStore = useEventDetailsStore();
const {
  getCurrentEventDetails,
  setCurrentEventDetails,
  setLoaderState,
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

const getMyEvents = async () => {
  eventLoaderState.value = "pending";
  events.value = null;
  await crud.index({ path: eventListPath + 1 }).then((res) => {
    if (res.status == 200) {
      console.log(res.res.data.data);
      if (res.res.data.data.length > 0) {
        events.value = res.res.data.data;
        paginationData.value = res.res.data.metadata;
        console.log(events.value[0].event._id, "sidebar");
        getMyEventDetails(events.value[0].event._id);
        eventKey.value = eventKey.value + 1;
      }

      eventLoaderState.value = "resolve";
    } else {
      eventLoaderState.value = "failed";
    }
  });
};

const getMyEventDetails = async (id) => {
  console.log(id, "details");
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

const toggleMap = (data) => {
  // body.value.status = data ? 1 : 0;

  showMap.value = data;
};

async function openDetailsModal(id) {
  // console.log(id)

  await getMyEventDetails(id);
  detailsModalShouldOpen.value = true;
  currentModal.value = "details";
}

const getPaginationEvents = async () => {
  await crud
    .index({ path: eventListPath + paginationData.value.currentPage })
    .then((res) => {
      if (res.status == 200) {
        console.log(res.res.data.data);
        paginationData.value = res.res.data.metadata;
        if (res.res.data.data.length > 0) {
          if (res.res.data.data.length > 0) {
            res.res.data.data.map((dt) => {
              console.log(dt);
              events.value.push(dt);
            });
            eventKey.value = eventKey.value + 1;
          }
        }
      }
    });
};


// pagination controller
const { reset } = useInfiniteScroll(
  self,
  () => {
    console.log('runn', paginationData.value.currentPage, paginationData.value.totalPages)
    if (paginationData.value.currentPage == paginationData.value.totalPages) {
      throw new Error("Something went wrong");
    }
    paginationController(getPaginationEvents);
  },
  { distance: 10 }
);

onMounted(async () => {
  console.log("onmounted run twice");
  clearEventDetailsData();
  getMyEvents();
});

onUnmounted(() => {
  clearEventDetailsData();
});

watch(
  () => eventDetailsStore.currentId,
  async () => {
    if (eventDetailsStore.currentId == null) {
      // commented out this code .
      // await getMyEvents();
    }
  },
  { deep: true }
);

watch(
  () => eventDetailsStore.shouldReload,
  async () => {
    if (eventDetailsStore.shouldReload) {
      await getMyEvents()
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    :key="eventKey"
    class="px-4 max-h-[70vh] min-h-[60vh] lg:max-h-[80vh] overflow-y-scroll scrollbar-hide pb-10 lg:pb-36 grid grid-cols-1"
  >
    <SkeletonCards :loaderState="eventLoaderState">
      <div
        v-if="events?.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 relative h-fit"
        ref="self"
      >
        <div
          :class="
            data.event._id == eventDetailsStore.currentId
              ? 'border border-2 border-primary rounded-lg'
              : ''
          "
          v-for="data in events"
        >
          <CardsProfile3
            :profile="data"
            :disableLink="true"
            @sendIdToModal="openDetailsModal(data.event._id)"
            @sendIdToDetails="getMyEventDetails(data.event._id)"
          />
        </div>
      </div>

      <div v-else class="space-y-4 text-red-500 text-xs text-center">
        <p>No Item to show</p>
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
    <ContainerEventDetailsCommon2
      v-if="currentModal == 'details'"
      :eventDetailsData="eventDetailsStore.currentDetails"
      @send-data="
        (data) => {
          modalShouldExpand = data;
        }
      "
      :shouldTimerStart="false"
    />
  </PanelBottom>
</template>
