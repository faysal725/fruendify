<script setup>
import { useCrud } from "~~/composables/base";
import { useProfileStore } from "~~/stores/profileStore";
import { HeartIcon } from "@heroicons/vue/24/outline";
import { MapPinIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  pageType: {
    type: String,
    default: "",
  },
  showRoute: {
    type: Boolean,
    default: true,
  },
});

const profileUpdateApi = api() + "/api/auth/update/profile";

const crud = useCrud();
const route = useRoute();

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const form = ref({
  full_name: "",
});

const editSection = ref(false);

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const updateName = async () => {
  setLoaderState("pending");
  setShouldReload(false);
  let data = {
    full_name: form.value.full_name,
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
        editSection.value = false;
        showToast("Update successful");
      }
    });
};

function exactPath(pathName) {
  const path = route.path.toLowerCase(); // Convert path to lowercase for case-insensitive check
  return path.includes(pathName);
}
</script>

<template>
  <SkeletonName>
    <section class="flex justify-between flex-wrap">
      <div>
        <div class="flex items-center gap-2 pb-3">
          <p class="text-3xl font-semibold  capitalize dark:text-white min-w-28 break-words">
            {{
              profileStore.profileData
                ? profileStore.profileData.first_name
                : ""
            }}
          </p>
          <div class="flex items-center gap-2">
            <img v-if="profileStore.profileData?.is_verified" src="~~/assets/images/profile/verified.svg" alt="" />
          </div>
        </div>

        <div v-if="editSection" class="space-y-3 pb-3">
          <FormInputText
            v-model="form.full_name"
            :title="''"
            :label="'full_name'"
            :rows="2"
            :type="'text'"
            :oldValue="profileStore.profileData.first_name"
            :required="false"
            :placeholder="''"
          />
          <div class="flex justify-start">
            <ButtonLogin
              name="Edit"
              classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
              @click="updateName()"
            />
          </div>
        </div>

        <!-- <div class="inline-flex items-center justify-start gap-1">
          <MapPinIcon class="h-5 w-5 text-secondary" />
          <span class="text-sm font-base text-slate-700 dark:text-slate-300"
            >{{ publicData ? publicData.distance : "0" }} km away</span
          >
        </div> -->

      </div>

      <div class="flex flex-col items-end gap-3 ml-auto">
        <div v-if="showRoute" class="space-x-2">
          <NuxtLink to="/profile/edit/">
            <ButtonLogin
              name="Edit"
              :classes="[
                exactPath('edit')
                  ? 'bg-gradient-to-t from-primary to-secondary'
                  : 'bg-stone-500',
                'text-white  p-1 min-w-24  rounded-tl-md rounded-bl-md  ',
              ]"
            />
          </NuxtLink>
          <NuxtLink to="/profile/">
            <ButtonLogin
              name="Preview"
              :classes="[
                !exactPath('edit')
                  ? 'bg-gradient-to-t from-primary to-secondary'
                  : 'bg-stone-500',
                'text-white  p-1 min-w-24  rounded-tr-md rounded-br-md  ',
              ]"
            />
          </NuxtLink>
        </div>
        <div v-if="profileStore.profileData" class="flex items-center gap-4">
          <!-- <NuxtLink
            :to="'/profile/view/' + profileStore.profileData._id"
            class="text-black dark:text-white underline"
          >
            Public
          </NuxtLink> -->
          <ButtonResetPass v-if="pageType == 'edit'" />
        </div>
      </div>
    </section>
  </SkeletonName>
</template>
