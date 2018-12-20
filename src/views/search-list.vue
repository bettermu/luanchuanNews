<template>
  <div class="list-wrapper">
    <Header></Header>
    <div class="wrapper">
      <div class="list">
        <div class="main-wrap">
          
          <Crumbs>
            <span class="fl">{{$route.query.fname}}</span>
            <span class="fl">></span>
            <span class="fl">{{$route.query.sname}}</span>
          </Crumbs>

          <div class="list-cont bcfff">
            <div class="title f24 ell">{{$route.query.sname}}</div>
            <div class="list-page-wrap">
              <div v-show="!pageList.length" class="no-data c666 tc">暂无数据</div>
              <ul class="search-list">
                <li
                  @click="toDetail(item)"
                  class="list-page"
                  v-for="(item,index) in pageList"
                  :key="index"
                >
                  <img
                    class="fl"
                    :class="item.infoType==='商品'?'':'cp'"
                    :src="item.imgUrl || require('../assets/img/no-img.jpg')"
                    alt
                  >
                  <div class="content">
                    <div class="cont" :class="item.infoType==='商品'?'':'cp'">
                      <div :title="item.title" class="title-son ell">
                        <span>[ {{item.infoType}} ]</span>
                        {{item.name}}
                      </div>
                      <p class="f14 c999">
                        <More :line="2" :showButton="false" :text="item.summary"></More>
                      </p>
                    </div>
                    <div class="foot" :class="item.infoType==='商品'?'tr':'tl'">
                      <span v-show="item.infoType!=='商品'" class="detail f14 tc cfff cp">查看详情</span>
                      <span v-show="item.infoType==='商品'" @click.stop="buy(item)" class="btn f14 tc cfff cp">购买</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <v-page
              v-show="pageList.length"
              :total-row="totalRow"
              align="center"
              @page-change="pageChange"
              :page-size-menu="false"
              :info="false"
            ></v-page>
          </div>
        </div>
      </div>
      <div class="push"></div>
    </div>

    <Footer></Footer>

    <Loading v-show="loading"></Loading>

    <div v-show="isPopShow" class="pop-wrap">
      <div class="pop bcfff">
        <div class="title tc cfff">
          选择前往
          <span @click="closePop" class="cp"></span>
        </div>
        <div class="content">
          <div @click="toThirdWeb(item.otaLink)" v-for="(item,index) in linkList" :key="index" class="btn tc cp">{{item.otaName}}</div>
        </div>
      </div>
    </div>

    <div class="mask" v-show="isShow">
      <div class="wrap bcfff">
        <iframe
          id="iframe"
          src="./liveVideo/video.html"
          width="960px"
          height="471px"
          frameborder="0"
        ></iframe>
        <span class="close cp" @click="closeVideo">
          <img src="../assets/img/live/close.png" alt>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";
import Crumbs from "components/crumbs/crumbs.vue";
import Loading from "components/loading/loading.vue";
import More from "phone-more";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import vPage from "v-page";
Vue.use(vPage, {});

