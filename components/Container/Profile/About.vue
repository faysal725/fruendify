<script setup>
import { useProfileStore } from "~~/stores/profileStore";
import { useCrud } from "~~/composables/base";

const props = defineProps({
  pageType: {
    type: String,
    default: "",
  },
  publicData: {
    type: String,
    default: "",
  },
});

const profileUpdateApi = api() + "/api/auth/update/profile";

const crud = useCrud();

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const form = ref({
  about: "",
});
const seeMoreAbout = ref(false);

const editSection = ref("");
const aboutData = ref();

const editController = (sectionName) => {
  if (editSection.value == sectionName) {
    editSection.value = "";
  } else {
    editSection.value = sectionName;
  }
};
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const updateAbout = async () => {
  setLoaderState("pending");
  setShouldReload(false);
  let data = {
    description: form.value.about,
  };
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

function processAbout() {
  if (props.publicData) {
    aboutData.value = props.publicData;
    // else {
    //   aboutData.value = props.publicData.substring(0, 100);
    // }
  } else {
    if (profileStore.profileData) {
      aboutData.value = profileStore.profileData.description;
    }
    // else if (profileStore.profileData && !seeMoreAbout.value) {
    //   aboutData.value = profileStore.profileData.description.substring(0, 100);
    // }
    else {
      aboutData.value = "";
    }
  }
}

onMounted(() => {
  if (profileStore.profileData && profileStore.profileData.description) {
    processAbout();
  }
});

setTimeout(() => {
  // processAbout();
}, 1000);

watch(
  () => profileStore.profileData,
  () => {
    processAbout();
  }
);

watch(seeMoreAbout, () => {
  processAbout();
});
</script>

<template>
  <SkeletonAbout>
  <main class="space-y-3">
    <div class="flex items-center gap-3">
      <p class="text-xl font-semibold dark:text-white">About</p>
      <img
        v-if="pageType == 'edit'"
        @click="editController('about')"
        src="~~/assets/images/event/edit2.svg"
        alt=""
        class="h-4 w- cursor-pointer"
      />
    </div>

    <div v-if="editSection == 'about'" class="space-y-3">
      <FormTextArea
        v-model="form.about"
        :title="''"
        :label="'short_description'"
        :rows="2"
        :type="'text'"
        :oldValue="profileStore.profileData.description"
        :required="false"
        :placeholder="''"
      />
      <div class="flex justify-end">
        <ButtonLogin
          name="Edit About"
          classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
          @click="updateAbout()"
        />
      </div>
    </div>

    <p v-else class="text-darkGrey dark:text-slate-300 text-base">
      
      <div v-if="!aboutData" class="flex justify-center">
        <span class="text-red-500 text-center w-full text-xs">
        No About to show
      </span>
      </div>

      <span v-show="seeMoreAbout">
        {{ aboutData }}
      </span>
      <span v-show="!seeMoreAbout">
        {{ aboutData ? aboutData.substring(0, 100) : "" }}
      </span>
      <br />
      <!-- v-if="aboutData.length > 50" -->
      <span
        v-if="aboutData && aboutData.length > 50"
        @click="seeMoreAbout = !seeMoreAbout"
        class="text-base font-medium text-secondary hover:underline cursor-pointer block pt-2 w-fit"
      >
        {{ seeMoreAbout ? "Show Less" : "Show More" }}
      </span>
    </p>
  </main>
</SkeletonAbout>
</template>
