<script setup>
import { useCrud } from "~~/composables/base";
import { useProfileStore } from "~~/stores/profileStore";

const props = defineProps({
  pageType: {
    type: String,
    default: "",
  },
});

const profileUpdateApi = api() + "/api/auth/update/profile";
const religionApi = api() + "/api/public/religion";
const languageApi = api() + "/api/public/language";
const educationApi = api() + "/api/public/education";
const dietApi = api() + "/api/public/diet";

const crud = useCrud();

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const form = ref({
  age: "",
  gender: "",
});

let interestOption = ref();
let religionOption = ref();
let dietOption = ref([]);
let educationOption = ref();
let languageOption = ref();
let meetingOption = ref([
  { _id: "Men", title: "Men" },
  { _id: "Women", title: "Women" },
  { _id: "Others", title: "Others" },
]);

const editSection = ref("");
const editController = (sectionName) => {
  if (props.pageType !== "edit") return;
  if (editSection.value == sectionName) {
    editSection.value = "";
  } else {
    editSection.value = sectionName;
  }
};

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const updateAbout = async (field) => {
  setLoaderState("pending");
  setShouldReload(false);
  console.log(field, form.value);
  let data = {};
  data[field] = form.value[field];
  console.log(data);
  await crud
    .store({
      body: data,
      path: profileUpdateApi,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 422) {
        setLoaderState("failed");
        showToast("Update Failed", "error", 5000);
      }
      if (res.status == 200) {
        setLoaderState("resolved");
        setShouldReload(true);
        editController("");
        showToast("Update successful");
      }
    });
};

function propertyChanger(data) {
  let obj = [];
  data.map((dt) => {
    obj.push({ key: dt._id, value: dt.title });
  });
  return obj;
}

function findingValue(option, id) {
  let val;
  option.map((dt) => {
    console.log(dt);
    if (dt._id == id) {
      // console.log(dt._id, id)
      val = dt.title;
    }
  });
  return val;
}

// get option data
const getReligionOption = async () => {
  await crud.index({ path: religionApi }).then((res) => {
    if (res.status == 200) {
      religionOption.value = res.res.data;
    } else {
    }
  });
};

const getEducationOption = async () => {
  await crud.index({ path: educationApi }).then((res) => {
    if (res.status == 200) {
      educationOption.value = res.res.data;
    } else {
    }
  });
};

const getLanguageOption = async () => {
  await crud.index({ path: languageApi }).then((res) => {
    if (res.status == 200) {
      languageOption.value = res.res.data;
    } else {
    }
  });
};

const getDietOption = async () => {
  await crud.index({ path: dietApi }).then((res) => {
    if (res.status == 200) {
      dietOption.value = res.res.data;
    } else {
    }
  });
};

onMounted(async () => {
  getReligionOption();
  getEducationOption();
  getLanguageOption();
  getDietOption();
});

watch(
  () => form.value,
  () => {
    console.log(form.value);
  }
);
</script>

