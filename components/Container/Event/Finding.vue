<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/outline";
import { useVarifyStore } from "~/stores/varifyStore";
import { useImageStore } from "~~/stores/imageStore";
import { useProfileStore } from "~~/stores/profileStore";
import { useTimerStore } from "~~/stores/timerStore";
import { useFilterStore } from "~~/stores/filterStore ";
import { useCrud } from "~~/composables/base";
import { useInfiniteScroll } from "@vueuse/core";
import usePagination from "~/composables/usePagination";
import { useCategoryStore } from "~~/stores/categoryStore";
import { XMarkIcon } from "@heroicons/vue/24/solid";

// apis
let profileImageVerificationApi = api() + "/api/auth/profile/verify";
let categoryOptionApi = api() + "/api/public/categories";
const eventListApi = api() + "/api/event/discover-events?page=";
const detailsApi = api() + "/api/event/details/";
const profileDataApi = api() + "/api/auth/profile";

const crud = useCrud();
const router = useRouter();

const stepNo = ref(1);
const loaderState = ref();
const verifyLoaderState = ref();

const isImageVarified = ref(false);
const imgVerificationData = ref();
const shouldRestartCamera = ref(false);
const isCameraReady = ref(false);

// stores
const imageStore = useImageStore();
const { setImages, getImageStatus, getImages } = imageStore;

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const timerStore = useTimerStore();
const { setTimerState } = useTimerStore();

const varifyStore = useVarifyStore();
const { getStatus, setStatus } = varifyStore;

const filterStore = useFilterStore();
const { setFormData, getFormData, clearFormData, setCallFilterApi } =
  filterStore;

const categoryStore = useCategoryStore();

const { paginationData, paginationController } = usePagination();

const isVarified = ref(false);

// pagination variables
const el = ref(null);

let openModal = ref(false);
const detailsModalShouldOpen = ref(false);
const modalShouldExpand = ref(false);

const events = ref([]);
const eventDetails = ref();

// changed for work
const showMap = ref(false);
const profiles = ref();

const categoryOption = ref();

const multipleCoords = ref([
  {
    name: "Faysal",
    _id: "66aa6817a1992a894c55ef0e",
    lat: 90.42465191158237,
    lng: 23.7515626,
  },
  {
    name: "Faysal",
    _id: "66aa76f3a1992a894c55f518",
    lat: 90.42465191158237,
    lng: 23.7515626,
  },
]);

const toggleMap = (data) => {
  // body.value.status = data ? 1 : 0;

  showMap.value = data;
};

function openDetailsModal() {
  // layout.value.layoutRef.modalOpener();
  detailsModalShouldOpen.value = true;
}

// getting event data
const getDetailsData = async (id) => {
  await setTimerState(false);
  // loaderState.value = "pending";
  await crud.index({ path: detailsApi + id }).then((res) => {
    if (res.status == 200) {
      eventDetails.value = res.res.data;
      // console.log(eventDetails.value, "initial value");
      // loaderState.value = "resolve";
      openDetailsModal();
      setTimeout(() => {
        setTimerState(true);
      }, 1000);
    } else {
      // loaderState.value = "failed";
      setTimerState(false);
    }
  });
};

// get profile data
const getProfileData = async () => {
  await crud.index({ path: profileDataApi }).then((res) => {
    if (res.status == 200) {
      saveProfileData(res.res.data);
    } else {
    }
  });
};

function closeDetailsModal() {
  // layout.value.layoutRef.modalCloser();
  detailsModalShouldOpen.value = false;
}

const change = () => {
  // open.value = true
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
};

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const varifyProfileImage = async () => {
  shouldRestartCamera.value = false;
  // isImageVarified.value = true;
  if (!imgVerificationData.value) {
    showToast("Please capture your image first", "error", 5000);
    return;
  }

  // const formData = new FormData();
  // formData.append("verify_image", imgVerificationData.value);
  verifyLoaderState.value = "pending";
  let data = {
    verify_image: imgVerificationData.value,
  };
  await crud
    .store({
      body: JSON.stringify(data),
      path: profileImageVerificationApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Verification successful");
        // openImageVerifyModal.value = false;
        isImageVarified.value = true;
        isVarified.value = true;
        verifyLoaderState.value = "resolved";
        getProfileData();
      } else {
        showToast("Verification Failed! Please Try again.", "error", 5000);
        verifyLoaderState.value = "failed";
      }
      shouldRestartCamera.value = false;
    });
  // isImageVarified.value = true;
};

