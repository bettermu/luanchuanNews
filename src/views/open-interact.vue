<template>
  <div class="interact-wrapper">
    <div class="wrapper">
      <Header></Header>
      <div class="interact">
        <div class="main-wrap">
          <Crumbs>
            <span class="ell fl">政务公开</span>
            <span class="fl">></span>
            <span class="ell fl">互动频道</span>
          </Crumbs>
          <div class="interact-wrap clearfix">
            <div class="left fl">
              <div class="title f24 ell">互动频道</div>
              <div class="content-wrap bcfff">
                <div v-show="activeIndex !== 2">
                  <div class="list-wrap">
                    <div v-show="!pageList.length" class="no-data c666 tc">暂无数据</div>
                    <page-card
                      @click.native="tapToDetail(item.ncId,'政务公开','互动频道',item.title)"
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
                    @page-change="PageChange"
                    :page-size-menu="false"
                    :info="false"
                  ></v-page>
                </div>

                <div class="advice" v-show="activeIndex === 2">
                  <div class="form-wrap c-title">
                    <span class="fl star">姓名</span>
                    <input v-validate="'required|name'" v-model="cName" name="姓名" type="text">
                    <span v-show="errors.has('姓名')" class="tip f12" v-cloak>{{ errors.first('姓名') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star f16">联系电话</span>
                    <input
                      v-validate="'required|mobile'"
                      name="手机号"
                      required
                      v-model="cPhone"
                      type="text"
                    >
                    <span
                      v-show="errors.has('手机号')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('手机号') }}</span>
                  </div>
                  <div class="form-wrap c-cont">
                    <span class="fl star">投诉内容</span>
                    <textarea v-validate="'required'" name="内容" v-model="cCont" maxlength="150"></textarea>
                    <span v-show="errors.has('内容')" class="tip f12" v-cloak>{{ errors.first('内容') }}</span>
                  </div>
                  <div @click="submit" class="sb-btn cfff tc cp">提交</div>
                </div>
              </div>
            </div>
            <div class="right fr bcfff">
              <sb-title title="互动频道"></sb-title>
              <ul class="content clearfix">
                <li
                  @click="changeActive(index)"
                  v-for="(item,index) in interactList"
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
    <Footer fname="互动频道"></Footer>
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
import { mapGetters, mapMutations } from "vuex";
import "@/utils/validate.js";
import Vue from "vue";
import vPage from "v-page";
Vue.use(vPage, {});

export default {
  name: "openInteract",
  data() {
    return {
      activeIndex: this.$route.query.index ? this.$route.query.index : 0,
      interactList: [],
      cName: "",
      cCont: "",
      cPhone: "",
      totalRow: 0,
      pageList: []
    };
  },
  computed: {
    ...mapGetters(["loading"])
  },
  created() {
    this.getType();
  },
  mounted() {
    this.activeIndex = parseInt(window.localStorage.getItem("interIndex"));
  },
  methods: {
    PageChange(page) {
      this.getPageListById(
        this.interactList[this.activeIndex].ntId,
        page.pageNumber,
        10
      );
    },
    changeActive(index) {
      this.activeIndex = index;
      window.localStorage.setItem("interIndex", index);
      if (index !== 2) {
        this.getPageListById(this.interactList[this.activeIndex].ntId, 1, 10);
      } else {
      }
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
            this.interactList = res.data.data[1].childrenType;
            //this.openServeList = res.data.data[2].childrenType;
            //if(this.activeIndex!==2){
            //  this.getPageListById(this.interactList[this.activeIndex].ntId,1,10)
            //}else {

            //}
            this.activeIndex !== 2 &&
              this.getPageListById(
                this.interactList[this.activeIndex].ntId,
                1,
                10
              );
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
          let params = {
            nsPers: this.cName,
            contactTel: this.cPhone,
            nsContent: this.cCont
          };
          this.postAdv(params);
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

    //提交建言献策
    postAdv(params) {
      this.$axios
        .post(apiPath + "/vr-rest/newsSuggest/addNewsSuggest", params)
        .then(res => {
          if (res.data.code === 0) {
            this.$modal.show("dialog", {
              title: "提示",
              text: "提交成功",
              buttons: [
                {
                  title: "知道了"
                }
              ]
            });
            this.cCont = "";
            this.cName = "";
            this.cPhone = "";
          }
        });
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
          if (res.data.code === 0 && res.data.data) {
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
    Crumbs,
    SbTitle,
    PageCard,
    Loading
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
              padding: 20px;
            }
          }
          .advice {
            .form-wrap {
              padding: 10px 0;
              position: relative;
              input {
                height: 34px;
                line-height: 1;
                margin-left: 12px;
                width: 834px;
                border-radius: 5px;
                border: 1px solid #dcdcdc;
                text-indent: 5px;
              }
              textarea {
                margin-left: 12px;
                height: 154px;
                box-sizing: border-box;
                width: 836px;
                padding: 5px;
                border-radius: 5px;
                border: 1px solid #dcdcdc;
                resize: none;
                line-height: 26px;
                outline: none;
              }

              .star {
                height: 36px;
                line-height: 36px;
                width: 72px;
                &:before {
                  content: "*";
                  color: red;
                }
              }
              .tip {
                position: absolute;
                bottom: -5px;
                left: 84px;
                color: red;
              }
            }
            .p-title {
              height: 36px;
              line-height: 36px;
              position: relative;
              padding-left: 12px;
              &:before {
                content: "";
                position: absolute;
                height: 18px;
                width: 4px;
                top: 10px;
                left: 0;
                background-color: @theme-green;
              }
            }
            .sb-btn {
              width: 190px;
              height: 40px;
              line-height: 40px;
              border-radius: 20px;
              margin: 10px auto 0;
              background-color: @theme-green;
            }
          }
        }
      }
      .right {
        width: 210px;
        padding: 10px;
        box-sizing: border-box;
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


