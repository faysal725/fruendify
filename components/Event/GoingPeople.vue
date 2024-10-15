<script setup>
// import { HeartIcon } from "@heroicons/vue/24/outline";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  UserIcon,
  MapPinIcon,
  XCircleIcon,
  HeartIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  peopleData: Object,
  disableRemove: {
    type: Boolean,
    default: false,
  },
  disableBlock: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["remove", "addtofavourite", "blockuser"]);

const isFavorite = ref(false);
const router = useRouter();

const removePeople = (id) => {
  isFavorite.value = false;
  emits("remove", id);
};

const addOrRemoveFavourite = () => {
  console.log('running', props.peopleData)
  
  // isFavourite: publicData.value.isFavourite ? false : true,
  let formData = {
    toUserId: props.peopleData.user_uid._id,
    isFavourite: props.peopleData.isFavourite ? false : true,
  };
  emits("addtofavourite", formData);
};

const blockUser = (type) => {
  let formData = {
    eventParticipentUid: props.peopleData._id,
    type: type,
  };
  emits("blockuser", formData);
};

function metersToKilometers(meters) {
  return Math.floor(meters / 1000);
}
</script>

<template>
  <div
    class="flex items-center gap-5 p-3 px-5 bg-whitePrimary dark:bg-blackPrimary cursor-default"
  >
    <img
      @click="router.push('/profile/view/' + peopleData?.user_uid._id)"
      :src="networkImage(peopleData?.user_uid.profile_image)"
      alt=""
      class="h-16 w-16 rounded-full cursor-pointer object-cover"
    />
    <div class="space-y-2">
      <p class="text-lg font-medium dark:text-white capitalize">
        {{ peopleData?.user_uid.first_name }}
      </p>
      <div class="flex items-center gap-3">
        <span
          class="flex items-center gap-1 text-darkGrey dark:text-slate-300 text-sm"
        >
          <MapPinIcon class="h-5 w-5 text-secondary" />
          {{ metersToKilometers(peopleData?.eventDistance) }} KM away
        </span>

        <span
          class="flex items-center gap-1 text-darkGrey dark:text-slate-300 text-sm"
        >
          <HeartIcon class="h-5 w-5 text-secondary" />
          {{ peopleData?.favouriteCount }}
        </span>
      </div>
    </div>

    <div class="ml-auto flex flex-col justify-between items-center gap-2">
      <div
        v-if="!disableBlock"
        class="p-1.5 px-3 rounded-md cursor-pointer"
        :class="
          peopleData?.group_status == 'UNBLOCK'
            ? 'bg-green-500'
            : 'bg-red-500'
        "
        @click="
          blockUser(peopleData?.group_status == 'UNBLOCK' ? 'BLOCK' : 'UNBLOCK')
        "
      >
        <UserIcon
          class="h-5 w-5"
          :class="
            peopleData?.group_status == 'UNBLOCK' ? 'text-white' : 'text-black'
          "
        />
      </div>

      <div
        class="p-1.5 px-3 rounded-md cursor-pointer"
        :class="
          peopleData?.isFavourite
            ? 'bg-gradient-to-t from-secondary to-primary'
            : 'bg-lightGrey'
        "
        @click="addOrRemoveFavourite()"
      >
        <HeartIcon
          class="h-5 w-5"
          :class="peopleData?.isFavourite ? 'text-white' : 'text-black'"
        />
      </div>

      <p
        v-if="!disableRemove"
        @click="removePeople(peopleData._id)"
        class="text-xs text-primary font-medium cursor-pointer"
      >
        Remove
      </p>
    </div>
  </div>
</template>
