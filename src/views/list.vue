<template>
  <div class="list-wrapper">
    <div class="wrapper">
      <Header></Header>

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
              <page-card
                @click.native="tapToDetail(item.ncId,$route.query.fname,$route.query.sname,item.title)"
                v-for="(item,index) in pageList"
                :key="index"
                :info="item"
                :hasBuy="false"
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
      <div class="push"></div>
    </div>

    <Footer :fname="$route.query.sname"></Footer>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";
import Crumbs from "components/crumbs/crumbs.vue";
import PageCard from "components/page-card/card.vue";
import Loading from "components/loading/loading.vue";
import { mapGetters, mapMutations } from "vuex";
import Vue from "vue";
import vPage from "v-page";
Vue.use(vPage, {});

export default {
  name: "list",

  data() {
    return {
      totalRow: 12,
      crumbArr: [],
      id: "",
      pageList: [],
      isTop: this.$route.query.isTop || ""
    };
  },

  created() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      this.getPageListById(this.id, 1, 10, this.isTop);
    }
  },

  watch: {
    $route(to, from) {
      this.id = this.$route.query.id || "";
      if (this.id) {
        this.getPageListById(this.id, 1, 10, this.isTop);
      }
    }
  },

  components: {
    Header,
    Footer,
    Crumbs,
    PageCard,
    Loading
  },
  computed: {
    ...mapGetters(["loading"])
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //去往详情页面
    tapToDetail(id, fname, sname, tname) {
      //console.log(tname);
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

    pageChange(page) {
      if (this.id) {
        this.getPageListById(this.id, page.pageNumber, 10, this.isTop);
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
        .list-page + .list-page {
          border-top: 1px dashed #e5e5e5;
        }
      }
    }
  }
}
</style>


