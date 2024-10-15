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

const props = defineProps({
  modelValue: [String, Number, Boolean],
  shouldOpenModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updateInput"]);
const router = useRouter();

// apis
let otpSendApi = api() + "/api/auth/forget/password/otp/send";
let resendOTPApi = api() + "/api/auth/resend/otp";
let passwordSettingApi = api() + "/api/auth/forget/password/otp/verify";

const crud = useCrud();

let openModal = ref(props.shouldOpenModal);
const form = ref({
  email: "",
  otp: "",
  password: "",
  confirm_password: "",
});

const errors = ref({
  topErrorMsg: "",
  email: "",
  otp: "",
  password: "",
  confirm_password: "",
});

const isImageVarified = ref(false);
const startTimer = ref(true);

const stepNo = ref(1);

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const sendOTP = async () => {
  errors.value.topErrorMsg = "";
  errors.value.email = "";
  let data = {
    email: form.value.email,
  };
  await crud
    .store({
      body: data,
      path: otpSendApi,
    })
    .then((res) => {
      stepNo.value = 2;
      if (res.status == 200) {
        showToast("Otp Sended successful");
        stepNo.value = 2;
      } else {
        if (typeof res.message == "string") {
          errors.value.topErrorMsg = res.message;
          return;
        }
        errors.value.email = res.message.errors.email[0]
          ? res.message.errors.email[0]
          : "";
        showToast("Otp Send Failed", "error", 5000);
      }
    });
};

const close = () => {
  stepNo.value = 1;

  clearForm();
  openModal.value = false;
  emit("updateInput", openModal.value);
};

const clearForm = () => {
  form.value.email = "";
  form.value.password = "";
  form.value.confirm_password = "";
  form.value.otp = "";

  errors.value.email = "";
  errors.value.password = "";
  errors.value.confirm_password = "";
  errors.value.otp = "";
  errors.value.topErrorMsg = "";
};

const resendOTP = async () => {
  startTimer.value = true;
  let data = {
    email: form.value.email,
  };
  await crud
    .store({
      body: data,
      path: resendOTPApi,
    })
    .then((res) => {
      // errors.value.otp = res.message;
      console.log(res);
      if (res.status == 200) {
      } else {
        showToast("Otp Send Failed", "error", 5000);
      }
    });
};

const emptyErrors = () => {
  errors.value.email = "";
  errors.value.otp = "";
  errors.value.password = "";
  errors.value.confirm_password = "";
};

const submit = async () => {
  emptyErrors();
  let formData = {
    email: form.value.email,
    otp: form.value.otp,
    password: form.value.password,
    confirm_password: form.value.confirm_password,
  };

  await crud
    .store({
      body: formData,
      path: passwordSettingApi,
    })
    .then((res) => {
      if (res.status == 200) {
        showToast("Password Reset successful");
        close();
      } else {
        console.log(typeof res.message);

        if (typeof res.message == "string") {
          errors.value.otp = res.message;
        } else {
          // errors.value.email = res.message.errors.email[0]
          //   ? res.message.errors.email[0]
          //   : "";
          errors.value.password = res.message.errors.password
            ? res.message.errors.password[0]
            : "";
          errors.value.confirm_password = res.message.errors.confirm_password
            ? res.message.errors.confirm_password[0]
            : "";
          errors.value.otp = res.message.errors.otp
            ? res.message.errors.otp[0]
            : "";
        }

        showToast("Password Reset Failed", "error", 5000);
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
  <ModalContainer
    :shouldOpen="openModal"
    @update-input="close"
    :showCloseBtn="true"
  >
    <section v-if="stepNo == 1">
      <div class="flex justify-center flex-col items-center gap-y-2">
        <img src="../../assets/images/logo/logoSmall.png" alt="" />
        <p class="text-4xl font-semibold text-mediumBlack text-center">
          Welcome to Freundify
        </p>
        <p class="text-lg">Meet new peoplsdfse today</p>
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
            :oldValue="form.email"
            :required="false"
          />
        </div>
        <!-- <div class="mb-2">
          <FormPassword
            v-model="form.password"
            :title="'password'"
            :label="'password'"
            :type="'password'"
            :error="''"
            :oldValue="''"
            :required="false"
          />
        </div> -->

        <div class="mb-5 mt-5 text-center space-y-1">
          <ButtonLarge @click="sendOTP" :name="'Send OTP'" />
        </div>
      </div>
    </section>

    <section v-if="stepNo == 2">
      <div class="flex justify-center flex-col items-center gap-y-2">
        <img src="../../assets/images/logo/logoSmall.png" alt="" />
        <p
          class="text-2xl md:text-4xl font-semibold text-center text-mediumBlack"
        >
          Verify OTP
        </p>
        <p class="text-lg text-center text-darkGrey">
          An OTP has been sent to your email. Please verify to proceed.
        </p>

        <p class="text-red-600 font-base">
          {{ errors.otp }}
        </p>
        <CommonSimpleTimer
          :start="startTimer"
          :totalSecond="120"
          @timerStart="() => (startTimer = false)"
        >
          <p class="text-gray-600 font-medium">
            Don't have it?
            <span
              @click="resendOTP()"
              class="font-bold text-primary cursor-pointer"
              >Resend</span
            >
          </p>
        </CommonSimpleTimer>
      </div>

      <div class="py-5 space-y-2">
        <p class="text-base font-semibold text-slate-800">Enter your otp</p>
        <FormOtp @update-input="(dt) => (form.otp = dt)" />
      </div>
      <div class="mb-2 mt-5">
        <FormPassword
          v-model="form.password"
          :title="'password'"
          :label="'password'"
          :type="'password'"
          :error="errors.password"
          :oldValue="''"
          :required="false"
        />
      </div>

      <div class="mb-2 mt-3">
        <FormPassword
          v-model="form.confirm_password"
          :title="'confirm_password'"
          :label="'confirm_password'"
          :type="'password'"
          :error="''"
          :oldValue="errors.confirm_password"
          :required="false"
        />
      </div>
      <div class="flex justify-between w-full items-center gap-y-2 pt-6">
        <ArrowLeftIcon class="h-6 w-6 text-slate-700" @click="stepNo = 1"/>

        <div class="w-36">
          <ButtonLarge @click="submit" :name="'Verify'" />
        </div>
      </div>
    </section>
  </ModalContainer>
</template>