// setting options
const getCategories = async () => {
  await crud.get({ path: categoryOptionApi }).then((res) => {
    if (res.res.data) {
      categoryOption.value = res.res.data;
    }
  });
};

const getAllEvents = async () => {
  detailsModalShouldOpen.value = false
  events.value = [];
  loaderState.value = "pending";
  let formData = {
    distance: filterStore.formData ? filterStore.formData.distance : "",
    country: filterStore.formData ? filterStore.formData.country : "",
    city: filterStore.formData ? filterStore.formData.city : "",
    address: filterStore.formData ? filterStore.formData.address : "",
    interests: filterStore.formData ? filterStore.formData.interests : "",
    lat: filterStore.formData ? filterStore.formData.lat : "",
    long: filterStore.formData ? filterStore.formData.long : "",
    event_date: filterStore.formData ? filterStore.formData.event_date : "",
    language: filterStore.formData ? filterStore.formData.language : "",
    diet: filterStore.formData ? filterStore.formData.diet : "",
    drinking: filterStore.formData ? filterStore.formData.drinking : "",
    search: filterStore.formData ? filterStore.formData.search : "",
    categories: categoryStore.selectedCategories
      ? categoryStore.selectedCategories
      : "",
    page: 1,
  };

  await crud
    .store({
      body: formData,
      path: eventListApi + 1,
    })
    .then((res) => {
      if (res.status == 200) {
        paginationData.value = res.res.data.metadata;
        if (res.res.data.data.length > 0) {
          // console.log(events.value);
          // console.log(res.res.data.data);
          
          // events.value = [...res.res.data.data];


          res.res.data.data.map((dt) => {
            // console.log(dt)
            events.value.push(dt)
            multipleCoords.value.push({
              eventTitle: dt.title,
              image: dt.user.profile_image,
              name: dt.user.first_name,
              _id: dt._id,
              lat: dt.location.coordinates[1],
              lng: dt.location.coordinates[0],
              allData: dt,
            });
          });
        }

        console.log(events.value);
        loaderState.value = "resolved";
      } else {
        loaderState.value = "failed";
      }
    });
};

const getPaginateEvents = async () => {

  let formData = {
    distance: filterStore.formData ? filterStore.formData.distance : "",
    country: filterStore.formData ? filterStore.formData.country : "",
    city: filterStore.formData ? filterStore.formData.city : "",
    address: filterStore.formData ? filterStore.formData.address : "",
    lat: filterStore.formData ? filterStore.formData.lat : "",
    long: filterStore.formData ? filterStore.formData.long : "",
    event_date: filterStore.formData ? filterStore.formData.event_date : "",
    language: filterStore.formData ? filterStore.formData.language : "",
    diet: filterStore.formData ? filterStore.formData.diet : "",
    drinking: filterStore.formData ? filterStore.formData.drinking : "",
    search: filterStore.formData ? filterStore.formData.search : "",
    categories: categoryStore.selectedCategories
      ? categoryStore.selectedCategories
      : "",
    page: paginationData.value.currentPage,
  };

  await crud
    .store({
      body: formData,
      path: eventListApi + paginationData.value.currentPage,
    })
    .then((res) => {
      if (res.status == 200) {
        paginationData.value = res.res.data.metadata;
        if (res.res.data.data.length > 0) {
          console.log(events.value);
          console.log(res.res.data.data);
          
          // events.value = [...res.res.data.data];


          res.res.data.data.map((dt) => {
            console.log(dt)
            events.value.push(dt)
            multipleCoords.value.push({
              eventTitle: dt.title,
              image: dt.user.profile_image,
              name: dt.user.first_name,
              _id: dt._id,
              lat: dt.location.coordinates[1],
              lng: dt.location.coordinates[0],
              allData: dt,
            });
          });
        }

 
      } 
    });
};

