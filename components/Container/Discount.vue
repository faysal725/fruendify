<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { useMediaQuery } from "@vueuse/core";
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
</script>

<template>
  <section class="max-w-7xl mx-auto" id="discount">
    <PageSectionHeader
      title="Your Events, Our Discounts"
      description="Unlock Adventures, Connect with New Faces, and Save Big with Our
        Exclusive Event Discounts."
    />
    <div class="">
      <ContainerSlider :perSlide="isLargeScreen ? 2 : 1">
        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/discount/event1.png')] bg-no-repeat bg-center flex justify-center items-center py-36"
            >
              <div class="bg-slate-200/85 p-4 rounded-lg space-y-5">
                <p
                  class="text-2xl md:text-4xl font-bold text-slate-100 outline-text"
                >
                  10% Discounts
                </p>
                <ButtonLogin
                  name="Candle Night Date"
                  classes="text-xs md:text-sm bg-primary font-thin min-w-16 bg-primary text-sm btn-login "
                />
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/discount/event2.png')] bg-no-repeat bg-center flex justify-center items-center py-36"
            >
              <div class="bg-slate-200/85 p-4 rounded-lg space-y-5">
                <p
                  class="text-2xl md:text-4xl font-bold text-slate-100 outline-text"
                >
                  8% Discounts
                </p>
                <ButtonLogin
                  name="Coffee Date"
                  classes="text-xs md:text-sm bg-primary font-thin min-w-16 bg-primary text-sm btn-login "
                />
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="">
            <div
              class="h-full w-full bg-[url('~~/assets/images/discount/event1.png')] bg-no-repeat bg-center flex justify-center items-center py-36"
            >
              <div class="bg-slate-200/85 p-4 rounded-lg space-y-5">
                <p
                  class="text-2xl md:text-4xl font-bold text-slate-100 outline-text"
                >
                  38% Discounts
                </p>
                <ButtonLogin
                  name="Coffee Date"
                  classes="text-xs md:text-sm bg-primary font-thin min-w-16 bg-primary text-sm btn-login "
                />
              </div>
            </div>
          </div>
        </swiper-slide>
      </ContainerSlider>
    </div>
  </section>
</template>
