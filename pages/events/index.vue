<script setup>
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";
import { BellIcon } from "@heroicons/vue/24/outline";

import { useVarifyStore } from "~/stores/varifyStore";

definePageMeta({
  middleware: ["auth", "profilecompletion"],
});

const varifyStore = useVarifyStore();
const { getStatus, setStatus } = varifyStore;

const isVarified = ref();

const currentTab = ref(1);
const locationCollected = ref(false);
const router = useRouter();

const form = ref({
  interest: "",
  gender: null,
  age: "",
  distance: "",
});

let allTabs = [
  { key: 1, value: "Discover Event", href: "/event/discover-event" },

  { key: 2, value: "My Event", href: "/event/my-event" },
  { key: 4, value: "Joined Event", href: "/event/joined-event" },
];

// let allTabs = [
//   { key: 1, value: "Discover Event", href: "/event/discover-event" },

//   { key: 2, value: "My Event", href: "/event/my-event" },
//   { key: 3, value: "Upcomming Event", href: "/event/upcomming-event" },
//   { key: 4, value: "Joined Event", href: "/event/joined-event" },
// ];

const layout = ref();

const modalShouldOpen = ref(false);

function openModal() {
  // layout.value.layoutRef.modalOpener();
  modalShouldOpen.value = true;
}

function closeModal() {
  // layout.value.layoutRef.modalCloser();
  modalShouldOpen.value = false;
}

const showmap = () => {
  if (locationCollected.value) {
    locationCollected.value = false;
  } else {
    locationCollected.value = true;
  }
};

const toggleEvent = (data) => {
  // body.value.status = data ? 1 : 0;

  if (!data) {
    setTimeout(() => {
      router.push("/event/upcomming-event");
    }, 400);
  }
};

onMounted(() => {
  isVarified.value = getStatus();
});

watch(
  () => currentTab.value,
  () => {
    console.log(currentTab.value);
  }
);
</script>

<template>
  <NuxtLayout name="authenticated" :tabs="allTabs">
    <template #sidebar-sec-1>
      <div class="cursor-default">
        <div class="flex lg:hidden items-center pb-8">
          <ButtonBack />
          <p class="ml-3 text-2xl font-bold dark:text-white">Events</p>
          <AdjustmentsHorizontalIcon
            v-if="currentTab == 1"
            @click="openModal"
            class="h-8 w-8 text-primary ml-auto"
          />
        </div>
        <!-- tabs  -->
        <CommonTab v-model="currentTab" :tabData="allTabs" pageName="events" />
      </div>
    </template>
    <template #sidebar-sec-2>
      <EventFilter v-if="currentTab == 1" />

      <!-- my event  -->
      <div class="hidden lg:block">
        <EventSelf v-if="currentTab == 2" />
      </div>

      <!-- joined event  -->
      <div class="hidden lg:block">
        <EventSidebar
          v-if="currentTab == 3"
          :apiPath="api() + '/api/event/upcoming-events'"
        />
      </div>

      <!-- joined event  -->
      <div class="hidden lg:block">
        <EventSidebar
          v-if="currentTab == 4"
          :apiPath="api() + '/api/event/joined-events'"
        />
      </div>
    </template>

    <section
      class="max-h-screen pt-5 px-4 md:px-8 bg-transparent overflow-hidden"
    >
      <section class="mx-auto gap-6 relative h-full">
        <div class="space-y-2 h-full">
          <ContainerUniversalSearch />

          <!-- map & event section  -->
          <ContainerEventFinding v-if="currentTab == 1" />

          <!-- my event  -->
          <div class="hidden lg:block">
            <ContainerEventDetails v-if="currentTab == 2" />
          </div>

          <div class="block lg:hidden">
            <EventSelf v-if="currentTab == 2" @click="modalShouldOpen = true" />
          </div>

          <!-- upcomming event  -->
          <div class="hidden lg:block">
            <ContainerEventDetailsCommon
              v-if="currentTab == 3"
              :pageType="'upcommingEvent'"
            />
          </div>
          <div class="block lg:hidden">
            <EventSidebar
              v-if="currentTab == 3"
              @click="modalShouldOpen = true"
              :apiPath="api() + '/api/event/upcoming-events'"
            />
          </div>

          <!-- joined event  -->
          <div class="hidden lg:block">
            <ContainerEventDetailsCommon
              v-if="currentTab == 4"
              :pageType="'joinedEvent'"
            />
          </div>

          <div class="block lg:hidden">
            <EventSidebar
              v-if="currentTab == 4"
              @click="modalShouldOpen = true"
              :apiPath="api() + '/api/event/joined-events'"
            />
          </div>
        </div>
      </section>
    </section>

    <!-- modal  -->
    <PanelBottom
      :shouldOpen="modalShouldOpen"
      @update-input="modalShouldOpen = false"
    >
      <EventFilter v-if="currentTab == 1" 
      @closemodal="() => modalShouldOpen = false"/>
      <ContainerEventDetails v-if="currentTab == 2" />
    </PanelBottom>
  </NuxtLayout>
</template>
