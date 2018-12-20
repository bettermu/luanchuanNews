<template>
  <div class="card fl bcfff cp" :style="{width:width,marginLeft:margin,marginBottom:margin}">
    <img :src="url" :style="{width:width,height:imgHeight}" alt>

    <div class="play-mask" v-if="play">
      <img src="../../assets/img/guide/live-play-btn.png" alt="">
    </div>

    <div class="title f16 c333 ell">{{title}}</div>

    <p v-if="cont" class="m-ell c999 f14">
      <More :line="2" :showButton="false" :text="cont"></More>
    </p>
  </div>
</template>

<script>
//import $ from "jquery";

//import "jquery.dotdotdot";
import More from 'phone-more';

export default {
  props: ["url", "title", "cont","width","imgHeight","margin","play"],

  components:{
    More
  }
};
</script>

<style lang="less" scoped>
.card {

  padding-bottom: 12px;
  position:relative;
  font-size: 0;
  transition:all .4s;
  .play-mask {
    position:absolute;
    height:70px;
    width:70px;
    top:50%;
    left:50%;
    margin-top:-55px;
    margin-left:-35px;
    img {
      height:70px;
      width:70px;
    }

  }

  .title {
    height: 34px;

    line-height: 34px;

    padding: 0 12px;
  }

  p {
    line-height: 18px;
    overflow: hidden;
    height:36px;
    padding: 0 12px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &:hover {
    box-shadow: 0 0 1px 1px #f2f2f2;
  }
}
</style>



