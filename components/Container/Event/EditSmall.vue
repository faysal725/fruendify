<script setup>
import {
  ArrowLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  XCircleIcon,
  XMarkIcon,
  MinusCircleIcon,
} from "@heroicons/vue/24/solid";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";
import { useImageStore } from "~~/stores/imageStore";

// apis
const detailsApi = api() + "/api/event/details/";
const updateApi = api() + "/api/event/update";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let dietOptionApi = api() + "/api/public/diet";
let languageOptionApi = api() + "/api/public/language";
let educationOptionApi = api() + "/api/public/education";
let categoryOptionApi = api() + "/api/public/categories";

const crud = useCrud();

const eventDetailsStore = useEventDetailsStore();
const {
  getCurrentEventDetails,
  setCurrentEventDetails,
  setLoaderState,
  setShouldReload,
} = useEventDetailsStore();

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages, removeImages, clearImages } =
  imageStore;

const disableImageUploader = ref(false);
// form data
const form = ref({
  title: "",
  short_description: "",
  event_date: "",
  number_of_people: "",
  start_time: "",
  notice_hour: "",
  notice_hour_slot: "",
  user_uid: "",
  interests: "",
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
  thumbnail: null,
});

// image data
const imgData = ref({
  image: null,
});

const locationData = ref({
  address: "",
  city: "",
  country: "",
  lat: "",
  long: "",
  road: "",
  neighbourhood: "",
});
const locationEditEnable = ref(false);

// options
const optionLoaded = ref(false);
const categoryOption = ref();
let interestsOption = ref();

let dietOption = ref();

let languageOption = ref();

let educationOption = ref();

const editSection = ref();
const locations = ref([
  {
    id: 1,
    name: "Munich, Germany",
    slug: "Munich, Germany",
  },
  {
    id: 2,
    name: "Dating",
    slug: "Dating",
  },
]);

const timeSlots = ref([
  {
    _id: "DAY",
    name: "Day",
    slug: "Day",
  },
  {
    _id: "HOUR",
    name: "Hour",
    slug: "Hour",
  },
]);

// functions

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const getCategoryOption = async () => {
  optionLoaded.value = false;
  await crud.get({ path: categoryOptionApi }).then((res) => {
    if (res.res.data) {
      categoryOption.value = res.res.data;
    }
  });
};

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
      optionLoaded.value = true;
    }
  });
};

const editController = (sectionName) => {
  if (editSection.value == sectionName) {
    editSection.value = "";
  } else {
    editSection.value = sectionName;
  }
};

// initial data getting
const getInitialData = async () => {
  setLoaderState("pending");
  await crud
    .index({ path: detailsApi + eventDetailsStore.currentId })
    .then(async (res) => {
      console.log(res, "initial value");
      if (res.status == 200) {
        await setCurrentEventDetails(eventDetailsStore.currentId, res.res.data);

        await setLoaderState("resolve");
        // setShouldReload(false);
        await settingStoredataToForm();
      }
    });
};

