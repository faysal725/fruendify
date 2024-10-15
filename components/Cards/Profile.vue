<script setup>
import { EyeSlashIcon } from "@heroicons/vue/24/outline";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import { useVarifyStore } from "~/stores/varifyStore";

const props = defineProps({
  profile: {
    type: Object,
    default: {},
  },
  disableLink: {
    type: Boolean,
    default: false,
  },
});

const varifyStore = useVarifyStore();
const { getStatus, setStatus } = varifyStore;

const emit = defineEmits(["sendIdToModal", "sendIdToDetails"]);

const isVarified = ref();
let id = 123;

function metersToKilometers(meters) {
  return Math.floor(meters / 1000);
}

onMounted(() => {
  isVarified.value = getStatus();
});

watch(
  () => getStatus(),
  () => {
    isVarified.value = getStatus();
  }
);
</script>

<template>
  <div class="relative cursor-pointer">
    <div
      class="max-w-lg h-fit lg:min-h-[255px] flex flex-col gap-y-2 relative rounded-lg overflow-hidden"
    >
      <div class="h-64 w-full relative bg-no-repeat bg-cover bg-center">
        <img
        v-if="profile?.user?.profile_image"
          :src="
            networkImage(
              profile.thumbnail ? profile.thumbnail : profile.user.profile_image
            )
          "
          alt=""
          class="h-full w-full object-cover -z-10"
          :class="profile && profile?.face_blur ? 'blur-section' : ''"
        />

        <div
          class="absolute top-3 right-0 w-full flex justify-start gap-1 text-sm z-20 px-2"
        >
          <div class="flex justify-start flex-wrap gap-2">
            <p
              v-for="category in profile.category"
              class="bg-white p-1 px-2 capitalize w-fit text-primary font-normal flex items-center gap-1 rounded-full border border-primary text-xs"
            >
              <img :src="networkImage(category.image)" alt="" class="h-4 w-4" />
              {{ category.title }}
            </p>
          </div>
          <img
            v-if="isVarified"
            src="../../assets/images/event/varified.png"
            alt=""
            class="h-7 w-8 ml-auto"
          />
          <span
            v-else
            class="h-5 w-5 bg-gradient-to-br from-white to-primary rounded-full"
          ></span>
        </div>

        <div
          class="absolute bottom-1 right-0 w-full flex flex-col justify-between text-sm z-20 px-2 pb-1"
        >
          <div class="flex items-center flex-wrap">
            <p
              v-for="language in profile.language"
              class="p-1 px-1 py-0 flex items-center gap-2 w-fit text-slate-800 font-semibold mr-2 rounded-full mb-2 text-xs bg-white"
            >
              {{ language.title }}
            </p>
          </div>
          <p class="text-sm font-semibold text-white capitalize">
            {{ profile.title }}
          </p>
          <p v-if="profile.address" class="text-sm font-thin text-white">
            {{
              profile.address.length > 30
                ? profile.address.substring(0, 30) + "..."
                : ""
            }}
          </p>

          <div class="flex justify-between text-sm pt-2">
            <p class="flex items-center gap-1 text-base text-white">
              <CalendarDaysIcon class="h-5 w-5 text-white" />
              {{
                profile.event_date ? profile.event_date.substring(0, 10) : ""
              }}
            </p>
            <p class="text-center flex items-center gap-2 text-sm text-white">
              <MapPinIcon class="text-white h-5 w-5" />
              {{
                profile?.city && typeof profile?.city !== "undefined"
                  ? profile.city
                  : "None"
              }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="absolute w-full h-full top-0 right-0 bg-gradient-to-b from-transparent to-black flex justify-center items-center"
      >
        <!-- <img
          v-if="!profile.thumbnail"
          :src="networkImage(profile.user.profile_image)"
          alt=""
          class="h-full w-full object-cover"
        /> -->
      </div>

      <span
        v-if="!isVarified"
        class="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-red-900 to-slate-500/70 z-20 flex justify-center items-center"
      >
        <EyeSlashIcon class="h-10 w-10 text-white" />
      </span>
    </div>
    <span
      @click="$emit('sendIdToModal', profile._id)"
      class="absolute lg:hidden top-0 right-0 w-full h-full z-20 lg:z-0 flex justify-center items-center"
    >
    </span>
    <span
      @click="$emit('sendIdToDetails')"
      class="absolute top-0 right-0 w-full h-full z-0 lg:z-20 flex justify-center items-center"
    >
    </span>
  </div>
</template>

<style scoped>
.blur-section {
  filter: blur(5px);
}
</style>
