<template>
  <div>
    <swiper v-if='banners.length' :options="bannerOption" class="banner-swiper">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <a class="db" :href="item.url">
          <img :src="item.resourcePath">
        </a>
        
      </swiper-slide>
      
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props:{
    banners:{
      type:Array,
      default:[],
    }
  },
  data() {
    return {
      bannerOption: {
        //freeMode: true,
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="less" scoped>
.banner-swiper {
  height: 411px;
  width: 100%;
  img {
    height: 411px;
    width: 100%;
  }
}
</style>


