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
import { useStepStore } from "~~/stores/stepStore";
import { registration, api } from "~~/composables/auth";
import { useCrud } from "~~/composables/base";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useAuthStore } from "~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
import { isProfileCompleted } from "~/composables/profile";

const props = defineProps({
  modelValue: [String, Number, Boolean],
  shouldOpenModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updateInput", "openLogin", "openRegister"]);

// apis
let otpApi = api() + "/api/auth/verify/otp";
let resendOTPApi = api() + "/api/auth/resend/otp";
let submitUserApi = api() + "/api/auth/registered/user/update";
let interestOptionApi = api() + "/api/admin/interest/public/list";
let industryOptionApi = api() + "/api/public/industry";
let profileDataApi = api() + "/api/auth/profile";
const locationUpdateApi = api() + "/api/auth/update/location";
let googleOauthApi = api() + "/api/auth/google/login";
let googleOauthCallbackApi = api() + "/api/auth/google/callback";

const crud = useCrud();
const router = useRouter();
const route = useRoute();

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages, clearImages } = imageStore;

const { getCurrentStep, setCurrentStep } = useStepStore();

const authStore = useAuthStore();
const {
  stepUp,
  stepDown,
  saveNameAndBirthday,
  saveGender,
  saveAboutFrundifyData,
  saveJobInformation,
  saveInterests,
  saveImages,
  clearUserImages,
  setStep,
  saveToken,
  saveOauthToken,
  saveAuthProfileInfo,
} = useAuthStore();

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

let openModal = ref(props.shouldOpenModal);

const form = ref({
  email: "",
  password: "",
  confirm_password: "",
  otp: "",
  joining_reason: "",
  aboutFrundify: "",
  full_name: "",
  age: "",
  birth_date: "",
  gender: "",
  jobTitle: "",
  industry: "",
  experience: "",
  jobDescription: "",
  interests: [],
  images: "",
  month: "",
  year: "",
  files: null,
});

const errors = ref({
  hasAccountAlready: false,
  topErrorMsg: "",
  email: "",
  password: "",
  confirm_password: "",
  otp: "",
  aboutFrundify: "",
  full_name: "",
  age: "",
  birth_date: "",
  gender: "",
  jobTitle: "",
  industry: "",
  experience: "",
  jobDescription: "",
  interests: "",
  month: "",
  year: "",
  files: null,
});

const isImageVarified = ref(false);
const startTimer = ref(true);

let industry = ref();
let interestOption = ref();

const stepNo = ref(authStore.stepNo);

const getInterestOption = async () => {
  await crud.get({ path: interestOptionApi }).then((res) => {
    if (res.res.data) {
      interestOption.value = res.res.data;
    }
  });
};

const getIndustryOption = async () => {
  await crud.get({ path: industryOptionApi }).then((res) => {
    if (res.res.data) {
      industry.value = res.res.data;
    }
  });
};

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const registeredUser = async () => {
  errors.value.email = "";
  errors.value.password = "";
  errors.value.confirm_password = "";

  let registrationData = {
    email: form.value.email,
    password: form.value.password,
    confirm_password: form.value.confirm_password,
  };
  await registration(registrationData).then((res) => {
    if (res.status == 200) {
      stepNo.value = 2;
    } else {
      if (typeof res.message == "string") {
        errors.value.topErrorMsg = res.message;
      }

      if (res.message.errors) {
        errors.value.email = res.message.errors["email"]
          ? res.message.errors["email"][0]
          : "";
        errors.value.password = res.message.errors["password"]
          ? res.message.errors["password"][0]
          : "";
        errors.value.confirm_password = res.message.errors["confirm_password"]
          ? res.message.errors["confirm_password"][0]
          : "";
      }

      showToast("Invalid Credentials", "error", 5000);
    }
  });
};

const verifyOTP = async () => {
  let otpData = {
    email: authStore.userData.email,
    otp: form.value.otp,
  };

  await otpVerification(otpData).then((res) => {
    startTimer.value = true;
    if (res.status == 200) {
    } else {
      errors.value.otp = res.message;
    }
  });
};

const resendOTP = async () => {
  startTimer.value = true;
  let data = {
    email: authStore.userData.email,
  };
  await crud
    .store({
      body: data,
      path: resendOTPApi,
    })
    .then((res) => {
      errors.value.otp = res.message;
    });
};

const collectAboutFrundifyData = () => {
  // errors.value.aboutFrundify = "";
  // if (form.value.aboutFrundify !== "") {
  let formData = {
    aboutFrundify: form.value.aboutFrundify,
    joining_reason: form.value.joining_reason,
  };
  saveAboutFrundifyData(formData);
  // } else {
  //   errors.value.aboutFrundify = "Please enter your source.";
  // }
};

const collectNameAndBirthday = () => {
  errors.value.full_name = "";
  errors.value.birth_date = "";

  if (form.value.full_name !== "" && form.value.birth_date !== "") {
    let creds = {
      full_name: form.value.full_name,
      birth_date: form.value.birth_date,
    };
    saveNameAndBirthday(creds);
  } else {
    if (form.value.full_name === "") {
      errors.value.full_name = "Please enter your name";
    }

    if (form.value.birth_date === "") {
      errors.value.birth_date = "Please enter your birth date";
    }
  }
};

const collectGender = () => {
  errors.value.gender = "";
  if (form.value.gender !== "") {
    saveGender(form.value.gender);
  } else {
    errors.value.gender = "Please enter your gender";
  }
};

const collectJobInformation = () => {
  errors.value.jobTitle = "";
  errors.value.experience = "";
  errors.value.industry = "";
  errors.value.jobDescription = "";

  if (
    form.value.jobTitle !== "" &&
    form.value.experience !== "" &&
    form.value.industry !== "" &&
    form.value.jobDescription !== ""
  ) {
    let jobDt = {
      jobTitle: form.value.jobTitle,
      experience: form.value.experience,
      industry: form.value.industry,
      jobDescription: form.value.jobDescription,
    };
    saveJobInformation(jobDt);
  } else {
    errors.value.jobTitle = "please fill up all the fields";

    errors.value.jobTitle =
      form.value.jobTitle === "" ? "Please fill up job title" : "";
    errors.value.experience =
      form.value.experience === "" ? "Please fill up job experience" : "";
    errors.value.industry =
      form.value.industry === "" ? "Please fill up industry type" : "";
    errors.value.jobDescription =
      form.value.jobDescription === "" ? "Please five job jobDescription" : "";
  }
};

const collectInterests = () => {
  errors.value.interests = "";

  if (form.value.interests.length > 0) {
    saveInterests(form.value.interests);
  } else {
    errors.value.interests = "please choose your interest";
  }
};

const collectImages = () => {
  clearUserImages();
  if (form.value.images.length > 0) {
    saveImages(form.value.images);
  } else {
    // errors.value.interests = "please choose your interest";
  }
};

const saveUserCreds = () => {
  if (stepNo.value >= 5) {
    stepNo.value = 1;
  } else {
    stepNo.value++;
  }
};

async function convertToFormData() {
  const formData = new FormData();
  formData.append("email", authStore.userData.email);
  formData.append("registered_token", authStore.userData.registered_token);
  formData.append("full_name", authStore.userData.full_name);
  formData.append("birth_date", authStore.userData.birth_date);
  formData.append("aboutFrundify", authStore.userData.aboutFrundify);
  formData.append("joining_reason", authStore.userData.joining_reason);
  formData.append("gender", authStore.userData.gender);
  formData.append("interests", authStore.userData.interests);
  // formData.append("images", authStore.userData.images);
  // for (const image of authStore.userData.images) {
  //   // Check if each element is a File object
  //   if (!(image instanceof File)) {
  //     throw new Error("Invalid image data. Expected File objects");
  //   }

  //   formData.append("images[]", image); // Append with square brackets for array
  // }

  // Append all images under the same key "images[]"
  authStore.userData.images.forEach((file, index) => {
    formData.append("images", file);
  });
  formData.append("profile_image", authStore.userData.profile_image);
  formData.append("jobTitle", authStore.userData.jobTitle);
  formData.append("jobDescription", authStore.userData.jobDescription);
  formData.append("industry", authStore.userData.industry);
  formData.append("experience", authStore.userData.experience);

  return formData;
}

function convertImageToBinary(imageFile) {
  if (!(imageFile instanceof File)) {
    throw new Error("Invalid image data. Expected a File object");
  }

  const reader = new FileReader();
  reader.readAsArrayBuffer(imageFile);

  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

const getProfileData = async () => {
  showToast("Getting your profile data");
  setLoaderState("pending");
  await crud.index({ path: profileDataApi }).then(async (res) => {
    if (res.status == 200) {
      let {
        email,
        first_name,
        birth_date,
        about_fruendify,
        gender,
        interests,
      } = res.res.data;
      console.log(email,
        first_name,
        birth_date,
        about_fruendify,
        gender,
        interests, 'profile ');
      if (
        email &&
        first_name &&
        birth_date &&
        about_fruendify &&
        gender &&
        interests
      ) {
        await saveAuthProfileInfo(res.res.data);
        await saveProfileData(res.res.data);
        setLoaderState("resolved");
      } else {
        showToast("Please complete your profile");
        setStep(3);
        open();
      }
    } else {
      showToast("Registration Failed");
    }
  });
};

const sendCoords = async () => {
  showToast("Taking your location");
  let locationData = {};
  locationData["latitude"] = profileStore.latitude;
  locationData["longitude"] = profileStore.longitude;

  await crud
    .store({
      body: locationData,
      path: locationUpdateApi,
    })
    .then((res) => {
      if (res.status == 200) {
        setStep(1);
        close();
        showToast("Registration successful");
        clearImages();
        router.push("/events");
      } else {
      }
    });
};

const submit = async () => {
  let data = await convertToFormData();
  await crud
    .store({
      body: data,
      path: submitUserApi,
    })
    .then(async (res) => {
      console.log(res);
      if (res.status == 422) {
        // errors.value.title = res.message.errors.title
        //   ? errorFilter(res.message.errors.title)
        //   : "";
      }
      if (res.status == 200) {
        await saveToken(res.res);
        await getProfileData();

        await sendCoords();
      }
    });
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

        // await sendCoords();
      }
    });
};

