<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
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
import useSetColorTheme from "~/composables/useDarkmode";
import { useEventStore } from "~/stores/eventStore";
import { useProfileStore } from "~~/stores/profileStore";
import { useTabStore } from "~~/stores/tabStore";

definePageMeta({
  layout: "eventcreate",

  middleware: ["auth", "profilecompletion", "imageverify"],
});
// middleware: ["auth", "profilecompletion", 'imageverify'],

// apis
const eventCreationPath = api() + "/api/event/create";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let dietOptionApi = api() + "/api/public/diet";
let languageOptionApi = api() + "/api/public/language";
let educationOptionApi = api() + "/api/public/education";
let categoryOptionApi = api() + "/api/public/categories";
let industryOptionApi = api() + "/api/public/industry";
let musicOptionApi = api() + "/api/public/music";
let politicOptionApi = api() + "/api/public/politic";
let religionOptionApi = api() + "/api/public/religion";

//  let industryOptionApi = api() + "/api/public/categories";

const router = useRouter();
const crud = useCrud();

const eventStore = useEventStore();
const {
  setStep,
  saveEventInitials,
  saveEventDates,
  stepUp,
  stepDown,
  saveCategory,
  saveCoords,
  saveChoices,
  savePreferences,
  saveInsights,
  clearEventData,
} = eventStore;

const profileStore = useProfileStore();
const { getCurrentTab, setCurrentTab } = useTabStore();

const stepNo = ref(eventStore.stepNo);

const categoryOption = ref();

const genderOptions = ref([
  { key: 1, value: "Men" },
  { key: 2, value: "Women" },
  { key: 3, value: "Others" },
]);

// let allTabs = { key: 2, value: "My Event", href: "/event/my-event" }

const form = ref({
  title: "",
  short_description: "",
  event_date: "",
  number_of_people: "",
  start_time: "",
  notice_hour: "",
  slot: "",
  user_uid: "",
  interests: "",
  country: "",
  neighbourhood: "",
  city: "",
  address: "",
  lat: "",
  long: "",
  gender: "",
  age_range: "",
  start_age: "",
  end_age: "",
  diet: "",
  language: "",
  education: "",
  carrier: "",
  hobbies: "",
  music: "",
  politic: "",
  relationship_status: "",
  drink: "",
  is_athlete: "",
  smoke: "",
  face_blur: "",
  religion: "",
  category: "",
  status: "",
  evenet_activities: "",
  created_by: "",
});
const errors = ref({
  title: "",
  short_description: "",
  event_date: "",
  number_of_people: "",
  start_time: "",
  notice_hour: "",
  slot: "",
  user_uid: "",
  interests: "",
  address: "",
  lat: "",
  long: "",
  gender: "",
  start_age: "",
  end_age: "",
  diet: "",
  language: "",
  education: "",
  carrier: "",
  hobbies: "",
  music: "",
  politic: "",
  relationship_status: "",
  drink: "",
  is_athlete: "",
  smoke: "",
  face_blur: "",
  religion: "",
  category: "",
  status: "",
  evenet_activities: "",
  created_by: "",
});

const searchPlaces = ref();
const offers = ref([
  {
    title: "Resturant Name",
    discount: "15% off",
    imgSrc: "/offers/1.png",
    location: "Biegarten Haus",
    distance: "8.5 Km",
  },
  {
    title: "Resturant Name",
    discount: "15% off",
    imgSrc: "/offers/1.png",
    location: "Biegarten Haus",
    distance: "8.5 Km",
  },
  {
    title: "Resturant Name",
    discount: "15% off",
    imgSrc: "/offers/1.png",
    location: "Biegarten Haus",
    distance: "8.5 Km",
  },
  {
    title: "Resturant Name",
    discount: "15% off",
    imgSrc: "/offers/1.png",
    location: "Biegarten Haus",
    distance: "8.5 Km",
  },
  {
    title: "Resturant Name",
    discount: "15% off",
    imgSrc: "/offers/1.png",
    location: "Biegarten Haus",
    distance: "8.5 Km",
  },

  {
    title: "Resturant Name",
    discount: "15% off",
    imgSrc: "/offers/1.png",
    location: "Biegarten Haus",
    distance: "8.5 Km",
  },
  {
    title: "Resturant Name",
    discount: "15% off",
    imgSrc: "/offers/1.png",
    location: "Biegarten Haus",
    distance: "8.5 Km",
  },
]);

let interestsOption = ref();

let dietOption = ref();

let languageOption = ref();

let educationOption = ref();

let careerOption = ref();

let hobbies = ref([
  {
    _id: 26,
    title: "reading book",
  },
  {
    _id: 18,
    title: "cricket",
  },
]);

let musicOption = ref();

let politicOption = ref();
let religionOption = ref();

const timeSlots = ref([
  {
    _id: "Days",
    name: "Days",
    slug: "Days",
  },
  {
    _id: "Hours",
    name: "Hours",
    slug: "Hours",
  },
]);

