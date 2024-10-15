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
import { useDateFormat, useNow } from "@vueuse/core";
import { toast } from "vue3-toastify";
import { useCrud } from "~~/composables/base";
import useForm from "~~/composables/formdata";
import { useEventDetailsStore } from "~~/stores/eventDetailsStore";
import { useImageStore } from "~~/stores/imageStore";
import { useTimerStore } from "~~/stores/timerStore";

definePageMeta({
  middleware: ["auth", "profilecompletion"],
});

const route = useRoute();
const router = useRouter();
const id = route.params.id;

// apis
const detailsApi = api() + "/api/event/details/" + id;
const updateApi = api() + "/api/event/update";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let dietOptionApi = api() + "/api/public/diet";
let languageOptionApi = api() + "/api/public/language";
let educationOptionApi = api() + "/api/public/education";
let categoryOptionApi = api() + "/api/public/categories";

const crud = useCrud();
const formdata = useForm();

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

const timerStore = useTimerStore();
const { setTimerState } = useTimerStore();

const currentTime = useDateFormat(useNow(), "HH:mm:ss");

const eventList = ref([
  { id: 0, name: "Cycling", imgSrc: "/cycling.png" },
  { id: 1, name: "Boating", imgSrc: "/boating.png" },
  { id: 2, name: "dance", imgSrc: "/dance.png" },
  { id: 3, name: "drinking", imgSrc: "/drinking.png" },
]);

const expandComponent = ref(false);
const joinEvent = ref(false);
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
  city: "",
  country: "",
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
const categoryOption = ref();
let interestsOption = ref();

let dietOption = ref();

let languageOption = ref();

let educationOption = ref();

// const timeSlots = ref([
//   {
//     _id: 24,
//     name: "24 Hours",
//     slug: "24 Hours",
//   },
//   {
//     _id: 10,
//     name: "10 Hours",
//     slug: "10 Hours",
//   },
// ]);

const eventRequirements = [
  { title: "Want to meet", value: "Men, Women" },
  { title: "Age Group", value: "24-32" },
  { title: "Preferred Language", value: "French, Germany, English" },
];

const joiners = [
  "/profileImg/1.png",
  "/profileImg/2.png",
  "/profileImg/3.png",
  "/profileImg/4.png",
  "/profileImg/4.png",
];

const modalShouldOpen = ref(false);
const showMap = ref(false);
const editSection = ref();

const category = ref([
  {
    id: 1,
    name: "Coffee",
    slug: "Coffee",
  },
  {
    id: 2,
    name: "Dating",
    slug: "Dating",
  },
]);

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

function openModal() {
  // layout.value.layoutRef.modalOpener();
  modalShouldOpen.value = true;
}

function closeModal() {
  // layout.value.layoutRef.modalCloser();
  modalShouldOpen.value = false;
}

// toast
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

// image handler
const clickOnInput = () => {
  const inputElement = document.getElementById("avatar");
  inputElement.click();
};

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