const change = () => {
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
  emit("updateInput", openModal.value);
};

const open = () => {
  emit("openRegister");
};

const openLogin = () => {
  close();
  emit("openLogin", true);
};

onMounted(() => {
  getInterestOption();
  getIndustryOption();
});

onMounted(() => {
  console.log("registration onmounted call");
  if (!authStore.isLoggedIn && route.query.state && route.query.code) {
    // some api calls for oauth

    // console.log(route.query.state, "route");
    // console.log(route.query.code);

    let formData = {
      code: route.query.code,
      state: route.query.state,
    };
    googleCallback(formData);
  }
});

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
  () => authStore.stepNo,
  () => {
    stepNo.value = authStore.stepNo;
  },
  { deep: true }
);

watch(
  () => form.value,
  () => {},
  { deep: true }
);
</script>

<template>
  <ModalContainer
    :shouldOpen="openModal"
    @update-input="close"
    classes="bg-whitePrimary w-full md:max-w-xl "
  >
    <section class="flex justify-between p-5 md:p-2">
      <ArrowLeftIcon
        class="h-6 w-6 text-slate-600 cursor-pointer block md:hidden"
        @click="stepNo > 1 ? (stepNo = stepNo - 1) : close()"
      />
      <XMarkIcon
        class="h-6 w-6 text-slate-600 cursor-pointer md:ml-auto"
        @click="close"
      />
    </section>

    <section v-if="stepNo == 1" class="p-5 bg-whitePrimary space-y-8">
      <div class="flex justify-center flex-col items-start gap-y-2">
        <p class="text-3xl font-semibold text-mediumBlack">Create an account</p>
      </div>

      <div class="flex gap-3">
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
        <div class="border border-lightGrey w-fit rounded-full cursor-pointer">
          <img
            src="../../assets/images/socials/fb.svg"
            alt=""
            class="p-2 h-12 w-12"
          />
        </div>
      </div>

      <div class="relative">
        <span class="h-0.5 w-full block bg-gray-200"></span>
        <p
          class="bg-whitePrimary w-10 text-center absolute right-1/2 -top-3 text-lg font-semibold text-mediumBlack"
        >
          Or
        </p>
      </div>

      <div>
        <p class="text-lg font-semibold">Signup with email or phone number</p>
        <p
          v-if="errors.topErrorMsg == 'Email already taken'"
          class="text-lg text-mediumBlack"
        >
          Already a member?
          <span class="text-primary font-semibold" @click="openLogin()"
            >Login</span
          >
        </p>
      </div>

      <div class="mt-4">
        <p class="text-base text-red-600 text-center pb-3">
          {{ errors.topErrorMsg }}
        </p>
        <div class="mb-2">
          <FormInputText2
            v-model="form.email"
            :title="'email or phone'"
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
            :title="''"
            :label="'password'"
            :type="'password'"
            :error="errors.password"
            :oldValue="''"
            :required="false"
          />
        </div>
        <div class="mb-2">
          <FormPassword
            v-model="form.confirm_password"
            :title="''"
            :label="'confirm_password'"
            :type="'password'"
            :error="errors.confirm_password"
            :oldValue="''"
            placeholder="Re-enter Password"
            :required="false"
          />
        </div>
      </div>
      <div class="text-center space-y-1 flex justify-end">
        <div class="w-28">
          <ButtonLarge @click="registeredUser" :name="'Continue'" />
        </div>
      </div>
    </section>

    <section v-if="stepNo == 2" class="p-5">
      <div class="flex justify-start flex-col items-start gap-y-2">
        <p class="text-lg md:text-4xl font-bold text-start text-mediumBlack">
          Please verify your email <br />
          or phone number.
        </p>
        <p
          class="text-sm md:text-lg font-base md:font-bold text-start text-mediumBlack pt-4"
        >
          We've sent an OTP to your phone number, <br />
          verify it to continue.
        </p>
        <p class="text-red-600 font-base">
          {{ errors.otp }}
        </p>
        <CommonSimpleTimer
          :start="startTimer"
          :totalSecond="120"
          @timerStart="() => (startTimer = false)"
        >
          <p class="text-gray-600 font-medium text-base">
            Don't have it?
            <span
              @click="resendOTP()"
              class="font-bold text-primary cursor-pointer"
              >Resend</span
            >
          </p>
        </CommonSimpleTimer>
      </div>

      <div class="py-5">
        <FormOtp @update-input="(dt) => (form.otp = dt)" />
      </div>
      <div class="flex justify-between items-center">
        <ArrowLeftIcon
          class="h-6 w-6 text-slate-700 cursor-pointer"
          @click="stepDown()"
        />

        <div class="w-28">
          <ButtonLarge @click="verifyOTP" :name="'Continue'" />
        </div>
      </div>
    </section>

    <section v-if="stepNo == 3" class="p-5 bg-whitePrimary space-y-5">
      <div class="flex justify-center flex-col items-start gap-y-2">
        <p class="text-xl md:text-3xl font-semibold text-mediumBlack">
          Create an account
        </p>
      </div>

      <div>
        <p class="text-base md:text-xl font-semibold text-gray-500">
          How did you found out about freundify?
        </p>
      </div>

      <div class="mt-4 space-y-8">
        <div class="mb-2">
          <FormTextArea
            v-model="form.aboutFrundify"
            :title="''"
            :label="'short_description'"
            :type="'text'"
            :oldValue="authStore.userData.aboutFrundify"
            :required="false"
            :placeholder="''"
            :error="errors.aboutFrundify"
          />
        </div>
        <div>
          <p class="text-base md:text-xl font-semibold text-gray-500">
            For what reason do you want to use it?
          </p>
          <FormSelector
            v-model="form.joining_reason"
            need="value"
            :options="[
              { key: 'To meet new people', value: 'To meet new people' },
              {
                key: 'To meet someone when i am on holiday',
                value: 'To meet someone when i am on holiday',
              },
              {
                key: 'to find a sport partner',
                value: 'to find a sport partner',
              },
              {
                key: 'to attend cultural events',
                value: 'to attend cultural events',
              },
              {
                key: 'others',
                value: 'others',
              },
            ]"
            :error="''"
            :oldValue="authStore.userData.joining_reason"
          />
        </div>
      </div>
      <div class="text-center space-y-1 flex justify-end">
        <div class="w-28">
          <ButtonLarge @click="collectAboutFrundifyData()" :name="'Continue'" />
        </div>
      </div>
    </section>

    <section v-if="stepNo == 4" class="p-5 bg-whitePrimary space-y-5">
      <div class="flex justify-center flex-col items-start gap-y-2">
        <p class="text-xl md:text-3xl font-semibold text-mediumBlack">
          Our data privacy
        </p>
      </div>

      <div class="max-w-md">
        <p
          class="text-sm md:text-base font-semibold text-gray-500 text-justify"
        >
          Welcome to Freundify. We are committed to protecting your personal
          information and your right to privacy. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you
          use our mobile application. Please read this Privacy Policy carefully.
          If you do not agree with the terms of this Privacy Policy, please do
          not use the application.
        </p>
      </div>

      <div class="text-center space-y-1 flex justify-between items-center">
        <ArrowLeftIcon
          class="h-6 w-6 text-slate-700 cursor-pointer"
          @click="stepDown()"
        />
        <div class="w-28">
          <ButtonLarge @click="stepUp()" :name="'Continue'" />
        </div>
      </div>
    </section>

    <section v-if="stepNo == 5">
      <div class="flex justify-center flex-col items-start gap-y-4 p-5">
        <CommonDotPaginator :stepNo="stepNo - 4" :total="5" />
        <div class="space-y-4">
          <p
            class="text-xl md:text-3xl font-semibold text-start text-mediumBlack"
          >
            Let's Get to Know You Better!
          </p>
          <p class="text-sm md:text-base text-start text-darkGrey">
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
            :oldValue="authStore.userData.full_name"
          />
        </div>
      </div>

      <div>
        <FormDate
          v-model="form.birth_date"
          :error="errors.birth_date"
          :oldValue="authStore.userData.birth_date"
        />
      </div>

      <div class="flex justify-between pt-8 px-5">
        <ArrowLeftIcon
          @click="stepNo = 4"
          class="h-6 w-6 text-mediumBlack dark:text-slate-200 cursor-pointer"
        />
        <div class="w-36">
          <ButtonLarge @click="collectNameAndBirthday()" :name="'Next'" />
        </div>
      </div>
    </section>

    <section v-if="stepNo == 6" class="p-5 bg-whitePrimary space-y-5">
      <div class="flex justify-center flex-col items-start gap-y-4">
        <CommonDotPaginator :stepNo="stepNo - 4" :total="6" />
        <div class="space-y-4">
          <p
            class="text-xl md:text-3xl font-semibold text-start text-mediumBlack"
          >
            Tell Us Your Gender
          </p>
          <p class="text-sm md:text-lg font-base text-gray-600">
            Sharing your gender can help us match your preferences more
            accurately and enhance your experience.
          </p>
        </div>
      </div>

      <div>
        <FormSelector
          v-model="form.gender"
          need="value"
          :options="[
            { key: 'Male', value: 'Male' },
            { key: 'Female', value: 'Female' },
            { key: 'Non-binary', value: 'Non-binary' },
            { key: 'Others', value: 'Others' },
          ]"
          :error="errors.gender"
          :oldValue="authStore.userData.gender"
        />
      </div>

      <div class="flex justify-between pt-8 px-5">
        <ArrowLeftIcon
          @click="stepNo = 4"
          class="h-6 w-6 text-mediumBlack dark:text-slate-200 cursor-pointer"
        />
        <div class="w-36">
          <ButtonLarge @click="collectGender()" :name="'Next'" />
        </div>
      </div>
    </section>

    <section
      v-if="stepNo == 7"
      class="p-5 bg-whitePrimary space-y-5 max-h-[80vh] overflow-y-scroll"
    >
      <div class="flex justify-center flex-col items-start gap-y-4">
        <CommonDotPaginator :stepNo="stepNo - 4" :total="5" />
        <div class="space-y-4">
          <p
            class="text-xl md:text-3xl font-semibold text-start text-mediumBlack"
          >
            Tell Us About Your Career
          </p>
          <p class="text-sm md:text-lg font-base text-gray-600">
            We'd love to learn more about your professional journey. Sharing
            your career information helps us tailor your experience and provide
            relevant opportunities
          </p>
        </div>
      </div>

      <div class="">
        <div class="mb-2">
          <FormInputText2
            v-model="form.jobTitle"
            :title="'Current job title'"
            :label="'jobTitle'"
            :type="'text'"
            :error="errors.jobTitle"
            :oldValue="authStore.userData.jobTitle"
            :required="false"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <select
              v-model="form.industry"
              name=""
              id=""
              class="border border-lightGrey h-full w-full rounded-md pl-5 text-xs md:text-sm"
            >
              <option
                v-for="data in industry"
                :value="data._id"
                class="text-xs md:text-sm"
              >
                {{ data.title }}
              </option>
            </select>
          </div>
          <div>
            <FormInputText2
              v-model="form.experience"
              :title="'Years of Experience'"
              :label="'experience'"
              :type="'number'"
              :error="''"
              :oldValue="''"
              :required="false"
            />
          </div>
        </div>

        <div>
          <div class="mb-2">
            <FormTextArea
              v-model="form.jobDescription"
              :title="''"
              :label="'short_description'"
              :type="'text'"
              :oldValue="authStore.userData.jobDescription"
              :error="errors.jobDescription"
              :required="false"
              :placeholder="'Short description'"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-between pt-8 md:px-5">
        <ArrowLeftIcon
          @click="stepDown()"
          class="h-6 w-6 text-mediumBlack dark:text-slate-200 cursor-pointer"
        />
        <div class="w-40 flex items-center gap-3">
          <p class="text-base font-semibold cursor-pointer" @click="stepUp()">
            Skip
          </p>
          <ButtonWithIcon @click="collectJobInformation()" :name="'Next'">
            <ArrowRightIcon
              class="md:h-6 md:w-6 h-4 w-4 text-white cursor-pointer ml-3"
            />
          </ButtonWithIcon>
        </div>
      </div>
    </section>

    <section v-if="stepNo == 8" class="p-5 bg-whitePrimary space-y-5">
      <div class="flex justify-center flex-col items-start gap-y-4">
        <CommonDotPaginator :stepNo="stepNo - 4" :total="5" />
        <div class="space-y-4">
          <p
            class="text-xl md:text-3xl font-semibold text-start text-mediumBlack"
          >
            Share Your Interests
          </p>
          <p class="text-base md:text-lg font-base text-gray-600">
            Tell us what makes you tick outside of work – your hobbies and
            interests give us a glimpse into the things that bring you joy and
            fulfillment.
          </p>
        </div>
      </div>

      <div>
        <p class="text-sm text-red-600">{{ errors.interests }}</p>
        <div class="">
          <FormSelector4
            v-model="form.interests"
            :title="''"
            :options="interestOption"
            :oldValue="authStore.userData.interests"
            :error="errors.industry"
          />
        </div>
      </div>

      <div class="flex justify-between items-center pt-8 px-5">
        <ArrowLeftIcon
          @click="stepDown()"
          class="h-6 w-6 text-mediumBlack dark:text-slate-200 cursor-pointer"
        />
        <div class="w-36">
          <ButtonWithIcon @click="collectInterests()" :name="'Next'">
            <ArrowRightIcon
              class="md:h-6 md:w-6 h-4 w-4 text-white cursor-pointer ml-3"
            />
          </ButtonWithIcon>
        </div>
      </div>
    </section>

    <section v-if="stepNo == 9" class="px-4 pb-3 md:min-w-96">
      <div class="flex justify-center flex-col items-start gap-y-4 py-5">
        <CommonDotPaginator :stepNo="stepNo - 4" :total="7" />
        <div class="space-y-3">
          <p class="text-xl md:text-3xl font-bold text-start text-mediumBlack">
            Show off your style!
          </p>
          <p class="text-sm md:text-base text-center text-darkGrey">
            We'd love to see at least two photos, please.
          </p>
        </div>
      </div>

      <ContainerImagesUploader v-model="form.images" />
      <p class="text-mediumBlack text-sm md:text-base pt-5 pb-8">
        You can upload a total of 6 photos.
      </p>
      <div class="flex justify-between items-center gap-y-8 px-2">
        <ArrowLeftIcon
          class="h-5 w-5 text-darkGrey cursor-pointer"
          @click="stepDown()"
        />
        <div class="w-36 flex justify-end">
          <ButtonWithIcon
            v-if="imageStore.profileImageUrl.length >= 2"
            :name="'Next '"
            @click="
              () => {
                collectImages();
                submit();
              }
            "
          >
            <ArrowRightIcon class="h-5 w-5 ml-5" />
          </ButtonWithIcon>
        </div>
      </div>
    </section>

    <!-- <section v-if="stepNo == 5" class="px-4 pb-3">
      <div class="flex justify-center flex-col items-center gap-y-4 py-5">
        <div class="space-y-4">
          <p class="text-3xl font-semibold text-center text-mediumBlack">
            Upload Your Photo
          </p>
        </div>
      </div>

      <div>
        <FormImage2 />
      </div>

      <div class="flex justify-between items-center gap-y-8">
        <ArrowLeftIcon class="h-5 w-5 text-darkGrey cursor-pointer" @click="stepNo = 6"/>
      </div>
    </section> -->

    <section
      v-if="stepNo == 10"
      class="px-4 pb-3 max-h-[80vh] overflow-y-scroll"
    >
      <div class="flex justify-center flex-col items-center gap-y-4 py-5">
        <CommonDotPaginator :stepNo="stepNo - 4" :total="7" />
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
          <ButtonWithIcon v-else :name="'Next '" @click="stepNo = 11">
            <ArrowRightIcon class="h-5 w-5 ml-5" />
          </ButtonWithIcon>
        </div>
      </div>
    </section>

    <section v-if="stepNo == 11" class="px-7 md:px-4 pb-3 md:w-96 mx-auto">
      <div class="flex justify-center flex-col items-center gap-y-4 py-5">
        <div>
          <img
            src="../../assets/images/logo/logoMobile.svg"
            class="h-12 w-12"
          />
        </div>
        <p class="text-lg font-medium text-center text-mediumBlack">
          Welcome to Freundify
        </p>
      </div>

      <div>
        <p class="text-3xl font-medium text-center text-mediumBlack">
          Hey, <span class="font-bold">Alia Ayesha</span>
        </p>
        <p class="text-gray-500 pt-5 text-lg text-center">
          Your Gateway to New Connections <br />
          and Lasting Freindships!
        </p>
      </div>

      <div
        class="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-y-8 pt-10"
      >
        <ButtonLogin
          name="Complete my profile"
          classes="text-sm bg-gradient-to-r from-primary to-secondary  px-6 p-2 rounded-full text-white"
        />

        <ButtonLogin
          name="Go to home"
          @click="close"
          classes="text-sm bg-black  px-6 p-2 rounded-full text-white"
        />
      </div>
    </section>
  </ModalContainer>
</template>
