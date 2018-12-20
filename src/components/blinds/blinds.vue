<template>
  <div class="wrap bcfff">
    <ul class="clearfix cp" @mouseleave="init" :style="{width:width,}">
      <li
        v-for="(item,index) in blindsList"
        :key="index"
        @click="tapToList(item.ntId,ftitle,item.name,'0')"
        :class="['fl',activeIndex===index?'active':'']"
        :style="{background:'url('+item.imgUrl+')  left top no-repeat',backgroundSize:'400px 256px'}"
        @mouseenter="enter(index)"
      >
        <div class="icon-wrap tc" :style="index === activeIndex? {backgroundColor:'transparent'}:{backgroundColor:'rgba(0,0,0,.5)'}">
          <img :src="item.imgPath" alt>
          <p class="f16 cfff">
            <span class="f18 fb">{{item.name.slice(0,1)}}</span>
            {{item.name.slice(1)}}
          </p>
        </div>
        <div v-show="activeIndex===index" class="content cfff">
          <p class="m-ell">
            <More
              :line="6"
              :showButton="false"
              :text="item.summary"
            />
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
//import $ from "jquery";
//import "jquery.dotdotdot";
import More from "phone-more";
export default {
  props: {
    blindsList: {
      type: Array,
      default: []
    },
    width: {
      type: String,
      default: "1210px"
    },
    isBlinds: {
      type: Boolean,
      default: true
    },
    ftitle:{
      type:String,
      default:'',
    }
  },


  mounted() {
    //console.log(this.blindsList)
  },

  computed:{
    
  },

  data() {
    return {
      activeIndex: 0
      //eatStyle:{
      //  background:'url('+require("../../assets/img/home/1.jpg")+')  left top no-repeat',
      //  backgroundSize:'560px 256px'
      //},
      //carStyle:{
      //  background:'url('+require("../../assets/img/home/2.jpg")+')  left top no-repeat',
      //  backgroundSize:'560px 256px'
      //},
      //mapStyle:{
      //  background:'url('+require("../../assets/img/home/3.jpg")+')  left top no-repeat',
      //  backgroundSize:'560px 256px'
      //},
      //shopStyle:{
      //  background:'url('+require("../../assets/img/home/2.jpg")+')  left top no-repeat',
      //  backgroundSize:'560px 256px'
      //},
      //playStyle:{
      //  background:'url('+require("../../assets/img/home/1.jpg")+')  left top no-repeat',
      //  backgroundSize:'560px 256px'
      //}
    };
  },

  components: {
    More
  },

  methods: {
    enter(index) {
      this.activeIndex = index;
      this.$emit("getActiveIndex", this.activeIndex);
    },

    //去往列表页
    tapToList(id,fname,sname,isTop){
      this.$router.push({
        name: "list",
        query: {
          id: id,
          fname:fname,
          sname:sname,
          isTop:isTop,
        }
      });
    },

    init() {
      if (this.isBlinds) {
        this.activeIndex = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";
.wrap {
  padding: 35px 0;
  ul {
    margin: 0 auto;
    height: 256px;
    li {
      height: 256px;
      width: 160px;
      position: relative;
      transition: all 0.5s 0.3s;
      &.active {
        width: 400px;
      }
      .icon-wrap {
        height: 140px;
        width: 140px;
        position: absolute;
        top: 58px;
        left: 10px;
        z-index:10;
        border-radius:50%;
        img {
          margin-top: 30px;
          height: 48px;
          width: 48px;
        }

        p {
          margin-top: 10px;
          span {
            color: @theme-yellow;
          }
        }
      }
      .content {
        position: absolute;
        left: 0;
        right: 0;
        overflow: hidden;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        p {
          padding: 30px 20px 0 180px;
          line-height: 30px;
          height: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>