export default {
  name: "searchList",

  data() {
    return {
      totalRow: 0,
      crumbArr: [],
      id: "",
      pageList: [],
      isTop: this.$route.query.isTop || "",
      isPopShow: false,
      linkList: [],
      isShow:false,
    };
  },

  created() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      this.getPageListById(this.id, 1, 10, this.isTop);
    } else if (this.$route.query.sname) {
      this.getSearchList(this.$route.query.sname, 1, 10);
    }
  },

  watch:{
    $route(from,to){
      this.id = this.$route.query.id || "";
    if (this.id) {
      this.getPageListById(this.id, 1, 10, this.isTop);
    } else if (this.$route.query.sname) {
      this.getSearchList(this.$route.query.sname, 1, 10);
    }
    }
  },

  components: {
    Header,
    Footer,
    Crumbs,
    Loading,
    More,
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    //跳转第三方网站
    toThirdWeb(link) {
      this.isPopShow = false;
      window.open(link);
    },
    
    toDetail(item) {
      switch (item.infoType) {
        case "全景":
          this.$router.push({
            name: "panorama",
            query: {
              id: item.id
            }
          });
          break;
        case "实景":
          this.isShow=true;
          document.getElementById('iframe').contentWindow.postMessage(item.cameraNumber,'*')
          break;
        case "导览":
          this.$router.push({
            name: "guide",
            query: {
              id: item.id,
            }
          });
          break;
        case "资讯":
          this.$router.push({
            name: "detail",
            query: {
              id: item.id,
              fname: "搜索",
              sname: this.$route.query.sname,
              tname: item.name
            }
          });
          break;
        case "商品":
          break;
      }
    },
    buy(item){
      if(item.otaInfoVoList && item.otaInfoVoList.length){
        //多个链接跳转
        this.isPopShow = true;
        this.linkList = item.otaInfoVoList;
        this.isPopShow = true;

      }else {
        //单个链接跳转
        //console.log(item)
        window.open(item.otaLink);
      }
    },
    closePop(){
      this.isPopShow = false;
    },
    pageChange(page) {
      if (this.id) {
        this.getPageListById(this.id, page.pageNumber, 10, this.isTop);
      } else if (this.$route.query.sname) {
        this.getSearchList(this.$route.query.sname, page.pageNumber, 10);
      }
    },
    //获取资讯列表
    getPageListById(id, page, size, isTop) {
      this.setLoading(true);
      this.$axios
        .get(
          apiPath +
            `/vr-rest/newsInfo/getTypeNewsPageList?typeid=${id}&page=${page}&size=${size}&isTop=${isTop}`
        )
        .then(res => {
          this.setLoading(false);
          if (res.data.code === 0 && res.data.data) {
            this.pageList = res.data.data;
            this.totalRow = res.data.count;
          }
        });
    },
    //获取全局搜索分页列表
    getSearchList(name, page, size) {
      this.setLoading(true);
      this.$axios
        .get(
          apiPath +
            `/vr-rest/websiteInfo/infoSearch?name=${name}&currentPageNo=${page}&pageSize=${size}`
        )
        .then(res => {
          this.setLoading(false);
          if (res.data.code === 0 && res.data.data) {
            this.pageList = res.data.data;
            this.totalRow = res.data.count;
          }
        });
    },
    
    closeVideo(){
      this.isShow = false
    },
    ...mapMutations({
      setLoading: "SET_LOADING"
    })
  }
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";
.list-wrapper {
  height: 100%;
  .wrapper {
    min-height: 100%;
    margin-bottom: -90px;
    background-color: #f2f3f4;
  }
}
.footer,
.push {
  height: 90px;
}

.back {
  padding-top: 10px;
  span {
    display: block;
    height: 36px;
    width: 100px;
    background-color: @theme-green;
    line-height: 36px;
    border-radius: 5px;
  }
}

.list {
  background-color: #f2f3f4;
  .main-wrap {
    width: @inner-width;
    padding-bottom: 80px;
    margin: 0 auto;
    .list-cont {
      padding-bottom: 34px;
      border: 1px solid #e5e5e5;
      .title {
        height: 50px;
        line-height: 50px;
        background-color: #f6f6f6;
        padding-left: 36px;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 15px;
          left: 20px;
          width: 4px;
          height: 19px;
          background-color: @theme-green;
          border-radius: 2px;
        }
      }
      .list-page-wrap {
        padding: 0 20px 17px;
        .no-data {
          padding: 20px 0;
        }
        .list-page {
          padding: 20px 0;
          height: 160px;
          box-sizing: border-box;
          img {
            width: 184px;
            height: 115px;
          }
          .content {
            margin-left: 200px;
            .cont {
              .title-son {
                padding-bottom: 10px;
                span {
                  color: @theme-green;
                  font-weight: bold;
                }
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
              padding-bottom: 20px;
            }
            .foot {
              span {
                display: inline-block;
                height: 26px;
                line-height: 26px;
                width: 70px;
                border-radius: 2px;
              }
              .btn {
                background-color: #fd833a;
              }
              .detail {
                background-color: @theme-green;
              }
            }
          }
        }
        .list-page + .list-page {
          border-top: 1px dashed #e5e5e5;
        }
      }
    }
  }
}

.pop-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .pop {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -120px;
    margin-left: -200px;
    &:after {
      position: absolute;
      content: "";
      width: 400px;
      height: 92px;
      top: -92px;
      left: 0;
      background: url("../assets/img/serve/pop-top-bg.png") no-repeat;
    }
    .title {
      height: 40px;
      line-height: 40px;
      position: relative;
      background-color: @theme-green;
      span {
        position: absolute;
        right: 0;
        top: 4px;
        height: 32px;
        width: 32px;
        background: url("../assets/img/serve/close.png") no-repeat center;
        background-size: 20px 20px;
      }
    }

    .content {
      padding: 50px 0;
      .btn {
        width: 190px;
        height: 40px;
        line-height: 40px;
        color: @theme-green;
        margin: 0 auto;
        border: 1px solid @theme-green;
        border-radius: 20px;
        &:hover {
          background-color: @theme-green;
          color: #fff;
        }
        & + .btn {
          margin-top: 10px;
        }
      }
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .wrap {
    position: fixed;
    width: 960px;
    height: 471px;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .close {
      position: absolute;
      top: -15px;
      right: -15px;
      z-index: 100;
    }
  }
}
</style>


