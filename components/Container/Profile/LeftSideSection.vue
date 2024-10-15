<script setup>
import { api } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";

// api
const eventListPath = api() + "/api/event/my-events";

const crud = useCrud();
const events = ref();
const loaderState = ref();

const router = useRouter();

const getMyEvents = async () => {
  loaderState.value = "pending";
  await crud.index({ path: eventListPath }).then((res) => {
    if (res.status == 200) {
      events.value = res.res.data.data;

      loaderState.value = "resolved";
    } else {
      loaderState.value = "failed";
    }
  });
};

onMounted(() => {
  getMyEvents();
});
</script>

<template>
  <SkeletonCards :loaderState="loaderState">
    <div class="space-y-4" v-if="events?.length">
      <CardsProfile
        v-for="data in events"
        :profile="data"
        @sendIdToDetails="router.push('/events/' + data._id + '/details')"
      />
    </div>
    <div v-else class="space-y-4 text-red-500 text-xs text-center">
      <p>No Item to show</p>
    </div>
  </SkeletonCards>
</template>
