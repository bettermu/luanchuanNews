<template>
  <div>
    <Header/>
    <!-- 栾川风光 -->
    <div class="scene">
      <banner-swiper :banners="banners"/>
      <Blinds ftitle="栾川风光" :blindsList="blindsList" :isBlinds="isBlinds" @getActiveIndex="changeIndex"/>
      <div
        class="type-wrap"
        v-for="(item,index) in blindsList"
        v-if="index === activeIndex"
        :key="index"
      >
        <div class="t-head">
          <span class="tip" :style="{left:getTipLeft}"></span>
        </div>
        <div class="content clearfix">
          <div v-show="!item.newsList.length" class="no-data tc c666">暂无数据</div>
          <type-card
            class="fl"
            v-for="(sonItem,index) in item.newsList.slice(0,8)"
            :key="index"
            :title="sonItem.title"
            @click.native="tapToDetail(sonItem.ncId,'栾川风光',item.name,sonItem.title)"
            :url="sonItem.imgUrl || require('../assets/img/no-img.jpg')"
          ></type-card>
        </div>
      </div>
      <div class="main-wrap">
        <div class="inner-wrap">
          <div class="movie bcfff">
            <co-title class="title-wrap" :url="require('../assets/img/scene/movie-icon.png')" title="栾川宣传片">
              <span @click="tapToList(movies.typeId,'栾川风光','栾川宣传片')" class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <div v-show="!movies.newsList.length" class="no-data tc c666">暂无数据</div>
              <list-card v-for="(item,index) in movies.newsList.slice(0,8)" @click.native="tapToDetail(item.ncId,'栾川风光','栾川宣传片',item.title)" :key="index" margin="20px" width="276px" imgHeight="170px" :url="item.imgUrl || require('../assets/img/no-img.jpg')" :title="item.title" :play="true"></list-card>
            </div>
          </div>
          <div class="movie bcfff">
            <co-title class="title-wrap" :url="require('../assets/img/scene/spot-icon.png')" title="推荐景区">
              <span @click="tapToList(spots.typeId,'栾川风光','推荐景区','1')"  class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <div v-show="!spots.newsList.length" class="no-data tc c666">暂无数据</div>
              <list-card v-for="(item,index) in spots.newsList.slice(0,4)" @click.native="tapToDetail(item.ncId,'栾川风光','推荐景区',item.title)" :key="index" margin="20px" width="276px" imgHeight="170px" :url="item.imgUrl || require('../assets/img/no-img.jpg')" :title="item.title" :cont="item.summary"></list-card>
            </div>
          </div>
          <div class="movie bcfff">
            <co-title class="title-wrap" :url="require('../assets/img/scene/food-icon.png')" title="推荐美食">
              <span @click="tapToList(foods.typeId,'栾川风光','推荐美食','1')"  class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <div v-show="!foods.newsList.length" class="no-data tc c666">暂无数据</div>
              <list-card v-for="(item,index) in foods.newsList.slice(0,4)" @click.native="tapToDetail(item.ncId,'栾川风光','推荐美食',item.title)" :key="index" margin="20px" width="276px" imgHeight="170px" :url="item.imgUrl || require('../assets/img/no-img.jpg')" :title="item.title" :cont="item.summary"></list-card>
            </div>
          </div>
          <div class="movie bcfff">
            <co-title class="title-wrap" :url="require('../assets/img/scene/play-icon.png')" title="推荐游玩">
              <span @click="tapToList(plays.typeId,'栾川风光','推荐游玩','1')"  class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <div v-show="!plays.newsList.length" class="no-data tc c666">暂无数据</div>
              <list-card v-for="(item,index) in plays.newsList.slice(0,4)" @click.native="tapToDetail(item.ncId,'栾川风光','推荐游玩',item.title)" :key="index" margin="20px" width="276px" imgHeight="170px" :url="item.imgUrl" :title="item.title" :cont="item.summary"></list-card>
            </div>
          </div>
          <!--<div class="special bcfff">

            <ul class="clearfix">
              <li class="fl cp">
                <img src="../assets/img/home/1.jpg" alt="">
                <p class="tc ell">呵呵呵呵呵wefwef</p>
              </li>
              
            </ul>

          </div>-->
        </div>
      </div>
    </div>
    <Footer fname="栾川风光"/>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import BannerSwiper from "components/banner-swiper/swiper.vue";
import Header from "components/header/header.vue";
import Blinds from "components/blinds/blinds.vue";
import ListCard from "components/list-card/card.vue";
import Footer from "components/footer/footer.vue";
import CoTitle from "components/co-title/title.vue";
import TypeCard from "components/type-card/card.vue";

