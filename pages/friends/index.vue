<script setup>
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";
import { useVarifyStore } from "~/stores/varifyStore";
import { useCrud } from "~~/composables/base";

definePageMeta({
  middleware: ["auth", "profilecompletion", 'imageverify'],
});

let interestOptionApi = api() + "/api/admin/interest/public/list";

const interestList = ref();
const varifyStore = useVarifyStore();
const { getStatus, setStatus } = varifyStore;

const crud = useCrud();

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
  { key: 1, value: "Friends", href: "friends" }
];


// let allTabs = [
//   { key: 1, value: "Friends", href: "friends" },
//   { key: 2, value: "Requests", href: "friedns-request" },
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
  <NuxtLayout name="authenticated" ref="layout" :tabs="allTabs">
    <template #sidebar-sec-1>
      <div class="cursor-default">
        <div class="flex lg:hidden items-center pb-8">
          <!-- <ArrowLeftIcon class="h-6 w-6 text-mediumBlack dark:text-slate-200" /> -->
          <ButtonBack />
          <p class="ml-3 text-3xl font-bold dark:text-slate-200">Friends</p>

          <!-- <AdjustmentsHorizontalIcon
            @click="openModal"
            class="h-8 w-8 text-primary ml-auto"
          /> -->
        </div>
        <!-- tabs  -->
        <CommonTab v-model="currentTab" :tabData="allTabs" pageName="friends" />
      </div>
    </template>
    <template #sidebar-sec-2>
      <div class="min-h-screen">
        <ContainerFriendsGallary v-if="currentTab == 1" />
        <ContainerFriendsRequest v-if="currentTab == 2" />
      </div>
    </template>

    <section class="h-fit">
      <section
        class="max-h-[80vh] lg:max-h-screen lg:pt-10 px-2 lg:px-8 bg-transparent overflow-y-scroll lg:overflow-hidden scrollbar-hide"
      >
        <section class="mx-auto gap-6 relative h-full">
          <div class="space-y-5 md:space-y-6 h-full">
            <div class="block lg:hidden">
              <ContainerFriendsGallary @open-modal="openModal"/>
            </div>
            <div class="hidden lg:block">
              <ContainerGallarySlider />
            </div>
          </div>
        </section>
      </section>
    </section>

    <!-- modal  -->
    <PanelBottom
      :shouldOpen="modalShouldOpen"
      @update-input="modalShouldOpen = false"
    >
      <ContainerGallarySlider :interestOption="interestList" />
    </PanelBottom>
  </NuxtLayout>
</template>
<!-- containerClass
iconClass -->
