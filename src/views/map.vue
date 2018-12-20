<template>
<div>
  <Header />
  <!-- 栾川地图 -->
  <div class="travel-map">
    <div class="clearfix tab-header tc f20">
      <router-link class="fr f14 cfff return-btn" to="/">返回</router-link>
      <input type="radio" name="map-switch" value="cityArea" id="cityArea" v-model="picked">
      <label class="cp mr30" for="cityArea">栾川城区地图导览</label>
      
      <input type="radio" name="map-switch" value="traffic" id="traffic" v-model="picked">
      <label class="cp" for="traffic">栾川旅游交通图</label>
    </div>

    <div class="map-wrap" v-show="picked === 'cityArea'">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide class="slide">

        </swiper-slide>
      </swiper>
      <div class="clearfix tip tc">
        <router-link class="fr f14 cfff return-btn" to="/">返回</router-link>
        <span>帮助：点击上面方向按钮或者点击鼠标左键左右拖拉移动</span>
      </div>
    </div>
    <div class="jt-wrap" v-show="picked === 'traffic'">
      <img src="../assets/img/map/jt.jpg" alt srcset>
    </div>
  </div>
  <Footer />

</div>
  
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";

export default {
  data() {
    return {
      picked: "cityArea",
      swiperOption: {
        freeMode: true,
        loop: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    Header,
    Footer,
  }
};
</script>

<style scoped>

.tab-header {
  height: 50px;
  background: #09f;
  line-height: 50px;
}

input[name="map-switch"] {
  display: none;
}

.mr30 {
  margin-right: 30px;
}

input[name="map-switch"]:checked + label {
  color: #fff;
}
.travel-map {
  overflow:hidden;
}

.return-btn {
  margin-right: 20px;
}

.jt-wrap img {
  width: 100%;
}

.tip {
  height: 50px;
  background: #b1e4ff;
  line-height: 50px;
  font-weight: bold;
  color: #10adff;
}

.map-wrap {
  
}
.swiper-container {
  width:3583px;
}

.slide {
  height:718px;
  width:3583px;
  background:url('../assets/img/map/luanchuan.jpg') center;
}
</style>