// setting options
const getInterestOption = async () => {
  await crud.get({ path: interestOptionApi }).then((res) => {
    if (res.res.data) {
      interestsOption.value = res.res.data;
    }
  });
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

const getEducationOption = async () => {
  await crud.get({ path: educationOptionApi }).then((res) => {
    if (res.res.data) {
      educationOption.value = res.res.data;
    }
  });
};

const getCarrierOption = async () => {
  await crud.get({ path: industryOptionApi }).then((res) => {
    if (res.res.data) {
      careerOption.value = res.res.data;
    }
  });
};

const getMusicOption = async () => {
  await crud.get({ path: musicOptionApi }).then((res) => {
    if (res.res.data) {
      musicOption.value = res.res.data;
    }
  });
};

const getPoliticOption = async () => {
  await crud.get({ path: politicOptionApi }).then((res) => {
    console.log(res.res.data);
    if (res.res.data) {
      politicOption.value = res.res.data;
    }
  });
};

const getReligionOption = async () => {
  await crud.get({ path: politicOptionApi }).then((res) => {
    if (res.res.data) {
      religionOption.value = res.res.data;
    }
  });
};

const getCategories = async () => {
  await crud.get({ path: categoryOptionApi }).then((res) => {
    if (res.res.data) {
      categoryOption.value = res.res.data;
    }
  });
};

// collect data
const collectEventInitials = () => {
  errors.value.title = "";
  errors.value.short_description = "";
  errors.value.number_of_people = "";

  if (
    form.value.title !== "" &&
    form.value.short_description !== "" &&
    form.value.number_of_people !== ""
  ) {
    let creds = {
      title: form.value.title,
      short_description: form.value.short_description,
      number_of_people: form.value.number_of_people,
    };
    saveEventInitials(creds);
  } else {
    if (form.value.title === "") {
      errors.value.title = "Please enter your title";
    }

    if (form.value.short_description === "") {
      errors.value.short_description = "Please enter short_description";
    }
    if (form.value.number_of_people === "") {
      errors.value.number_of_people = "Please enter your number_of_people";
    }
  }
};

const collectEventDates = () => {
  console.log(
    form.value.event_date,
    form.value.start_time,
    form.value.notice_hour,
    form.value.slot
  );

  errors.value.event_date = "";
  errors.value.start_time = "";
  errors.value.notice_hour = "";
  errors.value.slot = "";

  if (
    form.value.event_date !== "" &&
    form.value.start_time !== "" &&
    form.value.notice_hour !== ""
  ) {
    let creds = {
      event_date: form.value.event_date,
      start_time: form.value.start_time,
      notice_hour: form.value.notice_hour,
      slot: form.value.slot,
    };
    saveEventDates(creds);
  } else {
    console.log(form.value.event_date === "");
    if (form.value.event_date === "") {
      errors.value.event_date = "Please Select date";
    }
    if (form.value.start_time === "") {
      errors.value.start_time = "Please Select start_time";
    }
    if (form.value.notice_hour === "") {
      errors.value.notice_hour = "Please Select notice hour";
    }
    if (form.value.slot === "") {
      errors.value.slot = "Please Select notice hour";
    }
    // if (form.value.interest === "") {
    //   errors.value.interest = "Please Select interests";
    // }
  }
};

const collectCategory = () => {
  clearError();
  console.log(form.value.category, form.value.category.length);
  if (form.value.category.length > 0 && form.value.category !== "") {
    let creds = {
      category: form.value.category,
    };
    console.log(creds);
    saveCategory(creds);
  } else {
    errors.value.category = "Please Select at least one category";
  }
};

const collectCoords = () => {
  errors.value.address = "";
  clearError();
  console.log(form.value);
  if (
    form.value.address !== "" &&
    typeof form.value.address !== "undefined" &&
    form.value.lat !== "" &&
    typeof form.value.lat !== "undefined" &&
    form.value.long !== "" &&
    typeof form.value.long !== "undefined" &&
    form.value.road !== "" &&
    typeof form.value.road !== "undefined" &&
    form.value.city !== "" &&
    typeof form.value.city !== "undefined" &&
    form.value.country !== "" &&
    typeof form.value.country !== "undefined" &&
    form.value.neighbourhood !== "" &&
    typeof form.value.neighbourhood !== "undefined"
  ) {
    // console.log(creds);
    saveCoords(form.value);
  } else {
    if (
      form.value.address === "" ||
      typeof form.value.address === "undefined"
    ) {
      errors.value.address = "Please Select address properly";
    } else if (form.value.lat === "" || typeof form.value.lat === "undefined") {
      errors.value.address = "Couldnot collect the coordinates properly";
    } else if (
      form.value.road === "" ||
      typeof form.value.road === "undefined"
    ) {
      errors.value.address = "Couldnot collect the road info";
    } else if (
      form.value.city === "" ||
      typeof form.value.city === "undefined"
    ) {
      errors.value.address = "Couldnot collect the city info";
    } else if (
      form.value.country === "" ||
      typeof form.value.country === "undefined"
    ) {
      errors.value.address = "Couldnot collect the country info";
    } else if (
      form.value.neighbourhood === "" ||
      typeof form.value.neighbourhood === "undefined"
    ) {
      errors.value.address = "Couldnot collect the neighbourhood info";
    }
  }
};

const collectChoices = () => {
  clearError();
  if (
    form.value.gender !== "" &&
    form.value.age_range !== "" &&
    form.value.language !== "" &&
    form.value.education !== "" &&
    form.value.career !== ""
  ) {
    console.log(form.value);
    saveChoices(form.value);
  } else {
    console.log(form.value);
    if (form.value.gender === "") {
      errors.value.gender = "Please Select gender";
    }
    if (form.value.age_range === "") {
      errors.value.age_range = "Please Select age_range";
    }
    if (form.value.diet === "") {
      errors.value.diet = "Please Select diet";
    }
    if (form.value.language === "") {
      errors.value.language = "Please Select language";
    }
    if (form.value.education === "") {
      errors.value.education = "Please Select education";
    }
    if (form.value.career === "") {
      errors.value.career = "Please Select career";
    }
  }
};

const collectPreferences = () => {
  clearError();
  if (
    form.value.interests !== "" ||
    (form.value.interests.length !== 0 && form.value.music !== "") ||
    form.value.music.length !== 0
  ) {
    console.log(form.value);
    savePreferences(form.value);
  } else {
    console.log(form.value);
    if (form.value.interests === "" || form.value.interests.length == 0) {
      errors.value.interests = "Please Select interests";
    }
    if (form.value.music === "" || form.value.music.length == 0) {
      errors.value.music = "Please Select music";
    }
  }
};

const collectInsights = () => {
  clearError();
  if (
    form.value.politic !== "" &&
    form.value.relationship_status !== "" &&
    form.value.drink !== "" &&
    form.value.sport !== "" &&
    form.value.smoke !== "" &&
    form.value.is_athlete !== ""
  ) {
    saveInsights(form.value);
  } else {
    console.log(form.value);
    if (form.value.politic === "") {
      errors.value.politic = "Please Select politic";
    }
    if (form.value.relationship_status === "") {
      errors.value.relationship_status = "Please Select relationship_status";
    }
    if (form.value.drink === "") {
      errors.value.drink = "Please Select drink";
    }
    if (form.value.sport === "") {
      errors.value.sport = "Please Select sport";
    }
    if (form.value.smoke === "") {
      errors.value.smoke = "Please Select smoke";
    }
  }
};

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

// convert to formdata
async function convertToFormData() {
  const formData = new FormData();
  formData.append("title", eventStore.eventData.title);
  formData.append("short_description", eventStore.eventData.short_description);
  formData.append("event_date", eventStore.eventData.event_date);
  formData.append("number_of_people", eventStore.eventData.number_of_people);
  formData.append("start_time", eventStore.eventData.start_time);
  formData.append("notice_hour", eventStore.eventData.notice_hour);
  // formData.append("slot", eventStore.eventData.slot);
  formData.append("slot", "something");
  eventStore.eventData.interests.forEach((data, index) => {
    formData.append("interests", data);
  });
  formData.append("road", eventStore.eventData.road);
  formData.append("address", eventStore.eventData.address);
  formData.append("neighbourhood", eventStore.eventData.neighbourhood);
  formData.append("lat", eventStore.eventData.lat);
  formData.append("long", eventStore.eventData.long);
  formData.append("gender", eventStore.eventData.gender);
  formData.append("start_age", eventStore.eventData.start_age);
  formData.append("end_age", eventStore.eventData.end_age);
  // eventStore.eventData.diet.forEach((data, index) => {
  //   formData.append("diet", data);
  // });
  eventStore.eventData.language.forEach((data, index) => {
    formData.append("language", data);
  });

  formData.append("carrier", eventStore.eventData.carrier);

  formData.append("category", eventStore.eventData.category);

  // eventStore.eventData.category.forEach((data, index) => {
  //   formData.append("category", data);
  // });

  formData.append("city", eventStore.eventData.city);
  formData.append("country", eventStore.eventData.country);

  // formData.append("diet", "data");

  eventStore.eventData.education.forEach((data, index) => {
    formData.append("education", data);
  });

  eventStore.eventData.music.forEach((data, index) => {
    formData.append("music", data);
  });

  formData.append("politic", eventStore.eventData.politic);
  formData.append(
    "relationship_status",
    eventStore.eventData.relationship_status
  );
  formData.append("drink", eventStore.eventData.drink);
  // console.log(form.value.is_athlete, eventStore.eventData.is_athlete);
  formData.append("is_athlete", eventStore.eventData.is_athlete);
  formData.append("smoke", eventStore.eventData.smoke);

  formData.append("face_blur", form.value.face_blur);

  // formData.append("user_uid", eventStore.eventData._id);

  return formData;
}

let loaderState = ref();

// event creation
const createEvent = async () => {
  loaderState.value = "pending";
  console.log(form.value);
  let formData = await convertToFormData();

  await crud
    .store({
      body: formData,
      path: eventCreationPath,
    })
    .then(async (res) => {
      // console.log(res.res.data._id)
      if (res.status == 200) {
        await setCurrentTab("events", 1);
        await clearEventData();
        await router
          .push("/events/")
          .then(() => showToast("Event created successful"));
        loaderState.value = "resolve";
      } else {
        loaderState.value = "failed";
        showToast("Event created failed", "error", 5000);
      }
    });
};

// clear errors
const clearError = () => {
  errors.value.title = "";
  errors.value.short_description = "";
  errors.value.event_date = "";
  errors.value.number_of_people = "";
  errors.value.start_time = "";
  errors.value.notice_hour = "";
  errors.value.user_uid = "";
  errors.value.interests = "";
  errors.value.address = "";
  errors.value.lat = "";
  errors.value.long = "";
  errors.value.gender = "";
  errors.value.start_age = "";
  errors.value.end_age = "";
  errors.value.diet = "";
  errors.value.language = "";
  errors.value.education = "";
  errors.value.carrier = "";
  errors.value.hobbies = "";
  errors.value.music = "";
  errors.value.politic = "";
  errors.value.relationship_status = "";
  errors.value.drink = "";
  errors.value.is_athlete = "";
  errors.value.smoke = "";
  errors.value.face_blur = "";
  errors.value.religion = "";
  errors.value.category = "";
  errors.value.status = "";
  errors.value.evenet_activities = "";
  errors.value.created_by = "";
};

onMounted(() => {
  getInterestOption();
  getDietOption();
  getLanguageOption();
  getEducationOption();
  getCarrierOption();
  getMusicOption();
  getPoliticOption();
  getReligionOption();
  getCategories();
});

onMounted(() => {
  useSetColorTheme("light");
});

onMounted(() => {
  eventStore.clearEventData();
});

watch(
  () => form.value,
  () => {
    console.log(form.value);
  },
  { deep: true }
);

watch(
  () => eventStore.stepNo,
  () => {
    stepNo.value = eventStore.stepNo;
  },
  { deep: true }
);
</script>
<template>
  <div
    class="min-h-screen flex items-start pt-5 md:items-center justify-center dark:bg-blackPrimary"
  >
    <LoaderUniversal :loaderState="loaderState">
      <section
        v-if="stepNo == 1"
        class="max-w-xl border border-lightGrey dark:border-slate-400 rounded-xl p-8"
      >
        <CommonDotPaginator
          :stepNo="stepNo"
          :total="8"
          @change-state="(stepNo) => setStep(stepNo)"
        />
        <div class="grid grid-cols-4 gap-4 gap-x-3 py-3 pt-8">
          <div class="col-span-4">
            <FormInputText2
              v-model="form.title"
              :title="''"
              :label="'title'"
              :type="'text'"
              :oldValue="eventStore.eventData.title"
              :required="false"
              :placeholder="'Event Title'"
              :error="errors.title"
            />
          </div>

          <div class="col-span-4">
            <FormTextArea
              v-model="form.short_description"
              :title="''"
              :label="'short_description'"
              :type="'text'"
              :oldValue="eventStore.eventData.short_description"
              :required="false"
              :placeholder="'Short description'"
              :error="errors.short_description"
            />
          </div>
          <div class="col-span-4">
            <!-- <FormInputText2
            v-model="form.number_of_people"
            :title="''"
            :label="'Max no of people'"
            :type="'number'"
            :oldValue="eventStore.eventData.number_of_people"
            :required="false"
            :placeholder="'Max no of people'"
            :error="errors.number_of_people"
          /> -->

            <FormSelector3
              v-model="form.number_of_people"
              title="Max no of people"
              :options="[
                { key: 1, value: '1-1' },
                { key: 10, value: '2-10' },
                { key: 50, value: '10-50' },
                { key: 100, value: '50-100' },
              ]"
              :oldValue="eventStore.eventData.number_of_people"
            />
          </div>
        </div>

        <div class="pt-8 flex justify-between items-center gap-8">
          <ButtonSquare name="Continue" @click="collectEventInitials()" />
        </div>
      </section>

      <section
        v-if="stepNo == 2"
        class="max-w-xl border border-lightGrey rounded-xl p-8"
      >
        <CommonDotPaginator
          :stepNo="stepNo"
          :total="8"
          @change-state="(stepNo) => setStep(stepNo)"
        />

        <div class="grid grid-cols-4 gap-4 gap-x-3 py-3 pt-8">
          <div class="col-span-4 pb-3">
            <p
              class="text-sm md:text-base font-medium pb-1 text-gray-700 dark:text-slate-200"
            >
              Dates
            </p>
            <FormDatepicker
              :isRange="false"
              v-model="form.event_date"
              :error="errors.event_date"
              :oldValue="eventStore.eventData.event_date"
            />
          </div>

          <div class="col-span-4 pb-3">
            <p
              class="text-sm md:text-base font-medium pb-1 text-gray-700 dark:text-slate-200"
            >
              Starting Time
            </p>

            <FormTimepicker
              v-model="form.start_time"
              :error="errors.start_time"
              :oldValue="eventStore.eventData.start_time"
            />
          </div>
          <div class="col-span-4 pb-3">
            <p
              class="text-sm md:text-base font-medium pb-1 text-gray-700 dark:text-slate-200"
            >
              Registration closes before
            </p>

            <!-- <div class="flex justify-start items-center gap-2">
              <FormInputNumber
                v-model="form.notice_hour"
                :title="''"
                :label="'title'"
                :oldValue="eventStore.eventData.notice_hour"
                :required="false"
                :placeholder="'Event Title'"
                :error="''"
                :classes="'h-10 w-36  px-2 block bg-white text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none'"
              />
              <FormTimeCombobox
                v-model="form.slot"
                :title="''"
                :options="timeSlots"
                :classes="'rounded-md'"
                :iconClasses="'text-red-700'"
                :returnVal="'_id'"
              />
            </div> -->
            <!-- {{ form.notice_hour }} -->
            <FormDateTimepicker
              :isRange="false"
              v-model="form.notice_hour"
              :format="'MM/dd/yyyy HH:mm'"
              :error="errors.notice_hour"
              :oldValue="eventStore.eventData.notice_hour"
            />
            <p class="text-xs text-red-500">{{ errors.notice_hour }}</p>
          </div>
        </div>

        <div class="pt-8 flex justify-between items-center gap-8">
          <ButtonSquare name="Continue" @click="collectEventDates()" />
        </div>
      </section>

      <section
        v-if="stepNo == 3"
        class="max-w-xl border border-lightGrey rounded-xl bg-whitePrimary overflow-hidden"
      >
        <div class="p-8">
          <CommonDotPaginator
            :stepNo="stepNo"
            :total="8"
            @change-state="(stepNo) => setStep(stepNo)"
          />
          <div
            class="flex justify-center flex-col items-start gap-y-10 py-5 pt-8"
          >
            <div class="space-y-1 text-start">
              <p class="text-xl md:text-2xl font-semibold text-mediumBlack">
                What you like to do. Tell us!
              </p>
              <p class="text-sm md:text-base text-darkGrey">
                We'll find the perfect match for you.
              </p>
            </div>
          </div>

          <FormEventCreationSelector
            v-model="form.category"
            :options="categoryOption"
            :classes="'grid grid-cols-3 md:grid-cols-4 gap-4'"
            :error="errors.category"
            :oldValue="eventStore.eventData.category"
          />
        </div>
        <div
          class="p-3 px-6 flex justify-between items-center gap-8 bg-whiteSecondary"
        >
          <ButtonSquare name="Continue" @click="collectCategory()" />
        </div>
      </section>

      <section
        v-if="stepNo == 4"
        class="max-w-xl border border-lightGrey rounded-xl p-8 space-y-5 md:space-y-8 bg-whitePrimary"
      >
        <CommonDotPaginator
          :stepNo="stepNo"
          :total="8"
          @change-state="(stepNo) => setStep(stepNo)"
        />
        <div class="flex justify-center flex-col items-start gap-y-10">
          <div class="space-y-1 text-start">
            <p class="text-xl md:text-2xl font-semibold text-mediumBlack">
              Location
            </p>
            <p class="text-sm md:text-base text-darkGrey">
              We'll find the perfect match for you.
            </p>
          </div>
        </div>
        {{ form.value }}
        <div>
          <FormMap
            @set-location="
              (locationObj) => {
                console.log(locationObj, 'this is another');
                form.address = locationObj.name;
                form.road = locationObj.road;
                form.city = locationObj.city;
                form.country = locationObj.country;
                form.lat = locationObj.latitude;
                form.long = locationObj.longitude;
                form.neighbourhood = locationObj.neighbourhood;
              }
            "
            classes="w-full h-72 md:w-96 md:h-96"
            :showMarker="true"
            :id="'event-create-map'"
            :enableSearch="true"
            :error="errors.address"
            :oldValue="{
              name: '',
              latitude: profileStore.latitude,
              longitude: profileStore.longitude,
            }"
          />
        </div>
        <div class="pt-8 flex justify-between items-center gap-8">
          <ButtonSquare name="Continue" @click="collectCoords()" />
        </div>
      </section>

      <!-- necessary  -->
      <!-- <section
      v-if="stepNo == 4"
      class="max-w-xl border border-lightGrey rounded-xl p-8 space-y-8 bg-whitePrimary"
    >
      <CommonDotPaginator :stepNo="stepNo" />
      <div class="flex justify-center flex-col items-start gap-y-10">
        <div class="spa8e-y-1 text-start">
          <p class="text-2xl font-semibold text-mediumBlack">Location</p>
          <p class="text-base text-darkGrey">
            We'll find the perfect match for you.
          </p>
        </div>
      </div>

      <div class="w-full">
        <FormInputText2
          v-model="searchPlaces"
          :title="''"
          :label="'searchPlaces'"
          :type="'text'"
          :oldValue="''"
          :required="false"
          :placeholder="'Search place and event location'"
        />
      </div>

      <div>
        <ContainerCardScroller :title="''">
          <CardsOffer :offerData="data" v-for="data in offers" />
        </ContainerCardScroller>
      </div>
      <div>
        <img src="../../assets/images/event/map.png" alt="" />
      </div>
      <div class="pt-8 flex justify-between items-center gap-8">
        <ButtonSquare name="Continue" @click="stepNo = 5" />
      </div>
    </section> -->
      <!-- necessary  -->

      <section
        v-if="stepNo == 5"
        class="max-w-4xl border border-lightGrey rounded-xl p-5 md:p-8 bg-whitePrimary"
      >
        <CommonDotPaginator
          :stepNo="stepNo"
          :total="8"
          @change-state="(stepNo) => setStep(stepNo)"
        />
        <div
          class="flex justify-center flex-col items-start gap-y-10 py-5 pt-8"
        >
          <div class="space-y-1 text-start">
            <p class="text-xl md:text-2xl font-semibold text-mediumBlack">
              Any specific Choices..?
            </p>
            <p class="text-sm md:text-base text-darkGrey">
              We'll find the perfect match for you.
            </p>
          </div>
        </div>

        <div
          class="flex flex-col gap-4 py-5 w-80 md:w-96 max-h-72 md:max-h-96 overflow-y-scroll scrollbar-hide"
        >
          <div>
            <div class="flex items-center gap-3 pl-2 pb-3">
              <img src="~~/assets/images/profile/genders.png" alt="" />
              <p class="text-sm text-gray-600">Interested in</p>

              <div class="ml-auto">
                <FormDropdown
                  v-model="form.gender"
                  title="gender"
                  :options="[
                    { key: 'Male', value: 'Male' },
                    { key: 'Female', value: 'Female' },
                    { key: 'Non-binary', value: 'Non-binary' },
                    { key: 'Others', value: 'Others' },
                    { key: 'All', value: 'All' },
                  ]"
                  :oldValue="eventStore.eventData.gender"
                />
              </div>
            </div>

            <!-- <FormSelector5
            v-model="form.gender"
            :title="'Interested in'"
            :imageSrc="'/profile/genders.png'"
            :options="[
              { _id: 'Female', title: 'FEMALE' },
              { _id: 'Male', title: 'MALE' },
              { _id: 'Non-binary', title: 'Non-binary' },
              { _id: 'Others', title: 'Others' },
              { _id: 'All', title: 'All' },
            ]"
            :oldValue="eventStore.eventData.gender"
            :error="errors.gender"
            :uniqueContainerClass="'gender'"
          /> -->
          </div>

          <div class="pb-2">
            <div class="flex items-start flex-col justify-start gap-3 relative">
              <div
                class="flex items-center justify-start absolute top-0 left-2 bg-white"
              >
                <img src="~~/assets/images/profile/ageRange.png" alt="" />
                <p class="text-sm text-gray-600 pl-3">Age Range</p>
              </div>

              <div class="w-full">
                <FormRangeSlider
                  @change="
                    (data) => {
                      form.age_range = data[0] + '-' + data[1];
                      console.log(data);
                    }
                  "
                  :unit="'Year'"
                  :isRed="true"
                  :valueRange="[10, 70]"
                />
              </div>
            </div>
            <p class="text-sm text-red-600 pt-4">{{ errors.age_range }}</p>
          </div>

          <div class="pb-3">
            <FormSelector5
              v-model="form.language"
              :title="'Language'"
              :imageSrc="'/profile/language.png'"
              :options="languageOption"
              :oldValue="eventStore.eventData.language"
              :error="errors.language"
              :uniqueContainerClass="'language'"
            />
          </div>

          <div class="pb-3">
            <FormSelector5
              v-model="form.education"
              :title="'Education'"
              :imageSrc="'/profile/education.png'"
              :options="educationOption"
              :oldValue="eventStore.eventData.education"
              :error="errors.education"
              :uniqueContainerClass="'Education'"
            />
          </div>

          <div class="pb-3">
            <FormSelector5
              v-model="form.carrier"
              :title="'Career'"
              :imageSrc="'/profile/career.png'"
              :options="careerOption"
              :oldValue="eventStore.eventData.carrier"
              :error="errors.carrier"
              :uniqueContainerClass="'Career'"
            />
          </div>
        </div>

        <div class="pt-8 flex justify-between items-center gap-8">
          <ButtonSquare name="Continue" @click="collectChoices()" />
        </div>
      </section>

      <section
        v-if="stepNo == 6"
        class="max-w-xl border border-lightGrey rounded-xl p-6 md:p-8 bg-whitePrimary"
      >
        <CommonDotPaginator
          :stepNo="stepNo"
          :total="8"
          @change-state="(stepNo) => setStep(stepNo)"
        />
        <div
          class="flex justify-center flex-col items-start gap-y-10 py-5 pt-8"
        >
          <div class="space-y-1 text-start">
            <p class="text-xl md:text-2xl font-semibold text-mediumBlack">
              Your Interests, Hobbies, and <br />
              Music Preferences.
            </p>
            <p class="text-sm md:text-base text-darkGrey">
              We'll find the perfect match for you.
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-4 py-5 max-w-80 md:w-96">
          <div class="pb-3">
            <FormSelector5
              v-model="form.interests"
              :title="'Interests'"
              :imageSrc="'/profile/genders.png'"
              :options="interestsOption"
              :oldValue="eventStore.eventData.interests"
              :error="errors.interests"
              :uniqueContainerClass="'Interests'"
            />
          </div>
          <div class="pb-3">
            <FormSelector5
              v-model="form.music"
              :title="'Music'"
              :imageSrc="'/profile/music.png'"
              :options="musicOption"
              :oldValue="eventStore.eventData.music"
              :error="errors.music"
              :uniqueContainerClass="'music'"
            />
          </div>

          <!-- <div class="pb-3">
          <div
            class="flex items-center gap-3 border-b border-b-lightGrey pb-2 px-2"
          >
            <img src="~~/assets/images/profile/music.png" alt="" />
            <p class="text-sm text-gray-600">Music</p>

            <img
              src="~~/assets/icons/Chevron.svg"
              alt=""
              class="ml-auto h-2 w-2"
            />
          </div>
          <FormSelector4
            v-model="form.music"
            :title="''"
            :options="musicOption"
            :oldValue="eventStore.eventData.music"
            :error="errors.music"
          />
        </div> -->
        </div>

        <div class="pt-8 flex justify-between items-center gap-8">
          <!-- <ButtonSquare
          name="Skip"
          @click="stepNo = 9"
          classes="hover:text-black bg-mediumBlack hover:bg-white text-white border border-mediumBlack"
        /> -->
          <ButtonSquare name="Continue" @click="collectPreferences()" />
        </div>
      </section>

      <section
        v-if="stepNo == 7"
        class="max-w-xl border border-lightGrey rounded-xl p-5 md:p-8 bg-whitePrimary"
      >
        <CommonDotPaginator
          :stepNo="stepNo"
          :total="8"
          @change-state="(stepNo) => setStep(stepNo)"
        />
        <div
          class="flex justify-center flex-col items-start gap-y-10 py-5 pt-8"
        >
          <div class="space-y-1 text-start">
            <p class="text-xl md:text-2xl font-semibold text-mediumBlack">
              Share more insights to help us <br />
              make your event better!
            </p>
            <p class="text-sm md:text-base text-darkGrey">
              We'll find the perfect match for you.
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-4 py-5 md:w-96">
          <div>
            <div class="flex items-center gap-3">
              <img src="~~/assets/images/profile/political.png" alt="" />
              <p class="text-sm text-gray-600">Political Orientation</p>

              <div class="ml-auto">
                <FormDropdown
                  v-model="form.politic"
                  title="politics"
                  :options="politicOption"
                  :return="'_id'"
                  :show="'title'"
                  :oldValue="eventStore.eventData.politic"
                />
              </div>
            </div>

            <p class="text-sm text-red-600">{{ errors.politic }}</p>
          </div>

          <div class="flex items-center gap-3">
            <img src="~~/assets/images/profile/relation.png" alt="" />
            <p class="text-sm text-gray-600">Relationship status</p>

            <div class="ml-auto">
              <FormDropdown
                v-model="form.relationship_status"
                title="marital status"
                :options="[
                  { key: 'Married', value: 'Married' },
                  { key: 'Unmarried', value: 'Unmarried' },
                ]"
                :oldValue="eventStore.eventData.relationship_status"
              />
            </div>
          </div>

          <div class="flex items-center gap-3">
            <img src="~~/assets/images/profile/drink.png" alt="" />
            <p class="text-sm text-gray-600">Drinking</p>

            <div class="ml-auto">
              <!-- <FormDropdown
              v-model="form.drinking_habit"
              title="Drinking"
              :options="[
                { key: 'Alcoholic', value: 'Alcoholic' },
                { key: 'non acoholic', value: 'non acoholic' },
              ]"
              :old-value="'non acoholic'"
            /> -->

              <FormDropdown
                v-model="form.drink"
                title="Drinking"
                :options="[
                  { key: 'Alcoholic', value: 'Alcoholic' },
                  { key: 'non acoholic', value: 'non acoholic' },
                ]"
                :oldValue="eventStore.eventData.drink"
              />
            </div>
          </div>

          <div class="flex items-center gap-3">
            <img src="~~/assets/images/profile/sport.png" alt="" />
            <p class="text-sm text-gray-600">Sport</p>

            <div class="ml-auto">
              <FormDropdown
                v-model="form.is_athlete"
                title="Sport"
                :options="[
                  { key: true, value: 'Active' },
                  { key: false, value: 'Not Active' },
                ]"
                :old-value="eventStore.eventData.is_athlete"
              />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <img src="~~/assets/images/profile/smoke.png" alt="" />
            <p class="text-sm text-gray-600">Smoking</p>

            <div class="ml-auto">
              <FormDropdown
                v-model="form.smoke"
                title="Smoking"
                :options="[
                  { key: 'Preferred', value: 'Preferred' },
                  { key: 'non smoker', value: 'non smoker' },
                ]"
                :old-value="eventStore.eventData.smoke"
              />
            </div>
          </div>
        </div>

        <div class="pt-8 flex justify-between items-center gap-8">
          <!-- <ButtonSquare
            name="Skip"
            @click="stepNo = 8"
            classes="hover:text-black bg-mediumBlack hover:bg-white text-white border border-mediumBlack"
          /> -->
          <ButtonSquare name="Continue" @click="collectInsights()" />
        </div>
      </section>

      <section
        v-if="stepNo == 8"
        class="max-w-xl border border-lightGrey rounded-xl p-5 md:p-8"
      >
        <div class="flex justify-center flex-col items-center gap-y-10 py-5">
          <CommonDotPaginator
            :stepNo="stepNo"
            :total="8"
            @change-state="(stepNo) => setStep(stepNo)"
          />
          <div class="space-y-1 text-start">
            <p class="text-xl md:text-2xl font-semibold text-mediumBlack">
              Do you want your face to be blurred?
            </p>
            <p class="text-sm md:text-base text-darkGrey">
              If yes, we will hide your profile picture in front of uninvited
              audiences.
            </p>
          </div>
        </div>

        <div class="pt-8 flex justify-between items-center gap-8">
          <ButtonSquare
            name="Yes"
            classes=" bg-mediumBlack text-white  border border-mediumBlack hover:text-mediumBlack hover:bg-white"
            @click="
              () => {
                form.face_blur = true;
                createEvent();
              }
            "
          />
          <ButtonSquare
            name="No"
            @click="
              () => {
                form.face_blur = false;
                createEvent();
              }
            "
          />
        </div>
      </section>

      <section
        v-if="stepNo == 9"
        class="max-w-xl border border-lightGrey rounded-xl p-5 md:p-8"
      >
        <div class="flex justify-center flex-col items-center gap-y-10 py-5">
          <CommonDotPaginator
            :stepNo="stepNo"
            :total="8"
            @change-state="(stepNo) => setStep(stepNo)"
          />
          <div class="space-y-1 text-center">
            <p class="text-xl md:text-2xl font-semibold text-mediumBlack">
              Congratulations you have successfully created this event
            </p>
            <p class="text-sm md:text-base text-darkGrey">
              Now you can share your event with others.
            </p>
          </div>
        </div>

        <div class="pt-8 flex justify-between items-center gap-8">
          <ButtonSquare
            name="Go to home"
            classes=" bg-mediumBlack text-white  border border-mediumBlack hover:text-mediumBlack hover:bg-white"
          />
          <ButtonSquare name="View your event" @click="stepNo = 1" />
        </div>
      </section>

      <!-- necessary  -->
      <!--     
    <section
      v-if="stepNo == 8"
      class="max-w-xl border border-lightGrey rounded-xl p-8 space-y-8"
    >
      <CommonDotPaginator :stepNo="stepNo" />
      <div class="flex justify-center flex-col items-start gap-y-10">
        <div class="spa8e-y-1 text-start">
          <p class="text-2xl font-semibold text-mediumBlack">
            Choose From the best deals
          </p>
          <p class="text-base text-darkGrey">
            We'll find the perfect match for you.
          </p>
        </div>
      </div>

      <div class="w-full flex justify-start items-center gap-7">
        <p class="flex gap-2 text-base font-semibold text-mediumBlack">
          <img src="../../assets/images/event/dating.svg" alt="" /> Dating
        </p>
        <p class="text-sm text-darkGrey">
          Restaurants based on your preferences.
        </p>
      </div>

      <div>
        <ContainerSlider :perSlide="1">
          <swiper-slide v-for="data in offers">
            <CardsLocation :locationData="data" />
          </swiper-slide>
        </ContainerSlider>
      </div>
      <div class="flex justify-between items-center gap-8">
        <ButtonSquare name="Continue" @click="stepNo = 8" />
      </div>
    </section>

    <section
      v-if="stepNo == 8"
      class="max-w-xl border border-lightGrey rounded-xl p-8"
    >
      <CommonDotPaginator :stepNo="stepNo" />
      <div class="flex justify-center flex-col items-start gap-y-10 pt-8">
        <div class="spa8e-y-1 text-start">
          <p class="text-2xl font-semibold text-mediumBlack">
            What’s in this event, what is the special things?
          </p>
          <p class="text-base text-darkGrey">
            We'll find the perfect match for you.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-2 gap-x-3 py-8">
        <div class="col-span-4">
          <FormTextArea
            v-model="form.short_description"
            :title="''"
            :label="'email'"
            :type="'text'"
            :oldValue="'Aliaayasha@gmail.com'"
            :required="false"
            :placeholder="'Short description'"
          />
        </div>
      </div>

      <div class="pt-8 flex justify-between items-center gap-8">
        <ButtonSquare name="Continue" @click="stepNo = 9" />
      </div>
    </section> -->
    </LoaderUniversal>
  </div>
</template>