const getAllEventsFromFilter = async () => {
  loaderState.value = "pending";

  // await crud
  //   .index({ path: eventListApi + paginationData.value.currentPage })
  //   .then((res) => {
  //     if (res.status == 200) {
  //       paginationData.value = res.res.data.metadata;
  //       if (res.res.data.data.length > 0) {
  //         events.value = [...res.res.data.data];
  //         res.res.data.data.map((dt) => {
  //           multipleCoords.value.push({
  //             eventTitle: dt.title,
  //             image: dt.user.profile_image,
  //             name: dt.user.first_name,
  //             _id: dt._id,
  //             lat: dt.location.coordinates[1],
  //             lng: dt.location.coordinates[0],
  //             allData: dt,
  //           });
  //         });
  //       }

  //       console.log(events.value);
  //       loaderState.value = "resolved";
  //     } else {
  //       loaderState.value = "failed";
  //     }
  //   });
};

// pagination controller
const { reset } = useInfiniteScroll(
  el,
  () => {
    console.log("asdfasdf");
    if (paginationData.value.currentPage == paginationData.value.totalPages) {
      throw new Error("Something went wrong");
    }
    paginationController(getPaginateEvents);
  },
  { distance: 10 }
);

function resetList() {
  events.value = []
  // it will reset
  // reset();
}

onMounted(() => {
  // console.log(profileStore.profileData.is_verified, "asdfsdf");
  isVarified.value = profileStore.profileData
    ? profileStore.profileData.is_verified
    : false;
  isImageVarified.value = profileStore.profileData
    ? profileStore.profileData.is_verified
    : false;
  setStatus(
    profileStore.profileData ? profileStore.profileData.is_verified : false
  );
});

onMounted(() => {
  getCategories();
});

onMounted(() => {
  getAllEvents();
});

onUnmounted(() => {
  resetList()
})

watch(
  () => getStatus(),
  () => {
    isVarified.value = getStatus();
  }
);

watch(
  () => isImageVarified.value,
  () => {
    if (isImageVarified.value) {
      setStatus(true);
      openModal.value = false;
    }
  },
  { deep: true }
);

// watch(
//   () => filterStore.callFilterApi,
//   () => {
//     if (filterStore.callFilterApi) {
//       console.log("finding works");
//       getAllEvents();
//     }
//   },
//   { deep: true }
// );

watch(
  () => filterStore.formData,
  () => {
    getAllEvents();
  },
  { deep: true }
);

watch(
  () => categoryStore.selectedCategories,
  () => {
    getAllEvents();
  },
  { deep: true }
);
</script>

