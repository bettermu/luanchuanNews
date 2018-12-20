<template>
  <div>
    <Header/>
    <!-- 旅游资讯 -->
    <div class="news">
      <div class="main-wrap">
        <div class="status bcfff">
          <co-title
            class="title-wrap"
            :url="require('../assets/img/news/status-icon.png')"
            title="旅游动态"
          >
            <span @click="tapToList(status.typeId,'旅游资讯','旅游动态')" class="more c666 f14 fr cp">更多</span>
          </co-title>
          <div class="content clearfix">
            <div @click="tapToDetail(currentId,'旅游资讯','旅游动态',currentTitle)" class="img-wrap cp fl">
              <img :src="currentUrl || require('../assets/img/no-img.jpg')" alt>
              <p class="info f16 cfff ell">{{currentTitle}}</p>
            </div>
            <ul class="status-list">
              <li
                v-for="(item,index) in status.newsList.slice(0,7)"
                :key="index"
                @click="tapToDetail(item.ncId,'旅游资讯','旅游动态',item.title)"
                class="cp c666"
                :class="activeIndex === index ? 'active':''"
                @mouseenter="enter(index)"
              >
                <div class="title clearfix">
                  <span class="tip fl cfff tc">{{index+1}}</span>
                  <div class="ell f16">{{item.title}}</div>
                </div>
                <div v-show="activeIndex === index" class="cont c999 f14">
                  <More :line="3" :showButton="false" :text="item.summary"></More>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="report bcfff">
          <co-title
            class="title-wrap"
            :url="require('../assets/img/news/report-icon.png')"
            title="专题报道"
          >
            <span @click="tapToList(report.typeId,'旅游资讯','专题报道')" class="more c666 f14 fr cp">更多</span>
          </co-title>
          <div class="content clearfix">
            <list-card
              v-for="(item,index) in report.newsList.slice(0,8)"
              :key="index"
              margin="20px"
              width="276px"
              @click.native="tapToDetail(item.ncId,'旅游资讯','专题报道',item.title)"
              imgHeight="170px"
              :url="item.imgUrl || require('../assets/img/no-img.jpg')"
              :title="item.title"
              :cont="item.summary"
            ></list-card>
          </div>
        </div>

        <div class="bottom clearfix">
          <div class="left info bcfff fl">
            <co-title
              class="title-wrap"
              :url="require('../assets/img/news/info-icon.png')"
              title="优惠信息"
            >
              <span @click="tapToList(discount.typeId,'旅游资讯','优惠信息')" class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content">
              <list-card
                v-for="(item,index) in discount.newsList.slice(0,6)"
                :key="index"
                margin="10px"
                @click.native="tapToDetail(item.ncId,'旅游资讯','优惠信息',item.title)"
                width="235px"
                imgHeight="150px"
                :url="item.imgUrl || require('../assets/img/no-img.jpg')"
                :title="item.title"
                :cont="item.summary"
              ></list-card>
            </div>
          </div>
          <div class="right fl">
            <div class="banner"></div>
            <div class="news-list bcfff">
              <sb-title title="网站公告">
                <span @click="tapToList(public.typeId,'旅游资讯','网站公告')" class="more fr c666 f14 cp">更多</span>
              </sb-title>
              <ul class="content c666">
                <li
                  @click="tapToDetail(item.ncId,'旅游资讯','网站公告',item.title)"
                  v-for="(item,index) in public.newsList.slice(0,7)"
                  :key="index"
                  class="cp ell"
                >{{item.title}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer fname="旅游资讯"/>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import ListCard from "components/list-card/card.vue";
import Footer from "components/footer/footer.vue";
import CoTitle from "components/co-title/title.vue";
import SbTitle from "components/sb-title/title.vue";
import More from "phone-more";

export default {
  name: "news",
  data() {
    return {
      activeIndex: 0,
      currentUrl: "",
      currentId: "",
      currentTitle: "",
      status: [],
      report: [],
      discount: [],
      public: []
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    //去往详情页面
    tapToDetail(id, fname, sname, tname) {
      //console.log(111)
      this.$router.push({
        name: "detail",
        query: {
          id: id,
          fname: fname,
          sname: sname,
          tname: tname
        }
      });
    },
    //去往列表页
    tapToList(id, fname, sname) {
      this.$router.push({
        name: "list",
        query: {
          id: id,
          fname: fname,
          sname: sname
        }
      });
    },
    enter(index) {
      this.activeIndex = index;
      this.currentTitle = this.status.newsList[index].title;
      this.currentUrl = this.status.newsList[index].imgUrl;
      this.currentId = this.status.newsList[index].ncId;
    },
    //获取资讯信息
    getNewsInfo() {
      this.$axios
        .get(apiPath + "/vr-rest/newsInfo/getTravelNewsList")
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.status = res.data.data[0];
            this.currentTitle = res.data.data[0].newsList[0].title;
            this.currentUrl = res.data.data[0].newsList[0].imgUrl;
            this.currentId = res.data.data[0].newsList[0].ncId;
            this.report = res.data.data[1];
            this.discount = res.data.data[2];
            this.public = res.data.data[3];
          }
        });
    }
  },
  components: {
    Header,
    Footer,
    CoTitle,
    ListCard,
    SbTitle,
    More
  }
};
</script>