// getting data from store
function settingStoredataToForm() {
  form.value.title = eventDetailsStore.currentDetails.title;
  form.value.short_description =
    eventDetailsStore.currentDetails.short_description;
  form.value.event_date = eventDetailsStore.currentDetails.event_date;
  form.value.number_of_people =
    eventDetailsStore.currentDetails.number_of_people;
  form.value.start_time = eventDetailsStore.currentDetails.start_time;
  form.value.notice_hour = formatDate(
    eventDetailsStore.currentDetails.notice_hour
  );
  form.value.notice_hour_slot = "something";
  // form.value.notice_hour_slot =
  //   eventDetailsStore.currentDetails.notice_hour_slot;

  form.value.interests = [];
  eventDetailsStore.currentDetails.interests.map((dt) =>
    form.value.interests.push(dt._id)
  );
  form.value.address = eventDetailsStore.currentDetails.address;
  form.value.road = eventDetailsStore.currentDetails.road;
  form.value.lat = eventDetailsStore.currentDetails.location.coordinates[0];
  form.value.long = eventDetailsStore.currentDetails.location.coordinates[1];
  form.value.gender = eventDetailsStore.currentDetails.gender;
  form.value.start_age = eventDetailsStore.currentDetails.start_age;
  form.value.end_age = eventDetailsStore.currentDetails.end_age;
  form.value.diet = [];
  eventDetailsStore.currentDetails.diet.map((dt) =>
    form.value.diet.push(dt._id)
  );
  form.value.language = [];
  eventDetailsStore.currentDetails.language.map((dt) =>
    form.value.language.push(dt._id)
  );
  form.value.carrier = eventDetailsStore.currentDetails.carrier[0]["_id"];
  form.value.category = [];
  eventDetailsStore.currentDetails.category.map((dt) =>
    form.value.category.push(dt._id)
  );
  form.value.city = eventDetailsStore.currentDetails.city;
  form.value.neighbourhood = eventDetailsStore.currentDetails.neighbourhood;
  form.value.country = eventDetailsStore.currentDetails.country;

  form.value.education = [];
  eventDetailsStore.currentDetails.education.map((dt) =>
    form.value.education.push(dt._id)
  );
  form.value.music = [];
  eventDetailsStore.currentDetails.music.map((dt) =>
    form.value.music.push(dt._id)
  );

  form.value.politic = [];
  eventDetailsStore.currentDetails.politic.map((dt) =>
    form.value.politic.push(dt._id)
  );
  form.value.relationship_status =
    eventDetailsStore.currentDetails.relationship_status;
  form.value.drink = eventDetailsStore.currentDetails.drink;
  form.value.is_athlete = eventDetailsStore.currentDetails.is_athlete;
  form.value.smoke = eventDetailsStore.currentDetails.smoke;
  form.value.face_blur = eventDetailsStore.currentDetails.face_blur;
  // form.value.religion = eventDetailsStore.currentDetails.religion;
  form.value.status = eventDetailsStore.currentDetails.status;
  form.value.thumbnail = eventDetailsStore.currentDetails.thumbnail;

  // form.value.hobbies = eventDetailsStore.currentDetails.hobbies;
}

// convert to formdata
async function convertToFormData() {
  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("address", locationData.value.address);
  formData.append("carrier", form.value.carrier);
  form.value.category.forEach((data, index) => {
    formData.append("category", data);
  });
  form.value.diet.forEach((data, index) => {
    formData.append("diet", data);
  });
  formData.append("drink", form.value.drink);
  form.value.education.forEach((data, index) => {
    formData.append("education", data);
  });
  formData.append("event_date", form.value.event_date);
  formData.append("face_blur", form.value.face_blur);
  formData.append("gender", form.value.gender);
  // form.value.hobbies.forEach((data, index) => {
  //   formData.append("hobbies", data);
  // });
  form.value.interests.forEach((data, index) => {
    formData.append("interests", data);
  });
  formData.append("is_athlete", form.value.is_athlete);
  form.value.language.forEach((data, index) => {
    formData.append("language", data);
  });
  formData.append("city", locationData.value.city);
  formData.append("country", locationData.value.country);
  formData.append("lat", locationData.value.lat);
  formData.append("long", locationData.value.long);
  formData.append("road", locationData.value.road);
  formData.append("neighbourhood", locationData.value.neighbourhood);
  form.value.music.forEach((data, index) => {
    formData.append("music", data);
  });
  formData.append("notice_hour", form.value.notice_hour);
  formData.append("notice_hour_slot", form.value.notice_hour_slot);
  formData.append("number_of_people", form.value.number_of_people);
  formData.append("politic", form.value.politic);
  formData.append("relationship_status", form.value.relationship_status);
  formData.append("religion", form.value.religion);
  formData.append("short_description", form.value.short_description);
  formData.append("smoke", form.value.smoke);
  formData.append("start_age", form.value.start_age);
  formData.append("end_age", form.value.end_age);
  formData.append("status", form.value.status);
  formData.append("eventUid", eventDetailsStore.currentId);
  formData.append("thumbnail", form.value.thumbnail);
  formData.append("start_time", form.value.start_time);

  return formData;
}

const updateData = async () => {
  setLoaderState("pending");
  form.value["eventUid"] = eventDetailsStore.currentId;

  let data = await convertToFormData();
  console.log(form.value, eventDetailsStore.currentId);
  await crud
    .store({
      body: data,
      path: updateApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Edit is successful");
        removeImages(0);
        getInitialData();
        setShouldReload(true);
      } else {
        showToast("Edit was not successful");

        setLoaderState("resolve");
      }
      editSection.value = "";
    });
};

