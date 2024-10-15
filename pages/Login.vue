<script setup>
import { login, saveAuth } from "~/composables/auth";

definePageMeta({
  layout: "login",
});

const form = {
  email: "",
  password: "",
};

const errors = ref({

  email: "",
  password: "",
});


const showToast = async () => {
  await useNuxtApp().$toast.info("Logged In successfully");
};


const submit = () => {
  login(form).then((response) => {
    if (!response.error.value) {
      saveAuth(response.result.value);
      navigateTo("/dashboard").then(() => showToast());
      // router.push("/modules").then(() => showToast());
    } else {

      $showToast("Invalid Credentials", "error", 5000);
    }
  });
};

// {
//     "email": "admin@mail.com",
//     "password" : "111111"
// }
</script>

<template>
  <section class="grid grid-cols-12 gap-3 p-6 h-full">
    <div
      class="col-span-12 md:col-span-4 flex items-center rounded-md px-4 xl:px-8 2xl:px-16"
    >
      <div class="">
        <button class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            class="h-8 w-8 text-indigo-600"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <h1 class="text-xl md:text-2xl font-bold text-gray-700 py-2">
          Welcome to
          <span
            class="text-xl bg-gradient-to-r bg-clip-text text-transparent from-violet-500 via-sky-600 to-violet-700 animate-text"
            >Frendify Admin</span
          >
        </h1>
        <p class="text-base md:text-base font-medium text-gray-500">
          Sign-in to your account &amp; start an adventure
        </p>
        <div class="mt-4">
          <div class="mb-5">
            <FormInputText
                v-model="form.email"
                :title="'email'"
                :label="'email'"
                :type="'email'"
                :error="errors.email"
                :oldValue="''"
                :required="true"
              />
          </div>
          <div class="mb-5">
            <FormPassword
                v-model="form.password"
                :title="'password'"
                :label="'password'"
                :type="'password'"
                :error="errors.password"
                :oldValue="''"
                :required="true"
              />
          </div>
          <div class="mb-5">
            <button
              @click="submit"
              class="w-full bg-gradient-to-r inline-flex justify-center items-center from-indigo-500 to-violet-500 py-1 rounded-md text-base font-semibold text-white hover:g-gradient-to-r hover:from-indigo-700 hover:to-violet-600"
            >
              <span>Login</span>
            </button>
          </div>
        </div>
       
      </div>
    </div>

    <div
      class="hidden md:col-span-8 bg-[#F8F7FA] rounded-xl md:flex justify-center items-center"
    >
      <div class="max-w-[650px]">
        <img src="https://cloud.sensohearingdhaka.com/images/logo.png" alt="" />
      </div>
    </div>
  </section>
</template>
