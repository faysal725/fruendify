<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: [String, Number, Boolean],
  shouldOpenModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updateInput"]);
let openModal = ref(props.shouldOpenModal);
const form = {
  email: "",
  password: "",
  age: "",
  male: "",
  female: "",
  others: "",
  hobbies: "",
  interested: "",
};

const errors = ref({
  email: "",
  password: "",
  age: "",
  male: "",
  female: "",
  others: "",
  hobbies: "",
  interested: "",
});

const stepNo = ref(1);

let hobbies = ref([
  {
    id: 26,
    name: "Sports",
  },
  {
    id: 18,
    name: "Reading Books",
  },
  {
    id: 20,
    name: "Travelling",
  },
  {
    id: 11,
    name: "Domestic horticulture",
  },
  {
    id: 9,
    name: "Bank",
  },
]);

let interests = ref([
  { id: 1, name: "Coffee", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 2, name: "Hiking", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 3, name: "Cyclying", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 4, name: "Coffee", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 5, name: "Hiking", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 6, name: "Cyclying", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 7, name: "Coffee", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 8, name: "Hiking", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 9, name: "Cyclying", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 10, name: "Hiking", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 11, name: "Cyclying", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 12, name: "Coffee", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 13, name: "Hiking", imgSrc: "~~/assets/images/interest/1.png" },
  { id: 14, name: "Cyclying", imgSrc: "~~/assets/images/interest/1.png" },
]);

const change = () => {
  // open.value = true
  openModal.value = true;
};

const close = () => {
  openModal.value = false;
  emit("updateInput", openModal.value);
};

watch(
  () => props.shouldOpenModal,
  () => {
    openModal.value = props.shouldOpenModal;
  },
  { deep: true }
);

watch(
  () => form.value,
  () => {
  },
  { deep: true }
);
</script>