<style lang="less" scoped>
@import "~styles/common.less";

.news {
  background-color: #f2f3f4;
  padding-top: 50px;

  .main-wrap {
    width: @inner-width;
    margin: 0 auto;
    .status {
      padding: 20px;
      box-shadow: @box-shadow;
      .content {
        padding-top: 17px;
        .img-wrap {
          position: relative;
          height: 402px;
          width: 728px;
          img {
            height: 402px;
            width: 728px;
          }
          .info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            line-height: 50px;
            padding: 0 13px;
            background-color: rgba(0, 0, 0, .5);
          }
        }
        ul {
          padding-left: 748px;
          li {
            & + li {
              border-top: 1px dashed #e5e5e5;
            }
            .title {
              height: 48px;
              .tip {
                height: 18px;
                width: 18px;
                margin-top: 16px;
                background-color: @theme-green;
              }
              div {
                padding-left: 10px;
                height: 48px;
                line-height: 48px;
              }
            }
            .cont {
              height: 75px;
              line-height: 25px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            &.active {
              .title {
                color: @theme-green;
              }
            }
          }
        }
      }
    }
    .report {
      margin-top: 30px;
      padding-top: 20px;
      margin-bottom: 30px;
      box-shadow: @box-shadow;
      .title-wrap {
        padding: 0 20px;
      }
      .content {
        padding-top: 17px;
      }
    }

    .bottom {
      padding-bottom: 80px;
      .left {
        width: 768px;
        padding: 20px 10px 0;
        box-sizing: border-box;
        .title-wrap {
          padding: 0 10px;
        }
        .content {
          padding-top: 17px;
        }
      }
      .right {
        width: 402px;
        margin-left: 30px;
        .banner {
          height: 179px;
          width: 402px;
          background: url("../assets/img/news/banner-icon.jpg") no-repeat;
          margin-bottom: 30px;
        }
        .news-list {
          padding: 10px;
          ul {
            padding: 12px 0;
            li {
              height: 33px;
              line-height: 33px;
              padding: 0 10px 0 20px;
              position: relative;
              transition:all .4s;
              &:before {
                position: absolute;
                content: "";
                height: 4px;
                width: 4px;
                left: 10px;
                top: 15px;
                background-color: #999;
                border-radius: 50%;
              }
              &:hover {
                background-color: #f5f5f5;
                color: @theme-yellow;

                &:before {
                  background-color: @theme-yellow;
                }
              }
              .cont {
                width: 284px;
              }
            }
          }
        }
      }
    }
  }
}
</style>