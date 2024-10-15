<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import {
  MapPinIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  EyeIcon
} from "@heroicons/vue/24/solid";
import { useImageStore } from "~~/stores/imageStore";
import { useCrud } from "~~/composables/base";

const props = defineProps({
  pageType: {
    type: String,
    default: "",
  },
});

const logoutApi = api() + "/api/auth/logout";

const crud = useCrud();

const profileStore = useProfileStore();
const { clearProfileData } = profileStore;

const authStore = useAuthStore();
const { clearAuthUser } = authStore;

const router = useRouter();

const profiles = ref([
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/4.png",
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/5.png",
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/3.png",
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/2.png",
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/3.png",
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
  },
  {
    title: "Going to a Coffee Date",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!",
    date: "July 25, 2022",
    address: "Singapore",
    language: "En, Jpn",
    distance: "800",
    type: "dating",
    imgSrc: "/profilecard/3.png",
    allImages: [
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
      "/profilecard/1.png",
    ],
  },
]);

const additionalImages = ref([
  "/profilePg/2.png",
  "/profilePg/3.png",
  "/profilePg/4.png",
  "/profilePg/5.png",
  "/profilePg/6.png",
  "/profilePg/7.png",
]);

const eventList = ref([
  { id: 0, name: "Cycling", imgSrc: "/cycling.png" },
  { id: 1, name: "Boating", imgSrc: "/boating.png" },
  { id: 2, name: "dance", imgSrc: "/dance.png" },
  { id: 3, name: "drinking", imgSrc: "/drinking.png" },
  { id: 4, name: "hangout", imgSrc: "/hangout.png" },
  { id: 5, name: "hiking", imgSrc: "/hiking.png" },
  { id: 6, name: "party", imgSrc: "/party.png" },
]);
const route = useRoute();
const currentTab = ref(1);
let allTabs = [
  { key: 1, value: "About", href: "/event/discover-event" },

  { key: 2, value: "Photo", href: "/event/my-event" },
  { key: 3, value: "Interests", href: "/event/upcomming-event" },
];

const imageStore = useImageStore();
const { setImages, getImageStatus, getImages } = imageStore;

const isCurrentRoute = (currentRoute) => {
  return route.path.toLowerCase().includes(currentRoute);
};

const showToast = async (message) => {
  await useNuxtApp().$toast.info(message);
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
  <div class="grid grid-cols-12 cursor-default">
    <div class="col-span-12 mb-10">
      <div
        class="bg-whitePrimary dark:bg-blackPrimary p-4 rounded-xl min-h-screen"
      >
        <!-- heading  -->
        <div class="flex justify-between pb-5">
          <div class="flex gap-2 items-center">
            <ButtonBack />
            <p class="text-base font-bold dark:text-white">Profile</p>
          </div>
          <div class="space-x-3 bg-gradient-to-t h-fit flex">
            <NuxtLink to="/profile/edit/">
              <ButtonWithIcon
                name=""
                :classes="
                  isCurrentRoute('edit')
                    ? 'text-white bg-gradient-to-t from-primary to-secondary p-1 px-3 w-fit rounded-tl-md rounded-bl-md'
                    : ' text-white bg-stone-500 p-1 px-3 w-fit rounded-tl-md rounded-bl-md'
                "
              >
                <PencilSquareIcon
                  :class="!isCurrentRoute('edit') ? 'h-6 w-6' : 'h-6 w-6'"
                />
              </ButtonWithIcon>
            </NuxtLink>

            <NuxtLink to="/profile/">
              <!-- <ButtonLogin
                name="Preview"
                :classes="
                  !isCurrentRoute('edit')
                    ? 'text-white  p-1 px-3  md:min-w-24  rounded-tr-md rounded-br-md bg-gradient-to-t from-primary to-secondary'
                    : 'text-white  p-1 px-3  md:min-w-24  rounded-tr-md rounded-br-md  bg-stone-500'
                "
              /> -->

              <ButtonWithIcon
                name=""
                :classes="
                  !isCurrentRoute('edit')
                    ? 'text-white  p-1 px-3  w-fit rounded-tr-md rounded-br-md bg-gradient-to-t from-primary to-secondary'
                    : 'text-white  p-1 px-3  w-fit rounded-tr-md rounded-br-md  bg-stone-500'
                "
              >
                <EyeIcon
                  :class="!isCurrentRoute('edit') ? 'h-6 w-6' : 'h-6 w-6'"
                />
              </ButtonWithIcon>
            </NuxtLink>

            <ButtonLogin
              @click="logoutUser"
              name="Logout"
              :classes="'block lg:hidden text-white  p-1 px-3  md:min-w-24  rounded-md  bg-gradient-to-t from-primary to-secondary'"
            />
          </div>
        </div>

        <div>
          <!-- tabs  -->
          <CommonTab
            v-model="currentTab"
            :tabData="allTabs"
            pageName="profile"
          />
        </div>
        <section class="grid grid-cols-12">
          <!-- profile  -->
          <section class="col-span-12">
            <ContainerProfileSummery
              :pageType="pageType"
              v-if="currentTab == 1"
            />
            <ContainerProfilePhotos
              v-if="currentTab == 2"
              :pageType="pageType"
            />

            <ContainerProfileInterests
              :pageType="pageType"
              v-if="currentTab == 3"
            />
          </section>
        </section>
      </div>
    </div>
  </div>
</template>