<template>
  <ModalContainer
    :shouldOpen="openModal"
    :classes="stepNo === 6 ? 'max-w-lg md:max-w-4xl' : 'sm:w-full sm:max-w-lg'"
    @update-input="close"
  >
    <section class="py-5">
      <CommonDotPaginator :stepNo="stepNo" />
      <div v-if="stepNo == 1">
        <div
          class="mt-4 px-4 flex flex-col items-center justify-center pt-7 gap-6"
        >
          <div class="rounded-full overflow-hidden">
            <img src="../../assets/images/register/lgAvatar.png" alt="" />
          </div>
          <p class="text-lg font-semibold">Aliaayesa23@mail.com</p>
          <p class="text-2xl md:text-4xl font-semibold text-center">
            Welcome to Freundify Alia Ayesha
          </p>
          <p class="text-base text-black text-center">
            Providing your responses to the upcoming questions will enable us to
            curate ideas that align perfectly with your preferences.
          </p>
        </div>
        <div class="p-4 px-14 text-center">
          <ButtonLarge @click="stepNo= 2" :name="'Next response'" />
          <p class="pt-5 pb-3">
            <span class="text-base text-gray-600 font-medium"
              >Already a member?</span
            >
            <span class="text-red-500 font-bold"> Log In </span>
          </p>
        </div>
      </div>

      <div v-if="stepNo == 2">
        <div class="px-4 py-7">
          <p
            class="text-2xl md:text-4xl font-semibold text-center text-mediumBlack"
          >
            Gender
          </p>
        </div>
        <div class="p-4 text-center flex flex-col items-start gap-y-6">
          <FormCheckbox
            v-model="form.female"
            :title="'Female'"
            :label="'Female'"
            :oldValue="errors.female"
            :required="false"
          />

          <FormCheckbox
            v-model="form.male"
            :title="'male'"
            :label="'male'"
            :type="'checkbox'"
            :oldValue="errors.male"
            :required="false"
          />
          <FormCheckbox
            v-model="form.others"
            :title="'others'"
            :label="'others'"
            :type="'checkbox'"
            :oldValue="errors.others"
            :required="false"
          />
        </div>

        <div class="px-14 pt-5 flex flex-col gap-y-8">
          <ButtonLarge @click="stepNo= 3" :name="'Next response'" />
          <p class="pb-3 text-center">
            <span class="text-base text-gray-600 font-medium"
              >Already a member?</span
            >
            <span class="text-red-500 font-bold"> Log In </span>
            Instead
          </p>
        </div>
      </div>

      <div v-if="stepNo == 3">
        <div class="px-4 py-7">
          <p
            class="text-2xl md:text-4xl font-semibold text-center text-mediumBlack"
          >
            Birth Date
          </p>
        </div>
        <div class="p-4 text-center gap-y-6">
          <!-- <div>
              <label for="dateInput">asdf
              <input type="date" class="border border-black w-full outline-none text-2xl text-darkGrey" id="dateInput"></label>
            </div> -->
          <p class="text-3xl font-semibold text-gray-400">dd/mm/yyyy</p>
        </div>

        <div class="px-14 pt-5 flex flex-col gap-y-8">
          <ButtonLarge @click="stepNo= 4" :name="'Next response'" />
          <p class="pb-3 text-center">
            <span class="text-base text-gray-600 font-medium"
              >Already a member?</span
            >
            <span class="text-red-500 font-bold"> Log In </span>
            Instead
          </p>
        </div>
      </div>

      <div v-if="stepNo == 4">
        <div class="px-4 py-7">
          <p
            class="text-2xl md:text-4xl font-semibold text-center text-mediumBlack"
          >
            Your Location
          </p>
        </div>
        <div class="p-4 text-center gap-y-6">
          <p class="text-3xl font-semibold text-gray-400">Map</p>
        </div>

        <div class="px-14 pt-5 flex flex-col gap-y-8">
          <ButtonLarge @click="stepNo= 5" :name="'Next response'" />
          <p class="pb-3 text-center">
            <span class="text-base text-gray-600 font-medium"
              >Already a member?</span
            >
            <span class="text-red-500 font-bold"> Log In </span>
            Instead
          </p>
        </div>
      </div>

      <div v-if="stepNo == 5">
        <div class="px-4 py-7">
          <p
            class="text-2xl md:text-4xl font-semibold text-center text-mediumBlack"
          >
            Hobbies
          </p>
        </div>
        <div class="p-4 text-center gap-y-6">
          <FormMultipleSelect2
            v-model="form.hobbies"
            :title="''"
            :options="hobbies"
          />
        </div>

        <div class="px-4 pt-5 flex justify-between gap-y-8">
          <p
            class="pb-3 text-center text-sm text-mediumBlack flex items-center gap-3"
          >
            <img src="../../assets/images/register/checkbox.png" alt="" />
            Select 3 hobbies to proceed
          </p>
          <ButtonLogin
          @click="stepNo= 6"
            name="Next response"
            classes="text-sm bg-secondary font-normal"
          />
        </div>
      </div>

      <div v-if="stepNo == 6">
        <div class="px-4 py-7">
          <p
            class="text-2xl md:text-4xl font-semibold text-center text-mediumBlack"
          >
            Interest
          </p>
        </div>
        <div class="p-4 text-center gap-y-6">
          <FormImageSelector :options="interests" v-model="form.interested" />
        </div>

        <div class="px-4 pt-5 flex justify-between gap-y-8">
          <p
            class="pb-3 text-center text-sm text-mediumBlack flex items-center gap-3"
          >
            <img src="../../assets/images/register/checkbox.png" alt="" />
            Select 3 hobbies to proceed
          </p>
          <ButtonLogin
          @click="stepNo= 7"
            name="Next response"
            classes="text-sm bg-secondary font-normal"
          />
        </div>
      </div>

      <div v-if="stepNo == 7">
        <div
          class="mt-4 px-4 flex flex-col items-center justify-center pt-7 gap-3 pb-5"
        >
          <div class="relative">
            <div class="rounded-full overflow-hidden">
              <img src="../../assets/images/register/lgAvatar.png" alt="" />
            </div>
            <span
              class="h-10 w-10 block absolute bottom-0 -right-4 border border-red-600 rounded-full cursor-pointer bg-white"
            ></span>
          </div>
          <p class="text-2xl font-semibold text-mediumBlack">Alia Aysha</p>
          <p class="text-md font-normal text-darkGrey">Aliaayesa23@mail.com</p>
        </div>

        <div class="px-6">
          <div class="grid grid-cols-9 gap-2 border-y py-10">
            <p class="col-span-4 text-gray-600 font-medium text-lg">Name:</p>
            <p class="col-span-4 text-gray-600 font-medium text-lg">
              Alia Aysha
            </p>
            <div class="flex justify-end">
              <img
                src="../../assets/images/register/edit.png"
                alt=""
                class="h-5 w-5"
              />
            </div>

            <p class="col-span-4 text-gray-600 font-medium text-lg">Gender:</p>
            <p class="col-span-4 text-gray-600 font-medium text-lg">Female</p>
            <div class="flex justify-end">
              <img
                src="../../assets/images/register/edit.png"
                alt=""
                class="h-5 w-5"
              />
            </div>

            <p class="col-span-4 text-gray-600 font-medium text-lg">
              Birthday:
            </p>
            <p class="col-span-4 text-gray-600 font-medium text-lg">
              12/5/2005
            </p>
            <div class="flex justify-end">
              <img
                src="../../assets/images/register/edit.png"
                alt=""
                class="h-5 w-5"
              />
            </div>
          </div>
        </div>

        <div class="p-4 flex justify-center items-center gap-x-8 pt-8">
          <p class="font-medium text-mediumBlack">Edit Profile Info</p>
          <div class="w-40">
            <NuxtLink to="/" ><ButtonLarge :name="'Go To Home'" /></NuxtLink>
            
          </div>
        </div>
      </div>
    </section>
  </ModalContainer>
</template>