<template>
  <section class="w-full">
    <div class="flex gap-2 items-center justify-between h-fit pb-3">
      <p class="text-base font-semibold pb-3 dark:text-white">About Me</p>
      <!-- <img
        v-if="pageType == 'edit'"
        src="~~/assets/images/event/edit2.svg"
        alt=""
        class="h-4 w-4 cursor-pointer"
      /> -->
    </div>

    <div class="flex flex-col divide-y">
      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/ageRange.png" alt="" />
        <p
          class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
        >
          Date of Birth
        </p>

        <p
          v-if="editSection !== 'age'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData && profileStore.profileData.birth_date
                ? profileStore.profileData.birth_date.substring(0, 10)
                : ""
            }}
          </SkeletonSpinner>
        </p>
        <div
          class="ml-auto flex items-center gap-3"
          v-if="editSection == 'age'"
        >
          <input
            v-model="form.age"
            class="text-xs md:text-sm text-stone-600 dark:text-slate-600 font-semibold w-28"
            type="number"
          />
          <button
            @click="editController('age')"
            class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
          >
            Edit
          </button>
        </div>
      </div>
      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/genders.png" alt="" />
        <div @click="editController('gender')" class="flex items-center gap-3">
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Gender
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'gender'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData
                ? profileStore.profileData.gender
                : "none"
            }}
          </SkeletonSpinner>
        </p>
        <div
          v-if="editSection == 'gender'"
          class="ml-auto flex flex-col items-end gap-1"
        >
          <FormDropdown
            v-model="form.gender"
            title=""
            :options="[
              { key: 'Male', value: 'Male' },
              { key: 'Female', value: 'Female' },
              { key: 'Non-binary', value: 'Non-binary' },
              { key: 'Others', value: 'Others' },
            ]"
          />

          <div class="space-x-3">
            <button
              @click="
                () => {
                  editController('gender');
                  updateAbout('gender');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>
            <button
              @click="
                () => {
                  editController('');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/pray.png" alt="" />

        <div
          @click="editController('religion')"
          class="flex items-center gap-3"
        >
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Religion
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'religion'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData && religionOption
                ? profileStore.profileData.religion?.title
                : "none"
            }}
          </SkeletonSpinner>
        </p>

        <div
          v-if="editSection == 'religion'"
          class="ml-auto flex flex-col items-end gap-1"
        >
          <FormDropdown
            :classes="'capitalize text-sm text-gray-600 outline-none text-end max-w-32 rounded-lg'"
            v-model="form.religion"
            title=""
            :options="propertyChanger(religionOption)"
          />

          <div class="space-x-3">
            <button
              @click="
                () => {
                  editController('religion');
                  updateAbout('religion');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>
            <button
              @click="
                () => {
                  editController('');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/education.png" alt="" />

        <div
          @click="editController('education')"
          class="flex items-center gap-3"
        >
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Education
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'education'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData &&
              profileStore.profileData.education.length
                ? profileStore.profileData.education[0].title
                : "none"
            }}
          </SkeletonSpinner>
          <!-- Masters -->
        </p>

        <div
          v-if="editSection == 'education'"
          class="ml-auto flex items-end flex-col gap-1"
        >
          <FormDropdown
            v-model="form.education"
            title=""
            :options="propertyChanger(educationOption)"
          />

          <div class="space-x-2">
            <button
              @click="
                () => {
                  editController('education');
                  updateAbout('education');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>

            <button
              @click="
                () => {
                  editController('');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/relation.png" alt="" />

        <div @click="editController('status')" class="flex items-center gap-3">
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Status
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'status'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto capitalize"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData
                ? profileStore.profileData.maritial_status
                : "none"
            }}
          </SkeletonSpinner>
        </p>

        <div
          v-if="editSection == 'status'"
          class="ml-auto flex items-end flex-col gap-3"
        >
          <FormDropdown
            v-model="form.maritial_status"
            title=""
            :options="[
              { key: 'married', value: 'married' },
              { key: 'single', value: 'single' },
            ]"
            :oldValue="profileStore.profileData.maritial_status"
          />
          <div class="space-x-2">
            <button
              @click="
                () => {
                  editController('status');
                  updateAbout('maritial_status');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>

            <button
              @click="
                () => {
                  editController('');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="w-full">
    <div class="flex gap-2 items-center justify-between h-fit pb-3">
      <p class="text-base font-semibold dark:text-white">More About Me</p>
    </div>
    <div class="flex flex-col divide-y">
      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/smoke.png" alt="" />

        <div @click="editController('smoking')" class="flex items-center gap-3">
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Smoking
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'smoking'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData && profileStore.profileData.smoke
                ? "Yes"
                : "No"
            }}
          </SkeletonSpinner>
        </p>

        <div
          v-if="editSection == 'smoking'"
          class="ml-auto flex items-end flex-col gap-1"
        >
          <FormDropdown
            v-model="form.smoke"
            title=""
            :options="[
              { key: true, value: 'yes' },
              { key: false, value: 'no' },
            ]"
            :oldValue="profileStore.profileData.smoke"
          />
          <div class="space-x-2">
            <button
              @click="
                () => {
                  editController('smoking');
                  updateAbout('smoke');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-2"
            >
              Edit
            </button>
            <button
              @click="
                () => {
                  editController('smoking');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/drink.png" alt="" />

        <div
          @click="editController('drinking')"
          class="flex items-center gap-3"
        >
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Drinking
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'drinking'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData && profileStore.profileData.drinks
                ? "yes"
                : "no"
            }}
          </SkeletonSpinner>
        </p>

        <div
          v-if="editSection == 'drinking'"
          class="ml-auto flex items-end flex-col gap-1"
        >
          <FormDropdown
            v-model="form.drinks"
            title=""
            :options="[
              { key: true, value: 'yes' },
              { key: false, value: 'no' },
            ]"
            :oldValue="profileStore.profileData.drinks"
          />
          <div class="space-x-3">
            <button
              @click="
                () => {
                  updateAbout('drinks');
                  editController('drinking');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>
            <button
              @click="
                () => {
                  editController('drinking');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/healthy-food.png" alt="" />
        <p
          @click="editController('diet')"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold cursor-pointer"
        >
          Diet
        </p>

        <p
          v-if="editSection !== 'diet'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData && dietOption
                ? findingValue(dietOption, profileStore.profileData.diet[0])
                : "none"
            }}
          </SkeletonSpinner>
        </p>

        <div
          v-if="editSection == 'diet'"
          class="ml-auto flex items-end flex-col gap-1"
        >
          <FormDropdown
            v-model="form.diet"
            title=""
            :options="propertyChanger(dietOption)"
          />
          <div class="space-x-3">
            <button
              @click="
                () => {
                  editController('diet');
                  updateAbout('diet');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>
            <button
              @click="
                () => {
                  editController('');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div> -->

      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/sport.png" alt="" />

        <div @click="editController('sport')" class="flex items-center gap-3">
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Sport
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'sport'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData && profileStore.profileData.sport
                ? "Active"
                : "Inactive"
            }}
          </SkeletonSpinner>
        </p>

        <div
          v-if="editSection == 'sport'"
          class="ml-auto flex items-end flex-col gap-1"
        >
          <FormDropdown
            v-model="form.sport"
            title=""
            :options="[
              { key: true, value: 'active' },
              { key: false, value: 'inactive' },
            ]"
            :oldValue="profileStore.profileData.sport"
          />
          <div class="space-x-3">
            <button
              @click="
                () => {
                  updateAbout('sport');
                  editController('sport');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>
            <button
              @click="
                () => {
                  editController('');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 py-1.5">
        <img src="~~/assets/images/profile/height.png" alt="" />

        <div @click="editController('height')" class="flex items-center gap-3">
          <p
            class="text-xs md:text-sm text-stone-600 font-semibold dark:text-slate-300"
          >
            Height
          </p>

          <img
            v-if="pageType == 'edit'"
            src="~~/assets/images/event/edit2.svg"
            alt=""
            class="h-4 w-4 cursor-pointer"
          />
        </div>

        <p
          v-if="editSection !== 'height'"
          class="text-xs md:text-sm text-stone-600 dark:text-slate-300 font-semibold ml-auto"
        >
          <SkeletonSpinner :loaderState="profileStore.loaderState">
            {{
              profileStore.profileData
                ? profileStore.profileData.height
                : "none"
            }}
            feet
          </SkeletonSpinner>
        </p>
        <div
          class="ml-auto flex items-center flex-col gap-3"
          v-if="editSection == 'height'"
        >
          <input
            v-model="form.height"
            class="text-xs md:text-sm text-stone-600 dark:text-slate-600 font-semibold ml-auto w-20 pl-2 rounded-md"
            type="number"
          />

          <div class="flex gap-2">
            <button
              @click="
                () => {
                  updateAbout('height');
                  editController('height');
                }
              "
              class="text-xs rounded-sm text-white bg-secondary p-1 px-4"
            >
              Edit
            </button>
            <button
              @click="
                () => {
                  editController('');
                }
              "
              class="text-xs rounded-sm text-white bg-primary p-1 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="w-full">
    <div class="flex gap-2 items-center justify-between h-fit pb-3">
      <!-- <p
        class="text-base dark:text-white font-semibold pb-3 cursor-pointer"
        @click="editController('language')"
      >
        Language
      </p> -->

      <div @click="editController('language')" class="flex items-center gap-3">
        <p class="text-base dark:text-white font-semibold cursor-pointer">
          Language
        </p>

        <img
          v-if="pageType == 'edit'"
          src="~~/assets/images/event/edit2.svg"
          alt=""
          class="h-4 w-4 cursor-pointer"
        />
      </div>

      <div class="flex items-center gap-3">
        <button
          v-if="editSection == 'language'"
          @click="
            () => {
              editController('');
              updateAbout('languages');
            }
          "
          class="text-xs rounded-md text-white bg-secondary transition-all duration-150 p-1 px-3"
        >
          Edit
        </button>
        <button
          v-if="editSection == 'language'"
          @click="editController('')"
          class="text-xs rounded-md text-white bg-primary transition-all duration-150 p-1 px-3 capitalize"
        >
          cancel
        </button>
        <!-- <img
          v-if="pageType == 'edit'"
          src="~~/assets/images/event/edit2.svg"
          alt=""
          class="h-4 w-4"
        /> -->
      </div>
    </div>

    <p
      v-if="editSection !== 'language'"
      @click="editController('language')"
      class="text-sm text-stone-600 dark:text-slate-300 font-semibold space-x-2"
      cursor-pointer
    >
      <SkeletonSpinner :loaderState="profileStore.loaderState">
        <span
          v-if="profileStore.profileData && languageOption"
          v-for="(language, index) in profileStore.profileData.languages"
          >{{ language.title }}
          <!-- {{ index }} -->
          <span v-if="index + 1 < profileStore.profileData.languages.length"
            >,</span
          >
        </span>
      </SkeletonSpinner>
      <!-- <div v-else>
        <p class="text-xs text-red-500">No Data to show</p>
      </div> -->
    </p>

    <div v-if="editSection == 'language'" class="flex gap-2 items-end">
      <FormSelector4
        v-model="form.languages"
        :title="''"
        :options="languageOption"
        :oldValue="
          profileStore.profileData ? profileStore.profileData.languages : []
        "
      />
    </div>
  </section>

  <section class="w-full">
    <div class="flex gap-2 items-center justify-between h-fit pb-3">
      <div
        @click="editController('interestIn')"
        class="flex items-center gap-3"
      >
        <p class="text-base dark:text-white font-semibold cursor-pointer">
          Want to meet
        </p>

        <img
          v-if="pageType == 'edit'"
          src="~~/assets/images/event/edit2.svg"
          alt=""
          class="h-4 w-4 cursor-pointer"
        />
      </div>

      <div class="flex items-center gap-3">
        <button
          v-if="editSection == 'interestIn'"
          @click="
            () => {
              editController('');
              updateAbout('want_to_meet');
            }
          "
          class="text-xs rounded-md text-white bg-secondary transition-all duration-150 p-1 px-3"
        >
          Edit
        </button>
        <button
          v-if="editSection == 'interestIn'"
          @click="editController('')"
          class="text-xs rounded-md text-white bg-primary transition-all duration-150 p-1 px-3 capitalize"
        >
          cancel
        </button>
        <!-- <img
          v-if="pageType == 'edit'"
          src="~~/assets/images/event/edit2.svg"
          alt=""
          class="h-4 w-4"
        /> -->
      </div>
    </div>

    <p
      v-if="editSection !== 'interestIn'"
      @click="editController('interestIn')"
      class="text-sm text-stone-600 dark:text-slate-300 font-semibold"
      cursor-pointer
    >
      <SkeletonSpinner :loaderState="profileStore.loaderState">
        <span
          v-if="profileStore.profileData"
          v-for="(data, index) in profileStore.profileData.want_to_meet"
          >{{ data }}

          <span v-if="index + 1 < profileStore.profileData.want_to_meet.length"
            >,
          </span>
        </span>
      </SkeletonSpinner>
    </p>

    <div v-if="editSection == 'interestIn'" class="flex gap-2 items-end">
      <FormSelector4
        v-model="form.want_to_meet"
        v-if="editSection == 'interestIn'"
        :title="''"
        :options="meetingOption"
        :oldValue="
          profileStore.profileData ? profileStore.profileData.want_to_meet : []
        "
      />
    </div>
  </section>
</template>
