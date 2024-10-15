<script setup>
import { useAuthStore } from "~~/stores/authStore";

// store
const authStore = useAuthStore();

const shouldImgBlur = ref(false);
let loginUser = ref(false);
let registerUser = ref(false);
let forgetPassword = ref(false);

const change = (authType) => {
  if (authType == "login") {
    loginUser.value = true;
  } else {
    registerUser.value = true;
  }
};

const close = () => {
  registerUser.value = false;
  loginUser.value = false;
  forgetPassword.value = false;
};

// this is meetup
</script>
<template>
  <section class="py-6">
    <div class="section-container relative">
      <img
        src="~~/assets/images/meetup/video-call.png"
        class="w-full object-cover h-[500px]"
        alt=""
        :class="shouldImgBlur ? 'blur-section' : ''"
      />

      <div
        class="absolute w-full h-full bottom-0 right-0 flex justify-center items-center"
      >
        <div
          class="p-4 rounded text-center space-y-4 md:px-12 md:py-10 w-fit"
          :class="
            shouldImgBlur
              ? 'bg-gradient-to-tr from-[#FF774D] via-slate-200/85 to-slate-200/85'
              : 'bg-slate-700/20'
          "
        >
          <ButtonToggle v-model="shouldImgBlur" />

          <p class="meetup-title capitalize" :class="shouldImgBlur ? '' : 'text-white'">Control how you connect</p>
          <p class="meetup-description" :class="shouldImgBlur ? '' : 'text-slate-200'">
            Blur your face, stay safe. Protect your identity until you're ready
          </p>
          <div class="meetup-btn-container" v-if="!authStore.isLoggedIn">
            <ButtonLogin
              @click="change('register')"
              name="Join us"
              classes="text-sm md:text-base bg-primary font-base md:px-11 min-w-16 bg-primary text-sm btn-login"
            />
            <ButtonLogin
              @click="change('login')"
              name="Login"
              classes="text-sm md:text-base bg-secondary font-base md:px-11 min-w-16 bg-primary text-sm btn-login"
            />
          </div>
        </div>
      </div>
    </div>

    <section
      class="bg-gradient-to-bl from-primary to-secondary py-10 md:py-20 relative z-0"
    >
      <div class="section-container space-y-3 z-20">
        <p class="text-sm md:text-lg text-white text-center">
          Discover Connections Safety
        </p>
        <p
          class="text-xl md:text-4xl capitalize font-semibold text-white text-center"
        >
          Download Our app today
        </p>
        <div class="flex justify-center gap-6 md:pt-6">
          <button>
            <img
              class="h-8 md:h-12"
              src="../../assets/images/howWorks/googlePlay.png"
              alt=""
            />
          </button>
          <button>
            <img
              class="h-8 md:h-12"
              src="../../assets/images/howWorks/appStore.png"
              alt=""
            />
          </button>
        </div>
      </div>

      <img
        class="absolute left-0 bottom-0 z-[-1] hidden md:block"
        src="../../assets/images/meetup/leftEllipse.png"
        alt=""
      />
      <img
        class="absolute right-0 top-0 z-[-1] hidden md:block"
        src="../../assets/images/meetup/rightEllipse.png"
        alt=""
      />
    </section>
  </section>

  <ContainerRegister
    :shouldOpenModal="registerUser"
    @update-input="close"
    @open-register="registerUser = true"
    @open-login="loginUser = true"
  />

  <ContainerLogin
    :shouldOpenModal="loginUser"
    @update-input="close"
    @forget-pass="
      () => {
        close();
        forgetPassword = true;
      }
    "
  />

  <ContainerForgetPassword
    :shouldOpenModal="forgetPassword"
    @update-input="close"
  />
</template>

<style scoped>
.blur-section {
  filter: blur(5px);
}
</style>
