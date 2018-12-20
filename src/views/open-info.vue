<template>
  <div class="interact-wrapper">
    <div class="wrapper">
      <Header></Header>
      <div class="interact">
        <div class="main-wrap">
          <Crumbs>
            <span class="ell fl">政务公开</span>
            <span class="fl">></span>
            <span class="ell fl">政务信息公开</span>
          </Crumbs>
          <div class="interact-wrap clearfix">
            <div class="left fl">
              <div class="title f24 ell">政务信息公开</div>
              <div class="content-wrap bcfff">
                <div class="list-wrap">
                  <div v-show="!pageList.length" class="no-data c666 tc">暂无数据</div>
                  <page-card @click.native="tapToDetail(item.ncId,'政务公开','政务信息公开',item.title)" v-for="(item,index) in pageList" :key="index" :info="item" :hasBuy="false" class="list-page"/>
                </div>
                <v-page
                  v-show="pageList.length"
                  :total-row="totalRow"
                  align="center"
                  @page-change="PageChange"
                  :page-size-menu="false"
                  :info="false"
                ></v-page>
              </div>
            </div>
            <div class="right fr bcfff">
              <sb-title title="政务信息公开"></sb-title>
              <ul class="content clearfix">
                <li
                  @click="changeActive(index)"
                  v-for="(item,index) in infoList"
                  :key="index"
                  class="cp c666 ell"
                  :class="activeIndex===index?'active':''"
                >> {{item.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="push"></div>
    </div>
    <Footer fname="政务信息公开"></Footer>
    <Loading v-show="loading"></Loading>
    <v-dialog/>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";
import Crumbs from "components/crumbs/crumbs.vue";
import SbTitle from "components/sb-title/title.vue";
import PageCard from "components/page-card/card.vue";
import Loading from "components/loading/loading.vue";
import {mapGetters,mapMutations} from "vuex";
import Vue from "vue";
import vPage from "v-page";
Vue.use(vPage, {});

export default {
  name: "openInfo",
  data() {
    return {
      activeIndex: this.$route.query.index ? this.$route.query.index : 0,
      infoList: [],
      pageList:[],
      cName: "",
      cCont: "",
      cPhone: "",
      totalRow: 0,
    };
  },
  created() {
    this.getType();
  },
  computed:{
    ...mapGetters(['loading'])
  },
  mounted() {
    this.activeIndex = parseInt(window.localStorage.getItem("infoIndex"));
  },
  methods: {
    PageChange(page) {
      if(this.infoList.length){
        this.getPageListById(this.infoList[this.activeIndex].ntId, page.pageNumber, 10);
      }
      
    },
    changeActive(index) {
      this.activeIndex = index;
      window.localStorage.setItem("infoIndex", index);
      this.getPageListById(this.infoList[this.activeIndex].ntId, 1, 10);
    },
    //去往详情页面
    tapToDetail(id, fname, sname, tname) {
      console.log(tname);
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
    //获取右侧内容
    getType() {
      this.$axios
        .get(apiPath + "/vr-rest/governmentInfo/getTypeList")
        .then(res => {
          //console.log(res.data.data)
          if (res.data.code === 0 && res.data.data) {
            this.infoList = res.data.data[0].childrenType;
            //this.openServeList = res.data.data[2].childrenType;
            this.getPageListById(this.infoList[this.activeIndex].ntId, 1, 10);
          }
        });
    },
    submit() {
      if (this.cName && this.cPhone && this.cCont) {
        //console.log(this.errors.any());
        if (this.errors.any()) {
          this.$modal.show("dialog", {
            title: "提示",
            text: "请填写正确的信息",
            buttons: [
              {
                title: "知道了"
              }
            ]
          });
        } else {
          //执行提交的方法
        }
      } else {
        this.$modal.show("dialog", {
          title: "提示",
          text: "请填写完整的信息",
          buttons: [
            {
              title: "知道了"
            }
          ]
        });
      }
    },

    //获取分页列表
    getPageListById(id, page, size) {
      this.setLoading(true);
      this.$axios
        .get(
          apiPath +
            `/vr-rest/governmentInfo/getTypeNewsPageList?ntId=${id}&page=${page}&size=${size}`
        )
        .then(res => {
          this.setLoading(false);
          if(res.data.code === 0 && res.data.data){
            this.pageList = res.data.data
            this.totalRow = res.data.count
          }
        });
    },

    ...mapMutations({
      setLoading:'SET_LOADING'
    })
  },
  components: {
    Header,
    Footer,
    Crumbs,
    SbTitle,
    PageCard,
    Loading,
  }
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";
.interact-wrapper {
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
.interact {
  .main-wrap {
    width: @inner-width;
    margin: 0 auto;
    .interact-wrap {
      .left {
        width: 960px;
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
        .content-wrap {
          padding: 20px;
          box-sizing: border-box;
          box-shadow: @box-shadow;
          margin-bottom: 27px;
          .list-wrap {
            .no-data {
              padding:20px;
            }
          }
        }
      }
      .right {
        width: 210px;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom:30px;
        .content {
          padding-top: 16px;
          li {
            height: 34px;
            box-sizing: border-box;
            line-height: 34px;
            padding-left: 10px;
            transition:all .4s;
            &.active {
              background-color: #f5f5f5;
              color: @theme-yellow;
            }
            &:hover {
              background-color: #f5f5f5;
              color: @theme-yellow;
            }
          }
        }
      }
    }
  }
}
</style>