function formatDate(dateString) {
  const date = new Date(dateString);

  // Convert to local time
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0"); // No need to add 1 to the day
  const year = date.getFullYear();

  // Adjust time for local timezone
  const hours = String(date.getHours()).padStart(2, "0"); // No need to add 1 to the hour
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

const filterLocation = () => {
  console.log(locationData.value);
  if (
    locationData.value.address !== "" &&
    typeof locationData.value.address !== "undefined" &&
    locationData.value.lat !== "" &&
    typeof locationData.value.lat !== "undefined" &&
    locationData.value.long !== "" &&
    typeof locationData.value.long !== "undefined" &&
    locationData.value.road !== "" &&
    typeof locationData.value.road !== "undefined" &&
    locationData.value.city !== "" &&
    typeof locationData.value.city !== "undefined" &&
    locationData.value.country !== "" &&
    typeof locationData.value.country !== "undefined" &&
    locationData.value.neighbourhood !== "" &&
    typeof locationData.value.neighbourhood !== "undefined"
  ) {
    // console.log(creds);
    updateData();
  } else {
    if (
      locationData.value.address === "" ||
      typeof locationData.value.address === "undefined"
    ) {
      // errors.value.address = "Please Select address properly";
      showToast("Please Select address properly");
    } else if (
      locationData.value.lat === "" ||
      typeof locationData.value.lat === "undefined"
    ) {
      showToast("Couldnot collect the coordinates properly");
    } else if (
      locationData.value.road === "" ||
      typeof locationData.value.road === "undefined"
    ) {
      showToast("Couldnot collect the road info");
    } else if (
      locationData.value.city === "" ||
      typeof locationData.value.city === "undefined"
    ) {
      showToast("Couldnot collect the city info");
    } else if (
      locationData.value.country === "" ||
      typeof locationData.value.country === "undefined"
    ) {
      showToast("Couldnot collect the country info");
    } else if (
      locationData.value.neighbourhood === "" ||
      typeof locationData.value.neighbourhood === "undefined"
    ) {
      showToast("Couldnot collect the neighbourhood info");
    }
  }
};

onMounted(async () => {
  await settingStoredataToForm();
});

// getting options
onMounted(() => {
  getCategoryOption();
  getInterestOption();
  getDietOption();
  getLanguageOption();
  getEducationOption();
});

watch(
  () => imageStore.profileImageUrl,
  () => {
    if (imageStore.profileImageUrl.length > 0) {
      disableImageUploader.value = true;
    }
  }
);
</script>

<template>
  <section>
    <div class="space-y-5">
      <div class="space-y-3">
        <!-- title  -->
        <SkeletonName :loaderState="eventDetailsStore.loaderState">
          <section>
            <div class="flex justify-between items-center">
              <p
                class="text-base xl:text-lg font-semibold text-mediumBlack dark:text-slate-200 capitalize"
              >
                {{
                  eventDetailsStore.currentDetails
                    ? eventDetailsStore.currentDetails.title
                    : ""
                }}
              </p>

              <img
                src="~~/assets/images/event/edit2.svg"
                alt=""
                class="h-4 w-4 cursor-pointer"
                @click="editController('title')"
              />
            </div>
            <div v-if="editSection == 'title'" class="space-y-3 py-3">
              <FormInputText2
                v-model="form.title"
                :title="''"
                :label="'full_name'"
                :type="'text'"
                :required="false"
                :placeholder="''"
                :oldValue="form.title"
              />
              <div class="flex justify-start">
                <ButtonLogin
                  name="Edit"
                  classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
                  @click="updateData('title')"
                />
              </div>
            </div>
          </section>
        </SkeletonName>

        <!-- description  -->

        <SkeletonAbout :loaderState="eventDetailsStore.loaderState">
          <section class="">
            <div class="flex justify-between items-center">
              <p
                class="text-base xl:text-lg font-semibold text-mediumBlack dark:text-slate-200"
              >
                Description
              </p>
              <img
                src="~~/assets/images/event/edit2.svg"
                alt=""
                class="h-4 w-4 cursor-pointer"
                @click="editController('description')"
              />
            </div>
            <p
              class="text-sm xl:text-base text-darkGrey dark:text-slate-400 leading-loose"
            >
              {{
                eventDetailsStore.currentDetails
                  ? eventDetailsStore.currentDetails.short_description
                  : ""
              }}
            </p>

            <div v-if="editSection == 'description'" class="space-y-3">
              <FormTextArea
                v-model="form.short_description"
                :title="''"
                :label="'short_description'"
                :rows="2"
                :type="'text'"
                :required="false"
                :placeholder="''"
              />
              <div class="flex justify-start">
                <ButtonLogin
                  name="Edit Description"
                  classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
                  @click="updateData('short_description')"
                />
              </div>
            </div>
          </section>
        </SkeletonAbout>
      </div>

      <!-- event image  -->

      <SkeletonProfileImg :loaderState="eventDetailsStore.loaderState">
        <div>
          <div
            v-if="eventDetailsStore.currentDetails?.thumbnail"
            class="h-40 bg-no-repeat bg-cover bg-bottom rounded-md relative p-4 z-0 overflow-hidden flex justify-end items-end relative z-0"
          >
            <img
              :src="networkImage(eventDetailsStore.currentDetails.thumbnail)"
              alt=""
              class="w-full h-full object-cover absolute z-10 rounded-md"
            />
            <div
              class="bg-gradient-to-t from-primary to-secondary w-fit p-1 m-2 rounded-full z-20"
            >
              <MinusIcon
                @click="
                  () => {
                    console.log('asdfsdf');
                    removeImages(0);
                    disableImageUploader = !disableImageUploader;
                  }
                "
                class="h-5 w-5 text-white"
              />
            </div>
          </div>

          <div class="pt-4">
            <div v-for="(data, index) in imageStore.profileImageUrl" class="">
              <div
                v-if="data"
                class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-36 w-full bg-no-repeat bg-cover bg-center relative"
                :style="{
                  backgroundImage: `url(${data.imgSrc})`,
                }"
              >
                <MinusCircleIcon
                  class="h-8 w-8 text-primary absolute bottom-1 right-2 z-20 cursor-pointer"
                  @click="
                    () => {
                      removeImages(index);
                      disableImageUploader = false;
                    }
                  "
                />
              </div>

              <ButtonLogin
                name="Edit Thumbnail"
                classes="min-w-16 bg-primary text-sm btn-login rounded-lg mt-3"
                @click="updateData()"
              />
            </div>
            
            <div v-if="!disableImageUploader" class="flex">
              <FormImage2 v-model="form.thumbnail" />
            </div>
          </div>
        </div>
      </SkeletonProfileImg>

      <!-- all inputs  -->
      <section
        v-if="eventDetailsStore.loaderState == 'resolve'"
        class="space-y-5"
      >
        <div>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Category
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('category')"
            />
          </div>
          <div class="space-y-1">
            <FormMultipleSelect
              v-model="form.category"
              :title="''"
              :options="categoryOption"
              :iconClasses="'text-red-700'"
              :show="'title'"
              :returnVal="'_id'"
              :oldVal="form.category"
            />
            <ButtonLogin
              v-if="editSection == 'category'"
              name="Edit Category"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData('category')"
            />
          </div>
        </div>

        <!-- <section>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Location
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('title')"
            />
          </div>

          <FormMultipleSelect
            :title="''"
            :options="locations"
            :iconClasses="'text-red-700'"
          />
        </section> -->

        <section>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Dates
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('event_date')"
            />
          </div>
          <div class="space-y-1">
            <FormDatepicker
              v-model="form.event_date"
              :isRange="false"
              :error="''"
              :oldValue="form.event_date.substring(0, 10)"
            />

            <ButtonLogin
              v-if="editSection == 'event_date'"
              name="Edit Event_date"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData('event_date')"
            />
          </div>
        </section>

        <section>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Starting Time
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('start_time')"
            />
          </div>

          <div class="space-y-1">
            <FormTimepicker
              v-model="form.start_time"
              :oldValue="form.start_time"
            />
            <ButtonLogin
              v-if="editSection == 'start_time'"
              name="Edit start_time"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData('start_time')"
            />
          </div>
        </section>

        <section>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Interested in
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('gender')"
            />
          </div>

          <div class="space-y-1">
            <FormSelector2
              v-model="form.gender"
              title=""
              :options="[
                { key: 'Female', value: 'Female' },
                { key: 'Male', value: 'Male' },
                { key: 'Non-binary', value: 'Non-binary' },
                { key: 'Others', value: 'Others' },
                { key: 'All', value: 'All' },
              ]"
              :oldValue="form.gender"
            />
            <ButtonLogin
              v-if="editSection == 'gender'"
              name="Edit gender"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData()"
            />
          </div>
        </section>

        <FormSelector3
          title="Attendance"
          :options="[
            { key: 0, value: '1-1' },
            { key: 1, value: '2-10' },
            { key: 2, value: '10-50' },
            { key: 3, value: '50-100' },
          ]"
        />

        <section>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Registration closes before
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('notice_hour')"
            />
          </div>

          <div class="space-y-1">
            <!-- <FormCombobox
              v-model="form.notice_hour"
              :title="''"
              :options="timeSlots"
              :iconClasses="'text-red-700'"
              :returnVal="'_id'"
              :oldValue="form.notice_hour"
            /> -->
            <!-- <div class="flex justify-start items-center gap-2">
              <FormInputNumber
                v-model="form.notice_hour"
                :title="''"
                :label="'title'"
                :oldValue="form.notice_hour"
                :required="false"
                :placeholder="'Event Title'"
                :error="''"
                :classes="'h-10 w-36  px-2 block bg-white text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none'"
              />
              <FormTimeCombobox
                v-model="form.notice_hour_slot"
                :title="''"
                :options="timeSlots"
                :classes="'rounded-md'"
                :iconClasses="'text-red-700'"
                :returnVal="'_id'"
                :oldValue="form.notice_hour_slot"
              />
            </div> -->

            <FormDateTimepicker
              :isRange="false"
              v-model="form.notice_hour"
              :format="'MM/dd/yyyy HH:mm'"
              :oldValue="form.notice_hour"
            />

            <ButtonLogin
              v-if="editSection == 'notice_hour'"
              name="Edit notice_hour"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData()"
            />
          </div>
        </section>

        <FormRangeSlider
          :title="'Distance'"
          :unit="'km'"
          :singleRange="50"
          :isSingle="true"
          :isRed="true"
        />

        <section>
          <div class="flex justify-end items-center">
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('Age')"
            />
          </div>

          <div class="space-y-3">
            <FormRangeSlider
              @change="
                (data) => {
                  form.start_age = data[0];
                  form.end_age = data[1];
                }
              "
              :title="'Age'"
              :unit="'Age'"
              :isRed="true"
              :valueRange="[form.start_age, form.end_age]"
            />
            <ButtonLogin
              v-if="editSection == 'Age'"
              name="Edit Age"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData()"
            />
          </div>
        </section>

        <section>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Diet
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('diet')"
            />
          </div>

          <div class="space-y-1">
            <FormMultipleSelect
              v-model="form.diet"
              :title="''"
              :options="dietOption"
              :oldVal="form.diet"
              :iconClasses="'text-red-700'"
              :show="'title'"
              :returnVal="'_id'"
            />
            <ButtonLogin
              v-if="editSection == 'diet'"
              name="Edit diet"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData()"
            />
          </div>
        </section>

        <section>
          <div class="flex justify-between items-center">
            <p
              class="text-xs font-medium pb-3 text-gray-700 dark:text-slate-200"
            >
              Drinking
            </p>
            <img
              src="~~/assets/images/event/edit2.svg"
              alt=""
              class="h-4 w-4 cursor-pointer"
              @click="editController('drink')"
            />
          </div>

          <div class="space-y-1">
            <FormCombobox
              v-model="form.drink"
              :title="''"
              :options="[
                { _id: 'Alcoholic', name: 'Alcoholic' },
                { _id: 'non acoholic', name: 'non acoholic' },
                { _id: 'Occasionally', name: 'Occasionally' },
              ]"
              :iconClasses="'text-red-700'"
              classes="rounded-lg"
              :oldValue="form.drink"
            />
            <ButtonLogin
              v-if="editSection == 'drink'"
              name="Edit drink"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateData()"
            />
          </div>

          <div class="relative overflow-hidden gap-2 pt-5">
            <div class="flex justify-start pb-2">
              <ButtonLogin
                v-if="locationEditEnable"
                name="Update Event Location"
                classes="w-full bg-primary text-sm btn-login rounded-lg"
                @click="filterLocation()"
              />
            </div>
            <FormMap
              @set-location="
                (locationObj) => {
                  locationData.address = locationObj.name;
                  locationData.country = locationObj.country;
                  locationData.city = locationObj.city;
                  locationData.lat = locationObj.latitude;
                  locationData.long = locationObj.longitude;
                  locationData.road = locationObj.road;
                  locationData.neighbourhood = locationObj.neighbourhood;
                  console.log(locationData, 'locationobj');
                  if (locationData.lat !== form.lat) {
                    locationEditEnable = true;
                  } else {
                    locationEditEnable = false;
                  }
                }
              "
              :id="'map-container-4'"
              classes="w-full h-80"
              :enableSearch="true"
              :oldValue="{
                name: form.address,
                city: form.city,
                road: form.road,
                neighbourhood: form.neighbourhood,
                country: form.country,
                latitude: form.long,
                longitude: form.lat,
              }"
            />
          </div>
        </section>
      </section>
    </div>
  </section>
</template>
