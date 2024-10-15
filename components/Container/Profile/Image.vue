<script setup>
import {
  PencilIcon,
  PencilSquareIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from "@heroicons/vue/24/solid";
import { useAuthStore } from "~~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
import { useCrud } from "~~/composables/base";
import { useAsyncData } from "nuxt/app";

const props = defineProps({
  pageType: {
    type: String,
    default: "none",
  },
});
// apis
let profileImageUpdateApi = api() + "/api/auth/profile-image/update";
let profileImageVerificationApi = api() + "/api/auth/profile/verify";
const profileDataApi = api() + "/api/auth/profile";
// apis

const crud = useCrud();
const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

let openImageVerifyModal = ref(false);
let openImageUploadModal = ref(false);
const uploadingImageState = ref(false);

const image = ref();
const imgToUpdate = ref([]);
const url = ref();

const loader = ref(false);
const authStore = useAuthStore();
const imgVerificationData = ref();
const isCameraReady = ref(false);
const shouldRestartCamera = ref(false);
const verifyLoaderState = ref();

// image uploading
const process = (file) => {
  image.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    url.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const setImage = (data) => {
  process(data);
  console.log(image.value);
};

const clickOnInput = () => {
  console.log(document.getElementById("singleImg"));

  const inputElement = document.getElementById("singleImg");
  inputElement.click();
};

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const updateNewProfileImage = async () => {
  console.log(image.value);
  uploadingImageState.value = true;

  const formData = new FormData();
  formData.append("profile_image", image.value);

  await crud
    .store({
      body: formData,
      path: profileImageUpdateApi,
    })
    .then((res) => {
      openImageUploadModal.value = false;
      console.log(res);
      if (res.status == 422) {
        setLoaderState("failed");
        showToast("Update Failed", "error", 5000);
        uploadingImageState.value = false;
      }
      if (res.status == 200) {
        setLoaderState("resolved");
        setShouldReload(true);
        showToast("Update successful");
        uploadingImageState.value = false;

        image.value = null;
        imgToUpdate.value = [];
        url.value = null;
      }
    });
};

const varifyProfileImage = async () => {
  shouldRestartCamera.value = false;

  if (!imgVerificationData.value) {
    showToast("Please capture your image first", "error", 5000);
    return;
  }

  verifyLoaderState.value = "pending";

  const formData = new FormData();

  // formData.append("verify_image", imgVerificationData.value);
  let data = {
    verify_image: imgVerificationData.value,
  };

  await crud
    .store({
      body: data,
      path: profileImageVerificationApi,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        showToast("Verification successful");
        setLoaderState("resolved");
        verifyLoaderState.value = "resolved";
        setShouldReload(true);
        openImageVerifyModal.value = false;
        image.value = null;
        imgToUpdate.value = [];
        url.value = null;
        getProfileData();
      } else {
        verifyLoaderState.value = "failed";
        setLoaderState("failed");
        showToast("Verification failed");
      }

      shouldRestartCamera.value = false;
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

watch(
  () => imgVerificationData.value,
  () => {
    console.log(imgVerificationData.value);
  },
  { deep: true }
);
</script>

<template>
  <SkeletonProfileImg>
    <section class="relative max-h-96">
      <img
        v-if="profileStore.profileData && profileStore.profileData.profile_image"
        :src="
          profileStore.profileData
            ? networkImage(profileStore.profileData.profile_image)
            : '#'
        "
        alt=""
        class="max-h-96 w-full rounded-lg object-cover"
      />
      <img
        v-else
        src="../../../assets/images/profile/empty-profile.jpg"
        alt=""
        class="min-h-96 w-full rounded-lg object-cover"
      />

      <div
        v-if="pageType == 'edit'"
        class="absolute top-4 right-0 w-full flex justify-end px-4 gap-3"
      >
        <button
          class="w-fit bg-secondary p-1 rounded-lg"
          @click="openImageUploadModal = true"
        >
          <PencilSquareIcon class="h-5 w-5 text-black" />
        </button>
        <button
          v-if="!profileStore.profileData?.is_verified"
          class="w-fit bg-secondary p-1 rounded-lg"
          @click="openImageVerifyModal = true"
        >
          <img
            src="~~/assets/images/profile/scanning.png"
            alt=""
            class="h-5 w-5"
          />
        </button>
      </div>

      <div class="absolute -bottom-4 right-0 w-full flex justify-center">
        <span
          class="bg-gradient-to-r py-2 px-4 rounded-full from-pink-600 via-pink-500 to-secondary text-sm text-white w-fit"
        >
          <p class="uppercase bottom-0 right-1/2 text-xs">
            {{
              profileStore.profileData
                ? profileStore.profileData.profile_completed
                : 0
            }}% Complete
          </p>
        </span>
      </div>
    </section>
  </SkeletonProfileImg>

  <ModalContainer
    :shouldOpen="openImageVerifyModal"
    @update-input="openImageVerifyModal = false"
    :showCloseBtn="true"
    classes="bg-whitePrimary max-w-xl dark:bg-blackPrimary"
  >
    <section class="px-4 pb-3">
      <div class="flex justify-center flex-col items-center gap-y-4 ">
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
          @camera-ready="(bool) => (isCameraReady = bool)" :shouldRestart="shouldRestartCamera"
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

  <ModalContainer
    :shouldOpen="openImageUploadModal"
    :showCloseBtn="true"
    @update-input="
      () => {
        openImageUploadModal = false;
        url = '';
      }
    "
    classes="bg-whitePrimary max-w-xl "
  >
    <section class="h-full flex items-center md:items-start justify-center">
      <div class="pb-4 w-fit">
        <Label value="Profile Picture" />
        <img
          v-if="url"
          :src="url ? url : '#'"
          class="h-96 w-96 rounded-md pb-5 object-cover"
        />
        <div
          v-else
          class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-72 w-72 md:h-52 md:w-52 relative bg-gray-300 mb-5 mx-auto"
          @click="clickOnInput()"
        >
          <PlusIcon class="h-12 w-12 text-slate-700" />
        </div>
        <div class="flex justify-between items-center">
          <input
            @input="setImage($event.target.files[0])"
            id="singleImg"
            name="file-upload"
            type="file"
            class="pt-6 hidden relative max-w-lg w-full h-20 font-semibold px-4 sm:max-w-full sm:text-base text-gray-500 focus:outline-none"
          />
        </div>

        <ButtonWithIcon
          v-if="uploadingImageState"
          :classes="'w-full md:min-w-16 bg-primary text-sm btn-login rounded-lg'"
          :name="'Uploading '"
        >
          <div
            class="ml-2 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </ButtonWithIcon>

        <ButtonLogin
          v-else
          @click="updateNewProfileImage()"
          name="Save"
          classes="w-full md:min-w-16 bg-primary text-sm btn-login rounded-lg"
        />
      </div>
    </section>
  </ModalContainer>
</template>
