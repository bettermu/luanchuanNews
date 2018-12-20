<template>
<div class="card clearfix cp">
  <img class="fl" :src="info.imgUrl || require('../../assets/img/no-img.jpg')" alt="">
  <div class="content">
    <div class="title c666 f16 ell">{{info.title}}</div>
    <div class="cont c999 f14">
      <More :line="3" :showButton="false" :text="info.summary"></More>
    </div>
    <div class="time c999 f14">{{info.createTime}}</div>
  </div>
</div>
  
</template>

<script>
import More from "phone-more";
export default {
  props:{
    info:{
      type:Object,
      default:{},
    }
  },
  components:{
    More,
  }
  
}
</script>

<style lang="less" scoped>

.card {
  width:50%;
  box-sizing:border-box;
  padding:0 10px 20px;
  img {
    width:115px;
    height:115px;
  }
  .content {
    margin-left:128px;
    .title {
      height:33px;
      line-height:33px;
    }
    .cont {
      line-height: 18px;
        overflow: hidden;
        height: 54px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom:12px;
    }
    .time {

    }
  }
}

</style>


