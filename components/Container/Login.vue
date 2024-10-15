<script setup>
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
import { useImageStore } from "~~/stores/imageStore";
import { registration, api, login } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";
import { useAuthStore } from "~~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
import { onClickOutside, useGeolocation } from "@vueuse/core";

const props = defineProps({
  modelValue: [String, Number, Boolean],
  shouldOpenModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updateInput", "forgetPass", "openRegistration"]);
const router = useRouter();

// apis
let otpApi = api() + "/api/auth/verify/otp";
let submitUserApi = api() + "/api/auth/registered/user/update";
const profileDataApi = api() + "/api/auth/profile";
const locationUpdateApi = api() + "/api/auth/update/location";
let googleOauthApi = api() + "/api/auth/google/login";
let googleOauthCallbackApi = api() + "/api/auth/google/callback";

const crud = useCrud();

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages } = imageStore;

const profileStore = useProfileStore();
const {
  saveProfileData,
  setLoaderState,
  getLoaderState,
  setShouldReload,
  clearProfileData,
} = profileStore;

const authStore = useAuthStore();
const { openLoginModal, setStep, clearAuthUser, setIsOAuthCalling } =
  useAuthStore();

const { coords } = useGeolocation();

let openModal = ref(props.shouldOpenModal);
const form = ref({
  email: "",
  password: "",
});
// {
//     "email" : "user@mail.com",
//     "password": "111111"
// }
const errors = ref({
  topErrorMsg: "",
  email: "",
  password: "",
});

const isImageVarified = ref(null);

const profileImages = [
  { imgSrc: "/showOff/1.png" },
  { imgSrc: "/showOff/2.png" },
  { imgSrc: "/showOff/3.png" },
  { imgSrc: "/showOff/1.png" },
  { imgSrc: "/showOff/2.png" },
];

let universalLoaderState = ref();
const loaderState = ref(false);

const userImages = ref([
  { id: 0, imgSrc: "/face/self.jpeg" },
  { id: 1, imgSrc: "/face/self2.jpeg" },
]);

const stepNo = ref(1);

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const loginUser = async () => {
  console.log("login runnded");
  clearProfileData();
  clearAuthUser();
  universalLoaderState.value = "pending";
  loaderState.value = "pending";
  errors.value.topErrorMsg = "";
  await login(form.value).then(async (res) => {
    if (res.status == 200) {
      loaderState.value = "resolved";
      await getProfileData();
    } else {
      errors.value.topErrorMsg = res.message;
      loaderState.value = "failed";
      universalLoaderState.value = "failed";
      showToast("Login Failed");
    }
    //   stepNo.value = 2
    //   errors.value.email = res.message.errors['email'] ?res.message.errors['email'] : ''
  });
};

// get profile data
const getProfileData = async () => {
  await crud.index({ path: profileDataApi }).then(async (res) => {
    if (res.status == 200) {
      // let { email, first_name, birth_date, about_fruendify, gender } =
      //   res.res.data;
      // if (email && first_name && birth_date && gender) {
        await saveProfileData(res.res.data);
        await sendCoords();
      // } else {
      //   showToast("Please complete your profile");
      //   setStep(3);
      //   universalLoaderState.value = "failed";
      //   emit("openRegistration");

      // }
    } else {
      showToast("Something Went wrong. Please Login Again.");
      universalLoaderState.value = "failed";

      console.log("profile data runnded");
      clearProfileData();
      clearAuthUser();
    }
  });
};

const sendCoords = async () => {
  let locationData = {};
  console.log(profileStore.latitude);
  locationData["latitude"] = profileStore.latitude;
  locationData["longitude"] = profileStore.longitude;
  locationData["timezone "] = profileStore.timezone;

  await crud
    .store({
      body: locationData,
      path: locationUpdateApi,
    })
    .then((res) => {
      if (res.status == 200) {
        // universalLoaderState.value = "resolved";
        close();
        router.push("/events");
      } else {
        showToast(
          "Login Failed!. Please give permission to access your location."
        );
        universalLoaderState.value = "failed";

        console.log("sendCoords data runnded");
        clearProfileData();
        clearAuthUser();
      }
    });
};

const verifyOTP = async () => {
  loaderState.value = "pending";
  await crud
    .store({
      body: form.value,
      path: otpApi,
    })
    .then((res) => {
      loaderState.value = "resolved";
      stepNo.value = 3;
    });
};

const saveUserCreds = () => {
  if (stepNo.value >= 5) {
    stepNo.value = 1;
  } else {
    stepNo.value++;
  }
};

const change = () => {
  // open.value = true
  openModal.value = true;
};

const close = () => {
  errors.value.topErrorMsg = "";
  errors.value.email = "";
  errors.value.password = "";
  openModal.value = false;
  emit("updateInput", openModal.value);
};

const submit = async () => {
  let formData = {
    email: form.value.email,
    registered_token: 149648,
    name: form.value.full_name,
    birth_date: form.value.date,
    files: [],
  };

  imageStore.profileImageUrl.map((dt) => {
    formData.files.push(dt.imgSrc);
  });

  await crud
    .store({
      body: formData,
      path: submitUserApi,
    })
    .then((res) => {});
};

// oauth registration
// google
const registerWithGoogle = async () => {
  // await crud.get({ path: googleOauthApi }).then((res) => {
  //   console.log(res)
  // });

  await crud
    .store({
      body: "",
      path: googleOauthApi,
    })
    .then((res) => {
      if (res.status == 200) {
        authStore.setIsOAuthCalling(true);
        window.location.href = res.res.data;
        // console.log(res.res.data)
      }
    });
};
// google callback
const googleCallback = async (data) => {
  console.log(data, "oauth");
  await crud
    .store({
      body: data,
      path: googleOauthCallbackApi,
    })
    .then(async (res) => {
      console.log(res.res.data, "auth");
      if (res.status == 200) {
        let tokens = {
          access: res.res.data.access.token,
          refresh_token: res.res.data.refresh.token,
        };
        // this.access_token = credentials.tokens.access.token;
        // this.refresh_token = credentials.tokens.refresh.token;

        await saveOauthToken(tokens);
        await getProfileData();
      }
    });
};

watch(
  () => props.shouldOpenModal,
  () => {
    openModal.value = props.shouldOpenModal;
  },
  { deep: true }
);

watch(
  () => isImageVarified.value,
  () => {},
  { deep: true }
);

watch(
  () => form.value,
  () => {},
  { deep: true }
);
</script>

<template>
  <LoaderUniversal :loaderState="universalLoaderState">
    <ModalRegistrationContainer
      :shouldOpen="openModal"
      @update-input="close"
      :showCloseBtn="true"
    >
      <section v-if="stepNo == 1">
        <div class="flex justify-center flex-col items-center gap-y-2">
          <img src="../../assets/images/logo/logoSmall.png" alt="" />
          <p
            class="text-center text-xl md:text-2xl font-semibold text-mediumBlack"
          >
            Welcome to Freundify
          </p>
          <p class="text-lg">Meet new people today</p>
        </div>

        <div class="flex gap-3 my-3 justify-center">
          <div
            class="border border-lightGrey w-fit rounded-full cursor-pointer"
            @click="registerWithGoogle"
          >
            <img
              src="../../assets/images/socials/google.svg"
              alt=""
              class="p-2 h-12 w-12"
            />
          </div>
          <!-- <div class="border border-lightGrey w-fit rounded-full">
          <img
            src="../../assets/images/socials/apple.svg"
            alt=""
            class="p-2 h-12 w-12"
          />
        </div> -->
          <div
            class="border border-lightGrey w-fit rounded-full cursor-pointer"
          >
            <img
              src="../../assets/images/socials/fb.svg"
              alt=""
              class="p-2 h-12 w-12"
            />
          </div>
        </div>

        <div class="relative text-center">
          <p class="bg-whitePrimary text-lg font-semibold text-mediumBlack">
            Or
          </p>
        </div>

        <div class="mt-4 md:px-16 px-4">
          <p class="text-base text-red-600 text-center pb-3">
            {{ errors.topErrorMsg }}
          </p>
          <div class="mb-2">
            <FormInputText
              v-model="form.email"
              :title="'email'"
              :label="'email'"
              :type="'email'"
              :error="errors.email"
              :oldValue="''"
              :required="false"
            />
          </div>
          <div class="mb-2">
            <FormPassword
              v-model="form.password"
              :title="'password'"
              :label="'password'"
              :type="'password'"
              :error="''"
              :oldValue="''"
              :required="false"
            />
          </div>
          <div>
            <p
              @click="emit('forgetPass')"
              class="text-xs text-red-500 cursor-pointer font-semibold text-end"
            >
              Forget password?
            </p>
          </div>
          <div class="mb-5 mt-5 text-center space-y-1">
            <ButtonLarge @click="loginUser" :name="'Login'" />
            <!-- <ButtonWithIcon :name="'Login'" @click="loginUser">
            <CommonSpinner v-if="loaderState == 'pending'" />
          </ButtonWithIcon> -->
          </div>
        </div>
      </section>

      <section v-if="stepNo == 2">
        <div class="flex justify-center flex-col items-center gap-y-2">
          <img src="../../assets/images/logo/logoSmall.png" alt="" />
          <p
            class="text-2xl md:text-4xl font-semibold text-center text-mediumBlack"
          >
            Verify Email
          </p>
          <p class="text-lg text-center text-darkGrey">
            An OTP has been sent to your email. Please verify to proceed.
          </p>
        </div>

        <div class="py-5">
          <FormOtp @update-input="(dt) => (form.otp = dt)" />
        </div>
        <div class="px-20 flex flex-col items-center gap-y-8">
          <ButtonLarge @click="verifyOTP" :name="'Verify'" />
          <p class="pb-3 text-center">
            <span class="text-base text-gray-600 font-medium"
              >Already a member?</span
            >
            <span class="text-red-500 font-bold"> Log In </span>
          </p>
        </div>
      </section>

      <section v-if="stepNo == 3">
        <div class="flex justify-center flex-col items-center gap-y-4 py-5">
          <CommonDotPaginator :stepNo="stepNo" />
          <div class="space-y-4">
            <p class="text-3xl font-semibold text-center text-mediumBlack">
              Let's Get to Know You Better!
            </p>
            <p class="text-base text-center text-darkGrey">
              Share your name and birthdate.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-4 gap-2 gap-x-3 py-3 px-5">
          <div class="col-span-4">
            <FormInputText2
              v-model="form.full_name"
              :title="'Full Name'"
              :label="'full_name'"
              :type="'text'"
              :error="errors.full_name"
              :oldValue="''"
            />
          </div>
        </div>

        <div>
          <FormDate v-model="form.date" />
        </div>

        <p class="text-center text-mediumBlack pt-8 px-4 pb-4">
          Providing your responses to the upcoming questions will enable us to
          curate ideas that align perfectly with your preferences.
        </p>
        <div class="px-20 flex flex-col items-center gap-y-8">
          <ButtonLarge @click="saveUserCreds" :name="'Next Response'" />
          <p class="pb-3 text-center">
            <span class="text-base text-gray-600 font-medium"
              >Already a member?</span
            >
            <span class="text-red-500 font-bold"> Log In </span>
          </p>
        </div>
      </section>
      <!-- v-if="stepNo == 4" -->
      <section v-if="stepNo == 4" class="px-4 pb-3">
        <div class="flex justify-center flex-col items-center gap-y-4 py-5">
          <CommonDotPaginator :stepNo="stepNo" />
          <div class="space-y-4">
            <p class="text-3xl font-semibold text-center text-mediumBlack">
              Show off your style!
            </p>
            <p class="text-base text-center text-darkGrey">
              We'd love to see at least two photos, please.
            </p>
          </div>
        </div>
        <div class="flex justify-center">
          <FormImage2 v-if="imageStore.profileImageUrl.length <= 5" />
          <p v-else class="text-red-500 text-lg font-medium">
            Go to the next step.
          </p>
        </div>
        <div class="py-3 px-5 grid grid-cols-3 gap-3">
          <div
            v-for="data in [0, 1, 2, 3, 4, 5]"
            class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-24 overflow-hidden"
          >
            <img
              v-if="imageStore.profileImageUrl[data]"
              :src="imageStore.profileImageUrl[data].imgSrc"
              class="h-full w-full"
            />
          </div>
        </div>

        <p class="text-center text-mediumBlack pt-5 px-4 pb-8">
          You can upload a total of 6 photos.
        </p>
        <div class="px-4 flex justify-between items-center gap-y-8">
          <ArrowLeftIcon class="h-5 w-5 text-darkGrey cursor-pointer" />
          <div class="w-36">
            <!-- <ButtonWithIcon @click="saveUserCreds" :name="'Next '">
            <ArrowRightIcon class="h-5 w-5 ml-5" />
          </ButtonWithIcon> -->
            <ButtonWithIcon @click="stepNo = 5" :name="'Next '">
              <ArrowRightIcon class="h-5 w-5 ml-5" />
            </ButtonWithIcon>
          </div>
        </div>
      </section>

      <section v-if="stepNo == 5" class="px-4 pb-3">
        <div class="flex justify-center flex-col items-center gap-y-4 py-5">
          <CommonDotPaginator :stepNo="stepNo" />
          <div class="space-y-4">
            <p class="text-3xl font-semibold text-center text-mediumBlack">
              Let's confirm it's you!
            </p>
            <p class="text-base text-center text-darkGrey">
              Please take a live selfie photo for verification.
            </p>
          </div>
        </div>
        <div class="pb-5">
          <LoaderImgTake>
            <ImgRecognizer
              v-model="isImageVarified"
              :userImages="imageStore.profileImageUrl"
            />
          </LoaderImgTake>
        </div>

        <div class="flex justify-between items-center gap-y-8">
          <ArrowLeftIcon
            class="h-5 w-5 text-darkGrey cursor-pointer"
            @click="stepNo = 4"
          />

          <button class="ml-auto px-4 p-2 font-semibold cursor-pointer">
            Skip
          </button>
          <div class="w-36">
            <ButtonWithIcon
              v-if="isImageVarified"
              @click="submit"
              :name="'Next '"
            >
              <ArrowRightIcon class="h-5 w-5 ml-5" />
            </ButtonWithIcon>
            <ButtonWithIcon v-else :name="'Next '">
              <ArrowRightIcon class="h-5 w-5 ml-5" />
            </ButtonWithIcon>
          </div>
        </div>
      </section>
    </ModalRegistrationContainer>
  </LoaderUniversal>
</template>