export default {
  name: "scene",
  data() {
    return {
      activeIndex: 0,
      isBlinds: false,
      blindsList: [],
      banners:[],
      typeList: [
        {
          cont: [
            { cont: 1 },
            { cont: 2 },
            { cont: 3 },
            { cont: 4 },
            { cont: 5 },
            { cont: 6 },
            { cont: 7 },
            { cont: 8 }
          ]
        },
        {
          cont: [
            { cont: 2 },
            { cont: 2 },
            { cont: 3 },
            { cont: 4 },
            { cont: 5 },
            { cont: 6 },
            { cont: 7 },
            { cont: 8 }
          ]
        },
        {
          cont: [
            { cont: 3 },
            { cont: 2 },
            { cont: 3 },
            { cont: 4 },
            { cont: 5 },
            { cont: 6 },
            { cont: 7 },
            { cont: 8 }
          ]
        },
        {
          cont: [
            { cont: 4 },
            { cont: 2 },
            { cont: 3 },
            { cont: 4 },
            { cont: 5 },
            { cont: 6 },
            { cont: 7 },
            { cont: 8 }
          ]
        },
        {
          cont: [
            { cont: 5 },
            { cont: 2 },
            { cont: 3 },
            { cont: 4 },
            { cont: 5 },
            { cont: 6 },
            { cont: 7 },
            { cont: 8 }
          ]
        },
        {
          cont: [
            { cont: 6 },
            { cont: 2 },
            { cont: 3 },
            { cont: 4 },
            { cont: 5 },
            { cont: 6 },
            { cont: 7 },
            { cont: 8 }
          ]
        }
      ],
      movies:[],
      spots:[],
      foods:[],
      plays:[],
      tipPos: ["190px", "350px", "510px", "670px", "830px", "990px"]
    };
  },
  computed: {
    getTipLeft() {
      return this.tipPos[this.activeIndex];
    }
  },
  created() {
    this.getBlindsList();
    this.getBanners()
    this.getScene()
  },
  methods: {
    //去往详情页面
    tapToDetail(id,fname,sname,tname) {
      //console.log(111)
      this.$router.push({
        name: "detail",
        query: {
          id: id,
          fname:fname,
          sname:sname,
          tname:tname,
        }
      });
    },
    //去往列表页
    tapToList(id,fname,sname,isTop){
      this.$router.push({
        name: "list",
        query: {
          id: id,
          fname:fname,
          sname:sname,
          isTop:isTop
        }
      });
    },

    getBlindsList() {
      this.$axios.get(apiPath+"/vr-rest/newsInfo/getTypeList").then(res => {
        if(res.data.code === 0 && res.data.data){
          this.blindsList = res.data.data.slice(0, 6);
        }
        
      });
    },
    changeIndex(index) {
      this.activeIndex = index;
    },
    //获取轮播图
    getBanners() {
      this.$axios
        .get(apiPath + "/vr-rest/bannerInfo/getWebsiteInfo")
        .then(res => {
          //console.log(res.data.data.bannerList);
          if (res.data.code === 0 && res.data.data) {
            this.banners = res.data.data.bannerList[0]; 
          }
        });
        
    },
    //获取信息
    getScene(){
      this.$axios.get(apiPath+"/vr-rest/newsInfo/getSceneryNewsList").then((res)=>{
        if(res.data.code === 0 && res.data.data){
          this.movies = res.data.data[0]
          this.spots = res.data.data[1]
          this.foods = res.data.data[2]
          this.plays = res.data.data[3]
        }
      })
    }
  },
  components: {
    BannerSwiper,
    Header,
    Footer,
    Blinds,
    CoTitle,
    TypeCard,
    ListCard,
  }
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";

.scene {
  .type-wrap {
    width: @inner-width;
    margin: -34px auto 0;
    padding-bottom:30px;

    .t-head {
      border-bottom: 3px solid @theme-green;
      height: 20px;
      position: relative;
      .tip {
        position: absolute;
        width: 0;
        height: 0;
        border-bottom: 10px solid @theme-green;
        border-right: 10px solid #fff;
        border-left: 10px solid #fff;
        top: 10px;
      }
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px 11px 0;
      border: 1px solid #eee;
      border-top: none;
    }
  }
  .main-wrap {
    background-color: #f2f3f4;
    padding-top:30px;
    padding-bottom:77px;
    .inner-wrap {
      width:@inner-width;
      margin:0 auto;
      .movie {
        padding-top:20px;
        margin-bottom:30px;
        box-shadow: @box-shadow;
        .title-wrap {
          padding:0 20px;
        }
        .content {
          padding-top:17px;
        }
      }
      .special {
        height:196px;
        background:url('../assets/img/scene/special-bg.png') no-repeat -7px -6px #fff;
        padding-left:263px;
        ul {
          padding-top:28px;
          li {
            position:relative;
            margin-right:66px;
            img {
              width:121px;
              height:121px;
              border-radius:50%;
            }
            p {
              height:30px;
              line-height:30px;
              border:1px solid #e5e5e5;
              position:absolute;
              left:0;
              right:0;
              top:112px;
              background-color:#f5f5f5;
              padding:0 10px;
            }
          }
        }
      }
    }
  }
}

.no-data {
  padding:20px 0;
}
</style>

