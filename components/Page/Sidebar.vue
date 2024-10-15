<script setup>
const route = useRoute();
var routes = [
      {
        name: "Account Information",
        current: false,
        href: "/dashboard",
      },
      {
        name: "Security and Password",
        current: false,
        href: "#",
      },
      {
        name: "Privacy Settings",
        current: false,
        href: "#",
      },
      {
        name: "Verification Center",
        current: false,
        href: "#",
      },
      {
        name: "Permission",
        current: false,
        href: "#",
      },
    ]
</script>

<template>

  <!-- sidebar  -->
  <div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
    <ButtonNav :routes="routes" />
  </div>
</template>
