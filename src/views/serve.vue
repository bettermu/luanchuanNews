<template>
  <div class="serve-wrapper">
    <div class="wrapper">
      <Header/>
      <!-- 预订服务-->
      <div class="serve">
        <div class="main-wrap clearfix">
          <div class="left fl">
            <ul class="bcfff c999">
              <li
                :title="item.nctName"
                v-for="(item,index) in typeList"
                :key="index"
                class="cp clearfix"
                @click="changeIndex(index)"
                :class="activeIndex === index ? 'active':''"
              >
                <div class="name fl tc ell">{{item.nctName}}</div>
                <span>({{item.commodityCount}})</span>
              </li>
            </ul>
          </div>
          <div class="right">
            <div :title="currentTitle" class="title f24 ell">{{currentTitle}}</div>
            <div class="list-wrap bcfff">
              <div class="list-cont">
                <div v-if="!pageList.length" class="no-data c666 tc">暂无数据</div>
                <page-card
                  v-for="(item,index) in pageList"
                  :info="item"
                  :hasBuy="true"
                  :key="index"
                  :index="index"
                  @clickBuy="showPop"
                  class="list-page"
                />
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
      </div>
      <div class="push"></div>
    </div>

    <Footer fname="预订服务"/>

    <div v-show="isPopShow" class="pop-wrap">
      <div class="pop bcfff">
        <div class="title tc cfff">
          选择前往
          <span @click="closePop" class="cp"></span>
        </div>
        <div class="content">
          <div
            v-for="(item,index) in linkList"
            @click="toThirdWeb(item.otaLink)"
            :key="index"
            class="btn tc cp"
          >{{item.otaName}}</div>
        </div>
      </div>
    </div>

    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";
import PageCard from "components/page-card/card.vue";
import Loading from "components/loading/loading.vue";
import Vue from "vue";
import vPage from "v-page";
Vue.use(vPage, {});

export default {
  name: "serve",
  data() {
    return {
      totalRow: 0,
      activeIndex: 0,
      isPopShow: false,
      banners: [],
      typeList: [],
      pageList: [],
      linkList: [],
    };
  },

  created() {
    this.getTypeList();
  },

  computed: {
    currentTitle() {
      return this.typeList.length
        ? this.typeList[this.activeIndex].nctName
        : "";
    },
    currentId() {
      return this.typeList.length ? this.typeList[this.activeIndex].nctId : "";
    },
    ...mapGetters(["loading"])
  },

  methods: {
    changeIndex(index) {
      this.activeIndex = index;
      this.getInfoListByPage(this.typeList[this.activeIndex].nctId, 1, 10);
    },
    //跳转第三方网站
    toThirdWeb(link) {
      this.isPopShow = false;
      window.open(link);
    },
    pageChange(page) {
      if (this.currentId !== "") {
        this.getInfoListByPage(this.currentId, page.pageNumber, 10);
      }
    },
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
    closePop() {
      console.log();
      this.isPopShow = false;
    },
    showPop(index) {
      let data = this.pageList[index];
      //console.log(data)
      if (data.otaInfoVoList) {
        //console.log(data.otaName)
        if (data.otaInfoVoList.length === 1) {
          //一个选项的时候，直接跳转
          //window.open("http://www.baidu.com")
          window.open(data.otaInfoVoList[0].otaLink);
        } else {
          //多个选项的时候，显示弹窗
          this.linkList = data.otaInfoVoList;
          this.isPopShow = true;
        }
        //console.log(arr)
      } else {
      }
    },
    //获取商品类别接口
    getTypeList() {
      this.$axios
        .get(apiPath + "/vr-rest/webCommodity/getCommodityTypeInfo")
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.typeList = res.data.data;
            this.getInfoListByPage(this.typeList[0].nctId, 1, 10);
          }
        });
    },

    //获取分页信息
    getInfoListByPage(id, page, pageSize) {
      //this.isLoading = true;
      this.setLoading(true);
      this.$axios
        .get(
          apiPath +
            `/vr-rest/webCommodity/getCommodityInfoByPage?nctId=${id}&page=${page}&pageSize=10`
        )
        .then(res => {
          //console.log(res.data.data)
          //this.isLoading = false;
          this.setLoading(false);
          if (res.data.code === 0 && res.data.data) {
            //console.log(res.data.data)
            this.pageList = res.data.data;
            this.totalRow = res.data.count;
          }
        });
    },

    ...mapMutations({
      setLoading: "SET_LOADING"
    })
  },
  components: {
    Header,
    Footer,
    PageCard,
    Loading
  }
};
</script>


<style lang="less" scoped>
@import "~styles/common.less";
.serve-wrapper {
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

.serve {
  padding: 50px 0 80px;
  .main-wrap {
    width: @inner-width;
    margin: 0 auto;

    .left {
      width: 227px;
      box-sizing: border-box;
      padding: 92px 4px 0;
      background: url("../assets/img/serve/nav-top-bg.png") no-repeat top left;
      ul {
        padding: 10px 0;
        border: 1px solid #eee;
        border-top: none;
        li {
          height: 50px;
          line-height: 50px;
          position: relative;
          .name {
            padding-left: 58px;
            width: 76px;
          }
          &.active {
            background-color: #33ce91;
            color: #fff;
            &:before {
              position: absolute;
              content: "";
              height: 50px;
              width: 7px;
              background-color: #00b265;
              top: 0;
              left: 0;
            }
          }
        }
      }
    }
    .right {
      margin-left: 254px;
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
      .list-wrap {
        padding-bottom: 33px;
        .list-cont {
          padding: 0 20px;
          .no-data {
            padding: 20px 0;
          }
          .list-page + .list-page {
            border-top: 1px dashed #e5e5e5;
          }
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
      position:absolute;
      content:'';
      width:400px;
      height:92px;
      top:-92px;
      left:0;
      background:url('../assets/img/serve/pop-top-bg.png') no-repeat;
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
      max-height:230px;
      overflow:auto;
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
</style>
