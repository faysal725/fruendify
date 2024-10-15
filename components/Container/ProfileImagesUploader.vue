<script setup>
import {
  MapPinIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  CheckCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
import { useImageStore } from "~~/stores/imageStore";
import { useProfileStore } from "~~/stores/profileStore";
import { useCrud } from "~~/composables/base";

const profileImageUpdateApi = api() + "/api/auth/user-images/update";
const imageDeleteApi = api() + "/api/auth/delete/user/image";

const crud = useCrud();

const imageStore = useImageStore();
const {
  setImages,
  getImageStatus,
  getImages,
  removeImages,
  clearImages,
  removeFiles,
  setImagesFiles,
} = imageStore;

const profileStore = useProfileStore();
const { saveProfileData, setLoaderState, getLoaderState, setShouldReload } =
  profileStore;

const imgData = ref({
  image: null,
  images: [],
});
const emptyImageData = ref(false);
const imageContainerUpdateKey = ref(123);
// const myComponentRef = ref(null);

// async function convertToFormData() {
//   const formData = new FormData();
//   imgData.value.images.forEach((file, index) => {
//     formData.append("images", file);
//   });

//   return formData;
// }

async function convertToFormData() {
  const formData = new FormData();
  imageStore.imageFiles.forEach((file, index) => {
    if (file.imgSrc !== null) {
      formData.append("images", file.imgSrc);
    }
  });

  return formData;
}

const clickOnInput = () => {
  const inputElement = document.getElementById("avatar");
  inputElement.click();
};

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
};

const deleteSingleImage = async (data) => {
  console.log(data._id);
  let imageData = {
    imageUid: data._id,
  };

  setLoaderState("pending");
  setShouldReload(false);

  await crud
    .store({
      body: imageData,
      path: imageDeleteApi,
    })
    .then((res) => {
      if (res.status == 422) {
        setLoaderState("failed");
        showToast("Update Failed", "error", 5000);
      }
      if (res.status == 200) {
        setLoaderState("resolved");
        setShouldReload(true);
        showToast("Update successful");
        clearImages();
      }
      imgData.value.image = null;
      imgData.value.images = [];
    });
};

const submit = async () => {
  emptyImageData.value = false;
  let data = await convertToFormData();

  console.log(data, "profile image");
  setLoaderState("pending");
  setShouldReload(false);

  await crud
    .store({
      body: data,
      path: profileImageUpdateApi,
    })
    .then((res) => {
      if (res.status == 422) {
        emptyImageData.value = true;
        setLoaderState("failed");
        showToast("Update Failed", "error", 5000);
      }
      if (res.status == 200) {
        emptyImageData.value = true;
        setLoaderState("resolved");
        setShouldReload(true);
        showToast("Update successful");
        clearImages();
      }
      imgData.value.image = null;
      imgData.value.images = [];
    });
};

const removeSingleImage = (index) => {
  removeImages(index);
  removeFiles(index)

  imgData.value.images.splice(index, 1);
};
// watch(
//   () => imgData.value.image,
//   () => {
//     console.log(imgData.value.image)
//     imgData.value.images.push(imgData.value.image);
//   }
// );


onMounted(() => {
  clearImages();
})

watch(
  () => imgData.value.image,
  () => {
    console.log(imgData.value.image);
    setImagesFiles(imgData.value.image);
  }
);

</script>

<template>
  <section>
    <div class="flex justify-center">
      <FormImage2
        v-show="false"
        v-model="imgData.image"
        :emptyImage="emptyImageData"
      />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div
        v-for="(data, index) in profileStore.profileData?.userImages"
        class="transition-all duration-150 hover:scale-105 relative group"
      >
        <TrashIcon
          @click="deleteSingleImage(data)"
          class="h-5 w-5 text-red-500 absolute top-2 right-2 z-10 cursor-pointer"
        />

        <img
          class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-36 w-full bg-no-repeat object-cover relative"
          :src="networkImage(data.image)"
          alt=""
        />
      </div>
      <div v-for="(data, index) in imageStore.profileImageUrl" class="">
        <div
          v-if="data"
          @click="removeSingleImage(index)"
          class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-36 w-full bg-no-repeat bg-cover bg-center relative"
          :style="{
            backgroundImage: `url(${data.imgSrc})`,
          }"
        >
          <MinusCircleIcon
            class="h-8 w-8 text-primary absolute bottom-1 right-2 z-20"
          />
        </div>

        <!-- <FormImage2 v-else /> -->
      </div>
      <div
        class="border border-lightGrey flex justify-center flex-col items-center rounded-lg h-36 w-full relative bg-gray-300 cursor-pointer transition-all duration-150 hover:scale-105 group"
        @click="clickOnInput()"
      >
        <PlusIcon
          class="h-12 w-12 text-slate-700 group-hover:rotate-90 transition-all duration-300"
        />
      </div>
    </div>
    <div
      v-if="imageStore.profileImageUrl.length > 0"
      class="flex justify-start pt-3"
    >
      <ButtonLogin
        @click="submit()"
        name="Save"
        classes="min-w-16 bg-primary text-sm btn-login rounded-lg"
      />
    </div>
  </section>
</template>
