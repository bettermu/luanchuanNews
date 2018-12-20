<template>
  <div class="card clearfix">
    <img class="fl" :class="hasBuy?'':'cp'" :src="info.imgUrl || require('../../assets/img/no-img.jpg')" alt>
    <div class="content">
      <div class="cont" :class="hasBuy?'':'cp'">
        <div :title="info.title" class="title ell">{{info.title}}</div>
        <p class="f14 c999">
          <More :line="2" :showButton="false" :text="info.summary"></More>
        </p>
      </div>
      <div class="foot" :class="hasBuy?'tr':'tl'">
        <span v-if="!hasBuy" class="detail f14 tc cfff cp">查看详情</span>
        <span v-if="hasBuy && info.otaInfoVoList"  @click.stop="buy" class="btn f14 tc cfff cp">购买</span>
      </div>
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
    },
    index:{
      type:Number,
      default:0,
    },
    hasBuy:{
      type:Boolean,
      default:false,
    }
    
  },
  components: {
    More
  },
  methods:{
    buy(){
      //console.log(item)
      this.$emit("clickBuy",this.index)
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";
.card {
  padding: 20px 0;
  height:160px;
  box-sizing: border-box;
  img {
    width: 184px;
    height: 115px;
  }
  .content {
    margin-left: 200px;
    .cont {
      .title {
        padding-bottom:10px;
      }
      p {
        line-height: 20px;
        overflow: hidden;
        height: 40px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      padding-bottom:20px;
    }
    .foot {
      span {
        display:inline-block;
        height:26px;
        line-height:26px;
        width:70px;
        border-radius:2px;
      }
      .btn {
        background-color:#fd833a;
      }
      .detail {
        background-color:@theme-green;
      }
    }
  }
}
</style>


