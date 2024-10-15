<script setup>
import { useCrud } from "~~/composables/base";
import { useProfileStore } from "~~/stores/profileStore";
import { useAuthStore } from "~/stores/authStore";

const resetPasswordApi = api() + "/api/auth/reset/password";
const logoutApi = api() + "/api/auth/logout";

const crud = useCrud();

const profileStore = useProfileStore();
const {
  saveProfileData,
  setLoaderState,
  getLoaderState,
  setShouldReload,
  clearProfileData,
} = profileStore;

const authStore = useAuthStore();
const { clearAuthUser } = authStore;

let openModal = ref(false);
const router = useRouter();

const resetForm = ref({
  old_password: null,
  password: null,
  confirm_password: null,
});

const resetFormError = ref({
  old_password: "",
  password: "",
  confirm_password: "",
  errorMessage: "",
});

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const close = () => {
  openModal.value = false;
};

const passwordReset = async () => {
  // setLoaderState("pending");
  // setShouldReload(false);
  resetFormError.value.errorMessage = "";
  if (
    resetForm.value.old_password &&
    resetForm.value.password &&
    resetForm.value.confirm_password 
  ) {
    await crud
      .store({
        body: resetForm.value,
        path: resetPasswordApi,
      })
      .then((res) => {
        if (res.status == 200) {
          // setLoaderState("resolved");
          // setShouldReload(true);
          showToast("Password Reset successful");
          logoutUser();
        } else {
          console.log(res)
          if (res.message.errors) {
            resetFormError.value.errorMessage = res.message.errors[Object.keys(res.message.errors)[0]][0]
            console.log(resetFormError.value)
          }else{
            resetFormError.value.errorMessage = res.message;

          }
          setLoaderState("failed");
          showToast("Password Reset Failed", "error", 5000);
        }
      });
  } 
};

const logoutUser = async () => {
  await crud
    .store({
      body: {},
      path: logoutApi,
    })
    .then((res) => {
      if (res.status == 422) {
        clearProfileData();
        clearAuthUser();
        showToast("Logout successful");
        router.push("/");
      }
      if (res.status == 200) {
        clearProfileData();
        clearAuthUser();
        showToast("Logout successful");
        router.push("/");
      }
    });
};
</script>

<template>
  <ButtonWithIcon
    name=""
    classes="text-white  p-1 w-fit rounded-md rounded-bl-md bg-gradient-to-t from-primary to-secondary"
    @click="openModal = true"
  >
    <img
      src="~~/assets/images/forgetPass/resetPass.png"
      alt=""
      class="h-6 w-6"
    />
  </ButtonWithIcon>

  <!-- reset password modal  -->
  <ModalContainer
    :shouldOpen="openModal"
    @update-input="close"
    classes="bg-whitePrimary dark:bg-blackPrimary w-full md:max-w-lg "
    :showCloseBtn="true"
  >
    <div class="flex justify-center flex-col items-center gap-3">
      <p class="text-xl text-secondary font-semibold">Reset Password</p>
      <p class="text-sm text-red-600 font-base">
        {{ resetFormError.errorMessage }}
      </p>
    </div>

    <div class="mt-4">
      <div class="mb-2">
        <FormInputText2
          v-model="resetForm.old_password"
          :title="'Old Password'"
          :label="'old-password'"
          :type="'text'"
          :error="resetFormError.old_password"
          :oldValue="''"
          :placeholder="'Enter Old Password'"
          :required="false"
        />
      </div>
      <div class="mb-2">
        <FormPassword
          v-model="resetForm.password"
          :title="''"
          :label="'password'"
          :type="'password'"
          :error="resetFormError.password"
          :oldValue="''"
          :placeholder="'Enter New Password'"
          :required="false"
        />
      </div>
      <div class="mb-2">
        <FormPassword
          v-model="resetForm.confirm_password"
          :title="''"
          :label="'password'"
          :type="'password'"
          :error="resetFormError.confirm_password"
          :oldValue="''"
          :placeholder="'Confirm New Password'"
          :required="false"
        />
      </div>
      <div class="flex justify-end pt-6">
        <ButtonLogin
          @click="passwordReset()"
          name="Reset"
          classes="text-white  p-1 w-full rounded-md bg-gradient-to-t from-primary to-secondary"
        />
      </div>
    </div>
  </ModalContainer>
</template>
