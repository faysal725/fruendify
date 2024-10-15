<script setup>
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";
import { useProfileStore } from "~~/stores/profileStore";
import { useCategoryStore } from "~~/stores/categoryStore";
import { useFilterStore } from "~~/stores/filterStore ";
import { useSearchStore } from "~~/stores/searchStore";

// apis
let dietOptionApi = api() + "/api/public/diet";
let languageOptionApi = api() + "/api/public/language";
let interestOptionApi = api() + "/api/admin/interest/public/list";

const crud = useCrud();

// store
const profileStore = useProfileStore();
const categoryStore = useCategoryStore();
const {
  getSelectedCategories,
  SetSelectedCategories,
  clearSelectedCategories,
} = categoryStore;

const filterStore = useFilterStore();
const { setFormData, getFormData, clearFormData, setCallFilterApi } =
  filterStore;

const searchStore = useSearchStore();
const { clearSearchData, setSearchData } = searchStore;

// emit
const emit = defineEmits(["closemodal"]);

const form = ref({
  distance: "",
  country: "",
  city: "",
  address: "",
  interests: "",
  lat: "",
  long: "",
  event_date: "",
  language: "",
  diet: "",
  drinking: "",
  search: "",
});

const dietOption = ref();
let languageOption = ref();
let interestOption = ref();

let key = ref(1234);

const drinkOptions = ref([
  {
    id: "Alcoholic",
    name: "Alcoholic",
  },
  {
    id: "non acoholic",
    name: "non acoholic",
  },
]);

const genders = ref([
  {
    id: 1,
    name: "Men",
    slug: "Men",
  },
  {
    id: 2,
    name: "Women",
    slug: "Women",
  },
  {
    id: 3,
    name: "others",
    slug: "others",
  },
]);

let openModal = ref(false);

const close = () => {
  openModal.value = false;
};

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const getDietOption = async () => {
  await crud.get({ path: dietOptionApi }).then((res) => {
    if (res.res.data) {
      dietOption.value = res.res.data;
    }
  });
};

const getLanguageOption = async () => {
  await crud.get({ path: languageOptionApi }).then((res) => {
    if (res.res.data) {
      languageOption.value = res.res.data;
    }
  });
};

const getInterestOption = async () => {
  await crud.get({ path: interestOptionApi }).then((res) => {
    if (res.res.data) {
      interestOption.value = res.res.data;
    }
  });
};

const submitFilter = async () => {
  form.value["categories"] = categoryStore.selectedCategories
    ? categoryStore.selectedCategories
    : "";
  form.value["search"] = searchStore.searchData;

  console.log(form.value);

  // let filterData = !filterStore.callFilterApi;
  setFormData(form.value);
  setCallFilterApi(true);
  emit("closemodal");
};

const clearFilter = async () => {
  form.value.distance = "";
  form.value.country = "";
  form.value.city = "";
  form.value.address = "";
  form.value.interests = "";
  form.value.lat = "";
  form.value.long = "";
  form.value.event_date = "";
  form.value.language = "";
  form.value.diet = "";
  form.value.drinking = "";
  form.value.search = "";

  clearSelectedCategories();
  clearFormData();
  clearSearchData();

  // setCallFilterApi(true);
  key.value++;
};

onMounted(() => {
  getDietOption();
  getLanguageOption();
  getInterestOption();
});

onUnmounted(() => {
  clearFormData();
});

// watch(
//   () => categoryStore.selectedCategories,
//   () => {
//     submitFilter();
//   },
//   { deep: true }
// );

watch(
  () => searchStore.searchData,
  () => {
    submitFilter();
  },
  { deep: true }
);
</script>

