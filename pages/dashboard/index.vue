<script setup>
import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="border border-lightGrey rounded-lg p-5 max-w-2xl">
    <div class="space-y-7">
      <div class="flex justify-between items-center">
        <p class="text-base uppercase font-semibold">Account Information</p>
        <p class="text-sm text-primary font-semibold">Not Verified</p>
      </div>
      <div class="relative w-fit">
        <div class="rounded-full overflow-hidden">
          <img src="~~/assets/images/register/lgAvatar.png" alt="" />
        </div>
        <span
          class="h-10 w-10 block absolute bottom-0 -right-4 border border-red-600 rounded-full cursor-pointer flex justify-center items-center bg-white"
        >
          <img src="~~/assets/images/accounts/camera.png" alt="" />
        </span>
      </div>

      <!-- inputs  -->
      <div>
        <div class="flex items-center gap-x-2">
          <p class="text-mediumBlack font-medium">Name</p>
          <p class="text-lightGrey">|</p>
          <p class="text-darkGrey">Edit</p>
        </div>
        <div class="max-w-sm">
          <FormInputText
            :title="''"
            :label="'name'"
            :type="'text'"
            :oldValue="'Alia Aysha'"
            :required="false"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center gap-x-2">
          <p class="text-mediumBlack font-medium">Email</p>
          <p class="text-lightGrey">|</p>
          <p class="text-darkGrey">Edit</p>
        </div>
        <div class="max-w-sm">
          <FormInputText
            :title="''"
            :label="'email'"
            :type="'text'"
            :oldValue="'Aliaayasha@gmail.com'"
            :required="false"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center gap-x-2 pb-4">
          <p class="text-mediumBlack font-medium">Gender</p>
        </div>
        <div class="flex items-center gap-x-5">
          <FormCheckbox
            :title="'male'"
            :label="'male'"
            :oldValue="true"
            :required="false"
          />
          <FormCheckbox
            :title="'Female'"
            :label="'Female'"
            :oldValue="true"
            :required="false"
          />
          <FormCheckbox
            :title="'Others'"
            :label="'Others'"
            :oldValue="true"
            :required="false"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center gap-x-2">
          <p class="text-mediumBlack font-medium">Bio</p>
          <p class="text-lightGrey">|</p>
          <p class="text-darkGrey">Edit</p>
        </div>
        <FormTextArea
          :title="''"
          :label="'email'"
          :type="'text'"
          :oldValue="'Aliaayasha@gmail.com'"
          :required="false"
        />
      </div>
    </div>
  </div>

  <div class="border border-lightGrey rounded-lg p-5 max-w-2xl my-10">
    <div class="space-y-7">
      <div class="flex justify-between items-center">
        <p class="text-base uppercase font-semibold">Security and Password</p>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex items-center gap-x-2">
        <p class="text-mediumBlack font-medium">Password</p>
        <p class="text-lightGrey">|</p>
        <p class="text-darkGrey">Change</p>
      </div>
      <div class="max-w-sm">
        <FormPassword
          :title="''"
          :label="'password'"
          :type="'password'"
          :oldValue="'123'"
          :required="false"
        />
      </div>
    </div>
  </div>
</template>