const getCategoryOption = async () => {
  await crud.get({ path: categoryOptionApi }).then((res) => {
    if (res.res.data) {
      categoryOption.value = res.res.data;
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

const toggleMap = (data) => {
  // body.value.status = data ? 1 : 0;

  showMap.value = data;
};

// initial data getting
const getInitialData = async () => {
  await setTimerState(false);
  setLoaderState("pending");
  await crud.index({ path: detailsApi }).then((res) => {
    console.log(res, "initial value");
    if (res.status == 200) {
      setCurrentEventDetails(id, res.res.data);

      setLoaderState("resolve");
      setShouldReload(false);
      settingStoredataToForm();
      setTimeout(() => {
        setTimerState(true);
      }, 1000);
    } else {
      router.push("/404");
    }
  });
};

// const updateData = async (sectionName) => {
//   setShouldReload(false);
//   form.value["eventUid"] = id;
//   let data = await formdata.submit(form.value, true);
//   console.log(form.value);
//   await crud
//     .store({
//       body: data,
//       path: updateApi,
//     })
//     .then((res) => {
//       if (res.status == 200) {
//         showToast("Edit is successful");
//         setShouldReload(true);
//       } else {
//         showToast("Edit was not successful");
//       }
//       editSection.value = "";
//     });
// };

// convert to formdata

// data format changed
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
  formData.append("eventUid", id);
  formData.append("thumbnail", form.value.thumbnail);
  formData.append("start_time", form.value.start_time);

  return formData;
}

const updateData = async () => {
  setLoaderState("pending");
  setShouldReload(false);
  form.value["eventUid"] = id;
  let data = await convertToFormData();
  // let data = await formdata.submit(form.value, true);
  console.log(form.value);
  await crud
    .store({
      body: data,
      path: updateApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Edit is successful");
        removeImages(0);
        setShouldReload(true);
      } else {
        showToast("Edit was not successful");

        setLoaderState("resolve");
      }
      editSection.value = "";
    });
};

// image updating
const submitNewImage = async () => {
  console.log(imgData.value.image);
  // const formData = new FormData();

  // formData.append("thumbnail", imgData.value);

  // setLoaderState("pending");
  // setShouldReload(false);

  // await crud
  //   .store({
  //     body: data,
  //     path: updateApi,
  //   })
  //   .then((res) => {
  //     if (res.status == 422) {
  //       setLoaderState("failed");
  //       showToast("Update Failed", "error", 5000);
  //     }
  //     if (res.status == 200) {
  //       setLoaderState("resolved");
  //       setShouldReload(true);
  //       showToast("Update successful");
  //       clearImages();
  //     }
  //   });
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

  // form.value.notice_hour_slot =
  //   eventDetailsStore.currentDetails.notice_hour_slot;
  form.value.notice_hour_slot = "something";

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
      toast("Please Select address properly");
    } else if (
      locationData.value.lat === "" ||
      typeof locationData.value.lat === "undefined"
    ) {
      toast("Couldnot collect the coordinates properly");
    } else if (
      locationData.value.road === "" ||
      typeof locationData.value.road === "undefined"
    ) {
      toast("Couldnot collect the road info");
    } else if (
      locationData.value.city === "" ||
      typeof locationData.value.city === "undefined"
    ) {
      toast("Couldnot collect the city info");
    } else if (
      locationData.value.country === "" ||
      typeof locationData.value.country === "undefined"
    ) {
      toast("Couldnot collect the country info");
    } else if (
      locationData.value.neighbourhood === "" ||
      typeof locationData.value.neighbourhood === "undefined"
    ) {
      toast("Couldnot collect the neighbourhood info");
    }
  }
};

