<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { useMediaQuery } from "@vueuse/core";
import { CameraIcon } from "@heroicons/vue/24/outline";

const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const isMediumScreen = useMediaQuery("(min-width: 768px)");
const isSmallScreen = useMediaQuery("(max-width: 640px)");

const noOfSlide = ref(1);
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-2">
    <PageSectionHeader title="Testimonials About Freundify" />
    <div class="">
      <ContainerSlider :perSlide="noOfSlide">
        <swiper-slide>
          <div class="flex md:flex-row flex-col items-center justify-center gap-10 pb-20 pt-10">
            <div class="bg-orange flex justify-center items-center relative ">
              <img
                class="w-full h-full object-cover"
                src="~~/assets/images/testimonial/avatar1.png"
                alt=""
              />

              <img
                class="absolute -bottom-10 right-8 "
                src="~~/assets/images/testimonial/doublequote3.svg"
                alt=""
                style="height: 70px; width: 80px"
              />
            </div>
            <div class="flex flex-col justify-start items-start gap-3 max-w-96">
              <div class="flex items-center gap-3 ">
                <p class="text-start font-medium flex items-center gap-3 text-lg md:text-xl">
                @Courtney Henry
              </p>
              <CameraIcon class="h-6 w-6 text-primary" />
              </div>

              <p class="text-start text-sm md:text-base text-slate-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                eveniet fuga facilis fugit reiciendis, aut quae est commodi
                maiores ad?
              </p>
              <p class="text-sm md:text-base font-medium text-primary">1.5K Followers</p>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="flex md:flex-row flex-col items-center justify-center gap-10 pb-20 pt-10">
            <div class="bg-skyBlue flex justify-center items-center relative ">
              <img
                class="w-full h-full object-cover"
                src="~~/assets/images/testimonial/avatar2.png"
                alt=""
              />

              <img
                class="absolute -bottom-10 right-8 "
                src="~~/assets/images/testimonial/doublequote3.svg"
                alt=""
                style="height: 70px; width: 80px"
              />
            </div>
            <div class="flex flex-col justify-start items-start gap-3 max-w-96">
              <div class="flex items-center gap-3 ">
                <p class="text-start font-medium flex items-center gap-3 text-lg md:text-xl">
                @Courtney Henry
              </p>
              <CameraIcon class="h-6 w-6 text-primary" />
              </div>

              <p class="text-start text-sm md:text-base text-slate-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                eveniet fuga facilis fugit reiciendis, aut quae est commodi
                maiores ad?
              </p>
              <p class="text-sm md:text-base font-medium text-primary">1.5K Followers</p>
            </div>
          </div>
        </swiper-slide>

        
        <swiper-slide>
          <div class="flex md:flex-row flex-col items-center justify-center gap-10 pb-20 pt-10">
            <div class="bg-lightIndigo flex justify-center items-center relative ">
              <img
                class="w-full h-full object-cover"
                src="~~/assets/images/testimonial/avatar3.png"
                alt=""
              />

              <img
                class="absolute -bottom-10 right-8 "
                src="~~/assets/images/testimonial/doublequote3.svg"
                alt=""
                style="height: 70px; width: 80px"
              />
            </div>
            <div class="flex flex-col justify-start items-start gap-3 max-w-96">
              <div class="flex items-center gap-3 ">
                <p class="text-start font-medium flex items-center gap-3 text-lg md:text-xl">
                @Courtney Henry
              </p>
              <CameraIcon class="h-6 w-6 text-primary" />
              </div>

              <p class="text-start text-sm md:text-base text-slate-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                eveniet fuga facilis fugit reiciendis, aut quae est commodi
                maiores ad?
              </p>
              <p class="text-sm md:text-base font-medium text-primary">1.5K Followers</p>
            </div>
          </div>
        </swiper-slide>

        
        
        <swiper-slide>
          <div class="flex md:flex-row flex-col items-center justify-center gap-10 pb-20 pt-10">
            <div class="bg-lightPink flex justify-center items-center relative ">
              <img
                class="w-full h-full object-cover"
                src="~~/assets/images/testimonial/avatar4.png"
                alt=""
              />

              <img
                class="absolute -bottom-10 right-8 "
                src="~~/assets/images/testimonial/doublequote3.svg"
                alt=""
                style="height: 70px; width: 80px"
              />
            </div>
            <div class="flex flex-col justify-start items-start gap-3 max-w-96">
              <div class="flex items-center gap-3 ">
                <p class="text-start font-medium flex items-center gap-3 text-lg md:text-xl">
                @Courtney Henry
              </p>
              <CameraIcon class="h-6 w-6 text-primary" />
              </div>

              <p class="text-start text-sm md:text-base text-slate-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                eveniet fuga facilis fugit reiciendis, aut quae est commodi
                maiores ad?
              </p>
              <p class="text-sm md:text-base font-medium text-primary">1.5K Followers</p>
            </div>
          </div>
        </swiper-slide>
      </ContainerSlider>
    </div>
  </section>
</template>
