<script setup>
import { useCrud } from "~~/composables/base";
import { useProfileStore } from "~~/stores/profileStore";

const props = defineProps({
  pageType: {
    type: String,
    default: "none",
  },
});

let interestOptionApi = api() + "/api/admin/interest/public/list";
const profileUpdateApi = api() + "/api/auth/update/profile";

const crud = useCrud();
const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const eventList = ref([]);
const editSection = ref("");

const form = ref({
  interests: null,
});

const selectedInterest = computed(() => {
  let selecteds = [];
  if (profileStore.profileData.interests && eventList) {
    profileStore.profileData.interests.map((dt) => {
      // eventList.value.map((list) => {
      //   if (list._id == dt) {
      //     selecteds.push(dt._id);
      //   }
      // });
      selecteds.push(dt._id);
      // console.log(dt, eventList)
    });
  }

  return selecteds;
});

const editController = (sectionName) => {
  if (editSection.value == sectionName) {
    editSection.value = "";
  } else {
    editSection.value = sectionName;
  }
};

const getInterestOption = async () => {
  await crud.get({ path: interestOptionApi }).then((res) => {
    eventList.value = res.res.data;
  });
};
const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const updateInterests = async () => {
  setLoaderState("pending");
  setShouldReload(false);
  let data = {
    interests: [...form.value.interests],
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
        showToast("Interests Update Failed", "error", 5000);
      }
      if (res.status == 200) {
        setLoaderState("resolved");
        setShouldReload(true);
        editController("");
        showToast("Interests Update successful");
      }
    });
};

onMounted(() => {
  getInterestOption();
});

watch(
  () => form.value.interests,
  () => console.log(form.value)
);
</script>

<template>
  <section class="space-y-3">
    <div class="flex items-center gap-3">
      <p class="text-xl font-semibold dark:text-white">Interests</p>

      <img
        @click="editController('interests')"
        v-if="pageType == 'edit'"
        src="~~/assets/images/event/edit2.svg"
        alt=""
        class="h-4 w-4 cursor-pointer"
      />
    </div>

    <SkeletonInterests>
      <div
        v-if="profileStore.profileData && profileStore.profileData?.interests.length > 0"
        class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      >
        <div
          v-for="data in profileStore.profileData?.interests"
          class="flex items-center justify-center rounded-full px-4 py-1 rounded-3xl gap-3 border cursor-pointer border-primary"
        >
          <img v-if="data.image" :src="networkImage(data.image)" alt="" class="h-7 w-7" />
          <p
            class="text-center capitalize text-xs md:text-sm font-medium text-wrap dark:text-white"
          >
            {{ data.title }}
          </p>
        </div>
      </div>
      <div v-else>
        <p class="text-primary font-semibold text-sm">No Item to show</p>
      </div>

      <div class="pt-2" v-if="editSection == 'interests'">
        <FormEventSelector
          @event-selection="(data) => (form.interests = [...data])"
          :options="eventList"
          :classes="'grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'"
          :disable="editSection == 'interests' ? false : true"
          :oldValue="
            profileStore.profileData && profileStore.profileData.interests
              ? selectedInterest
              : []
          "
        />
        <div v-if="editSection == 'interests'" class="flex justify-end pt-3">
          <ButtonLogin
            name="Edit Interests"
            classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
            @click="updateInterests()"
          />
        </div>
      </div>
    </SkeletonInterests>
  </section>
</template>
