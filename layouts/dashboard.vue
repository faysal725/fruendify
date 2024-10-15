<script setup>



</script>
<template>
    <main class="relative">
        
        <PageMenu />
        <div class="max-w-7xl mx-auto grid grid-cols-12 gap-5  pt-10">

          <div class="col-span-3 ">
            <PageSidebar />
          </div>
          <div class="col-span-9">

              <slot />
          </div>
        </div>
        
    </main>
</template>