<template>
  <div>
    <FormEventSelector2 :eventData="categoryOption" />
  </div>
  <!-- map &   -->
  <div v-if="showMap" class="lg:min-h-96 min-h-[50vh]">
    <FormMap
      @set-location="
        (locationObj) => {
          console.log(locationObj);
        }
      "
      :multipleCoords="multipleCoords"
      :id="'map-container-3'"
      @sendIdToModal="(id) => getDetailsData(id)"
      :oldValue="{
        name: '',
        latitude: profileStore.latitude,
        longitude: profileStore.longitude,
      }"
    />
  </div>

  <!-- event section -->
  <section v-else class="relative">
    <SkeletonCards
      :loaderState="loaderState"
      classes="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative"
    >
      <div
        ref="el"
        v-if="events?.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 relative max-h-[60vh] md:max-h-[55vh] lg:max-h-[75vh] xl:max-h-[80vh] overflow-y-scroll scrollbar-hide"
      >
        <CardsProfile
          v-for="data in events"
          :profile="data"
          @sendIdToModal="getDetailsData(data._id)"
          @sendIdToDetails="router.push('/events/' + data._id + '/details')"
        />
      </div>

      <div v-else class="h-96 flex justify-center items-center">
        <p class="text-sm text-red-500">No Events to show</p>
      </div>

      <span
        v-if="!isVarified"
        class="absolute top-0 right-0 z-20 flex items-center justify-center w-full h-full"
      >
        <div
          class="h-fit w-full md:max-w-80 rounded-3xl border-2 border-primary bg-whitePrimary dark:bg-blackPrimary"
        >
          <div class="flex flex-col justify-center items-center gap-3 p-6">
            <p class="font-medium dark:text-slate-200">Complete</p>
            <!-- openModal = true -->
            <!-- setStatus(true) -->
            <button
              @click="openModal = true"
              class="bg-gradient-to-t from-primary to-secondary text-white px-6 p-2 rounded-full"
            >
              Verification
            </button>
            <p class="font-medium dark:text-slate-200">to see Events</p>
          </div>
        </div>
      </span>
    </SkeletonCards>
  </section>

  <section class="fixed bottom-16 right-4 lg:bottom-10 lg:right-20 z-20">
    <ButtonMapToggle
      @update-input="toggleMap"
      :oldValue="isVarified"
      containerClass="bg-white"
      iconClass="text-secondary"
    />
  </section>

  <!-- panel  -->
  <PanelBottom
    :expand="modalShouldExpand"
    :shouldOpen="detailsModalShouldOpen"
    @update-input="detailsModalShouldOpen = false"
  >
    <ContainerEventDetailsSmall
      v-if="detailsModalShouldOpen"
      :eventDetailsData="eventDetails"
      @send-data="(data) => (modalShouldExpand = data)"
      @should-reload="() => getAllEvents()"
    />
  </PanelBottom>

  <!-- modal  -->
  <ModalContainer
    :shouldOpen="openModal"
    @update-input="close"
    :showCloseBtn="true"
    classes="bg-whitePrimary max-w-xl dark:bg-blackPrimary"
  >
    <section v-if="stepNo == 1" class="px-4 pb-3">
      <div class="flex justify-center flex-col items-center gap-y-4 py-5">
        <div class="space-y-4">
          <p
            class="text-3xl font-semibold text-center text-mediumBlack dark:text-whitePrimary"
          >
            Let's get <br />
            you verified
          </p>
        </div>
      </div>
      <div class="">
        <LoaderImgTake>
          <!-- <AutomaticImgTaker
            @update-input="(dt) => (imgVerificationData = dt)"
            @save-img="() => varifyProfileImage()"
            @close-modal="() => (openImageVerifyModal = false)"
            @camera-ready="(bool) => (isCameraReady = bool)"
            :insiderCall="true"
            :shouldRestart="shouldRestartCamera"
          /> -->
          <SimpleImgTaker
            @camera-ready="(bool) => (isCameraReady = bool)"
            :shouldRestart="shouldRestartCamera"
            @update-input="(dt) => (imgVerificationData = dt)"
            @save-img="() => varifyProfileImage()"
          />
        </LoaderImgTake>
      </div>

      <div class="flex justify-center items-center gap-y-8">
        <!-- <ArrowLeftIcon
          class="h-5 w-5 text-darkGrey cursor-pointer"
          @click="stepNo = 4"
        /> -->

        <!-- <button
          @click="openModal = false"
          class="ml-auto px-4 p-2 font-semibold cursor-pointer text-slate-200"
        >
          Skip
        </button> -->
        <div class="w-64">
          <!-- <ButtonWithIcon
            v-if="isImageVarified"
            @click="submit"
            :name="'Next '"
          >
            <ArrowRightIcon class="h-5 w-5 ml-5" />
          </ButtonWithIcon> -->
          <!-- <ButtonWithIcon :name="'Next '" @click="varifyProfileImage()">
            <ArrowRightIcon class="h-5 w-5 ml-5" />
          </ButtonWithIcon> -->

          <ButtonWithIcon
            v-if="verifyLoaderState == 'pending'"
            :name="'Processing '"
          >
            <div
              class="ml-2 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></div>
          </ButtonWithIcon>
          <ButtonWithIcon
            v-else
            :name="isCameraReady ? 'Im Ready' : 'Turn on camera'"
            :classes="[
              isCameraReady
                ? ' bg-gradient-to-r from-primary to-secondary   text-white hover:bg-gradient-to-r hover:from-secondary hover:to-primary'
                : 'bg-slate-500  text-white ',
              'w-full  inline-flex justify-center items-center text-lg font-normal py-2 rounded-full',
            ]"
            @click="
              () => {
                if (isCameraReady) {
                  shouldRestartCamera = true;
                }
                // varifyProfileImage()
              }
            "
          >
          </ButtonWithIcon>
        </div>
      </div>
    </section>
  </ModalContainer>
</template>
