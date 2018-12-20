<template>
  <div>
    <Header/>
    <div class="home">
      <div class="banner">
        <banner-swiper :banners="banners"></banner-swiper>

        <div class="public">
          <div class="inner">
            <span class="icon fl">网站公告</span>
            <swiper v-if="publicList.length" :options="newsOption" class="news-swiper cp cfff">
              <swiper-slide :key="index" v-for="(item,index) in publicList">
                <span @click="tapToDetail(item[0].ncId,'首页','网站公告',item[0].title)" class="sb-title ell">{{item[0].title}}</span>
                <span @click="tapToDetail(item[1].ncId,'首页','网站公告',item[1].title)" class="sb-title ell">{{item[1].title}}</span>
                <span @click="tapToDetail(item[2].ncId,'首页','网站公告',item[2].title)" class="sb-title ell">{{item[2].title}}</span>
              </swiper-slide>
            </swiper>
            <div class="no cfff" else="!publicList.length">暂无公告</div>
          </div>
        </div>
      </div>

      <Blinds ftitle="首页" :blindsList="blindsList" width="1210px"/>

      <div class="main clearfix">
        <div class="main-left fl">
          <div class="hot-spot">
            <co-title :url="require('../assets/img/home/hot-spot-icon.png')" title="热门景点">
              <span @click="tapToList(hotSpotTypeId,'首页','热门景点')" class="more c666 f14 fr cp">更多</span>
            </co-title>

            <div class="content clearfix">
              <div class="con-left fl">
                <div class="title f18 c333 tc ell">{{getHotSpotFirst.title}}</div>
                <div class="l-content c666 f12">
                  <More :line="9" :showButton="false" :text="getHotSpotFirst.summary"></More>
                </div>
                <span @click="tapToDetail(getHotSpotFirst.ncId,'首页','热门景点',getHotSpotFirst.title)" class="f12 cp">查看详情</span>
              </div>
              <div class="con-right bcfff">
                <list-card
                  v-for="(item,index) in getMoreHotSpotList"
                  margin="10px"
                  width="235px"
                  imgHeight="150px"
                  :key="index"
                  @click.native="tapToDetail(item.ncId,'首页','热门景点',item.title)"
                  :url="item.imgUrl || require('../assets/img/no-img.jpg')"
                  :title="item.title"
                  :cont="item.summary"
                ></list-card>
              </div>
            </div>
          </div>

          <div class="hotel">
            <co-title
              class="title-wrap"
              :url="require('../assets/img/home/line-icon.png')"
              title="线路攻略"
            >
              <span @click="tapToList(lineTypeId,'首页','线路攻略')" class="more c666 f14 fr cp">更多</span>
            </co-title>

            <div class="content clearfix">
              <list-card
                v-for="(item,index) in lineList"
                @click.native="tapToDetail(item.ncId,'首页','线路攻略',item.title)"
                margin="10px"
                :key="index"
                width="235px"
                imgHeight="150px"
                :url="item.imgUrl || require('../assets/img/no-img.jpg')"
                :title="item.title"
                :cont="item.summary"
              ></list-card>
            </div>
          </div>

          <div class="hotel">
            <co-title
              class="title-wrap"
              :url="require('../assets/img/home/hotel-icon.png')"
              title="精品民宿"
            >
              <span @click="tapToList(hotelTypeId,'首页','精品民宿')" class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <list-card
                v-for="(item,index) in hotelList"
                @click.native="tapToDetail(item.ncId,'首页','精品民宿',item.title)"
                margin="10px"
                :key="index"
                width="235px"
                imgHeight="150px"
                :url="item.imgUrl || require('../assets/img/no-img.jpg')"
                :title="item.title"
                :cont="item.summary"
              ></list-card>
            </div>
          </div>
        </div>
        <div class="main-right fr">
          <div class="news bcfff">
            <sb-title title="新闻资讯">
              <span @click="tapToList(newsTypeId,'首页','新闻资讯')" class="more fr c666 f14 cp">更多</span>
            </sb-title>
            <div class="content">
              <div @click="tapToDetail(getNewsListFirst.ncId,'首页','新闻资讯',getNewsListFirst.title)" class="first cp clearfix">
                <img class="fl" :src="getNewsListFirst.imgUrl" alt>
                <div class="f-cont">
                  <div class="f-title f16 c333 ell">{{getNewsListFirst.title}}</div>
                  <p class="f-conte f14 c999">
                    <More :line="2" :showButton="false" :text="getNewsListFirst.summary"></More>
                  </p>
                </div>
              </div>
              <ul>
                <li
                  v-for="(item,index) in getMoreNewsList"
                  @click="tapToDetail(item.ncId,'首页','新闻资讯',item.title)"
                  :key="index"
                  class="cp f16"
                >
                  <div class="cont fl ell c666">{{item.title}}</div>
                  <span class="fr time c999">{{item.createTime}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="map bcfff">
            <sb-title title="栾川地图">
              <span @click="toMap" class="more-no-arrow fr c666 f14 cp">查看更详细地图</span>
            </sb-title>
            <div class="content tc">
              <img src="../assets/img/home/map-bg.png" alt>
              <div @click="toMap" class="tc cfff cp">查看更详细地图</div>
            </div>
          </div>
          <div class="food rel bcfff">
            <sb-title title="美食推荐">
              <span class="tip"></span>
            </sb-title>

            <ul class="content">
              <li
                v-for="(item,index) in foodList"
                @click="tapToDetail(item.ncId,'首页','美食推荐',item.title)"
                :key="index"
                class="cp"
              >
                <div class="f-title ell f16 c666">{{item.title}}</div>
                <p class="f-cont f14 c999">
                  <More :line="2" :showButton="false" :text="item.summary"></More>
                </p>
              </li>
            </ul>
          </div>
          <div class="code bcfff">
            <sb-title title="栾川县旅游公众号"></sb-title>
            <div class="content">
              <div class="img-wrap">
                <span class="bottom-left"></span>
                <span class="bottom-right"></span>
                <img :src="codeImg" alt>
              </div>
              <div class="info tc c999 f16">关注 "全景栾川" 微信公众号,查看更多讯息</div>
            </div>
          </div>
        </div>
        <div class="main-bottom fl bcfff">
          <co-title :url="require('../assets/img/home/vr-icon.png')" title="栾川全景"></co-title>
          <div class="content clearfix">
            <div class="vr-left fl">
              <vr-card
                @click.native="toPanorama(getFirstPano.piId)"
                :url="getFirstPano.exhibitionImg || require('../assets/img/no-img.jpg')"
                height="240px"
                :title="getFirstPano.piName"
                bgSize="384px 240px"
              ></vr-card>
            </div>
            <div class="vr-center fl">
              <vr-card
                @click.native="toPanorama(item.piId)"
                v-for="(item,index) in getCenterPano"
                :key="index"
                :url="item.exhibitionImg || require('../assets/img/no-img.jpg')"
                height="115px"
                :title="item.piName"
                bgSize="184px 115px"
                class="fl son-card"
              ></vr-card>
            </div>
            <div class="vr-right fl">
              <vr-card
                @click.native="toPanorama(getLastPano.piId)"
                :key="index"
                :url="getLastPano.exhibitionImg || require('../assets/img/no-img.jpg')"
                height="240px"
                :title="getLastPano.piName"
                bgSize="184px 240px"
              ></vr-card>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-blank" :style="{background: 'url('+bottomImg+') center #00c275'}"></div>
    </div>
    <Footer fname="首页"/>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { apiPath } from "@/config.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import More from "phone-more";
import Header from "components/header/header.vue";
import Blinds from "components/blinds/blinds.vue";
import ListCard from "components/list-card/card.vue";
import VrCard from "components/vr-card/card.vue";
import Footer from "components/footer/footer.vue";
import CoTitle from "components/co-title/title.vue";
import SbTitle from "components/sb-title/title.vue";
import BannerSwiper from "components/banner-swiper/swiper.vue";

export default {
  name: "home",

  created() {
    this.getBanners();
    this.getNewsList();
    this.getBlindsList();
    this.getPanoList();
    //this.getCodeImg();
    //this.getBottomImg();
  },

  data() {
    return {
      newsOption: {
        loop: true,
        direction: "vertical",
        allowTouchMove: false,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }
      },

      //轮播图数据
      banners: [],
      //网站公告
      publicList: [],

      //二维码图片
      codeImg: "",

      //百叶窗数据
      blindsList: [],

      //热门景点
      hotSpotList: [],
      hotSpotTypeId: "",

      //新闻资讯
      newsList: [],
      newsTypeId: "",

      //线路攻略
      lineList: [],
      lineTypeId: "",

      //美食推荐
      foodList: [],
      foodTypeId: "",

      //精品民宿
      hotelList: [],
      hotelTypeId: "",

      //全景列表
      panoList: [],

      //底部imgBanner
      bottomImg: ""
    };
  },

  computed: {
    getFirstPano() {
      return this.panoList.slice(0, 1)[0];
    },
    getLastPano() {
      let arr = Array.prototype.slice.call(this.panoList);

      return arr.pop();
    },
    getCenterPano() {
      let arr = Array.prototype.slice.call(this.panoList);
      arr.shift();
      arr.pop();
      return arr;
    },
    getHotSpotFirst() {
      return this.hotSpotList.slice(0, 1)[0];
    },
    getMoreHotSpotList() {
      return this.hotSpotList.slice(1);
    },
    getNewsListFirst() {
      return this.newsList.slice(0, 1)[0];
    },
    getMoreNewsList() {
      return this.newsList.slice(1);
    }
  },

  methods: {
    //去往详情页面
    tapToDetail(id, fname, sname,tname) {
      console.log(tname)
      this.$router.push({
        name: "detail",
        query: {
          id: id,
          fname: fname,
          sname: sname,
          tname: tname,
        }
      });
    },
    //去往列表页
    tapToList(id, fname, sname, tname) {
      this.$router.push({
        name: "list",
        query: {
          id: id,
          fname: fname,
          sname: sname
        }
      });
    },

    //查看详细地图
    toMap() {
      this.$router.push("/map");
    },

    //去往全景
    toPanorama(id) {
      this.$router.push({
        name: "panorama",
        query: {
          id: id
        }
      });
    },
    //获取资讯信息
    getNewsList() {
      this.$axios
        .get(apiPath + "/vr-rest/newsInfo/getHomePageNewsList")
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data) {
              //网站公告
              this.publicList = this.handleNewsList(res.data.data[0].newsList);

              //热门景点
              this.hotSpotList = res.data.data[1].newsList.slice(0, 5);
              this.hotSpotTypeId = res.data.data[1].typeId;

              //新闻资讯
              this.newsList = res.data.data[2].newsList.slice(0, 7);
              this.newsTypeId = res.data.data[2].typeId;

              //线路攻略
              this.lineList = res.data.data[3].newsList.slice(0, 6);
              this.lineTypeId = res.data.data[3].typeId;

              //美食推荐
              this.foodList = res.data.data[4].newsList.slice(0, 3);
              this.foodTypeId = res.data.data[4].typeId;

              //精品民宿
              this.hotelList = res.data.data[5].newsList.slice(0, 6);
              this.hotelTypeId = res.data.data[5].typeId;
            }
          }
        });
    },

    handleNewsList(data) {
      var num = 3; //每个子数组里的元素个数
      //var arr = [1, 4, 5, 6, 34, 34, 67, 895, 2456, 87, 9, 5, 23, 884, 56];
      var Arr = new Array(Math.ceil(data.length / num));
      for (var i = 0; i < Arr.length; i++) {
        Arr[i] = new Array();
        for (var j = 0; j < num; j++) {
          Arr[i][j] = "";
        }
      }
      for (var i = 0; i < data.length; i++) {
        Arr[parseInt(i / num)][i % num] = data[i];
      }
      return Arr;
      //console.log(Arr);
    },

    //获取资讯类别
    getBlindsList() {
      this.$axios.get(apiPath + "/vr-rest/newsInfo/getTypeList").then(res => {
        this.blindsList = res.data.data.slice(0, 6);
      });
    },

    //获取全景列表
    getPanoList() {
      this.$axios.get(apiPath + "/vr-rest/vr/getIndexVrList").then(res => {
        //console.log(res.data.data)
        this.panoList = res.data.data;
      });
    },

    //获取轮播图
    getBanners() {
      this.$axios
        .get(apiPath + "/vr-rest/bannerInfo/getWebsiteInfo")
        .then(res => {
          console.log(res.data.data.bannerList);
          if (res.data.code === 0 && res.data.data) {
            this.banners = res.data.data.bannerList[0]; 
            this.codeImg = res.data.data.bannerList[1][0].resourcePath;
            this.bottomImg = res.data.data.bannerList[2][0].resourcePath;
          }
        });
    },

    //获取二维码
    //getCodeImg() {
    //  this.$axios
    //    .get(
    //      apiPath +
    //        "/vr-rest/bannerInfo/getBannerList?nbpId=812FC211797D41C8A89995D09BF81A85"
    //    )
    //    .then(res => {
    //      this.codeImg = res.data.data[0].irrList[0].resourcePath;
    //    });
    //},

    //getBottomImg() {
    //  this.$axios
    //    .get(
    //      apiPath +
    //        "/vr-rest/bannerInfo/getBannerList?nbpId=812FC211797D41C8A89995D09BF81A74"
    //    )
    //    .then(res => {
    //      //console.log(res.data.data)
    //      this.bottomImg = res.data.data[0].irrList[0].resourcePath;
    //    });
    //}
  },

  components: {
    Header,
    Blinds,
    ListCard,
    VrCard,
    Footer,
    swiper,
    swiperSlide,
    More,
    CoTitle,
    SbTitle,
    BannerSwiper
  }
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";
.home {
  background-color: #f2f3f4;
  .banner {
    position: relative;
    .public {
      position: absolute;
      height: 40px;
      background-color: rgba(0, 0, 0, 0.5);
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      .inner {
        width: @inner-width;
        margin: 0 auto;
        .no {
          height: 40px;
          line-height: 40px;
        }
        .icon {
          height: 40px;
          line-height: 40px;
          color: @theme-yellow;
          padding-left: 25px;
          padding-right: 40px;
          position: relative;
          &:before {
            position: absolute;
            content: "";
            height: 17px;
            width: 18px;
            top: 11px;
            left: 0;
            background: url("../assets/img/home/public-icon.png") no-repeat;
          }
        }
        .news-swiper {
          height: 40px;
          line-height: 40px;
          .sb-title {
            display: inline-block;
            width: 280px;
            margin-right: 70px;
          }
        }
      }
    }
  }
  .main {
    width: @inner-width;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 110px;
    .main-left {
      width: 768px;
      .hot-spot {
        background-color: #fff;
        box-shadow: @box-shadow;
        padding: 20px;
        height:544px;
        padding-bottom: 10px;
        margin-bottom: 30px;
        .content {
          padding-top: 17px;
          .con-left {
            width: 237px;
            height: 472px;
            background: url("../assets/img/home/info-bg.jpg");
            .title {
              height: 58px;
              line-height: 58px;
            }
            .l-content {
              padding: 0 18px;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 9;
              -webkit-box-orient: vertical;
            }
            span {
              display: inline-block;
              margin-left: 18px;
              margin-top: 10px;
              color: @theme-green;
            }
          }
          .con-right {
            margin-left: 237px;
            height: 300px;
          }
        }
      }
      .hotel {
        background-color: #fff;
        box-shadow: @box-shadow;
        height:544px;
        padding: 20px;
        padding-bottom: 0;
        padding-left: 10px;
        margin-bottom: 30px;
        .title-wrap {
          padding-left: 10px;
        }
        .content {
          padding-top: 17px;
        }
      }
    }
    .main-right {
      width: 402px;
      .news {
        padding: 10px;
        margin-bottom: 34px;
        height:399px;
        box-sizing:border-box;
        box-shadow: @box-shadow;
        .content {
          padding-top: 20px;
          .first {
            padding: 0 10px 11px;
            img {
              height: 85px;
              width: 85px;
            }
            .f-cont {
              margin-left: 100px;
              .f-title {
                line-height: 30px;
                height: 30px;
              }
              .f-conte {
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
          ul {
            li {
              height: 36px;
              line-height: 36px;
              padding: 0 10px;
              transition:all .4s;
              &:hover {
                background-color: #f5f5f5;
                .cont {
                  color: @theme-yellow;
                }
              }
              .cont {
                width: 284px;
              }
            }
          }
        }
      }
      .map {
        padding: 10px;
        box-shadow: @box-shadow;
        margin-bottom: 34px;
        .content {
          padding-bottom: 24px;
          img {
            margin: 32px 0 29px 0;
          }
          div {
            width: 260px;
            background-color: @theme-green;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            display: inline-block;
          }
        }
      }
      .food {
        padding: 10px;
        height:391px;
        box-shadow: @box-shadow;
        margin-bottom: 34px;
        .content {
          padding: 15px 10px 0;
          li {
            padding-bottom: 17px;
            & + li {
              border-top: 1px solid #e5e5e5;
            }
            .f-title {
              height: 40px;
              line-height: 40px;
            }
            .f-cont {
              height: 52px;
              line-height: 26px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
      .code {
        padding: 10px;
        box-shadow: @box-shadow;
        margin-bottom: 34px;
        height:416px;
        .content {
          padding: 45px 0 0;
          .img-wrap {
            height: 272px;
            margin: 0 auto;
            width: 272px;
            border: 4px solid #f2f3f4;
            position: relative;
            .bottom-left {
              position: absolute;
              height: 10px;
              width: 10px;
              border-bottom: 4px solid @theme-green;
              border-left: 4px solid @theme-green;
              bottom: -4px;
              left: -4px;
            }
            .bottom-right {
              position: absolute;
              height: 10px;
              width: 10px;
              border-bottom: 4px solid @theme-green;
              border-right: 4px solid @theme-green;
              bottom: -4px;
              right: -4px;
            }
            &:before {
              content: "";
              position: absolute;
              height: 10px;
              width: 10px;
              border-top: 4px solid @theme-green;
              border-left: 4px solid @theme-green;
              top: -4px;
              left: -4px;
            }
            &:after {
              content: "";
              position: absolute;
              height: 10px;
              width: 10px;
              border-top: 4px solid @theme-green;
              border-right: 4px solid @theme-green;
              top: -4px;
              right: -4px;
            }
            img {
              height: 272px;
              width: 272px;
            }
          }
          .info {
            padding-top: 4px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
    .main-bottom {
      box-shadow: @box-shadow;
      padding: 20px 10px 10px 20px;

      .content {
        padding-top: 15px;
        .vr-left {
          width: 394px;
          height: 250px;
        }
        .vr-center {
          width: 582px;
          height: 250px;
          .son-card {
            width: 184px;
            height: 250px;
          }
        }
        .vr-right {
          width: 194px;
          height: 250px;
        }
      }
    }
  }
  .footer-blank {
    height: 199px;
  }
}
</style>