<template>
  <div
    class="px-4 max-h-[70vh] lg:max-h-[80vh] overflow-y-scroll scrollbar-hide pb-10 lg:pb-36"
  >
    <div
      class="space-y-2 sticky top-0 z-20 bg-whitePrimary dark:bg-blackPrimary pb-3 cursor-default"
    >
      <div class="flex justify-between items-center lg:max-w-md">
        <p class="text-sm font-bold dark:text-white">Find Events</p>
        <p
          @click="clearFilter"
          class="text-xs font-semibold flex items-center gap-2 transition-all duration-150 cursor-pointer dark:text-white"
        >
          Clear Filter
          <XCircleIcon class="text-black dark:text-white h-4 w-4" />
        </p>
      </div>
    </div>

    <div class="space-y-10">
      <section class="space-y-8" :key="key">
        <!-- <div>
          <p class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200">
            Want to Meet
          </p>

          <FormMultipleSelect
            v-model="form.gender"
            :title="''"
            :options="genders"
          />
        </div> -->

        <div>
          <FormDatepicker v-model="form.event_date" />
        </div>
        <!-- <FormRangeSlider
          v-model="form.age"
          :title="'Age Range'"
          :unit="'Age'"
        /> -->

        <div>
          <p class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200">
            Preferred Language
          </p>
          <FormMultipleSelect
            v-model="form.language"
            :title="''"
            :options="languageOption"
            :show="'title'"
            :returnVal="'_id'"
            :oldVal="form.language"
          />
        </div>

        <div>
          <p class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200">
            Interests
          </p>
          <FormMultipleSelect
            v-model="form.interests"
            :title="''"
            :options="interestOption"
            :show="'title'"
            :returnVal="'_id'"
          />
        </div>

        <div @click="openModal = true">
          <p
            class="text-xs font-medium text-mediumBlack dark:text-slate-200 pb-3"
          >
            Location
          </p>
          <p
            v-if="form.address !== ''"
            class="text-sm cursor-pointer dark:text-slate-200"
          >
            {{ form.address }}
          </p>
          <FormInputText2
            v-else
            v-model="form.address"
            :title="'Location'"
            :label="'Location'"
            :type="'text'"
            :oldValue="form.address"
            :classes="'h-10 w-full px-6  block bg-transparent text-xs text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none'"
          />
        </div>
        <FormRangeSlider
          @change="(dt) => (form.distance = dt)"
          :title="'Distance'"
          :unit="'km'"
          :singleRange="50"
          :isSingle="true"
        />

        <!-- <FormCombobox
          :title="'Diet'"
          :options="dietOption"
          v-model="form.gender"
        /> -->

        <div>
          <p class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200">
            Drinking
          </p>

          <FormMultipleSelect
            v-model="form.drinking"
            :title="''"
            :options="drinkOptions"
          />
          <!-- <FormDropdown
              v-model="form.drink"
              title="Drinking"
              :options="[
                { key: 'Alcoholic', value: 'Alcoholic' },
                { key: 'non acoholic', value: 'non acoholic' },
              ]"
              :oldValue="eventStore.eventData.drink"
            /> -->
        </div>
      </section>

      <div class="flex mt-5 gap-3">
        <ButtonLogin
          name="Filter"
          classes="text-xs bg-secondary font-base  bg-primary text-sm btn-login rounded-lg w-full"
          @click="submitFilter"
        />
      </div>
    </div>
  </div>

  <ModalContainer
    :shouldOpen="openModal"
    :showCloseBtn="true"
    @update-input="close"
    classes="bg-whitePrimary w-full md:max-w-xl "
  >


    <section class="flex flex-col justify-between md:p-2 gap-6 mt-20 md:mt-0">
      <FormMap
        @set-location="
          (locationObj) => {
            console.log(locationObj);
            form.address = locationObj.name;
            form.city = locationObj.city;
            form.country = locationObj.country;
            form.lat = locationObj.latitude;
            form.long = locationObj.longitude;
          }
        "
        classes="w-80 md:w-96 h-80"
        :showMarker="true"
        :id="'event-search-map'"
        :enableSearch="true"
        :error="''"
        :oldValue="{
          name: '',
          latitude: profileStore.latitude,
          longitude: profileStore.longitude,
        }"
      />

      <div class="flex justify-end">
        <ButtonLogin
          name="Select"
          classes="text-sm md:text-base bg-secondary font-base md:px-11 min-w-16 bg-primary text-sm btn-login"
          @click="close"
        />
      </div>
    </section>
  </ModalContainer>
</template>