onMounted(() => {
  getInitialData();
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
  () => expandComponent.value,
  () => {
    emit("sendData", expandComponent.value);
  }
);

watch(
  () => eventDetailsStore.shouldReload,
  () => {
    if (eventDetailsStore.shouldReload) {
      getInitialData();
    }
  }
);

watch(
  () => imageStore.profileImageUrl,
  () => {
    if (imageStore.profileImageUrl.length > 0) {
      disableImageUploader.value = true;
    }
  }
);

watch(
  () => form.value,
  () => {
    console.log(form.value);
  }
);

// watch(
//   () => locationData.value.lat,
//   () => {
//     console.log(locationData.value, form.value.latitude, "value changed");
//     if (locationData.value.lat !== form.value.latitude) {
//       locationEditEnable.value = true;
//     } else {
//       locationEditEnable.value = false;
//     }
//   }
// );
</script>

<template>
  <NuxtLayout name="verified" classes="max-h-screen overflow-hidden">
    <div class="grid grid-cols-12 relative">
      <div
        class="col-span-12 col-span-3 min-h-screen cursor-default px-4 bg-whitePrimary dark:bg-blackPrimary z-20"
      >
        <div
          class="h-[80vh] lg:h-[90vh] overflow-y-scroll scrollbar-hide space-y-5"
        >
          <div class="space-y-3">
            <NuxtLink to="/events">
              <ButtonWithIcon
                name="Back to Events"
                classes="w-fit bg-black text-white flex p-2 px-4 flex-row-reverse items-center gap-3 rounded-full text-sm mt-5"
              >
                <ArrowLeftIcon class="h-5 w-5 text-white" />
              </ButtonWithIcon>
            </NuxtLink>

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
                class="h-40 bg-no-repeat bg-cover bg-bottom rounded-md relative z-0 overflow-hidden flex justify-end items-end"
              >
                <img
                  :src="
                    networkImage(eventDetailsStore.currentDetails.thumbnail)
                  "
                  alt=""
                  class="h-full w-full object-cover -z-10"
                />
                <div
                  class="bg-gradient-to-t from-primary to-secondary w-fit p-1 rounded-full absolute bottom-2 right-2"
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
                <div
                  v-for="(data, index) in imageStore.profileImageUrl"
                  class=""
                >
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
              v-model="form.attendance"
              title="Attendance"
              :options="[
                { key: 1, value: '1-1' },
                { key: 10, value: '2-10' },
                { key: 50, value: '10-50' },
                { key: 100, value: '50-100' },
              ]"
              :oldValue="50"
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
                  name="Edit Drinking"
                  classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
                  @click="updateData()"
                />
              </div>
            </section>

            <div class="block md:hidden">
              <img src="~~/assets/images/event/map.png" alt="" />
            </div>
          </section>
        </div>
      </div>

      <div
        class="col-span-12 col-span-9 max-h-screen lg:-mt-4 bg-whiteSecondary dark:bg-blackSecondary z-20 px-8"
      >
        <div class="pb-5">
          <ContainerUniversalSearch classes="bg-transparent" />
        </div>

        <div v-if="showMap" class="lg:min-h-96 min-h-[50vh]">
          <div>
            <img
              src="~~/assets/images/event/map.png"
              alt=""
              class="w-full h-full rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div v-else class="lg:max-w-xl xl:lg:max-w-2xl mx-auto gap-14">
          <div
            class="col-span-5 space-y-2 hidden md:block bg-whitePrimary dark:bg-blackPrimary p-3 rounded-xl"
          >
            <div class="space-y-6 relative cursor-default">
              <SkeletonEventImg :loaderState="eventDetailsStore.loaderState">
                <ContainerEventImg2
                  v-if="eventDetailsStore.loaderState == 'resolve'"
                  :pageType="'edit'"
                  :enableExpandBtn="false"
                />
              </SkeletonEventImg>

              <div class="flex justify-between items-center">
                <ContainerGroupProfile
                  :profiles="
                    eventDetailsStore.currentDetails
                      ? eventDetailsStore.currentDetails.participants
                      : []
                  "
                />

                <div class="flex items-center gap-4">
                  <button
                    class="h-fit px-4 py-2 text-white rounded-lg bg-black"
                  >
                    Remove People
                  </button>
                </div>
              </div>
            </div>

            <div class="sticky top-0 z-20 cursor-default">
              <div class="relative hidden md:block overflow-hidden gap-4">
                <div class="flex justify-end pb-2">
                  <ButtonLogin
                    v-if="locationEditEnable"
                    name="Edit Location"
                    classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
                    @click="filterLocation()"
                  />
                </div>

                <FormMap
                  @set-location="
                    (locationObj) => {
                      console.log('map runn', locationObj);

                      locationData.address = locationObj.name;
                      locationData.country = locationObj.country;
                      locationData.city = locationObj.city;
                      locationData.lat = locationObj.latitude;
                      locationData.long = locationObj.longitude;
                      locationData.road = locationObj.road;
                      locationData.neighbourhood = locationObj.neighbourhood;

                      if (locationData.lat !== form.lat) {
                        locationEditEnable = true;
                      } else {
                        locationEditEnable = false;
                      }
                    }
                  "
                  :id="'map-container-4'"
                  classes="w-full h-80 z-0"
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
            </div>
          </div>
        </div>
      </div>

      <div
        class="fixed top-0 right-0 w-full h-[1000vh] bg-whiteSecondary dark:bg-blackSecondary z-10"
      ></div>
    </div>
  </NuxtLayout>
</template>
