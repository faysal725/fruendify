<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { useMediaQuery } from "@vueuse/core";


const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const isMediumScreen = useMediaQuery("(min-width: 768px)");
const isSmallScreen = useMediaQuery("(max-width: 640px)");

const noOfSlide = ref(4)


onMounted(() => {
  if (isLargeScreen.value) {
    noOfSlide.value = 4
  }else if(isMediumScreen.value){
    
    noOfSlide.value = 3
  } else if(isSmallScreen.value){
    noOfSlide.value = 2
  }
})


watch(
	() => isLargeScreen,
	() => {
        if (isLargeScreen.value) {
            noOfSlide.value = 4
        }
	},
	{deep: true}
)

watch(
	() => isMediumScreen,
	() => {

        if (isMediumScreen.value) {
            noOfSlide.value = 3
        }
	},
	{deep: true}
)

watch(
	() => isSmallScreen,
	() => {


        if (isSmallScreen.value) {
            noOfSlide.value = 2
        }
	},
	{deep: true}
)
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-2">
    <PageSectionHeader
      title="Stories of Satisfaction!"
      description="Find out why our products and service are winning hearts and earning five-star ratings from satisfied customers worldwide."
    />
    <div class="">
      <ContainerSlider :perSlide="noOfSlide">
        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/stories/slide1.png')] bg-no-repeat bg-center flex justify-center items-center py-48 "
            >
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/stories/slide2.png')] bg-no-repeat bg-center flex justify-center items-center py-48"
            >
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/stories/slide3.png')] bg-no-repeat bg-center flex justify-center items-center py-48"
            >
            </div>
          </div>
        </swiper-slide>

        
        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/stories/slide4.png')] bg-no-repeat bg-center flex justify-center items-center py-48"
            >
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/stories/slide1.png')] bg-no-repeat bg-center flex justify-center items-center py-48"
            >
            </div>
          </div>
        </swiper-slide>
      </ContainerSlider>
    </div>
  </section>
</template>
