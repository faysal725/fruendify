<script setup>
import {
  CalendarIcon,
  UserIcon,
  UsersIcon,
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/vue/24/outline";


const route = useRoute();

const isCurrentRoute = (currentRoute) => {
  return route.path.toLowerCase().includes(currentRoute);
};
</script>

<template>
  <div class="relative z-30">
    <ul
      class="flex gap-3 h-14 items-center justify-around lg:justify-between border-t border-t-2 border-gray-300 dark:border-slate-400 md:border-b md:border-b-[1px] md:border-t-0 md:border-b-gray-200 px-4 bg-whitePrimary dark:bg-blackPrimary"
    >
      
      <NuxtLink
        to="/events"
        class="flex items-center gap-1 group cursor-pointer p-1 px-3 rounded-lg transition-all duration-500 hover:bg-primary"
        :class="isCurrentRoute('event') ? 'bg-primary' : ''"
      >
        <!-- <IconsCalender
        size="20"
        :classes="route.path == '/event' ? 'stroke-white' : 'stroke-black'"
      /> -->
        <CalendarIcon
          class="h-5 w-5 group-hover:text-white transition-all duration-150 dark:text-white"
          :class="isCurrentRoute('events') ? 'text-white' : 'text-black '"
        />
        <p
          :class="isCurrentRoute('events') ? 'w-fit scale-100 text-white' : ''"
          class="transition-all duration-150 text-xs scale-0 text-black group-hover:w-fit group-hover:scale-100 w-2 group-hover:text-white"
        >
          Events
        </p>
      </NuxtLink>

      <NuxtLink
        to="/friends"
        class="flex items-center gap-1 group cursor-pointer p-1 px-3 rounded-lg transition-all duration-500 hover:bg-primary"
        :class="isCurrentRoute('friends') ? 'bg-primary' : ''"
      >
        <UsersIcon
          class="h-5 w-5 group-hover:text-white transition-all duration-150 dark:text-white"
          :class="isCurrentRoute('friends') ? 'text-white' : 'text-black '"
        />

        <p
          :class="isCurrentRoute('friends') ? 'w-fit scale-100 text-white' : ''"
          class="transition-all duration-150 text-xs scale-0 text-black group-hover:w-fit group-hover:scale-100 w-2 group-hover:text-white"
        >
          Friends
        </p>
      </NuxtLink>

      <!-- <div
        @click="showNotificationBar = !showNotificationBar"
        class="flex items-center gap-1 group cursor-pointer p-1 px-3 rounded-lg transition-all duration-500 hover:bg-primary"
        :class="isCurrentRoute('notification') ? 'bg-primary' : ''"
      >
        <BellIcon
          class="h-5 w-5 group-hover:text-white transition-all duration-150 dark:text-white"
          :class="isCurrentRoute('notification') ? 'text-white' : 'text-black '"
        />

        <p
          :class="
            isCurrentRoute('notification') ? 'w-fit scale-100 text-white' : ''
          "
          class="transition-all duration-150 text-xs scale-0 text-black group-hover:w-fit group-hover:scale-100 w-2 group-hover:text-white"
        >
          Notification
        </p>
      </div> -->

      <NuxtLink
        to="/messages"
        class="flex items-center gap-1 group cursor-pointer p-1 px-3 rounded-lg transition-all duration-500 hover:bg-primary"
        :class="isCurrentRoute('messages') ? 'bg-primary' : ''"
      >
        <ChatBubbleBottomCenterTextIcon
          class="h-5 w-5 group-hover:text-white transition-all duration-150 dark:text-white"
          :class="isCurrentRoute('messages') ? 'text-white' : 'text-black '"
        />
        <p
          :class="
            isCurrentRoute('messages') ? 'w-fit scale-100 text-white' : ''
          "
          class="transition-all duration-150 text-xs scale-0 text-black group-hover:w-fit group-hover:scale-100 w-2 group-hover:text-white"
        >
          Messages
        </p>
      </NuxtLink>

      <NuxtLink
        to="/profile"
        class="flex items-center gap-1 group cursor-pointer p-1 px-3 rounded-lg transition-all duration-500 hover:bg-primary"
        :class="isCurrentRoute('profile') ? 'bg-primary' : ''"
      >
        <UserIcon
          class="h-5 w-5 group-hover:text-white transition-all duration-150 dark:text-white"
          :class="isCurrentRoute('profile') ? 'text-white' : 'text-black '"
        />
        <p
          :class="
            isCurrentRoute('profile') ? 'w-fit scale-100 text-white' : ''
          "
          class="transition-all duration-150 text-xs scale-0 text-black group-hover:w-fit group-hover:scale-100 w-2 group-hover:text-white"
        >
          Profile
        </p>
      </NuxtLink>
    </ul>


  </div>
</template>




<!-- <div
class="absolute top-14 right-0 h-96 w-full overflow-y-scroll bg-whitePrimary dark:bg-blackPrimary -z-10 transition-all duration-200 scrollbar-hide border border-t-0 rounded-b-lg"
:class="showNotificationBar ? ' translate-y-16' : '-translate-y-full'"
>
<p class="px-3 text-lg font-bold py-3 dark:text-white">
  Latest Notifications
</p>
<CardsNotification2 v-for="data in [1, 2, 3, 4, 5, 6]" />
</div> -->
